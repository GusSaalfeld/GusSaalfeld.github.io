//shader code imported from shadertoy.
//GLSL strings
import { MAX_TRAIL_PALETTE } from "./SlimeSettings";

// Agents take turns between species, so an agent's species comes from its index. Each species
// keeps its trail in one channel of the trail texture: species 0 in r, 1 in g, 2 in b, 3 in a.
const species = `
vec4 speciesMask(uint index, float speciesCount) {
    uint s = index % uint(max(speciesCount, 1.0));
    return vec4(equal(uvec4(0u, 1u, 2u, 3u), uvec4(s)));
}
`;

// Hash function www.cs.ubc.ca/~rbridson/docs/schechter-sca08-turbulence.pdf
const hash = `
uint hash(uint s) {
    s ^= 2747636419u;
    s *= 2654435769u;
    s ^= s >> 16;
    s *= 2654435769u;
    s ^= s >> 16;
    s *= 2654435769u;
    return s;
}

// Returns a normalized float between [0, 1]
float hash(vec2 p) {
    uvec2 u = floatBitsToUint(p);
    return float(hash(u.x ^ hash(u.y))) / 4294967295.0;
}

float toRange01(uint s) {
    return float(s) / 4294967295.0;
}
`;

// TODO: updateFrag
// Agent update pass. Each pixel of the target is one agent.
//Encode agents into a sampler2d: r,g = position (0..1 of the trail), b = heading in radians,
//a = 1 once the agent has been placed, 0 before that.
//Get each agent from current sampler2d
//update their position + orientation using sensors + random
//Update agent in new sampler2d
// Follows SlimeSim.compute's Update kernel. Speeds are per second, so they are multiplied by uDeltaTime.
export const updateAgentFrag = /* glsl */ `#version 300 es
precision highp float;
precision highp int;       // the hash needs real 32-bit integers
precision highp sampler2D; // fragment shaders default samplers to lowp
uniform sampler2D uAgents;
uniform sampler2D uTrail;
uniform float uDeltaTime;   // seconds per simulation step
uniform float uStep;        // step counter. It seeds the random numbers
uniform float uNumAgents;
uniform float uSpawnMode;   // 0 random, 1 point, 2 inward circle, 3 random circle
uniform float uWrap;        // 1 = wrap around the edges, 0 = bounce off them
uniform vec4 uMove;         // moveSpeed, turnSpeed (radians per second), sensor angle (radians), sensor distance
uniform float uSensorSize;
uniform float uSpeciesCount;
out vec4 fragColor;
${hash}
${species}

const float TAU = 6.2831853;

// Where a new agent starts and which way it faces.
vec4 spawn(uint index, vec2 size) {
    uint s = hash(index + hash(uint(uStep) + 1013u));
    float r1 = toRange01(s); s = hash(s);
    float r2 = toRange01(s); s = hash(s);
    float r3 = toRange01(s);

    vec2 centre = size * 0.5;
    vec2 start = centre;
    float angle = r3 * TAU;
    if (uSpawnMode < 0.5) {                 // random
        start = vec2(r1, r2) * size;
    } else if (uSpawnMode > 1.5) {          // inward circle (2) or random circle (3)
        float radius = (uSpawnMode < 2.5 ? 0.5 : 0.15) * min(size.x, size.y);
        start = centre + sqrt(r1) * vec2(cos(r2 * TAU), sin(r2 * TAU)) * radius;
        if (uSpawnMode < 2.5 && distance(start, centre) > 0.001) {
            vec2 toCentre = centre - start;
            angle = atan(toCentre.y, toCentre.x);
        }
    }                                       // else point: the centre

    return vec4(clamp(start / size, 0.0, 0.9999), angle, 1.0);
}

// Sum of the trail in a block of texels around a point ahead of the agent. weight scores each
// species' channel: +1 for the agent's own species, -1 for the others, so it avoids their trails.
float sense(vec2 pos, float angle, float dist, int radius, vec2 size, vec4 weight) {
    vec2 point = pos + vec2(cos(angle), sin(angle)) * dist;
    ivec2 centre = ivec2(point);
    ivec2 isize = ivec2(size);
    float sum = 0.0;
    for (int ox = -radius; ox <= radius; ox++) {
        for (int oy = -radius; oy <= radius; oy++) {
            ivec2 p = centre + ivec2(ox, oy);
            p = uWrap > 0.5 ? ((p % isize) + isize) % isize : clamp(p, ivec2(0), isize - 1);
            sum += dot(texelFetch(uTrail, p, 0), weight);
        }
    }
    return sum;
}

void main() {
    ivec2 id = ivec2(gl_FragCoord.xy);
    uint index = uint(id.y * textureSize(uAgents, 0).x + id.x);
    // The agents texture is a square, so the last few texels may have no agent.
    if (float(index) >= uNumAgents) { fragColor = vec4(0.0); return; }

    vec2 size = vec2(textureSize(uTrail, 0));
    vec4 agent = texelFetch(uAgents, id, 0);

    // A new texture is all zeros.
    // If alpha == 0, the agent hasn't been placed yet.
    if (agent.a == 0.0) agent = spawn(index, size);

    vec2 pos = agent.xy * size; // in trail texels
    float heading = agent.z;
    uint random = hash(uint(pos.y) * uint(size.x) + uint(pos.x) + hash(index + uint(uStep) * 100000u));

    int radius = int(uSensorSize);
    vec4 weight = speciesMask(index, uSpeciesCount) * 2.0 - 1.0;
    float left  = sense(pos, heading + uMove.z, uMove.w, radius, size, weight);
    float mid   = sense(pos, heading,           uMove.w, radius, size, weight);
    float right = sense(pos, heading - uMove.z, uMove.w, radius, size, weight);

    float strength = toRange01(random);
    float turn = uMove.y * uDeltaTime;

    //Strongest: middle
    if (mid > left && mid > right) {
        // keep going forward
    //Weakest: middle. Wander either way.
    } else if (mid < left && mid < right) {
        heading += (strength - 0.5) * 2.0 * turn;
    //Strongest: Right
    } else if (right > left) {
        heading -= strength * turn;
    //Strongest: Left
    } else if (left > right) {
        heading += strength * turn;
    }

    vec2 next = pos + vec2(cos(heading), sin(heading)) * uMove.x * uDeltaTime;
    if (uWrap > 0.5) {
        next = mod(next, size);
    } else if (next.x < 0.0 || next.x >= size.x || next.y < 0.0 || next.y >= size.y) {
        // Hit an edge: stay inside and pick a new random direction.
        heading = toRange01(hash(random)) * TAU;
        next = clamp(next, vec2(0.0), size - 1.0);
    }
    heading = mod(heading, TAU); // keep the angle small so cos/sin stay accurate

    fragColor = vec4(next / size, heading, 1.0);
}`;

