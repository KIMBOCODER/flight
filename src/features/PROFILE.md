Below is the complete `PROFILE.md` specification. It keeps the **Next.js Pages Router**, your feature-based architecture, the existing theme, and the frontend-first approach while preparing the feature cleanly for Prisma, Cloudinary, PDF generation, and authorization later.

# PROFILE FEATURE — PROJECT SPECIFICATION

## 1. Overview

The Profile feature is responsible for displaying, creating, editing, managing, and eventually exporting a user's travel profile.

The profile is intentionally separated from the Booking feature.

The Booking feature handles:

* Travel/booking data entry
* Transport selection
* Booking-related form interaction

The Profile feature handles:

* User profile presentation
* Profile information
* Profile images
* Profile preview
* Profile editing
* Profile status
* Profile PDF generation
* Profile image uploads
* Profile ownership and authorization

The project uses:

* Next.js 16
* Next.js Pages Router
* TypeScript
* Tailwind CSS
* shadcn/ui
* Lucide React
* Prisma
* PostgreSQL
* Cloudinary — future integration
* PDF generation — future integration

---

# 2. Architectural Principle

The Profile feature follows a feature-first architecture.

```text
src/
└── features/
    └── profile/
```

The feature owns its:

* Components
* Hooks
* Services
* Server logic
* Types
* Utilities
* Constants
* Mock data

The Pages Router only exposes pages and API entry points.

Business logic should not be placed directly inside page components.

---

# 3. Complete Profile Structure

```text
src/
└── features/
    └── profile/
        │
        ├── components/
        │   │
        │   ├── profile/
        │   │   ├── ProfileCard.tsx
        │   │   ├── ProfileCover.tsx
        │   │   ├── ProfileAvatar.tsx
        │   │   ├── ProfileHeader.tsx
        │   │   ├── ProfileDetails.tsx
        │   │   ├── RouteBanner.tsx
        │   │   ├── TransportTags.tsx
        │   │   ├── ProfileStatus.tsx
        │   │   └── DownloadProfileButton.tsx
        │   │
        │   ├── upload/
        │   │   ├── CoverUploader.tsx
        │   │   ├── AvatarUploader.tsx
        │   │   ├── ImageCropper.tsx
        │   │   └── ImagePreview.tsx
        │   │
        │   ├── cards/
        │   │   ├── InfoCard.tsx
        │   │   ├── ContactCard.tsx
        │   │   ├── PaymentCard.tsx
        │   │   ├── TransportCard.tsx
        │   │   └── ScheduleCard.tsx
        │   │
        │   ├── shared/
        │   │   ├── EmptyImageState.tsx
        │   │   ├── LoadingProfile.tsx
        │   │   └── ErrorProfile.tsx
        │   │
        │   └── index.ts
        │
        ├── hooks/
        │   ├── useProfile.ts
        │   ├── useProfileImages.ts
        │   ├── useDownloadProfile.ts
        │   ├── useProfileValidation.ts
        │   └── index.ts
        │
        ├── services/
        │   ├── profile.service.ts
        │   ├── image.service.ts
        │   ├── pdf.service.ts
        │   └── index.ts
        │
        ├── server/
        │   ├── profile.ts
        │   ├── upload.ts
        │   └── authorization.ts
        │
        ├── types/
        │   ├── profile.types.ts
        │   ├── upload.types.ts
        │   └── index.ts
        │
        ├── utils/
        │   ├── formatDate.ts
        │   ├── getInitials.ts
        │   ├── profileMapper.ts
        │   ├── profileStatus.ts
        │   └── downloadPdf.ts
        │
        ├── constants/
        │   ├── profile.ts
        │   └── defaults.ts
        │
        ├── data/
        │   └── mockProfile.ts
        │
        └── index.ts
```

---

# 4. Pages Structure

Using the Next.js Pages Router:

```text
src/
└── pages/
    └── profile/
        ├── index.tsx
        ├── [id].tsx
        └── edit.tsx
```

## `/profile`

Displays the currently authenticated user's profile.

```text
/profile
```

Responsibilities:

* Load current user's profile
* Display profile card
* Display profile details
* Display profile images
* Display transport information
* Provide Edit button
* Provide Download PDF button

---

## `/profile/[id]`

Displays a specific profile.

```text
/profile/:id
```

