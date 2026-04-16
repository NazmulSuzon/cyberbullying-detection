import { Card, Form, Button, Alert } from "react-bootstrap";
import { SAMPLE_POSTS } from "../constants/config";

export default function PostInput({ text, setText, onSubmit, loading, error }) {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Form.Label style={{ fontSize: 14, fontWeight: 600, color: "#495057" }}>
          Post Content
        </Form.Label>

        <Form.Control
          as="textarea"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && e.ctrlKey && onSubmit()}
          placeholder="Write something to analyse..."
          style={{
            fontSize: 15,
            lineHeight: 1.6,
            fontFamily: "Georgia, serif",
            resize: "vertical",
          }}
          className="mb-3"
        />

        {/* Sample posts */}
        <div className="mb-3">
          <span style={{ fontSize: 13, color: "#888" }}>Try a sample: </span>
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
          onClick={onSubmit}
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
  );
}