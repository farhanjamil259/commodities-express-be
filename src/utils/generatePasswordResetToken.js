import crypto from "crypto";

const generatePasswordResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex");

  crypto.createHash("sha256").update(resetToken).digest("hex");

  return resetToken;
};

export default generatePasswordResetToken;
