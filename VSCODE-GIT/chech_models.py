import google.generativeai as genai
import streamlit as st

# Use the secret you set up earlier
genai.configure(api_key=st.secrets["GOOGLE_API_KEY"])

try:
    print("Available models:")
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"- {m.name}")
except Exception as e:
    print(f"Error connecting to Google AI: {e}")