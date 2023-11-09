import { Camera, Vector3 } from 'three';
import { ShockWaveEffect as PostProcessingShockWaveEffect } from 'postprocessing';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';
import { ContextManager } from '@zcomponent/core';

export type ShockWaveEffectPassConstructorProps = EffectPassConstructorProps & {
	/**
	 * The world position of the shock wave.
	 * @zprop
	 */
	position?: Vector3;

	/**
	 * The animation speed.
	 * @zprop
	 * @zdefault 2.0
	 */
	speed?: number;

	/**
	 * The maximum radius of the shock wave.
	 * @zprop
	 * @zdefault 1.0
	 */
	maxRadius?: number;

	/**
	 * The wave size.
	 * @zprop
	 * @zdefault 0.2
	 */
	waveSize?: number;

	/**
	 * The distortion amplitude.
	 * @zprop
	 * @zdefault 0.05
	 */
	amplitude?: number;

	camera: any;
};

/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/ShockWaveEffectPass
 * @zparents three/Object3D/Group/**
 */
export class ShockWaveEffectPass extends EffectPass<PostProcessingShockWaveEffect> {
	/**
	 * Constructs a new ShockWaveEffectPass.
	 * @param contextManager - The context manager.
	 * @param props - The constructor properties.
	 */
	constructor(contextManager: ContextManager, props: ShockWaveEffectPassConstructorProps) {
		const effect = new PostProcessingShockWaveEffect(props.camera, props.position, {
			speed: props.speed ?? 2.0,
			maxRadius: props.maxRadius ?? 1.0,
			waveSize: props.waveSize ?? 0.2,
			amplitude: props.amplitude ?? 0.05,
		});

		super(contextManager, props, effect);
	}

	/**
	 * Disposes of the resources held by the pass.
	 */
	public dispose() {
		return super.dispose();
	}
}
