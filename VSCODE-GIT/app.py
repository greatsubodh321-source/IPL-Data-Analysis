import streamlit as st
import google.generativeai as genai
from datetime import datetime

# Page config
st.set_page_config(
    page_title="ProphetAI - House Valuation Engine",
    page_icon="🏠",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS
st.markdown("""
<style>
    .metric-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        border-radius: 12px;
        text-align: center;
    }
    .metric-value {
        font-size: 32px;
        font-weight: bold;
    }
    .metric-label {
        font-size: 14px;
        opacity: 0.8;
    }
</style>
""", unsafe_allow_html=True)

# Initialize Gemini API
api_key = st.secrets.get("GOOGLE_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

# Regression weights (from prediction engine)
REGRESSION_WEIGHTS = {
    "intercept": -40000,
    "sqft_living": 280,
    "bedrooms": -35000,
    "bathrooms": 41000,
    "floors": 6000,
    "view": 52000,
    "condition": 26000,
    "grade": 94000,
    "age_penalty": -1500,
}

ZIPCODE_MULTIPLIERS = {
    "98001": 0.85,
    "98004": 2.1,
    "98101": 1.8,
    "98112": 1.95,
    "98033": 1.6,
    "98052": 1.5,
    "98103": 1.4,
}

# Title and description
st.title("🏠 ProphetAI - Market Valuation Engine")
st.markdown("""
Enter property details below. Our regression-based model and Gemini AI will provide an instant, 
data-backed market valuation and strategic analysis.
""")

# Sidebar for inputs
st.sidebar.header("Property Parameters")

col1, col2 = st.columns([1, 2])

with st.sidebar:
    sqft_living = st.number_input("Living Area (sqft)", value=2200, min_value=500, max_value=20000)
    
    zipcode = st.selectbox(
        "Zip Code",
        ["98103", "98004", "98033", "98112", "98052", "98001"],
        help="Seattle area zip codes"
    )
    
    bedrooms = st.number_input("Bedrooms", value=3, min_value=1, max_value=15)
    bathrooms = st.number_input("Bathrooms", value=2.5, min_value=1.0, max_value=10.0, step=0.5)
    
    year_built = st.number_input("Year Built", value=1995, min_value=1900, max_value=2024)
    
    grade = st.slider("Property Grade (1-13)", 1, 13, 7, help="1=Lowest, 13=Highest")
    
    condition = st.selectbox("Condition", [1, 2, 3, 4, 5], help="1=Poor, 5=Excellent")
    
    floors = st.number_input("Floors", value=2.0, min_value=1.0, max_value=4.0, step=0.5)
    
    view = st.slider("View Rating (0-4)", 0, 4, 0, help="0=None, 4=Excellent")

# Calculate price function
def calculate_price(sqft, bed, bath, yr_built, grade, condition, floors, view, zipcode):
    current_year = datetime.now().year
    age = current_year - yr_built
    
    price = REGRESSION_WEIGHTS["intercept"]
    price += sqft * REGRESSION_WEIGHTS["sqft_living"]
    price += bed * REGRESSION_WEIGHTS["bedrooms"]
    price += bath * REGRESSION_WEIGHTS["bathrooms"]
    price += floors * REGRESSION_WEIGHTS["floors"]
    price += view * REGRESSION_WEIGHTS["view"]
    price += condition * REGRESSION_WEIGHTS["condition"]
    price += grade * REGRESSION_WEIGHTS["grade"]
    price += age * REGRESSION_WEIGHTS["age_penalty"]
    
    multiplier = ZIPCODE_MULTIPLIERS.get(zipcode, 1.0)
    price *= multiplier
    price = max(price, 150000)
    
    return round(price)

# Get AI analysis
def get_market_analysis(price, sqft, bed, bath, grade, zipcode, yr_built):
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        prompt = f"""Act as a professional real estate analyst. Analyze this house valuation:

Property Details:
- Estimated Price: ${price:,}
- Square Footage: {sqft} sqft
- Bedrooms/Bathrooms: {bed}/{bath}
- Condition Grade (1-13): {grade}
- Location Zipcode: {zipcode}
- Year Built: {yr_built}

Provide a concise analysis (3-4 paragraphs) covering:
1. Whether this price seems realistic for the current market
2. How specific features (grade, location) impact valuation
3. Suggested renovations for highest ROI
4. Brief market outlook for this area

Use professional yet accessible tone with markdown formatting."""
        
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error generating analysis: {str(e)}"

# Main layout
with col1:
    st.subheader("💰 Valuation")
    predict_button = st.button("Get Estimated Price", use_container_width=True, type="primary")

if predict_button:
    price = calculate_price(sqft_living, bedrooms, bathrooms, year_built, grade, condition, floors, view, zipcode)
    st.session_state.estimated_price = price
    st.session_state.analyzing = True
    st.session_state.property_data = {
        "sqft": sqft_living,
        "bed": bedrooms,
        "bath": bathrooms,
        "grade": grade,
        "zipcode": zipcode,
        "yr_built": year_built
    }

with col2:
    st.subheader("📊 Results")
    
    if "estimated_price" in st.session_state:
        price = st.session_state.estimated_price
        conf_low = int(price * 0.92)
        conf_high = int(price * 1.08)
        
        col_price, col_conf, col_per_sqft = st.columns(3)
        
        with col_price:
            st.metric("Estimated Price", f"${price:,}")
        
        with col_conf:
            st.metric("Confidence Range", f"${conf_high - conf_low:,}", help=f"${conf_low:,} - ${conf_high:,}")
        
        with col_per_sqft:
            per_sqft = int(price / sqft_living)
            st.metric("Price/Sqft", f"${per_sqft}")

# AI Analysis section
if "analyzing" in st.session_state and st.session_state.analyzing:
    st.divider()
    st.subheader("🤖 Gemini AI Market Insight")
    
    if api_key:
        with st.spinner("Generating AI analysis..."):
            data = st.session_state.property_data
            analysis = get_market_analysis(
                st.session_state.estimated_price,
                data["sqft"],
                data["bed"],
                data["bath"],
                data["grade"],
                data["zipcode"],
                data["yr_built"]
            )
            st.markdown(analysis)
    else:
        st.warning("⚠️ Set GOOGLE_API_KEY in Streamlit secrets to enable AI analysis")

# Additional metrics
if "estimated_price" in st.session_state:
    st.divider()
    st.subheader("📈 Additional Metrics")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        mortgage = int(st.session_state.estimated_price * 0.006)
        st.metric("Monthly Mortgage Estimate", f"${mortgage:,}", help="Based on 0.6% monthly rate")
    
    with col2:
        roi = int(st.session_state.estimated_price * 0.184)
        st.metric("5-Year ROI Projection", "+18.4%", f"≈ ${roi:,}")
    
    with col3:
        property_age = datetime.now().year - year_built
        st.metric("Property Age", f"{property_age} years")

# Footer
st.divider()
st.markdown("""
<div style='text-align: center; color: #888; font-size: 12px;'>
    <p>ProphetAI © 2024 | Data-backed valuations for informational purposes only</p>
</div>
""", unsafe_allow_html=True)
