// Central registry of school photography. Importing these (vs referencing
// /public paths) lets Astro <Image>/<Picture> emit responsive AVIF/WebP.
import type { ImageMetadata } from 'astro';

import classroom from './school/classroom.jpg';
import daffodilDay from './school/daffodil-day-2026.jpg';
import entranceBanner from './school/entrance-banner.jpg';
import hallwayLibrary from './school/hallway-library.jpg';
import projectPresentation from './school/project-presentation.jpg';
import schoolBuilding from './school/school-building.jpg';
import studentsFun from './school/students-fun.jpg';
import studentsReading from './school/students-reading.jpg';
import studentsSelfie from './school/students-selfie.jpg';
import volunteering from './school/volunteering.png';

export const school = {
  classroom,
  daffodilDay,
  entranceBanner,
  hallwayLibrary,
  projectPresentation,
  schoolBuilding,
  studentsFun,
  studentsReading,
  studentsSelfie,
  volunteering,
} satisfies Record<string, ImageMetadata>;

export type SchoolImageKey = keyof typeof school;
