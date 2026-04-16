import { Card, Button } from "react-bootstrap";
import { FiDownload } from "react-icons/fi";

export default function ResearchPoster() {
  return (
    <>
      <h5 style={{ fontWeight: 700, color: "#212529", marginBottom: 14 }}>
        Research Poster
      </h5>

      <Card className="mb-4 shadow-sm">
        <Card.Body className="p-3">
          <img
            src="/Nazmul_Poster_Final.png"
            alt="Cyberbullying Detection Research Poster"
            style={{
              width: "100%",
              borderRadius: 6,
              border: "1px solid #dee2e6",
            }}
          />
          <div className="text-center mt-3">
            <Button
              variant="outline-primary"
              size="sm"
              href="/Nazmul_Poster_Final.png"
              download="Nazmul_Hasan_Cyberbullying_Poster.png"
            >
              <FiDownload size={14} className="me-1" />
              Download Poster
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}