<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	import type { DOMToast } from '../core/types';
	import { prefersReducedMotion } from '../core/utils';
	import ToastBar from './ToastBar.svelte';
	import ToastMessage from './ToastMessage.svelte';

	interface Props {
		toast: DOMToast;
		setHeight: (height: number) => void;
		children?: Snippet<[{ toast: DOMToast }]>;
	}

	let { toast, setHeight, children }: Props = $props();

	let clientHeight: number | undefined = $state();

	onMount(() => {
		if (clientHeight === undefined) return;
		setHeight(clientHeight);
	});

	let top = $derived(toast.position?.includes('top') ? 0 : null);
	let bottom = $derived(toast.position?.includes('bottom') ? 0 : null);
	let factor = $derived(toast.position?.includes('top') ? 1 : -1);
	let justifyContent = $derived(
		(toast.position?.includes('center') && 'center') ||
			((toast.position?.includes('right') || toast.position?.includes('end')) && 'flex-end') ||
			null
	);
</script>

<div
	bind:clientHeight
	class="_sht-wrapper"
	class:_sht-active={toast.visible}
	class:_sht-transition={!prefersReducedMotion()}
	style:--factor={factor}
	style:--offset={toast.offset}
	style:top
	style:bottom
	style:justify-content={justifyContent}
>
	{#if toast.type === 'custom'}
		<ToastMessage {toast} />
	{:else if children}{@render children({ toast })}{:else}
		<ToastBar {toast} position={toast.position} />
	{/if}
</div>

<style>
	._sht-wrapper {
		left: 0;
		right: 0;
		display: flex;
		position: absolute;
		transform: translateY(calc(var(--offset, 16px) * var(--factor) * 1px));
	}

	._sht-transition {
		transition: all 230ms cubic-bezier(0.21, 1.02, 0.73, 1);
	}

	._sht-active {
		z-index: 9999;
	}

	._sht-active > :global(*) {
		pointer-events: auto;
	}
</style>
