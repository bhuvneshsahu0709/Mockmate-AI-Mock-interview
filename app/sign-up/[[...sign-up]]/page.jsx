import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <section className="min-h-screen grid lg:grid-cols-12 bg-white">
      {/* Left Side */}
      <aside className="relative hidden lg:flex items-end bg-gray-900 lg:col-span-6">
        <img
          alt="Sign Up"
          src="https://images.unsplash.com/photo-1588776814546-ec7e8ffce552?auto=format&fit=crop&w=870&q=80"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="relative z-10 p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Join MockMate ✨</h2>
          <p className="text-lg leading-relaxed text-white/90">
            AI-powered mock interviews to boost your career.
          </p>
        </div>
      </aside>

      {/* Right Side */}
      <main className="flex items-center justify-center px-6 py-12 lg:col-span-6">
        <div className="w-full max-w-md space-y-6">
          <SignUp
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
            afterSignUpUrl="/dashboard"
            redirectUrl="/dashboard"
          />
        </div>
      </main>
    </section>
  );
}
