import { Container } from "react-bootstrap";

import NavBar           from "./components/NavBar";
import ResearchHeader   from "./components/ResearchHeader";
import ModelPerformance from "./components/ModelPerformance";
import ColabCode        from "./components/ColabCode";
import LiteratureReview from "./components/LiteratureReview";
import ReferenceList    from "./components/ReferenceList";
import ResearchPoster   from "./components/ResearchPoster";

export default function About() {
  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <NavBar />

      <Container style={{ maxWidth: 820 }} className="pb-5 pt-4">
        <ResearchHeader />
        <ResearchPoster />
        <ModelPerformance />
        <ColabCode />
        <LiteratureReview />
        <ReferenceList />

        <div className="text-center mt-5 pt-3 border-top">
          <p style={{ fontSize: 12, color: "#aaa" }}>
            MSc Software Engineering · TUS Athlone · Cyberbullying Detection Research Project · 2025/2026
          </p>
        </div>
      </Container>
    </div>
  );
}