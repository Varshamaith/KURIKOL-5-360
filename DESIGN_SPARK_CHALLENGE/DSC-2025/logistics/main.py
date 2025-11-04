from flask import Flask, request, jsonify
from math import radians, sin, cos, sqrt, atan2
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Coordinates for Madurai and Chennai
MADURAI_COORDS = (9.9252, 78.1198)
CHENNAI_COORDS = (13.0827, 80.2707)

def haversine_distance(coord1, coord2):
    """Calculate great-circle distance using the Haversine formula"""
    R = 6371  # Earth's radius in km
    lat1, lon1 = map(radians, coord1)
    lat2, lon2 = map(radians, coord2)

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c

@app.route('/calculate-distance', methods=['POST'])
def calculate_distance():
    data = request.json
    city1 = data.get("city1", "").strip().lower()
    city2 = data.get("city2", "").strip().lower()

    if {city1, city2} == {"madurai", "chennai"}:
        distance = haversine_distance(MADURAI_COORDS, CHENNAI_COORDS)
        return jsonify({"distance": round(distance, 2)})
    else:
        return jsonify({"error": "Only Madurai and Chennai are allowed!"}), 400

if __name__ == '__main__':
    app.run(debug=True)
