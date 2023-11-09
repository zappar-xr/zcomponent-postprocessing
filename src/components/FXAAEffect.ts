import { ContextManager, Observable } from '@zcomponent/core';
import { FXAAEffect, BlendFunction } from 'postprocessing';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';
import { translateToBlendFunction, BlendFunctionNames } from './enum/blend';

export type FXAAEffectPassConstructorProps = EffectPassConstructorProps & {};

/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/FXAAEffectPass
 * @zparents three/Object3D/Group/**
 */
export class FXAAEffectPass extends EffectPass<FXAAEffect> {
	/**
	 * The maximum edge detection threshold. Range is [0.0, 1.0].
	 * @zprop
	 * @ztype proportion
	 * @zdefault 0.125
	 */
	public maxEdgeThreshold = new Observable(0.125, v => {
		this.element.maxEdgeThreshold = v;
	});
	/**
	 * The minimum edge detection threshold. Range is [0.0, 1.0].
	 * @zprop
	 * @ztype proportion
	 * @zdefault 0.0312
	 */
	public minEdgeThreshold = new Observable(0.0312, v => {
		// Type issue in postprocessing
		(this.element.minEdgeThreshold as unknown as number) = v;
	});

	/**
	 * The maximum amount of edge detection samples.
	 * @zprop
	 * @zdefault 12
	 */
	public samples = new Observable<number>(12, v => {
		this.element.samples = v;
	});

	/**
	 * The subpixel blend quality. Range is [0.0, 1.0].
	 * @zprop
	 * @ztype proportion
	 * @zdefault 0.75
	 */
	public subpixelQuality = new Observable<number>(0.75, v => {
		this.element.subpixelQuality = v;
	});

	constructor(contextManager: ContextManager, props: FXAAEffectPassConstructorProps) {
		const effect = new FXAAEffect({
			blendFunction: translateToBlendFunction(props.blendFunction ?? BlendFunctionNames.SRC),
		});

		super(contextManager, props, effect);
	}

	public dispose() {
		return super.dispose();
	}
}