Example:

```text
/profile/cmf8x123abc
```

Responsibilities:

* Load profile by ID
* Display profile
* Respect profile visibility rules
* Prevent unauthorized access where required

---

## `/profile/edit`

Allows the authenticated user to edit their profile.

```text
/profile/edit
```

Responsibilities:

* Load existing profile
* Populate form
* Update profile information
* Upload avatar
* Upload cover
* Validate changes
* Save changes

---

# 5. Profile Page Architecture

The main profile page should remain small.

```tsx
export default function ProfilePage() {
  return (
    <main>
      <ProfileCard />
    </main>
  );
}
```

The page should not contain:

* Large form logic
* Database queries
* Cloudinary implementation
* PDF implementation
* Validation logic
* Authorization logic

Those responsibilities belong to the feature layers.

---

# 6. Profile Component Hierarchy

```text
ProfileCard
│
├── ProfileCover
│
├── ProfileAvatar
│
├── ProfileHeader
│   └── ProfileStatus
│
├── RouteBanner
│
├── ProfileDetails
│   │
│   ├── ContactCard
│   ├── InfoCard
│   ├── PaymentCard
│   ├── TransportCard
│   └── ScheduleCard
│
├── TransportTags
│
└── DownloadProfileButton
```

This prevents `ProfileCard.tsx` from becoming another large component.

---

# 7. ProfileCard.tsx

## Responsibility

The main composition component.

It should assemble the smaller profile components.

It should not contain:

* Database calls
* Upload logic
* PDF generation
* Complex validation

Example responsibility:

```text
ProfileCard
    ↓
ProfileCover
ProfileAvatar
ProfileHeader
RouteBanner
ProfileDetails
TransportTags
DownloadProfileButton
```

---

# 8. ProfileCover.tsx

Responsible for displaying the profile cover image.

Frontend stage:

```text
coverUrl
```

Future backend stage:

```text
Cloudinary URL
```

Responsibilities:

* Display cover
* Display fallback state
* Maintain theme styling
* Handle responsive sizing

It should not directly communicate with Cloudinary.

---

# 9. ProfileAvatar.tsx

Responsible for displaying the profile avatar.

Fallback hierarchy:

```text
Avatar Image
      ↓
Initials
      ↓
User Icon
```

Example:

```text
John Doe

JD
```

The avatar component should remain reusable.

---

# 10. ProfileHeader.tsx

Displays:

* Full name
* Phone number
* Profile status
* Optional profile metadata

Example:

```text
John Doe

+234 801 234 5678

Active
```

---

# 11. ProfileStatus.tsx

Displays the current profile state.

Possible states:

```text
ACTIVE
INACTIVE
PENDING
SUSPENDED
```

The exact status model can be expanded when backend requirements are finalized.

---

# 12. RouteBanner.tsx

Displays:

```text
Lagos → Abuja
```

It should support:

* Origin
* Destination
* Icons
* Responsive layout

Example:

```text
📍 Lagos
     →
📍 Abuja
```

The component should use the application's existing theme tokens.

---

# 13. ProfileDetails.tsx

This component groups the profile's detailed information.

```text
ProfileDetails
│
├── ContactCard
├── PaymentCard
├── TransportCard
└── ScheduleCard
```

---

# 14. InfoCard.tsx

Generic reusable information card.

Example:

```text
Next of Kin

John Doe
```

Props should remain generic:

```ts
interface InfoCardProps {
  label: string;
  value: string;
}
```

---

# 15. ContactCard.tsx

Displays contact-related information.

Possible fields:

```text
Phone
Next of Kin
Current Location
```

---

# 16. PaymentCard.tsx

Displays:

```text
Payment Account
Proposed Price
```

Sensitive financial information should be handled carefully once backend integration is implemented.

---

# 17. TransportCard.tsx

Displays:

```text
Means of Transport
Luggage Weight
```

Example:

```text
Transport

Car
Train
Air

Luggage

20kg
```

---

# 18. ScheduleCard.tsx

Displays:

```text
Date
Time / Station
```

Example:

```text
12 May 2026

10:00 AM / Jibowu
```

---

# 19. TransportTags.tsx

Displays selected transportation modes.

Supported modes currently include:

```text
Car
Train
Air
Bus
Boat
```

Example:

