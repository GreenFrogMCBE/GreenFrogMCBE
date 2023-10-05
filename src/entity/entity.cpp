#include <napi.h>
#include <iostream>
#include <vector>
#include <ctime>

#define DEBUG

#define MAX_RANDOM 5
#define MAX_ENTITIES 15
#define MAX_ROTATIONS_AMOUNT 4

#define MAX_X_COORDINATE 60
#define SPAWN_Y_COORDINATE -50
#define MAX_Z_COORDINATE 60

#define CHANCE 3
#define NIGHT_TIME 1600

using namespace std;
using namespace Napi;

int entitiesSpawned = 0;
int yawRotations[4] = {
    45,
    90,
    120,
    180
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
    int rotation = rand() % MAX_ROTATIONS_AMOUNT;

    return yawRotations[MAX_ROTATIONS_AMOUNT];
}

bool _isEntityLimitReached() {
    entitiesSpawned = entitiesSpawned + 1;

    return (entitiesSpawned > MAX_ENTITIES);
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

Vec2 _getRandomCoordinates() {
    return { rand(), rand() };
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
    exports["getRandomRuntimeId"] = Function::New(env, getRandomRuntimeId);

    debugLog("Initialized!");

    return exports;
}

NODE_API_MODULE(addon, init)
