import { ContextManager, started, Observable } from '@zcomponent/core';
import { BlendFunction, RenderPass as _RenderPass } from 'postprocessing';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';
import { useCamera, useScene } from '@zcomponent/three/lib/scenecontext';
import { PostProcessingContext } from '../contexts/PostProcessingContext';

export type NoiseEffectPassConstructorProps = EffectPassConstructorProps;

/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/RenderPass
 * @zparents three/Object3D/Group/**
 */
export class RenderPass extends EffectPass<_RenderPass> {
	public ignoreBackground = new Observable<boolean>(false, ignore => {
		this.element.ignoreBackground = ignore;
	});

	constructor(contextManager: ContextManager, props: NoiseEffectPassConstructorProps) {
		const scene = useScene(contextManager);
		const camera = useCamera(contextManager).value;
		const effect = new _RenderPass(scene, camera);
		super(contextManager, props, effect);
	}

	public dispose() {
		return super.dispose();
	}
}
