import { ContextManager } from '@zcomponent/core';
import { DotScreenEffect, BlendFunction } from 'postprocessing';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';
import { translateToBlendFunction, BlendFunctionNames } from './enum/blend';

export type DotScreenEffectPassConstructorProps = EffectPassConstructorProps & {
	/**
	 * The angle of the dot pattern.
	 * @zprop
	 * @zdefault 1.57
	 */
	angle?: number;

	/**
	 * The scale of the dot pattern.
	 * @zprop
	 * @zdefault 1.0
	 */
	scale?: number;
};

/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/DotScreenEffectPass
 * @zparents three/Object3D/Group/**
 */
export class DotScreenEffectPass extends EffectPass<DotScreenEffect> {
	constructor(contextManager: ContextManager, props: DotScreenEffectPassConstructorProps) {
		const effect = new DotScreenEffect({
			blendFunction: translateToBlendFunction(props.blendFunction ?? BlendFunctionNames.ADD),
			angle: props.angle ?? 1.57,
			scale: props.scale ?? 1.0,
		});
		super(contextManager, props, effect);
	}

	public dispose() {
		return super.dispose();
	}
}
