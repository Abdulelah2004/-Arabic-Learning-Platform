// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.querySelector('.close-modal');
const loginForm = document.getElementById('loginForm');
const flashcard = document.getElementById('flashcard');
const flipCardBtn = document.getElementById('flipCard');
const prevCardBtn = document.getElementById('prevCard');
const nextCardBtn = document.getElementById('nextCard');
const currentCardDisplay = document.getElementById('currentCard');
const totalCardsDisplay = document.getElementById('totalCards');
const flashcardProgress = document.getElementById('flashcardProgress');
const questionCount = document.getElementById('question-count');
const scoreDisplay = document.getElementById('score');
const quizProgress = document.getElementById('quizProgress');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const nextQuestionBtn = document.getElementById('nextQuestion');
const resultContainer = document.getElementById('resultContainer');
const finalScoreDisplay = document.getElementById('finalScore');
const quizFeedback = document.getElementById('quizFeedback');
const restartQuizBtn = document.getElementById('restartQuiz');
const currentLetterDisplay = document.getElementById('currentLetter');
const letterNameDisplay = document.getElementById('letterName');
const letterPronunciationDisplay = document.getElementById('letterPronunciation');
const letterGrid = document.querySelector('.letter-grid');
const writingCanvas = document.getElementById('writingCanvas');
const clearCanvasBtn = document.getElementById('clearCanvas');
const brushSizeInput = document.getElementById('brushSize');
const inkColorInput = document.getElementById('inkColor');
const wordsLearnedDisplay = document.getElementById('wordsLearned');
const lessonsCompletedDisplay = document.getElementById('lessonsCompleted');
const streakDaysDisplay = document.getElementById('streakDays');

// Theme Toggle
function toggleTheme() {
    body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    
    if (body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light-mode');
    }
}

// Check saved theme preference
function checkTheme() {
    const savedTheme = localStorage.getItem('theme');
    const icon = themeToggle.querySelector('i');
    
    if (savedTheme === 'dark-mode' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
}

// Login Modal
function openModal() {
    loginModal.style.display = 'flex';
}

function closeModalHandler() {
    loginModal.style.display = 'none';
}

// Flashcards Data
const flashcardsData = [
    { 
        english: "Hello", 
        arabic: "مرحبا", 
        pronunciation: "marhaba", 
        example: "مرحبا، كيف حالك؟ (Hello, how are you?)"
    },
    { 
        english: "Goodbye", 
        arabic: "مع السلامة", 
        pronunciation: "ma'a as-salama", 
        example: "مع السلامة، أراك غداً (Goodbye, see you tomorrow)"
    },
    { 
        english: "Thank you", 
        arabic: "شكرا", 
        pronunciation: "shukran", 
        example: "شكرا لك على المساعدة (Thank you for the help)"
    },
    { 
        english: "Please", 
        arabic: "من فضلك", 
        pronunciation: "min fadlik", 
        example: "من فضلك، أعطني الكتاب (Please, give me the book)"
    },
    { 
        english: "Yes", 
        arabic: "نعم", 
        pronunciation: "na'am", 
        example: "نعم، أنا أفهم (Yes, I understand)"
    },
    { 
        english: "No", 
        arabic: "لا", 
        pronunciation: "la", 
        example: "لا، أنا لا أعرف (No, I don't know)"
    },
    { 
        english: "Water", 
        arabic: "ماء", 
        pronunciation: "maa'", 
        example: "أريد كوب من الماء (I want a glass of water)"
    },
    { 
        english: "Food", 
        arabic: "طعام", 
        pronunciation: "ta'aam", 
        example: "الطعام لذيذ (The food is delicious)"
    },
    { 
        english: "House", 
        arabic: "بيت", 
        pronunciation: "bayt", 
        example: "هذا بيتي (This is my house)"
    },
    { 
        english: "Book", 
        arabic: "كتاب", 
        pronunciation: "kitaab", 
        example: "أقرأ كتاباً جديداً (I'm reading a new book)"
    }
];

let currentCardIndex = 0;

// Update Flashcard
function updateFlashcard() {
    const card = flashcardsData[currentCardIndex];
    document.getElementById('englishWord').textContent = card.english;
    document.getElementById('arabicWord').textContent = card.arabic;
    document.getElementById('pronunciation').textContent = card.pronunciation;
    document.getElementById('example').textContent = card.example;
    
    // Reset card to front
    flashcard.classList.remove('flipped');
    
    // Update progress
    currentCardDisplay.textContent = currentCardIndex + 1;
    totalCardsDisplay.textContent = flashcardsData.length;
    flashcardProgress.style.width = `${((currentCardIndex + 1) / flashcardsData.length) * 100}%`;
}

// Flip Card
function flipCard() {
    flashcard.classList.toggle('flipped');
}

// Next Card
function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % flashcardsData.length;
    updateFlashcard();
}

