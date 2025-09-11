CREATE TABLE "mock_interview" (
	"id" serial PRIMARY KEY NOT NULL,
	"json_mock_resp" jsonb NOT NULL,
	"job_position" varchar(255) NOT NULL,
	"job_desc" text NOT NULL,
	"job_experience" varchar(255) NOT NULL,
	"created_by" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"mock_id" uuid DEFAULT gen_random_uuid() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_answer" (
	"id" serial PRIMARY KEY NOT NULL,
	"mock_id_ref" uuid NOT NULL,
	"question" text NOT NULL,
	"correct_ans" text,
	"user_ans" text,
	"feedback" text,
	"rating" varchar(50),
	"user_email" varchar(255),
	"created_at" timestamp DEFAULT now()
);
