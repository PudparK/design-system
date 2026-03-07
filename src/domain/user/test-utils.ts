import { mapInternalToPublicUser } from "@/src/domain/user/mappers";
import type { InternalUser, PublicUser } from "@/src/domain/user/types";

const baseInternalUser: InternalUser = {
  id: "user-1",
  slug: "user-1",
  displayName: "Dr. Alex Rivera",
  photoUrl: null,
  city: "Chicago",
  state: "IL",
  telehealth: true,
  inPerson: true,
  languages: ["English"],
  focusAreas: ["Anxiety"],
  therapyStyles: ["CBT"],
  tagline: "Warm, practical support for lasting change.",
  bioShort: "I help clients build steadier patterns and confidence.",
  contactEmail: "alex@example.com",
  websiteUrl: "example.com",
  bookingUrl: "example.com/book",
  isActive: true,
  userId: null,
  licenseState: null,
  licenseType: null,
  licenseNumber: null,
  licenseStatus: null,
  licenseExpiresAt: null,
  licenseVerifiedAt: null,
  licenseVerificationStatus: "pending",
  licenseVerificationSource: null,
  licenseVerificationNotes: null,
  publishedAt: "2026-01-01T00:00:00.000Z",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

export function makeInternalUser(
  overrides: Partial<InternalUser> = {},
): InternalUser {
  return {
    ...baseInternalUser,
    ...overrides,
  };
}

export function makePublicUser(
  overrides: Partial<PublicUser> = {},
): PublicUser {
  const basePublic = mapInternalToPublicUser(baseInternalUser);
  return { ...basePublic, ...overrides };
}
