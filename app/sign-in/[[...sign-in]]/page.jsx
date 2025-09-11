"use client";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <section className="min-h-screen grid lg:grid-cols-12 bg-white">
      {/* Left Side - Welcome Message & Image */}
      <aside className="relative hidden lg:flex items-end bg-gray-900 lg:col-span-6">
        <img
          alt="Interview Prep"
          src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="relative z-10 p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Welcome to Bhuvnesh Sahu ✨</h2>
          <p className="text-lg leading-relaxed text-white/90">
            Prepare for interviews with AI-powered mock sessions.
          </p>
        </div>
      </aside>

      {/* Right Side - Clerk SignIn */}
      <main className="flex items-center justify-center px-6 py-12 lg:col-span-6">
        <div className="w-full max-w-md space-y-6">
          <div className="block lg:hidden text-center">
            <img
              src="https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJwd2JIM1BIdWFRREI1U1d4SXpPTHJXTWU2eSJ9?width=200"
              alt="Logo"
              className="mx-auto w-16 h-16"
            />
            <h1 className="mt-4 text-2xl font-bold text-gray-900">
              Welcome to Bhuvnesh Sahu
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Sign in to start your mock interview journey.
            </p>
          </div>

          {/* ✅ FIXED SignIn */}
          <SignIn
            path="/sign-in"
            routing="path"
            appearance={{
              elements: {
                card: "shadow-lg border border-gray-200",
                formButtonPrimary:
                  "bg-blue-600 hover:bg-blue-700 transition text-white text-sm rounded-md px-4 py-2",
              },
              variables: {
                colorPrimary: "#2563EB",
              },
            }}
            afterSignInUrl="/dashboard"
          />
        </div>
      </main>
    </section>
  );
}
