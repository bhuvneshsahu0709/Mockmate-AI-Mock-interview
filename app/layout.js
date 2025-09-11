import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Bhuvnesh Sahu",
  description: "AI-powered mock interview simulator",
};

const hasClerk = process.env.NEXT_PUBLIC_ENABLE_CLERK === "true";
const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen">
          {hasClerk && publishableKey ? (
            <ClerkProvider publishableKey={publishableKey}>{children}</ClerkProvider>
          ) : (
            children
          )}
        </div>
      </body>
    </html>
  );
}
