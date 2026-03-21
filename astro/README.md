# Lenscape (Astro + Sanity)

A modern photography site built with Astro and Tailwind-styled CSS, using Sanity CMS as the content source.

## Features

- Masonry gallery layout on the homepage
- Static site generation for every photo detail page
- Sanity-powered image delivery with optimized URLs
- Responsive, modern dark editorial design

## Setup

1. Install dependencies:

```sh
npm install
```

2. Create your environment file:

```sh
cp .env.example .env
```

3. Fill in Sanity values in `.env`:

```env
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
```

4. Run development server:

```sh
npm run dev
```

## Build

Generate static pages (including all photo routes from Sanity):

```sh
npm run build
```
