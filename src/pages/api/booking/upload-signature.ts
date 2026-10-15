
import type { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";

import { requireUser } from "@/features/auth/server/session";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type UploadType = "cover" | "avatar";

const ALLOWED_FORMATS = "jpg,jpeg,png,webp";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    const user = await requireUser(req.headers.cookie);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const type = req.body?.type as UploadType;

    if (type !== "cover" && type !== "avatar") {
      return res.status(400).json({
        message: "Invalid upload type.",
      });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      console.error("Cloudinary environment variables are missing.");

      return res.status(500).json({
        message: "Image upload is not configured.",
      });
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const folder = `flight-booking/${user.id}/${
      type === "cover" ? "covers" : "avatars"
    }`;

    const paramsToSign = {
      timestamp,
      folder,
      allowed_formats: ALLOWED_FORMATS,
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      apiSecret
    );

    return res.status(200).json({
      cloudName,
      apiKey,
      timestamp,
      folder,
      allowedFormats: ALLOWED_FORMATS,
      signature,
    });
  } catch (error) {
    console.error("CLOUDINARY SIGNATURE ERROR:", error);

    return res.status(500).json({
      message: "Unable to authorize image upload.",
    });
  }
}
