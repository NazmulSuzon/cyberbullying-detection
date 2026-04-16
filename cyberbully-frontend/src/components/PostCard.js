import { useState, useEffect } from "react";
import { Card, Badge } from "react-bootstrap";
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";

export default function PostCard({ post, index }) {
  const isBullying = post.label === "cyberbullying";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <Card
      className="mb-3"
      style={{
        borderLeft: `4px solid ${isBullying ? "#dc3545" : "#198754"}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      <Card.Body>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-muted" style={{ fontSize: 13 }}>
            user_{String(index + 1).padStart(3, "0")}
          </span>
          <Badge bg={isBullying ? "danger" : "success"} style={{ fontSize: 12 }}>
            {isBullying ? (
              <><FiAlertTriangle size={12} className="me-1" />Flagged</>
            ) : (
              <><FiCheckCircle size={12} className="me-1" />Safe</>
            )}
          </Badge>
        </div>

        {/* Post text */}
        <p style={{ fontSize: 15, lineHeight: 1.7, fontFamily: "Georgia, serif", color: "#333" }}>
          {post.text}
        </p>

        {/* Confidence bar */}
        <div className="d-flex justify-content-between mb-1">
          <span style={{ fontSize: 13, color: "#888" }}>Confidence</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: isBullying ? "#dc3545" : "#198754" }}>
            {post.confidence}%
          </span>
        </div>
        <div style={{ height: 4, background: "#eee", borderRadius: 2 }}>
          <div
            style={{
              height: "100%",
              width: `${post.confidence}%`,
              background: isBullying ? "#dc3545" : "#198754",
              borderRadius: 2,
              transition: "width 0.6s ease",
            }}
          />
        </div>
      </Card.Body>
    </Card>
  );
}