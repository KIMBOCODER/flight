import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import type { PublicBookingData } from "@/features/dashboard/types/public-booking.types";

interface BookingPdfDocumentProps {
  booking: PublicBookingData;
  reference: string;
  publicUrl: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
  },

  header: {
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 9,
    color: "#6b7280",
  },

  reference: {
    marginTop: 8,
    fontSize: 10,
    fontWeight: "bold",
  },

  cover: {
    width: "100%",
    height: 150,
    objectFit: "cover",
    marginBottom: 18,
  },

  statusBox: {
    padding: 10,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },

  label: {
    fontSize: 8,
    color: "#6b7280",
    marginBottom: 3,
  },

  status: {
    fontSize: 11,
    fontWeight: "bold",
  },

  routeBox: {
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },

  routeLabel: {
    fontSize: 8,
    color: "#6b7280",
    marginBottom: 5,
  },

  route: {
    fontSize: 13,
    fontWeight: "bold",
  },

  section: {
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  item: {
    width: "50%",
    marginBottom: 12,
    paddingRight: 10,
  },

  value: {
    fontSize: 10,
    fontWeight: "bold",
  },

  publicUrl: {
    marginTop: 8,
    fontSize: 8,
    color: "#374151",
  },

  footer: {
    marginTop: 20,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    fontSize: 8,
    color: "#6b7280",
    textAlign: "center",
  },
});

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
}

function formatDateTime(date: string) {
  return new Date(date).toLocaleString(
    "en-US",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  );
}

function getTransportModes(
  modes: unknown
): string {
  if (!modes) {
    return "Not specified";
  }

  if (Array.isArray(modes)) {
    return modes.map(String).join(", ");
  }

  if (typeof modes === "string") {
    return modes;
  }

  if (typeof modes === "object") {
    return Object.values(
      modes as Record<string, unknown>
    )
      .filter(
        (value): value is string =>
          typeof value === "string"
      )
      .join(", ") || "Not specified";
  }

  return "Not specified";
}

export function createBookingPdfDocument({
  booking,
  reference,
  publicUrl,
}: BookingPdfDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Booking Record
          </Text>

          <Text style={styles.subtitle}>
            Official booking record from the
            booking platform.
          </Text>

          <Text style={styles.reference}>
            Booking Reference: {reference}
          </Text>
        </View>

        {booking.coverSrc && (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image
            src={booking.coverSrc}
            style={styles.cover}
          />
        )}

        <View style={styles.statusBox}>
          <Text style={styles.label}>
            Booking Status
          </Text>

          <Text style={styles.status}>
            {booking.status}
          </Text>
        </View>

        <View style={styles.routeBox}>
          <Text style={styles.routeLabel}>
            Journey
          </Text>

          <Text style={styles.route}>
            {booking.currentLocation} to{" "}
            {booking.proposedLocation}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Passenger Information
          </Text>

          <View style={styles.grid}>
            <View style={styles.item}>
              <Text style={styles.label}>
                Full Name
              </Text>

              <Text style={styles.value}>
                {booking.fullName}
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>
                Phone Number
              </Text>

              <Text style={styles.value}>
                {booking.phone}
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>
                Next of Kin
              </Text>

              <Text style={styles.value}>
                {booking.nextOfKin}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Journey Information
          </Text>

          <View style={styles.grid}>
            <View style={styles.item}>
              <Text style={styles.label}>
                Current Location
              </Text>

              <Text style={styles.value}>
                {booking.currentLocation}
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>
                Proposed Location
              </Text>

              <Text style={styles.value}>
                {booking.proposedLocation}
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>
                Travel Date
              </Text>

              <Text style={styles.value}>
                {formatDate(
                  booking.travelDate
                )}
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>
                Travel Time
              </Text>

              <Text style={styles.value}>
                {booking.travelTime}
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>
                Luggage Weight
              </Text>

              <Text style={styles.value}>
                {booking.luggageWeight}
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>
                Transport Mode
              </Text>

              <Text style={styles.value}>
                {getTransportModes(
                  booking.selectedModes
                )}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Payment Information
          </Text>

          <View style={styles.grid}>
            <View style={styles.item}>
              <Text style={styles.label}>
                Proposed Price
              </Text>

              <Text style={styles.value}>
                {booking.proposedPrice}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Booking Record
          </Text>

          <View style={styles.grid}>
            <View style={styles.item}>
              <Text style={styles.label}>
                Created
              </Text>

              <Text style={styles.value}>
                {formatDateTime(
                  booking.createdAt
                )}
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>
                Last Updated
              </Text>

              <Text style={styles.value}>
                {formatDateTime(
                  booking.updatedAt
                )}
              </Text>
            </View>
          </View>

          <Text style={styles.publicUrl}>
            Public booking record:
          </Text>

          <Text style={styles.publicUrl}>
            {publicUrl}
          </Text>
        </View>

        <Text style={styles.footer}>
          This is a public booking record.
          Payment account information is not
          included in this document.
        </Text>
      </Page>
    </Document>
  );
}