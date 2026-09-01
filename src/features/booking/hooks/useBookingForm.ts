import { useState } from "react";

import {
  BookingErrors,
  BookingFormData,
} from "../types/booking.types";

import { TransportMode } from "../types/transport.types";

import { validateBookingForm } from "../utils/validators";

const PERSONAL_FIELDS: (keyof BookingFormData)[] = [
  "fullName",
  "phone",
  "nextOfKin",
  "currentLocation",
  "proposedLocation",
];

const TRANSPORT_FIELDS: (keyof BookingFormData)[] = [
  "proposedPrice",
];

const PAYMENT_FIELDS: (keyof BookingFormData)[] = [
  "paymentAccount",
  "travelDate",
  "travelTime",
];

function sectionComplete(
  fields: (keyof BookingFormData)[],
  form: BookingFormData
) {
  return fields.every(
    (field) => form[field].trim().length > 0
  );
}

export function useBookingForm() {
  const [saved, setSaved] = useState(false);

  const [showPreview, setShowPreview] =
    useState(false);

  const [selectedModes, setSelectedModes] =
    useState<TransportMode[]>(["Car"]);

  const [form, setForm] =
    useState<BookingFormData>({
      fullName: "",
      phone: "",
      nextOfKin: "",

      currentLocation: "",
      proposedLocation: "",

      luggageWeight: "",
      proposedPrice: "",

      paymentAccount: "",

      travelDate: "",
      travelTime: "",
    });

  const [errors, setErrors] =
    useState<BookingErrors>({});

  const [coverSrc, setCoverSrc] =
    useState<string | null>(null);

  const [avatarSrc, setAvatarSrc] =
    useState<string | null>(null);

  const updateField = (
    key: keyof BookingFormData,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  };

  const handleChange =
    (key: keyof BookingFormData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
      >
    ) => {
      updateField(key, e.target.value);
    };

  const toggleMode = (
    mode: TransportMode
  ) => {
    setSelectedModes((prev) =>
      prev.includes(mode)
        ? prev.filter((m) => m !== mode)
        : [...prev, mode]
    );
  };

  const validate = () => {
    const validation =
      validateBookingForm(form);

    if (selectedModes.length === 0) {
      validation.luggageWeight =
        "Select at least one transport mode";
    }

    if (!coverSrc) {
      (validation as BookingErrors).coverSrc =
        "Cover photo is required";
    }

    if (!avatarSrc) {
      (validation as BookingErrors).avatarSrc =
        "Avatar photo is required";
    }

    setErrors(validation);

    return Object.keys(validation).length === 0;
  };

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!validate()) return;

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);

    console.log({
      form,
      selectedModes,
      coverSrc,
      avatarSrc,
    });
  };

  const personalDone =
    sectionComplete(
      PERSONAL_FIELDS,
      form
    );

  const transportDone =
    sectionComplete(
      TRANSPORT_FIELDS,
      form
    ) && selectedModes.length > 0;

  const paymentDone =
    sectionComplete(
      PAYMENT_FIELDS,
      form
    );

  return {
    form,
    errors,

    saved,
    showPreview,
    selectedModes,

    coverSrc,
    avatarSrc,

    setCoverSrc,
    setAvatarSrc,

    personalDone,
    transportDone,
    paymentDone,

    setForm,
    setShowPreview,

    updateField,
    handleChange,

    toggleMode,

    validate,
    handleSubmit,
  };
}