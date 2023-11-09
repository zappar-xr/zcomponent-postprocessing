import { ContextManager } from '@zcomponent/core';
import { BlendFunction, NoiseEffect } from 'postprocessing';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';
import { translateToBlendFunction, BlendFunctionNames } from './enum/blend';

export type NoiseEffectPassConstructorProps = EffectPassConstructorProps & {
	/**
	 * Whether the noise should be multiplied with the input colors prior to blending.
	 * @zprop
	 * @zdefault false
	 */
	premultiply?: boolean;
};

/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/NoiseEffectPass
 * @zparents three/Object3D/Group/**
 */
export class NoiseEffectPass extends EffectPass<NoiseEffect> {
	constructor(contextManager: ContextManager, props: NoiseEffectPassConstructorProps) {
		const effect = new NoiseEffect({
			blendFunction: translateToBlendFunction(props.blendFunction ?? BlendFunctionNames.SCREEN),
			premultiply: props.premultiply ?? false,
		});
		super(contextManager, props, effect);
	}

	public dispose() {
		return super.dispose();
	}
}
