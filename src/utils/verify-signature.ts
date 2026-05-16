import { createHmac, timingSafeEqual } from "node:crypto";

export const verifySignature = (secret: string, body: string, signature?: string): boolean => {
  if (!signature) return false;
  const expected = `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);
  if (signatureBuffer.byteLength !== expectedBuffer.byteLength) return false;
  return timingSafeEqual(expectedBuffer, signatureBuffer);
};
