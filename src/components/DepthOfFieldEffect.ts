import { DepthOfFieldEffect, BlendFunction, Resolution } from 'postprocessing';
import { ContextManager } from '@zcomponent/core';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';
import { Camera } from '@zcomponent/three/lib/components/cameras/Camera';
import { translateToBlendFunction, BlendFunctionNames } from './enum/blend';

export interface DepthOfFieldEffectPassConstructorProps extends EffectPassConstructorProps {
	/**
	 * The main camera.
	 * @zprop
	 * @zvalues nodeids three/Object3D/Camera/**
	 */
	camera: string;

	/**
	 * The focus distance in world units.
	 * @zprop
	 */
	worldFocusDistance?: number;

	/**
	 * The focus distance in world units.
	 * @zprop
	 */
	worldFocusRange?: number;

	/**
	 * The normalized focus distance. Range is [0.0, 1.0].
	 * @zprop
	 * @zdefault 0.0
	 */
	focusDistance?: number;

	/**
	 * The focus range. Range is [0.0, 1.0].
	 * @zprop
	 * @zdefault 0.1
	 */
	focusRange?: number;

	/**
	 * Deprecated.
	 * @deprecated
	 */
	focalLength?: number;

	/**
	 * The scale of the bokeh blur.
	 * @zprop
	 * @zdefault 1.0
	 */
	bokehScale?: number;

	/**
	 * The resolution scale.
	 * @zprop
	 * @zdefault 0.5
	 */
	resolutionScale?: number;

	/**
	 * The horizontal resolution.
	 * Defaults to Resolution.AUTO_SIZE.
	 * @zprop
	 * @zdefault 0
	 */
	resolutionX?: number;

	/**
	 * The vertical resolution.
	 * Defaults to Resolution.AUTO_SIZE.
	 * @zprop
	 * @zdefault 0
	 */
	resolutionY?: number;
}

/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/DepthOfFieldEffectPass
 * @zparents three/Object3D/Group/**
 */
export class DepthOfFieldEffectPass extends EffectPass<DepthOfFieldEffect> {
	constructor(contextManager: ContextManager, props: DepthOfFieldEffectPassConstructorProps) {
		const effect = new DepthOfFieldEffect(undefined, {
			blendFunction: translateToBlendFunction(props.blendFunction ?? BlendFunctionNames.ADD),
			focusDistance: props.focusDistance ?? 0.0,
			focusRange: props.focusRange ?? 0.1,
			bokehScale: props.bokehScale ?? 1.0,
			resolutionScale: props.resolutionScale ?? 0.5,
			resolutionX: props.resolutionX ?? Resolution.AUTO_SIZE,
			resolutionY: props.resolutionY ?? Resolution.AUTO_SIZE,
		});

		super(contextManager, props, effect);

		const zcomp = this.getZComponentInstance();
		const camera = zcomp.entityByID.get(props.camera);
		if (!camera || !(camera instanceof Camera)) return;
		effect.mainCamera = camera.element;
	}

	public dispose() {
		return super.dispose();
	}
}
