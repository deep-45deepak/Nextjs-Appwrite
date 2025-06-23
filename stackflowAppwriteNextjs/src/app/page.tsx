import IconCloud from "@/components/magicui/icon-cloud";
import HeroSection from "./components/HeroSection";
import HeroSectionHeader from "./components/HeroSectionHeader";
import LatestQuestions from "./components/LatestQuestions";
import TopContributers from "./components/TopContributers";

const icons = [
  "nextjs", "typescript", "javascript", "react", "tailwindcss", "vercel",
  "node-dot-js", "express", "mongodb", "graphql", "apollo-graphql", "python",
  "java", "spring", "firebase", "supabase", "prisma", "mysql", "postgresql",
  "sqlite", "amazonaws", "googlecloud", "microsoftazure", "docker", "kubernetes",
  "git", "github", "gitlab", "bitbucket", "linux", "ubuntu", "figma", "vscode",
  "visualstudio", "redux", "vite", "webpack", "babel", "eslint", "prettier",
  "npm", "yarn", "pnpm", "chakraui", "materialui", "sass", "bootstrap"
];


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HeroSectionHeader />
      <TopContributers />
      <LatestQuestions />
    </main>
  );
}
