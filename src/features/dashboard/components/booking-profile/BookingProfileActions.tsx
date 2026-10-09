import { useState } from "react";
import Link from "next/link";

import {
  ArrowLeft,
  Check,
  Download,
  Link2,
  Printer,
  Share2,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type {
  BookingProfileData,
} from "@/features/dashboard/types/booking-profile.types";

interface BookingProfileActionsProps {
  booking: BookingProfileData;
}

export function BookingProfileActions({
  booking,
}: BookingProfileActionsProps) {
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  const canCancel =
    booking.status === "PENDING" ||
    booking.status === "APPROVED";

  const getPublicUrl = () => {
    return `${window.location.origin}/booking/${booking.id}`;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
  window.location.href =
    `/api/booking/${booking.id}/pdf`;
};

  const handleCopyLink = async () => {
    try {
      const publicUrl = getPublicUrl();

      await navigator.clipboard.writeText(
        publicUrl
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch (error) {
      console.error(
        "Failed to copy booking link:",
        error
      );
    }
  };

  const handleShare = async () => {
    const publicUrl = getPublicUrl();

    if (
      typeof navigator !== "undefined" &&
      navigator.share
    ) {
      try {
        setSharing(true);

        await navigator.share({
          title: `Booking - ${booking.fullName}`,
          text: `Booking from ${booking.currentLocation} to ${booking.proposedLocation}`,
          url: publicUrl,
        });
      } catch (error) {
        if (
          error instanceof Error &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error(
          "Failed to share booking:",
          error
        );
      } finally {
        setSharing(false);
      }

      return;
    }

    await handleCopyLink();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Booking Actions
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            asChild
            variant="outline"
          >
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handlePrint}
          >
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleShare}
            disabled={sharing}
          >
            <Share2 className="mr-2 h-4 w-4" />

            {sharing
              ? "Sharing..."
              : "Share"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleCopyLink}
          >
            {copied ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <Link2 className="mr-2 h-4 w-4" />
            )}

            {copied
              ? "Link Copied"
              : "Copy Link"}
          </Button>

          <Button
  type="button"
  variant="outline"
  onClick={handleDownloadPdf}
>
  <Download className="mr-2 h-4 w-4" />
  Download PDF
</Button>

          <Button
            type="button"
            variant="destructive"
            disabled={!canCancel}
            title={
              canCancel
                ? "Cancellation will be implemented next"
                : `Booking is ${booking.status.toLowerCase()}`
            }
          >
            <XCircle className="mr-2 h-4 w-4" />
            Cancel Booking
          </Button>
        </div>

        {!canCancel && (
          <p className="mt-4 text-xs text-muted-foreground">
            This booking cannot be cancelled
            because its current status is{" "}
            <span className="font-medium">
              {booking.status.toLowerCase()}
            </span>
            .
          </p>
        )}
      </CardContent>
    </Card>
  );
}