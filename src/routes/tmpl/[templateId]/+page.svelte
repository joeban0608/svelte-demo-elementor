<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { ElementPanel } from './ElementPanel';

	let { data }: { data: PageData } = $props();
	let editorContainer: HTMLDivElement | null = $state(null);
	let elementPanel: ElementPanel | null = $state(null);

	onMount(() => {
		if (editorContainer) {
			editorContainer.addEventListener('click', (e) => {
				e.preventDefault();
				e.stopPropagation();

				if (!e.target) return;
				console.log('click', (e.target as HTMLElement)?.outerHTML);

				if (elementPanel) {
					elementPanel.destroy();
				}

				elementPanel = new ElementPanel(e.target as HTMLElement);

				// console.log('editorContainer', editorContainer?.innerHTML);
				// const html = editorContainer ? editorContainer.innerHTML : '';
				// console.log(html);
			});
		}
	});
</script>

<div class="h-dvh w-dvw">
	<div class="flex w-full flex-col">
		<section class="flex flex-col gap-4 p-4">
			<h1 class="text-4xl font-bold">
				Template: <strong>{data?.template?.name ?? 'template not found'}</strong>
			</h1>
			<form
				method="POST"
				action="?/updateEditor"
				use:enhance={(event) => {
					console.log('event', event);
					console.log('editorContainer', editorContainer?.innerHTML);
					event.formData.set('editor-html', editorContainer?.innerHTML ?? '');
				}}
			>
				<button class="btn btn-primary">Updated</button>
			</form>
		</section>
		<!-- <button
			onclick={() => {
				if (targetEle) {
					targetEle.style.color = 'green';
				}
			}}>Make Green</button
		> -->
		<button
			onclick={() => {
				if (elementPanel) {
					console.log('elementPanel.current.style.fontSize', elementPanel.current.style.fontSize);

					elementPanel.fontSizeUp();
				}
			}}>size(+)</button
		>
		<button
			onclick={() => {
				if (elementPanel) {
					console.log('elementPanel.current.style.fontSize', elementPanel.current.style.fontSize);

					elementPanel.fontSizeDown();
				}
			}}>size(-)</button
		>
		<div class="divider"></div>

		<!-- 將模板的 HTML 插入到這裡 -->
		<section class="p-4">
			<div bind:this={editorContainer} class="template-container">
				{@html data?.template?.html ?? '<p>Template HTML not found</p>'}
			</div>
		</section>
	</div>
</div>
