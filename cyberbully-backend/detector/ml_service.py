import re
import pickle
import numpy as np
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
ML_DIR = BASE_DIR / "ml_models"

THRESHOLD = 0.5

try:
    with open(ML_DIR / "svm_model.pkl", "rb") as f:
        svm_model = pickle.load(f)

    with open(ML_DIR / "tfidf_vectorizer.pkl", "rb") as f:
        tfidf_vectorizer = pickle.load(f)

except Exception as e:
    raise RuntimeError(f"Error loading ML models: {e}")


def clean_text(text: str) -> str:
    text = str(text).lower()
    text = re.sub(r"http\S+|www\S+", "", text)
    text = re.sub(r"[^a-zA-Z\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def predict(text: str) -> dict:
    cleaned = clean_text(text)

    if not cleaned:
        return {
            "label": "not_cyberbullying",
            "confidence": 0.0,
            "svm_confidence": 0.0,
        }

    try:
        tfidf_vec = tfidf_vectorizer.transform([cleaned])

        decision = svm_model.decision_function(tfidf_vec)[0]

        svm_score = float(1 / (1 + np.exp(-decision)))

    except Exception as e:
        return {
            "label": "not_cyberbullying",
            "confidence": 0.0,
            "svm_confidence": 0.0,
            "error": "Prediction failed"
        }

    label = "cyberbullying" if svm_score >= THRESHOLD else "not_cyberbullying"

    confidence = round(svm_score * 100, 2) if label == "cyberbullying" \
        else round((1 - svm_score) * 100, 2)

    return {
        "label": label,
        "confidence": confidence,
        "svm_confidence": round(svm_score * 100, 2),
    }