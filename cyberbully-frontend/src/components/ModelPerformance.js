import { Row, Col, Card } from "react-bootstrap";

const MODEL_RESULTS = [
  {
    split:     "70 / 30 Split",
    accuracy:  "86.18%",
    detail:    "Train: 166,359 · Test: 71,297",
    precision: "89%",
    recall:    "87%",
    f1:        "88%",
  },
  {
    split:     "80 / 20 Split",
    accuracy:  "86.55%",
    detail:    "Train: 190,124 · Test: 47,532",
    precision: "89%",
    recall:    "87%",
    f1:        "88%",
  },
];

export default function ModelPerformance() {
  return (
    <>
      <h5 style={{ fontWeight: 700, color: "#212529", marginBottom: 14 }}>
        Model Performance — SVM (LinearSVC)
      </h5>

      <Row className="g-3 mb-4">
        {MODEL_RESULTS.map((m) => (
          <Col md={6} key={m.split}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div style={{ fontSize: 12, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
                  {m.split}
                </div>
                <div style={{ fontSize: 32, fontWeight: 700, color: "#0d6efd", marginBottom: 2 }}>
                  {m.accuracy}
                </div>
                <div style={{ fontSize: 13, color: "#aaa", marginBottom: 14 }}>
                  {m.detail}
                </div>
                <Row className="g-2">
                  {[["Precision", m.precision], ["Recall", m.recall], ["F1", m.f1]].map(([label, val]) => (
                    <Col key={label}>
                      <div style={{ background: "#f8f9fa", border: "1px solid #dee2e6", borderRadius: 6, padding: 8, textAlign: "center" }}>
                        <div style={{ fontSize: 11, color: "#aaa", marginBottom: 2 }}>{label}</div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "#333" }}>{val}</div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Dataset note */}
      <Card className="mb-4" style={{ background: "#e8f4fd", border: "1px solid #bee3f8" }}>
        <Card.Body style={{ fontSize: 14, color: "#444" }}>
          <strong>Dataset:</strong> Mendeley — 237,656 total posts (118,828 aggressive + 118,828 non-aggressive) · 5-Fold CV: 86.5%
        </Card.Body>
      </Card>
    </>
  );
}