```text
[ Car ] [ Train ] [ Air ]
```

The transport modes should come from the shared transport type system rather than hard-coded strings throughout components.

---

# 20. DownloadProfileButton.tsx

This component provides profile PDF export.

Frontend-first stage:

```text
Button
   ↓
PDF service placeholder
```

Future stage:

```text
Button
   ↓
useDownloadProfile
   ↓
pdf.service.ts
   ↓
PDF generator
   ↓
Download
```

The UI should not need to change when the real PDF implementation is introduced.

---

# 21. Upload Components

```text
components/
└── upload/
    ├── CoverUploader.tsx
    ├── AvatarUploader.tsx
    ├── ImageCropper.tsx
    └── ImagePreview.tsx
```

---

# 22. CoverUploader.tsx

Responsibilities:

* Select image
* Drag and drop
* Validate image type
* Validate file size
* Preview image

Frontend stage:

```text
File
 ↓
FileReader
 ↓
Preview
```

Future stage:

```text
File
 ↓
Cloudinary
 ↓
Secure URL
 ↓
Prisma
```

---

# 23. AvatarUploader.tsx

Same general workflow as the cover uploader.

```text
Select
   ↓
Validate
   ↓
Preview
   ↓
Upload
```

---

# 24. ImageCropper.tsx

Optional component for image cropping.

Responsibilities:

* Crop avatar
* Crop cover
* Maintain aspect ratio
* Return processed image

This should remain isolated so the image library can be replaced later without affecting the profile feature.

---

# 25. ImagePreview.tsx

Reusable preview component.

Responsibilities:

* Display selected image
* Display loading state
* Display replacement action
* Display remove action

---

# 26. Shared Components

```text
components/shared/
├── EmptyImageState.tsx
├── LoadingProfile.tsx
└── ErrorProfile.tsx
```

---

# 27. EmptyImageState.tsx

Used when:

```text
No avatar
```

or:

```text
No cover image
```

The design must respect the existing application theme.

Do not introduce independent colors that conflict with `globals.css`.

---

# 28. LoadingProfile.tsx

Provides skeleton/loading UI while profile information is being fetched.

Use the existing shadcn/ui styling system.

---

# 29. ErrorProfile.tsx

Displays a user-friendly error state.

Possible cases:

```text
Profile not found
Unable to load profile
Profile unavailable
```

Do not expose database errors directly to users.

---

# 30. Hooks

```text
hooks/
├── useProfile.ts
├── useProfileImages.ts
├── useDownloadProfile.ts
├── useProfileValidation.ts
└── index.ts
```

---

# 31. useProfile.ts

Responsible for profile state and profile operations on the client.

Possible interface:

```ts
const {
  profile,
  loading,
  error,
  refresh,
} = useProfile();
```

Future operations:

```ts
createProfile()
updateProfile()
deleteProfile()
refreshProfile()
```

The hook should not contain Prisma logic.

---

# 32. useProfileImages.ts

Handles client-side image state.

Example:

```ts
const {
  avatar,
  cover,
  setAvatar,
  setCover,
  removeAvatar,
  removeCover,
} = useProfileImages();
```

Cloudinary integration belongs in the service layer.

---

# 33. useDownloadProfile.ts

Responsible for download state.

Example:

```ts
const {
  download,
  isDownloading,
  error,
} = useDownloadProfile();
```

Flow:

```text
DownloadProfileButton
        ↓
useDownloadProfile
        ↓
pdf.service
```

---

# 34. useProfileValidation.ts

Centralizes profile validation.

Possible validation:

```text
Full name
Phone
Next of kin
Location
Destination
Transport
Price
Payment account
Date
Time / station
```

The validation rules should be reusable between:

* Create
* Edit
* API validation

---

# 35. Services

```text
services/
├── profile.service.ts
├── image.service.ts
├── pdf.service.ts
└── index.ts
```

---

# 36. profile.service.ts

Frontend service responsibilities:

```text
getProfile()
getProfileById()
createProfile()
updateProfile()
```

During frontend-only development these can use mock data.

Later they call:

```text
/api/profile/...
```

The UI should not need to know whether the data is mocked or coming from Prisma.

---

# 37. image.service.ts

Responsible for image operations.

Frontend stage:

```text
validate image
create preview
```

Future:

