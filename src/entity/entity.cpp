#include <napi.h>
#include <iostream>
#include <vector>
#include <ctime>

#define DEBUG

#define MAX_POSSIBLE_SPAWN_COORDINATES 15
#define MAX_X_COORDINATE 30
#define MAX_Y_COORDINATE 10
#define MAX_Z_COORDINATE 30

using namespace std;
using namespace Napi;

struct Vec3 {
    int x;
    int y;
    int z;
};

vector<Vec3> spawnCoordinates(MAX_POSSIBLE_SPAWN_COORDINATES);

void debugLog(string message) {
    #ifdef DEBUG
        cout << "EntityDebug | " << message << endl;
    #endif
}

void pregenerateRandomCoordinates() {
    srand(time(NULL));

    for (int coordinate = 0; coordinate < MAX_POSSIBLE_SPAWN_COORDINATES; coordinate++) {
        debugLog("Pregenerated a random Vec3");

        spawnCoordinates[coordinate].x = rand() % MAX_X_COORDINATE;
        spawnCoordinates[coordinate].y = rand() % MAX_Y_COORDINATE;
        spawnCoordinates[coordinate].z = rand() % MAX_Z_COORDINATE;
    }
}

Vec3 _getRandomSpawnCoordinate() {
    int coordinate = rand() % MAX_POSSIBLE_SPAWN_COORDINATES;

    return spawnCoordinates[coordinate];
}

Value getRandomSpawnCoordinate(const CallbackInfo& info) {
    Env env = info.Env();

    Vec3 coordinate = _getRandomSpawnCoordinate();
    
    Object result = Object::New(env);
    result["x"] = Number::New(env, coordinate.x);
    result["y"] = Number::New(env, coordinate.y);
    result["z"] = Number::New(env, coordinate.z);

    return result;
}

Object init(Env env, Object exports) {
    debugLog("Initializing...");

    pregenerateRandomCoordinates();

    exports["getRandomSpawnCoordinate"] = Function::New(env, getRandomSpawnCoordinate);
    
    debugLog("Initialized!");

    return exports;
}

NODE_API_MODULE(addon, init)