// Previous Card
function prevCard() {
    currentCardIndex = (currentCardIndex - 1 + flashcardsData.length) % flashcardsData.length;
    updateFlashcard();
}

// Quiz Data
const quizQuestions = [
    {
        question: "What does \"مرحبا\" mean?",
        options: ["Thank you", "Hello", "Goodbye", "Please"],
        correct: 1
    },
    {
        question: "How do you say \"Thank you\" in Arabic?",
        options: ["مع السلامة", "من فضلك", "شكرا", "نعم"],
        correct: 2
    },
    {
        question: "What is the Arabic word for \"book\"?",
        options: ["بيت", "ماء", "طعام", "كتاب"],
        correct: 3
    },
    {
        question: "Which of these means \"no\" in Arabic?",
        options: ["نعم", "لا", "من فضلك", "شكرا"],
        correct: 1
    },
    {
        question: "What does \"مع السلامة\" mean?",
        options: ["Hello", "Thank you", "Goodbye", "Please"],
        correct: 2
    },
    {
        question: "How do you say \"water\" in Arabic?",
        options: ["طعام", "ماء", "كتاب", "بيت"],
        correct: 1
    },
    {
        question: "What is the correct pronunciation of \"شكرا\"?",
        options: ["maa'", "shukran", "marhaba", "kitaab"],
        correct: 1
    },
    {
        question: "Which phrase would you use to get someone's attention politely?",
        options: ["نعم", "مع السلامة", "من فضلك", "مرحبا"],
        correct: 2
    }
];

let currentQuestionIndex = 0;
let quizScore = 0;
let selectedOptionIndex = null;

// Update Quiz
function updateQuiz() {
    const question = quizQuestions[currentQuestionIndex];
    questionElement.textContent = question.question;
    
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionElement);
    });
    
    questionCount.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    scoreDisplay.textContent = `Score: ${quizScore}`;
    quizProgress.style.width = `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`;
    nextQuestionBtn.disabled = true;
    selectedOptionIndex = null;
}

// Select Option
function selectOption(index) {
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    
    options[index].classList.add('selected');
    selectedOptionIndex = index;
    nextQuestionBtn.disabled = false;
}

// Next Question
function nextQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    // Check answer
    if (selectedOptionIndex === question.correct) {
        options[selectedOptionIndex].classList.add('correct');
        quizScore++;
        scoreDisplay.textContent = `Score: ${quizScore}`;
    } else {
        options[selectedOptionIndex].classList.add('incorrect');
        options[question.correct].classList.add('correct');
    }
    
    // Disable options
    options.forEach(opt => opt.onclick = null);
    
    // Update next button
    if (currentQuestionIndex < quizQuestions.length - 1) {
        nextQuestionBtn.textContent = 'Next';
        nextQuestionBtn.onclick = function() {
            currentQuestionIndex++;
            updateQuiz();
            this.textContent = currentQuestionIndex === quizQuestions.length - 1 ? 'Submit' : 'Next';
            this.disabled = true;
        };
    } else {
        nextQuestionBtn.textContent = 'Show Results';
        nextQuestionBtn.onclick = showResults;
    }
}

// Show Results
function showResults() {
    document.querySelector('.question-container').style.display = 'none';
    nextQuestionBtn.style.display = 'none';
    
    resultContainer.style.display = 'block';
    const percentage = Math.round((quizScore / quizQuestions.length) * 100);
    finalScoreDisplay.textContent = `${percentage}%`;
    
    // Animate progress ring
    const circle = document.querySelector('.progress-ring-circle');
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
    setTimeout(() => {
        circle.style.strokeDashoffset = offset;
    }, 100);
    
    // Set feedback
    if (percentage >= 80) {
        quizFeedback.textContent = "Excellent! You have a strong grasp of basic Arabic vocabulary.";
    } else if (percentage >= 60) {
        quizFeedback.textContent = "Good job! You're making progress with Arabic vocabulary.";
    } else if (percentage >= 40) {
        quizFeedback.textContent = "Keep practicing! Review the flashcards to improve your vocabulary.";
    } else {
        quizFeedback.textContent = "Don't worry! Learning a new language takes time. Try the lessons first.";
    }
}

