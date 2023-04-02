import Header from "@/components/Header";
import "../styles/globals.css";
import Prompt from "@/components/Prompt";
import ClientProvider from "@/components/ClientProvider";

export const metadata = {
  title: "AI Image Generator",
  description: "Powered by Next.js & Azure",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <ClientProvider>
          <Header />
          <Prompt />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
