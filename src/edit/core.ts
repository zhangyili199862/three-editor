import { EventEmitter } from 'eventemitter3';
import * as THREE from 'three';
import SceneManager from './sceneManager';
import { ISceneConfig, defaultSceneConfig } from '@/sceneConfig/config';
export default class EditManager extends EventEmitter {
    sceneManager: SceneManager;
    scene: THREE.Scene | null = null;
    renderer: THREE.WebGLRenderer | null = null;
    constructor(canvas: HTMLCanvasElement) {
        super();
        
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ canvas });
        
        this.sceneManager = new SceneManager(this.scene, this.renderer);
        this.bindEvents();            
    }

    bindEvents() {
        this.on('add', (e) => {
            console.log(e);
            console.log('scene add ...')
        })
    }

    setUp(sceneConfig: ISceneConfig = defaultSceneConfig) {
        this.sceneManager.setScene(sceneConfig);
    }

    updateCongfig(sceneConfig: ISceneConfig) {
        this.sceneManager.setScene(sceneConfig);
    }

    destroy() {
        this.sceneManager.destroy();
        
    }
}