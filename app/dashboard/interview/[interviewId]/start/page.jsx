"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
// 1. Import useParams from next/navigation
import { useParams } from "next/navigation"; 
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import { Loader2, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

// 2. Remove `params` from the function signature
const StartInterview = () => {
  // 3. Call the useParams hook to get the route parameters
  const { interviewId } = useParams();

  const [interViewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // 4. Update the useEffect to run when `interviewId` is available
  useEffect(() => {
    // It's good practice to only run the fetch if we have an ID
    if (interviewId) {
      GetInterviewDetails();
    }
  }, [interviewId]); // Add interviewId as a dependency

  const GetInterviewDetails = async () => {
    try {
      setIsLoading(true);
      const result = await db
        .select()
        .from(MockInterview)
        // 5. Use the `interviewId` variable from useParams
        .where(eq(MockInterview.mockId, interviewId)); // ✅ CORRECT
      
      const jsonMockResp = typeof result[0].jsonMockResp === 'string' 
        ? JSON.parse(result[0].jsonMockResp) 
        : result[0].jsonMockResp;
      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Failed to fetch interview details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSave = (answerRecord) => {
    if (activeQuestionIndex < mockInterviewQuestion.length - 1) {
      setActiveQuestionIndex(prev => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin" />
          <p className="mt-4 text-gray-600">Loading interview details...</p>
        </div>
      </div>
    );
  }

  // Rest of your component remains the same...
  return (
    <div>
      {/* Simple Navigation */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <Link href="/" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800">
          <Home className="w-4 h-4" />
          Home
        </Link>
        <Link href="/dashboard" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800">
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </Link>
        <div className="text-sm text-gray-500">
          Interview in Progress
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interViewData}
          onAnswerSave={handleAnswerSave}
        />
      </div>
      <div className="flex justify-end gap-12 mt-5">
        {activeQuestionIndex > 0 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>
            Previous Question
          </Button>
        )}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
            Next Question
          </Button>
        )}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          <Link href={'/dashboard/interview/' + interViewData?.mockId + '/feedback'}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;