```text
uploadAvatar()
uploadCover()
deleteAvatar()
deleteCover()
```

Cloudinary implementation belongs here.

---

# 38. pdf.service.ts

Responsible for PDF generation/download.

Possible API:

```ts
downloadProfilePdf(profile);
```

Do not place PDF generation code inside:

```text
ProfileCard.tsx
```

or:

```text
DownloadProfileButton.tsx
```

---

# 39. Server Layer

```text
server/
├── profile.ts
├── upload.ts
└── authorization.ts
```

This layer is for server-side business logic.

---

# 40. server/profile.ts

Responsible for:

```text
getProfile
getProfileById
createProfile
updateProfile
deleteProfile
```

It will eventually communicate with Prisma.

Example flow:

```text
API route
   ↓
server/profile.ts
   ↓
Prisma
   ↓
PostgreSQL
```

---

# 41. server/upload.ts

Responsible for secure server-side image upload operations.

Future flow:

```text
Client
  ↓
API
  ↓
upload.ts
  ↓
Cloudinary
  ↓
Database
```

Cloudinary credentials must never be exposed to the browser.

---

# 42. server/authorization.ts

Responsible for checking profile ownership.

Example:

```text
User A
  ↓
Profile A
  ✓ Allowed
```

```text
User A
  ↓
Profile B
  ✗ Denied
```

Admin permissions can later be incorporated.

---

# 43. Types

```text
types/
├── profile.types.ts
├── upload.types.ts
└── index.ts
```

---

# 44. profile.types.ts

The central profile data model for the frontend.

Example:

```ts
import { TransportMode } from "@/features/booking/types/transport.types";

export interface Profile {
  id: string;

  userId: string;

  fullName: string;
  phone: string;
  nextOfKin: string;

  currentLocation: string;
  proposedLocation: string;

  luggageWeight: string;
  proposedPrice: string;

  paymentAccount: string;

  date: string;
  timeStation: string;

  avatarUrl: string | null;
  coverUrl: string | null;

  transportModes: TransportMode[];

  createdAt: string;
  updatedAt: string;
}
```

The exact database shape can evolve independently.

---

# 45. Profile Form Type

The editable form should not necessarily be identical to the database model.

Example:

```ts
export interface ProfileFormData {
  fullName: string;
  phone: string;
  nextOfKin: string;

  currentLocation: string;
  proposedLocation: string;

  luggageWeight: string;
  proposedPrice: string;

  paymentAccount: string;

  date: string;
  timeStation: string;

  transportModes: TransportMode[];
}
```

This separation is important.

---

# 46. Profile Errors

```ts
export type ProfileErrors = Partial<
  Record<keyof ProfileFormData, string>
>;
```

---

# 47. Upload Types

```ts
export type ProfileImageType = "avatar" | "cover";

export interface ProfileUpload {
  type: ProfileImageType;
  file: File;
}
```

Future Cloudinary response:

```ts
export interface ImageUploadResult {
  url: string;
  publicId: string;
}
```

---

# 48. Utilities

```text
utils/
├── formatDate.ts
├── getInitials.ts
├── profileMapper.ts
├── profileStatus.ts
└── downloadPdf.ts
```

---

# 49. formatDate.ts

Converts stored dates into user-friendly display formats.

Example:

```text
2026-05-12
```

becomes:

```text
12 May 2026
```

---

# 50. getInitials.ts

Example:

```ts
getInitials("John Doe");
```

returns:

```text
JD
```

Used by:

```text
ProfileAvatar
```

---

# 51. profileMapper.ts

Responsible for transforming API/database data into UI-friendly profile data.

Example:

```text
Database Profile
      ↓
profileMapper
      ↓
Frontend Profile
```

This prevents database implementation details from leaking into components.

---

# 52. profileStatus.ts

Centralizes profile status handling.

Example:

```ts
getProfileStatusLabel(status)
getProfileStatusVariant(status)
```

---

# 53. downloadPdf.ts

Utility responsible for client-side download behavior.

Actual PDF generation should remain in:

```text
services/pdf.service.ts
```

---

# 54. Constants

```text
constants/
├── profile.ts
└── defaults.ts
```

---

# 55. profile.ts

Contains profile-specific constants.

Examples:

```ts
export const MAX_AVATAR_SIZE = ...;
export const MAX_COVER_SIZE = ...;
```

