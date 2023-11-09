import { ContextManager, Observable } from '@zcomponent/core';
import { BlendFunction, HueSaturationEffect } from 'postprocessing';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';
import { translateToBlendFunction, BlendFunctionNames } from './enum/blend';

export type HueSaturationEffectPassConstructorProps = EffectPassConstructorProps & {
	/**
	 * The hue in radians.
	 * @zprop
	 * @zdefault 0.0
	 */
	hue?: number;

	/**
	 * The saturation factor, ranging from -1 to 1, where 0 means no change.
	 * @zprop
	 * @zdefault 0.0
	 */
	saturation?: number;
};

/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/HueSaturationEffectPass
 * @zparents three/Object3D/Group/**
 */
export class HueSaturationEffectPass extends EffectPass<HueSaturationEffect> {
	constructor(contextManager: ContextManager, props: HueSaturationEffectPassConstructorProps) {
		const effect = new HueSaturationEffect({
			blendFunction: translateToBlendFunction(props.blendFunction ?? BlendFunctionNames.SRC),
			hue: props.hue ?? 0.0,
			saturation: props.saturation ?? 0.0,
		});
		super(contextManager, props, effect);
	}

	public dispose() {
		return super.dispose();
	}
}
