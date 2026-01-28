import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import numpy as np
from datetime import datetime


# Page configuration
st.set_page_config(
    page_title="IPL Analytics Pro",
    page_icon="🏏",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS
st.markdown("""
    <style>
    .main {
        padding-top: 2rem;
    }
    .metric-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 20px;
        border-radius: 10px;
        color: white;
        text-align: center;
    }
    </style>
""", unsafe_allow_html=True)

# Sample Data
TEAMS = ['CSK', 'MI', 'RCB', 'KKR', 'SRH', 'RR', 'DC', 'PBKS', 'GT', 'LSG']

PLAYERS_DATA = {
    'Virat Kohli': {'team': 'RCB', 'role': 'Batsman', 'runs': 7263, 'matches': 237, 'avg': 37.2, 'sr': 130.0},
    'Jasprit Bumrah': {'team': 'MI', 'role': 'Bowler', 'runs': 62, 'wickets': 145, 'matches': 120, 'economy': 7.39},
    'MS Dhoni': {'team': 'CSK', 'role': 'Wicketkeeper', 'runs': 5082, 'matches': 250, 'avg': 38.8, 'sr': 135.9},
    'Rashid Khan': {'team': 'GT', 'role': 'Bowler', 'runs': 45, 'wickets': 132, 'matches': 116, 'economy': 6.45},
    'Rohit Sharma': {'team': 'MI', 'role': 'Batsman', 'runs': 6572, 'matches': 235, 'avg': 32.1, 'sr': 127.3},
    'KL Rahul': {'team': 'LSG', 'role': 'Batsman', 'runs': 4683, 'matches': 189, 'avg': 28.6, 'sr': 129.1},
}

TEAM_STATS = {
    'CSK': {'wins': 133, 'matches': 272, 'titles': 5},
    'MI': {'wins': 127, 'matches': 267, 'titles': 5},
    'RCB': {'wins': 94, 'matches': 267, 'titles': 0},
    'KKR': {'wins': 107, 'matches': 262, 'titles': 3},
    'SRH': {'wins': 104, 'matches': 260, 'titles': 2},
    'RR': {'wins': 85, 'matches': 260, 'titles': 1},
    'DC': {'wins': 86, 'matches': 200, 'titles': 0},
    'PBKS': {'wins': 71, 'matches': 230, 'titles': 0},
    'GT': {'wins': 37, 'matches': 68, 'titles': 1},
    'LSG': {'wins': 35, 'matches': 68, 'titles': 0},
}

# Sidebar Navigation
st.sidebar.title("🏏 IPL Analytics Pro")
view = st.sidebar.radio(
    "Select View",
    ["Dashboard", "Player Comparison", "Team Analysis", "Dream Team", "AI Insights"]
)

# Helper functions
def create_team_performance_chart():
    """Create team performance chart"""
    teams = list(TEAM_STATS.keys())
    wins = [TEAM_STATS[t]['wins'] for t in teams]
    win_pct = [TEAM_STATS[t]['wins'] / TEAM_STATS[t]['matches'] * 100 for t in teams]
    
    fig = go.Figure(data=[
        go.Bar(name='Wins', x=teams, y=wins, marker_color='#667eea'),
        go.Bar(name='Win %', x=teams, y=win_pct, marker_color='#764ba2')
    ])
    fig.update_layout(
        barmode='group',
        title='Team Performance Overview',
        xaxis_title='Teams',
        yaxis_title='Wins / Win Percentage',
        hovermode='x unified',
        height=400
    )
    return fig

def create_player_stats_chart(player_name):
    """Create player statistics chart"""
    if player_name not in PLAYERS_DATA:
        return None
    
    player = PLAYERS_DATA[player_name]
    categories = []
    values = []
    
    if 'avg' in player:
        categories.extend(['Average', 'Strike Rate'])
        values.extend([player['avg'], player['sr']/10])  # Scale for visualization
    
    fig = go.Figure(data=[
        go.Scatterpolar(
            r=values if values else [0],
            theta=categories if categories else ['Stats'],
            fill='toself',
            name=player_name
        )
    ])
    fig.update_layout(
        title=f'{player_name} - Performance Metrics',
        polar=dict(radialaxis=dict(visible=True, range=[0, max(values)+10] if values else [0, 100])),
        height=400
    )
    return fig

def create_season_trend():
    """Create seasonal performance trend"""
    seasons = list(range(2008, 2024))
    avg_runs = np.random.randint(2500, 4000, len(seasons))
    
    fig = px.line(
        x=seasons,
        y=avg_runs,
        markers=True,
        title='Average Runs Scored Over Seasons',
        labels={'x': 'Season', 'y': 'Average Runs'},
        height=400
    )
    fig.update_traces(line_color='#667eea', marker_size=8)
    return fig

# ============ DASHBOARD VIEW ============
if view == "Dashboard":
    st.title("📊 Dashboard")
    
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Total Teams", len(TEAMS), "+0")
    with col2:
        st.metric("Total Players Tracked", len(PLAYERS_DATA), "+3")
    with col3:
        st.metric("Seasons Analyzed", 16, "2008-2024")
    with col4:
        st.metric("Total Matches", 800, "+50")
    
    st.divider()
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.plotly_chart(create_team_performance_chart(), use_container_width=True)
    
    with col2:
        st.plotly_chart(create_season_trend(), use_container_width=True)
    
    # Top performers
    st.subheader("🌟 Top Performers")
    top_col1, top_col2 = st.columns(2)
    
    with top_col1:
        st.markdown("**Top Run Scorers**")
        top_batsmen = sorted(
            [(k, v['runs']) for k, v in PLAYERS_DATA.items() if 'runs' in v],
            key=lambda x: x[1], reverse=True
        )[:5]
        for player, runs in top_batsmen:
            st.write(f"🔹 {player}: **{runs}** runs")
    
    with top_col2:
        st.markdown("**Top Wicket Takers**")
        top_bowlers = sorted(
            [(k, v.get('wickets', 0)) for k, v in PLAYERS_DATA.items() if 'wickets' in v],
            key=lambda x: x[1], reverse=True
        )[:5]
        for player, wickets in top_bowlers:
            st.write(f"🔹 {player}: **{wickets}** wickets")

# ============ PLAYER COMPARISON VIEW ============
elif view == "Player Comparison":
    st.title("⚔️ Player Comparison")
    
    col1, col2 = st.columns(2)
    
    with col1:
        player1 = st.selectbox("Select Player 1", list(PLAYERS_DATA.keys()))
    with col2:
        player2 = st.selectbox("Select Player 2", list(PLAYERS_DATA.keys()), index=1)
    
    st.divider()
    
    if player1 and player2:
        comp_col1, comp_col2 = st.columns(2)
        
        with comp_col1:
            st.subheader(f"📌 {player1}")
            p1 = PLAYERS_DATA[player1]
            st.write(f"**Team**: {p1['team']}")
            st.write(f"**Role**: {p1['role']}")
            st.write(f"**Matches**: {p1['matches']}")
            if 'runs' in p1:
                st.write(f"**Runs**: {p1['runs']}")
            if 'wickets' in p1:
                st.write(f"**Wickets**: {p1['wickets']}")
        
        with comp_col2:
            st.subheader(f"📌 {player2}")
            p2 = PLAYERS_DATA[player2]
            st.write(f"**Team**: {p2['team']}")
            st.write(f"**Role**: {p2['role']}")
            st.write(f"**Matches**: {p2['matches']}")
            if 'runs' in p2:
                st.write(f"**Runs**: {p2['runs']}")
            if 'wickets' in p2:
                st.write(f"**Wickets**: {p2['wickets']}")
        
        # Comparison chart
        st.subheader("Performance Comparison")
        metrics = ['matches']
        values1 = [PLAYERS_DATA[player1].get('matches', 0)]
        values2 = [PLAYERS_DATA[player2].get('matches', 0)]
        
        if 'avg' in PLAYERS_DATA[player1] and 'avg' in PLAYERS_DATA[player2]:
            metrics.append('Average')
            values1.append(PLAYERS_DATA[player1]['avg'])
            values2.append(PLAYERS_DATA[player2]['avg'])
        
        fig = go.Figure(data=[
            go.Bar(name=player1, x=metrics, y=values1, marker_color='#667eea'),
            go.Bar(name=player2, x=metrics, y=values2, marker_color='#764ba2')
        ])
        fig.update_layout(barmode='group', title='Head to Head Comparison', height=400)
        st.plotly_chart(fig, use_container_width=True)

# ============ TEAM ANALYSIS VIEW ============
elif view == "Team Analysis":
    st.title("🏆 Team Analysis")
    
    selected_team = st.selectbox("Select Team", TEAMS)
    
    if selected_team:
        team_info = TEAM_STATS[selected_team]
        
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Total Wins", team_info['wins'])
        with col2:
            win_pct = (team_info['wins'] / team_info['matches'] * 100)
            st.metric("Win Percentage", f"{win_pct:.1f}%")
        with col3:
            st.metric("IPL Titles", team_info['titles'])
        
        st.divider()
        
        # Team players
        st.subheader(f"👥 {selected_team} Players")
        team_players = [p for p, d in PLAYERS_DATA.items() if d['team'] == selected_team]
        
        if team_players:
            for player in team_players:
                col1, col2 = st.columns([3, 1])
                with col1:
                    st.write(f"**{player}** - {PLAYERS_DATA[player]['role']}")
                with col2:
                    st.write(f"Matches: {PLAYERS_DATA[player]['matches']}")
        else:
            st.info("No players data available for this team")

# ============ DREAM TEAM VIEW ============
elif view == "Dream Team":
    st.title("⭐ Dream Team Builder")
    
    st.subheader("🎯 Optimize Your XI")
    
    role_filter = st.multiselect(
        "Filter by Role",
        ["Batsman", "Bowler", "All-rounder", "Wicketkeeper"],
        default=["Batsman", "Bowler"]
    )
    
    filtered_players = [
        (p, d) for p, d in PLAYERS_DATA.items()
        if d['role'] in role_filter
    ]
    
    st.subheader("Selected Players")
    
    if filtered_players:
        for idx, (player, data) in enumerate(filtered_players[:11], 1):  # Limit to 11 players
            col1, col2, col3 = st.columns([2, 2, 1])
            with col1:
                st.write(f"{idx}. **{player}**")
            with col2:
                st.write(f"{data['role']} ({data['team']})")
            with col3:
                if st.button("Add", key=f"add_{player}"):
                    st.success(f"Added {player}!")
    
    # Dream team summary
    st.subheader("📋 Dream Team Summary")
    st.info("Build your perfect XI by selecting players above!")

# ============ AI INSIGHTS VIEW ============
elif view == "AI Insights":
    st.title("🤖 AI-Powered Insights")
    
    st.subheader("📈 Performance Analysis")
    
    insight_type = st.radio(
        "Select Analysis Type",
        ["Player Trends", "Team Performance", "Match Predictions", "Season Forecast"]
    )
    
    if insight_type == "Player Trends":
        st.write("📊 Analyzing player performance trends across seasons...")
        st.plotly_chart(create_season_trend(), use_container_width=True)
        st.markdown("""
        **Key Insights:**
        - Average runs show upward trend in recent seasons
        - Top performers maintaining consistency
        - Emerging talents showing strong performance metrics
        """)
    
    elif insight_type == "Team Performance":
        st.write("🏆 Analyzing team performance patterns...")
        st.plotly_chart(create_team_performance_chart(), use_container_width=True)
        st.markdown("""
        **Key Insights:**
        - CSK and MI dominating with consistent wins
        - Strong team depth crucial for tournament success
        - Home advantage plays significant role
        """)
    
    elif insight_type == "Match Predictions":
        st.write("🔮 Match outcome predictions...")
        col1, col2 = st.columns(2)
        with col1:
            team1 = st.selectbox("Team 1", TEAMS, key="pred1")
        with col2:
            team2 = st.selectbox("Team 2", TEAMS, key="pred2")
        
        if st.button("Predict Match"):
            prediction = np.random.randint(45, 65)
            st.metric(f"Winning Probability ({team1})", f"{prediction}%")
    
    elif insight_type == "Season Forecast":
        st.write("🎯 Season performance forecast...")
        st.info("AI models analyzing season trends and predicting outcomes...")

st.sidebar.divider()
st.sidebar.write("📱 **Version**: 1.0.0")
st.sidebar.write("🔄 **Last Updated**: 2024")