Allowed image types:

```text
image/jpeg
image/png
image/webp
```

Exact limits can be configured later.

---

# 56. defaults.ts

Default profile values.

Example:

```ts
export const DEFAULT_PROFILE = {
  fullName: "",
  phone: "",
  nextOfKin: "",
  currentLocation: "",
  proposedLocation: "",
  luggageWeight: "",
  proposedPrice: "",
  paymentAccount: "",
  date: "",
  timeStation: "",
  avatarUrl: null,
  coverUrl: null,
};
```

---

# 57. Mock Data

```text
data/
└── mockProfile.ts
```

Used only during frontend development.

Example:

```ts
export const mockProfile = {
  ...
};
```

Once backend integration begins, components should switch from:

```text
mockProfile
```

to:

```text
profile.service
```

without changing their presentation logic.

---

# 58. API Architecture

Because the project uses the Pages Router:

```text
src/pages/api/profile/
```

Recommended structure:

```text
src/
└── pages/
    └── api/
        └── profile/
            ├── index.ts
            ├── me.ts
            ├── [id].ts
            ├── upload-avatar.ts
            ├── upload-cover.ts
            └── download.ts
```

---

# 59. GET Current Profile

```text
GET /api/profile/me
```

Purpose:

```text
Return authenticated user's profile
```

Flow:

```text
Browser
   ↓
GET /api/profile/me
   ↓
Authentication
   ↓
Authorization
   ↓
Profile server service
   ↓
Prisma
   ↓
PostgreSQL
```

---

# 60. Create Profile

```text
POST /api/profile
```

Purpose:

```text
Create a profile for authenticated user
```

---

# 61. Update Profile

```text
PATCH /api/profile/:id
```

Purpose:

```text
Update owned profile
```

Authorization must be performed before modification.

---

# 62. Get Profile

```text
GET /api/profile/:id
```

Purpose:

```text
Get a specific profile
```

Access rules depend on profile visibility requirements.

---

# 63. Avatar Upload

```text
POST /api/profile/upload-avatar
```

Future flow:

```text
Browser
   ↓
API
   ↓
Authentication
   ↓
Authorization
   ↓
Cloudinary
   ↓
Database
```

---

# 64. Cover Upload

```text
POST /api/profile/upload-cover
```

Same security model as avatar upload.

---

# 65. PDF Download

```text
GET /api/profile/:id/download
```

or client-generated PDF:

```text
Profile
   ↓
pdf.service
   ↓
Browser download
```

The final implementation can choose between server-generated and client-generated PDF depending on requirements.

---

# 66. Database Architecture

The Profile feature should eventually have a dedicated Prisma model.

Conceptually:

```text
User
 │
 │ 1 : 1
 ▼
Profile
```

A profile belongs to exactly one user.

---

# 67. Example Prisma Profile Model

The exact model should be finalized when the booking/profile domain model is locked.

Conceptual structure:

```prisma
model Profile {
  id                String   @id @default(cuid())

  userId            String   @unique
  user              User     @relation(fields: [userId], references: [id])

  fullName          String
  phone             String
  nextOfKin         String

  currentLocation   String
  proposedLocation  String

  luggageWeight     String?
  proposedPrice     String

  paymentAccount    String

  date              DateTime
  timeStation       String

  avatarUrl         String?
  avatarPublicId    String?

  coverUrl          String?
  coverPublicId     String?

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}
```

Transport modes should be modeled separately if the business rules eventually require relational querying.

---

# 68. User Relationship

The existing authentication model contains:

```prisma
model User {
  id           String   @id @default(cuid())
  username     String   @unique
  passwordHash String
  role         Role     @default(USER)
  isActive     Boolean  @default(true)
  lastLoginAt  DateTime?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

The Profile relationship should eventually be:

```prisma
model User {
  ...
  profile Profile?
}
```

---

# 69. Ownership

A profile should belong to its user.

```text
User ID
   ↓
Profile User ID
```

The authenticated user should not be able to modify another user's profile.

---

# 70. Authorization

The authorization flow should be:

```text
Request
   ↓
Get Session
   ↓
Get User
   ↓
Check Active
   ↓
Check Ownership
   ↓
Allow Operation
```

For administrators:

```text
Request
   ↓
