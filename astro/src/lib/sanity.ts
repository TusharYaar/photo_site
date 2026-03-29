import { createClient } from "@sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import type { Photo, PhotoDocument, SanityImageAsset } from "./types";

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error("Missing Sanity env vars. Set SANITY_PROJECT_ID and SANITY_DATASET in astro/.env.");
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2026-03-21",
  useCdn: true,
});

const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageAsset) {
  return builder.image(source).url();
}

export function downloadUrlForImage(filename: string, source: SanityImageAsset) {
  return builder.image(source).quality(100).forceDownload(filename).url();
}

export async function getAllPhotoPosts() {
  const photos = await sanityClient.fetch<PhotoDocument[]>(
    `*[_type == "photo" && defined(slug.current)] | order(publishedAt desc){
    _id,
    title,
    slug,
    orientation,
    image,
    gridSize,
    tag
    }`
  );
  return photos.map(
    (photo) =>
      ({
        ...photo,
        image: urlForImage(photo.image),
        downloadUrl: downloadUrlForImage(photo.slug.current, photo.image),
        slug: photo.slug.current
      } as unknown as Photo)
  );
}

export async function getPhotoPostBySlug(slug: string) {
  const photo = await sanityClient.fetch<PhotoDocument | null>(
    `*[_type == "photo" && slug.current == $slug][0]{
      _id,
      title,
      publishedAt,
      image,
      body
    }`,
    { slug }
  );

  if (photo) {
    return {
      ...photo,
      slug,
      image: urlForImage(photo.image),
      downloadUrl: downloadUrlForImage(slug, photo.image),
    }
  }

  return null;
}