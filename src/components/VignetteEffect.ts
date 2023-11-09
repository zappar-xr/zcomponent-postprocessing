import { ContextManager } from '@zcomponent/core';
import { VignetteEffect, VignetteTechnique } from 'postprocessing';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';
import { BlendFunctionNames, translateToBlendFunction } from './enum/blend';

enum _VignetteTechnique {
	DEFAULT = 'default',
	ESKIL = 'eskil',
}

export function translateVignetteTechnique(technique: _VignetteTechnique): VignetteTechnique {
	switch (technique) {
		case _VignetteTechnique.DEFAULT:
			return VignetteTechnique.DEFAULT;
		case _VignetteTechnique.ESKIL:
			return VignetteTechnique.ESKIL;
	}
}

export type VignetteEffectPassConstructorProps = EffectPassConstructorProps & {
	/**
	 * The vignette technique to be used.
	 * @zprop
	 * @zdefault "default"
	 */
	technique?: _VignetteTechnique;

	/**
	 * The vignette offset.
	 * @zprop
	 * @zdefault 0.5
	 */
	offset?: number;

	/**
	 * The darkness of the vignette.
	 * @zprop
	 * @zdefault 0.5
	 */
	darkness?: number;
};

/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/VignetteEffectPass
 * @zparents three/Object3D/Group/**
 */
export class VignetteEffectPass extends EffectPass<VignetteEffect> {
	constructor(contextManager: ContextManager, props: VignetteEffectPassConstructorProps) {
		const effect = new VignetteEffect({
			blendFunction: translateToBlendFunction(props.blendFunction ?? BlendFunctionNames.NORMAL),
			technique: translateVignetteTechnique(props.technique ?? _VignetteTechnique.DEFAULT),
			offset: props.offset ?? 0.5,
			darkness: props.darkness ?? 0.5,
		});

		super(contextManager, props, effect);
	}

	public dispose() {
		return super.dispose();
	}
}
