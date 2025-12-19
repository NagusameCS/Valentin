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

// Heart cursor click effect
document.addEventListener('click', function(e) {
    const pulse = document.createElement('div');
    pulse.className = 'click-pulse';
    pulse.style.left = e.clientX + 'px';
    pulse.style.top = e.clientY + 'px';
    document.body.appendChild(pulse);
    setTimeout(() => pulse.remove(), 600);
});

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
    container.style.animation = 'fadeInUp 0.4s ease';

    const q = allQuestions[currentQuestionIndex];

    const title = document.createElement('h2');
    title.textContent = q.question;
    title.className = 'question-title';
    container.appendChild(title);

    if (q.subtitle) {
        const subtitle = document.createElement('p');
        subtitle.className = 'question-subtitle';
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

// Select type (gender, preferences) - AUTO ADVANCE
function renderSelect(q) {
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn animate-in';
        btn.style.animationDelay = `${idx * 0.1}s`;
        if (answers[q.id] === opt) btn.classList.add('selected');

        btn.innerHTML = `
            <span class="option-icon">${q.icons ? q.icons[idx] : ''}</span>
            <span>${opt}</span>
        `;

        btn.onclick = () => {
            answers[q.id] = opt;
            btn.classList.add('selected', 'pop');
            setTimeout(() => nextQuestion(), 400);
        };
        container.appendChild(btn);
    });
}

// Number type (grade, age)
function renderNumber(q) {
    const wrapper = document.createElement('div');
    wrapper.className = 'number-wrapper animate-in';

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
    hint.className = 'number-hint';
    hint.textContent = `Enter a number between ${q.min} and ${q.max}`;

    wrapper.appendChild(input);
    wrapper.appendChild(hint);
    container.appendChild(wrapper);
}

// Map type - FIXED
function renderMap(q) {
    const mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    container.appendChild(mapDiv);

    const instruction = document.createElement('p');
    instruction.className = 'map-instruction';
    instruction.textContent = '📍 Click on the map to place your pin';
    container.appendChild(instruction);

    // Use requestAnimationFrame for better timing
    requestAnimationFrame(() => {
        if (mapInstance) {
            mapInstance.remove();
            mapInstance = null;
        }

        try {
            mapInstance = L.map('map', {
                center: [40, -95],
                zoom: 4,
                zoomControl: true,
                attributionControl: true
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap',
                maxZoom: 19
            }).addTo(mapInstance);

            // Invalidate size after render
            setTimeout(() => {
                mapInstance.invalidateSize();
            }, 100);

            let marker = null;
            if (answers[q.id]) {
                marker = L.marker([answers[q.id].lat, answers[q.id].lng]).addTo(mapInstance);
                mapInstance.setView([answers[q.id].lat, answers[q.id].lng], 8);
            }

            mapInstance.on('click', function (e) {
                if (marker) mapInstance.removeLayer(marker);
                marker = L.marker(e.latlng).addTo(mapInstance);
                answers[q.id] = { lat: e.latlng.lat, lng: e.latlng.lng };
                instruction.textContent = `📍 Location: ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`;
                instruction.classList.add('pulse-text');
            });
        } catch (err) {
            console.error('Map error:', err);
            instruction.textContent = '⚠️ Map loading error. Please try again.';
        }
    });
}

