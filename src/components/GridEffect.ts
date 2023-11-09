import { ContextManager } from '@zcomponent/core';
import { GridEffect, BlendFunction } from 'postprocessing';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';
import { translateToBlendFunction, BlendFunctionNames } from './enum/blend';

export type GridEffectPassConstructorProps = EffectPassConstructorProps & {
	/**
	 * The scale of the grid pattern.
	 * @zprop
	 * @zdefault 1.0
	 */
	scale?: number;

	/**
	 * The line width of the grid pattern.
	 * @zprop
	 * @zdefault 0.0
	 */
	lineWidth?: number;
};

/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/GridEffectPass
 * @zparents three/Object3D/Group/**
 */
export class GridEffectPass extends EffectPass<GridEffect> {
	constructor(contextManager: ContextManager, props: GridEffectPassConstructorProps) {
		const effect = new GridEffect({
			blendFunction: translateToBlendFunction(props.blendFunction ?? BlendFunctionNames.OVERLAY),
			scale: props.scale ?? 1.0,
			lineWidth: props.lineWidth ?? 0.0,
		});

		super(contextManager, props, effect);
	}

	public dispose() {
		return super.dispose();
	}
}
