import { KernelSize } from 'postprocessing';

export enum _KernelSize {
	VERY_SMALL = 'very-small',
	SMALL = 'small',
	MEDIUM = 'medium',
	LARGE = 'large',
	VERY_LARGE = 'very-large',
	HUGE = 'huge',
}

export function translateKernelSize(kernelSize: _KernelSize): KernelSize {
	switch (kernelSize) {
		case _KernelSize.VERY_SMALL:
			return KernelSize.VERY_SMALL;
		case _KernelSize.SMALL:
			return KernelSize.SMALL;
		case _KernelSize.MEDIUM:
			return KernelSize.MEDIUM;
		case _KernelSize.LARGE:
			return KernelSize.LARGE;
		case _KernelSize.VERY_LARGE:
			return KernelSize.VERY_LARGE;
		case _KernelSize.HUGE:
			return KernelSize.HUGE;
	}
}
