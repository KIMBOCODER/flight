import Image from "next/image";

export default function CreateProfile() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      
      {/* Main Card */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md border p-6 space-y-8">

        {/* Header */}
        <div className="flex items-center gap-5">
          
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-400">
            <Image
              src="/images/founder.jpg"
              alt="profile"
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Name + Contact */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Full Name
            </h1>
            <p className="text-gray-500">
              +234 000 000 0000
            </p>
          </div>
        </div>

        {/* Personal Info */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <Info label="Next of Kin" value="John Doe" />
            <Info label="Current Location" value="Lagos" />
            <Info label="Proposed Location" value="Abuja" />

          </div>
        </div>

        {/* Transport */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Transport Details
          </h2>

          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">

            <Info  label= "Means" value="Car / Train / Air" />
            <Info label="Luggage Weight" value="20kg" />
            <Info label="Proposed Price" value="₦50,000" />

          </div>

          {/* Tags */}
          <div className="flex gap-2 mt-3">
            < Tag text="Car" />
            <Tag text="Train" />
            <Tag text="Air" />
          </div>
        </div>

        {/* Payment */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Payment & Schedule
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <Info label="Payment Account" value="Opay - 1234567890" />
            <Info label="Date" value="12 May 2026" />
            <Info label="Time / Station" value="10:00 AM / Jibowu" />

          </div>
        </div>

      </div>
    </div>
  );
}

/* ---------------- Reusable Components ---------------- */

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="border rounded-xl p-4 bg-gray-50">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <span className="px-3 py-1 text-sm bg-gray-200 rounded-full text-gray-700">
      {text}
    </span>
  );
}