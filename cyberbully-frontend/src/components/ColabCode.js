import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import CodeBlock from "./CodeBlock";
import { COLAB_SECTIONS } from "../constants/colabSections";

export default function ColabCode() {
  const [openSection, setOpenSection] = useState(null);

  const toggle = (i) => setOpenSection(openSection === i ? null : i);

  return (
    <>
      <h5 style={{ fontWeight: 700, color: "#212529", marginBottom: 14 }}>
        Google Colab Training Code
      </h5>
      <p style={{ fontSize: 14, color: "#888", marginBottom: 16 }}>
        Dataset: Mendeley — Aggressive_All.csv + Non_Aggressive_All.csv · Total: 237,656 samples
      </p>

      {COLAB_SECTIONS.map((sec, i) => (
        <div key={i} className="mb-2">
          <button
            onClick={() => toggle(i)}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: openSection === i ? "#e8f4fd" : "#fff",
              border: "1px solid #dee2e6",
              borderRadius: openSection === i ? "6px 6px 0 0" : 6,
              padding: "12px 16px",
              cursor: "pointer",
              color: openSection === i ? "#0d6efd" : "#333",
              fontSize: 14,
              fontWeight: 600,
              textAlign: "left",
            }}
          >
            <span>{sec.title}</span>
            {openSection === i ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
          </button>

          {openSection === i && <CodeBlock code={sec.code} />}
        </div>
      ))}
    </>
  );
}