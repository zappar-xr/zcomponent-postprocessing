import { ContextManager } from '@zcomponent/core';
import { BlendFunction, DepthEffect } from 'postprocessing';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';
import { translateToBlendFunction, BlendFunctionNames } from './enum/blend';

export type DepthEffectPassConstructorProps = EffectPassConstructorProps & {
	/**
	 * Whether the depth should be inverted.
	 * @zprop
	 * @zdefault false
	 */
	inverted: boolean;
};

/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/DepthEffectPass
 * @zparents three/Object3D/Group/**
 */
export class DepthEffectPass extends EffectPass<DepthEffect> {
	constructor(contextManager: ContextManager, props: DepthEffectPassConstructorProps) {
		const effect = new DepthEffect({
			blendFunction: translateToBlendFunction(props.blendFunction ?? BlendFunctionNames.SRC),
			inverted: props.inverted ?? false,
		});
		super(contextManager, props, effect);
	}

	public dispose() {
		return super.dispose();
	}
}
