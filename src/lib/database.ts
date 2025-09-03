import PocketBase from "pocketbase";

let url: string | undefined 

if (import.meta.env.SSR) {
  // jalan di server
  url = process.env.PUBLIC_SITE_API || process.env.SITE_API;
} else {
  // jalan di browser
  url = import.meta.env.PUBLIC_SITE_API;
}

if (!url) {
  url = 'https://api.kemenagkotaprobolinggo.id/';
}

const pb = new PocketBase(url);

export default pb;