Session
   ↓
Role
   ↓
ADMIN?
   ↓
Allow administrative operation
```

---

# 71. Cloudinary Architecture

Cloudinary should not be introduced into the components directly.

Incorrect:

```tsx
<ProfileAvatar cloudinaryConfig={...} />
```

Preferred:

```text
ProfileAvatar
      ↓
useProfileImages
      ↓
image.service
      ↓
API
      ↓
Cloudinary
```

---

# 72. Cloudinary Data

Store only the information needed to manage the uploaded resource.

Example:

```text
avatarUrl
avatarPublicId

coverUrl
coverPublicId
```

The public ID is useful for replacing/deleting images.

---

# 73. Image Upload Flow

```text
User selects image
        ↓
Client validation
        ↓
Preview
        ↓
Upload request
        ↓
Authentication
        ↓
Authorization
        ↓
Cloudinary
        ↓
URL + public ID
        ↓
Prisma
        ↓
Updated profile
        ↓
UI refresh
```

---

# 74. PDF Architecture

The PDF should represent the profile card.

Expected content:

```text
Profile Cover
Profile Avatar

Full Name
Phone

Route

Next of Kin
Proposed Price
Payment Account
Date
Time / Station
Luggage Weight

Transport Modes
```

The PDF should preserve the application's visual identity.

---

# 75. PDF Flow

```text
Profile Page
      ↓
Download Profile
      ↓
useDownloadProfile
      ↓
pdf.service
      ↓
Profile data
      ↓
PDF renderer
      ↓
Browser download
```

---

# 76. Profile Editing Architecture

```text
/profile/edit
       ↓
useProfile()
       ↓
Load Profile
       ↓
Populate Form
       ↓
Edit
       ↓
Validate
       ↓
PATCH /api/profile/:id
       ↓
Update Database
       ↓
Refresh Profile
```

---

# 77. Profile State

The frontend should distinguish:

```text
loading
success
error
empty
```

For example:

```text
Loading profile...
```

```text
Profile found
```

```text
Profile not found
```

```text
Unable to load profile
```

---

# 78. Error Handling

Do not expose:

```text
PrismaClientKnownRequestError
```

or:

```text
PostgreSQL error
```

to users.

Instead:

```text
Unable to update your profile. Please try again.
```

Detailed errors should be logged server-side.

---

# 79. Theme Integration

The Profile feature must use the application's existing theme.

Use:

```text
bg-background
bg-card
bg-muted
bg-secondary

text-foreground
text-muted-foreground

border-border

text-primary
bg-primary
text-primary-foreground

ring-ring
```

Avoid hard-coding application colors unless they are part of the design system.

Do not create a separate profile theme.

---

# 80. Responsive Design

The profile should support:

```text
Mobile
Tablet
Desktop
```

Recommended behavior:

```text
Mobile
───────
Single column

Tablet
───────
Flexible two-column information layout

Desktop
────────
Centered profile card
Multiple information columns
```

---

# 81. Accessibility

Profile components should include:

* Semantic HTML
* Accessible button labels
* Proper image alt text
* Keyboard navigation
* Visible focus states
* Sufficient contrast
* Accessible upload controls

For example:

```tsx
<button
  type="button"
  aria-label="Download profile as PDF"
