<script lang="ts">
	import type { DOMToast, ToastOptions, ToastPosition } from '../core/types';
	import useToaster from '../core/use-toaster';
	import ToastWrapper from './ToastWrapper.svelte';

	interface Props {
		reverseOrder?: boolean;
		position?: ToastPosition;
		toastOptions?: ToastOptions | undefined;
		gutter?: number;
		containerStyle?: string | undefined;
		containerClassName?: string | undefined;
	}

	let {
		reverseOrder = false,
		position = 'top-center',
		toastOptions = undefined,
		gutter = 8,
		containerStyle = undefined,
		containerClassName = undefined
	}: Props = $props();

	const { toasts, handlers } = useToaster(toastOptions);

	let _toasts: DOMToast[] = $derived(
		$toasts.map((toast) => ({
			...toast,
			position: toast.position || position,
			offset: handlers.calculateOffset(toast, $toasts, {
				reverseOrder,
				gutter,
				defaultPosition: position
			})
		}))
	);
</script>

<div
	class="_sht-toaster {containerClassName || ''}"
	style={containerStyle}
	onmouseenter={handlers.startPause}
	onmouseleave={handlers.endPause}
	role="alert"
>
	{#each _toasts as toast (toast.id)}
		<ToastWrapper {toast} setHeight={(height) => handlers.updateHeight(toast.id, height)} />
	{/each}
</div>

<style>
	._sht-toaster {
		--default-offset: 16px;

		position: fixed;
		z-index: 9999;
		top: var(--default-offset);
		left: var(--default-offset);
		right: var(--default-offset);
		bottom: var(--default-offset);
		pointer-events: none;
	}
</style>
