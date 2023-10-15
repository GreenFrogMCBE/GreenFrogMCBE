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

/**
 * This macro determines if debugging is enabled
 */
#define DEBUG

/**
 * Maximum number of entities that can be spawned at once
 */
constexpr int MAX_ENTITIES = 15;

/**
 * Maximum X coordinate for entity spawning
 */
constexpr int MAX_X_COORDINATE = 60;

/**
 * The Y coordinate for entity spawning
 */
int SPAWN_Y_COORDINATE = NULL;

/**
 * Maximum Z coordinate for entity spawning
 */
constexpr int MAX_Z_COORDINATE = 60;

/**
 * The night time as a number in ticks
 */
constexpr int NIGHT_TIME = 1600;

/**
 * A macro returns a random element from an array
 */
#define randof(array) array[rand() % (sizeof(array) / sizeof(array[0]))]

using namespace std;
using namespace Napi;
using namespace chrono;

/**
 * The amount of entities spawned
 */
int entitiesSpawned = 0;

/**
 * An array of all possible rotations of entities 
 */
int yawRotations[2] = {
    -90,
    90
};

/**
 * An array of all possible entities to spawn
 */
string entities[4] = {
    "minecraft:skeleton",
    "minecraft:creeper",
    "minecraft:spider",
    "minecraft:zombie"
};

/**
 * All possible directions that the entity can go
 */
enum Direction {
    Forward,
    Backward,
    Left,
    Right
};

/**
 * Vector2 structure
 * 
 * @struct
 */
struct Vec2 {
    int x;
    int z;
};

/**
 * Prints a message to the console.
 * 
 * @attention Only available if debugging is enabled, otherwise does nothing
 */
void debugLog(string message) {
    #ifdef DEBUG
        cout << "EntityDebug | " << message << endl;
    #endif
}

void _setSpawnYCoordinate(int coordinate) {
    debugLog("before: " + to_string(SPAWN_Y_COORDINATE));
    debugLog("changeto: " + to_string(coordinate));
    SPAWN_Y_COORDINATE = coordinate;
    debugLog("after: " + to_string(SPAWN_Y_COORDINATE));
}

/**
 * An internal function that returns a random yaw rotation
 * 
 * @return A random yaw rotation
 */
int _getRandomYawRotation() {
    return randof(yawRotations);
}

/**
 * An internal function that checks if the entity limit has been reached
 * 
 * @return True if the entity limit has been reached, false otherwise
 */
bool _isEntityLimitReached() {
    entitiesSpawned = entitiesSpawned + 1;

    return (entitiesSpawned > MAX_ENTITIES);
}

/**
 *  An internal function that returns a random entity from the entities array
 * 
 * @return A random entity
 */
string _getRandomEntity() {
    return randof(entities);
}

/**
 * An internal function that determines if a hostile entity should be
 * spawned based on the time
 * 
 * @attention Always returns true in debug mode
 * 
 * @param time The current time
 * @return True if a hostile entity should be spawned, false otherwise
 */
bool _shouldSpawnHostileEntity(int time) {
    #ifdef DEBUG
       bool shouldSpawn = true;
    #else 
       bool shouldSpawn = (time > NIGHT_TIME && (rand() % 5) > 3);
    #endif

    return shouldSpawn && !_isEntityLimitReached();
}

/**
 * An internal function that returns a random runtime ID
 * 
 * @return A random runtime ID
 */
int _getRandomRuntimeId() {
    return rand();
}

/**
 * An internal function that determines if an entity 
 * should follow a player based on the player's gamemode, 
 * whether the player is dead, and the distance between the entity and the player
 * 
 * @param playerGamemode The player's gamemode
 * @param isPlayerDead Whether the player is dead
 * @param entityX The entity's X coordinate
 * @param playerX The player's X coordinate
 * @param isFollowing A boolean indicating if an entity is already following the player, false otherwise
 * @return A boolean indicating if the entity should follow the player, false otherwise
 */
bool _shouldFollowPlayer(
    string playerGamemode, 
    bool isPlayerDead, 
    int entityX, 
    int playerX, 
    bool isFollowing
) {
    return (
        (playerGamemode == "survival" || playerGamemode == "adventure") && 
        ((playerX - entityX) < 7) && 
        !isPlayerDead &&
        !isFollowing
    );
}

/**
 * An internal function that returns random coordinates
 * 
 * @return A Vec2 structure containing the random coordinates
 */
Vec2 _getRandomCoordinates() {
    return { rand() % MAX_X_COORDINATE, rand() % MAX_Z_COORDINATE };
}

