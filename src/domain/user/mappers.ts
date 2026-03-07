import type {
  InternalUser,
  LicenseVerificationStatus,
  PublicUser,
  UserDbRow,
  UserPrompt,
  UserPromptDbRow,
} from "@/src/domain/user/types";
import { IS_PROD } from "@/src/shared/env";

function toLicenseVerificationStatus(value: string | null | undefined): LicenseVerificationStatus {
  if (value === "verified" || value === "rejected" || value === "needs_review") {
    return value;
  }
  return "pending";
}

function requireCreatedAt(value: string | null | undefined, userId: string): string {
  if (value && value.trim().length > 0) {
    return value;
  }
  throw new Error(`Invalid user row ${userId}: created_at is missing.`);
}

export function mapUserDbRowToDomain(row: UserDbRow): InternalUser {
  return {
    id: row.id,
    slug: row.slug,
    displayName: row.display_name?.trim() || "Unnamed user",
    photoUrl: row.photo_url,
    city: row.city,
    state: row.state,
    telehealth: Boolean(row.telehealth),
    inPerson: Boolean(row.in_person),
    languages: row.languages ?? [],
    focusAreas: row.focus_areas ?? [],
    therapyStyles: row.therapy_styles ?? [],
    tagline: row.tagline,
    bioShort: row.bio_short,
    contactEmail: row.contact_email,
    websiteUrl: row.website_url,
    bookingUrl: row.booking_url,
    isActive: Boolean(row.is_active),
    userId: row.user_id ?? null,
    licenseState: row.license_state ?? null,
    licenseType: row.license_type ?? null,
    licenseNumber: row.license_number ?? null,
    licenseStatus: row.license_status ?? null,
    licenseExpiresAt: row.license_expires_at ?? null,
    licenseVerifiedAt: row.license_verified_at ?? null,
    licenseVerificationStatus: toLicenseVerificationStatus(row.license_verification_status),
    licenseVerificationSource: row.license_verification_source ?? null,
    licenseVerificationNotes: row.license_verification_notes ?? null,
    publishedAt: row.published_at ?? null,
    createdAt: requireCreatedAt(row.created_at, row.id),
    updatedAt: row.updated_at ?? null,
  };
}

export function tryMapUserDbRowToDomain(
  row: UserDbRow,
  source: "deck" | "details" | "unknown" = "unknown",
): InternalUser | null {
  try {
    return mapUserDbRowToDomain(row);
  } catch (error) {
    if (!IS_PROD) {
      throw error;
    }
    console.error("Invalid user row", {
      id: row.id,
      slug: row.slug,
      field: "created_at",
      rawCreatedAt: row.created_at ?? null,
      source,
      error,
    });
    return null;
  }
}

export function mapInternalToPublicUser(
  internal: InternalUser,
): PublicUser {
  return {
    id: internal.id,
    slug: internal.slug,
    displayName: internal.displayName,
    photoUrl: internal.photoUrl,
    city: internal.city,
    state: internal.state,
    telehealth: internal.telehealth,
    inPerson: internal.inPerson,
    languages: internal.languages,
    focusAreas: internal.focusAreas,
    therapyStyles: internal.therapyStyles,
    tagline: internal.tagline,
    bioShort: internal.bioShort,
    contactEmail: internal.contactEmail,
    websiteUrl: internal.websiteUrl,
    bookingUrl: internal.bookingUrl,
    isActive: internal.isActive,
    publishedAt: internal.publishedAt,
    createdAt: internal.createdAt,
    updatedAt: internal.updatedAt,
  };
}

export function mapUserDbRowToPublic(row: UserDbRow): PublicUser {
  return mapInternalToPublicUser(mapUserDbRowToDomain(row));
}

export function mapUserPromptDbRowToDomain(
  row: UserPromptDbRow,
): UserPrompt {
  return {
    id: row.id,
    question: row.question,
    answer: row.answer,
    sortOrder: row.sort_order,
  };
}
