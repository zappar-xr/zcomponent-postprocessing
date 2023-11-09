import { ContextManager } from '@zcomponent/core';
import { ChromaticAberrationEffect } from 'postprocessing';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';
import { Vector2 } from 'three';
import { translateToBlendFunction, BlendFunctionNames } from './enum/blend';

export type ChromaticAberrationEffectPassConstructorProps = EffectPassConstructorProps & {
	/**
	 * The color offset.
	 * @zdefault [0.001, 0.001]
	 * @zprop
	 */
	offset?: [number, number];

	/**
	 * Whether the effect should be modulated with a radial gradient.
	 * @zprop
	 * @zdefault false
	 */
	radialModulation: boolean;

	/**
	 * The modulation offset. Only applies if radialModulation is enabled.
	 * @zprop
	 * @zdefault 0.15
	 */
	modulationOffset?: number;
};

/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/ChromaticAberrationEffectPass
 * @zparents three/Object3D/Group/**
 */
export class ChromaticAberrationEffectPass extends EffectPass<ChromaticAberrationEffect> {
	constructor(contextManager: ContextManager, props: ChromaticAberrationEffectPassConstructorProps) {
		const effect = new ChromaticAberrationEffect({
			offset: new Vector2(props.offset?.[0] ?? 0.001, props.offset?.[1] ?? 0.001),
			radialModulation: props.radialModulation ?? false,
			modulationOffset: props.radialModulation ? props.modulationOffset ?? 0.15 : 0,
			blendFunction: translateToBlendFunction(props.blendFunction ?? BlendFunctionNames.ADD),
		});
		super(contextManager, props, effect);
	}

	public dispose() {
		return super.dispose();
	}
}
