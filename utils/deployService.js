// DeployService.js
import { storeReadmeTemplate } from "./storeReadmeTemplate";
import { GithubService } from "./githubService";
import { VercelService } from "./vercelService";

export class DeployService {
  // ---------- PUBLIC API ----------
  static async deployToVercel(
    storeConfig,
    githubToken,
    vercelToken,
    onProgress
  ) {
    try {
      if (onProgress)
        onProgress({
          stage: "generating",
          message: "Generating project files...",
        });
      const files = this.generateStoreApp(storeConfig);

      if (onProgress)
        onProgress({ stage: "repo", message: "Creating GitHub repository..." });
      const repoName = `${storeConfig.customization.business.name
        .toLowerCase()
        .replace(/\s+/g, "-")}-store`;
      const repoInfo = await GithubService.createRepo(repoName, githubToken);

      if (onProgress)
        onProgress({
          stage: "upload",
          message: "Uploading files to GitHub...",
          progress: 0,
        });
      await GithubService.uploadFiles(
        repoInfo.owner,
        repoInfo.name,
        files,
        githubToken,
        ({ completed, total, current }) => {
          if (onProgress) {
            onProgress({
              stage: "upload",
              message: `Uploading ${current}...`,
              progress: Math.round((completed / total) * 100),
            });
          }
        }
      );

      if (onProgress)
        onProgress({ stage: "verify", message: "Verifying files..." });
      const missing = await GithubService.verifyFiles(
        repoInfo.owner,
        repoInfo.name,
        [
          "package.json",
          "next.config.js",
          "public/products.json",
          "pages/index.js",
          "pages/product/[id].js",
        ],
        githubToken
      );
      if (missing.length)
        throw new Error(`Critical files missing: ${missing.join(", ")}`);

      await new Promise((r) => setTimeout(r, 2500));

      if (onProgress)
        onProgress({ stage: "vercel", message: "Creating Vercel project..." });
      const vercelProject = await VercelService.createProject(
        repoInfo.html_url,
        vercelToken,
        repoName,
        githubToken
      );

      if (onProgress)
        onProgress({ stage: "deploy", message: "Triggering deployment..." });
      await VercelService.triggerDeployment(
        vercelProject.projectName,
        repoInfo.owner,
        repoInfo.name,
        vercelToken,
        githubToken
      );

      if (onProgress)
        onProgress({ stage: "complete", message: "Deployment initiated!" });
      return {
        success: true,
        message: "Your store has been deployed! Build may take a minute.",
        repoUrl: repoInfo.html_url,
        vercelUrl: vercelProject.url,
      };
    } catch (err) {
      return { success: false, message: err.message || "Deployment failed" };
    }
  }

  // ---------- PROJECT GENERATION ----------
  static generateStoreApp(storeConfig) {
    const { template, customization, products = [] } = storeConfig;

    const app = {
      // root
      "package.json": this.generatePackageJson(customization.business.name),
      "next.config.js": this.generateNextConfig(),
      ".gitignore": this.generateGitIgnore(),
      "tailwind.config.js": this.generateTailwindConfig(),
      "postcss.config.js": this.generatePostCssConfig(),
      "README.md": storeReadmeTemplate(customization.business.name),

      // pages router
      "pages/_app.js": this.generateAppWrapper(),
      "pages/_document.js": this.generateDocument(),
      "pages/index.js": this.generateHomePage(template, customization),
      "pages/product/[id].js": this.generateProductDetailPage(),

      // components
      "components/Layout.js": this.generateLayoutComponent(customization),

      // styles
      "styles/globals.css": this.generateGlobalStyles(customization),

      // public
      "public/.gitkeep": "",
      "public/products.json": this.generateProductsJson(products),
    };

    return app;
  }