// TODO: diffuseFrag
// Diffuse and decay pass. Follows the Diffuse kernel.
export const diffuseFrag = /* glsl */ `#version 300 es
precision highp float;
precision highp sampler2D;
uniform sampler2D uTrail;
uniform float uDeltaTime;
uniform float uDiffuseRate;
uniform float uDecayRate;
uniform float uTrailCap;
out vec4 fragColor;

void main() {
    ivec2 id = ivec2(gl_FragCoord.xy);
    ivec2 size = textureSize(uTrail, 0);

    // 3x3 blur with four reads instead of nine. The trail is bilinearly filtered, so a read
    // on the boundary between two texels returns their average. Along each axis the three
    // weights 1/3, 1/3, 1/3 are one read between texels id-1 and id (weight 2/3) plus one
    // read at texel id+1 (weight 1/3).
    // Reads past the edge follow the trail texture's wrap mode, which SlimeSim sets from
    // wrapEdges: clamped when agents bounce off the edges, repeating when they wrap around.
    vec2 texel = 1.0 / vec2(size);
    vec2 a = vec2(id) * texel;          // boundary between id-1 and id
    vec2 b = (vec2(id) + 1.5) * texel;  // centre of texel id+1
    vec4 average = (4.0 * texture(uTrail, a)
                  + 2.0 * texture(uTrail, vec2(a.x, b.y))
                  + 2.0 * texture(uTrail, vec2(b.x, a.y))
                  + texture(uTrail, b)) / 9.0;

    vec4 original = texelFetch(uTrail, id, 0);
    vec4 blurred = mix(original, average, clamp(uDiffuseRate * uDeltaTime, 0.0, 1.0));
    // Fade linearly, and never go above the cap.
    fragColor = clamp(blurred - uDecayRate * uDeltaTime, 0.0, uTrailCap);
}`;

