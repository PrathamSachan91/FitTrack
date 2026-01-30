import jwt from "jsonwebtoken";
import crypto from "crypto";
import AuthToken from "../models/AuthToken.js";

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

export const isAuthCheck = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const tokenHash = hashToken(token);

    const tokenRecord = await AuthToken.findOne({
      where: { tokenHash },
    });

    if (!tokenRecord) {
      return res.status(401).json({ message: "Session not found" });
    }

    if (new Date() > tokenRecord.expiresAt) {
      await tokenRecord.destroy();
      return res.status(401).json({ message: "Session expired" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};
