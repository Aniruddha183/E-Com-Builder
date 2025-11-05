// storeReadmeTemplate.js
export const storeReadmeTemplate = (businessName) => {
  return `# ${businessName} Store

This is your customized e-commerce store built with **Next.js** and **Tailwind CSS**.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm (or yarn/pnpm)

### Local Development
\`\`\`bash
npm install
npm run dev
\`\`\`

Visit http://localhost:3000

## 📦 Production Build
\`\`\`bash
npm run build
npm start
\`\`\`

## 🌐 Deploy (Vercel)
- This repo is auto-linked to Vercel and will deploy on every push to \`main\`.

## 📁 Structure
\`\`\`
.
├── components/
│   └── Layout.js
├── pages/
│   ├── _app.js
│   ├── _document.js
│   └── index.js
├── public/
│   └── .gitkeep
├── styles/
│   └── globals.css
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── next.config.js
\`\`\`

## 🧰 Tech
- Next.js (Pages Router)
- Tailwind CSS
- Lucide Icons
- Vercel (hosting)
`;
};
