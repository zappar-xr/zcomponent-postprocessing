import { ContextManager } from '@zcomponent/core';
import { BlendFunction, ColorDepthEffect } from 'postprocessing';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';
import { translateToBlendFunction, BlendFunctionNames } from './enum/blend';

export type ColorDepthEffectPassConstructorProps = EffectPassConstructorProps & {
	/**
	 * The color bit depth.
	 * @zprop
	 * @zdefault 16
	 */
	bits?: number;
};
/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/ColorDepthEffectPass
 * @zparents three/Object3D/Group/**
 */
export class ColorDepthEffectPass extends EffectPass<ColorDepthEffect> {
	constructor(contextManager: ContextManager, props: ColorDepthEffectPassConstructorProps) {
		const effect = new ColorDepthEffect({
			blendFunction: translateToBlendFunction(props.blendFunction ?? BlendFunctionNames.ADD),
			bits: props.bits ?? 16,
		});
		super(contextManager, props, effect);
	}

	public dispose() {
		return super.dispose();
	}
}
