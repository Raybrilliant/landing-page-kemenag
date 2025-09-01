import PocketBase from "pocketbase";

const url =
  import.meta.env.PUBLIC_SITE_API ??
  (typeof process !== "undefined" ? process.env.PUBLIC_SITE_API : undefined);

if (!url) {
  throw new Error("PUBLIC_SITE_API is not defined");
}

const pb = new PocketBase(url);

export default pb;

