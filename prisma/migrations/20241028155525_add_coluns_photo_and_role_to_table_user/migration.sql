/*
  Warnings:

  - Added the required column `photo` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "photo" VARCHAR(255) NOT NULL,
ADD COLUMN     "role" VARCHAR(255) NOT NULL;
