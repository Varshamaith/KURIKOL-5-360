import requests

# Replace with your own API key
API_KEY = "18a1a35f8b9171c59bc96920860e9b23"

# Define your field (Replace with actual field coordinates)
field_data = {
    "name": "My Farm",
    "geo_json": {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Polygon",
            "coordinates": [[
                [-93.548, 42.025],  # Example coordinates (longitude, latitude)
                [-93.548, 41.995],
                [-93.518, 41.995],
                [-93.518, 42.025],
                [-93.548, 42.025]  # Close the polygon
            ]]
        }
    }
}

# Create a field
response = requests.post(
    f"https://api.agromonitoring.com/agro/1.0/polygons?appid={API_KEY}",
    json=field_data
)
field_id=[]
if response.status_code == 200:
    field_id = response.json()["id"]
    print(f"Field ID: {field_id}")
else:
    print(f"Error: {response.text}")
weather_url = f"https://api.agromonitoring.com/agro/1.0/weather?polyid={field_id}&appid={API_KEY}"
weather_response = requests.get(weather_url)

if weather_response.status_code == 200:
    print(weather_response.json())
else:
    print(f"Error fetching weather: {weather_response.text}")

