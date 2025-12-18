import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

type Props = {
  params: { id: string };
};

export default function AppRunner({ params }: Props) {
  const appPath = path.join(process.cwd(), "apps", params.id, "app", "page.tsx");

  if (!fs.existsSync(appPath)) {
    notFound();
  }

  const App = dynamic(() =>
    import(`../../../apps/${params.id}/app/page`),
    { ssr: false }
  );

  return <App />;
}
