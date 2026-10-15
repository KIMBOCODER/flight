

import { Section } from "../shared/Section";

import { PersonalInformationSection } from "./PersonalInformationSection";
import { TransportDetailsSection } from "./TransportDetailsSection";
import { PaymentScheduleSection } from "./PaymentScheduleSection";
import { FormActions } from "./FormActions";
import { ProfilePreviewCard } from "../profile/ProfilePreviewCard";

import { CoverUpload } from "./CoverUpload";
import { AvatarUpload } from "./AvatarUpload";

import { useBookingForm } from "../../hooks/useBookingForm";

type BookingFormProps = {
  userId: string;
};

type ApiValidationErrors = Record<
  string,
  string[] | undefined
>;

export function BookingForm({ userId }: BookingFormProps) {
  const {
    form,
    errors,
    saved,
    showPreview,
    selectedModes,
    personalDone,
    transportDone,
    paymentDone,

    coverSrc,
    avatarSrc,

    setCoverSrc,
    setAvatarSrc,
    setShowPreview,
    setErrors,

    handleChange,
    toggleMode,
    validate,
  } = useBookingForm();

  const submitBooking = async () => {
    // Validate locally before contacting the API.
    if (!validate()) {
      return;
    }

    try {
      const res = await fetch("/api/booking/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          ...form,
          coverSrc,
          avatarSrc,
          selectedModes,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        // Map server validation errors to the corresponding fields.
        if (result.errors) {
          const apiErrors =
            result.errors as ApiValidationErrors;

          const fieldErrors: Record<string, string> = {};

          Object.entries(apiErrors).forEach(
            ([field, messages]) => {
              if (messages?.[0]) {
                fieldErrors[field] = messages[0];
              }
            }
          );

          setErrors((prev) => ({
            ...prev,
            ...fieldErrors,
          }));
        }

        throw new Error(
          result.message || "Unable to create booking."
        );
      }

      alert(
        result.message || "Booking created successfully."
      );
    } catch (error) {
      console.error("Booking submission failed:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to submit your booking. Please try again."
      );
    }
  };

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        void submitBooking();
      }}
    >
      {/* Cover + Avatar */}
      <CoverUpload
        value={coverSrc ?? ""}
        error={errors.coverSrc}
        onChange={(url) => setCoverSrc(url)}
      />

      <AvatarUpload
        value={avatarSrc ?? ""}
        name={form.fullName}
        error={errors.avatarSrc}
        onChange={(url) => setAvatarSrc(url)}
      />

      {/* Personal Information */}
      <Section
        title="Personal Information"
        done={personalDone}
      >
        <PersonalInformationSection
          form={form}
          errors={errors}
          onChange={handleChange}
        />
      </Section>

      {/* Transport Details */}
      <Section
        title="Transport Details"
        done={transportDone}
      >
        <TransportDetailsSection
          form={form}
          errors={errors}
          selectedModes={selectedModes}
          onToggleMode={toggleMode}
          onChange={handleChange}
        />
      </Section>

      {/* Payment and Schedule */}
      <Section
        title="Payment & Schedule"
        done={paymentDone}
      >
        <PaymentScheduleSection
          form={form}
          errors={errors}
          onChange={handleChange}
        />
      </Section>

      {/* Preview */}
      <ProfilePreviewCard
        form={form}
        selectedModes={selectedModes}
        showPreview={showPreview}
        onTogglePreview={() =>
          setShowPreview((prev) => !prev)
        }
        coverSrc={coverSrc}
        avatarSrc={avatarSrc}
      />

      {/* Actions */}
      <FormActions
        saved={saved}
        onSubmit={submitBooking}
      />
    </form>
  );
}
