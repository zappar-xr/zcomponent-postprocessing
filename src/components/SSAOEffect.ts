// import { ContextManager, Observable } from '@zcomponent/core';
// import { SSAOEffect, BlendFunction, Resolution } from 'postprocessing';
// import { Camera, Texture, Color } from 'three';
// import { EffectPass, EffectPassConstructorProps } from './EffectPass';

// export type SSAOEffectPassConstructorProps = EffectPassConstructorProps & {
// 	/**
// 	 * The camera to be used by the SSAO effect.
// 	 * @zprop
// 	 */
// 	camera?: Camera;

// 	/**
// 	 * A texture containing the scene normals.
// 	 * @zprop
// 	 */
// 	normalBuffer?: Texture;

// 	// SSAO Options
// 	/**
// 	 * The blend function of this effect.
// 	 * @zprop
// 	 * @zdefault BlendFunction.MULTIPLY
// 	 */
// 	blendFunction?: BlendFunction;

// 	/**
// 	 * The amount of samples per pixel. Should not be a multiple of the ring count.
// 	 * @zprop
// 	 * @zdefault 9
// 	 */
// 	samples?: number;

// 	/**
// 	 * The amount of spiral turns in the occlusion sampling pattern. Should be a prime number.
// 	 * @zprop
// 	 * @zdefault 7
// 	 */
// 	rings?: number;

// 	/**
// 	 * The world distance threshold at which the occlusion effect starts to fade out.
// 	 * @zprop
// 	 */
// 	worldDistanceThreshold?: number;

// 	/**
// 	 * The world distance falloff. Influences the smoothness of the occlusion cutoff.
// 	 * @zprop
// 	 */
// 	worldDistanceFalloff?: number;

// 	/**
// 	 * The world proximity threshold at which the occlusion starts to fade out.
// 	 * @zprop
// 	 */
// 	worldProximityThreshold?: number;

// 	/**
// 	 * The world proximity falloff. Influences the smoothness of the proximity cutoff.
// 	 * @zprop
// 	 */
// 	worldProximityFalloff?: number;

// 	/**
// 	 * The minimum radius scale.
// 	 * @zprop
// 	 * @zdefault 0.1
// 	 */
// 	minRadiusScale?: number;

// 	/**
// 	 * Determines how much the luminance of the scene influences the ambient occlusion.
// 	 * @zprop
// 	 * @zdefault 0.7
// 	 */
// 	luminanceInfluence?: number;

// 	/**
// 	 * The occlusion sampling radius, expressed as a scale relative to the resolution.
// 	 * @zprop
// 	 * @zdefault 0.1825
// 	 */
// 	radius?: number;

// 	/**
// 	 * The intensity of the ambient occlusion.
// 	 * @zprop
// 	 * @zdefault 1.0
// 	 */
// 	intensity?: number;

// 	/**
// 	 * An occlusion bias. Eliminates artifacts caused by depth discontinuities.
// 	 * @zprop
// 	 * @zdefault 0.025
// 	 */
// 	bias?: number;

// 	/**
// 	 * Influences the smoothness of the shadows. A lower value results in higher contrast.
// 	 * @zprop
// 	 * @zdefault 0.01
// 	 */
// 	fade?: number;

// 	/**
// 	 * The color of the ambient occlusion.
// 	 * @zprop
// 	 */
// 	color?: Color;

// 	/**
// 	 * The resolution scale.
// 	 * @zprop
// 	 * @zdefault 1.0
// 	 */
// 	resolutionScale?: number;

// 	/**
// 	 * The horizontal resolution.
// 	 * @zprop
// 	 * @zdefault Resolution.AUTO_SIZE
// 	 */
// 	resolutionX?: number;

// 	/**
// 	 * The vertical resolution.
// 	 * @zprop
// 	 * @zdefault Resolution.AUTO_SIZE
// 	 */
// 	resolutionY?: number;

// 	/**
// 	 *Enables or disables depth-aware upsampling. Has no effect if WebGL 2 is not supported.
// 	 * @zprop
// 	 * @zdefault true
// 	 */
// 	depthAwareUpsampling?: boolean;
// };

// /** @zcomponent
//  * @zgroup PostProcessing
//  * @zicon postprocess
//  * @ztag three/PostProcessing/SSAOEffectPass
//  * @zparents three/Object3D/Group/**
//  */
// export class SSAOEffectPass extends EffectPass<SSAOEffect> {
// 	constructor(contextManager: ContextManager, props: SSAOEffectPassConstructorProps) {
// 		const effect = new SSAOEffect(props.camera, props.normalBuffer, {
// 			blendFunction: props.blendFunction ?? BlendFunction.MULTIPLY,
// 			samples: props.samples ?? 9,
// 			rings: props.rings ?? 7,
// 			depthAwareUpsampling: props.depthAwareUpsampling ?? true,
// 			worldDistanceThreshold: props.worldDistanceThreshold ?? 0.0001,
// 			worldDistanceFalloff: props.worldDistanceFalloff ?? 0.0,
// 			worldProximityThreshold: props.worldProximityThreshold ?? 0.0001,
// 			worldProximityFalloff: props.worldProximityFalloff ?? 0.0,
// 			minRadiusScale: props.minRadiusScale ?? 0.1,
// 			luminanceInfluence: props.luminanceInfluence ?? 0.7,
// 			radius: props.radius ?? 0.1825,
// 			intensity: props.intensity ?? 1.0,
// 			bias: props.bias ?? 0.025,
// 			fade: props.fade ?? 0.01,
// 			color: props.color,
// 			resolutionScale: props.resolutionScale ?? 1.0,
// 			// todo- fix
// 			// resolution: new Resolution(props.resolutionX as any ?? Resolution.AUTO_SIZE, props.resolutionY ?? Resolution.AUTO_SIZE),
// 		});

// 		super(contextManager, props, effect);
// 	}

// 	public dispose() {
// 		return super.dispose();
// 	}
// }
