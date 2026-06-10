# FinTrack

FinTrack is a high-performance, local-first personal finance dashboard. It combines a minimalist, monochromatic interface with intelligent forecasting, utilizing in-browser machine learning for categorization and a Python backend for predictive financial insights.

## Core Features

* **Local-First Data Matrix:** All ledger data is stored and managed securely within the browser's local storage. Your raw financial data never leaves your device unless explicitly exported.
* **In-Browser NLP Categorization:** Utilizes TensorFlow.js to run a custom neural network entirely in the client, automatically predicting transaction categories as you type.
* **Predictive Horizon Engine:** A FastAPI service applies linear regression to your historical spending trajectory, projecting future balances and identifying structural cash flow trends.
* **LLM Advisory Stream:** Integrates with the Google Gemini API to analyze mathematical forecasts and generate real-time, context-aware financial strategies.
* **Architectural UI:** Built with React and GSAP for buttery smooth, state-driven animations, featuring a dynamic 3D background grid powered by Three.js.

## Tech Stack

**Frontend**
* React (via Vite)
* GSAP & @gsap/react (Animation)
* Three.js & @react-three/fiber (Dynamic Background)
* Lucide React (Iconography)

**Backend**
* Python 3
* FastAPI & Uvicorn (REST API)
* Scikit-Learn & NumPy (Predictive Modeling)
* Google Generative AI SDK (Gemini 2.5 Flash)

## Installation & Setup

You will need to run both the frontend development server and the Python backend concurrently for the full feature set.

### Backend Setup (Insights & LLM)

Navigate to the backend directory and set up your Python environment:

```bash
# Install required Python packages
pip install fastapi uvicorn pydantic scikit-learn numpy google-generativeai python-dotenv
```
Create environment file
```bash
touch .env
```
Open the .env file and add your Google Gemini API key:
```bash
GOOGLE_API_KEY=your_api_key_here
```
Start the FastAPI server:
```bash
uvicorn main:app --reload
```
The API will be available at http://localhost:8000.

### Frontend Setup (React App)
Open a new terminal window, navigate to your frontend directory, and install dependencies:
```bash
# Install core dependencies
npm install

# Install UI and 3D packages
npm install gsap @gsap/react lucide-react recharts
npm install three @react-three/fiber @react-three/drei

# Install Machine Learning packages
npm install @tensorflow/tfjs
```
Start the Vite development server:
```bash
npm run dev
```
 ## Application Architecture
FinTrack is designed to bridge the gap between static local apps and cloud-heavy SaaS platforms.
* **State Management:** The React frontend acts as the source of truth, reading and writing to localStorage.
* **Offline Capabilities:** Adding transactions, viewing history, filtering charts, and the TFJS categorization model all function completely offline.
* **Opt-In Cloud Processing:** When a user navigates to the Insights tab, the frontend packages the local matrix and sends it to the FastAPI backend. The backend performs the heavy mathematical regressions and queries the Gemini LLM, returning the processed advisory stream without storing the payload.

* ## Data Management & Security
* Because FinTrack operates on a local-first paradigm, user data is inherently decentralized. The application includes a built-in Configuration panel allowing users to:
* * Export their ledger as a raw JSON matrix for manual backups.
  * Execute a system purge, irreversibly wiping the browser's local storage environment.

## License
This project is open source and available under the MIT License.
