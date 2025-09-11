import { pgTable, serial, text, varchar, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mock_interview", {
    id: serial("id").primaryKey(),
    jsonMockResp: text("json_mock_resp").notNull(),
    jobPosition: varchar("job_position", { length: 255 }).notNull(),
    jobDesc: text("job_desc").notNull(),
    jobExperience: varchar("job_experience", { length: 255 }).notNull(),
    createdBy: varchar("created_by", { length: 255 }).notNull(),
    createdAt: varchar("created_at", { length: 255 }),
    mockId: varchar("mock_id", { length: 255 }).notNull(),
});

export const UserAnswer = pgTable("user_answer", {
    id: serial("id").primaryKey(),
    mockIdRef: varchar("mock_id_ref", { length: 255 }).notNull(),
    question: text("question").notNull(),
    correctAns: text("correct_ans"),
    userAns: text("user_ans"),
    feedback: text("feedback"),
    rating: varchar("rating", { length: 50 }),
    userEmail: varchar("user_email", { length: 255 }),
    createdAt: varchar("created_at", { length: 255 }),
});
