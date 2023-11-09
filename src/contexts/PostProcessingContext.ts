import { CanvasContext, Context, ContextManager, isLoaded, launched } from '@zcomponent/core';

import { ThreeContext, useRenderer } from '@zcomponent/three/lib/context';
import { PostProcessingRenderingPipeline } from '../internal/PostProcessingRenderingPipeline';

interface PostProcessingContextConstructionProps {}

export class PostProcessingContext extends Context<PostProcessingContextConstructionProps> {
	public pipeline: PostProcessingRenderingPipeline;

	constructor(contextManager: ContextManager, constructorProps: PostProcessingContextConstructionProps) {
		super(contextManager, constructorProps);
		const threecontext = this.contextManager.get(ThreeContext);
		const renderer = useRenderer(this.contextManager);
		this.pipeline = new PostProcessingRenderingPipeline(renderer);
		const canvasContext = this.contextManager.get(CanvasContext);
		this.pipeline.setSize(canvasContext.size.value[0], canvasContext.size.value[1]);
		threecontext.effectPipeline.value = this.pipeline;
	}

	public dispose() {
		this.pipeline.dispose();
		return super.dispose();
	}
}
