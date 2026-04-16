# Cyberbullying Detection on Social Media using Machine Learning— MSc Research Project

> A full-stack web application that detects cyberbullying in social media posts using a Support Vector Machine (SVM) trained on 237,656 samples.

**Live Site:** [https://cyberbullying-detection1.netlify.app/]

---

## What This Project Does

Users paste or type a social media post into the app. The backend runs it through a trained SVM model and returns:
- A **label** — `cyberbullying` or `not cyberbullying`
- A **confidence score** (%)
- A running **feed** of analysed posts with stats

The About / Research page shows the full literature review, model performance metrics, and the Google Colab training code used to build the model.

---

## Purpose

This project was built as part of an MSc Software Engineering research project at TUS Athlone, Ireland. The goal was to investigate how traditional machine learning — specifically SVM with TF-IDF features — performs on large-scale cyberbullying detection, and to understand its limitations compared to deep learning approaches.

---

## How It Works

### Machine Learning Model
- **Dataset:** Mendeley — 237,656 posts (118,828 aggressive + 118,828 non-aggressive)
- **Preprocessing:** Lowercasing, URL removal, stop word removal (NLTK)
- **Features:** TF-IDF vectoriser (`max_features=5000`)
- **Model:** `LinearSVC` (scikit-learn)
- **Accuracy:** 86.5% (5-Fold Cross-Validation)
- **Training:** Done in Google Colab; model saved as `.pkl` files

### Backend (Django + Django REST Framework)
- Loads `svm_model.pkl` and `tfidf_vectorizer.pkl` on startup
- Exposes a single endpoint: `POST /api/detect/`
- Accepts `{ "text": "..." }`, returns `{ "label": "...", "confidence": ... }`
- Deployed on [Render](https://render.com)

### Frontend (React)
- Built with React + React Bootstrap
- Calls the Django API and displays results in a live detection feed
- Includes an About / Research page with literature review and Colab training code
- Deployed on [Netlify](https://netlify.com)

---

## Repository Structure

```
cyberbullying-detection/
├── cyberbully-backend/        # Django REST API
│   ├── detector/              # App with SVM detection logic
│   │   ├── views.py           # /api/detect/ endpoint
│   │   ├── svm_model.pkl      # Trained SVM model
│   │   └── tfidf_vectorizer.pkl
│   ├── requirements.txt
│   └── manage.py
│
└── cyberbully-frontend/       # React app
    ├── src/
    │   ├── MainApp.js         # Main detection interface
    │   ├── About.js           # Research & literature review page
    │   └── App.js             # Router setup
    └── package.json
```

---

## Running Locally

### Backend
```bash
cd cyberbully-backend
pip install -r requirements.txt
python manage.py runserver
```
API will be available at `http://localhost:8000/api/detect/`

### Frontend
```bash
cd cyberbully-frontend
npm install
npm start
```
App will open at `http://localhost:3000`

---

## Model Limitations

SVM with TF-IDF recognises individual words but does not understand full sentence context, tone, or sarcasm. For example, *"Nobody wants you here, just disappear"* may be classified as safe because no single word triggers the model. This is a known limitation of traditional ML — deep learning models (BERT, RoBERTa) handle contextual meaning better.

---

## Tech Stack

| Layer | Technology |
|---|---|
| ML Training | Python, scikit-learn, NLTK, Google Colab |
| Backend | Django, Django REST Framework |
| Frontend | React, React Bootstrap, React Router |
| Deployment | Render (backend), Netlify (frontend) |

---

## Researcher

- **Name:** Nazmul Hasan
- **Student ID:** A00335985
- **Programme:** MSc Software Engineering
- **Institution:** TUS Athlone, Ireland
- **Supervisor:** Robert Stewart
- **Academic Year:** 2025/2026
