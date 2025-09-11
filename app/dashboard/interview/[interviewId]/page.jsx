"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { WebcamIcon, Lightbulb, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

function Interview() {
  const { interviewId } = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    if (interviewId) {
      GetInterviewDetails();
    }
  }, [interviewId]);

  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching interview data:", error);
    }
  };

  const handleWebcamToggle = () => {
    setWebCamEnabled(true);
  };

  if (!interviewData) {
    return (
      <div className="my-10 text-center text-gray-500 text-lg">
        Loading interview details...
      </div>
    );
  }

  return (
    <div className="my-10">
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
          Interview Setup
        </div>
      </div>
      
      <h2 className="font-bold text-2xl">Let's get started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col p-5 rounded-lg border gap-5">
            <h2 className="text-lg">
              <strong>Job Role/Job Position: </strong>
              {interviewData.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/Tech Stack: </strong>
              {interviewData.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience: </strong>
              {interviewData.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-orange-300 bg-orange-100">
            <h2 className="flex gap-2 items-center text-orange-500">
              <Lightbulb />
              <span>Information</span>
            </h2>
            <h2 className="mt-3 text-orange-500 ">
              Enable Video Web Cam and Microphone to start your AI Generated
              Mock Interview. It has 5 questions which you can answer and will
              provide a report based on your answers. <br />
              <strong>NOTE:</strong> We never record your video. Webcam access
              can be disabled at any time.
            </h2>
          </div>
        </div>
        <div>
          {webCamEnabled ? (
            <Webcam
              mirrored
              style={{ height: 300, width: "auto" }}
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => {
                toast.error("Webcam access error");
                setWebCamEnabled(false);
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 my-7 border rounded-lg w-full p-20 bg-secondary" />
              <Button
                className="w-full"
                variant="ghost"
                onClick={handleWebcamToggle}
              >
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end mt-5">
        <Link href={`/dashboard/interview/${interviewId}/start`}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
