<script lang="ts">
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<h1 class="text-4xl font-bold">Welcome to SvelteKit</h1>

<h3 class="my-4 text-2xl font-bold">Templates:</h3>
{#if data?.templates?.length}
	<ul class="flex flex-col gap-2">
		{#each data.templates as template}
			<a href="/tmpl/{template.id}" class="btn btn-outline cursor-pointer mx-4">{template.name}</a>
		{/each}
	</ul>
{/if}