>
```

---

# 82. Component Rules

Components should follow these rules:

### Components may:

* Render UI
* Receive props
* Trigger hooks
* Call feature-level callbacks

### Components should not:

* Query Prisma
* Read database credentials
* Contain Cloudinary secrets
* Perform authorization
* Contain large business rules

---

# 83. Service Rules

Services should handle:

```text
API communication
External services
Data operations
```

Examples:

```text
profile.service.ts
image.service.ts
pdf.service.ts
```

---

# 84. Server Rules

Server modules handle:

```text
Prisma
Authorization
Authentication
Cloudinary server operations
Sensitive business logic
```

They must never be imported into browser components.

---

# 85. Export Structure

The feature should expose a clean public API.

```text
features/profile/index.ts
```

Example:

```ts
export * from "./components";
export * from "./hooks";
export * from "./types";
```

Components can then import:

```ts
import {
  ProfileCard,
  ProfileAvatar,
  ProfileCover,
} from "@/features/profile";
```

Instead of deeply nested imports.

---

# 86. Component Barrel

```text
components/index.ts
```

Should export the public profile components.

Example:

```ts
export * from "./profile/ProfileCard";
export * from "./profile/ProfileCover";
export * from "./profile/ProfileAvatar";
export * from "./profile/ProfileHeader";
export * from "./profile/ProfileDetails";
export * from "./profile/RouteBanner";
export * from "./profile/TransportTags";
export * from "./profile/ProfileStatus";
export * from "./profile/DownloadProfileButton";
```

---

# 87. Hook Barrel

```text
hooks/index.ts
```

Example:

```ts
export * from "./useProfile";
export * from "./useProfileImages";
export * from "./useDownloadProfile";
export * from "./useProfileValidation";
```

---

# 88. Type Barrel

```text
types/index.ts
```

Example:

```ts
export * from "./profile.types";
export * from "./upload.types";
```

---

# 89. Development Stages

The Profile feature should be implemented in stages.

## Stage 1 — Structure

Create:

```text
features/profile
```

and all required folders.

---

## Stage 2 — Frontend UI

Implement:

```text
ProfileCard
ProfileCover
ProfileAvatar
ProfileHeader
ProfileDetails
RouteBanner
TransportTags
InfoCard
DownloadProfileButton
```

Use mock data.

---

## Stage 3 — Profile Page

Create:

```text
pages/profile/index.tsx
```

Connect the UI.

---

## Stage 4 — Edit Page

Create:

```text
pages/profile/edit.tsx
```

Implement profile editing UI.

---

## Stage 5 — Types

Finalize:

```text
Profile
ProfileFormData
ProfileErrors
ProfileImageType
```

---

## Stage 6 — Services

Implement:

```text
profile.service.ts
image.service.ts
pdf.service.ts
```

Initially they may use mock implementations.

---

## Stage 7 — Authentication

Connect:

```text
useProfile
```

to the authenticated user.

---

## Stage 8 — Prisma

Add:

```text
Profile
```

to Prisma.

Run:

```bash
npx prisma migrate dev
```

---

## Stage 9 — API

Implement:

```text
/api/profile
/api/profile/me
/api/profile/[id]
```

---

## Stage 10 — Cloudinary

Implement:

```text
Avatar upload
Cover upload
Image replacement
Image deletion
```

---

## Stage 11 — PDF

Implement:

```text
Download Profile
```

with the final PDF generator.

---

## Stage 12 — Authorization

Protect:

```text
/profile/edit
PATCH /api/profile/:id
POST /api/profile/upload-avatar
POST /api/profile/upload-cover
```

---

# 90. Final Architecture

After backend integration, the complete flow should look like:

```text
                         ┌──────────────────┐
                         │   Profile Page   │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │   ProfileCard    │
                         └────────┬─────────┘
                                  │
          ┌───────────────────────┼───────────────────────┐
          ▼                       ▼                       ▼
 Profile Information       Profile Images          PDF Download
          │                       │                       │
          ▼                       ▼                       ▼
    profile.service        image.service          pdf.service
          │                       │
          ▼                       ▼
       API Layer             API Layer
          │                       │
          ▼                       ▼
       Prisma                Cloudinary
          │
          ▼
     PostgreSQL
```

---

# 91. Final Project Relationship

The major features now have clear boundaries:

```text
src/
└── features/
    │
    ├── landing/
    │
    ├── booking/
    │
    ├── profile/
    │
    ├── auth/
    │
    └── admin/
```

Their responsibilities are:

```text
Landing
   ↓
Public application experience

Booking
   ↓
Travel/booking workflow

Profile
   ↓
User travel profile

Auth
   ↓
Authentication + authorization

Admin
   ↓
Administrative management
```

---

# 92. Important Separation

Do not merge these responsibilities.

```text
Booking ≠ Profile
```

Booking answers:

> What travel/booking information is being entered?

Profile answers:

> Who is this traveler and what information should be displayed about them?

Authentication answers:

> Who is this user?

Admin answers:

> What can an administrator manage?

This separation will prevent the application from becoming tightly coupled.

---

# 93. Current Frontend-First Target

Before introducing backend functionality, the immediate target is:

```text
Profile Page
      ↓
Mock Profile
      ↓
ProfileCard
      ↓
Profile Components
      ↓
Existing Theme
      ↓
