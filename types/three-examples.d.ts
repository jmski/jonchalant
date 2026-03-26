/**
 * Minimal type shim for Three.js example loaders.
 * Three.js 0.183.x ships without bundled .d.ts files for examples/jsm.
 * Top-level imports are intentionally absent so declare module blocks
 * are treated as ambient (global) declarations.
 */

declare module 'three/examples/jsm/loaders/GLTFLoader.js' {
  import type { Group, AnimationClip, Camera } from 'three';

  export interface GLTF {
    scene: Group;
    scenes: Group[];
    cameras: Camera[];
    animations: AnimationClip[];
    parser: unknown;
    userData: Record<string, unknown>;
  }

  export class GLTFLoader {
    load(
      url: string,
      onLoad: (gltf: GLTF) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent | unknown) => void,
    ): void;

    loadAsync(
      url: string,
      onProgress?: (event: ProgressEvent) => void,
    ): Promise<GLTF>;

    setPath(path: string): this;
    setDRACOLoader(dracoLoader: unknown): this;
  }
}
