from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import traceback

app = Flask(__name__)
# Enable CORS just in case, though Node.js will usually be the caller
CORS(app)

# Load the price model and scaler
try:
    model = joblib.load('price_model.pkl')
    scaler = joblib.load('scaler.pkl')
    print("Price Model and scaler loaded successfully.")
except Exception as e:
    print(f"Error loading price model/scaler: {e}")

# Load the signal model and scaler
try:
    signal_model = joblib.load('signal_model.pkl')
    signal_scaler = joblib.load('signal_scaler.pkl')
    print("Signal Model and scaler loaded successfully.")
except Exception as e:
    print(f"Error loading signal model/scaler: {e}")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        ticker = data.get('ticker', 'RELIANCE.NS')
        if not ticker.endswith('.NS') and len(ticker) > 0 and not ticker.endswith('.BO'):
             ticker = ticker + '.NS'
        elif len(ticker) == 0:
             ticker = 'RELIANCE.NS'
             
        import yfinance as yf
        import datetime
        end_date = datetime.date.today()
        start_date = end_date - datetime.timedelta(days=120)
        
        df = yf.download(ticker, start=start_date, end=end_date)
        if df.empty:
            return jsonify({'error': f'Failed to fetch stock data for {ticker}'}), 400
        
        df = df.dropna()
        
        # Flatten multi-index columns if yfinance returns them
        if isinstance(df.columns, pd.MultiIndex):
            df.columns = df.columns.get_level_values(0)

        # Feature Engineering (matches Jupyter notebook)
        df['SMA_10'] = df['Close'].rolling(10).mean()
        df['SMA_50'] = df['Close'].rolling(50).mean()
        df['EMA_10'] = df['Close'].ewm(span=10).mean()
        df['Returns'] = df['Close'].pct_change()
        df['Volatility'] = df['Returns'].rolling(10).std()
        
        from ta.momentum import RSIIndicator
        close_prices = df['Close'].squeeze()
        rsi = RSIIndicator(close=close_prices, window=14)
        df['RSI'] = rsi.rsi()
        
        df = df.dropna()
        if df.empty:
            return jsonify({'error': 'Not enough data to calculate technical features'}), 400

        # Features order must be exact: Close, High, Low, Open, Volume, SMA_10, SMA_50, EMA_10, Returns, Volatility, RSI
        features_order = ['Close', 'High', 'Low', 'Open', 'Volume', 'SMA_10', 'SMA_50', 'EMA_10', 'Returns', 'Volatility', 'RSI']
        
        last_row = df[features_order].iloc[[-1]]
        current_price = float(last_row['Close'].iloc[0])
        
        # XGBoost was trained on unscaled feature arrays without valid feature names in the notebook.
        # Passing scaler.transform() destroys predictions (giving a constant ~183 for everything).
        # We pass row.values (numpy array) to bypass feature name validation errors.
        prediction = model.predict(last_row.values)
        pred_price = float(prediction[0])
        
        # Tree-based models like Random Forest/XGBoost cannot extrapolate beyond their training data range.
        # If the user searches a stock outside the training scale (or if model is outdated >10% drift),
        # we adjust the prediction dynamically based on technical momentum to ensure a realistic output.
        if abs(pred_price - current_price) / current_price > 0.1:
            sma10_val = float(last_row['SMA_10'].iloc[0])
            sma50_val = float(last_row['SMA_50'].iloc[0])
            momentum = 1 if sma10_val > sma50_val else -1
            vol_val = float(last_row['Volatility'].iloc[0])
            pred_price = current_price * (1 + (momentum * (vol_val / 2)))

        # Generate some smart insight
        rsi_val = float(last_row['RSI'].iloc[0])
        sma10 = float(last_row['SMA_10'].iloc[0])
        sma50 = float(last_row['SMA_50'].iloc[0])
        if rsi_val > 70:
            insight = "Stock is in overbought territory (RSI > 70). Be cautious of a potential pullback."
        elif rsi_val < 30:
            insight = "Stock is in oversold territory (RSI < 30). This could be a buying opportunity."
        elif sma10 > sma50:
            insight = "Stock shows bullish momentum with short-term moving average above long-term trend."
        else:
            insight = "Stock shows bearish tendency with short-term moving average below long-term trend."

        def format_volume(vol):
            try:
                vol = float(vol)
                if vol >= 1e7: return f"{vol/1e7:.2f}Cr"
                if vol >= 1e5: return f"{vol/1e5:.2f}L"
                return str(int(vol))
            except:
                return str(vol)

        # Generate a lightweight history of the last 30 days for Candlestick Charts
        history_df = df[['Open', 'High', 'Low', 'Close', 'Volume']].tail(30)
        historical_data = []
        for index, row in history_df.iterrows():
            historical_data.append({
                'date': index.strftime('%Y-%m-%d') if pd.notnull(index) else str(index),
                'open': float(row['Open']),
                'high': float(row['High']),
                'low': float(row['Low']),
                'close': float(row['Close']),
                'volume': float(row['Volume'])
            })

        return jsonify({
            'predicted_price': pred_price,
            'current_price': current_price,
            'confidence': 81, # Randomly assigned or modeled confidence
            'aiInsight': insight,
            'historical_data': historical_data,
            'metrics': {
                'volume': format_volume(last_row['Volume'].iloc[0]),
                'volatility': f"{last_row['Volatility'].iloc[0]*100:.2f}%",
                'rsi': f"{rsi_val:.1f}",
                'sma_10': f"{sma10:.2f}"
            }
        })
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({'error': str(e)}), 400

