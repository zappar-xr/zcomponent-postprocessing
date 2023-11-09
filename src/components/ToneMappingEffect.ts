import { ContextManager } from '@zcomponent/core';
import { ToneMappingEffect, ToneMappingMode, BlendFunction } from 'postprocessing';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';
import { BlendFunctionNames, translateToBlendFunction } from './enum/blend';
export enum _ToneMappingMode {
	REINHARD = 'reinhard',
	REINHARD2 = 'reinhard2',
	REINHARD2_ADAPTIVE = 'reinhard2-adaptive',
	OPTIMIZED_CINEON = 'optimized-cineon',
	ACES_FILMIC = 'aces-filmic',
}

export function translateToneMappingMode(mode: _ToneMappingMode): ToneMappingMode {
	switch (mode) {
		case _ToneMappingMode.REINHARD:
			return ToneMappingMode.REINHARD;
		case _ToneMappingMode.REINHARD2:
			return ToneMappingMode.REINHARD2;
		case _ToneMappingMode.REINHARD2_ADAPTIVE:
			return ToneMappingMode.REINHARD2_ADAPTIVE;
		case _ToneMappingMode.OPTIMIZED_CINEON:
			return ToneMappingMode.OPTIMIZED_CINEON;
		case _ToneMappingMode.ACES_FILMIC:
			return ToneMappingMode.ACES_FILMIC;
	}
}

export type ToneMappingEffectPassConstructorProps = EffectPassConstructorProps & {
	/**
	 * The tone mapping mode.
	 * @zprop
	 * @zdefault "aces-filmic"
	 */
	mode?: _ToneMappingMode;

	/**
	 * The resolution of the luminance texture. Must be a power of two.
	 * @zprop
	 * @zdefault 256
	 */
	resolution?: number;

	/**
	 * The white point.
	 * @zprop
	 * @zdefault 4.0
	 */
	whitePoint?: number;

	/**
	 * The middle grey factor.
	 * @zprop
	 * @zdefault 0.6
	 */
	middleGrey?: number;

	/**
	 * The minimum luminance. Prevents very high exposure in dark scenes.
	 * @zprop
	 * @zdefault 0.01
	 */
	minLuminance?: number;

	/**
	 * The average luminance. Used for the non-adaptive Reinhard operator.
	 * @zprop
	 * @zdefault 1.0
	 */
	averageLuminance?: number;

	/**
	 * The luminance adaptation rate.
	 * @zprop
	 * @zdefault 1.0
	 */
	adaptationRate?: number;
};

/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/ToneMappingEffectPass
 * @zparents three/Object3D/Group/**
 */
export class ToneMappingEffectPass extends EffectPass<ToneMappingEffect> {
	constructor(contextManager: ContextManager, props: ToneMappingEffectPassConstructorProps) {
		const effect = new ToneMappingEffect({
			blendFunction: translateToBlendFunction(props.blendFunction ?? BlendFunctionNames.SRC),
			mode: translateToneMappingMode(props.mode ?? _ToneMappingMode.ACES_FILMIC),
			resolution: props.resolution ?? 256,
			whitePoint: props.whitePoint ?? 4.0,
			middleGrey: props.middleGrey ?? 0.6,
			minLuminance: props.minLuminance ?? 0.01,
			averageLuminance: props.averageLuminance ?? 1.0,
			adaptationRate: props.adaptationRate ?? 1.0,
		});

		super(contextManager, props, effect);
	}

	public dispose() {
		return super.dispose();
	}
}
