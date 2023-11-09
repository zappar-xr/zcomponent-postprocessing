import { ContextManager } from '@zcomponent/core';
import { GodRaysEffect } from 'postprocessing';
import { Points, Texture } from 'three';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';
import { BlendFunction, KernelSize, Resolution } from 'postprocessing';
import { Camera } from '@zcomponent/three/lib/components/cameras/Camera';
import { Mesh } from '@zcomponent/three/lib/components/meshes/Mesh';
import * as THREE from 'three';
import { _KernelSize, translateKernelSize } from './enum/kernel';
import { translateToBlendFunction, BlendFunctionNames } from './enum/blend';

export type GodRaysEffectPassConstructorProps = EffectPassConstructorProps & {
	/**
	 * The main camera.
	 * @zprop
	 * @zvalues nodeids three/Object3D/Camera/**
	 */
	camera: string;

	/**
	 * The light source. Must not write depth and has to be flagged as transparent.
	 * @zprop
	 * @zvalues nodeids three/Object3D/Mesh/**
	 */
	lightSource: string;

	/**
	 * The number of samples per pixel.
	 * @zprop
	 * @zdefault 60.0
	 */
	samples?: number;

	/**
	 * The density of the light rays.
	 * @zprop
	 * @zdefault 0.96
	 */
	density?: number;

	/**
	 * An illumination decay factor.
	 * @zprop
	 * @zdefault 0.9
	 */
	decay?: number;

	/**
	 * A light ray weight factor.
	 * @zprop
	 * @zdefault 0.4
	 */
	weight?: number;

	/**
	 * A constant attenuation coefficient.
	 * @zprop
	 * @zdefault 0.6
	 */
	exposure?: number;

	/**
	 * An upper bound for the saturation of the overall effect.
	 * @zprop
	 * @zdefault 1.0
	 */
	clampMax?: number;

	/**
	 * The resolution scale.
	 * @zprop
	 * @zdefault 0.5
	 */
	resolutionScale?: number;

	/**
	 * The blur kernel size. Has no effect if blur is disabled.
	 * @zprop
	 * @zdefault "small"
	 */
	kernelSize?: _KernelSize;

	/**
	 * Whether the god rays should be blurred to reduce artifacts.
	 * @zprop
	 * @zdefault true
	 */
	blur?: boolean;
};
/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/GodRaysEffectPass
 * @zparents three/Object3D/Group/**
 */
export class GodRaysEffectPass extends EffectPass<GodRaysEffect> {
	constructor(contextManager: ContextManager, props: GodRaysEffectPassConstructorProps) {
		const tempCam = new THREE.PerspectiveCamera();
		const tempMesh = new THREE.Mesh(
			new THREE.PlaneGeometry(2, 2),
			new THREE.MeshStandardMaterial({
				transparent: true,
				depthWrite: false,
			})
		);
		const effect = new GodRaysEffect(tempCam, tempMesh, {
			blendFunction: translateToBlendFunction(props.blendFunction ?? BlendFunctionNames.SCREEN),
			samples: props.samples ?? 60.0,
			density: props.density ?? 0.96,
			decay: props.decay ?? 0.9,
			weight: props.weight ?? 0.4,
			exposure: props.exposure ?? 0.6,
			clampMax: props.clampMax ?? 1.0,
			resolutionScale: props.resolutionScale ?? 0.5,
			kernelSize: translateKernelSize(props.kernelSize ?? _KernelSize.SMALL),
			blur: props.blur ?? true,
		});
		super(contextManager, props, effect);
		const zcomp = this.getZComponentInstance();
		const camera = zcomp.entityByID.get(props.camera);
		const lightSource = zcomp.entityByID.get(props.lightSource);
		// TDODO  -Points
		if (!camera || !(camera instanceof Camera)) return;
		if (!lightSource || !(lightSource instanceof Mesh)) return;

		effect.mainCamera = camera.element;
		effect.lightSource = lightSource.element;

		tempMesh.geometry.dispose();
	}

	public dispose() {
		return super.dispose();
	}
}