/**
 * An internal function that moves an entity in random directions
 * 
 * @param runtimeId The runtime ID of the entity
 * @param originalX The original X coordinate of the entity
 * @param originalZ The original Z coordinate of the entity
 */
string _moveRandomly(int runtimeId, float originalX, float originalZ) {
    string result = "";

    int direction = rand() % 4;

    for (int x = 0; x < 60; x++) {
        switch (direction) {
            case Direction::Forward:
                originalX = originalX + 0.1;        
                break;
            case Direction::Backward:
                originalX = originalX - 0.1;        
                break;
        }

        result = result + "this.teleportEntity(" + to_string(runtimeId) + ", " + to_string(originalX) + ", " + to_string(SPAWN_Y_COORDINATE) + ", " + to_string(originalZ) + ");";
    }

    return result;
}

/**
 * An internal function that smoothly teleports an entity to a player.
 * 
 * @param runtimeId The runtime ID of the entity.
 * @param playerX The X coordinate of the player.
 * @param playerZ The Z coordinate of the player.
 * @param entityX The X coordinate of the entity.
 * @param entityY The Y coordinate of the entity.
 * @param entityZ The Z coordinate of the entity.
 * @return A string containing the code to execute for teleporting the entity.
 */
string _smoothTeleportToPlayer(
    int runtimeId, 
    float playerX, 
    float playerZ, 
    float entityX, 
    float entityY, 
    float entityZ
) {
    string result = "";
    
    for (int x = 0; x < entityX; x++) {
        int movementX = playerX - entityX;
        int movementZ = playerZ + (entityZ / 50);
        
        result = result + "this.teleportEntity(" + to_string(runtimeId) + ", " + to_string(movementX) + ", " + to_string(entityY) + ", " + to_string(movementZ) + ");";
    }

    return result;
}

/**
 * An internal function that makes an entity follow a player.
 * 
 * @param runtimeId The runtime ID of the entity.
 * @param playerX The X coordinate of the player.
 * @param playerZ The Z coordinate of the player.
 * @param entityX The X coordinate of the entity.
 * @param entityY The Y coordinate of the entity.
 * @param entityZ The Z coordinate of the entity.
 */
string _followPlayer(
    int runtimeId, 
    float playerX, 
    float playerZ, 
    float entityX, 
    float entityY, 
    float entityZ
) {
    int movementX = playerX + (entityX / 50);
    int movementZ = playerZ + (entityZ / 50);

    return "this.teleportEntity(" + to_string(runtimeId) + ", " + to_string(movementX) + ", " + to_string(entityY) + ", " + to_string(movementZ) + ");";
}

/**
 * Determines if an entity should follow a player based on the player's gamemode, 
 * whether the player is dead, and the distance between the entity and the player
 * 
 * @param info The callback info
 * @return A boolean indicating whether the entity should follow the player
 */
Value shouldFollowPlayer(const CallbackInfo& info) {
    Env env = info.Env();

    string gamemode = info[0].As<String>().Utf8Value();
    bool isDead = info[1].As<Boolean>().Value();
    int entityX = info[2].As<Number>().Int32Value();
    int playerX = info[3].As<Number>().Int32Value();
    bool isFollowing = info[4].As<Boolean>().Value();

    bool shouldFollow = _shouldFollowPlayer(
        gamemode, 
        isDead, 
        entityX, 
        playerX, 
        isFollowing
    );

    return Boolean::New(env, shouldFollow);
}

Value setSpawnYCoordinate(const CallbackInfo& info) {
    Env env = info.Env();

    int spawnY = info[0].As<Number>().Int32Value();

    _setSpawnYCoordinate(spawnY);

    return Boolean::New(env, true);
}

/**
 * Returns random coordinates for entity spawning
 * 
 * @param info The callback info
 * @return An object containing the random coordinates
 */
Value getRandomSpawnCoordinates(const CallbackInfo& info) {
    Env env = info.Env();
    
    Vec2 spawnCoordinates = _getRandomCoordinates();

    Object result = Object::New(env);
    debugLog(to_string(SPAWN_Y_COORDINATE));
    result["x"] = Number::New(env, spawnCoordinates.x);
    result["y"] = Number::New(env, SPAWN_Y_COORDINATE);
    result["z"] = Number::New(env, spawnCoordinates.z);

    return result;
}

/**
 * Returns a random entity from the entities array
 * 
 * @param info The callback info
 * @return A string containing the name of the random entity
 */
