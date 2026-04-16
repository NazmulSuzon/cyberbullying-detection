import { useState } from "react";
import { Container, Alert } from "react-bootstrap";
import { FiInfo } from "react-icons/fi";

import NavBar from "./components/NavBar";
import StatsRow from "./components/StatsRow";
import PostInput from "./components/PostInput";
import DetectionFeed from "./components/DetectionFeed";
import { API_URL } from "./constants/config";

export default function MainApp() {
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
      if (!res.ok) throw new Error(data.message || "Server error");

      const isBullying = data.label === "cyberbullying";

      setPosts((prev) => [{ ...data, id: Date.now() }, ...prev]);
      setStats((prev) => ({
        total:   prev.total + 1,
        flagged: prev.flagged + (isBullying ? 1 : 0),
        safe:    prev.safe   + (isBullying ? 0 : 1),
      }));
      setText("");
    } catch (e) {
      setError(
        "Could not connect to the backend. Make sure Django is running on port 8000."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <NavBar />

      <Container className="py-4" style={{ maxWidth: 700 }}>
        <div className="text-center mb-4">
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#212529" }}>
            Cyberbullying Detection
          </h1>
          <p style={{ fontSize: 15, color: "#6c757d" }}>
            Paste or type a social media post below to analyse it.
          </p>
          <Alert variant="warning" className="text-start mt-3" style={{ fontSize: 14 }}>
            <FiInfo size={15} className="me-2" />
            <strong>Note:</strong> This model may sometimes miss cyberbullying posts.
            For example, a post like <em>"Nobody wants you here, just disappear"</em> could
            be marked as safe because SVM recognises individual words but does not understand
            the full tone or context — the way a human would. This is a known limitation of
            traditional machine learning models.
          </Alert>
        </div>

        <StatsRow stats={stats} />

        <PostInput
          text={text}
          setText={setText}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
        />

        <DetectionFeed posts={posts} />

        {/* Footer */}
        <div className="text-center mt-5 pt-3 border-top">
          <p style={{ fontSize: 12, color: "#aaa" }}>
            MSc Software Engineering · TUS Athlone · Cyberbullying Detection Research Project
          </p>
        </div>
      </Container>
    </div>
  );
}