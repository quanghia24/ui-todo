CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"status" boolean DEFAULT false NOT NULL,
	"urgent" boolean DEFAULT false NOT NULL,
	"important" boolean DEFAULT false NOT NULL,
	"auth0_sub" varchar NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "tasks_id_unique" UNIQUE("id"),
	CONSTRAINT "tasks_auth0_sub_unique" UNIQUE("auth0_sub")
);
