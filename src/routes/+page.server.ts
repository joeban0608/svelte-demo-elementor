import { db } from '$lib/server/db';
import { _templates } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const templates = await db.select().from(_templates);
	return {
		templates
	};
}) satisfies PageServerLoad;
