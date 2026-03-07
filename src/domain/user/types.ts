export type LicenseVerificationStatus =
  | "pending"
  | "verified"
  | "rejected"
  | "needs_review";

export type InternalUser = {
  id: string;
  slug: string | null;
  displayName: string;
  photoUrl: string | null;
  city: string | null;
  state: string | null;
  telehealth: boolean;
  inPerson: boolean;
  languages: string[];
  focusAreas: string[];
  therapyStyles: string[];
  tagline: string | null;
  bioShort: string | null;
  contactEmail: string | null;
  websiteUrl: string | null;
  bookingUrl: string | null;
  isActive: boolean;
  userId: string | null;
  licenseState: string | null;
  licenseType: string | null;
  licenseNumber: string | null;
  licenseStatus: string | null;
  licenseExpiresAt: string | null;
  licenseVerifiedAt: string | null;
  licenseVerificationStatus: LicenseVerificationStatus;
  licenseVerificationSource: string | null;
  licenseVerificationNotes: string | null;
  publishedAt: string | Date | null;
  createdAt: string;
  updatedAt: string | null;
};

export type PublicUser = Pick<
  InternalUser,
  | "id"
  | "slug"
  | "displayName"
  | "photoUrl"
  | "city"
  | "state"
  | "telehealth"
  | "inPerson"
  | "languages"
  | "focusAreas"
  | "therapyStyles"
  | "tagline"
  | "bioShort"
  | "contactEmail"
  | "websiteUrl"
  | "bookingUrl"
  | "isActive"
  | "publishedAt"
  | "createdAt"
  | "updatedAt"
>;

export type UserDbRow = {
  id: string;
  slug: string | null;
  display_name: string | null;
  photo_url: string | null;
  city: string | null;
  state: string | null;
  telehealth: boolean | null;
  in_person: boolean | null;
  languages: string[] | null;
  focus_areas: string[] | null;
  therapy_styles: string[] | null;
  tagline: string | null;
  bio_short: string | null;
  contact_email: string | null;
  website_url: string | null;
  booking_url: string | null;
  is_active?: boolean | null;
  user_id?: string | null;
  license_state?: string | null;
  license_type?: string | null;
  license_number?: string | null;
  license_status?: string | null;
  license_expires_at?: string | null;
  license_verified_at?: string | null;
  license_verification_status?: string | null;
  license_verification_source?: string | null;
  license_verification_notes?: string | null;
  published_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type EditableUser = UserDbRow;

export type UserPrompt = {
  id: string;
  question: string | null;
  answer: string | null;
  sortOrder: number | null;
};

export type UserPromptDbRow = {
  id: string;
  question: string | null;
  answer: string | null;
  sort_order: number | null;
};
