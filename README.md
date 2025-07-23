# Modern Next.js Chatbot Project

A modern chatbot application built with the latest Next.js technologies and best practices.

## 🚀 Tech Stack

- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better developer experience
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible component library
- **[Lucide React](https://lucide.dev/)** - Modern SVG icon library
- **[Turbopack](https://turbo.build/pack)** - Fast development server

## 🛠️ Features

- ⚡ **Fast Development** - Powered by Turbopack for lightning-fast builds
- 🎨 **Modern UI** - Beautiful components with shadcn/ui and Tailwind CSS
- 🔧 **TypeScript** - Full type safety across the application
- 📱 **Responsive Design** - Mobile-first responsive design
- 🌙 **Dark Mode** - Built-in dark mode support
- ♿ **Accessible** - WCAG compliant components
- 🧩 **Component Library** - Pre-built, customizable UI components

## 🏃‍♂️ Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   └── ui/            # shadcn/ui components
└── lib/               # Utility functions
    └── utils.ts       # Common utilities
```

## 🎨 Adding Components

Add new shadcn/ui components using the CLI:

```bash
npx shadcn@latest add [component-name]
```

Popular components to try:
- `button` - Various button variants
- `card` - Card container component
- `input` - Form input component
- `dialog` - Modal/dialog component
- `dropdown-menu` - Dropdown menu component

## 🎯 Development

- **Edit pages:** Modify files in `src/app/` directory
- **Add components:** Create new components in `src/components/`
- **Styling:** Use Tailwind CSS classes and shadcn/ui components
- **Icons:** Import icons from `lucide-react`

## 🚀 Build and Deploy

Build for production:
```bash
npm run build
```

The easiest way to deploy is using [Vercel](https://vercel.com/new):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/your-repo)

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [shadcn/ui Documentation](https://ui.shadcn.com/) - Component library documentation
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Utility-first CSS framework
- [Lucide Icons](https://lucide.dev/icons) - Browse available icons

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
