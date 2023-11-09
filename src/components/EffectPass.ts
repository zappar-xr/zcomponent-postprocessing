import { Component, ContextManager } from '@zcomponent/core';
import { BlendFunction, RenderPass, Effect } from 'postprocessing';
import { PostProcessingContext } from '../contexts/PostProcessingContext';
import { useCamera, useScene } from '@zcomponent/three/lib/scenecontext';
import { BlendFunctionNames } from './enum/blend';
export interface EffectPassConstructorProps {
	/** @zprop
	 * @zdefault 1
	 */
	renderPriority?: number;

	/**
	 * @zprop
	 */
	blendFunction?: BlendFunctionNames;
}
/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/EffectPass
 * @zparents three/Object3D/Group/**
 */
export class EffectPass<T extends Effect | RenderPass> extends Component {
	constructor(contextManager: ContextManager, props: EffectPassConstructorProps, public element: T) {
		const postProcessingContext = contextManager.get(PostProcessingContext);
		postProcessingContext.pipeline.setCamera(useCamera(contextManager).value);

		if (postProcessingContext.pipeline.passSize === 0) {
			const camera = useCamera(contextManager).value;
			const scene = useScene(contextManager);
			const renderPass = new RenderPass(scene, camera);
			postProcessingContext.pipeline.registerPass(renderPass, 0);
		}

		super(contextManager, props);
		this._attachListeners();
	}

	private _attachListeners() {
		this.enabledResolved.addListener(enabled => {
			if (enabled) this.registerPass();
			else this.unregisterPass();
		});
	}

	public registerPass() {
		const postProcessingContext = this.contextManager.get(PostProcessingContext);
		postProcessingContext.pipeline.registerPass(this.element, this.constructorProps?.renderPriority ?? 1);
	}

	public unregisterPass() {
		const postProcessingContext = this.contextManager.get(PostProcessingContext);
		postProcessingContext.pipeline.unregisterPass(this.element);
	}

	public dispose() {
		this.unregisterPass();
		return super.dispose();
	}
}
