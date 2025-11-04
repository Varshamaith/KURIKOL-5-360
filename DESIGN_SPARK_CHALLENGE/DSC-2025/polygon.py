import requests
API_KEY = "18a1a35f8b9171c59bc96920860e9b23"


# Define your farm's coordinates (example: a square farm)
polygon_data = {
    "name": "My Farm",
    "geo_json": {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Polygon",
            "coordinates": [[
                [-93.548, 42.025],  # Point 1
                [-93.548, 41.995],  # Point 2
                [-93.518, 41.995],  # Point 3
                [-93.518, 42.025],  # Point 4
                [-93.548, 42.025]   # Closing the polygon
            ]]
        }
    }
}

# Send request to Agro Monitoring API
url = f"https://api.agromonitoring.com/agro/1.0/polygons?appid={API_KEY}"
response = requests.post(url, json=polygon_data)

# Get response
if response.status_code == 200:
    polygon_id = response.json()["id"]
    print(f"Polygon Created! ID: {polygon_id}")
else:
    print("Error:", response.text)
