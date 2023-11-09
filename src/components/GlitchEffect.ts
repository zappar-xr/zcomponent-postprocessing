import { ContextManager } from '@zcomponent/core';
import { GlitchEffect } from 'postprocessing';
import { Vector2, Texture } from 'three';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';
import { translateToBlendFunction, BlendFunctionNames } from './enum/blend';

export type GlitchEffectPassConstructorProps = EffectPassConstructorProps & {
	/**
	 * A chromatic aberration offset. If provided, the glitch effect will influence this offset.
	 * @zprop
	 */
	chromaticAberrationOffset?: [number, number];

	/**
	 * The minimum and maximum delay between glitch activations in seconds.
	 * @zprop
	 * @zdefault [1, 4]
	 */
	delay?: [number, number];

	/**
	 * The minimum and maximum duration of a glitch in seconds.
	 * @zprop
	 * @zdefault [0.05, 0.5]
	 */
	duration?: [number, number];

	/**
	 * The strength of weak and strong glitches.
	 * @zprop
	 * @zdefault [0.3, 1.0]
	 */
	strength?: [number, number];

	// /**
	//  * A perturbation map. If none is provided, a noise texture will be created.
	//  * @zprop
	//  */
	// perturbationMap?: Texture;

	/**
	 * The size of the generated noise map. Will be ignored if a perturbation map is provided.
	 * @zprop
	 * @zdefault 64
	 */
	dtSize?: number;

	/**
	 * The scale of the blocky glitch columns.
	 * @zprop
	 * @zdefault 0.05
	 */
	columns?: number;

	/**
	 * The threshold for strong glitches.
	 * @zprop
	 * @zdefault 0.85
	 */
	ratio?: number;
};

/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/GlitchEffectPass
 * @zparents three/Object3D/Group/**
 */
export class GlitchEffectPass extends EffectPass<GlitchEffect> {
	constructor(contextManager: ContextManager, props: GlitchEffectPassConstructorProps) {
		const effect = new GlitchEffect({
			chromaticAberrationOffset: props.chromaticAberrationOffset ? new Vector2(...props.chromaticAberrationOffset) : undefined,
			delay: props.delay ? new Vector2(...props.delay) : new Vector2(1, 4),
			duration: props.duration ? new Vector2(...props.duration) : new Vector2(0.05, 0.5),
			strength: props.strength ? new Vector2(...props.strength) : new Vector2(0.3, 1.0),
			// perturbationMap: props.perturbationMap,
			dtSize: props.dtSize ?? 64,
			columns: props.columns ?? 0.05,
			ratio: props.ratio ?? 0.85,
			blendFunction: translateToBlendFunction(props.blendFunction ?? BlendFunctionNames.ADD),
		});

		super(contextManager, props, effect);
	}

	public dispose() {
		return super.dispose();
	}
}
