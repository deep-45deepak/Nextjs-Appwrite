# Nextjs-Appwrite

A modern web application template that demonstrates the seamless integration of [Next.js](https://nextjs.org/) with [Appwrite](https://appwrite.io/), enabling you to quickly bootstrap full-stack projects with authentication, database, storage, and serverless functions.

## 🚀 Features

- **Next.js 14+**: Utilizes the latest Next.js features for SSR, SSG, and file-based routing.
- **Appwrite Integration**: Ready-to-use backend with authentication, database, storage, and more.
- **Authentication**: Email/password signup, login, and session management via Appwrite.
- **APIs & Database**: Instantly connect your Next.js frontend to Appwrite's powerful APIs and NoSQL database.
- **File Uploads**: Upload and manage files with Appwrite Storage.
- **TypeScript Ready**: Full TypeScript support for safer and scalable development.
- **Environment Variables**: Uses `.env.local` for secure configuration.
- **Easy Deployment**: Deploy on Vercel, Netlify, or your own server.

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/deep-45deepak/Nextjs-Appwrite.git
cd Nextjs-Appwrite
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your Appwrite endpoint and project details:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://<YOUR_APPWRITE_ENDPOINT>
NEXT_PUBLIC_APPWRITE_PROJECT=<YOUR_APPWRITE_PROJECT_ID>
NEXT_PUBLIC_APPWRITE_DATABASE_ID=<YOUR_APPWRITE_DATABASE_ID>
NEXT_PUBLIC_APPWRITE_BUCKET_ID=<YOUR_APPWRITE_BUCKET_ID>
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗂️ Project Structure

```
.
├── components/         # Shared React components
├── lib/                # Appwrite client and helpers
├── pages/              # Next.js pages
├── public/             # Static assets
├── styles/             # CSS/SCSS files
├── .env.example        # Example environment variables
├── next.config.js      # Next.js configuration
└── README.md           # Project documentation
```

## 🛠️ Appwrite Setup

1. Deploy [Appwrite](https://appwrite.io/docs/installation) on your server or use a managed instance.
2. Create a new Project.
3. Enable **Email/Password** authentication.
4. Create a **Database** and **Collection** for your data.
5. (Optional) Set up **Storage** buckets for file uploads.
6. Copy the Project ID, Database ID, and Bucket ID into your `.env.local`.

## ✨ Usage Highlights

- **Signup/Login**: Go to `/signup` or `/login` to register or access your account.
- **Protected Routes**: Certain pages require authentication.
- **Database CRUD**: Easily create, read, update, and delete documents using Appwrite's SDK.
- **File Upload**: Upload files to Appwrite Storage and access download URLs.

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite SDK for JavaScript](https://github.com/appwrite/sdk-for-js)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to fork the repo and submit a pull request.

## 📄 License

This project is [MIT Licensed](LICENSE).

---

Built with ❤️ by [deep-45deepak](https://github.com/deep-45deepak)
