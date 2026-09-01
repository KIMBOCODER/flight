"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import {
  Plane,
  Car,
  Train,
  Bus,
} from "lucide-react";

import { recentBookings } from "../data/mockBookings";

export function RecentBookingsTable() {
  return (
    <div className="mt-8">
      <div className="rounded-xl border bg-white">
        <div className="p-6">
          <h2 className="text-lg font-semibold">Recent Bookings</h2>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {recentBookings.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-medium">{b.id}</TableCell>
                <TableCell>{b.customer}</TableCell>
                <TableCell className="flex items-center gap-2">
                  {b.type === "Flight" && <Plane size={16} />}
                  {b.type === "Car" && <Car size={16} />}
                  {b.type === "Train" && <Train size={16} />}
                  {b.type === "Bus" && <Bus size={16} />}
                  {b.type}
                </TableCell>
                <TableCell>{b.route}</TableCell>
                <TableCell>{b.date}</TableCell>
                <TableCell className="font-semibold">{b.amount}</TableCell>
                <TableCell>
                  <Badge variant={b.status === "Confirmed" ? "default" : "secondary"}>
                    {b.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}