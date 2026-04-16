import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Badge, Row, Col } from "react-bootstrap";
import { FiShield, FiChevronDown, FiChevronUp, FiCopy, FiCheck, FiGithub } from "react-icons/fi";

const COLAB_SECTIONS = [
  {
    title: "Step 1 — Load Dataset",
    code: `import pandas as pd

aggressive = pd.read_csv("3. Aggressive_All.csv")
non_aggressive = pd.read_csv("4. Non_Aggressive_All.csv")

aggressive['label'] = 1
non_aggressive['label'] = 0

df = pd.concat([aggressive, non_aggressive], ignore_index=True)
print(df.shape)   # (237656, 3)`,
  },
  {
    title: "Step 2 — Text Preprocessing",
    code: `import re
import nltk
from nltk.corpus import stopwords

nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

def clean_text(text):
    text = str(text).lower()
    text = re.sub(r"http\\S+", "", text)
    text = re.sub(r"[^a-zA-Z]", " ", text)
    words = text.split()
    words = [w for w in words if w not in stop_words]
    return " ".join(words)

df['clean_text'] = df['Message'].apply(clean_text)`,
  },
  {
    title: "Step 3 — TF-IDF + Train/Test Split",
    code: `from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split

tfidf = TfidfVectorizer(max_features=5000)
X = tfidf.fit_transform(df['clean_text'])
y = df['label']

# 70/30 split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.30, random_state=42, stratify=y
)

# 80/20 split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, random_state=42, stratify=y
)`,
  },
  {
    title: "Step 4 — Train & Evaluate SVM",
    code: `from sklearn.svm import LinearSVC
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.model_selection import cross_val_score

svm_model = LinearSVC()
svm_model.fit(X_train, y_train)
y_pred = svm_model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))
print(confusion_matrix(y_test, y_pred))

cv_scores = cross_val_score(svm_model, X, y, cv=5)
print("5-Fold CV Accuracy:", cv_scores.mean())`,
  },
  {
    title: "Step 5 — Save Models",
    code: `import pickle

with open("svm_model.pkl", "wb") as f:
    pickle.dump(svm_model, f)

with open("tfidf_vectorizer.pkl", "wb") as f:
    pickle.dump(tfidf, f)

from google.colab import files
files.download("svm_model.pkl")
files.download("tfidf_vectorizer.pkl")`,
  },
];

const REFERENCES = [
  { id: "[1]", ref: "Alotaibi, E.A. & Al-Samawi, A. (2025). Cyberbullying Detection and Identification Using Machine Learning-Based Hybrid Framework. IEEE Access, vol. 13, pp. 215423-215437." },
  { id: "[2]", ref: "Berbery, K., Samrouth, K., Bakir, N. & Dawood, M. (2025). Cyberbullying Dataset Collection for Enhanced Automatic Detection on Twitter Using Deep Learning. SmartNets, Istanbul, pp. 1-5." },
  { id: "[3]", ref: "Islam, M.M., Uddin, M.A., Islam, L., Akter, A., Sharmin, S. & Acharjee, U.K. (2020). Cyberbullying Detection on Social Networks Using Machine Learning Approaches. IEEE CSDE, Gold Coast, pp. 1-6." },
  { id: "[4]", ref: "Umer, M., Alabdulqader, E.A., Alarfaj, A.A., Cascone, L. & Nappi, M. (2025). Cyberbullying Detection Using PCA Extracted GloVe Features and RoBERTaNet. IEEE Transactions on Computational Social Systems, vol. 12, no. 5, pp. 3881-3890." },
  { id: "[5]", ref: "Ray, G., McDermott, C.D. & Nicho, M. (2024). Cyberbullying on Social Media: Definitions, Prevalence, and Impact Challenges. Journal of Cybersecurity, vol. 10, Issue 1." },
  { id: "[6]", ref: "Jain, V., Saxena, A.K., Senthil, A., Jain, A. & Jain, A. (2021). Cyber-Bullying Detection in Social Media Platform using Machine Learning. IEEE SMART, Moradabad, pp. 401-405." },
  { id: "[7]", ref: "Hani, J., Nashaat, M., Ahmed, M., Emad, Z., Amer, E. & Mohammed, A. (2019). Social Media Cyberbullying Detection Using Machine Learning. Int. Journal of Advanced Computer Science and Applications, 10(5)." },
  { id: "[8]", ref: "Al-Garadi, M.A. et al. (2019). Predicting Cyberbullying on Social Media in the Big Data Era Using Machine Learning Algorithms. IEEE Access, vol. 7, pp. 70701-70718." },
  { id: "[9]", ref: "Kagi, S. (2025). Cyberbullying Detection Using Machine Learning. Journal of Scientific Research and Technology (JSRT), vol. 3, no. 11, pp. 148-157." },
  { id: "[10]", ref: "Sultan, D., Omarov, B., Kozhamkulova, Z. et al. (2023). A Review of Machine Learning Techniques in Cyberbullying Detection. Computers, Materials & Continua, 74(3)." },
  { id: "[11]", ref: "Kumar, R. & Bhat, A. (2022). A Study of Machine Learning-Based Models for Detection, Control, and Mitigation of Cyberbullying in Online Social Media. Int. J. Inf. Secur. 21, 1409-1431." },
];

