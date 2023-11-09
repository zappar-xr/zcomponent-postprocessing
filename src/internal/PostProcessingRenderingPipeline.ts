import * as THREE from 'three';
import { Effect, EffectPass, RenderPass } from 'postprocessing';

import { EffectComposer, Pass } from 'postprocessing';
import { IRenderPass, EffectPipeline } from '@zcomponent/three/lib/effectpipeline';
import { HalfFloatType } from 'three';
import { Observable } from '@zcomponent/core';

export class PostProcessingRenderingPipeline extends EffectPipeline {
	private effectComposer: EffectComposer;
	private _passes: [RenderPass | EffectPass, number][] = [];
	public constructed = new Observable<boolean>(false);
	private camera: THREE.Camera;
	public get passSize() {
		return this._passes.length;
	}

	public setCamera(camera: THREE.Camera) {
		this.camera = camera;
	}

	public createRenderPass(scene: THREE.Scene, camera: THREE.Camera): IRenderPass {
		return new (RenderPass as any)(scene, camera);
	}

	constructor(renderer: THREE.Renderer) {
		super(renderer);
		if (!(renderer instanceof THREE.WebGLRenderer)) return;
		const composer = new EffectComposer(renderer, {
			frameBufferType: HalfFloatType,
		});
		this.effectComposer = composer;
	}

	public setSize(width: number, height: number) {
		this.effectComposer.setSize(width, height);
	}

	public render(): void {
		let effectsRender = this.effectComposer !== undefined;
		if (this.renderer instanceof THREE.WebGLRenderer) {
			effectsRender = !(this.renderer as any).xr.isPresenting;
		}
		if (effectsRender) {
			this.effectComposer.render();
		} else {
			for (const [pass] of this._passes) {
				if (pass instanceof RenderPass) {
					this.renderer.render(pass.mainScene, pass.mainCamera);
				}
			}
		}
	}
	private passMap = new Map<Effect | RenderPass, RenderPass | EffectPass>();

	public registerPass(passOrEffect: Effect | RenderPass, priority: number) {
		let pass: RenderPass | EffectPass;
		pass = passOrEffect instanceof Effect ? new EffectPass(this.camera, passOrEffect) : passOrEffect;

		this.passMap.set(passOrEffect, pass);
		const index = this._passes.findIndex(([existingPass, existingPriority]) => existingPriority > priority);

		if (index === -1) {
			this.effectComposer.addPass(pass);
		} else {
			this.effectComposer.removePass(this._passes[index][0]);
			this.effectComposer.addPass(pass, index);
			this.effectComposer.addPass(this._passes[index][0], index + 1);
		}

		if (index === -1) {
			this._passes.push([pass, priority]);
		} else {
			this._passes.splice(index, 0, [pass, priority]);
		}
	}

	public unregisterPass(passOrEffect: Effect | RenderPass) {
		const passToRemove = this.passMap.get(passOrEffect);

		if (passToRemove) {
			this.effectComposer.removePass(passToRemove);
			this.passMap.delete(passOrEffect);

			if (this.effectComposer && this.effectComposer.autoRenderToScreen && this.effectComposer.passes.length > 0) {
				this.effectComposer.passes[this.effectComposer.passes.length - 1].renderToScreen = true;
			}

			const index = this._passes.findIndex(([storedPass]) => storedPass === passToRemove);
			if (index >= 0) {
				this._passes.splice(index, 1);
			}
		}
	}

	public dispose() {
		for (const [pass] of this._passes) {
			pass.dispose();
		}
		this.effectComposer.dispose();
	}
}
