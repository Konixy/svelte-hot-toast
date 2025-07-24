<script lang="ts">
	import { cn } from '$lib/core/utils';
	import { Highlight, HighlightSvelte } from 'svelte-highlight';
	import Copy from './Copy.svelte';
	import examples, { type Example } from './examples';
	import { javascript } from 'svelte-highlight/languages';

	let selected: Example['title'] | null = $state('Success');
</script>

<div class="grid grid-cols-2 md:grid-cols-3 gap-4 rounded-xl mb-5">
	{#each examples as example (example.title)}
		<label
			for={example.title}
			class={cn(
				'cursor-pointer p-2 bg-gray-100 hover:border-blue-500 rounded-xl transition-colors border-2 border-transparent',
				example.title === selected && 'border-blue-500 font-bold'
			)}
		>
			<input
				type="radio"
				id={example.title}
				name="examples"
				value={example.title}
				onchange={() => {
					example.action();
				}}
				bind:group={selected}
			/>
			<span class="mr-1">{example.emoji}</span>
			<span class="font-medium">{example.title}</span>
		</label>
	{/each}
</div>
{#each examples as example}
	<div class:hidden={example.title !== selected}>
		<div class="overflow-auto">
			{#if example.html}
				<HighlightSvelte code={example.snippet} />
			{:else}
				<Highlight language={javascript} code={example.snippet} />
			{/if}
			<!-- <pre class="language-{example.html ? 'svelte' : 'javascript'} h-80 table w-full"><code
					class="table-cell align-middle">{example.snippet}</code
				></pre> -->
		</div>
		<Copy text={example.snippet} />
	</div>
{/each}

<style>
	input[type='radio'] {
		appearance: none;
	}
</style>
