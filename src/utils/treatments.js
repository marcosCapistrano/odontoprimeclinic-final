import { getCollection } from "astro:content";

export function convertToSlug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
  var to = "aaaaaeeeeeiiiiooooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};

export async function getCategories(rootSlug = "") {
  const treatments = await getCollection("treatments");
  const categories = {};

  // Percorrer os objetos e agrupar por categoria
  if (rootSlug === "") {
    treatments.forEach((objeto) => {
      const { category, title, image, description, categoryDescription } = objeto.data;
      const slug = objeto.slug;
      if (!categories[convertToSlug(category)]) {
        categories[convertToSlug(category)] = {
          title: category,
          description: categoryDescription,
          treatments: []
        };
      }

      categories[convertToSlug(category)].treatments.push({ title, description, slug, image });
    });
  } else {
    treatments.forEach((objeto) => {
      const { category, title, image, description, categoryDescription } = objeto.data;
      const slug = objeto.slug;

      if (rootSlug === convertToSlug(category) || rootSlug == slug) {
        if (!categories[convertToSlug(category)]) {
          categories[convertToSlug(category)] = {
            title: category,
            description: categoryDescription,
            treatments: []
          };
        }

        categories[convertToSlug(category)].treatments.push({ title, description, slug, image });
      }
    });
  }

  return categories
}