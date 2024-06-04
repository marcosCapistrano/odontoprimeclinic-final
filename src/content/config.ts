// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `type` and `schema` for each collection
const treatmentsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        category: z.string(),
        description: z.string(),
        featured: z.boolean(),
    })
});
// Export a single `collections` object to register your collection(s)
export const collections = {
    treatments: treatmentsCollection,
};