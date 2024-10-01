/*
  Warnings:

  - You are about to drop the column `grupoId` on the `alumno` table. All the data in the column will be lost.
  - You are about to drop the column `periodo` on the `alumno` table. All the data in the column will be lost.
  - You are about to drop the column `profesorId` on the `grupo` table. All the data in the column will be lost.
  - Added the required column `matricula` to the `Alumno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Alumno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Carrera` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profesor` to the `Grupo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Grupo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `alumno` DROP FOREIGN KEY `Alumno_grupoId_fkey`;

-- AlterTable
ALTER TABLE `alumno` DROP COLUMN `grupoId`,
    DROP COLUMN `periodo`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `matricula` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `carrera` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `grupo` DROP COLUMN `profesorId`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `profesor` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `GrupoAlumno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `grupoId` INTEGER NOT NULL,
    `alumnoId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GrupoAlumno` ADD CONSTRAINT `GrupoAlumno_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `Grupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GrupoAlumno` ADD CONSTRAINT `GrupoAlumno_alumnoId_fkey` FOREIGN KEY (`alumnoId`) REFERENCES `Alumno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
