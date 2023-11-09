import { ContextManager } from '@zcomponent/core';
import { BlendFunction, BrightnessContrastEffect } from 'postprocessing';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';
import { translateToBlendFunction, BlendFunctionNames } from './enum/blend';

export type BrightnessContrastEffectPassConstructorProps = EffectPassConstructorProps & {
	/**
	 * The brightness factor, ranging from -1 to 1, where 0 means no change.
	 * @zprop
	 * @zdefault 0.0
	 */
	brightness?: number;

	/**
	 * The contrast factor, ranging from -1 to 1, where 0 means no change.
	 * @zprop
	 * @zdefault 0.0
	 */
	contrast?: number;
};

/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/BrightnessContrastEffectPass
 * @zparents three/Object3D/Group/**
 */
export class BrightnessContrastEffectPass extends EffectPass<BrightnessContrastEffect> {
	constructor(contextManager: ContextManager, props: BrightnessContrastEffectPassConstructorProps) {
		const effect = new BrightnessContrastEffect({
			blendFunction: translateToBlendFunction(props.blendFunction ?? BlendFunctionNames.SRC),
			brightness: props.brightness ?? 0.0,
			contrast: props.contrast ?? 0.0,
		});
		super(contextManager, props, effect);
	}

	public dispose() {
		return super.dispose();
	}
}
