-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "key_status" AS ENUM('expired', 'invalid', 'valid', 'default');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "key_type" AS ENUM('stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_type" AS ENUM('webauthn', 'totp');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_status" AS ENUM('verified', 'unverified');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "aal_level" AS ENUM('aal3', 'aal2', 'aal1');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "code_challenge_method" AS ENUM('plain', 's256');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Pokemon" (
	"id" serial PRIMARY KEY NOT NULL,
	"ball" text NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Post" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"published" boolean DEFAULT false NOT NULL,
	"authorId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Todo" (
	"id" bigint PRIMARY KEY NOT NULL,
	"description" varchar,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"due_time" timestamp with time zone,
	"status" boolean DEFAULT false
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "Pokemon_ball_key" ON "Pokemon" ("ball");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."Pokemon"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/