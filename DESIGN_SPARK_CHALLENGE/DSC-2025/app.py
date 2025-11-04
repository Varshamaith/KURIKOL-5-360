from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

API_KEY = "18a1a35f8b9171c59bc96920860e9b23"
POLYGON_ID = "67cca3aae51b4206d4815b2f"

def get_soil_data():
    url = f"http://api.agromonitoring.com/agro/1.0/soil?polyid={POLYGON_ID}&appid={API_KEY}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        soil_temp_celsius = data['t0'] - 273.15  # Convert from Kelvin to Celsius
        return {
            "Soil Temperature": f"{soil_temp_celsius:.2f}°C",
            "Soil Moisture": f"{data['moisture'] * 100:.2f}%"
        }
    else:
        return {"Error": "Failed to fetch soil data"}

@app.route('/chat', methods=['POST'])
def chatbot():
    data = request.get_json()
    user_message = data.get("message", "").lower()

    if "soil" in user_message:
        soil_info = get_soil_data()
        if "Error" in soil_info:
            return jsonify({"reply": soil_info["Error"]})
        else:
            return jsonify({
                "reply": f"🌱 Soil Update:\nTemperature: {soil_info['Soil Temperature']}\nMoisture: {soil_info['Soil Moisture']}"
            })
    else:
        return jsonify({"reply": "I'm here to help with agriculture-related queries! Try asking about soil conditions."})

if __name__ == '__main__':
    app.run(debug=True)
