import { buildApp } from "../publish/buildApp";
import { publishLocal } from "../publish/publishLocal";
import { createVersion } from "../store/apps.table";

export async function publishApp(appId: string) {
  buildApp(appId);
  const url = await publishLocal(appId);
  return createVersion(appId, url);
}
