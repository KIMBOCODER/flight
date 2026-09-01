import { Download } from "lucide-react";

import type { ProfileData } from "../../types/profile.types";
import { downloadProfilePdf } from "../../utils/downloadPdf";

interface DownloadProfileButtonProps {
  profile: ProfileData;
}

export function DownloadProfileButton({
  profile,
}: DownloadProfileButtonProps) {
  const handleDownload = async () => {
    await downloadProfilePdf(profile);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-secondary"
    >
      <Download size={15} />

      Download PDF
    </button>
  );
}