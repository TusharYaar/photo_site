import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { PhotoPost, SanityImageAsset } from "./types";

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error(
    "Missing Sanity env vars. Set SANITY_PROJECT_ID and SANITY_DATASET in astro/.env."
  );
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2026-03-21",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageAsset) {
  return builder.image(source);
}

export async function getAllPhotoPosts() {
  return sanityClient.fetch<PhotoPost[]>(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
      _id,
      title,
      slug,
      publishedAt,
      image,
      body
    }`
  );
}

export async function getPhotoPostBySlug(slug: string) {
  return sanityClient.fetch<PhotoPost | null>(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      publishedAt,
      image,
      body
    }`,
    { slug }
  );
}

export function bodyToExcerpt(body: PhotoPost["body"], maxLength = 130) {
  if (!body?.length) return "";
  const text = body
    .flatMap((block) => block.children ?? [])
    .map((child) => child.text ?? "")
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLength ? `${text.slice(0, maxLength).trim()}...` : text;
}
