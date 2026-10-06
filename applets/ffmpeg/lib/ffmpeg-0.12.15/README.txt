ESM build of `@ffmpeg/ffmpeg` 0.12.15 (MIT, https://github.com/ffmpegwasm/ffmpeg.wasm),
copied verbatim from the npm package's `dist/esm/`. Served same-origin because the
class spawns a module Worker from `import.meta.url`, which browsers refuse cross-origin.
The ffmpeg core itself (`@ffmpeg/core`) is loaded from jsDelivr at runtime.
