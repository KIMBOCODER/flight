 "use client";

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

    handleSubmit,
    handleChange,
    toggleMode,
  } = useBookingForm();

  const submitBooking = async () => {
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

      if (!res.ok) {
        throw new Error("Failed to create booking");
      }

      alert("Booking created successfully");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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

      {/* Personal Info */}
      <Section title="Personal Information" done={personalDone}>
        <PersonalInformationSection
          form={form}
          errors={errors}
          onChange={handleChange}
        />
      </Section>

      {/* Transport */}
      <Section title="Transport Details" done={transportDone}>
        <TransportDetailsSection
          form={form}
          errors={errors}
          selectedModes={selectedModes}
          onToggleMode={toggleMode}
          onChange={handleChange}
        />
      </Section>

      {/* Payment */}
      <Section title="Payment & Schedule" done={paymentDone}>
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
        onTogglePreview={() => setShowPreview((prev) => !prev)}
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