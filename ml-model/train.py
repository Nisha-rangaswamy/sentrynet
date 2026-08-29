import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

print("Loading SentryNet NSL-KDD backup dataset for final training...")

# 1. Load the local backup CSV dataset
df = pd.read_csv('ml-model/nsl_kdd_backup.csv')

# 2. Select features and convert text columns into numerical form
features = ['duration', 'protocol_type', 'src_bytes', 'dst_bytes']
X = pd.get_dummies(df[features])
y = (df['label'] > 0).astype(int)

# 3. Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Train the Random Forest Classifier
print("Training Random Forest Classifier...")
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# 5. Evaluate
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy * 100:.2f}%")

# 6. Save the trained model to your ml-model folder
model_path = 'ml-model/sentrynet_model.pkl'
joblib.dump(model, model_path)
print(f"Model successfully saved to: {model_path}")