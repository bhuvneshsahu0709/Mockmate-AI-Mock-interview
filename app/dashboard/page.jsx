"use client";

import React from 'react';
import { useUser, UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import AddNewInterview from './_components/AddNewInterview';
import InterviewList from './_components/InterviewList';
import Link from 'next/link';
import { Home } from 'lucide-react';

const hasClerk = process.env.NEXT_PUBLIC_ENABLE_CLERK === 'true';

function DashboardWithClerk() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="p-10 text-center">Loading...</div>;
  }
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className='p-10 max-w-7xl mx-auto'>
      {/* Simple Navigation */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <Link href="/" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800">
          <Home className="w-4 h-4" />
          Home
        </Link>
        <div className="text-sm text-gray-500">
          Dashboard
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div>
          <h2 className='font-bold text-2xl'>Dashboard</h2>
          <p className='text-gray-500 mt-1'>
            Welcome, {user.firstName || 'Interviewer'} (
            {user.primaryEmailAddress?.emailAddress || 'No email'})
          </p>
        </div>
        <UserButton afterSignOutUrl='/' />
      </div>

      <h2 className='text-gray-500 mb-4'>Create and Start your AI Mockup Interview</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <div className="min-h-[200px] h-full w-full p-6">
          <AddNewInterview />
        </div>
      </div>

      <InterviewList />
    </div>
  );
}

function DashboardPublic() {
  return (
    <div className='p-10 max-w-7xl mx-auto'>
      {/* Simple Navigation */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <Link href="/" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800">
          <Home className="w-4 h-4" />
          Home
        </Link>
        <div className="text-sm text-gray-500">
          Dashboard
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div>
          <h2 className='font-bold text-2xl'>Dashboard</h2>
          <p className='text-gray-500 mt-1'>Welcome, Guest</p>
        </div>
      </div>

      <h2 className='text-gray-500 mb-4'>Create and Start your AI Mockup Interview</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <div className="min-h-[200px] h-full w-full p-6">
          <AddNewInterview />
        </div>
      </div>

      <InterviewList />
    </div>
  );
}

export default function Dashboard() {
  return hasClerk ? <DashboardWithClerk /> : <DashboardPublic />;
}
