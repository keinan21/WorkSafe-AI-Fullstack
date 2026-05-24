import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import os

import warnings
warnings.filterwarnings("ignore", category=UserWarning) # Bungkam warning bawaan streamlit/plotly
warnings.filterwarnings("ignore", category=DeprecationWarning) # Bungkam kode jadul

# PAGE CONFIG
st.set_page_config(
    page_title="AI Automation & Workforce Risk Dashboard",
    layout="wide",
    initial_sidebar_state="expanded"
)

# CUSTOM CSS
st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');

html, body, [class*="css"] {
    font-family: 'Space Grotesk', sans-serif;
}

/* MAIN BACKGROUND */
.stApp {
    background-color: #f1f5f9; /* Menyesuaikan bg-sidebar React */
    color: #000000;
}

/* SIDEBAR BRUTALIST */
[data-testid="stSidebar"] {
    background-color: #ffffff;
    border-right: 4px solid #000000 !important;
}

/* CARD ALAM NEO-BRUTALISME (Kunci Utama) */
.card {
    background: white;
    border: 3px solid #000000 !important;
    border-radius: 0px !important; /* Hilangkan rounded corner */
    padding: 20px;
    box-shadow: 5px 5px 0px #000000 !important; /* Bayangan kotak hitam tajam */
    margin-bottom: 15px;
}

/* KPI TEXT */
.kpi-title {
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #000000;
    margin-bottom: 8px;
}

.kpi-value {
    font-size: 32px;
    font-weight: 900;
    color: #000000;
}

/* SECTION TITLE */
.section-title {
    font-size: 22px;
    font-weight: 900;
    text-transform: uppercase;
    margin-top: 15px;
    margin-bottom: 15px;
    color: #000000;
    border-bottom: 2px dashed #000000;
    padding-bottom: 5px;
}

/* DESCRIPTION */
.desc {
    color: #000000;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.7;
}

/* CONTAINER STREAMLIT (DATAFRAME & METRIC) OVERRIDES */
[data-testid="stDataFrame"], [data-testid="metric-container"], .element-container div.row-widget {
    border: 3px solid #000000 !important;
    border-radius: 0px !important;
    box-shadow: 4px 4px 0px #000000 !important;
    background-color: white !important;
}

/* BRUTALIST DOWNLOAD BUTTON */
.stDownloadButton button {
    background-color: #2563eb !important; /* Warna Utama React Lu */
    color: white !important;
    border-radius: 0px !important;
    border: 3px solid #000000 !important;
    font-weight: bold !important;
    text-transform: uppercase !important;
    box-shadow: 4px 4px 0px #000000 !important;
    transition: transform 0.1s;
}

.stDownloadButton button:hover {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #000000 !important;
}

/* FIX PLOTLY BORDERS */
.js-plotly-plot {
    border: 3px solid #000000 !important;
    box-shadow: 4px 4px 0px #000000 !important;
}

