import PocketBase from "pocketbase";
const pb = new PocketBase(import.meta.env.PUBLIC_SITE_API as string);
export default pb;
