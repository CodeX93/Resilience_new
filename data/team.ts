/**
 * Team page static config. Therapist profiles themselves live in MongoDB
 * (see lib/models/team-member.ts + app/api/cms/team) and are fetched at
 * runtime — this file only keeps the filter category labels.
 */

export const teamRoleCategories = [
  "All",
  "Art Therapist",
  "Psychotherapist",
  "Psychotherapist (Qualifying)",
  "Social Worker and Therapist",
  "Clinical Psychologist",
];
