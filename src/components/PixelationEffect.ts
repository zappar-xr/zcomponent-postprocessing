import { ContextManager, Observable } from '@zcomponent/core';
import { PixelationEffect } from 'postprocessing';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';

export type PixelationEffectPassConstructorProps = EffectPassConstructorProps & {
	/**
	 * The pixel granularity.
	 * @zprop
	 * @zdefault 30.0
	 */
	granularity?: number;
};
/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/PixelationEffectPass
 * @zparents three/Object3D/Group/**
 */
export class PixelationEffectPass extends EffectPass<PixelationEffect> {
	constructor(contextManager: ContextManager, props: PixelationEffectPassConstructorProps) {
		const effect = new PixelationEffect(props.granularity ?? 30.0);
		super(contextManager, props, effect);
	}

	public dispose() {
		return super.dispose();
	}
}
