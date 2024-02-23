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
const int MAX_ENTITIES = 15;

/**
 * Maximum X coordinate for entity spawning
 */
const int MAX_X_COORDINATE = 60;

/**
 * The Y coordinate for entity spawning
 */
int SPAWN_Y_COORDINATE = (int) nullptr;

/**
 * Maximum Z coordinate for entity spawning
 */
const int MAX_Z_COORDINATE = 60;

/**
 * The night time as a number in ticks
 */
const int NIGHT_TIME = 1600;

/**
 * A macro returns a random element from an array
 */
#define randof(array) array[std::rand() % (sizeof(array) / sizeof(array[0]))]

/**
 * Returns a random boolean (true/false)
 */
#define RANDOM_BOOL (std::rand() % 11) > 5

/**
 * The amount of entities spawned
 */
int entities_spawned = 0;

/**
 * An array of all possible entities to spawn
 */
std::vector<std::string> entities = {
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
    Right,
    Left,
};

/**
 * Vector2 structure
 * 
 * @struct
 */
#pragma pack(push, 1)
struct Vec2 {
    int x;
    int z;
};
#pragma pack(pop)

/**
 * Prints a debug message to the console.
 * 
 * @attention Only available if debugging is enabled, otherwise does nothing
 */
void debug_log(const std::string& message) {
    #ifdef DEBUG
        std::cout << "EntityDebug | " << message << std::endl;
    #endif
}

/**
 * Prints an error message to the console.
 */
void error_log(const std::string& message) {
    std::cerr << "EntityError | " << message << std::endl;
}

/**
 * An internal that sets the Y-coordinate where entities should spawn.
 */
void _set_spawn_y_coordinate(int coordinate) {
    SPAWN_Y_COORDINATE = coordinate;
}

/**
 * An internal function that returns a random yaw rotation
 * 
 * @return A random yaw rotation
 */
int _get_random_yaw_rotation() {
    return RANDOM_BOOL ? 90 : -90; 
}

/**
 * An internal function that checks if the entity limit has been reached
 * 
 * @return True if the entity limit has been reached, false otherwise
 */
bool _is_entity_limit_reached() {
    entities_spawned = entities_spawned + 1;

    return (entities_spawned > MAX_ENTITIES);
}

/**
 * An internal function that returns a random entity from the entities array
 * 
 * @return A random entity
 */
std::string _get_random_entity() {
    return entities[rand() % entities.size()];
}

/**
 * An internal function that determines if a hostile entity should be
 * spawned based on the time
 * 
 * @attention Always returns true in debug mode
 * 
 * @param time The time
 * @param world_type The world type
 * @return True if a hostile entity should be spawned, false otherwise
 */
bool _should_spawn_hostile_entities(int time, const std::string& world_type) {
    #ifdef DEBUG
       bool should_spawn = true;
    #else 
       bool should_spawn = (time > NIGHT_TIME) && (rand() % 5 > 3) && (world_type != "void");
    #endif

    return should_spawn && !_is_entity_limit_reached();
}

/**
 * An internal function that returns a random runtime ID
 * 
 * @return A random runtime ID
 */
int _get_random_runtime_id() {
    return rand();
}

/**
 * An internal function that determines if an entity 
 * should follow a player based on the player's gamemode, 
 * whether the player is dead, and the distance between the entity and the player
 * 
 * @param player_gamemode The player's gamemode
 * @param is_player_dead Whether the player is dead
 * @param entity_x The entity's X coordinate
 * @param player_x The player's X coordinate
 * @param is_following A boolean indicating if an entity is already following the player, false otherwise
 * @return A boolean indicating if the entity should follow the player, false otherwise
 */
bool _should_follow_player(
    const std::string& player_gamemode, 
    bool is_player_dead, 
    int entity_x, 
    int player_x, 
    bool is_following
) {
    return (
        (player_gamemode == "survival" || player_gamemode == "adventure") && 
        ((player_x - entity_x) < 7) && 
        !is_player_dead &&
        !is_following
    );
}

/**
 * An internal function that returns random coordinates
 * 
 * @return A Vec2 structure containing the random coordinates
 */
Vec2 _get_random_coordinates() {
    return { rand() % MAX_X_COORDINATE, rand() % MAX_Z_COORDINATE };
}

