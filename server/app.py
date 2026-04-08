from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import yfinance as yf
import datetime
import traceback

app = Flask(__name__)
CORS(app)

# Models
price_model = None
scaler = None
updown_model = None


# =========================
# LOAD MODELS
# =========================
def load_models():
    global price_model, scaler, updown_model
    import os
    base_path = os.path.dirname(os.path.abspath(__file__))

    # Load UP/DOWN model (lives in updown/ subfolder)
    try:
        updown_path = os.path.join(base_path, 'updown', 'up_down_model.pkl')
        updown_model = joblib.load(updown_path)
        print("UPDOWN model loaded ✅")
    except Exception as e:
        print("UPDOWN model not loaded:", e)

    # Load price model (lives in server root)
    try:
        price_model = joblib.load(os.path.join(base_path, 'price_model.pkl'))
        scaler = joblib.load(os.path.join(base_path, 'scaler.pkl'))
        print("Price model loaded ✅")
    except Exception as e:
        print("Price model not loaded:", e)


load_models()


# =========================
# COMMON FEATURE ENGINEERING
# =========================
def prepare_features(df):
    df = df.dropna()

    if isinstance(df.columns, pd.MultiIndex):
        df.columns = df.columns.get_level_values(0)

    # Same features as training
    df['Returns'] = df['Close'].pct_change()
    df['SMA_10'] = df['Close'].rolling(10).mean()
    df['SMA_50'] = df['Close'].rolling(50).mean()
    df['EMA_10'] = df['Close'].ewm(span=10, adjust=False).mean()
    df['Volatility'] = df['Returns'].rolling(10).std()

    # RSI (14-day)
    delta = df['Close'].diff()
    gain = delta.where(delta > 0, 0).rolling(14).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(14).mean()
    rs = gain / loss
    df['RSI'] = 100 - (100 / (1 + rs))

    df = df.dropna()

    return df


# =========================
# UP/DOWN PREDICTION
# =========================
@app.route('/predict/updown', methods=['POST'])
def predict_updown():
    try:
        if updown_model is None:
            return jsonify({'error': 'UPDOWN model not loaded'}), 500

        data = request.json
        ticker = data.get('ticker', 'RELIANCE.NS')

        # Ensure NSE format
        if not ticker.endswith('.NS') and not ticker.endswith('.BO'):
            ticker = ticker + '.NS'

        # Fetch data
        end_date = datetime.date.today()
        start_date = end_date - datetime.timedelta(days=120)

        df = yf.download(ticker, start=start_date, end=end_date)

        if df.empty:
            return jsonify({'error': 'Stock data not found'}), 400

        df = prepare_features(df)

        if df.empty:
            return jsonify({'error': 'Not enough data'}), 400

        last = df.iloc[-1]

        features = [[
            last['Open'],
            last['High'],
            last['Low'],
            last['Close'],
            last['Volume'],
            last['Returns'],
            last['SMA_10'],
            last['SMA_50'],
            last['Volatility']
        ]]

        pred = updown_model.predict(features)[0]
        proba = updown_model.predict_proba(features)[0]

        return jsonify({
            "prediction": "UP" if pred == 1 else "DOWN",
            "confidence": float(max(proba)),
            "current_price": float(last['Close'])
        })

    except Exception as e:
        print(traceback.format_exc())
        return jsonify({'error': str(e)}), 400


# =========================
# PRICE PREDICTION (OPTIONAL)
# =========================
@app.route('/predict/price', methods=['POST'])
def predict_price():
    try:
        if price_model is None:
            return jsonify({'error': 'Price model not available'}), 500

        data = request.json
        ticker = data.get('ticker', 'RELIANCE.NS')

        if not ticker.endswith('.NS') and not ticker.endswith('.BO'):
            ticker = ticker + '.NS'

        end_date = datetime.date.today()
        start_date = end_date - datetime.timedelta(days=120)

        df = yf.download(ticker, start=start_date, end=end_date)

        if df.empty:
            return jsonify({'error': 'Stock data not found'}), 400

        df = prepare_features(df)

        if df.empty:
            return jsonify({'error': 'Not enough data'}), 400

        last = df.iloc[[-1]]

        feature_cols = [
            'Close', 'High', 'Low', 'Open', 'Volume',
            'SMA_10', 'SMA_50', 'EMA_10', 'Returns',
            'Volatility', 'RSI'
        ]

        # Safe fallback if missing features
        for col in feature_cols:
            if col not in last.columns:
                last[col] = 0

        X = last[feature_cols].values
        predicted = price_model.predict(X)

        current_price = float(last['Close'].values[0])
        predicted_price = float(predicted[0])
        change_pct = ((predicted_price - current_price) / current_price) * 100

        volume = int(last['Volume'].values[0])
        volatility = round(float(last['Volatility'].values[0]) * 100, 2)
        rsi_val = round(float(last['RSI'].values[0]), 2) if 'RSI' in df.columns and last['RSI'].values[0] != 0 else 50.0
        sma_10 = round(float(last['SMA_10'].values[0]), 2)

        direction = "upward" if predicted_price > current_price else "downward"
        insight = f"AI model predicts a {direction} movement of {abs(change_pct):.2f}% for the next trading session based on technical indicators and recent price action."

        return jsonify({
            "current_price": current_price,
            "predicted_price": predicted_price,
            "confidence": min(95, max(55, round(100 - abs(change_pct) * 5, 1))),
            "aiInsight": insight,
            "metrics": {
                "volume": f"{volume:,}",
                "volatility": f"{volatility}%",
                "rsi": rsi_val,
                "sma_10": sma_10
            }
        })

    except Exception as e:
        print(traceback.format_exc())
        return jsonify({'error': str(e)}), 400


# =========================
# HEALTH CHECK
# =========================
@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "Flask ML server running"})


# =========================
# RUN SERVER
# =========================
if __name__ == "__main__":
    app.run(port=5001, debug=True)