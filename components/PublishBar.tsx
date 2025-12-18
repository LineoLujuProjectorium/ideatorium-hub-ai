"use client";

export default function PublishBar({ appId }: { appId: string }) {
  async function publish() {
    await fetch("/api/publish", {
      method: "POST",
      body: JSON.stringify({ appId }),
    });
    alert("Published");
  }

  return <button onClick={publish}>Publish App</button>;
}
