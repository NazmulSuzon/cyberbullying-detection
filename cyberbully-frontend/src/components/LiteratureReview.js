import { Card } from "react-bootstrap";
import { LIT_REVIEW_SECTIONS } from "../constants/litReview";

export default function LiteratureReview() {
  return (
    <>
      <h5 style={{ fontWeight: 700, color: "#212529", marginBottom: 14 }}>
        Literature Review
      </h5>

      <Card className="mb-4 shadow-sm">
        <Card.Body className="p-4">
          <p style={{ fontSize: 13, color: "#aaa", marginBottom: 20, fontFamily: "monospace" }}>
            Title: Cyberbullying Detection on Social Media Using Machine Learning
          </p>

          {LIT_REVIEW_SECTIONS.map((sec, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <h6 style={{ fontWeight: 700, color: "#0d6efd", marginBottom: 8 }}>
                {sec.heading}
              </h6>
              <p style={{ fontSize: 14, color: "#444", lineHeight: 1.85, whiteSpace: "pre-line", fontFamily: "Georgia, serif", margin: 0 }}>
                {sec.text}
              </p>
              {i < LIT_REVIEW_SECTIONS.length - 1 && <hr style={{ margin: "16px 0" }} />}
            </div>
          ))}
        </Card.Body>
      </Card>
    </>
  );
}