Value getRandomEntity(const CallbackInfo& info) {
    Env env = info.Env();
    
    string entityName = _getRandomEntity();

    return String::New(env, entityName);
}

/**
 * Moves an entity randomly
 * 
 * @param info The callback info
 * @return A string containing the code to execute for moving the entity
 */
Value moveRandomly(const CallbackInfo& info) {
    Env env = info.Env();

    int runtimeId = info[0].As<Number>().Int32Value();    
    float coordinateX = info[1].As<Number>().FloatValue();
    float coordinateZ = info[2].As<Number>().FloatValue();

    string codeToExecute = _moveRandomly(
        runtimeId, 
        coordinateX, 
        coordinateZ
    );

    return String::New(env, codeToExecute);
}

/**
 * Determines whether a hostile entity should be spawned based on the current time.
 * 
 * @param info The callback info. It should contain the current time.
 * @return A boolean value indicating whether a hostile entity should be spawned.
 */
Value shouldSpawnHostileEntity(const CallbackInfo& info) {
    Env env = info.Env();

    int time = info[0].As<Number>().Int32Value();

    return Boolean::New(env, _shouldSpawnHostileEntity(time));
}

/**
 * Generates a random runtime ID.
 * 
 * @param info The callback info. 
 * @return A random runtime ID.
 */
Value getRandomRuntimeId(const CallbackInfo& info) {
    Env env = info.Env();

    return Number::New(env, _getRandomRuntimeId());
}

/**
 * Generates a random yaw rotation.
 * 
 * @param info The callback info. 
 * @return A random yaw rotation.
 */
Value getRandomYawRotation(const CallbackInfo& info) {
    Env env = info.Env();

    return Number::New(env, _getRandomYawRotation());
}

/**
 * Smoothly teleports an entity to the player
 * 
 * @param info The callback info
 */
Value smoothTeleportToPlayer(const CallbackInfo& info) {
    Env env = info.Env();

    int runtimeId = info[0].As<Number>().Int32Value();    
    float playerX = info[1].As<Number>().FloatValue();
    float playerZ = info[2].As<Number>().FloatValue();
    float entityX = info[3].As<Number>().FloatValue();
    float entityY = info[4].As<Number>().FloatValue();
    float entityZ = info[5].As<Number>().FloatValue();

    string codeToExecute = _smoothTeleportToPlayer(
        runtimeId, 
        playerX, 
        playerZ, 
        entityX, 
        entityY, 
        entityZ
    );

    return String::New(env, codeToExecute);
}

/**
 * Makes an entity follow the player.
 * 
 * @param info The callback info.
 */
Value followPlayer(const CallbackInfo& info) {
    Env env = info.Env();

    int runtimeId = info[0].As<Number>().Int32Value();    
    float playerX = info[1].As<Number>().FloatValue();
    float playerZ = info[2].As<Number>().FloatValue();
    float entityX = info[3].As<Number>().FloatValue();
    float entityY = info[4].As<Number>().FloatValue();
    float entityZ = info[5].As<Number>().FloatValue();

    string codeToExecute = _followPlayer(
        runtimeId, 
        playerX, 
        playerZ, 
        entityX, 
        entityY, 
        entityZ
    );

    return String::New(env, codeToExecute);
}

/**
 * Initializes the module.
 * 
 * @param env The environment in which the module is being initialized.
 * @param exports The object to which the module's exports will be attached.
 * @return The exports object with the module's exports attached.
 */
Object init(Env env, Object exports) {
    debugLog("Initializing...");

    srand(time(NULL));

    exports["getRandomSpawnCoordinates"] = Function::New(env, getRandomSpawnCoordinates);
    exports["shouldSpawnHostileEntity"] = Function::New(env, shouldSpawnHostileEntity);
    exports["smoothTeleportToPlayer"] = Function::New(env, smoothTeleportToPlayer);
    exports["getRandomYawRotation"] = Function::New(env, getRandomYawRotation);
    exports["setSpawnYCoordinate"] = Function::New(env, setSpawnYCoordinate);
    exports["shouldFollowPlayer"] = Function::New(env, shouldFollowPlayer);
    exports["getRandomRuntimeId"] = Function::New(env, getRandomRuntimeId);
    exports["getRandomEntity"] = Function::New(env, getRandomEntity);
    exports["followPlayer"] = Function::New(env, followPlayer);
    exports["moveRandomly"] = Function::New(env, moveRandomly);

    debugLog("Initialized!");

    return exports;
}

NODE_API_MODULE(addon, init)