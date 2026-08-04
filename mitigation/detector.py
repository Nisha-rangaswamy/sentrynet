import os
import sys

MODEL_PATH="../ml-model/sentrynet_model.pkl"

def load_model():
	try:
		import joblib
		model=joblib.load(MODEL_PATH)
		print("ML model loaded successfully.")
		return model
	except FileNotFoundError:
		print("Error loading ML model",e)
		return None

def detect_attack(model,features):
	try:
		prediction=model.predict(features)
		result=prediction[0]
		if result==1:
			return "ATTACK"
		return "NORMAL"
	except Exception as e:
		print("Prediction error:",e)
		return "ERROR"

if __name__="__main__":
	model=load_model()
	if model is not None:
		print("Detector is ready.")