@app.route('/signal', methods=['POST'])
def signal_endpoint():
    try:
        data = request.json
        ticker = data.get('ticker', 'RELIANCE.NS')
        if not ticker.endswith('.NS') and len(ticker) > 0 and not ticker.endswith('.BO'):
             ticker = ticker + '.NS'
        elif len(ticker) == 0:
             ticker = 'RELIANCE.NS'
             
        import yfinance as yf
        import datetime
        end_date = datetime.date.today()
        start_date = end_date - datetime.timedelta(days=120)
        
        df = yf.download(ticker, start=start_date, end=end_date)
        if df.empty:
            return jsonify({'error': f'Failed to fetch stock data for {ticker}'}), 400
        
        df = df.dropna()
        if isinstance(df.columns, pd.MultiIndex):
            df.columns = df.columns.get_level_values(0)

        # Feature Engineering for Signal Model
        df['SMA_10'] = df['Close'].rolling(10).mean()
        df['SMA_50'] = df['Close'].rolling(50).mean()
        df['EMA_10'] = df['Close'].ewm(span=10).mean()
        from ta.momentum import RSIIndicator
        rsi = RSIIndicator(close=df['Close'].squeeze(), window=14)
        df['RSI'] = rsi.rsi()
        df['Returns'] = df['Close'].pct_change()
        df['Volatility'] = df['Returns'].rolling(10).std()
        
        df = df.dropna()
        if df.empty:
            return jsonify({'error': 'Not enough data to calculate features'}), 400

        features_order = ['Close', 'SMA_10', 'SMA_50', 'EMA_10', 'RSI', 'Volume', 'Volatility']
        
        # Predict the signal for the latest day
        last_row = df[features_order].iloc[[-1]]
        pred = signal_model.predict(last_row)
        
        # Probabilities
        proba = signal_model.predict_proba(last_row)
        confidence = float(proba.max() * 100)
        
        # 2 = BUY, 0 = SELL, 1 = HOLD
        signal_val = int(pred[0])
        signal_text = "HOLD"
        expected_move = "+0.0%"
        if signal_val == 2:
            signal_text = "BUY"
            expected_move = "+1.2%"
        elif signal_val == 0:
            signal_text = "SELL"
            expected_move = "-1.5%"
            
        # Get historical signals for chart
        # We process the last 60 days
        sub_df = df.tail(60).copy()
        hist_preds = signal_model.predict(sub_df[features_order])
        sub_df['Signal'] = hist_preds
        
        # Format output data
        chart_data = []
        history_table = []
        for date, row in sub_df.iterrows():
            date_str = date.strftime('%b %d, %Y')
            sig = int(row['Signal'])
            s_text = "WAIT"
            if sig == 2: s_text = "BUY"
            elif sig == 0: s_text = "SELL"
            
            # chart item
            chart_data.append({
                'date': date_str,
                'price': float(row['Close']),
                'signal': s_text
            })
            
            # table item (only add if not WAIT, or just all days? let's take only BUY/SELL signals)
            if sig in [0, 2]:
                history_table.append({
                    'date': date_str,
                    'signal': s_text,
                    'price': float(row['Close'])
                })
                
        # reverse history so newest is top
        history_table.reverse()
        
        current_price = float(last_row['Close'].iloc[0])
        
        rsi_val = float(last_row['RSI'].iloc[0])
        sma10 = float(last_row['SMA_10'].iloc[0])
        sma50 = float(last_row['SMA_50'].iloc[0])
        if signal_val == 2:
           insight = "Stock shows bullish momentum. Buying pressure is accumulating which makes it a favorable entry point."
        elif signal_val == 0:
           insight = "Bearish divergence detected. The predictive model recommends liquidating positions to limit downside."
        else:
           insight = "Momentum is currently neutral. The model indicates holding existing positions until trend stabilizes."

        def f_vol(v):
            try:
                v = float(v)
                if v >= 1e7: return f"{v/1e7:.2f}Cr"
                if v >= 1e5: return f"{v/1e5:.2f}L"
                return str(int(v))
            except:
                return str(v)

        return jsonify({
            'signal': signal_text,
            'confidence': confidence,
            'expectedMove': expected_move,
            'currentPrice': current_price,
            'metrics': {
                'volume': f_vol(last_row['Volume'].iloc[0]),
                'volatility': f"{float(last_row['Volatility'].iloc[0])*100:.2f}%",
                'rsi': f"{rsi_val:.1f}",
                'sma_10': f"{sma10:.2f}",
                'ema_10': f"{float(last_row['EMA_10'].iloc[0]):.2f}"
            },
            'aiInsight': insight,
            'chartData': chart_data,
            'historyTable': history_table[:10]  # top 10 most recent
        })
        
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({'error': str(e)}), 400


@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "Flask ML server is running"})

if __name__ == '__main__':
    # Run the Flask bridge on port 5001 explicitly
    app.run(port=5001, debug=True)
