import { ContextManager, Observable, getComponentsByTags, useIsLoaded, useOnBeforeRender } from '@zcomponent/core';
import { SelectiveBloomEffect, BlendFunction, Selection } from 'postprocessing';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';
import { useCamera, useScene } from '@zcomponent/three/lib/scenecontext';
import { Object3D as Z_Object3D } from '@zcomponent/three/lib/components/Object3D';
import * as THREE from 'three';
import { BlendFunctionNames, translateToBlendFunction } from './enum/blend';
export type SelectiveBloomEffectPassConstructorProps = EffectPassConstructorProps & {
	/**
	 * The luminance threshold. Raise this value to mask out darker elements in the scene.
	 * @zprop
	 * @zdefault 0.9
	 */
	luminanceThreshold?: number;

	/**
	 * Controls the smoothness of the luminance threshold.
	 * @zprop
	 * @zdefault 0.025
	 */
	luminanceSmoothing?: number;

	/**
	 * Enables or disables mipmap blur.
	 * @zprop
	 * @zdefault false
	 */
	mipmapBlur: boolean;

	/**
	 * The bloom intensity.
	 * @zprop
	 * @zdefault 1.0
	 */
	intensity?: number;

	/**
	 * Inverts the bloom mask.
	 * @zprop
	 * @zdefault false
	 */
	inverted: boolean;

	/**
	 * Ignores the background.
	 * @zprop
	 * @zdefault true
	 */
	ignoreBackground: boolean;
};

/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/SelectiveBloomEffectPass
 * @zparents three/Object3D/Group/**
 */
export class SelectiveBloomEffectPass extends EffectPass<SelectiveBloomEffect> {
	/**
	 * @zprop
	 * @zgrouppriority 20
	 */
	public bloomTags: string[] = [];

	public selection = new Selection();

	constructor(contextManager: ContextManager, props: SelectiveBloomEffectPassConstructorProps) {
		const camera = useCamera(contextManager).value;
		const scene = useScene(contextManager);

		const effect = new SelectiveBloomEffect(scene, camera, {
			blendFunction: translateToBlendFunction(props.blendFunction ?? BlendFunctionNames.ADD),
			luminanceThreshold: props.luminanceThreshold ?? 0.9,
			luminanceSmoothing: props.luminanceSmoothing ?? 0.025,
			mipmapBlur: props.mipmapBlur ?? false,
			intensity: props.intensity ?? 1.0,
		});
		effect.ignoreBackground = props.ignoreBackground ?? true;
		super(contextManager, props, effect);
		effect.inverted = props.inverted ?? false;
		effect.selection = this.selection;

		this.register(useIsLoaded(contextManager), this._onLoad);
	}

	private _onLoad = () => {
		this.register(useOnBeforeRender(this.contextManager), this._frame);
	};

	private previousTaggedElements = new Set<THREE.Object3D>();

	private currentTaggedElements = new Set<THREE.Object3D>();

	/**
	 * Updates the selection set at each frame, ensuring it only includes objects
	 * with the current bloom tags. It adds new objects that have recently been
	 * tagged and removes those that are no longer tagged, while preserving objects
	 * manually added by the user.
	 */
	private _frame = () => {
		const components = getComponentsByTags(this.contextManager, this.bloomTags);

		this.currentTaggedElements.clear();

		for (const component of components) {
			if (component instanceof Z_Object3D && component.element instanceof THREE.Object3D) {
				this.currentTaggedElements.add(component.element);
				if (!this.previousTaggedElements.has(component.element)) {
					this.selection.add(component.element);
				}
			}
		}

		this.previousTaggedElements.forEach(element => {
			if (!this.currentTaggedElements.has(element)) {
				this.selection.delete(element);
			}
		});

		this.previousTaggedElements = this.currentTaggedElements;
	};

	public dispose() {
		return super.dispose();
	}
}