const LIT_REVIEW_SECTIONS = [
  { heading: "1. Introduction", text: "Cyberbullying has become a serious issue with the rapid growth of social media platforms. Unlike traditional bullying, cyberbullying happens through digital communication such as social networking sites, messaging platforms, online games, and forums [5], [10]. Due to anonymity and 24/7 accessibility, victims may experience anxiety, depression, and emotional distress [5], [11].\n\nRecent studies show that cyberbullying is a global concern and affects adolescents and young adults significantly [10], [11]. While many researchers focus on the psychological and social impact of cyberbullying, there is increasing research interest in using machine learning (ML) and deep learning (DL) to automatically detect harmful content [3], [7], [8].\n\nThis literature review aims to explore how cyberbullying is defined, how machine learning techniques are used for detection, and what limitations and research gaps currently exist." },
  { heading: "2. Research Questions", text: "1. How can machine learning techniques detect anomalous student behavior related to cyberbullying?\n2. How can automated cyberbullying detection systems contribute to mitigation and prevention?\n3. What limitations exist in current ML-based cyberbullying detection approaches?" },
  { heading: "3. Defining Cyberbullying", text: "There is no single universally accepted definition of cyberbullying. Ray et al. [5] highlight that inconsistencies in definitions create challenges in measuring prevalence and impact. Most studies agree that cyberbullying includes core elements such as: Intent to harm, Repetition, Power imbalance, and Emotional or psychological harm.\n\nSultan et al. [10] and Kumar and Bhat [11] categorize cyberbullying into forms such as flaming, harassment, impersonation, denigration, and cyberstalking. These forms may overlap and evolve over time.\n\nRay et al. [5] also emphasizes that cyberbullying may include subtle or indirect aggression, not only explicit hate speech. This makes automated detection more complex because models must detect sarcasm, implicit meaning, and context." },
  { heading: "4. Dataset Collection and Challenges", text: "Machine learning models depend heavily on quality datasets. Many researchers collect data using APIs, keyword filtering, or web scraping [2], [11].\n\nBerbery et al. [2] collected Twitter data and manually labeled tweets for deep learning classification. However, keyword-based data collection may introduce bias because it captures only predefined terms [11].\n\nCommon challenges include:\n• Class imbalance (more non-bullying than bullying content)\n• Noise in social media text (slang, emojis, abbreviations)\n• Limited multilingual datasets\n• Inconsistent labeling standards\n\nAl-Garadi et al. [8] emphasize that imbalance and noisy data significantly impact model performance." },
  { heading: "5. Traditional Machine Learning Approaches", text: "Early cyberbullying detection systems used traditional supervised machine learning models such as Naive Bayes, Support Vector Machines (SVM), Logistic Regression, Decision Trees, and Random Forest.\n\nIslam et al. [3] applied SVM and Naive Bayes for detection using TF-IDF and n-gram features. Hani et al. [7] compared SVM and Neural Networks and found neural networks slightly improved performance.\n\nTraditional models are computationally efficient and interpretable. However, they struggle with contextual ambiguity, sarcasm, and indirect bullying expressions [8], [10]." },
  { heading: "6. Deep Learning and Hybrid Approaches", text: "To overcome contextual limitations, researchers adopted deep learning techniques such as CNN, RNN, LSTM / Bi-LSTM, and Transformer-based models (BERT, RoBERTa).\n\nUmer et al. [4] introduced a transformer-based model using PCA-extracted GloVe features combined with RoBERTaNet, improving contextual understanding. Alotaibi and Al-Samawi [1] proposed a hybrid framework combining multiple ML strategies to improve classification robustness.\n\nDeep learning models generally outperform traditional ML models but require large labeled datasets and high computational resources [8], [11]." },
  { heading: "7. Behavioral and Anomaly-Based Detection", text: "Most existing research focuses on text-based classification. However, cyberbullying behavior may also involve patterns such as:\n• Repeated targeting of specific users\n• Sudden increase in aggressive posts\n• Network interaction patterns\n\nAl-Garadi et al. [8] and Kumar and Bhat [11] highlight the importance of predictive and behavioral models rather than only content-based detection." },
  { heading: "8. Mitigation and Prevention", text: "Detection alone is not sufficient. Some studies propose mitigation strategies such as:\n• Real-time content moderation\n• Automated warning systems\n• Early identification of harmful behavior\n\nBerbery et al. [2] suggested that automated systems can support moderation. Kumar and Bhat [11] emphasize predictive systems to reduce future incidents.\n\nHowever, ethical concerns such as privacy, bias, and false positives must be addressed [5], [11]." },
  { heading: "9. Research Gaps", text: "Based on the reviewed literature, several gaps remain:\n1. Lack of standardized definition and measurement tools [5].\n2. Dataset imbalance and labeling inconsistencies [2], [8].\n3. Over-reliance on English-language datasets [3], [10].\n4. Limited integration of behavioral anomaly detection with NLP models [8], [11].\n5. Limited explainability in deep learning models [4].\n6. Insufficient real-time preventive systems." },
  { heading: "10. Conclusion", text: "Cyberbullying detection using machine learning has progressed significantly. Traditional ML models provide baseline performance, while deep learning and hybrid frameworks improve contextual understanding.\n\nHowever, challenges remain in dataset quality, definition consistency, scalability, behavioral integration, and ethical concerns." },
];

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{ position: "relative", background: "#1e1e1e", borderRadius: "0 0 6px 6px", overflow: "hidden" }}>
      <button onClick={handleCopy} style={{
        position: "absolute", top: 8, right: 10,
        background: "transparent", border: "1px solid #444",
        color: copied ? "#4caf50" : "#888",
        borderRadius: 4, padding: "2px 10px", fontSize: 12, cursor: "pointer",
        display: "flex", alignItems: "center", gap: 4
      }}>
        {copied ? <><FiCheck size={12} /> Copied</> : <><FiCopy size={12} /> Copy</>}
      </button>
      <pre style={{ margin: 0, padding: "16px 14px", overflowX: "auto", fontSize: 13, lineHeight: 1.7, fontFamily: "monospace", color: "#ccc" }}>
        {code.split("\n").map((line, i) => (
          <div key={i} style={{ color: line.trim().startsWith("#") ? "#6a9a6a" : "#ccc" }}>
            {line || " "}
          </div>
        ))}
      </pre>
    </div>
  );
}

