import LeftNav from "./LeftNav";
import RightPanel from "./RightPanel";

export default function BuilderShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr 380px", height: "100vh" }}>
      <LeftNav />
      <main>{children}</main>
      <RightPanel />
    </div>
  );
}
