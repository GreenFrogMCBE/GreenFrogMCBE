/**
 * ░██████╗░██████╗░███████╗███████╗███╗░░██╗███████╗██████╗░░█████╗░░██████╗░
 * ██╔════╝░██╔══██╗██╔════╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔══██╗██╔════╝░
 * ██║░░██╗░██████╔╝█████╗░░█████╗░░██╔██╗██║█████╗░░██████╔╝██║░░██║██║░░██╗░
 * ██║░░╚██╗██╔══██╗██╔══╝░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗██║░░██║██║░░╚██╗
 * ╚██████╔╝██║░░██║███████╗███████╗██║░╚███║██║░░░░░██║░░██║╚█████╔╝╚██████╔╝
 * ░╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚══╝╚═╝░░░░░╚═╝░░╚═╝░╚════╝░░╚═════╝░
 *
 * The content of this file is licensed using the CC-BY-4.0 license
 * which requires you to agree to its terms if you wish to use or make any changes to it.
 *
 * @license CC-BY-4.0
 * @link Github - https://github.com/GreenFrogMCBE/GreenFrogMCBE
 * @link Discord - https://discord.gg/UFqrnAbqjP
 */
#include <napi.h>
#include <iostream>
#include <vector>
#include <chrono>
#include <ctime>

#define DEBUG

#define MAX_RANDOM 5
#define MAX_ENTITIES 15

#define MAX_X_COORDINATE 60
#define SPAWN_Y_COORDINATE -50
#define MAX_Z_COORDINATE 60

#define CHANCE 3
#define NIGHT_TIME 1600

#define randof(array) array[rand() % (sizeof(array) / sizeof(array[0]))]

using namespace std;
using namespace Napi;
using namespace chrono;

int entitiesSpawned = 0;
int yawRotations[2] = {
    -90,
    90
};
string entities[4] = {
    "minecraft:skeleton",
    "minecraft:creeper",
    "minecraft:spider",
    "minecraft:zombie"
};

struct Vec2 {
    int x;
    int z;
};

void debugLog(string message) {
    #ifdef DEBUG
        cout << "EntityDebug | " << message << endl;
    #endif
}

int _getRandomYawRotation() {
    return randof(yawRotations);
}

bool _isEntityLimitReached() {
    entitiesSpawned = entitiesSpawned + 1;

    return (entitiesSpawned > MAX_ENTITIES);
}

string _getRandomEntity() {
    return randof(entities);
}

bool _shouldSpawnHostileEntity(int time) {
    #ifdef DEBUG
       bool shouldSpawn = true;
    #else 
       bool shouldSpawn = (time > NIGHT_TIME && (rand() % MAX_RANDOM) > CHANCE);
    #endif

    return shouldSpawn && !_isEntityLimitReached();
}

int _getRandomRuntimeId() {
    return rand();
}

bool _shouldFollowPlayer(string playerGamemode, bool isPlayerDead, int entityX, int playerX) {
    return ((playerGamemode == "survival" || playerGamemode == "adventure") && ((playerX - entityX) < 20) && !isPlayerDead);
}

Vec2 _getRandomCoordinates() {
    return { rand() % MAX_X_COORDINATE, rand() % MAX_Z_COORDINATE };
}

string _moveRandomly(int runtimeId, float coordinateX, float coordinateZ) {
    coordinateX = coordinateX + 0.5;
    
    // TODO: Threading
    this_thread::sleep_for(chrono::milliseconds(100));

    return "this.teleportEntity(" + to_string(runtimeId) + ", " + to_string(coordinateX) + ", -50, " + to_string(coordinateZ) + ")";
}

Value shouldFollowPlayer(const CallbackInfo& info) {
    Env env = info.Env();

    string gamemode = info[0].As<String>().Utf8Value();
    bool isDead = info[1].As<Boolean>().Value();
    int entityX = info[2].As<Number>().Int32Value();
    int playerX = info[3].As<Number>().Int32Value();

    bool shouldFollow = _shouldFollowPlayer(gamemode, isDead, entityX, playerX);

    return Boolean::New(env, shouldFollow);
}

Value getRandomSpawnCoordinates(const CallbackInfo& info) {
    Env env = info.Env();
    
    Vec2 spawnCoordinates = _getRandomCoordinates();

    Object result = Object::New(env);

    result["x"] = Number::New(env, spawnCoordinates.x);
    result["y"] = Number::New(env, SPAWN_Y_COORDINATE);
    result["z"] = Number::New(env, spawnCoordinates.z);

    return result;
}

Value getRandomEntity(const CallbackInfo& info) {
    Env env = info.Env();
    
    string entityName = _getRandomEntity();

    return String::New(env, entityName);
}

Value moveRandomly(const CallbackInfo& info) {
    Env env = info.Env();

    int runtimeId = info[0].As<Number>().Int32Value();    
    float coordinateX = info[1].As<Number>().FloatValue();
    float coordinateZ = info[2].As<Number>().FloatValue();

    string codeToExecute = _moveRandomly(runtimeId, coordinateX, coordinateZ);

    return String::New(env, codeToExecute);
}

Value shouldSpawnHostileEntity(const CallbackInfo& info) {
    Env env = info.Env();

    int time = info[0].As<Number>().Int32Value();

    return Boolean::New(env, _shouldSpawnHostileEntity(time));
}

Value getRandomRuntimeId(const CallbackInfo& info) {
    Env env = info.Env();

    return Number::New(env, _getRandomRuntimeId());
}

Value getRandomYawRotation(const CallbackInfo& info) {
    Env env = info.Env();

    return Number::New(env, _getRandomYawRotation());
}

Object init(Env env, Object exports) {
    debugLog("Initializing...");

    srand(time(NULL));

    exports["getRandomSpawnCoordinates"] = Function::New(env, getRandomSpawnCoordinates);
    exports["shouldSpawnHostileEntity"] = Function::New(env, shouldSpawnHostileEntity);
    exports["getRandomYawRotation"] = Function::New(env, getRandomYawRotation);
    exports["shouldFollowPlayer"] = Function::New(env, shouldFollowPlayer);
    exports["getRandomRuntimeId"] = Function::New(env, getRandomRuntimeId);
    exports["getRandomEntity"] = Function::New(env, getRandomEntity);
    exports["moveRandomly"] = Function::New(env, moveRandomly);

    debugLog("Initialized!");

    return exports;
}

NODE_API_MODULE(addon, init)
