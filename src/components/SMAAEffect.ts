import { ContextManager, Observable } from '@zcomponent/core';
import { SMAAEffect, SMAAPreset, EdgeDetectionMode, PredicationMode, BlendFunction } from 'postprocessing';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';

enum Quality {
	LOW = 'low',
	MEDIUM = 'medium',
	HIGH = 'high',
	ULTRA = 'ultra',
}

enum EdgeDetection {
	DEPTH = 'depth',
	LUMA = 'luma',
	COLOR = 'color',
}

function translateEdgeDetection(edgeDetection: EdgeDetection): EdgeDetectionMode {
	switch (edgeDetection) {
		case EdgeDetection.DEPTH:
			return EdgeDetectionMode.DEPTH;
		case EdgeDetection.LUMA:
			return EdgeDetectionMode.LUMA;
		case EdgeDetection.COLOR:
			return EdgeDetectionMode.COLOR;
	}
}

function translateQuality(quality: Quality): SMAAPreset {
	switch (quality) {
		case Quality.LOW:
			return SMAAPreset.LOW;
		case Quality.MEDIUM:
			return SMAAPreset.MEDIUM;
		case Quality.HIGH:
			return SMAAPreset.HIGH;
		case Quality.ULTRA:
			return SMAAPreset.ULTRA;
	}
}

export type SMAAEffectPassConstructorProps = EffectPassConstructorProps & {
	/**
	 * The quality preset of the SMAA.
	 * @zprop
	 * @zdefault "medium"
	 */
	preset?: Quality;

	/**
	 * The edge detection mode.
	 * @zprop
	 * @zdefault "color"
	 */
	edgeDetectionMode?: EdgeDetection;
};

/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/SMAAEffectPass
 * @zparents three/Object3D/Group/**
 */
export class SMAAEffectPass extends EffectPass<SMAAEffect> {
	constructor(contextManager: ContextManager, props: SMAAEffectPassConstructorProps) {
		const effect = new SMAAEffect({
			preset: translateQuality(props.preset ?? Quality.MEDIUM),
			edgeDetectionMode: translateEdgeDetection(props.edgeDetectionMode ?? EdgeDetection.COLOR),
		});

		super(contextManager, props, effect);
	}

	public dispose() {
		return super.dispose();
	}
}
