CREATE TYPE "public"."mood" AS ENUM('sad', 'ok', 'happy');--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "mood" "mood";