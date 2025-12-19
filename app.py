from flask import Flask, render_template, request, redirect, url_for, session, jsonify, send_from_directory
from authlib.integrations.flask_client import OAuth
import pandas as pd
import os
import json
from utils.crypto_utils import encrypt_file, decrypt_file, load_key
from utils.matchmaking_utils import Matchmaker

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
DATA_FILE = 'data/responses.csv'

# OAuth Configuration (Use environment variables in production)
app.config['GOOGLE_CLIENT_ID'] = os.environ.get('GOOGLE_CLIENT_ID', '73123638661-ettko1olvsmvi19giem140pb4d8jed6f.apps.googleusercontent.com')
app.config['GOOGLE_CLIENT_SECRET'] = os.environ.get('GOOGLE_CLIENT_SECRET', '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')

oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id=app.config['GOOGLE_CLIENT_ID'],
    client_secret=app.config['GOOGLE_CLIENT_SECRET'],
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={'scope': 'openid email profile'}
)

# Ensure data directory and file exist
os.makedirs('data', exist_ok=True)
if not os.path.exists(DATA_FILE):
    df = pd.DataFrame(columns=['id', 'email', 'gender', 'gender_pref', 'grade', 'age', 'answers'])
    df.to_csv(DATA_FILE, index=False)
    encrypt_file(DATA_FILE)

print("\n" + "="*60)
print("🚀 VALENTIN MATCHMAKING SERVER")
print("="*60)
print("\n📋 CONSOLE COMMANDS:")
print("   To skip OAuth (for testing), open in browser:")
print("   👉 http://localhost:5001/dev-login?email=test@example.com")
print("\n   Replace 'test@example.com' with any email you want to test with")
print("\n   View matchmaking results:")
print("   👉 http://localhost:5001/matchmaking")
print("="*60 + "\n")

def get_data():
    if os.path.exists(DATA_FILE):
        try:
            decrypt_file(DATA_FILE)
            df = pd.read_csv(DATA_FILE)
            encrypt_file(DATA_FILE) # Re-encrypt immediately
            return df
        except Exception as e:
            print(f"Error reading data: {e}")
            # Try reading as plain CSV (for initial empty file)
            try:
                df = pd.read_csv(DATA_FILE)
                return df
            except:
                return pd.DataFrame(columns=['id', 'email', 'gender', 'gender_pref', 'grade', 'age', 'answers'])
    return pd.DataFrame(columns=['id', 'email', 'gender', 'gender_pref', 'grade', 'age', 'answers'])

def save_data(new_data):
    df = get_data()
    
    # Check if user already exists and update their data
    if 'email' in new_data and new_data['email'] in df['email'].values:
        df = df[df['email'] != new_data['email']]
    
    new_df = pd.DataFrame([new_data])
    df = pd.concat([df, new_df], ignore_index=True)
    df.to_csv(DATA_FILE, index=False)
    encrypt_file(DATA_FILE)

@app.route('/')
def index():
    return render_template('login.html')

# DEV-ONLY: Skip OAuth for testing
@app.route('/dev-login')
def dev_login():
    email = request.args.get('email', 'dev@test.com')
    session['user_email'] = email
    print(f"🔓 DEV LOGIN: Logged in as {email}")
    return redirect(url_for('questionnaire'))

@app.route('/login')
def login():
    redirect_uri = url_for('auth_callback', _external=True)
    return google.authorize_redirect(redirect_uri)

@app.route('/auth/callback')
def auth_callback():
    token = google.authorize_access_token()
    user_info = google.userinfo()
    session['user_email'] = user_info['email']
    return redirect(url_for('questionnaire'))

@app.route('/questionnaire')
def questionnaire():
    if 'user_email' not in session:
        return redirect(url_for('index'))
    return render_template('questionnaire.html')

@app.route('/submit', methods=['POST'])
def submit():
    if 'user_email' not in session:
        return jsonify({'status': 'error', 'message': 'Not logged in'}), 401
    
    data = request.json
    user_data = {
        'id': os.urandom(8).hex(),
        'email': session['user_email'],
        'gender': data.get('gender'),
        'gender_pref': data.get('gender_pref'),
        'grade': data.get('grade'),
        'age': data.get('age'),
        'answers': json.dumps(data.get('answers', {})) # Store complex answers as JSON string
    }
    
    save_data(user_data)
    print(f"✅ Saved data for {session['user_email']}")
    return jsonify({'status': 'success'})

@app.route('/matchmaking')
def matchmaking():
    # In a real app, protect this route with admin auth
    df = get_data()
    if df.empty or len(df) < 2:
        return render_template('matchmaking.html', matches=[], message="Not enough participants yet. Need at least 2 people.")
    
    # Parse JSON answers back to dict for matchmaking
    records = df.to_dict('records')
    for record in records:
        if isinstance(record.get('answers'), str):
            try:
                record.update(json.loads(record['answers']))
            except:
                pass
            
    matchmaker = Matchmaker(pd.DataFrame(records))
    matches = matchmaker.run_matchmaking()
    
    return render_template('matchmaking.html', matches=matches, message=None)

@app.route('/api/stats')
def api_stats():
    """Get statistics about responses"""
    df = get_data()
    return jsonify({
        'total_responses': len(df),
        'emails': df['email'].tolist() if not df.empty else []
    })

@app.route('/robots.txt')
def robots():
    return send_from_directory(app.root_path, 'robots.txt')

if __name__ == '__main__':
    import sys
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5001
    app.run(debug=True, port=port, host='0.0.0.0')
