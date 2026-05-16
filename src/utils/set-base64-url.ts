export const setBase64Url = (input: Buffer): string => {
  return input.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
};
