"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";

import {
  CheckCircle2,
  XCircle,
  ChevronsUpDown,
  Activity,
  Target,
  Home,
  ArrowLeft,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const Feedback = () => {
  const { interviewId } = useParams();
  const router = useRouter();
  
  const [feedbackList, setFeedbackList] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeedback = async () => {
      if (!interviewId) return;

      setLoading(true);
      try {
        const result = await db
          .select()
          .from(UserAnswer)
          .where(eq(UserAnswer.mockIdRef, interviewId))
          .orderBy(UserAnswer.id);

        // ✅ Remove duplicate questions
        const deduplicated = Array.from(
          new Map(result.map(item => [item.question, item])).values()
        );

        setFeedbackList(deduplicated);

        const validRatings = deduplicated
          .map((item) => parseFloat(item.rating))
          .filter((rating) => !isNaN(rating));

        if (validRatings.length > 0) {
          const totalRating = validRatings.reduce((sum, r) => sum + r, 0);
          setAverageRating(parseFloat((totalRating / validRatings.length).toFixed(1)));
        }
      } catch (err) {
        console.error("Error loading feedback:", err);
        setFeedbackList([]);
      } finally {
        setLoading(false);
      }
    };

    getFeedback();
  }, [interviewId]);

  const getRatingColor = (rating) => {
    const r = parseFloat(rating);
    if (isNaN(r)) return "text-gray-500";
    if (r >= 8) return "text-green-600";
    if (r >= 5) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Activity className="mx-auto h-12 w-12 text-indigo-600 animate-pulse" />
          <p className="mt-4 text-gray-600">Loading your interview feedback...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
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
          Interview Results
        </div>
      </div>
      
      {feedbackList.length === 0 ? (
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <XCircle className="mx-auto h-16 w-16 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-800 mt-4">
              No Interview Feedback Available
            </h2>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              It seems like no feedback has been generated for this interview.
            </p>
            <Button 
              variant="outline" 
              onClick={() => router.replace('/dashboard')}
              className="w-full"
            >
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="max-w-4xl mx-auto mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
                <div>
                  <h2 className="text-3xl font-bold text-green-600">Great Job!</h2>
                  <p className="text-gray-600">You've completed your mock interview.</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Overall Rating</p>
                    <p className={`text-2xl font-bold ${getRatingColor(averageRating)}`}>
                      {averageRating > 0 ? `${averageRating}/10` : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Questions</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {feedbackList.length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">Detailed Interview Feedback</h3>
            <p className="text-sm text-gray-500 mb-4">Review each question's performance and get insights for improvement.</p>

            {feedbackList.map((item) => (
              <Collapsible key={item.id} className="border rounded-lg overflow-hidden">
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 transition-colors">
                    <div className="flex items-center gap-3">
                      <Target
  className={`h-4 w-4 shrink-0 mt-0.5 ${
    parseFloat(item.rating) >= 7
      ? "text-green-500"
      : parseFloat(item.rating) >= 4
      ? "text-yellow-500"
      : "text-red-500"
  }`}
/>
                     <span className="text-sm font-medium text-gray-800 line-clamp-1">
  {item.question}
</span>

                    </div>
                    <ChevronsUpDown className="h-4 text-gray-500" />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 bg-white">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Your Answer</h4>
                      <p className="bg-red-50 p-3 rounded-lg text-sm text-red-900 border border-red-200">
                        {item.userAns || "No answer provided"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Correct Answer</h4>
                      <p className="bg-green-50 p-3 rounded-lg text-sm text-green-900 border border-green-200">
                        {item.correctAns}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 mb-2">Feedback</h4>
                    <p className="bg-blue-50 p-3 rounded-lg text-sm text-primary border border-blue-200">
                      {item.feedback}
                    </p>
                  </div>
                  <div className="mt-4 text-right">
                    <span className={`font-bold ${getRatingColor(item.rating)}`}>
                      Rating: {item.rating}/10
                    </span>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}

            <div className="text-center mt-8">
              <Button onClick={() => router.replace("/dashboard")} className="w-full md:w-auto">
                Return to Dashboard
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Feedback;
