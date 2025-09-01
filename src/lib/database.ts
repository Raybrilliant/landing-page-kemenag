import PocketBase from "pocketbase";

const url =
  import.meta.env.PUBLIC_SITE_API ??
  (typeof process !== "undefined"
    ? process.env.PUBLIC_SITE_API || process.env.SITE_API
    : undefined);

if (!url) {
  throw new Error("PUBLIC_SITE_API atau SITE_API tidak ditemukan");
}

const pb = new PocketBase(url);

export default pb;