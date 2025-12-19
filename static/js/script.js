// Question definitions with icons
const fixedQuestions = [
    {
        id: 'gender',
        type: 'select',
        question: 'What is your gender?',
        options: ['Male', 'Female', 'Prefer not to say'],
        icons: ['👨', '👩', '🤐']
    },
    {
        id: 'gender_pref',
        type: 'select',
        question: 'Gender Preference',
        options: ['Male', 'Female', 'No Preference'],
        icons: ['👨', '👩', '💕']
    },
    {
        id: 'grade',
        type: 'number',
        question: 'What grade are you in?',
        min: 9,
        max: 12
    },
    {
        id: 'age',
        type: 'number',
        question: 'How old are you?',
        min: 13,
        max: 19
    }
];

const randomQuestions = [
    {
        id: 'location',
        type: 'map',
        question: 'Where do you want to live?'
    },
    {
        id: 'extrovert_introvert',
        type: 'slider',
        question: 'How social are you?',
        minLabel: '🤫 Introverted',
        maxLabel: 'Extroverted 🎉'
    },
    {
        id: 'qualities_prefer',
        type: 'multi-slider',
        question: 'Qualities you prefer in a partner',
        subtitle: '(Distribute 100 points)',
        items: [
            { name: 'Intelligence', icon: '🧠' },
            { name: 'Strength', icon: '💪' },
            { name: 'Confidence', icon: '😎' },
            { name: 'Humor', icon: '😂' },
            { name: 'Kindness', icon: '💝' }
        ]
    },
    {
        id: 'qualities_have',
        type: 'multi-slider',
        question: 'Rate your own qualities',
        subtitle: '(Distribute 100 points)',
        items: [
            { name: 'Intelligence', icon: '🧠' },
            { name: 'Strength', icon: '💪' },
            { name: 'Confidence', icon: '😎' },
            { name: 'Humor', icon: '😂' },
            { name: 'Kindness', icon: '💝' }
        ]
    },
    {
        id: 'fav_subject',
        type: 'grid',
        question: 'What\'s your favorite subject?',
        options: [
            { name: 'Math', icon: '📐' },
            { name: 'Science', icon: '🔬' },
            { name: 'Art', icon: '🎨' },
            { name: 'History', icon: '📜' },
            { name: 'English', icon: '📚' },
            { name: 'PE', icon: '⚽' },
            { name: 'Music', icon: '🎵' },
            { name: 'CS', icon: '💻' }
        ]
    },
    {
        id: 'music_genre',
        type: 'grid',
        question: 'Favorite Music Genre',
        options: [
            { name: 'Pop', icon: '🎤' },
            { name: 'Rock', icon: '🎸' },
            { name: 'Hip Hop', icon: '🎧' },
            { name: 'Jazz', icon: '🎷' },
            { name: 'Classical', icon: '🎻' },
            { name: 'Country', icon: '🤠' },
            { name: 'EDM', icon: '🎹' },
            { name: 'Indie', icon: '🌟' }
        ]
    },
    {
        id: 'text_call',
        type: 'binary',
        question: 'Text or Call?',
        options: [
            { name: 'Text', icon: '💬' },
            { name: 'Call', icon: '📞' }
        ]
    },
    {
        id: 'fav_color',
        type: 'color',
        question: 'What\'s your favorite color?'
    },
    {
        id: 'ice_cream',
        type: 'ice-cream',
        question: 'Favorite Ice Cream Flavor',
        options: [
            { name: 'Vanilla', color: '#FFF8DC', icon: '🍦' },
            { name: 'Chocolate', color: '#8B4513', icon: '🍫' },
            { name: 'Strawberry', color: '#FFB6C1', icon: '🍓' },
            { name: 'Mint', color: '#98FF98', icon: '🌿' },
            { name: 'Cookie Dough', color: '#D2B48C', icon: '🍪' }
        ]
    },
    {
        id: 'sleep_time',
        type: 'clock',
        question: 'When do you usually go to sleep?'
    },
    {
        id: 'social_battery',
        type: 'battery',
        question: 'How much social energy do you have?'
    },
    {
        id: 'fav_season',
        type: 'season',
        question: 'Favorite Season',
        options: [
            { name: 'Spring', icon: '🌸' },
            { name: 'Summer', icon: '☀️' },
            { name: 'Autumn', icon: '🍂' },
            { name: 'Winter', icon: '❄️' }
        ]
    },
    {
        id: 'date_ideas',
        type: 'rank',
        question: 'Rank these date ideas',
        options: ['🎬 Movie', '🍽️ Dinner', '🌳 Park', '🎮 Arcade', '🏛️ Museum']
    },
    {
        id: 'home_out',
        type: 'binary',
        question: 'Stay Home or Go Out?',
        options: [
            { name: 'Home', icon: '🏠' },
            { name: 'Going Out', icon: '🚗' }
        ]
    },
    {
        id: 'city_country',
        type: 'binary',
        question: 'City or Countryside?',
        options: [
            { name: 'City', icon: '🏙️' },
            { name: 'Countryside', icon: '🌾' }
        ]
    }
];

