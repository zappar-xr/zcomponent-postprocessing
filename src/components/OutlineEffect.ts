import { Color } from 'three';
import { BlendFunction, KernelSize, OutlineEffect as PostProcessingOutlineEffect, Resolution } from 'postprocessing';
import { EffectPass, EffectPassConstructorProps } from './EffectPass';
// import { BlendFunction, KernelSize, Resolution } from 'three';
import { ContextManager, registerLoadable } from '@zcomponent/core';
import { useCamera, useScene } from '@zcomponent/three/lib/scenecontext';
import * as THREE from 'three';
const cache = new Map<string, Promise<HTMLImageElement>>();
import { translateToBlendFunction, BlendFunctionNames } from './enum/blend';

function loadImage(url: string): Promise<HTMLImageElement> {
	return new Promise<HTMLImageElement>((resolve, reject) => {
		const elm = new Image();
		elm.onload = () => resolve(elm);
		elm.onerror = err => reject(err);
		elm.src = url;
	});
}

function getFromCache(url: string) {
	let existing = cache.get(url);
	if (!existing) {
		existing = loadImage(url);
		cache.set(url, existing);
	}
	return existing;
}

export type OutlineEffectPassConstructorProps = EffectPassConstructorProps & {
	/**
	 * A pattern texture to be used for the outline.
	 * @zprop
	 * @zvalues files *.+(jpg|jpeg|png)
	 */
	patternTexture?: string;

	/**
	 * The scale of the pattern.
	 * @zprop
	 * @zdefault 1.0
	 */
	patternScale?: number;

	/**
	 * The edge strength of the outline.
	 * @zprop
	 * @zdefault 1.0
	 */
	edgeStrength?: number;

	/**
	 * The speed at which the outline effect pulses.
	 * @zprop
	 * @zdefault 0.0
	 */
	pulseSpeed?: number;

	/**
	 * The color of visible edges.
	 * @zprop
	 * @ztype color-norm-rgb
	 * @zdefault [1, 1, 1]
	 */
	visibleEdgeColor?: [number, number, number];

	/**
	 * The color of hidden edges.
	 * @zprop
	 * @ztype color-norm-rgb
	 * @zdefault [0.133, 0.035, 0.039]
	 */
	hiddenEdgeColor?: [number, number, number];

	/**
	 * The blur kernel size.
	 * @zprop
	 * @zdefault KernelSize.VERY_SMALL
	 */
	kernelSize?: KernelSize;

	/**
	 * Whether the outline should be blurred.
	 * @zprop
	 * @zdefault false
	 */
	blur: boolean;

	/**
	 * Whether occluded parts of selected objects should be visible (X-Ray).
	 * @zprop
	 * @zdefault true
	 */
	xRay: boolean;

	/**
	 * The number of samples used for multisample antialiasing. Requires WebGL 2.
	 * @zprop
	 * @zdefault 0
	 */
	multisampling?: number;

	/**
	 * The resolution scale.
	 * @zprop
	 * @zdefault 0.5
	 */
	resolutionScale?: number;

	/**
	 * The horizontal resolution.
	 * Defaults to `Resolution.AUTO_SIZE`.
	 * @zprop
	 * @zdefault 0
	 */
	resolutionX?: number;

	/**
	 * The vertical resolution.
	 * Defaults to `Resolution.AUTO_SIZE`.
	 * @zprop
	 * @zdefault 0
	 */
	resolutionY?: number;
};
/** @zcomponent
 * @zgroup PostProcessing
 * @zicon postprocess
 * @ztag three/PostProcessing/OutlineEffectPass
 * @zparents three/Object3D/Group/**
 */
export class OutlineEffectPass extends EffectPass<PostProcessingOutlineEffect> {
	constructor(contextManager: ContextManager, private props: OutlineEffectPassConstructorProps) {
		const scene = useScene(contextManager);
		const camera = useCamera(contextManager).value;
		const effect = new PostProcessingOutlineEffect(scene, camera, {
			blendFunction: translateToBlendFunction(props.blendFunction ?? BlendFunctionNames.SCREEN),
			patternScale: props.patternScale ?? 1.0,
			edgeStrength: props.edgeStrength ?? 1.0,
			pulseSpeed: props.pulseSpeed ?? 0.0,
			visibleEdgeColor: new Color().setRGB(...(props.visibleEdgeColor ?? [1, 1, 1])).getHex(),
			hiddenEdgeColor: new Color().setRGB(...(props.hiddenEdgeColor ?? [0.133, 0.035, 0.039])).getHex(),
			kernelSize: props.kernelSize ?? KernelSize.VERY_SMALL,
			blur: props.blur ?? false,
			xRay: props.xRay ?? true,
			multisampling: props.multisampling ?? 0,
			resolutionScale: props.resolutionScale ?? 0.5,
			resolutionX: props.resolutionX ?? Resolution.AUTO_SIZE,
			resolutionY: props.resolutionY ?? Resolution.AUTO_SIZE,
		});
		super(contextManager, props, effect);
		registerLoadable(contextManager, this._load());
	}

	private async _load() {
		if (!this.props.patternTexture) return;
		const img = await getFromCache(this.props.patternTexture);
		const threeTexture = new THREE.Texture(img);
		threeTexture.needsUpdate = true;
		this.element.patternTexture = threeTexture;
	}

	public dispose() {
		return super.dispose();
	}
}
