const fixedQuestions = [
    { id: 'gender', type: 'select', question: 'Gender', options: ['Male', 'Female', 'Prefer not to say'], icons: ['♂', '♀', '?'] },
    { id: 'gender_pref', type: 'select', question: 'Gender Preference', options: ['Male', 'Female', 'No Preference'] },
    { id: 'grade', type: 'number', question: 'Grade', min: 9, max: 12 },
    { id: 'age', type: 'number', question: 'Age', min: 13, max: 19 }
];

const randomQuestions = [
    { id: 'location', type: 'map', question: 'Where do you want to live?' },
    { id: 'extrovert_introvert', type: 'slider', question: 'Extroverted vs Introverted', minLabel: 'Introverted', maxLabel: 'Extroverted' },
    { id: 'qualities_prefer', type: 'multi-slider', question: 'Qualities you prefer (Sum to 100)', items: ['Intelligence', 'Strength', 'Confidence', 'Humor', 'Kindness'] },
    { id: 'qualities_have', type: 'multi-slider', question: 'Qualities you have (Sum to 100)', items: ['Intelligence', 'Strength', 'Confidence', 'Humor', 'Kindness'] },
    { id: 'fav_subject', type: 'grid', question: 'Favorite Subject', options: ['Math', 'Science', 'Art', 'History', 'English', 'PE', 'Music', 'CS'] },
    { id: 'music_genre', type: 'grid', question: 'Favorite Music Genre', options: ['Pop', 'Rock', 'Hip Hop', 'Jazz', 'Classical', 'Country', 'EDM', 'Indie'] },
    { id: 'text_call', type: 'binary', question: 'Text vs Call', options: ['Text', 'Call'] },
    { id: 'fav_color', type: 'color', question: 'Favorite Color' },
    { id: 'ice_cream', type: 'ice-cream', question: 'Favorite Ice Cream Flavor', options: ['Vanilla', 'Chocolate', 'Strawberry', 'Mint', 'Cookie Dough'] },
    { id: 'sleep_time', type: 'clock', question: 'When do you like to sleep?' },
    { id: 'social_battery', type: 'battery', question: 'Social Battery' },
    { id: 'fav_season', type: 'season', question: 'Favorite Season', options: ['Spring', 'Summer', 'Autumn', 'Winter'] },
    { id: 'date_ideas', type: 'rank', question: 'Rank Date Ideas', options: ['Movie', 'Dinner', 'Park', 'Arcade', 'Museum'] },
    { id: 'home_out', type: 'binary', question: 'Home vs Going Out', options: ['Home', 'Going Out'] },
    { id: 'city_country', type: 'binary', question: 'City vs Countryside', options: ['City', 'Countryside'] }
];

// Shuffle random questions
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const allQuestions = [...fixedQuestions, ...shuffle(randomQuestions)];
let currentQuestionIndex = 0;
const answers = {};

