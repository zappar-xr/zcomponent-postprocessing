import { ContextManager, Observable } from '@zcomponent/core';
import { BloomEffect } from 'postprocessing';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';
import { translateToBlendFunction, BlendFunctionNames } from './enum/blend';

export type BloomEffectPassConstructorProps = EffectPassConstructorProps & {
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
	mipmapBlur?: boolean;

	/**
	 * The bloom intensity.
	 * @zprop
	 * @zdefault 1.0
	 */
	intensity?: number;
};

/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/BloomEffectPass
 * @zparents three/Object3D/Group/**
 */
export class BloomEffectPass extends EffectPass<BloomEffect> {
	constructor(contextManager: ContextManager, props: BloomEffectPassConstructorProps) {
		const effect = new BloomEffect({
			luminanceThreshold: props.luminanceThreshold ?? 0.9,
			luminanceSmoothing: props.luminanceSmoothing ?? 0.025,
			mipmapBlur: props.mipmapBlur ?? false,
			intensity: props.intensity ?? 1.0,
			blendFunction: translateToBlendFunction(props.blendFunction ?? BlendFunctionNames.ADD),
		});
		super(contextManager, props, effect);
	}

	public dispose() {
		return super.dispose();
	}
}
