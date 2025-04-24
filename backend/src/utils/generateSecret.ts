import crypto from "crypto";

export const getClientSecretHash = (email: string): string => {
  const clientId = process.env.COGNITO_CLIENT_ID!;
  const clientSecret = process.env.COGNITO_CLIENT_SECRET!;

  return crypto
    .createHmac("sha256", clientSecret)
    .update(email + clientId)
    .digest("base64");
};
