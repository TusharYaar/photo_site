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
        slug: photo.slug.current,
        image: urlForImage(photo.image),
        downloadUrl: downloadUrlForImage(photo.slug.current, photo.image),
      } as unknown as Photo)
  );
}

export async function getPhotoPostBySlug(slug: string) {
  const post = await sanityClient.fetch<PhotoDocument | null>(
    `*[_type == "photo" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      publishedAt,
    orientation,
      image,
      body,
      tag
    }`,
    { slug }
  );

  if (post) {
    return {
      ...post,
      slug: post.slug.current,
      image: urlForImage(post.image),
      downloadUrl: downloadUrlForImage(post.slug.current, post.image),
    } as unknown as Photo;
  }
}
