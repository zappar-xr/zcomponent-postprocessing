import { ContextManager } from '@zcomponent/core';
import { ColorAverageEffect } from 'postprocessing';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';
import { translateToBlendFunction, BlendFunctionNames } from './enum/blend';

export type ColorAverageEffectPassConstructorProps = EffectPassConstructorProps & {};

/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/ColorAverageEffectPass
 * @zparents three/Object3D/Group/**
 */
export class ColorAverageEffectPass extends EffectPass<ColorAverageEffect> {
	constructor(contextManager: ContextManager, props: ColorAverageEffectPassConstructorProps) {
		const effect = new ColorAverageEffect(translateToBlendFunction(props.blendFunction ?? BlendFunctionNames.ADD));
		super(contextManager, props, effect);
	}

	public dispose() {
		return super.dispose();
	}
}
