import { useState, useRef, useCallback } from "react";
import {
  Camera,
  MapPin,
  Phone,
  CreditCard,
  Calendar,
  Clock,
  Weight,
  Banknote,
  Check,
  AlertCircle,
  User,
  Car,
  TrainFront,
  Plane,
  Bus,
  Anchor,
  ArrowRight,
  Eye,
  EyeOff,
  ImageIcon,
} from "lucide-react";

const TRANSPORT_MODES = ["Car", "Train", "Air", "Bus", "Boat"] as const;
type TransportMode = (typeof TRANSPORT_MODES)[number];

const MODE_ICONS: Record<TransportMode, React.ReactNode> = {
  Car:   <Car size={14} />,
  Train: <TrainFront size={14} />,
  Air:   <Plane size={14} />,
  Bus:   <Bus size={14} />,
  Boat:  <Anchor size={14} />,
};

type FormData = {
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
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const PERSONAL_REQUIRED: (keyof FormData)[] = ["fullName", "phone", "nextOfKin", "currentLocation", "proposedLocation"];
const TRANSPORT_REQUIRED: (keyof FormData)[] = ["proposedPrice"];
const PAYMENT_REQUIRED: (keyof FormData)[] = ["paymentAccount", "date"];

function sectionDone(keys: (keyof FormData)[], form: FormData) {
  return keys.every((k) => form[k].trim().length > 0);
}

export default function App() {
  const [coverSrc, setCoverSrc] = useState<string | null>(null);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const [isDraggingCover, setIsDraggingCover] = useState(false);
  const [isDraggingAvatar, setIsDraggingAvatar] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedModes, setSelectedModes] = useState<TransportMode[]>(["Car"]);
  const [showPreview, setShowPreview] = useState(false);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormData>({
    fullName: "Full Name",
    phone: "+234 000 000 0000",
    nextOfKin: "John Doe",
    currentLocation: "Lagos",
    proposedLocation: "Abuja",
    luggageWeight: "20kg",
    proposedPrice: "₦50,000",
    paymentAccount: "Opay - 1234567890",
    date: "2026-05-12",
    timeStation: "10:00 AM / Jibowu",
  });

  const readFile = (file: File, cb: (src: string) => void) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => cb(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleCoverFile = (file: File) => readFile(file, setCoverSrc);
  const handleAvatarFile = (file: File) => readFile(file, setAvatarSrc);

  const onCoverDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingCover(false);
    const file = e.dataTransfer.files[0];
    if (file) handleCoverFile(file);
  }, []);

  const onAvatarDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingAvatar(false);
    const file = e.dataTransfer.files[0];
    if (file) handleAvatarFile(file);
  }, []);

  const toggleMode = (mode: TransportMode) => {
    setSelectedModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.fullName.trim()) next.fullName = "Required";
    if (!form.phone.trim()) next.phone = "Required";
    if (!form.nextOfKin.trim()) next.nextOfKin = "Required";
    if (!form.currentLocation.trim()) next.currentLocation = "Required";
    if (!form.proposedLocation.trim()) next.proposedLocation = "Required";
    if (!form.proposedPrice.trim()) next.proposedPrice = "Required";
    if (!form.paymentAccount.trim()) next.paymentAccount = "Required";
    if (!form.date.trim()) next.date = "Required";
    if (selectedModes.length === 0) next.luggageWeight = "Select at least one transport mode";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 2800);
  };

  const field = (key: keyof FormData) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
    },
  });

  const initials = form.fullName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  const personalDone = sectionDone(PERSONAL_REQUIRED, form);
  const transportDone = sectionDone(TRANSPORT_REQUIRED, form) && selectedModes.length > 0;
  const paymentDone = sectionDone(PAYMENT_REQUIRED, form);

  const formattedDate = form.date
    ? new Date(form.date + "T00:00:00").toLocaleDateString("en-GB", {
        day: "numeric", month: "long", year: "numeric",
      })
    : "—";

  return (
    <div
      className="min-h-screen bg-background"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      <form onSubmit={handleSubmit} noValidate>

        {/* Cover photo */}
        <div
          className={`relative w-full h-48 md:h-60 overflow-hidden group cursor-pointer transition-colors duration-200
            ${!coverSrc ? "bg-muted border-b-2 border-dashed border-border" : "bg-muted"}`}
          onClick={() => coverInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDraggingCover(true); }}
          onDragLeave={() => setIsDraggingCover(false)}
          onDrop={onCoverDrop}
        >
          {coverSrc ? (
            /* swap for next/image when moving to Next.js */
            <img src={coverSrc} alt="Cover photo" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 select-none">
              <div className={`rounded-full p-3 transition-colors duration-200
                ${isDraggingCover ? "bg-accent/20" : "bg-border"}`}>
                <ImageIcon size={22} className="text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                {isDraggingCover ? "Drop to set cover photo" : "Click or drag to add a cover photo"}
              </p>
            </div>
          )}

          {/* hover overlay when image is set */}
          {coverSrc && (
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-200
              ${isDraggingCover ? "bg-black/40" : "bg-black/0 group-hover:bg-black/30"}`}>
              <div className={`flex flex-col items-center gap-1.5 transition-opacity duration-200
                ${isDraggingCover ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-2.5">
                  <Camera size={18} className="text-foreground" />
                </div>
                <span className="text-white text-xs font-medium tracking-wide drop-shadow">
                  {isDraggingCover ? "Drop to replace" : "Change cover photo"}
                </span>
              </div>
            </div>
          )}

          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => e.target.files?.[0] && handleCoverFile(e.target.files[0])}
          />
        </div>

        {/* Main content */}
        <div className="max-w-3xl mx-auto px-4 md:px-6 pb-20">

          {/* Avatar + name header */}
          <div className="relative -mt-12 mb-8 flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="relative group shrink-0">
              <div
                className={`w-24 h-24 rounded-full ring-4 ring-card bg-muted overflow-hidden cursor-pointer transition-all duration-200
                  ${isDraggingAvatar ? "ring-accent scale-105" : ""}`}
                onClick={() => avatarInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDraggingAvatar(true); }}
                onDragLeave={() => setIsDraggingAvatar(false)}
                onDrop={onAvatarDrop}
              >
                {avatarSrc ? (
                  <img src={avatarSrc} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary">
                    {initials ? (
                      <span
                        className="text-3xl text-foreground/60 select-none"
                        style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic" }}
                      >
                        {initials}
                      </span>
                    ) : (
                      <User size={32} className="text-muted-foreground" />
                    )}
                  </div>
                )}
                <div className={`absolute inset-0 rounded-full flex items-center justify-center bg-black/0 transition-colors duration-200
                  group-hover:bg-black/30 ${isDraggingAvatar ? "bg-black/30" : ""}`}>
                  <Camera size={18} className={`text-white transition-opacity duration-200
                    ${isDraggingAvatar ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                </div>
              </div>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => e.target.files?.[0] && handleAvatarFile(e.target.files[0])}
              />
            </div>

            <div className="pb-1">
              <p
                className="text-2xl text-foreground"
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
              >
                {form.fullName || "Full Name"}
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {form.phone || "+234 000 000 0000"}
              </p>
            </div>
          </div>

          {/* Page title */}
          <div className="mb-8">
            <h1
              className="text-3xl text-foreground"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
            >
              Create Profile
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Fill in your travel and transport details.
            </p>
          </div>

          <div className="space-y-10">

            {/* Personal Information */}
            <Section title="Personal Information" done={personalDone}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name" error={errors.fullName}>
                  <div className="relative">
                    <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type="text" placeholder="Full Name"
                      className={`${inputCls(!!errors.fullName)} pl-8`} {...field("fullName")} />
                  </div>
                </Field>

                <Field label="Phone Number" error={errors.phone}>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type="tel" placeholder="+234 000 000 0000"
                      className={`${inputCls(!!errors.phone)} pl-8`} {...field("phone")} />
                  </div>
                </Field>
              </div>

              <Field label="Next of Kin" error={errors.nextOfKin}>
                <div className="relative">
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type="text" placeholder="Next of Kin full name"
                    className={`${inputCls(!!errors.nextOfKin)} pl-8`} {...field("nextOfKin")} />
                </div>
              </Field>

              {/* Route strip */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Route</label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type="text" placeholder="From — e.g. Lagos"
                      className={`${inputCls(!!errors.currentLocation)} pl-8`} {...field("currentLocation")} />
                  </div>

                  <div className="flex flex-col items-center gap-0.5 shrink-0">
                    <div className="w-6 h-px bg-border" />
                    <ArrowRight size={14} className="text-accent" />
                    <div className="w-6 h-px bg-border" />
                  </div>

                  <div className="flex-1 relative">
                    <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" />
                    <input type="text" placeholder="To — e.g. Abuja"
                      className={`${inputCls(!!errors.proposedLocation)} pl-8`} {...field("proposedLocation")} />
                  </div>
                </div>
                {(errors.currentLocation || errors.proposedLocation) && (
                  <p className="flex items-center gap-1 text-xs text-destructive mt-1.5">
                    <AlertCircle size={11} /> Both origin and destination are required
                  </p>
                )}
              </div>
            </Section>

            {/* Transport Details */}
            <Section title="Transport Details" done={transportDone}>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Means of Transport
                </label>
                <div className="flex flex-wrap gap-2">
                  {TRANSPORT_MODES.map((mode) => {
                    const active = selectedModes.includes(mode);
                    return (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => toggleMode(mode)}
                        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150
                          ${active
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-input-background text-foreground border-border hover:border-accent"
                          }`}
                      >
                        {MODE_ICONS[mode]}
                        {mode}
                      </button>
                    );
                  })}
                </div>
                {selectedModes.length === 0 && (
                  <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                    <AlertCircle size={11} /> Select at least one
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Luggage Weight" error={errors.luggageWeight}>
                  <div className="relative">
                    <Weight size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type="text" placeholder="e.g. 20kg"
                      className={`${inputCls(!!errors.luggageWeight)} pl-8`} {...field("luggageWeight")} />
                  </div>
                </Field>

                <Field label="Proposed Price" error={errors.proposedPrice}>
                  <div className="relative">
                    <Banknote size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type="text" placeholder="e.g. ₦50,000"
                      className={`${inputCls(!!errors.proposedPrice)} pl-8`} {...field("proposedPrice")} />
                  </div>
                </Field>
              </div>
            </Section>

            {/* Payment & Schedule */}
            <Section title="Payment & Schedule" done={paymentDone}>
              <Field label="Payment Account" error={errors.paymentAccount}>
                <div className="relative">
                  <CreditCard size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type="text" placeholder="e.g. Opay - 1234567890"
                    className={`${inputCls(!!errors.paymentAccount)} pl-8`} {...field("paymentAccount")} />
                </div>
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Date" error={errors.date}>
                  <div className="relative">
                    <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type="date"
                      className={`${inputCls(!!errors.date)} pl-8`} {...field("date")} />
                  </div>
                </Field>

                <Field label="Time / Station" error={errors.timeStation}>
                  <div className="relative">
                    <Clock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type="text" placeholder="e.g. 10:00 AM / Jibowu"
                      className={`${inputCls(!!errors.timeStation)} pl-8`} {...field("timeStation")} />
                  </div>
                </Field>
              </div>
            </Section>

          </div>

          {/* Preview toggle */}
          <div className="mt-10 border-t border-border pt-8">
            <button
              type="button"
              onClick={() => setShowPreview((v) => !v)}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150 mb-6"
            >
              {showPreview ? <EyeOff size={15} /> : <Eye size={15} />}
              {showPreview ? "Hide preview" : "Preview your profile card"}
            </button>

            {showPreview && (
              <div className="relative bg-card border border-border rounded-2xl shadow-sm mb-8">
                {/* Cover — own overflow-hidden so it clips the image but not the avatar */}
                <div className="h-28 bg-muted overflow-hidden rounded-t-2xl">
                  {coverSrc ? (
                    <img src={coverSrc} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-muted to-secondary" />
                  )}
                </div>

                {/* Avatar — positioned on the card, not inside the cover, so it's never clipped */}
                <div className="absolute left-5 top-16">
                  <div className="w-16 h-16 rounded-full ring-4 ring-card  bg-secondary">
                    {avatarSrc ? (
                      <img src={avatarSrc} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {initials ? (
                          <span
                            className="text-xl text-foreground/60 select-none"
                            style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic" }}
                          >
                            {initials}
                          </span>
                        ) : (
                          <User size={20} className="text-muted-foreground" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-12 px-5 pb-5">
                  <p
                    className="text-xl text-foreground"
                    style={{ fontFamily: "'Fraunces', serif", fontWeight: 300 }}
                  >
                    {form.fullName || "—"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">{form.phone || "—"}</p>

                  {/* Route banner */}
                  {(form.currentLocation || form.proposedLocation) && (
                    <div className="mt-4 flex items-center gap-2 bg-secondary rounded-lg px-4 py-2.5 text-sm font-medium text-foreground w-fit">
                      <MapPin size={13} className="text-muted-foreground shrink-0" />
                      <span>{form.currentLocation || "—"}</span>
                      <ArrowRight size={13} className="text-accent shrink-0" />
                      <MapPin size={13} className="text-accent shrink-0" />
                      <span>{form.proposedLocation || "—"}</span>
                    </div>
                  )}

                  {/* Info grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                    <InfoCard label="Next of Kin" value={form.nextOfKin} />
                    <InfoCard label="Proposed Price" value={form.proposedPrice} />
                    <InfoCard label="Payment Account" value={form.paymentAccount} />
                    <InfoCard label="Date" value={formattedDate} />
                    <InfoCard label="Time / Station" value={form.timeStation} />
                    <InfoCard label="Luggage Weight" value={form.luggageWeight} />
                  </div>

                  {/* Transport tags */}
                  {selectedModes.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {selectedModes.map((m) => (
                        <span
                          key={m}
                          className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-secondary text-foreground rounded-full border border-border"
                        >
                          {MODE_ICONS[m]} {m}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                className={`px-7 py-2.5 rounded text-sm font-medium tracking-wide transition-all duration-200 flex items-center gap-2
                  ${saved
                    ? "bg-green-700 text-white"
                    : "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98]"
                  }`}
              >
                {saved ? <><Check size={14} /> Saved</> : "Save Profile"}
              </button>

              <button
                type="button"
                className="px-5 py-2.5 rounded text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                Cancel
              </button>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}

/* ---- helpers ---- */

function inputCls(hasError: boolean) {
  return [
    "w-full px-3 py-2.5 rounded text-sm bg-input-background text-foreground",
    "border transition-all duration-150 outline-none",
    "focus:ring-2 focus:ring-ring/40 focus:border-accent",
    "placeholder:text-muted-foreground",
    hasError ? "border-destructive" : "border-border",
  ].join(" ");
}

function Section({
  title,
  done,
  children,
}: {
  title: string;
  done: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4 pb-2 border-b border-border">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground flex-1">
          {title}
        </h2>
        <div
          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            done ? "bg-accent" : "bg-border"
          }`}
        />
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-destructive">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border rounded-xl p-3.5 bg-background">
      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
      <p className="text-sm font-medium text-foreground">{value || "—"}</p>
    </div>
  );
}
