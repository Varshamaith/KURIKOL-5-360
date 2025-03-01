import joblib
import pandas as pd

# Load the saved model
model = joblib.load('house_price_predictor.pkl')

# Define new house features
new_data = pd.DataFrame({
    'area': [2000],
    'bedrooms': [4],
    'bathrooms': [3],
    'stories': [2],
    'mainroad': [1], 
    'guestroom': [1], 
    'basement': [0], 
    'hotwaterheating': [1], 
    'airconditioning': [1], 
    'parking': [2], 
    'prefarea': [1]  
})

# Predict house price
predicted_price = model.predict(new_data)

# Display result
print(f"The predicted price for the house is: ${predicted_price[0]:,.2f}")
