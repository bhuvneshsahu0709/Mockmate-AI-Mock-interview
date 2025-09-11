'use client'
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAiModal";
import { LoaderCircle, RollerCoasterIcon } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "@/utils/db"; 

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const hasClerk = process.env.NEXT_PUBLIC_ENABLE_CLERK === 'true';

function AddNewInterviewWithClerk() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [jobRole, setJobRole] = React.useState("");
  const [jobDescription, setJobDescription] = React.useState("");
  const [yearsOfExperience, setYearsOfExperience] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { user } = useUser();
   const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inputPrompt = `Job Position: ${jobRole}, Job Description: ${jobDescription}, Years of Experience: ${yearsOfExperience}. Based on these, give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions along with answers in JSON format. Use "question" and "answer" as field names.`;

    try {
      const result = await chatSession.sendMessage(inputPrompt);
      const response = await result.response;
      const text = await response.text();

      const cleanedResponse = text.replace(/```json\n?|```/g, '').trim();
      const mockResponse = JSON.parse(cleanedResponse);

      console.log("Interview JSON:", mockResponse);

      // ✅ Save to DB
      const resp = await db.insert(MockInterview).values({
        mockId: uuidv4(),
        jsonMockResp: JSON.stringify(mockResponse),
        jobPosition: jobRole,
        jobDesc: jobDescription,
        jobExperience: yearsOfExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      }).returning({ mockId: MockInterview.mockId });

      console.log("Saved mockId:", resp[0]?.mockId);
      setOpenDialog(false);
     router.push(`/dashboard/interview/${resp[0]?.mockId}`);

    } catch (error) {
      console.error("Error generating/saving interview questions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
  <div
  className="w-full sm:w-[400px] md:w-[450px] lg:w-[400px] h-40 
             border border-dashed border-gray-400 bg-gray-100 rounded-xl 
             flex items-center justify-center text-xl text-gray-600 font-medium 
             hover:scale-105 hover:shadow-md cursor-pointer transition-all mx-auto"
  onClick={() => setOpenDialog(true)}
>
  + Add New
</div>



      

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Create Your Interview Preparation
            </DialogTitle>
            <DialogDescription>
              Please fill out the job details.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit}>
            <div className="mt-7 my-3">
              <label>Job Role/Job Position</label>
              <Input
                placeholder="Ex. Full Stack Developer"
                required
                onChange={(event) => setJobRole(event.target.value)}
              />
            </div>

            <div className="my-3">
              <label>Job Description/ Tech Stack</label>
              <Textarea
                placeholder="Ex. React, Angular, Nextjs, Nodejs etc"
                required
                onChange={(event) => setJobDescription(event.target.value)}
              />
            </div>

            <div className="my-3">
              <label>Years of experience</label>
              <Input
                placeholder="Ex. 5"
                type="number"
                max="100"
                required
                onChange={(event) => setYearsOfExperience(event.target.value)}
              />
            </div>

            <div className="flex gap-5 justify-end">
              <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin mr-2" /> Generating
                  </>
                ) : (
                  'Start Interview'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

function AddNewInterviewPublic() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [jobRole, setJobRole] = React.useState("");
  const [jobDescription, setJobDescription] = React.useState("");
  const [yearsOfExperience, setYearsOfExperience] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inputPrompt = `Job Position: ${jobRole}, Job Description: ${jobDescription}, Years of Experience: ${yearsOfExperience}. Based on these, give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions along with answers in JSON format. Use "question" and "answer" as field names.`;

    try {
      const result = await chatSession.sendMessage(inputPrompt);
      const response = await result.response;
      const text = await response.text();

      const cleanedResponse = text.replace(/```json\n?|```/g, '').trim();
      const mockResponse = JSON.parse(cleanedResponse);

      const resp = await db.insert(MockInterview).values({
        mockId: uuidv4(),
        jsonMockResp: JSON.stringify(mockResponse),
        jobPosition: jobRole,
        jobDesc: jobDescription,
        jobExperience: yearsOfExperience,
        createdBy: null,
      }).returning({ mockId: MockInterview.mockId });

      setOpenDialog(false);
      router.push(`/dashboard/interview/${resp[0]?.mockId}`);
    } catch (error) {
      console.error("Error generating/saving interview questions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="w-full sm:w-[400px] md:w-[450px] lg:w-[400px] h-40 
               border border-dashed border-gray-400 bg-gray-100 rounded-xl 
               flex items-center justify-center text-xl text-gray-600 font-medium 
               hover:scale-105 hover:shadow-md cursor-pointer transition-all mx-auto"
        onClick={() => setOpenDialog(true)}
      >
        + Add New
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Create Your Interview Preparation
            </DialogTitle>
            <DialogDescription>
              Please fill out the job details.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit}>
            <div className="mt-7 my-3">
              <label>Job Role/Job Position</label>
              <Input
                placeholder="Ex. Full Stack Developer"
                required
                onChange={(event) => setJobRole(event.target.value)}
              />
            </div>

            <div className="my-3">
              <label>Job Description/ Tech Stack</label>
              <Textarea
                placeholder="Ex. React, Angular, Nextjs, Nodejs etc"
                required
                onChange={(event) => setJobDescription(event.target.value)}
              />
            </div>

            <div className="my-3">
              <label>Years of experience</label>
              <Input
                placeholder="Ex. 5"
                type="number"
                max="100"
                required
                onChange={(event) => setYearsOfExperience(event.target.value)}
              />
            </div>

            <div className="flex gap-5 justify-end">
              <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin mr-2" /> Generating
                  </>
                ) : (
                  'Start Interview'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function AddNewInterview() {
  return hasClerk ? <AddNewInterviewWithClerk /> : <AddNewInterviewPublic />;
}
