export const LIT_REVIEW_SECTIONS = [
  {
    heading: "1. Introduction",
    text: "Cyberbullying has become a serious issue with the rapid growth of social media platforms. Unlike traditional bullying, cyberbullying happens through digital communication such as social networking sites, messaging platforms, online games, and forums [5], [10]. Due to anonymity and 24/7 accessibility, victims may experience anxiety, depression, and emotional distress [5], [11].\n\nRecent studies show that cyberbullying is a global concern and affects adolescents and young adults significantly [10], [11]. While many researchers focus on the psychological and social impact of cyberbullying, there is increasing research interest in using machine learning (ML) and deep learning (DL) to automatically detect harmful content [3], [7], [8].\n\nThis literature review aims to explore how cyberbullying is defined, how machine learning techniques are used for detection, and what limitations and research gaps currently exist.",
  },
  {
    heading: "2. Research Questions",
    text: "1. How can machine learning techniques detect anomalous student behavior related to cyberbullying?\n2. How can automated cyberbullying detection systems contribute to mitigation and prevention?\n3. What limitations exist in current ML-based cyberbullying detection approaches?",
  },
  {
    heading: "3. Defining Cyberbullying",
    text: "There is no single universally accepted definition of cyberbullying. Ray et al. [5] highlight that inconsistencies in definitions create challenges in measuring prevalence and impact. Most studies agree that cyberbullying includes core elements such as: Intent to harm, Repetition, Power imbalance, and Emotional or psychological harm.\n\nSultan et al. [10] and Kumar and Bhat [11] categorize cyberbullying into forms such as flaming, harassment, impersonation, denigration, and cyberstalking. These forms may overlap and evolve over time.\n\nRay et al. [5] also emphasizes that cyberbullying may include subtle or indirect aggression, not only explicit hate speech. This makes automated detection more complex because models must detect sarcasm, implicit meaning, and context.",
  },
  {
    heading: "4. Dataset Collection and Challenges",
    text: "Machine learning models depend heavily on quality datasets. Many researchers collect data using APIs, keyword filtering, or web scraping [2], [11].\n\nBerbery et al. [2] collected Twitter data and manually labeled tweets for deep learning classification. However, keyword-based data collection may introduce bias because it captures only predefined terms [11].\n\nCommon challenges include:\n• Class imbalance (more non-bullying than bullying content)\n• Noise in social media text (slang, emojis, abbreviations)\n• Limited multilingual datasets\n• Inconsistent labeling standards\n\nAl-Garadi et al. [8] emphasize that imbalance and noisy data significantly impact model performance.",
  },
  {
    heading: "5. Traditional Machine Learning Approaches",
    text: "Early cyberbullying detection systems used traditional supervised machine learning models such as Naive Bayes, Support Vector Machines (SVM), Logistic Regression, Decision Trees, and Random Forest.\n\nIslam et al. [3] applied SVM and Naive Bayes for detection using TF-IDF and n-gram features. Hani et al. [7] compared SVM and Neural Networks and found neural networks slightly improved performance.\n\nTraditional models are computationally efficient and interpretable. However, they struggle with contextual ambiguity, sarcasm, and indirect bullying expressions [8], [10].",
  },
  {
    heading: "6. Deep Learning and Hybrid Approaches",
    text: "To overcome contextual limitations, researchers adopted deep learning techniques such as CNN, RNN, LSTM / Bi-LSTM, and Transformer-based models (BERT, RoBERTa).\n\nUmer et al. [4] introduced a transformer-based model using PCA-extracted GloVe features combined with RoBERTaNet, improving contextual understanding. Alotaibi and Al-Samawi [1] proposed a hybrid framework combining multiple ML strategies to improve classification robustness.\n\nDeep learning models generally outperform traditional ML models but require large labeled datasets and high computational resources [8], [11].",
  },
  {
    heading: "7. Behavioral and Anomaly-Based Detection",
    text: "Most existing research focuses on text-based classification. However, cyberbullying behavior may also involve patterns such as:\n• Repeated targeting of specific users\n• Sudden increase in aggressive posts\n• Network interaction patterns\n\nAl-Garadi et al. [8] and Kumar and Bhat [11] highlight the importance of predictive and behavioral models rather than only content-based detection.",
  },
  {
    heading: "8. Mitigation and Prevention",
    text: "Detection alone is not sufficient. Some studies propose mitigation strategies such as:\n• Real-time content moderation\n• Automated warning systems\n• Early identification of harmful behavior\n\nBerbery et al. [2] suggested that automated systems can support moderation. Kumar and Bhat [11] emphasize predictive systems to reduce future incidents.\n\nHowever, ethical concerns such as privacy, bias, and false positives must be addressed [5], [11].",
  },
  {
    heading: "9. Research Gaps",
    text: "Based on the reviewed literature, several gaps remain:\n1. Lack of standardized definition and measurement tools [5].\n2. Dataset imbalance and labeling inconsistencies [2], [8].\n3. Over-reliance on English-language datasets [3], [10].\n4. Limited integration of behavioral anomaly detection with NLP models [8], [11].\n5. Limited explainability in deep learning models [4].\n6. Insufficient real-time preventive systems.",
  },
  {
    heading: "10. Conclusion",
    text: "Cyberbullying detection using machine learning has progressed significantly. Traditional ML models provide baseline performance, while deep learning and hybrid frameworks improve contextual understanding.\n\nHowever, challenges remain in dataset quality, definition consistency, scalability, behavioral integration, and ethical concerns.",
  },
];