// Shuffle random questions
function shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

const allQuestions = [...fixedQuestions, ...shuffle(randomQuestions)];
let currentQuestionIndex = 0;
const answers = {};

// DOM Elements
const container = document.getElementById('questionContainer');
const progressBar = document.getElementById('progressBar');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const questionNumber = document.getElementById('questionNumber');
const successModal = document.getElementById('successModal');

// Map instance
let mapInstance = null;

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / allQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
    if (questionNumber) {
        questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${allQuestions.length}`;
    }
}

function renderQuestion() {
    container.innerHTML = '';
    container.style.animation = 'none';
    container.offsetHeight; // Trigger reflow
    container.style.animation = 'fadeIn 0.3s ease';

    const q = allQuestions[currentQuestionIndex];

    const title = document.createElement('h2');
    title.textContent = q.question;
    container.appendChild(title);

    if (q.subtitle) {
        const subtitle = document.createElement('p');
        subtitle.style.color = '#666';
        subtitle.style.marginBottom = '20px';
        subtitle.textContent = q.subtitle;
        container.appendChild(subtitle);
    }

    // Render based on question type
    switch (q.type) {
        case 'select':
            renderSelect(q);
            break;
        case 'number':
            renderNumber(q);
            break;
        case 'map':
            renderMap(q);
            break;
        case 'slider':
            renderSlider(q);
            break;
        case 'multi-slider':
            renderMultiSlider(q);
            break;
        case 'grid':
            renderGrid(q);
            break;
        case 'color':
            renderColor(q);
            break;
        case 'ice-cream':
            renderIceCream(q);
            break;
        case 'clock':
            renderClock(q);
            break;
        case 'battery':
            renderBattery(q);
            break;
        case 'season':
            renderSeason(q);
            break;
        case 'rank':
            renderRank(q);
            break;
        case 'binary':
            renderBinary(q);
            break;
    }

    // Update navigation buttons
    prevBtn.disabled = currentQuestionIndex === 0;
    if (currentQuestionIndex === allQuestions.length - 1) {
        nextBtn.innerHTML = 'Submit <span class="btn-icon">✓</span>';
    } else {
        nextBtn.innerHTML = 'Next <span class="btn-icon">→</span>';
    }
    updateProgress();
}

// Select type (gender, preferences)
function renderSelect(q) {
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        if (answers[q.id] === opt) btn.classList.add('selected');

        btn.innerHTML = `
            <span class="option-icon">${q.icons ? q.icons[idx] : ''}</span>
            <span>${opt}</span>
        `;

        btn.onclick = () => {
            answers[q.id] = opt;
            renderQuestion();
        };
        container.appendChild(btn);
    });
}

// Number type (grade, age)
function renderNumber(q) {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.alignItems = 'center';
    wrapper.style.gap = '20px';

    const input = document.createElement('input');
    input.type = 'number';
    input.min = q.min;
    input.max = q.max;
    input.value = answers[q.id] || '';
    input.className = 'number-input';
    input.placeholder = `${q.min}-${q.max}`;

    input.oninput = (e) => {
        let val = parseInt(e.target.value);
        if (val < q.min) val = q.min;
        if (val > q.max) val = q.max;
        answers[q.id] = val;
    };

    const hint = document.createElement('p');
    hint.style.color = '#666';
    hint.textContent = `Enter a number between ${q.min} and ${q.max}`;

    wrapper.appendChild(input);
    wrapper.appendChild(hint);
    container.appendChild(wrapper);
}

// Map type
function renderMap(q) {
    const mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    container.appendChild(mapDiv);

    const instruction = document.createElement('p');
    instruction.className = 'map-instruction';
    instruction.textContent = '📍 Click on the map to place your pin';
    container.appendChild(instruction);

    setTimeout(() => {
        if (mapInstance) {
            mapInstance.remove();
        }

        mapInstance = L.map('map').setView([40, -95], 4);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(mapInstance);

        let marker;
        if (answers[q.id]) {
            marker = L.marker([answers[q.id].lat, answers[q.id].lng]).addTo(mapInstance);
            mapInstance.setView([answers[q.id].lat, answers[q.id].lng], 8);
        }

        mapInstance.on('click', function (e) {
            if (marker) mapInstance.removeLayer(marker);
            marker = L.marker(e.latlng).addTo(mapInstance);
            answers[q.id] = { lat: e.latlng.lat, lng: e.latlng.lng };
            instruction.textContent = `📍 Location: ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`;
        });
    }, 100);
}

// Slider type
function renderSlider(q) {
    const wrapper = document.createElement('div');
    wrapper.className = 'slider-wrapper';

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = 0;
    slider.max = 100;
    slider.value = answers[q.id] || 50;

    const valueDisplay = document.createElement('div');
    valueDisplay.style.fontSize = '2rem';
    valueDisplay.style.fontWeight = '600';
    valueDisplay.style.color = '#ff4d6d';
    valueDisplay.style.marginBottom = '20px';
    valueDisplay.textContent = (answers[q.id] || 50) + '%';

    slider.oninput = (e) => {
        answers[q.id] = parseInt(e.target.value);
        valueDisplay.textContent = e.target.value + '%';
    };

    const labels = document.createElement('div');
    labels.className = 'slider-labels';
    labels.innerHTML = `<span>${q.minLabel}</span><span>${q.maxLabel}</span>`;

    container.appendChild(valueDisplay);
    wrapper.appendChild(slider);
    wrapper.appendChild(labels);
    container.appendChild(wrapper);
}

// Multi-slider type (qualities)
function renderMultiSlider(q) {
    const multiContainer = document.createElement('div');
    multiContainer.className = 'multi-slider-container';

    const totalDisplay = document.createElement('div');
    totalDisplay.className = 'total-display';

    const values = answers[q.id] || {};

    function updateTotal() {
        let total = 0;
        Object.values(values).forEach(v => total += v);
        totalDisplay.textContent = `Total: ${total}/100`;
        totalDisplay.className = 'total-display' + (total === 100 ? ' complete' : '');
    }

    updateTotal();
    multiContainer.appendChild(totalDisplay);

    q.items.forEach(item => {
        const wrapper = document.createElement('div');
        wrapper.className = 'slider-container';

        const label = document.createElement('label');
        label.innerHTML = `
            <span>${item.icon}</span>
            <span>${item.name}</span>
            <span class="slider-value">${values[item.name] || 0}</span>
        `;

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = 0;
        slider.max = 100;
        slider.value = values[item.name] || 0;

        slider.oninput = (e) => {
            const val = parseInt(e.target.value);
            let currentTotal = 0;
            q.items.forEach(i => {
                if (i.name !== item.name) currentTotal += parseInt(values[i.name] || 0);
            });

            if (currentTotal + val > 100) {
                e.target.value = 100 - currentTotal;
            }
            values[item.name] = parseInt(e.target.value);
            answers[q.id] = values;
            label.querySelector('.slider-value').textContent = e.target.value;
            updateTotal();
        };

        wrapper.appendChild(label);
        wrapper.appendChild(slider);
        multiContainer.appendChild(wrapper);
    });

    container.appendChild(multiContainer);
}

// Grid type (subjects, music)
function renderGrid(q) {
    const grid = document.createElement('div');
    grid.className = 'grid-options';

    q.options.forEach(opt => {
        const item = document.createElement('div');
        item.className = 'grid-item';
        const optName = typeof opt === 'object' ? opt.name : opt;
        const optIcon = typeof opt === 'object' ? opt.icon : '';

        if (answers[q.id] === optName) item.classList.add('selected');

        item.innerHTML = optIcon ?
            `<span class="grid-icon">${optIcon}</span>${optName}` :
            optName;

        item.onclick = () => {
            answers[q.id] = optName;
            renderQuestion();
        };
        grid.appendChild(item);
    });

    container.appendChild(grid);
}

// Color picker type
function renderColor(q) {
    const wrapper = document.createElement('div');
    wrapper.className = 'color-picker-wrapper';

    const input = document.createElement('input');
    input.type = 'color';
    input.value = answers[q.id] || '#ff4d6d';

    const preview = document.createElement('div');
    preview.className = 'color-preview';
    preview.textContent = answers[q.id] || '#ff4d6d';

    input.oninput = (e) => {
        answers[q.id] = e.target.value;
        preview.textContent = e.target.value;
    };

    wrapper.appendChild(input);
    wrapper.appendChild(preview);
    container.appendChild(wrapper);
}

// Ice cream type
function renderIceCream(q) {
    const wrapper = document.createElement('div');
    wrapper.className = 'ice-cream-container';

    q.options.forEach(opt => {
        const tub = document.createElement('div');
        tub.className = 'ice-cream-tub';
        tub.style.backgroundColor = opt.color;

        if (answers[q.id] === opt.name) tub.classList.add('selected');

        tub.innerHTML = `
            <span class="ice-icon">${opt.icon}</span>
            <span>${opt.name}</span>
        `;

        tub.onclick = () => {
            answers[q.id] = opt.name;
            renderQuestion();
        };

        wrapper.appendChild(tub);
    });

    container.appendChild(wrapper);
}

// Clock type
function renderClock(q) {
    const wrapper = document.createElement('div');
    wrapper.className = 'clock-wrapper';

    const display = document.createElement('div');
    display.className = 'clock-display';
    display.textContent = formatTime(answers[q.id] || '22:00');

    const input = document.createElement('input');
    input.type = 'time';
    input.className = 'clock-input';
    input.value = answers[q.id] || '22:00';

    input.onchange = (e) => {
        answers[q.id] = e.target.value;
        display.textContent = formatTime(e.target.value);
    };

    wrapper.appendChild(display);
    wrapper.appendChild(input);
    container.appendChild(wrapper);
}

function formatTime(time) {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
}

// Battery type
function renderBattery(q) {
    const wrapper = document.createElement('div');
    wrapper.className = 'battery-wrapper';

    const labels = document.createElement('div');
    labels.className = 'battery-label';
    labels.textContent = 'Click to fill your social battery';
    wrapper.appendChild(labels);

    const battery = document.createElement('div');
    battery.className = 'battery-container';
    const segments = 3;
    const colors = ['red', 'yellow', 'green'];
    const levelLabels = ['Low Energy 😴', 'Medium Energy 😊', 'High Energy 🔥'];

    for (let i = 0; i < segments; i++) {
        const seg = document.createElement('div');
        seg.className = 'battery-segment';

        // Fill based on current answer
        if (answers[q.id] > i) {
            seg.classList.add('active', colors[i]);
        }

        seg.onclick = () => {
            answers[q.id] = i + 1;
            labels.textContent = levelLabels[i];
            renderQuestion();
        };
        battery.appendChild(seg);
    }

    if (answers[q.id]) {
        labels.textContent = levelLabels[answers[q.id] - 1];
    }

    wrapper.appendChild(battery);
    container.appendChild(wrapper);
}

// Season type
function renderSeason(q) {
    const seasonContainer = document.createElement('div');
    seasonContainer.className = 'season-container';

    q.options.forEach(opt => {
        const item = document.createElement('div');
        item.className = 'season-item';
        if (answers[q.id] === opt.name) item.classList.add('selected');

        item.innerHTML = `
            <div class="season-icon">${opt.icon}</div>
            <div class="season-name">${opt.name}</div>
        `;

        item.onclick = () => {
            answers[q.id] = opt.name;
            renderQuestion();
        };

        seasonContainer.appendChild(item);
    });

    container.appendChild(seasonContainer);
}

// Rank type with drag and drop
function renderRank(q) {
    const rankContainer = document.createElement('div');
    rankContainer.className = 'rank-container';

    const instruction = document.createElement('p');
    instruction.className = 'rank-instruction';
    instruction.textContent = '↕️ Drag to reorder (1 = favorite)';
    rankContainer.appendChild(instruction);

    const list = document.createElement('ul');
    list.className = 'rank-list';
    list.id = 'rankList';

    // Use saved order or default
    const items = answers[q.id] || q.options;

    items.forEach((opt, idx) => {
        const li = document.createElement('li');
        li.className = 'rank-item';
        li.setAttribute('data-value', opt);
        li.innerHTML = `
            <span class="rank-number">${idx + 1}</span>
            <span>${opt}</span>
            <span class="rank-handle">☰</span>
        `;
        list.appendChild(li);
    });

    rankContainer.appendChild(list);
    container.appendChild(rankContainer);

    // Initialize Sortable
    if (typeof Sortable !== 'undefined') {
        new Sortable(list, {
            animation: 150,
            handle: '.rank-item',
            onEnd: function () {
                const newOrder = [];
                list.querySelectorAll('.rank-item').forEach((item, idx) => {
                    newOrder.push(item.getAttribute('data-value'));
                    item.querySelector('.rank-number').textContent = idx + 1;
                });
                answers[q.id] = newOrder;
            }
        });
    }
}

// Binary type
function renderBinary(q) {
    const binaryContainer = document.createElement('div');
    binaryContainer.className = 'binary-container';

    q.options.forEach(opt => {
        const option = document.createElement('div');
        option.className = 'binary-option';
        if (answers[q.id] === opt.name) option.classList.add('selected');

        option.innerHTML = `
            <div class="binary-icon">${opt.icon}</div>
            <div class="binary-text">${opt.name}</div>
        `;

        option.onclick = () => {
            answers[q.id] = opt.name;
            renderQuestion();
        };

        binaryContainer.appendChild(option);
    });

    container.appendChild(binaryContainer);
}

// Navigation
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

// Submit data
async function submitData() {
    const payload = {
        gender: answers['gender'],
        gender_pref: answers['gender_pref'],
        grade: answers['grade'],
        age: answers['age'],
        answers: answers
    };

    try {
        nextBtn.disabled = true;
        nextBtn.innerHTML = 'Submitting...';

        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            if (successModal) {
                successModal.classList.add('show');
            } else {
                alert('Submitted successfully!');
                window.location.href = '/';
            }
        } else {
            const data = await response.json();
            alert('Error: ' + (data.message || 'Failed to submit'));
            nextBtn.disabled = false;
            nextBtn.innerHTML = 'Submit <span class="btn-icon">✓</span>';
        }
    } catch (e) {
        console.error(e);
        alert('Error submitting data. Please try again.');
        nextBtn.disabled = false;
        nextBtn.innerHTML = 'Submit <span class="btn-icon">✓</span>';
    }
}

// Initialize
renderQuestion();
