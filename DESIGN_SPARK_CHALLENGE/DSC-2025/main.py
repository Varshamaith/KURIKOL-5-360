from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import uvicorn

app = FastAPI()  # Initialize FastAPI

# Enable CORS to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific frontend URL if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OpenWeatherMap API details
API_KEY = "bac5db59facf9f3365dec2840cbecff2"  # Replace with your API key
LOCATION = "Chennai"  # City for weather forecast
BASE_URL = "https://api.openweathermap.org/data/2.5/forecast"

@app.get("/weather")
def get_weather():
    params = {
        "q": LOCATION,
        "appid": API_KEY,
        "units": "metric"
    }
    
    print(f"📡 Sending request to: {BASE_URL}")  # Debug: Show API URL
    print(f"🔍 Parameters: {params}")  # Debug: Show query parameters

    try:
        response = requests.get(BASE_URL, params=params)
        response.raise_for_status()  # Raise error for bad responses

        data = response.json()
        print(f"✅ API Response: {data}")  # Debug: Show full API response

        if "list" in data and len(data["list"]) >= 16:
            forecast = data["list"][16]  # Get the 3-day forecast
            weather_desc = forecast["weather"][0]["description"]
            temp = forecast["main"]["temp"]
            
            result = {"forecast": f"{weather_desc}, {temp}°C"}
            print(f"🌤️ Processed Forecast: {result}")  # Debug: Show final output
            
            return result
        else:
            print("⚠️ Error: Incomplete weather data received.")  # Debug: Error case
            return {"error": "Weather data is incomplete."}

    except requests.exceptions.RequestException as e:
        print(f"❌ Error fetching weather data: {e}")  # Debug: Network error
        return {"error": f"Failed to fetch weather data: {str(e)}"}

# Run the FastAPI server with IP logging
if __name__ == "__main__":
    host_ip = "127.0.0.1"
    port = 8000
    print(f"🚀 FastAPI server running at: http://{host_ip}:{port}/weather")
    import os
    os.system(f"uvicorn main:app --host {host_ip} --port {port} --reload")