// Slider type
function renderSlider(q) {
    const wrapper = document.createElement('div');
    wrapper.className = 'slider-wrapper animate-in';

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = 0;
    slider.max = 100;
    slider.value = answers[q.id] || 50;

    const valueDisplay = document.createElement('div');
    valueDisplay.className = 'slider-value-display';
    valueDisplay.textContent = (answers[q.id] || 50) + '%';

    slider.oninput = (e) => {
        answers[q.id] = parseInt(e.target.value);
        valueDisplay.textContent = e.target.value + '%';
        valueDisplay.classList.add('bounce');
        setTimeout(() => valueDisplay.classList.remove('bounce'), 200);
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
    multiContainer.className = 'multi-slider-container animate-in';

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

    q.items.forEach((item, idx) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'slider-container animate-in';
        wrapper.style.animationDelay = `${idx * 0.1}s`;

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

// Grid type (subjects, music) - AUTO ADVANCE
function renderGrid(q) {
    const grid = document.createElement('div');
    grid.className = 'grid-options';

    q.options.forEach((opt, idx) => {
        const item = document.createElement('div');
        item.className = 'grid-item animate-in';
        item.style.animationDelay = `${idx * 0.05}s`;
        const optName = typeof opt === 'object' ? opt.name : opt;
        const optIcon = typeof opt === 'object' ? opt.icon : '';

        if (answers[q.id] === optName) item.classList.add('selected');

        item.innerHTML = optIcon ?
            `<span class="grid-icon">${optIcon}</span>${optName}` :
            optName;

        item.onclick = () => {
            answers[q.id] = optName;
            item.classList.add('selected', 'pop');
            setTimeout(() => nextQuestion(), 400);
        };
        grid.appendChild(item);
    });

    container.appendChild(grid);
}

// Color picker type - HEART SHAPE
function renderColor(q) {
    const wrapper = document.createElement('div');
    wrapper.className = 'color-picker-wrapper animate-in';

    const heartContainer = document.createElement('div');
    heartContainer.className = 'heart-color-container';

    const input = document.createElement('input');
    input.type = 'color';
    input.id = 'colorInput';
    input.value = answers[q.id] || '#ff4d6d';

    const heartLabel = document.createElement('label');
    heartLabel.className = 'heart-color-picker';
    heartLabel.htmlFor = 'colorInput';
    heartLabel.style.setProperty('--heart-color', answers[q.id] || '#ff4d6d');

    const preview = document.createElement('div');
    preview.className = 'color-preview';
    preview.textContent = answers[q.id] || '#ff4d6d';

    input.oninput = (e) => {
        answers[q.id] = e.target.value;
        preview.textContent = e.target.value;
        heartLabel.style.setProperty('--heart-color', e.target.value);
        heartLabel.classList.add('pulse');
        setTimeout(() => heartLabel.classList.remove('pulse'), 300);
    };

    heartContainer.appendChild(input);
    heartContainer.appendChild(heartLabel);
    wrapper.appendChild(heartContainer);
    wrapper.appendChild(preview);
    container.appendChild(wrapper);
}

// Ice cream type - TUB STYLING
function renderIceCream(q) {
    const wrapper = document.createElement('div');
    wrapper.className = 'ice-cream-container';

    q.options.forEach((opt, idx) => {
        const tub = document.createElement('div');
        tub.className = 'ice-cream-tub animate-in';
        tub.style.animationDelay = `${idx * 0.1}s`;
        tub.setAttribute('data-flavor', opt.name.toLowerCase());

        if (answers[q.id] === opt.name) tub.classList.add('selected');

        const scoops = document.createElement('div');
        scoops.className = 'ice-cream-scoops';
        scoops.style.backgroundColor = opt.color;

        const tubBody = document.createElement('div');
        tubBody.className = 'ice-cream-tub-body';

        const label = document.createElement('span');
        label.className = 'ice-cream-label';
        label.textContent = opt.name;

        tub.appendChild(scoops);
        tub.appendChild(tubBody);
        tub.appendChild(label);

        tub.onclick = () => {
            answers[q.id] = opt.name;
            tub.classList.add('selected', 'wobble');
            setTimeout(() => nextQuestion(), 500);
        };

        wrapper.appendChild(tub);
    });

    container.appendChild(wrapper);
}

// Clock type - ANALOG CLOCK
function renderClock(q) {
    const wrapper = document.createElement('div');
    wrapper.className = 'clock-wrapper animate-in';

    // Analog clock face
    const clockFace = document.createElement('div');
    clockFace.className = 'analog-clock';

    // Hour markers
    for (let i = 1; i <= 12; i++) {
        const marker = document.createElement('div');
        marker.className = 'clock-marker';
        marker.style.transform = `rotate(${i * 30}deg)`;
        marker.innerHTML = `<span style="transform: rotate(${-i * 30}deg)">${i}</span>`;
        clockFace.appendChild(marker);
    }

    // Center dot
    const centerDot = document.createElement('div');
    centerDot.className = 'clock-center';
    clockFace.appendChild(centerDot);

    // Hour hand
    const hourHand = document.createElement('div');
    hourHand.className = 'clock-hand hour-hand';
    clockFace.appendChild(hourHand);

    // Minute hand
    const minuteHand = document.createElement('div');
    minuteHand.className = 'clock-hand minute-hand';
    clockFace.appendChild(minuteHand);

    // Time display
    const display = document.createElement('div');
    display.className = 'clock-display';

    // Hidden input for storing value
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.value = answers[q.id] || '22:00';

    // Parse initial time
    let [hours, minutes] = (answers[q.id] || '22:00').split(':').map(Number);
    let dragging = null;

    function updateClock() {
        const hourDeg = (hours % 12) * 30 + minutes * 0.5;
        const minDeg = minutes * 6;
        hourHand.style.transform = `rotate(${hourDeg}deg)`;
        minuteHand.style.transform = `rotate(${minDeg}deg)`;

        const h12 = hours % 12 || 12;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        display.textContent = `${h12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        answers[q.id] = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    function getAngleFromCenter(e, rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = e.clientX - centerX;
        const y = e.clientY - centerY;
        let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
        if (angle < 0) angle += 360;
        return angle;
    }

    hourHand.addEventListener('mousedown', (e) => { dragging = 'hour'; e.preventDefault(); });
    minuteHand.addEventListener('mousedown', (e) => { dragging = 'minute'; e.preventDefault(); });

    document.addEventListener('mousemove', (e) => {
        if (!dragging) return;
        const rect = clockFace.getBoundingClientRect();
        const angle = getAngleFromCenter(e, rect);

        if (dragging === 'hour') {
            hours = Math.floor(angle / 30) % 12;
            if (hours === 0) hours = 12;
            // Toggle AM/PM based on current setting
            if (answers[q.id]) {
                const currentHour = parseInt(answers[q.id].split(':')[0]);
                if (currentHour >= 12) hours += 12;
                if (hours === 24) hours = 12;
            }
        } else {
            minutes = Math.round(angle / 6) % 60;
        }
        updateClock();
    });

    document.addEventListener('mouseup', () => { dragging = null; });

    // AM/PM toggle
    const ampmToggle = document.createElement('div');
    ampmToggle.className = 'ampm-toggle';

    const amBtn = document.createElement('button');
    amBtn.type = 'button';
    amBtn.textContent = 'AM';
    amBtn.className = hours < 12 ? 'active' : '';
    amBtn.onclick = () => {
        if (hours >= 12) hours -= 12;
        amBtn.classList.add('active');
        pmBtn.classList.remove('active');
        updateClock();
    };

    const pmBtn = document.createElement('button');
    pmBtn.type = 'button';
    pmBtn.textContent = 'PM';
    pmBtn.className = hours >= 12 ? 'active' : '';
    pmBtn.onclick = () => {
        if (hours < 12) hours += 12;
        pmBtn.classList.add('active');
        amBtn.classList.remove('active');
        updateClock();
    };

    ampmToggle.appendChild(amBtn);
    ampmToggle.appendChild(pmBtn);

    const instruction = document.createElement('p');
    instruction.className = 'clock-instruction';
    instruction.textContent = '🕐 Drag the hands to set time';

    wrapper.appendChild(clockFace);
    wrapper.appendChild(display);
    wrapper.appendChild(ampmToggle);
    wrapper.appendChild(instruction);
    container.appendChild(wrapper);

    updateClock();
}

// Battery type - VERTICAL with animations
function renderBattery(q) {
    const wrapper = document.createElement('div');
    wrapper.className = 'battery-wrapper vertical animate-in';

    const labels = document.createElement('div');
    labels.className = 'battery-label';
    labels.textContent = 'Click to fill your social battery';
    wrapper.appendChild(labels);

    const batteryOuter = document.createElement('div');
    batteryOuter.className = 'battery-outer-vertical';

    const battery = document.createElement('div');
    battery.className = 'battery-container-vertical';

    const segments = 5;
    const levelLabels = ['Empty 😴', 'Low 😐', 'Medium 😊', 'High 🔥', 'Maximum ⚡'];

    for (let i = segments - 1; i >= 0; i--) {
        const seg = document.createElement('div');
        seg.className = 'battery-segment-vertical';
        seg.setAttribute('data-level', i);

        if (answers[q.id] && answers[q.id] > i) {
            seg.classList.add('active');
        }

        seg.onclick = () => {
            answers[q.id] = i + 1;
            labels.textContent = levelLabels[i];
            // Animate fill
            const allSegs = battery.querySelectorAll('.battery-segment-vertical');
            allSegs.forEach((s, idx) => {
                const lvl = parseInt(s.getAttribute('data-level'));
                if (lvl <= i) {
                    s.classList.add('active');
                    s.style.animationDelay = `${(i - lvl) * 0.1}s`;
                } else {
                    s.classList.remove('active');
                }
            });
        };
        battery.appendChild(seg);
    }

    if (answers[q.id]) {
        labels.textContent = levelLabels[answers[q.id] - 1];
    }

    batteryOuter.appendChild(battery);
    wrapper.appendChild(batteryOuter);
    container.appendChild(wrapper);
}

// Season type - AUTO ADVANCE
function renderSeason(q) {
    const seasonContainer = document.createElement('div');
    seasonContainer.className = 'season-container';

    q.options.forEach((opt, idx) => {
        const item = document.createElement('div');
        item.className = 'season-item animate-in';
        item.style.animationDelay = `${idx * 0.1}s`;
        if (answers[q.id] === opt.name) item.classList.add('selected');

        item.innerHTML = `
            <div class="season-icon">${opt.icon}</div>
            <div class="season-name">${opt.name}</div>
        `;

        item.onclick = () => {
            answers[q.id] = opt.name;
            item.classList.add('selected', 'pop');
            setTimeout(() => nextQuestion(), 400);
        };

        seasonContainer.appendChild(item);
    });

    container.appendChild(seasonContainer);
}

// Rank type with drag and drop - FIXED
function renderRank(q) {
    const rankContainer = document.createElement('div');
    rankContainer.className = 'rank-container animate-in';

    const instruction = document.createElement('p');
    instruction.className = 'rank-instruction';
    instruction.textContent = '↕️ Drag items to reorder (1 = favorite)';
    rankContainer.appendChild(instruction);

    const list = document.createElement('ul');
    list.className = 'rank-list';
    list.id = 'rankList';

    // Use saved order or default
    const items = answers[q.id] || [...q.options];

    items.forEach((opt, idx) => {
        const li = document.createElement('li');
        li.className = 'rank-item animate-in';
        li.style.animationDelay = `${idx * 0.1}s`;
        li.setAttribute('data-value', opt);
        li.innerHTML = `
            <span class="rank-number">${idx + 1}</span>
            <span class="rank-text">${opt}</span>
            <span class="rank-handle">⋮⋮</span>
        `;
        list.appendChild(li);
    });

    rankContainer.appendChild(list);
    container.appendChild(rankContainer);

    // Initialize Sortable with better options
    requestAnimationFrame(() => {
        if (typeof Sortable !== 'undefined') {
            new Sortable(list, {
                animation: 200,
                ghostClass: 'rank-ghost',
                chosenClass: 'rank-chosen',
                dragClass: 'rank-drag',
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
        } else {
            console.error('Sortable not loaded');
        }
    });
}

// Binary type - AUTO ADVANCE
function renderBinary(q) {
    const binaryContainer = document.createElement('div');
    binaryContainer.className = 'binary-container';

    q.options.forEach((opt, idx) => {
        const option = document.createElement('div');
        option.className = 'binary-option animate-in';
        option.style.animationDelay = `${idx * 0.15}s`;
        if (answers[q.id] === opt.name) option.classList.add('selected');

        option.innerHTML = `
            <div class="binary-icon">${opt.icon}</div>
            <div class="binary-text">${opt.name}</div>
        `;

        option.onclick = () => {
            answers[q.id] = opt.name;
            option.classList.add('selected', 'pop');
            setTimeout(() => nextQuestion(), 400);
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
        nextBtn.innerHTML = '<span class="loading-spinner"></span> Submitting...';

        const response = await fetch('/sites/valentin/submit', {
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
                window.location.href = '/sites/valentin/';
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
