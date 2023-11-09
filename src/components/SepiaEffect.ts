import { ContextManager } from '@zcomponent/core';
import { SepiaEffect, BlendFunction } from 'postprocessing';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';
import { BlendFunctionNames, translateToBlendFunction } from './enum/blend';

export type SepiaEffectPassConstructorProps = EffectPassConstructorProps & {
	/**
	 * The intensity of the effect.
	 * @zprop
	 * @zdefault 1.0
	 */
	intensity?: number;
};
/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/SepiaEffectPass
 * @zparents three/Object3D/Group/**
 */
export class SepiaEffectPass extends EffectPass<SepiaEffect> {
	constructor(contextManager: ContextManager, props: SepiaEffectPassConstructorProps) {
		const effect = new SepiaEffect({
			blendFunction: translateToBlendFunction(props.blendFunction ?? BlendFunctionNames.NORMAL),
			intensity: props.intensity ?? 1.0,
		});

		super(contextManager, props, effect);
	}

	public dispose() {
		return super.dispose();
	}
}