// Restart Quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    selectedOptionIndex = null;
    
    document.querySelector('.question-container').style.display = 'block';
    nextQuestionBtn.style.display = 'block';
    nextQuestionBtn.textContent = 'Next';
    resultContainer.style.display = 'none';
    
    updateQuiz();
}

// Arabic Letters Data
const arabicLetters = [
    { letter: "ا", name: "Alif", pronunciation: "/ʔaː/" },
    { letter: "ب", name: "Ba", pronunciation: "/b/" },
    { letter: "ت", name: "Ta", pronunciation: "/t/" },
    { letter: "ث", name: "Tha", pronunciation: "/θ/" },
    { letter: "ج", name: "Jeem", pronunciation: "/d͡ʒ/" },
    { letter: "ح", name: "Ha", pronunciation: "/ħ/" },
    { letter: "خ", name: "Kha", pronunciation: "/x/" },
    { letter: "د", name: "Dal", pronunciation: "/d/" },
    { letter: "ذ", name: "Dhal", pronunciation: "/ð/" },
    { letter: "ر", name: "Ra", pronunciation: "/r/" },
    { letter: "ز", name: "Zay", pronunciation: "/z/" },
    { letter: "س", name: "Seen", pronunciation: "/s/" },
    { letter: "ش", name: "Sheen", pronunciation: "/ʃ/" },
    { letter: "ص", name: "Sad", pronunciation: "/sˤ/" },
    { letter: "ض", name: "Dad", pronunciation: "/dˤ/" },
    { letter: "ط", name: "Ta", pronunciation: "/tˤ/" },
    { letter: "ظ", name: "Dha", pronunciation: "/ðˤ/" },
    { letter: "ع", name: "Ayn", pronunciation: "/ʕ/" },
    { letter: "غ", name: "Ghayn", pronunciation: "/ɣ/" },
    { letter: "ف", name: "Fa", pronunciation: "/f/" },
    { letter: "ق", name: "Qaf", pronunciation: "/q/" },
    { letter: "ك", name: "Kaf", pronunciation: "/k/" },
    { letter: "ل", name: "Lam", pronunciation: "/l/" },
    { letter: "م", name: "Meem", pronunciation: "/m/" },
    { letter: "ن", name: "Noon", pronunciation: "/n/" },
    { letter: "ه", name: "Ha", pronunciation: "/h/" },
    { letter: "و", name: "Waw", pronunciation: "/w/, /uː/" },
    { letter: "ي", name: "Ya", pronunciation: "/j/, /iː/" }
];

// Select Letter
function selectLetter(letter, name, pronunciation) {
    currentLetterDisplay.textContent = letter;
    letterNameDisplay.textContent = name;
    letterPronunciationDisplay.textContent = pronunciation;
    clearCanvas();
    
    // Update active button
    const buttons = document.querySelectorAll('.letter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// Initialize Letter Grid
function initLetterGrid() {
    arabicLetters.forEach(letter => {
        const button = document.createElement('button');
        button.className = 'letter-btn';
        button.textContent = letter.letter;
        button.onclick = () => selectLetter(letter.letter, letter.name, letter.pronunciation);
        letterGrid.appendChild(button);
    });
    
    // Select first letter by default
    if (arabicLetters.length > 0) {
        selectLetter(arabicLetters[0].letter, arabicLetters[0].name, arabicLetters[0].pronunciation);
        letterGrid.firstChild.classList.add('active');
    }
}

// Initialize Writing Canvas
function initCanvas() {
    const ctx = writingCanvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    // Set canvas background to white
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, writingCanvas.width, writingCanvas.height);
    ctx.strokeStyle = inkColorInput.value;
    ctx.lineWidth = brushSizeInput.value;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Mouse Event Handlers
    writingCanvas.addEventListener('mousedown', startDrawing);
    writingCanvas.addEventListener('mousemove', draw);
    writingCanvas.addEventListener('mouseup', stopDrawing);
    writingCanvas.addEventListener('mouseout', stopDrawing);
    
    // Touch Event Handlers
    writingCanvas.addEventListener('touchstart', handleTouchStart);
    writingCanvas.addEventListener('touchmove', handleTouchMove);
    writingCanvas.addEventListener('touchend', handleTouchEnd);
    
    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = getPosition(e);
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        const [x, y] = getPosition(e);
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        lastX = x;
        lastY = y;
    }
    
    function stopDrawing() {
        isDrawing = false;
    }
    
    function getPosition(e) {
        const rect = writingCanvas.getBoundingClientRect();
        let x, y;
        
        if (e.type.includes('touch')) {
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }
        
        return [x, y];
    }
    
    function handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        writingCanvas.dispatchEvent(mouseEvent);
    }
    
    function handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        writingCanvas.dispatchEvent(mouseEvent);
    }
    
    function handleTouchEnd(e) {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mouseup', {});
        writingCanvas.dispatchEvent(mouseEvent);
    }
    
    // Clear Canvas
    clearCanvasBtn.addEventListener('click', clearCanvas);
    
    function clearCanvas() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, writingCanvas.width, writingCanvas.height);
        ctx.strokeStyle = inkColorInput.value;
        ctx.lineWidth = brushSizeInput.value;
    }
    
    // Update brush settings
    brushSizeInput.addEventListener('input', () => {
        ctx.lineWidth = brushSizeInput.value;
    });
    
    inkColorInput.addEventListener('input', () => {
        ctx.strokeStyle = inkColorInput.value;
    });
}

