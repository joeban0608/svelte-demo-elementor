<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	let { data }: { data: PageData } = $props();
	let editorIframe: HTMLIFrameElement | null = $state(null);

	onMount(() => {
		if (editorIframe) {
			editorIframe.contentDocument?.addEventListener('input', (event) => {
				console.log('editorIframe', editorIframe);
				// console.log('event', event);
			});
		}
	});
</script>

<div class="h-dvh w-dvw">
	<div class="flex h-full w-full flex-col">
		<section class="flex flex-col gap-4 p-4">
			<h1 class="text-4xl font-bold">
				Template: <strong>{data?.template?.name ?? 'template not found'}</strong>
			</h1>
			<form
				method="POST"
				action="?/updateEditor"
				use:enhance={(event) => {
					console.log('event', event);
				}}
			>
				<input type="hidden" name="editor-html" value={editorIframe?.innerHTML ?? ''} />
				<button class="btn btn-primary">Updated</button>
			</form>
		</section>
		<div class="divider"></div>

		<!-- 將模板的 HTML 插入到這裡 -->
		<section class="h-full flex-1 border border-red-400 p-4">
			<iframe
				bind:this={editorIframe}
				srcDoc={data?.template?.html ?? '<p>Template HTML not found</p>'}
				title="Editor"
				class="h-full w-full"
				contenteditable="true"
			></iframe>
		</section>
	</div>
</div>
