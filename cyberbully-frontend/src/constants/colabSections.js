export const COLAB_SECTIONS = [
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