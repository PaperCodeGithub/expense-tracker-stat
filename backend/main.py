import os
import json
import numpy as np
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from sklearn.linear_model import LinearRegression
import google.generativeai as genai

google_api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=google_api_key)
gemini_model = genai.GenerativeModel(
    'gemini-2.5-flash',
    generation_config={"response_mime_type": "application/json"}
)

app = FastAPI(title="Expense Tracker AI Insights")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Transaction(BaseModel):
    id: int
    name: str
    time: str
    amount: float
    category: Optional[str] = "Other"

class PredictionRequest(BaseModel):
    transactions: List[Transaction]

class PredictionResponse(BaseModel):
    predicted_savings: float
    confidence_score: float
    advisory_notes: List[str]

@app.post("/api/predict", response_model=PredictionResponse)
async def predict_insights(request: PredictionRequest):
    transactions = request.transactions

    if len(transactions) < 3:
        return PredictionResponse(
            predicted_savings=0.0,
            confidence_score=0.0,
            advisory_notes=["Insufficient data to run neural projections. Add more transactions."]
        )

    transactions.sort(key=lambda x: x.id)
    cumulative_savings = 0
    y_values = []
    x_values = []
    
    category_totals = {}
    total_income = 0
    total_expense = 0

    for idx, tx in enumerate(transactions):
        cumulative_savings += tx.amount
        y_values.append(cumulative_savings)
        x_values.append([idx])
        
        if tx.amount > 0:
            total_income += tx.amount
        else:
            total_expense += abs(tx.amount)
            category_totals[tx.category] = category_totals.get(tx.category, 0) + abs(tx.amount)

    X = np.array(x_values)
    y = np.array(y_values)
    math_model = LinearRegression()
    math_model.fit(X, y)

    future_steps = len(transactions) + 10
    prediction = math_model.predict([[future_steps]])[0]
    r_squared = math_model.score(X, y)
    confidence = max(0.0, min(r_squared * 100, 99.9))
    slope = math_model.coef_[0]

    prompt = f"""
    You are an elite, highly analytical AI financial advisor embedded in a cyberpunk-themed expense tracker.
    
    User Context:
    - Total Income tracked: ₹{total_income}
    - Total Expenses tracked: ₹{total_expense}
    - Expense Breakdown: {json.dumps(category_totals)}
    - Mathematical Spending Trajectory (Slope): {slope} (Positive means saving, negative means bleeding cash)
    - 30-day Projected Balance: ₹{round(prediction, 2)}
    
    Task: 
    Generate exactly 3 short, actionable, and highly specific financial advisory notes. 
    Keep the tone clinical, sharp, and slightly futuristic. Max 2 sentences per note. 
    Do not use markdown formatting.
    
    Return ONLY a valid JSON array of 3 strings. Example: ["Note 1", "Note 2", "Note 3"]
    """

    try:
        response = gemini_model.generate_content(prompt)
        advisory_notes = json.loads(response.text)
    except Exception as e:
        print(f"LLM Error: {e}")
        advisory_notes = [
            "Neural link degraded. Unable to fetch advanced diagnostics.",
            f"Baseline trajectory slope sits at {round(slope, 2)}.",
            "Maintain manual oversight of your liquidity."
        ]

    return PredictionResponse(
        predicted_savings=round(prediction, 2),
        confidence_score=round(confidence, 1),
        advisory_notes=advisory_notes
    )

@app.get("/")
def read_root():
    return {"status": "Insights Backend is running"}