// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `type` and `schema` for each collection
const treatmentsCollection = defineCollection({
    type: 'content',
    schema: ({image}) => z.object({
        title: z.string(),
        image: image().refine((img) => img.width >= 200, {
            message: "Cover image must be at least 200 pixels wide!",
        }),
        category: z.string(),
        categoryDescription: z.string(),
        description: z.string(),
        featured: z.boolean(),
    })
});
// Export a single `collections` object to register your collection(s)
export const collections = {
    'treatments': treatmentsCollection,
};