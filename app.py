from flask import Flask, render_template, request, redirect, url_for, session, jsonify, send_from_directory
import pandas as pd
import os
import json
from utils.crypto_utils import encrypt_file, decrypt_file, load_key
from utils.matchmaking_utils import Matchmaker

app = Flask(__name__)
app.secret_key = os.urandom(24)
DATA_FILE = 'data/responses.csv'

# Ensure data file exists
if not os.path.exists(DATA_FILE):
    df = pd.DataFrame(columns=['id', 'email', 'gender', 'gender_pref', 'grade', 'age', 'answers'])
    df.to_csv(DATA_FILE, index=False)
    encrypt_file(DATA_FILE)

def get_data():
    if os.path.exists(DATA_FILE):
        try:
            decrypt_file(DATA_FILE)
            df = pd.read_csv(DATA_FILE)
            encrypt_file(DATA_FILE) # Re-encrypt immediately
            return df
        except Exception as e:
            print(f"Error reading data: {e}")
            return pd.DataFrame()
    return pd.DataFrame()

def save_data(new_data):
    df = get_data()
    new_df = pd.DataFrame([new_data])
    df = pd.concat([df, new_df], ignore_index=True)
    df.to_csv(DATA_FILE, index=False)
    encrypt_file(DATA_FILE)

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    # Mock Google Login
    # In production, verify Google token here
    email = request.form.get('email')
    session['user_email'] = email
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
        'answers': json.dumps(data.get('answers')) # Store complex answers as JSON string
    }
    
    save_data(user_data)
    return jsonify({'status': 'success'})

@app.route('/matchmaking')
def matchmaking():
    # In a real app, protect this route with admin auth
    df = get_data()
    if df.empty:
        return "No data available"
    
    # Parse JSON answers back to dict for matchmaking
    records = df.to_dict('records')
    for record in records:
        if isinstance(record['answers'], str):
            record.update(json.loads(record['answers']))
            
    matchmaker = Matchmaker(pd.DataFrame(records))
    matches = matchmaker.run_matchmaking()
    
    return render_template('matchmaking.html', matches=matches)

@app.route('/robots.txt')
def robots():
    return send_from_directory(app.root_path, 'robots.txt')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
