import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import CustomCursor from "@/components/CustomCursor";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nav Neet Pal | Generative AI & Intelligent Systems Engineer",
  description: "Personal portfolio of Nav Neet Pal. Specialized in building Agentic AI, LLM RAG pipelines, and high-impact Data Science solutions.",
  keywords: ["AI Engineer", "Machine Learning", "Generative AI", "Agentic AI", "Data Scientist", "LangChain", "RAG", "Next.js", "Python"],
  authors: [{ name: "Nav Neet Pal" }],
  openGraph: {
    title: "Nav Neet Pal | AI/ML & Data Science Portfolio",
    description: "Specialized in building agentic AI, LLM RAG pipelines, and data science solutions.",
    type: "website",
    locale: "en_US",
    siteName: "Nav Neet Pal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nav Neet Pal | AI/ML Engineer",
    description: "Specialized in building agentic AI, LLM RAG pipelines, and data science solutions.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${jakartaSans.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-slate-100 transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <CustomCursor />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