// TODO: displayFrag
// Display pass. Reads the trail texture and maps its intensity to a color
// palette, then writes to the canvas (no render target). This is the only
// pass the viewer sees directly. The canvas is one pixel per CSS pixel and the trail
// is smaller, so this pass also does the upscaling.
export const displayFrag = /* glsl */ `#version 300 es
precision highp float;
precision highp sampler2D;
uniform sampler2D uTrail;
uniform vec3 uBackground;
uniform vec3 uPalette[${4 * MAX_TRAIL_PALETTE}]; // each species' trail colours, faint to strong, ${MAX_TRAIL_PALETTE} slots per species
uniform vec4 uPaletteSizes; // how many colours each species uses, at least 1
uniform float uSpeciesCount;
uniform int uPixelated;     // 1 = nearest texel (blocky), 0 = Catmull-Rom bicubic (smooth and crisp)
uniform float uSteps;       // 0 = smooth blend, n = n distinct shades above the background
in vec2 vUv;
out vec4 fragColor;

// Catmull-Rom bicubic upscale in 9 bilinear taps instead of 16 point taps.
// From Matt Pettineo's "Bicubic filtering in fewer taps". Filters all four species' channels at once.
vec4 sampleCatmullRom(vec2 uv) {
    vec2 texSize = vec2(textureSize(uTrail, 0));
    vec2 samplePos = uv * texSize;
    vec2 texPos1 = floor(samplePos - 0.5) + 0.5;
    vec2 f = samplePos - texPos1;

    vec2 w0 = f * (-0.5 + f * (1.0 - 0.5 * f));
    vec2 w1 = 1.0 + f * f * (-2.5 + 1.5 * f);
    vec2 w2 = f * (0.5 + f * (2.0 - 1.5 * f));
    vec2 w3 = f * f * (-0.5 + 0.5 * f);

    // The middle two taps share one bilinear read, placed between them by their weights.
    vec2 w12 = w1 + w2;
    vec2 p0 = (texPos1 - 1.0) / texSize;
    vec2 p12 = (texPos1 + w2 / w12) / texSize;
    vec2 p3 = (texPos1 + 2.0) / texSize;

    vec4 r = vec4(0.0);
    r += texture(uTrail, vec2(p0.x,  p0.y))  * w0.x  * w0.y;
    r += texture(uTrail, vec2(p12.x, p0.y))  * w12.x * w0.y;
    r += texture(uTrail, vec2(p3.x,  p0.y))  * w3.x  * w0.y;
    r += texture(uTrail, vec2(p0.x,  p12.y)) * w0.x  * w12.y;
    r += texture(uTrail, vec2(p12.x, p12.y)) * w12.x * w12.y;
    r += texture(uTrail, vec2(p3.x,  p12.y)) * w3.x  * w12.y;
    r += texture(uTrail, vec2(p0.x,  p3.y))  * w0.x  * w3.y;
    r += texture(uTrail, vec2(p12.x, p3.y))  * w12.x * w3.y;
    r += texture(uTrail, vec2(p3.x,  p3.y))  * w3.x  * w3.y;
    return r;
}

void main() {
    vec4 raw = uPixelated == 1
        ? texelFetch(uTrail, ivec2(vUv * vec2(textureSize(uTrail, 0))), 0)
        : sampleCatmullRom(vUv);

    // Each pixel shows the species with the strongest trail there
    int s = 0;
    float t = raw.r;
    for (int k = 1; k < 4; k++) {
        if (float(k) < uSpeciesCount && raw[k] > t) { s = k; t = raw[k]; }
    }
    t = clamp(t, 0.0, 1.0); // Catmull-Rom can overshoot slightly at sharp edges
    // Snap to even steps. Faint trail below the first step stays background, and the min lets a full trail reach the top step
    if (uSteps > 0.0) t = min(floor(t * (uSteps + 1.0)), uSteps) / uSteps;

    // Walk that species' colour stops, background first: t picks a pair of neighbours and blends between them
    int n = int(uPaletteSizes[s]);
    float x = t * float(n);
    int i = min(int(x), n - 1);
    int base = s * ${MAX_TRAIL_PALETTE};
    vec3 from = uBackground;
    if (i > 0) from = uPalette[base + i - 1];
    fragColor = vec4(mix(from, uPalette[base + i], x - float(i)), 1.0);
}`;

// 
// sets triangle to background
// Store triangle's position into clip space with gl position
// Pass triangle's uv to fragment shaders so they can use it.
export const fullscreenVert = /* glsl */ `#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

//depositvert -> create points based on the new agent position.
// The point carries the amount of trail to add, in its species' channel.
export const depositVert = /* glsl */ `#version 300 es
precision highp sampler2D;
in float aId;               // the agent's index, which locates its texel
uniform sampler2D uAgents;
uniform float uTrailWeight;
uniform float uDeltaTime;
uniform float uSpeciesCount;
flat out vec4 vDeposit;
${species}

void main() {
    int side = textureSize(uAgents, 0).x;
    int i = int(aId);
    vec4 agent = texelFetch(uAgents, ivec2(i % side, i / side), 0);
    vDeposit = speciesMask(uint(i), uSpeciesCount) * uTrailWeight * uDeltaTime;
    gl_Position = vec4(agent.xy * 2.0 - 1.0, 0.0, 1.0); // 0..1 -> clip space
    gl_PointSize = 1.0;
}`;

//depositfrag -> Deposit pheremone at points set in deposit vert.
// Additive blending (set in SlimeSim) sums this for every agent on the same pixel.
export const depositFrag = /* glsl */ `#version 300 es
precision highp float;
flat in vec4 vDeposit;
out vec4 fragColor;

void main() {
    fragColor = vDeposit;
}`;

// Shows the agents themselves as dots (the showAgentsOnly setting).
export const agentsOnlyVert = /* glsl */ `#version 300 es
precision highp sampler2D;
in float aId;
uniform sampler2D uAgents;
uniform float uPointSize;   // canvas pixels per trail texel, so dots stay one texel across

void main() {
    int side = textureSize(uAgents, 0).x;
    int i = int(aId);
    vec4 agent = texelFetch(uAgents, ivec2(i % side, i / side), 0);
    gl_Position = vec4(agent.xy * 2.0 - 1.0, 0.0, 1.0);
    gl_PointSize = uPointSize;
}`;

export const agentsOnlyFrag = /* glsl */ `#version 300 es
precision highp float;
uniform vec3 uColour;
out vec4 fragColor;

void main() {
    fragColor = vec4(uColour, 1.0);
}`;
