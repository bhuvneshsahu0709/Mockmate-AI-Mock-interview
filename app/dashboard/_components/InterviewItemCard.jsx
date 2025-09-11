'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";
import { MockInterview } from "@/utils/schema";
import { Trash } from "lucide-react";
import { toast } from "sonner";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onStart = () => {
    router.push(`/dashboard/interview/${interview?.mockId}`);
  };

  const onFeedbackPress = () => {
    router.push(`/dashboard/interview/${interview?.mockId}/feedback`);
  };

  const onDelete = async () => {
    try {
      await db.delete(MockInterview).where(eq(MockInterview.mockId, interview?.mockId));
      toast.success("Interview deleted successfully");
      setIsDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error deleting interview:", error);
      toast.error("Failed to delete interview");
    }
  };

  return (
    <div className="relative border shadow-sm rounded-lg p-4 bg-white space-y-4">
      {/* Delete Button (Top-Right) */}
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2 text-red-600 hover:bg-red-100"
        onClick={() => setIsDialogOpen(true)}
      >
        <Trash className="w-4 h-4" />
      </Button>

      {/* Interview Info */}
      <div>
        <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
        <p className="text-sm text-gray-500">Experience: {interview?.jobExperience} Year(s)</p>
        <p className="text-sm text-gray-500">Created At: {interview?.createdAt ? new Date(interview.createdAt).toLocaleDateString() : 'N/A'}</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button size="sm" variant="outline" className="flex-1" onClick={onFeedbackPress}>
          Feedback
        </Button>
        <Button size="sm" className="flex-1" onClick={onStart}>
          Start
        </Button>
      </div>

      {/* Confirmation Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">Delete Interview?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this interview? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={onDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewItemCard;