  // ---------- FILE GENERATORS ----------
  static generateProductsJson(productsFromStore) {
    // fallback if caller forgot to pass products
    const fallback = [
      {
        id: "demo-1",
        name: "Minimalist Watch",
        price: 299,
        description: "Timeless steel watch with leather band.",
        images: [
          "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
        category: "Accessories",
        inStock: true,
      },
      {
        id: "demo-2",
        name: "Leather Wallet",
        price: 89,
        description: "Handcrafted full-grain leather wallet.",
        images: [
          "https://images.pexels.com/photos/4464825/pexels-photo-4464825.jpeg?auto=compress&cs=tinysrgb&w=800",
        ],
        category: "Accessories",
        inStock: true,
      },
    ];

    const safe =
      Array.isArray(productsFromStore) && productsFromStore.length
        ? productsFromStore
        : fallback;
    return JSON.stringify(safe, null, 2);
  }

  static generatePackageJson(name) {
    return `{
  "name": "${name.toLowerCase().replace(/\s+/g, "-")}-store",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.358.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.31",
    "autoprefixer": "^10.4.16"
  }
}`;
  }

  static generateNextConfig() {
    return `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
};

module.exports = nextConfig;`;
  }

  static generateGitIgnore() {
    return `# dependencies
node_modules
/.pnp
.pnp.js

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem
*.log

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts`;
  }

  static generateTailwindConfig() {
    return `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: { extend: {} },
  plugins: []
};`;
  }

  static generatePostCssConfig() {
    return `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};`;
  }

  static generateAppWrapper() {
    return `import "../styles/globals.css";
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}`;
  }

  static generateDocument() {
    return `import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}`;
  }

  static generateGlobalStyles(customization) {
    return `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary-color: ${customization.colors.primary};
  --secondary-color: ${customization.colors.secondary};
  --accent-color: ${customization.colors.accent};
}

html, body { padding: 0; margin: 0; }`;
  }

  static generateLayoutComponent(customization) {
    return `import Head from "next/head";
export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>${customization.business.name}</title>
        <meta name="description" content="${customization.business.tagline}" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-white text-gray-900">{children}</div>
    </>
  );
}`;
  }

  // Home page reads products at build-time from public/products.json
  static generateHomePage(template, customization) {
    return `import Layout from "../components/Layout";
import Link from "next/link";
import Image from "next/image";
import fs from "fs/promises";
import path from "path";

export default function Home({ products }) {
  return (
    <Layout>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-[var(--accent-color)] text-white flex items-center justify-center mb-6">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M6 6h15l-1.5 9h-12L6 6zm2 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm9 0a1 1 0 1 0 .001-2.001A1 1 0 0 0 17 19z" stroke="currentColor" strokeWidth="1.5"/></svg>
          </div>
          <h1 className="text-5xl font-bold mb-3" style={{color:"var(--primary-color)"}}>${customization.business.name}</h1>
          <p className="text-lg text-gray-600 mb-8">${customization.business.tagline}</p>
          <a href="#products" className="inline-block px-6 py-3 rounded-lg bg-[var(--accent-color)] text-white font-semibold">Shop Now</a>
        </div>
      </section>

      <section id="products" className="py-8">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(p => (
            <Link key={p.id} href={"/product/" + p.id} className="group rounded-xl border border-gray-200 hover:shadow-md transition">
              <div className="relative w-full h-48 overflow-hidden rounded-t-xl bg-gray-50">
                {p.images?.[0] && (
                  <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition" />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{p.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">{p.description}</p>
                <div className="font-bold">{"$" + (Number(p.price).toFixed(0))}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 text-sm text-gray-600">
          <div>
            <h4 className="font-semibold mb-2">Email</h4>
            <p>${customization.business.email}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Phone</h4>
            <p>${customization.business.phone}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Address</h4>
            <p>${customization.business.address}</p>
          </div>
        </div>
      </footer>
    </Layout>
  );
}

export async function getStaticProps() {
  const file = path.join(process.cwd(), "public", "products.json");
  const json = await fs.readFile(file, "utf-8");
  const products = JSON.parse(json);
  return { props: { products } };
}`;
  }

  static generateProductDetailPage() {
    return `import Layout from "../../components/Layout";
import Image from "next/image";
import fs from "fs/promises";
import path from "path";

export default function ProductPage({ product }) {
  if (!product) return null;
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
        <div className="relative w-full h-80 rounded-xl overflow-hidden bg-gray-50">
          {product.images?.[0] && <Image src={product.images[0]} alt={product.name} fill className="object-cover" />}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="text-xl font-semibold mb-4">{"$" + (Number(product.price).toFixed(0))}</div>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <button className="px-6 py-3 bg-black text-white rounded-lg">Add to Cart</button>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const file = path.join(process.cwd(), "public", "products.json");
  const json = await fs.readFile(file, "utf-8");
  const products = JSON.parse(json);
  return {
    paths: products.map(p => ({ params: { id: p.id.toString() } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const file = path.join(process.cwd(), "public", "products.json");
  const json = await fs.readFile(file, "utf-8");
  const products = JSON.parse(json);
  const product = products.find(p => p.id.toString() === params.id);
  return { props: { product: product || null } };
}`;
  }
}
