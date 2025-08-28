-- CreateEnum
CREATE TYPE "public"."EntityState" AS ENUM ('ACTIVE', 'DELETED');

-- CreateEnum
CREATE TYPE "public"."ClientStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'POTENTIAL', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "public"."ProjectStatus" AS ENUM ('BACKLOG', 'PLANNING', 'TODO', 'IN_PROGRESS', 'REVIEW', 'COMPLETED', 'ON_HOLD', 'CANCELLED');

-- AlterTable
ALTER TABLE "public"."accounts" ADD COLUMN     "state" "public"."EntityState" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "public"."authenticators" ADD COLUMN     "state" "public"."EntityState" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "public"."organizations" ADD COLUMN     "state" "public"."EntityState" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "public"."sessions" ADD COLUMN     "state" "public"."EntityState" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "state" "public"."EntityState" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "public"."verification_tokens" ADD COLUMN     "state" "public"."EntityState" NOT NULL DEFAULT 'ACTIVE';

-- CreateTable
CREATE TABLE "public"."clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "company" TEXT,
    "website" TEXT,
    "address" TEXT,
    "notes" TEXT,
    "status" "public"."ClientStatus" NOT NULL DEFAULT 'ACTIVE',
    "tax_id" TEXT,
    "tax_name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "state" "public"."EntityState" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "public"."ProjectStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "budget" DECIMAL(10,2) DEFAULT 0,
    "hourly_rate" DECIMAL(10,2) DEFAULT 20.00,
    "total_hours" DECIMAL(8,2) DEFAULT 0,
    "total_value" DECIMAL(10,2) DEFAULT 0,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "due_date" TIMESTAMP(3),
    "repository" TEXT,
    "live_url" TEXT,
    "figma_url" TEXT,
    "technologies" TEXT[],
    "client_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "state" "public"."EntityState" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."projects" ADD CONSTRAINT "projects_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
