import { Download } from "lucide-react";
import { pdfService } from "../../services/pdf.service";

export function DownloadProfileButton() {
  const handleDownload = async () => {
    try {
      await pdfService.download("booking-profile.pdf");
    } catch (err) {
      console.error(err);
      alert("Download failed");
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground"
    >
      <Download size={16} />
      Download PDF
    </button>
  );
}