h1, h2, h3, h4, h5, h6 {
    color: #000000 !important;
    font-weight: 900 !important;
    text-transform: uppercase;
}
</style>
""", unsafe_allow_html=True)

# LOAD DATA
@st.cache_data # Biasanya anak DS pakai decorator ini
def load_data():
    # 1. Ambil jalur folder tempat file app.py ini berada
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 2. Gabungkan folder tersebut dengan nama file CSV
    csv_path = os.path.join(base_dir, "final_dataset.csv")
    
    # 3. Baca file menggunakan jalur absolut yang sudah pasti benar
    return pd.read_csv(csv_path)

# Sisa kode di bawahnya...
df = load_data()

# SIDEBAR
with st.sidebar:

    st.markdown("# AI Risk Dashboard")

    st.markdown("""
    Workforce automation analysis using occupation,
    AI exposure, and task-based features.
    """)

    st.markdown("---")

    page = st.radio(
        "Navigation",
        [
            "Overview",
            "Explore Jobs",
            "Reskilling Advisor",
            "Dataset & Methodology"
        ]
    )

    st.markdown("---")

    st.markdown("""
    ### Dataset Sources

    - O*NET Occupation Dataset  
    - AI Exposure Dataset  
    - Automation Risk Features  

    ### Technologies

    - Python  
    - Streamlit  
    - Plotly  
    - Scikit-learn  
    - TF-IDF NLP  
    """)

# COLORS
RISK_COLORS = {
    "High": "#dc2626",
    "Medium": "#f59e0b",
    "Low": "#16a34a"
}

# OVERVIEW PAGE
if page == "Overview":

    st.title("AI Automation & Workforce Risk Dashboard")

    st.markdown("""
    <p class='desc'>
    This dashboard analyzes automation exposure across occupations 
    and identifies workforce risk levels based on AI-related features.
    </p>
    """, unsafe_allow_html=True)

    st.markdown("")

    # KPI SECTION
    total_jobs = len(df)

    high_risk = (df['risk_label'] == 'High').sum()
    medium_risk = (df['risk_label'] == 'Medium').sum()
    low_risk = (df['risk_label'] == 'Low').sum()

    avg_risk = round(df['automation_risk_score'].mean(), 2)

    c1, c2, c3, c4, c5 = st.columns(5)

    metrics = [
        ("Total Occupations", total_jobs),
        ("High Risk", high_risk),
        ("Medium Risk", medium_risk),
        ("Low Risk", low_risk),
        ("Average Risk", avg_risk)
    ]

    for col, (title, value) in zip([c1, c2, c3, c4, c5], metrics):

        col.markdown(f"""
        <div class='card'>
            <div class='kpi-title'>{title}</div>
            <div class='kpi-value'>{value}</div>
        </div>
        """, unsafe_allow_html=True)

    st.markdown("")

    # PIE + BAR
    col1, col2 = st.columns([1,2])

    with col1:

        st.markdown("<div class='section-title'>Risk Distribution</div>", unsafe_allow_html=True)

        risk_counts = df['risk_label'].value_counts().reset_index()
        risk_counts.columns = ['risk_label', 'count']

        fig_pie = px.pie(
            risk_counts,
            names='risk_label',
            values='count',
            color='risk_label',
            color_discrete_map=RISK_COLORS,
            hole=0.5
        )

        fig_pie.update_layout(
            paper_bgcolor='white',
            font_color='#111827'
        )

        st.plotly_chart(fig_pie, use_container_width=True)

    with col2:

        st.markdown("<div class='section-title'>Highest Automation Risk Occupations</div>", unsafe_allow_html=True)

        top_jobs = df.sort_values(
            by='automation_risk_score',
            ascending=False
        ).head(10)

        fig_bar = px.bar(
            top_jobs.sort_values('automation_risk_score'),
            x='automation_risk_score',
            y='title',
            orientation='h',
            color='risk_label',
            color_discrete_map=RISK_COLORS
        )

        fig_bar.update_layout(
            paper_bgcolor='white',
            plot_bgcolor='white',
            font_color='#111827',
            showlegend=False,
            xaxis_title="Automation Risk Score",
            yaxis_title=""
        )

        st.plotly_chart(fig_bar, use_container_width=True)

    # SCATTER + HEATMAP
    col3, col4 = st.columns([2,1])

    with col3:

        st.markdown("<div class='section-title'>Social Score vs Automation Risk</div>", unsafe_allow_html=True)

        fig_scatter = px.scatter(
            df,
            x='social_score',
            y='automation_risk_score',
            color='risk_label',
            hover_name='title',
            color_discrete_map=RISK_COLORS
        )

        fig_scatter.update_layout(
            paper_bgcolor='white',
            plot_bgcolor='white',
            font_color='#111827'
        )

        st.plotly_chart(fig_scatter, use_container_width=True)

    with col4:

        st.markdown("<div class='section-title'>Feature Correlation</div>", unsafe_allow_html=True)

        features = [
            'social_score',
            'decision_score',
            'digital_ai_exposure_raw',
            'manual_work_raw',
            'automation_risk_score'
        ]

        corr = df[features].corr()

        fig, ax = plt.subplots(figsize=(5,4))

        sns.heatmap(
            corr,
            annot=True,
            cmap='coolwarm',
            linewidths=0.5,
            ax=ax
        )

        st.pyplot(fig)

    # INSIGHTS
    st.markdown("<div class='section-title'>Key Insights</div>", unsafe_allow_html=True)

    insights = [
        "Occupations with higher AI exposure generally show higher automation risk scores.",
        "Jobs requiring strong social interaction tend to be more resilient to automation.",
        "Decision-oriented occupations still show moderate vulnerability to AI systems.",
        "Communication, adaptability, and analytical thinking appear frequently in reskilling recommendations."
    ]

    for insight in insights:

        st.markdown(f"""
        <div class='card' style='margin-bottom:10px;'>
            <div class='desc'>{insight}</div>
        </div>
        """, unsafe_allow_html=True)

# EXPLORE JOBS
elif page == "Explore Jobs":

    st.title("Explore Occupations")

    st.markdown("""
    <p class='desc'>
    Search and filter occupations based on automation risk categories.
    </p>
    """, unsafe_allow_html=True)

    st.markdown("")

    col1, col2 = st.columns([1,2])

    with col1:

        selected_risk = st.selectbox(
            "Risk Category",
            ["All"] + sorted(df['risk_label'].unique())
        )

    with col2:

        search = st.text_input("Search Occupation")

    filtered = df.copy()

    if selected_risk != "All":

        filtered = filtered[
            filtered['risk_label'] == selected_risk
        ]

    if search:

        filtered = filtered[
            filtered['title'].str.contains(search, case=False)
        ]

    st.dataframe(
        filtered[
            [
                'title',
                'automation_risk_score',
                'risk_label',
                'social_score',
                'decision_score'
            ]
        ],
        use_container_width=True
    )

    st.markdown("<div class='section-title'>Risk Score Distribution</div>", unsafe_allow_html=True)

    fig_hist = px.histogram(
        filtered,
        x='automation_risk_score',
        color='risk_label',
        color_discrete_map=RISK_COLORS
    )

    fig_hist.update_layout(
        paper_bgcolor='white',
        plot_bgcolor='white',
        font_color='#111827'
    )

    st.plotly_chart(fig_hist, use_container_width=True)

# RESKILLING PAGE
elif page == "Reskilling Advisor":

    st.title("Reskilling Advisor")

    st.markdown("""
    <p class='desc'>
    Explore recommended skills based on occupation automation risk levels.
    </p>
    """, unsafe_allow_html=True)

    st.markdown("")

    selected_job = st.selectbox(
        "Select Occupation",
        sorted(df['title'].unique())
    )

    job_data = df[
        df['title'] == selected_job
    ].iloc[0]

    col1, col2 = st.columns([1,2])

    with col1:

        st.markdown("<div class='section-title'>Occupation Information</div>", unsafe_allow_html=True)

        st.markdown(f"""
        <div class='card'>
            <p><b>Occupation:</b> {selected_job}</p>
            <p><b>Risk Level:</b> {job_data['risk_label']}</p>
            <p><b>Automation Risk Score:</b> {job_data['automation_risk_score']:.2f}</p>
        </div>
        """, unsafe_allow_html=True)

    with col2:

        st.markdown("<div class='section-title'>Recommended Skills</div>", unsafe_allow_html=True)

        st.markdown(f"""
        <div class='card'>
            <div class='desc'>
            {job_data['recommended_skills']}
            </div>
        </div>
        """, unsafe_allow_html=True)

    # FEATURE COMPARISON
    st.markdown("<div class='section-title'>Feature Comparison</div>", unsafe_allow_html=True)

    compare_df = pd.DataFrame({
        'Feature': [
            'Social Score',
            'Decision Score',
            'AI Exposure',
            'Manual Work'
        ],
        'Value': [
            job_data['social_score'],
            job_data['decision_score'],
            job_data['digital_ai_exposure_raw'],
            job_data['manual_work_raw']
        ]
    })

    fig_compare = px.bar(
        compare_df,
        x='Feature',
        y='Value',
        color='Feature'
    )

    fig_compare.update_layout(
        paper_bgcolor='white',
        plot_bgcolor='white',
        font_color='#111827',
        showlegend=False
    )

    st.plotly_chart(fig_compare, use_container_width=True)

# DATASET & METHODOLOGY
elif page == "Dataset & Methodology":

    st.title("Dataset & Methodology")

    st.markdown("""
    <p class='desc'>
    Overview of datasets, preprocessing steps, and analytical workflow.
    </p>
    """, unsafe_allow_html=True)

    st.markdown("")

    col1, col2 = st.columns(2)

    with col1:

        st.markdown("<div class='section-title'>Dataset Preview</div>", unsafe_allow_html=True)

        st.dataframe(
            df.head(),
            use_container_width=True
        )

        st.markdown("<div class='section-title'>Dataset Information</div>", unsafe_allow_html=True)

        st.markdown(f"""
        <div class='card'>
            <p><b>Total Rows:</b> {df.shape[0]}</p>
            <p><b>Total Columns:</b> {df.shape[1]}</p>
        </div>
        """, unsafe_allow_html=True)

    with col2:

        st.markdown("<div class='section-title'>Project Workflow</div>", unsafe_allow_html=True)

        workflow = [
            ("Data Collection", "Collected occupation and automation-related datasets."),
            ("Data Cleaning", "Handled missing values and cleaned text-based features."),
            ("Feature Engineering", "Generated additional numerical and NLP-based features."),
            ("Text Processing", "Applied stopword removal, stemming, and TF-IDF vectorization."),
            ("Risk Classification", "Built a classification model to predict automation risk."),
            ("Visualization", "Developed interactive dashboards using Streamlit and Plotly.")
        ]

        for title, desc in workflow:

            st.markdown(f"""
            <div class='card' style='margin-bottom:12px;'>
                <div style='font-size:16px; font-weight:600; margin-bottom:8px;'>
                    {title}
                </div>
                <div class='desc'>
                    {desc}
                </div>
            </div>
            """, unsafe_allow_html=True)

    # MISSING VALUES
    st.markdown("<div class='section-title'>Missing Values</div>", unsafe_allow_html=True)

    missing = df.isnull().sum()
    missing = missing[missing > 0].reset_index()

    missing.columns = ['Column', 'Missing Values']

    if len(missing) == 0:

        st.success("No missing values found in the dataset.")

    else:

        st.dataframe(
            missing,
            use_container_width=True
        )

    # DOWNLOAD BUTTON
    st.markdown("<div class='section-title'>Download Dataset</div>", unsafe_allow_html=True)

    csv = df.to_csv(index=False).encode('utf-8')

    st.download_button(
        label="Download Processed Dataset",
        data=csv,
        file_name='final_dataset.csv',
        mime='text/csv'
    )

# =========================================================
# FOOTER
# =========================================================
st.markdown("---")

st.markdown("""
<p style='text-align:center; color:#6b7280; font-size:13px;'>
AI Automation & Workforce Risk Dashboard
</p>
""", unsafe_allow_html=True)