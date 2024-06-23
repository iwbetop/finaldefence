/*
  Warnings:

  - Added the required column `type` to the `Achievement` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AchievementType" AS ENUM ('SCHOOL', 'COMMUNITY');

-- AlterTable
ALTER TABLE "Achievement" ADD COLUMN     "type" "AchievementType" NOT NULL;
