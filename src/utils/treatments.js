import { getCollection } from "astro:content";

function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/ /g, "-")
   .replace(/[^\w\s']+/g, ''); 
}

export async function getCategories() {
    const treatments = await getCollection("treatments");
    const categories = {};

    // Percorrer os objetos e agrupar por categoria
    treatments.forEach((objeto) => {
        const { category, title, description } = objeto.data;
        const slug = objeto.slug;
        if (!categories[category]) {
            categories[category] = {
                slug: convertToSlug(category),
                treatments: []
            };
        }
        categories[category].treatments.push({ title, description, slug });
    });

    return categories
}