/**
 * An internal function that moves an entity in random directions
 * 
 * @param runtime_id The runtime ID of the entity
 * @param original_x The original X coordinate of the entity
 * @param original_z The original Z coordinate of the entity
 */
std::string _move_randomly(int runtime_id, float original_x, float original_z) {
    std::string result = "";

    int direction = rand() % 4;

    for (int x = 0; x < 60; x++) {
        original_x = (direction == Direction::Forward) ? original_x + 0.1 : (direction == Direction::Backward) ? original_x - 0.1 : original_x;

        result += "this.teleport_entity(" + std::to_string(runtime_id) + ", " + std::to_string(original_x) + ", " + std::to_string(SPAWN_Y_COORDINATE) + ", " + std::to_string(original_z) + ");";
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
 * @return A std::string containing the code to execute for teleporting the entity.
 */
std::string _smooth_teleport_to_player(
    int runtimeId, 
    float playerX, 
    float playerZ, 
    float entityX, 
    float entityY, 
    float entityZ
) {
    std::string result = "";
    
    for (int x = 0; x < entityX; x++) {
        int movementX = playerX - entityX;
        int movementZ = playerZ + (entityZ / 50);
        
        result = result + "this.teleport_entity(" + std::to_string(runtimeId) + ", " + std::to_string(movementX) + ", " + std::to_string(entityY) + ", " + std::to_string(movementZ) + ");";
    }

    return result;
}

/**
 * An internal function that makes an entity follow a player.
 * 
 * @param runtime_id The runtime ID of the entity.
 * @param player_x The X coordinate of the player.
 * @param player_z The Z coordinate of the player.
 * @param entity_x The X coordinate of the entity.
 * @param entity_y The Y coordinate of the entity.
 * @param entity_z The Z coordinate of the entity.
 */
std::string _follow_player(
    int runtime_id, 
    float player_x, 
    float player_z, 
    float entity_x, 
    float entity_y, 
    float entity_z
) {
    int movement_x = player_x + (entity_x / 50);
    int movement_z = player_z + (entity_z / 50);

    return "this.teleport_entity(" + std::to_string(runtime_id) + ", " + std::to_string(movement_x) + ", " + std::to_string(entity_y) + ", " + std::to_string(movement_z) + ");";
}

/**
 * Determines if an entity should follow a player based on the player's gamemode, 
 * whether the player is dead, and the distance between the entity and the player
 * 
 * @param info The callback info
 * @return A boolean indicating whether the entity should follow the player
 */
Napi::Value should_follow_player(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    std::string gamemode = info[0].As<Napi::String>().Utf8Value();
    bool is_dead = info[1].As<Napi::Boolean>().Value();
    int entity_x = info[2].As<Napi::Number>().Int32Value();
    int player_x = info[3].As<Napi::Number>().Int32Value();
    bool is_following = info[4].As<Napi::Boolean>().Value();

    bool should_follow = _should_follow_player(
        gamemode, 
        is_dead, 
        entity_x, 
        player_x, 
        is_following
    );

    return Napi::Boolean::New(env, should_follow);
}

/**
 * Sets the Y-coordinate where entities should spawn.
 */
Napi::Value set_spawn_y_coordinate(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    int spawnY = info[0].As<Napi::Number>().Int32Value();

    _set_spawn_y_coordinate(spawnY);

    return Napi::Boolean::New(env, true);
}

/**
 * Returns random coordinates for entity spawning
 * 
 * @param info The callback info
 * @return An object containing the random coordinates
 */
Napi::Value get_random_spawn_coordinates(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    Vec2 spawn_coordinates = _get_random_coordinates();

    Napi::Object result = Napi::Object::New(env);

    result["x"] = Napi::Number::New(env, spawn_coordinates.x);
    result["y"] = Napi::Number::New(env, SPAWN_Y_COORDINATE);
    result["z"] = Napi::Number::New(env, spawn_coordinates.z);

    return result;
}

/**
 * Returns a random entity from the entities array
 * 
 * @param info The callback info
 * @return A std::string containing the name of the random entity
 */
Napi::Value get_random_entity(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    
    std::string entity_name = _get_random_entity();

    return Napi::String::New(env, entity_name);
}

/**
 * Moves an entity randomly
 * 
 * @param info The callback info
 * @return A std::string containing the code to execute for moving the entity
 */
Napi::Value move_randomly(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    int runtime_id = info[0].As<Napi::Number>().Int32Value();    
    float coordinate_x = info[1].As<Napi::Number>().FloatValue();
    float coordinate_z = info[2].As<Napi::Number>().FloatValue();

    std::string code_to_execute = _move_randomly(
        runtime_id, 
        coordinate_x, 
        coordinate_z
    );

    return Napi::String::New(env, code_to_execute);
}

/**
 * Determines whether a hostile entity should be spawned based on the current time.
 * 
 * @param info The callback info. It should contain the current time.
 * @return A boolean Napi::Value indicating whether a hostile entity should be spawned.
 */
Napi::Value should_spawn_hostile_entities(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    int time = info[0].As<Napi::Number>().Int32Value();
    std::string worldType = info[1].As<Napi::String>().Utf8Value();

    return Napi::Boolean::New(env, _should_spawn_hostile_entities(time, worldType));
}

/**
 * Generates a random runtime ID.
 * 
 * @param info The callback info. 
 * @return A random runtime ID.
 */
Napi::Value get_random_runtime_id(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    return Napi::Number::New(env, _get_random_runtime_id());
}

/**
 * Generates a random yaw rotation.
 * 
 * @param info The callback info. 
 * @return A random yaw rotation.
 */
Napi::Value get_random_yaw_rotation(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    return Napi::Number::New(env, _get_random_yaw_rotation());
}

/**
 * Smoothly teleports an entity to the player
 * 
 * @param info The callback info
 */
Napi::Value smooth_teleport_to_player(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    int runtimeId = info[0].As<Napi::Number>().Int32Value();    
    float playerX = info[1].As<Napi::Number>().FloatValue();
    float playerZ = info[2].As<Napi::Number>().FloatValue();
    float entityX = info[3].As<Napi::Number>().FloatValue();
    float entityY = info[4].As<Napi::Number>().FloatValue();
    float entityZ = info[5].As<Napi::Number>().FloatValue();

    std::string code_to_execute = _smooth_teleport_to_player(
        runtimeId, 
        playerX, 
        playerZ, 
        entityX, 
        entityY, 
        entityZ
    );

    return Napi::String::New(env, code_to_execute);
}

/**
 * Makes an entity follow the player.
 * 
 * @param info The callback info.
 */
Napi::Value follow_player(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    int runtime_id = info[0].As<Napi::Number>().Int32Value();    
    float player_x = info[1].As<Napi::Number>().FloatValue();
    float player_z = info[2].As<Napi::Number>().FloatValue();
    float entity_x = info[3].As<Napi::Number>().FloatValue();
    float entity_y = info[4].As<Napi::Number>().FloatValue();
    float entity_z = info[5].As<Napi::Number>().FloatValue();

    std::string code_to_execute = _follow_player(
        runtime_id, 
        player_x, 
        player_z, 
        entity_x, 
        entity_y, 
        entity_z
    );

    return Napi::String::New(env, code_to_execute);
}

/**
 * Initializes the module.
 * 
 * @param env The environment in which the module is being initialized.
 * @param exports The object to which the module's exports will be attached.
 * @return The exports object with the module's exports attached.
 */
Napi::Object init(Napi::Env env, Napi::Object exports) {
    debug_log("Initializing...");

    srand(time(nullptr));

    exports["should_spawn_hostile_entities"] = Napi::Function::New(env, should_spawn_hostile_entities);
    exports["get_random_spawn_coordinates"] = Napi::Function::New(env, get_random_spawn_coordinates);
    exports["smooth_teleport_to_player"] = Napi::Function::New(env, smooth_teleport_to_player);
    exports["get_random_yaw_rotation"] = Napi::Function::New(env, get_random_yaw_rotation);
    exports["set_spawn_y_coordinate"] = Napi::Function::New(env, set_spawn_y_coordinate);
    exports["get_random_runtime_id"] = Napi::Function::New(env, get_random_runtime_id);
    exports["should_follow_player"] = Napi::Function::New(env, should_follow_player);
    exports["get_random_entity"] = Napi::Function::New(env, get_random_entity);
    exports["follow_player"] = Napi::Function::New(env, follow_player);
    exports["move_randomly"] = Napi::Function::New(env, move_randomly);

    debug_log("Initialized!");

    return exports;
}

NODE_API_MODULE(addon, init)