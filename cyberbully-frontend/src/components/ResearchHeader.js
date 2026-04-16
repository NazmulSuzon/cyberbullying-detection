import { Card, Badge, Row, Col } from "react-bootstrap";

const RESEARCHER_INFO = [
  { label: "Researcher",    value: "Nazmul Hasan" },
  { label: "Student ID",    value: "A00335985" },
  { label: "Supervisor",    value: "Robert Stewart" },
  { label: "Programme",     value: "MSc Software Engineering" },
  { label: "Institution",   value: "TUS Athlone, Ireland" },
  { label: "Academic Year", value: "2025/2026" },
];

export default function ResearchHeader() {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body className="p-4">
        <Badge bg="primary" className="mb-2" style={{ fontSize: 11 }}>
          MSc Research Project — TUS Athlone
        </Badge>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#212529" }}>
          Cyberbullying Detection on Social Media
        </h1>
        <p style={{ fontSize: 15, color: "#6c757d", marginBottom: 20 }}>
          Using Machine Learning: Support Vector Machine (SVM)
        </p>

        <Row className="g-2">
          {RESEARCHER_INFO.map((item) => (
            <Col xs={6} md={4} key={item.label}>
              <div style={{ background: "#f8f9fa", borderRadius: 6, padding: "10px 12px", border: "1px solid #dee2e6" }}>
                <div style={{ fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>
                  {item.value}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
}