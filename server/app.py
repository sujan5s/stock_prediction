from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import traceback

app = Flask(__name__)
# Enable CORS just in case, though Node.js will usually be the caller
CORS(app)

# Load the model and scaler
try:
    model = joblib.load('price_model.pkl')
    scaler = joblib.load('scaler.pkl')
    print("Model and scaler loaded successfully.")
except Exception as e:
    print(f"Error loading model/scaler: {e}")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        # Convert incoming JSON data to DataFrame. Expected to be single dict or list of dicts.
        df = pd.DataFrame([data])
        
        # Assuming the standard flow of scaling then predicting:
        df_scaled = scaler.transform(df)
        prediction = model.predict(df_scaled)
        
        return jsonify({
            'prediction': prediction.tolist()
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
