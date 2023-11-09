import { ContextManager } from '@zcomponent/core';
import { KernelSize, TiltShiftEffect } from 'postprocessing';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';
import { _KernelSize, translateKernelSize } from './enum/kernel';
import { BlendFunctionNames, translateToBlendFunction } from './enum/blend';

export type TiltShiftEffectPassConstructorProps = EffectPassConstructorProps & {
	/**
	 * The relative offset of the focus area.
	 * @zprop
	 * @zdefault 0.0
	 */
	offset?: number;

	/**
	 * The rotation of the focus area in radians.
	 * @zprop
	 * @zdefault 0.0
	 */
	rotation?: number;

	/**
	 * The relative size of the focus area.
	 * @zprop
	 * @zdefault 0.4
	 */
	focusArea?: number;

	/**
	 * The softness of the focus area edges.
	 * @zprop
	 * @zdefault 0.3
	 */
	feather?: number;

	/**
	 * The blur kernel size.
	 * @zprop
	 * @zdefault "medium"
	 */
	kernelSize?: _KernelSize;

	/**
	 * The resolution scale.
	 * @zprop
	 * @zdefault 0.5
	 */
	resolutionScale?: number;

	/**
	 * The horizontal resolution.
	 * @zprop
	 * @zdefault Resolution.AUTO_SIZE
	 */
	resolutionX?: number;

	/**
	 * The vertical resolution.
	 * @zprop
	 * @zdefault Resolution.AUTO_SIZE
	 */
	resolutionY?: number;
};

/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/TiltShiftEffectPass
 * @zparents three/Object3D/Group/**
 */
export class TiltShiftEffectPass extends EffectPass<TiltShiftEffect> {
	constructor(contextManager: ContextManager, props: TiltShiftEffectPassConstructorProps) {
		const effect = new TiltShiftEffect({
			blendFunction: translateToBlendFunction(props.blendFunction ?? BlendFunctionNames.ADD),
			offset: props.offset ?? 0.0,
			rotation: props.rotation ?? 0.0,
			focusArea: props.focusArea ?? 0.4,
			feather: props.feather ?? 0.3,
			kernelSize: translateKernelSize(props.kernelSize ?? _KernelSize.MEDIUM),
			resolutionScale: props.resolutionScale ?? 0.5,
			resolutionX: props.resolutionX,
			resolutionY: props.resolutionY,
		});

		super(contextManager, props, effect);
	}

	public dispose() {
		return super.dispose();
	}
}
