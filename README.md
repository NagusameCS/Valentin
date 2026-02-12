# Valentin - Valentine's Day Matchmaking

A fun Valentine's Day matchmaking website with an interactive questionnaire that uses advanced compatibility algorithms.

## Features

- 💕 **Interactive Questionnaire**: Engaging questions about personality, interests, and preferences
- 🧠 **Smart Matching**: Hungarian algorithm for optimal pairing based on compatibility scores
- 🔒 **Privacy First**: Anonymous submissions until matches are revealed
- ✨ **Modern UI**: Beautiful gradient design with floating hearts animation
- 📊 **Results Dashboard**: View matches with compatibility percentages

## File Structure

- `index.html` - Landing page
- `questionnaire.html` - Interactive questionnaire page
- `results.html` - Results/matches display page
- `script.js` - Questionnaire logic and question rendering

## Admin Endpoints

- `/sites/valentin/api/results` - Get current matches (public)
- `/portal/api/valentin/data` - View raw submissions (admin only)
- `/portal/api/valentin/calculate` - Calculate matches (admin only)

## How It Works

1. Users complete the questionnaire (~10-15 questions)
2. Responses are stored securely
3. Admin calculates matches using the algorithm
4. Users can view their matches on the results page

## Technologies Used

- Vanilla JavaScript
- Leaflet.js for map selection
- SortableJS for ranking questions
- Express.js backend
- Hungarian algorithm for optimal matching

## 📊 Project Stats

| Language   | Files | Blank | Comment | Code  |
|------------|-------|-------|---------|-------|
| JavaScript | 6     | 1,015 | 394     | 5,717 |
| HTML       | 9     | 700   | 37      | 4,997 |
| CSS        | 2     | 207   | 32      | 1,499 |
| Python     | 5     | 111   | 79      | 545   |
| Markdown   | 2     | 53    | 0       | 155   |
| Other      | 7     | 30    | 0       | 132   |
| **Total**  | **31**| **2,116** | **542** | **13,045** |

---

Made with ❤️ for Valentine's Day 2026
