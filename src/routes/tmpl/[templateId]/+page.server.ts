import { db } from '$lib/server/db';
import { _templates } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { error, type Actions } from '@sveltejs/kit';

export const load = (async (event) => {
	const queryTid = Number(event.params.templateId);
	if (isNaN(queryTid)) return error(400, 'Invalid template ID');
	const templates = await db.select().from(_templates).where(eq(_templates.id, queryTid));
	if (!templates?.length) return error(404, 'Template not found');
	const template = templates[0];
	return {
		template
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	updateEditor: async (event) => {
		const formData = await event.request.formData();
		const editorHtml = formData.get('editor-html') as string;
		if (!editorHtml) return error(400, 'Invalid editor HTML');
		const queryTid = Number(event.params.templateId);
		if (isNaN(queryTid)) return error(400, 'Invalid template ID');

		const result = await db
			.update(_templates)
			.set({ html: editorHtml })
			.where(eq(_templates.id, queryTid));
		console.log('result', result);
		return result;
	}
};
