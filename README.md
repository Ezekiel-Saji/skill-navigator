🎓 AI-Driven Campus Skill Intelligence Platform
Predictive Trends • Explainable Insights • Career Readiness Index
📌 Overview

The AI-Driven Campus Skill Intelligence Platform is an intelligent career guidance and skill analytics system designed to bridge the gap between academic learning and rapidly evolving industry requirements. The platform leverages Artificial Intelligence, Machine Learning, and NLP techniques to extract and validate student skills, forecast future industry demands, and provide personalized, explainable learning pathways.

Unlike traditional career tools that rely on self-declared skills, this platform introduces a Project-to-Skill Evaluation Engine to objectively assess competencies from real project artifacts. It also supports early-stage students through a foundational career intelligence layer that generates structured roadmaps based on interests and career intent.

At the core of the system is a Career Readiness Index (CRI) — a quantitative metric that measures and predicts a student’s preparedness for specific industry roles.

🎯 Problem Statement

Academic institutions and students face increasing difficulty in aligning skill development with emerging industry needs. Students often follow unstructured learning paths, depend on unverified skill claims, and lack visibility into future workforce trends. Institutions, meanwhile, lack predictive and explainable systems to assess readiness and proactively guide career development.

💡 Proposed Solution

This platform provides an end-to-end, AI-powered solution that:

Extracts and validates student skills using NLP and project analysis

Predicts emerging industry skill trends using machine learning

Identifies personalized skill gaps based on career goals

Generates explainable recommendations for learning and mentorship

Quantifies progress using a Career Readiness Index

Simulates outcome improvement if prescribed roadmaps are followed

🧠 Key Features

AI-Driven Campus Skill Intelligence Engine

NLP-Based Skill Extraction from CVs, certifications, and academic data

Project-to-Skill Evaluation Engine (GitHub and report analysis)

Predictive Industry Trend Analysis

Explainable AI Layer (“Why this skill?” insights)

Career Readiness Index (CRI)

Foundational Mode for First-Year Students

Actionable Learning Pathways mapped to MOOCs, SWAYAM electives, workshops, certifications, and alumni mentorship

Predictive Outcome Roadmap (Before → After simulation)

🏗️ System Architecture
Frontend (React / Next.js)
        |
Backend API (FastAPI / Flask)
        |
-------------------------------------------------
| NLP Engine | Trend Engine | Skill Gap Engine |
| Project Evaluator | CRI Engine | XAI Layer   |
-------------------------------------------------
        |
     Databases
 (Student profiles, skills, courses, industry data)

⚙️ Tech Stack (Suggested)

Frontend: React / Next.js, Tailwind CSS
Backend: FastAPI / Flask, REST APIs
AI/ML: spaCy, HuggingFace Transformers, Scikit-learn, Pandas
Data: Kaggle job datasets, curated skill taxonomy, course datasets
Visualization: Chart.js / Recharts
Database: PostgreSQL / MongoDB

🔄 Workflow

Student uploads CV / GitHub or selects First-Year Mode

NLP engine extracts skills

Project evaluator validates competencies

Trend engine predicts future industry demands

Skill gap analysis is performed

Career Readiness Index is computed

Explainable insights are generated

Personalized roadmap and predicted outcomes are shown

📊 Career Readiness Index (CRI)

The CRI is a composite metric derived from:

Verified skill coverage

Industry trend alignment

Project evidence strength

Assessment performance

It provides both current readiness and predicted improvement if the learning roadmap is followed.

🚀 Getting Started

for a live demo : https://drive.google.com/file/d/1UiIUHLkraau3dnnWyY1AIlAuaXtRg-KW/view?usp=sharing
Prerequisites

Python 3.10+

Node.js 18+

Git

Installation
git clone https://github.com/your-username/campus-skill-intelligence.git
cd campus-skill-intelligence


Backend:

cd backend
pip install -r requirements.txt
uvicorn main:app --reload


Frontend:

cd frontend
npm install
npm run dev

🧪 Demo Capabilities

Live skill extraction from CV

Industry trend visualization

Skill gap heatmap

Career Readiness Index generation

Explainable recommendations

Predictive roadmap view

🛣️ Roadmap

Real-time job scraping

Alumni mentorship system

Advanced explainability (SHAP integration)

Adaptive assessments

Faculty analytics dashboard

🤝 Contributing

Contributions are welcome. Please open an issue to discuss major changes before submitting a pull request.

📜 License

This project is licensed under the MIT License.

🏁 Impact Statement

This platform transforms static career guidance into a predictive, explainable, and outcome-oriented intelligence system, enabling students to make informed learning decisions and institutions to proactively align education with future industry demands.
