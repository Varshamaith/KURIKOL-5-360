import joblib
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

# Example dataset
data = pd.DataFrame({
    'area': [1500, 1800, 2100, 2500, 3000],
    'bedrooms': [3, 4, 3, 5, 4],
    'bathrooms': [2, 3, 2, 4, 3],
    'stories': [1, 2, 2, 2, 3],
    'mainroad': [1, 0, 1, 1, 0],
    'guestroom': [0, 1, 1, 0, 1],
    'basement': [1, 0, 0, 1, 0],
    'hotwaterheating': [0, 1, 0, 1, 1],
    'airconditioning': [1, 1, 0, 1, 1],
    'parking': [1, 2, 1, 3, 2],
    'prefarea': [0, 1, 1, 0, 1],
    'price': [300000, 350000, 280000, 500000, 450000]
})

# Features and target
X = data.drop(columns=['price'])
y = data['price']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model_LR = LinearRegression()
model_LR.fit(X_train, y_train)

# Save the trained model
joblib.dump(model_LR, 'house_price_predictor.pkl')

print("Model saved successfully!")
