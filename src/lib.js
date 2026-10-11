// Les chemins du JSON historique ("assets/images/x.png") pointent maintenant vers public/images.
export const imageUrl = (path) =>
  path ? `${import.meta.env.BASE_URL}${path.replace(/^assets\//, "")}` : null;

export const hasLink = (link) => Boolean(link) && link !== "#";
