import { defineConfig, passthroughImageService } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { autolinkConfig } from "./plugins/rehype-autolink-config";
import rehypeSlug from "rehype-slug";
import astroI18next from "astro-i18next";
import alpinejs from "@astrojs/alpinejs";
import { loadEnv } from "vite";
const { PUBLIC_DOMAIN } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
	site: PUBLIC_DOMAIN,
	vite: {
		define: {
			__DATE__: `'${new Date().toISOString()}'`,
		},
	},
	image: {
		service: passthroughImageService(),
	  },
	integrations: [
		tailwind(),
		sitemap(),
		astroI18next(),
		alpinejs()
	],
	markdown: {
		rehypePlugins: [
			rehypeSlug,
			// This adds links to headings
			[rehypeAutolinkHeadings, autolinkConfig],
		],
	},
	experimental: {
		contentCollectionCache: true,
	}
});