const container = document.getElementById('questionContainer');
const progressBar = document.getElementById('progressBar');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateProgress() {
    const progress = ((currentQuestionIndex) / allQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function renderQuestion() {
    container.innerHTML = '';
    const q = allQuestions[currentQuestionIndex];

    const title = document.createElement('h2');
    title.textContent = q.question;
    container.appendChild(title);

    if (q.type === 'select' || q.type === 'binary') {
        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            if (q.icons && q.icons[idx]) {
                btn.innerHTML = `<span style="font-size: 1.5rem">${q.icons[idx]}</span> ${opt}`;
            } else {
                btn.textContent = opt;
            }
            if (answers[q.id] === opt) btn.classList.add('selected');
            btn.onclick = () => {
                answers[q.id] = opt;
                renderQuestion();
            };
            container.appendChild(btn);
        });
    } else if (q.type === 'number') {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = q.min;
        input.max = q.max;
        input.value = answers[q.id] || '';
        input.className = 'option-btn'; // Reuse style
        input.onchange = (e) => answers[q.id] = e.target.value;
        container.appendChild(input);
    } else if (q.type === 'map') {
        const mapDiv = document.createElement('div');
        mapDiv.id = 'map';
        container.appendChild(mapDiv);

        setTimeout(() => {
            const map = L.map('map').setView([51.505, -0.09], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            let marker;

            if (answers[q.id]) {
                marker = L.marker(answers[q.id]).addTo(map);
            }

            map.on('click', function (e) {
                if (marker) map.removeLayer(marker);
                marker = L.marker(e.latlng).addTo(map);
                answers[q.id] = e.latlng;
            });
        }, 100);
    } else if (q.type === 'slider') {
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = 0;
        slider.max = 100;
        slider.value = answers[q.id] || 50;
        slider.oninput = (e) => answers[q.id] = e.target.value;

        const labels = document.createElement('div');
        labels.style.display = 'flex';
        labels.style.justifyContent = 'space-between';
        labels.innerHTML = `<span>${q.minLabel}</span><span>${q.maxLabel}</span>`;

        container.appendChild(slider);
        container.appendChild(labels);
    } else if (q.type === 'multi-slider') {
        const totalDisplay = document.createElement('div');
        totalDisplay.id = 'total-display';
        totalDisplay.textContent = 'Total: 0/100';
        container.appendChild(totalDisplay);

        const values = answers[q.id] || {};

        q.items.forEach(item => {
            const wrapper = document.createElement('div');
            wrapper.className = 'slider-container';
            const label = document.createElement('label');
            label.textContent = item;
            const slider = document.createElement('input');
            slider.type = 'range';
            slider.min = 0;
            slider.max = 100;
            slider.value = values[item] || 0;

            slider.oninput = (e) => {
                const val = parseInt(e.target.value);
                let currentTotal = 0;
                q.items.forEach(i => {
                    if (i !== item) currentTotal += parseInt(values[i] || 0);
                });

                if (currentTotal + val > 100) {
                    e.target.value = 100 - currentTotal;
                }
                values[item] = parseInt(e.target.value);
                answers[q.id] = values;

                let newTotal = 0;
                Object.values(values).forEach(v => newTotal += v);
                totalDisplay.textContent = `Total: ${newTotal}/100`;
            };

            wrapper.appendChild(label);
            wrapper.appendChild(slider);
            container.appendChild(wrapper);
        });
    } else if (q.type === 'grid') {
        const grid = document.createElement('div');
        grid.className = 'grid-options';
        q.options.forEach(opt => {
            const item = document.createElement('div');
            item.className = 'grid-item';
            item.textContent = opt;
            if (answers[q.id] === opt) item.classList.add('selected');
            item.onclick = () => {
                answers[q.id] = opt;
                renderQuestion();
            };
            grid.appendChild(item);
        });
        container.appendChild(grid);
    } else if (q.type === 'color') {
        const input = document.createElement('input');
        input.type = 'color';
        input.value = answers[q.id] || '#ff0000';
        input.onchange = (e) => answers[q.id] = e.target.value;
        container.appendChild(input);
    } else if (q.type === 'ice-cream') {
        const wrapper = document.createElement('div');
        wrapper.className = 'ice-cream-container';
        q.options.forEach(opt => {
            const tub = document.createElement('div');
            tub.className = 'ice-cream-tub';
            tub.textContent = opt;
            // Simple color mapping
            if (opt === 'Chocolate') tub.style.backgroundColor = '#8b4513';
            if (opt === 'Strawberry') tub.style.backgroundColor = '#ff69b4';
            if (opt === 'Mint') tub.style.backgroundColor = '#98ff98';

            if (answers[q.id] === opt) tub.classList.add('selected');
            tub.onclick = () => {
                answers[q.id] = opt;
                renderQuestion();
            };
            wrapper.appendChild(tub);
        });
        container.appendChild(wrapper);
    } else if (q.type === 'clock') {
        const input = document.createElement('input');
        input.type = 'time';
        input.className = 'clock-input';
        input.value = answers[q.id] || '22:00';
        input.onchange = (e) => answers[q.id] = e.target.value;
        container.appendChild(input);
    } else if (q.type === 'battery') {
        const battery = document.createElement('div');
        battery.className = 'battery-container';
        const segments = 3;
        const colors = ['red', 'yellow', 'green'];

        for (let i = 0; i < segments; i++) {
            const seg = document.createElement('div');
            seg.className = 'battery-segment';
            if (answers[q.id] > i) seg.classList.add('active', colors[i]);

            seg.onclick = () => {
                answers[q.id] = i + 1;
                renderQuestion();
            };
            battery.appendChild(seg);
        }
        container.appendChild(battery);
    } else if (q.type === 'season') {
        const grid = document.createElement('div');
        grid.className = 'grid-options';
        q.options.forEach(opt => {
            const item = document.createElement('div');
            item.className = 'grid-item';
            item.textContent = opt;
            if (answers[q.id] === opt) item.classList.add('selected');
            item.onclick = () => {
                answers[q.id] = opt;
                renderQuestion();
            };
            grid.appendChild(item);
        });
        container.appendChild(grid);
    } else if (q.type === 'rank') {
        // Simple drag and drop or numbering implementation
        // For simplicity, just a list of inputs
        q.options.forEach((opt, idx) => {
            const wrapper = document.createElement('div');
            wrapper.style.margin = '10px';
            wrapper.innerHTML = `<span>${opt}</span>: <input type="number" min="1" max="${q.options.length}" style="width: 50px" onchange="updateRank('${q.id}', '${opt}', this.value)">`;
            container.appendChild(wrapper);
        });
    }

    prevBtn.disabled = currentQuestionIndex === 0;
    if (currentQuestionIndex === allQuestions.length - 1) {
        nextBtn.textContent = 'Submit';
    } else {
        nextBtn.textContent = 'Next →';
    }
    updateProgress();
}

window.updateRank = function (qid, item, rank) {
    if (!answers[qid]) answers[qid] = {};
    answers[qid][item] = rank;
}

function nextQuestion() {
    if (currentQuestionIndex < allQuestions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        submitData();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

async function submitData() {
    // Extract top level fields
    const payload = {
        gender: answers['gender'],
        gender_pref: answers['gender_pref'],
        grade: answers['grade'],
        age: answers['age'],
        answers: answers
    };

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert('Submitted successfully!');
            window.location.href = '/';
        } else {
            alert('Error submitting data');
        }
    } catch (e) {
        console.error(e);
        alert('Error submitting data');
    }
}

// Initial render
renderQuestion();