export default function About() {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(null);

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>

      {/* Navbar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #dee2e6", padding: "14px 0", marginBottom: 32 }}>
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <FiShield size={20} color="#0d6efd" />
              <span style={{ fontSize: 17, fontWeight: 700, color: "#212529" }}>Safeguard</span>
            </div>
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
              <Button variant="outline-secondary" size="sm" onClick={() => navigate("/")}>
                ← Back to App
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <Container style={{ maxWidth: 820 }} className="pb-5">

        {/* Header Card */}
        <Card className="mb-4 shadow-sm">
          <Card.Body className="p-4">
            <Badge bg="primary" className="mb-2" style={{ fontSize: 11 }}>MSc Research Project — TUS Athlone</Badge>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#212529" }}>
              Cyberbullying Detection on Social Media
            </h1>
            <p style={{ fontSize: 15, color: "#6c757d", marginBottom: 20 }}>
              Using Machine Learning: Support Vector Machine (SVM)
            </p>
            <Row className="g-2">
              {[
                { label: "Researcher", value: "Nazmul Hasan" },
                { label: "Student ID", value: "A00335985" },
                { label: "Supervisor", value: "Robert Stewart" },
                { label: "Programme", value: "MSc Software Engineering" },
                { label: "Institution", value: "TUS Athlone, Ireland" },
                { label: "Academic Year", value: "2025/2026" },
              ].map(item => (
                <Col xs={6} md={4} key={item.label}>
                  <div style={{ background: "#f8f9fa", borderRadius: 6, padding: "10px 12px", border: "1px solid #dee2e6" }}>
                    <div style={{ fontSize: 11, color: "#aaa", textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>{item.value}</div>
                  </div>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>

        {/* Model Performance */}
        <h5 style={{ fontWeight: 700, color: "#212529", marginBottom: 14 }}>Model Performance — SVM (LinearSVC)</h5>
        <Row className="g-3 mb-4">
          {[
            { split: "70 / 30 Split", accuracy: "86.18%", detail: "Train: 166,359 · Test: 71,297", precision: "89%", recall: "87%", f1: "88%" },
            { split: "80 / 20 Split", accuracy: "86.55%", detail: "Train: 190,124 · Test: 47,532", precision: "89%", recall: "87%", f1: "88%" },
          ].map(m => (
            <Col md={6} key={m.split}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <div style={{ fontSize: 12, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{m.split}</div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: "#0d6efd", marginBottom: 2 }}>{m.accuracy}</div>
                  <div style={{ fontSize: 13, color: "#aaa", marginBottom: 14 }}>{m.detail}</div>
                  <Row className="g-2">
                    {[["Precision", m.precision], ["Recall", m.recall], ["F1", m.f1]].map(([label, val]) => (
                      <Col key={label}>
                        <div style={{ background: "#f8f9fa", border: "1px solid #dee2e6", borderRadius: 6, padding: "8px", textAlign: "center" }}>
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
        <Card className="mb-4" style={{ background: "#e8f4fd", border: "1px solid #bee3f8" }}>
          <Card.Body style={{ fontSize: 14, color: "#444" }}>
            <strong>Dataset:</strong> Mendeley — 237,656 total posts (118,828 aggressive + 118,828 non-aggressive) · 5-Fold CV: 86.5%
          </Card.Body>
        </Card>

        {/* Colab Code */}
        <h5 style={{ fontWeight: 700, color: "#212529", marginBottom: 14 }}>Google Colab Training Code</h5>
        <p style={{ fontSize: 14, color: "#888", marginBottom: 16 }}>
          Dataset: Mendeley — Aggressive_All.csv + Non_Aggressive_All.csv · Total: 237,656 samples
        </p>
        {COLAB_SECTIONS.map((sec, i) => (
          <div key={i} className="mb-2">
            <button
              onClick={() => setOpenSection(openSection === i ? null : i)}
              style={{
                width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                background: openSection === i ? "#e8f4fd" : "#fff",
                border: "1px solid #dee2e6",
                borderRadius: openSection === i ? "6px 6px 0 0" : 6,
                padding: "12px 16px", cursor: "pointer",
                color: openSection === i ? "#0d6efd" : "#333",
                fontSize: 14, fontWeight: 600, textAlign: "left"
              }}
            >
              <span>{sec.title}</span>
              {openSection === i ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
            </button>
            {openSection === i && <CodeBlock code={sec.code} />}
          </div>
        ))}

        {/* Literature Review */}
        <h5 style={{ fontWeight: 700, color: "#212529", marginBottom: 14 }}>Literature Review</h5>
        <Card className="mb-4 shadow-sm">
          <Card.Body className="p-4">
            <p style={{ fontSize: 13, color: "#aaa", marginBottom: 20, fontFamily: "monospace" }}>
              Title: Cyberbullying Detection on Social Media Using Machine Learning
            </p>
            {LIT_REVIEW_SECTIONS.map((sec, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <h6 style={{ fontWeight: 700, color: "#0d6efd", marginBottom: 8 }}>{sec.heading}</h6>
                <p style={{ fontSize: 14, color: "#444", lineHeight: 1.85, whiteSpace: "pre-line", fontFamily: "Georgia, serif", margin: 0 }}>
                  {sec.text}
                </p>
                {i < LIT_REVIEW_SECTIONS.length - 1 && <hr style={{ margin: "16px 0" }} />}
              </div>
            ))}
          </Card.Body>
        </Card>

        {/* References */}
        <h5 style={{ fontWeight: 700, color: "#212529", marginBottom: 14 }}>References</h5>
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            {REFERENCES.map(item => (
              <div key={item.id} className="d-flex gap-3 mb-2 p-2" style={{ background: "#f8f9fa", borderRadius: 6 }}>
                <span style={{ fontSize: 13, color: "#0d6efd", fontWeight: 700, minWidth: 32, fontFamily: "monospace" }}>
                  {item.id}
                </span>
                <span style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>{item.ref}</span>
              </div>
            ))}
          </Card.Body>
        </Card>

        {/* Footer */}
        <div className="text-center mt-5 pt-3 border-top">
          <p style={{ fontSize: 12, color: "#aaa" }}>
            MSc Software Engineering · TUS Athlone · Cyberbullying Detection Research Project · 2025/2026
          </p>
        </div>

      </Container>
    </div>
  );
}