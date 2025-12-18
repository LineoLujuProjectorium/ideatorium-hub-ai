"use client";

import { getMountedAppId } from "./mountApp";
import { getApp } from "../store/apps.table";
import { useMemo } from "react";

export function RenderMountedApp() {
  const id = getMountedAppId();
  if (!id) return <p>No app</p>;

  const app = getApp(id);
  if (!app) return <p>Missing app</p>;

  const Page = useMemo(() => {
    const code = app.files["app/page.tsx"];
    const exports: any = {};
    new Function("exports", code)(exports);
    return exports.default;
  }, [id]);

  return <Page />;
}
