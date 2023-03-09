import { ISceneConfig } from '@/sceneConfig/config';
import * as THREE from 'three';

import MaterialManager from './materialManager';

export default class SceneManager {
    public materialManager: MaterialManager;
    public loopStamp: number| null = null;
    public scene: THREE.Scene;
    public renderer: THREE.WebGLRenderer;
    public defaultCamera: THREE.Camera | null = null;
   
    constructor(scene: THREE.Scene, renderer: THREE.WebGLRenderer) {
        this.scene = scene;
        this.renderer = renderer;
        this.materialManager = new MaterialManager();
    }

    setScene(sceneConfig: ISceneConfig) {
        // 清空场景中的对象
        this.clearScene();

        this.loadScene(sceneConfig);
    }

    // 清空场景中的对象
    clearScene() {
        this.materialManager.destroy();
    }

    loadScene(sceneConfig: ISceneConfig) {
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        
        this.defaultCamera = camera;

        // TODO 加载场景
        const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
        // const boxMaterial = this.materialManager.getMaterial('basic', { color: 0xff0000 });
        const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
        this.scene.add(boxMesh);
    }

    loop() {
        this.loopStamp = requestAnimationFrame(this.loop.bind(this));
        if(this.renderer && this.scene && this.defaultCamera) {
            this.renderer.render(this.scene, this.defaultCamera);
        }
    }

    destroy() {
        // 销毁循环
        if (this.loopStamp) {
            cancelAnimationFrame(this.loopStamp);
        }

        this.clearScene();
    }
}