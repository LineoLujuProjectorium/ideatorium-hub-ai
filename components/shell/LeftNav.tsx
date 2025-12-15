import Link from "next/link";

export default function LeftNav() {
  return (
    <aside className="panel" style={{ padding: 20 }}>
      <h3>Project</h3>
      <Link href="#">Preview</Link><br/>
      <Link href="#">Database</Link><br/>
      <Link href="#">Storage</Link><br/>
      <Link href="#">Logs</Link><br/>
      <Link href="#">Settings</Link>
    </aside>
  );
}
