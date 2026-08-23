import { getCollection } from "astro:content";

const byId = <T extends { id: string }>(a: T, b: T) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);

export async function getGroups() {
  return (await getCollection("groups")).sort(byId);
}

export async function getNews() {
  return (await getCollection("news")).sort(byId);
}

export async function getPage(slug: string) {
  return (await getCollection("pages")).find((entry) => entry.data.slug === slug);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
