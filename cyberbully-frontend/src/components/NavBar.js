import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container, Badge, Button } from "react-bootstrap";
import { FiShield, FiGithub } from "react-icons/fi";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAboutPage = location.pathname === "/about";

  return (
    <div
      style={{
        background: "#fff",
        borderBottom: "1px solid #dee2e6",
        padding: "14px 0",
      }}
    >
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/" className="text-decoration-none">
            <div className="d-flex align-items-center gap-2">
              <FiShield size={22} color="#0d6efd" />
              <span style={{ fontSize: 18, fontWeight: 700, color: "#212529" }}>
                SafeGuard
              </span>
              <Badge bg="primary" style={{ fontSize: 11, fontWeight: 400 }}>
                SVM · 86.5%
              </Badge>
            </div>
          </Link>

          <div className="d-flex gap-2">
            <Button
              variant="outline-secondary"
              size="sm"
              href="https://github.com/NazmulSuzon/cyberbullying-detection"
              target="_blank"
              rel="noopener noreferrer"
              as="a"
            >
              <FiGithub size={14} className="me-1" />
              Source Code
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => navigate(isAboutPage ? "/" : "/about")}
            >
              {isAboutPage ? "← Home" : "About / Research"}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}