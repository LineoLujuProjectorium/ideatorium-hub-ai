"use client";

import { useState } from "react";

export default function GreetingsApp() {
  const [name, setName] = useState("");
  const [style, setStyle] = useState("friendly");
  const [greeting, setGreeting] = useState("");

  function generateGreeting() {
    if (!name) {
      setGreeting("Please enter a name.");
      return;
    }

    const greetings: Record<string, string> = {
      friendly: `Hey ${name}! Lovely to see you 😊`,
      formal: `Good day, ${name}. I hope you are well.`,
      playful: `Well well well… if it isn’t ${name}! 🎉`,
      dramatic: `Ahhh ${name}… destiny has brought you here.`,
    };

    setGreeting(greetings[style]);
  }

  return (
    <div style={{ maxWidth: 600 }}>
      <h1>Greetings App</h1>
      <p>Create a greeting instantly.</p>

      <label>
        Name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ display: "block", marginBottom: 12, width: "100%" }}
        />
      </label>

      <label>
        Style
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          style={{ display: "block", marginBottom: 12 }}
        >
          <option value="friendly">Friendly</option>
          <option value="formal">Formal</option>
          <option value="playful">Playful</option>
          <option value="dramatic">Dramatic</option>
        </select>
      </label>

      <button onClick={generateGreeting}>Generate Greeting</button>

      {greeting && (
        <div style={{ marginTop: 20, padding: 12, border: "1px solid #333" }}>
          {greeting}
        </div>
      )}
    </div>
  );
}
