import { Card } from "react-bootstrap";
import { REFERENCES } from "../constants/references";

export default function ReferenceList() {
  return (
    <>
      <h5 style={{ fontWeight: 700, color: "#212529", marginBottom: 14 }}>
        References
      </h5>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          {REFERENCES.map((item) => (
            <div
              key={item.id}
              className="d-flex gap-3 mb-2 p-2"
              style={{ background: "#f8f9fa", borderRadius: 6 }}
            >
              <span style={{ fontSize: 13, color: "#0d6efd", fontWeight: 700, minWidth: 32, fontFamily: "monospace" }}>
                {item.id}
              </span>
              <span style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>
                {item.ref}
              </span>
            </div>
          ))}
        </Card.Body>
      </Card>
    </>
  );
}