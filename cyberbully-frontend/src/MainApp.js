import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
  Alert,
} from "react-bootstrap";
import {
  FiShield,
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
} from "react-icons/fi";

const API_URL = "http://127.0.0.1:8000/api/detect/";

const SAMPLE_POSTS = [
  "You're such a loser, everyone hates you.",
  "Had a great day at the park today!",
  "Nobody wants you here, just disappear.",
  "Just finished my research project, feeling proud!",
];

function PostCard({ post, index }) {
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
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-muted" style={{ fontSize: 13 }}>
            user_{String(index + 1).padStart(3, "0")}
          </span>
          <Badge
            bg={isBullying ? "danger" : "success"}
            style={{ fontSize: 12 }}
          >
            {isBullying ? (
              <>
                <FiAlertTriangle size={12} className="me-1" />
                Flagged
              </>
            ) : (
              <>
                <FiCheckCircle size={12} className="me-1" />
                Safe
              </>
            )}
          </Badge>
        </div>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            fontFamily: "Georgia, serif",
            color: "#333",
          }}
        >
          {post.text}
        </p>
        <div className="d-flex justify-content-between mb-1">
          <span style={{ fontSize: 13, color: "#888" }}>Confidence</span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: isBullying ? "#dc3545" : "#198754",
            }}
          >
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

export default function MainApp() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ total: 0, flagged: 0, safe: 0 });

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Server error");
      }
      setPosts((prev) => [{ ...data, id: Date.now() }, ...prev]);
      setStats((prev) => ({
        total: prev.total + 1,
        flagged: prev.flagged + (data.label === "cyberbullying" ? 1 : 0),
        safe: prev.safe + (data.label !== "cyberbullying" ? 1 : 0),
      }));
      setText("");
    } catch (e) {
      setError(
        "Could not connect to the backend. Make sure Django is running on port 8000.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      {/* Navbar */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #dee2e6",
          padding: "14px 0",
        }}
      >
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <FiShield size={22} color="#0d6efd" />
              <span style={{ fontSize: 18, fontWeight: 700, color: "#212529" }}>
                Safeguard
              </span>
              <Badge bg="primary" style={{ fontSize: 11, fontWeight: 400 }}>
                SVM · 86.5%
              </Badge>
            </div>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => navigate("/about")}
            >
              About / Research
            </Button>
          </div>
        </Container>
      </div>

      <Container className="py-4" style={{ maxWidth: 700 }}>
        {/* Title */}
        <div className="text-center mb-4">
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#212529" }}>
            Cyberbullying Detection
          </h1>
          <p style={{ fontSize: 15, color: "#6c757d" }}>
            Paste or type a social media post below to analyse it.
          </p>
          <Alert
            variant="warning"
            className="text-start mt-3"
            style={{ fontSize: 14 }}
          >
            <FiInfo size={15} className="me-2" />
            <strong>Note:</strong> This model may sometimes miss cyberbullying
            posts. For example, a post like{" "}
            <em>"Nobody wants you here, just disappear"</em> could be marked as
            safe because SVM recognises individual words but does not understand
            the full tone or context of a sentence — the way a human would. This
            is a known limitation of traditional machine learning models.
          </Alert>
        </div>

        {/* Stats */}
        {stats.total > 0 && (
          <Row className="g-3 mb-4">
            {[
              { label: "Total Posts", value: stats.total, color: "primary" },
              { label: "Flagged", value: stats.flagged, color: "danger" },
              { label: "Safe", value: stats.safe, color: "success" },
            ].map((s) => (
              <Col key={s.label} xs={4}>
                <Card className="text-center">
                  <Card.Body className="py-3">
                    <div
                      style={{ fontSize: 26, fontWeight: 700 }}
                      className={`text-${s.color}`}
                    >
                      {s.value}
                    </div>
                    <div style={{ fontSize: 13, color: "#888" }}>{s.label}</div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Input Card */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Form.Label
              style={{ fontSize: 14, fontWeight: 600, color: "#495057" }}
            >
              Post Content
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && e.ctrlKey && handleSubmit()
              }
              placeholder="Write something to analyse..."
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                fontFamily: "Georgia, serif",
                resize: "vertical",
              }}
              className="mb-3"
            />

            {/* Samples */}
            <div className="mb-3">
              <span style={{ fontSize: 13, color: "#888" }}>
                Try a sample:{" "}
              </span>
              <div className="d-flex flex-wrap gap-2 mt-1">
                {SAMPLE_POSTS.map((s, i) => (
                  <Button
                    key={i}
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => setText(s)}
                    style={{ fontSize: 12 }}
                  >
                    Sample {i + 1}
                  </Button>
                ))}
              </div>
            </div>

            {loading && (
              <Alert variant="info" style={{ fontSize: 14 }}>
                Analysing with SVM model...
              </Alert>
            )}

            {error && (
              <Alert variant="danger" style={{ fontSize: 14 }}>
                ⚠ {error}
              </Alert>
            )}

            <Button
              variant="primary"
              className="w-100"
              onClick={handleSubmit}
              disabled={loading || !text.trim()}
              style={{ fontSize: 15, padding: "10px" }}
            >
              {loading ? "Analysing..." : "Analyse Post"}
            </Button>
            <p className="text-center text-muted mt-2" style={{ fontSize: 12 }}>
              Ctrl+Enter to submit
            </p>
          </Card.Body>
        </Card>

        {/* Feed */}
        {posts.length > 0 && (
          <div>
            <div className="d-flex align-items-center gap-2 mb-3">
              <hr className="flex-grow-1" />
              <span style={{ fontSize: 13, color: "#aaa" }}>
                Detection Feed
              </span>
              <hr className="flex-grow-1" />
            </div>
            {posts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}

        {posts.length === 0 && (
          <div className="text-center text-muted py-5" style={{ fontSize: 14 }}>
            No posts analysed yet. Submit something above.
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-5 pt-3 border-top">
          <p style={{ fontSize: 12, color: "#aaa" }}>
            MSc Software Engineering · TUS Athlone · Cyberbullying Detection
            Research Project
          </p>
        </div>
      </Container>
    </div>
  );
}