// Lessons Data
const lessonsData = [
    {
        title: "Arabic Alphabet",
        icon: "fas fa-font",
        description: "Learn all 28 letters of the Arabic alphabet with pronunciation and writing.",
        progress: 0
    },
    {
        title: "Greetings",
        icon: "fas fa-handshake",
        description: "Essential Arabic greetings and phrases for everyday conversations.",
        progress: 0
    },
    {
        title: "Numbers",
        icon: "fas fa-calculator",
        description: "Learn Arabic numbers from 1 to 100 and how to use them in sentences.",
        progress: 0
    },
    {
        title: "Basic Verbs",
        icon: "fas fa-running",
        description: "Common Arabic verbs for daily activities with conjugation examples.",
        progress: 0
    },
    {
        title: "Family Members",
        icon: "fas fa-users",
        description: "Learn vocabulary for family relationships and how to talk about your family.",
        progress: 0
    },
    {
        title: "Food & Dining",
        icon: "fas fa-utensils",
        description: "Arabic words for common foods, drinks, and restaurant phrases.",
        progress: 0
    }
];

// Initialize Lessons
function initLessons() {
    const lessonsGrid = document.querySelector('.lessons-grid');
    
    lessonsData.forEach(lesson => {
        const lessonCard = document.createElement('div');
        lessonCard.className = 'lesson-card';
        lessonCard.innerHTML = `
            <div class="lesson-icon">
                <i class="${lesson.icon}"></i>
            </div>
            <h3>${lesson.title}</h3>
            <p>${lesson.description}</p>
            <div class="lesson-progress">
                <div class="progress-bar" style="width: ${lesson.progress}%"></div>
            </div>
        `;
        lessonCard.addEventListener('click', () => showLesson(lesson.title));
        lessonsGrid.appendChild(lessonCard);
    });
}

// Show Lesson
function showLesson(title) {
    alert(`Opening lesson: ${title}\n\nIn a full implementation, this would show detailed lesson content with exercises.`);
}

// Initialize Progress Stats
function initProgressStats() {
    // Simulate progress data
    wordsLearnedDisplay.textContent = Math.floor(Math.random() * 50) + 10;
    lessonsCompletedDisplay.textContent = Math.floor(Math.random() * 5) + 1;
    streakDaysDisplay.textContent = Math.floor(Math.random() * 10) + 1;
    
    // Initialize chart
    const ctx = document.getElementById('progressChart').getContext('2d');
    const progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Words Learned',
                data: [5, 15, 22, 30, 38, 45],
                borderColor: '#2c786c',
                backgroundColor: 'rgba(44, 120, 108, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Event Listeners
themeToggle.addEventListener('click', toggleTheme);
loginBtn.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalHandler);
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        closeModalHandler();
    }
});
flipCardBtn.addEventListener('click', flipCard);
nextCardBtn.addEventListener('click', nextCard);
prevCardBtn.addEventListener('click', prevCard);
restartQuizBtn.addEventListener('click', restartQuiz);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkTheme();
    updateFlashcard();
    updateQuiz();
    initLetterGrid();
    initCanvas();
    initLessons();
    initProgressStats();
    
    // Login Form Submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login functionality would be implemented in a full application.');
        closeModalHandler();
    });
});