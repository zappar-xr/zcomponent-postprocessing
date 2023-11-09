import { ContextManager, Observable } from '@zcomponent/core';
import { ScanlineEffect, BlendFunction } from 'postprocessing';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';
import { translateToBlendFunction, BlendFunctionNames } from './enum/blend';

export type ScanlineEffectPassConstructorProps = EffectPassConstructorProps & {
	/**
	 * The density of the scanlines. Higher values result in more scanlines.
	 * @zprop
	 * @zdefault 1.25
	 */
	density?: number;

	/**
	 * The speed at which the scanlines move vertically. Positive values scroll up, negative values scroll down.
	 * @zprop
	 * @zdefault 0.0
	 */
	scrollSpeed?: number;
};

/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/ScanlineEffectPass
 * @zparents three/Object3D/Group/**
 */
export class ScanlineEffectPass extends EffectPass<ScanlineEffect> {
	constructor(contextManager: ContextManager, props: ScanlineEffectPassConstructorProps) {
		const effect = new ScanlineEffect({
			blendFunction: translateToBlendFunction(props.blendFunction ?? BlendFunctionNames.OVERLAY),
			density: props.density ?? 1.25,
			// scrollSpeed: props.scrollSpeed ?? 0.0
		});

		super(contextManager, props, effect);
	}

	public dispose() {
		return super.dispose();
	}
}
