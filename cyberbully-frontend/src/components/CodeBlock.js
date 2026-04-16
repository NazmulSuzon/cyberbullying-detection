import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

export default function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: "relative", background: "#1e1e1e", borderRadius: "0 0 6px 6px", overflow: "hidden" }}>
      <button
        onClick={handleCopy}
        style={{
          position: "absolute", top: 8, right: 10,
          background: "transparent", border: "1px solid #444",
          color: copied ? "#4caf50" : "#888",
          borderRadius: 4, padding: "2px 10px", fontSize: 12, cursor: "pointer",
          display: "flex", alignItems: "center", gap: 4,
        }}
      >
        {copied ? <><FiCheck size={12} /> Copied</> : <><FiCopy size={12} /> Copy</>}
      </button>

      <pre style={{ margin: 0, padding: "16px 14px", overflowX: "auto", fontSize: 13, lineHeight: 1.7, fontFamily: "monospace", color: "#ccc" }}>
        {code.split("\n").map((line, i) => (
          <div key={i} style={{ color: line.trim().startsWith("#") ? "#6a9a6a" : "#ccc" }}>
            {line || " "}
          </div>
        ))}
      </pre>
    </div>
  );
}