Responsive UI
```

No Prisma dependency should be required for the initial UI.

No Cloudinary dependency should be required for the initial UI.

No authentication dependency should be required for the initial UI.

No PDF library should be required until PDF generation is implemented.

---

# 94. Backend Integration Target

Once the UI is stable:

```text
Profile UI
    ↓
useProfile
    ↓
profile.service
    ↓
API
    ↓
Authentication
    ↓
Authorization
    ↓
Prisma
    ↓
PostgreSQL
```

Images:

```text
ImageUploader
    ↓
image.service
    ↓
API
    ↓
Cloudinary
    ↓
Prisma
```

PDF:

```text
DownloadProfileButton
    ↓
useDownloadProfile
    ↓
pdf.service
    ↓
PDF
    ↓
Download
```

---

# 95. Implementation Checklist

## Structure

* [ ] Create `features/profile`
* [ ] Create components folders
* [ ] Create hooks folder
* [ ] Create services folder
* [ ] Create server folder
* [ ] Create types folder
* [ ] Create utils folder
* [ ] Create constants folder
* [ ] Create data folder
* [ ] Create barrel exports

## UI

* [ ] ProfileCard
* [ ] ProfileCover
* [ ] ProfileAvatar
* [ ] ProfileHeader
* [ ] ProfileDetails
* [ ] RouteBanner
* [ ] TransportTags
* [ ] ProfileStatus
* [ ] InfoCard
* [ ] ContactCard
* [ ] PaymentCard
* [ ] TransportCard
* [ ] ScheduleCard
* [ ] DownloadProfileButton

## Upload

* [ ] CoverUploader
* [ ] AvatarUploader
* [ ] ImagePreview
* [ ] ImageCropper
* [ ] Client validation

## Pages

* [ ] `/profile`
* [ ] `/profile/[id]`
* [ ] `/profile/edit`

## Hooks

* [ ] useProfile
* [ ] useProfileImages
* [ ] useDownloadProfile
* [ ] useProfileValidation

## Services

* [ ] profile.service
* [ ] image.service
* [ ] pdf.service

## Backend

* [ ] Profile Prisma model
* [ ] User/Profile relationship
* [ ] Profile API
* [ ] Profile authorization
* [ ] Image upload API
* [ ] Cloudinary integration
* [ ] PDF generation

## Security

* [ ] Authentication
* [ ] Profile ownership
* [ ] Admin authorization
* [ ] Image validation
* [ ] File size validation
* [ ] Server-side validation
* [ ] Sensitive data protection

---

# 96. Definition of Done

The Profile feature is considered complete when:

```text
✓ User can view their profile
✓ User can edit their profile
✓ User can upload an avatar
✓ User can upload a cover image
✓ User can view transport information
✓ User can view route information
✓ User can view schedule information
✓ User can view payment information
✓ User can download the profile as PDF
✓ Profile data persists in PostgreSQL
✓ Images persist through Cloudinary
✓ Authentication protects private profile operations
✓ Authorization prevents unauthorized editing
✓ Admin permissions work correctly
✓ Mobile layout works
✓ Desktop layout works
✓ Existing application theme is preserved
✓ Components remain modular
✓ Pages remain lightweight
```

---

# 97. Final Design Decision

The Profile feature is a **standalone feature module**.

It is no longer embedded inside Booking.

The final relationship is:

```text
                    APPLICATION
                         │
        ┌────────────────┼────────────────┐
        │                │                │
     Booking           Profile           Auth
        │                │                │
        │                │                │
        └────────────────┼────────────────┘
                         │
                       Admin
```

Profile components belong to:

```text
src/features/profile/
```

Profile pages belong to:

```text
src/pages/profile/
```

Profile API routes belong to:

```text
src/pages/api/profile/
```

Profile server logic belongs to:

```text
src/features/profile/server/
```

Profile database access belongs behind the server/service layer.

Cloudinary belongs behind the image service/server layer.

PDF generation belongs behind the PDF service.

This structure gives the project a clean separation of concerns while remaining compatible with the current Next.js Pages Router architecture.

This can now serve as the **canonical `PROFILE.md`**. The next implementation step should be the **frontend Profile feature itself**, starting with the types, mock data, `ProfileCard`, and its child components before we connect Prisma or Cloudinary.
