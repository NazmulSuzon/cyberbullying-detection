import { Row, Col, Card } from "react-bootstrap";

const STAT_CONFIG = [
  { label: "Total Posts", key: "total", color: "primary" },
  { label: "Flagged",     key: "flagged", color: "danger" },
  { label: "Safe",        key: "safe",    color: "success" },
];

export default function StatsRow({ stats }) {
  if (stats.total === 0) return null;

  return (
    <Row className="g-3 mb-4">
      {STAT_CONFIG.map((s) => (
        <Col key={s.label} xs={4}>
          <Card className="text-center">
            <Card.Body className="py-3">
              <div
                style={{ fontSize: 26, fontWeight: 700 }}
                className={`text-${s.color}`}
              >
                {stats[s.key]}
              </div>
              <div style={{ fontSize: 13, color: "#888" }}>{s.label}</div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}