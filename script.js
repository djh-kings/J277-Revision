/* ============================================
   J277 REVISION TOOL — FRONTEND LOGIC
   Handles: navigation, quiz UI, practice UI
   API integration added separately
   ============================================ */

// ==================== STATE ====================

const state = {
    currentView: 'landing',
    
    // Quiz Mode
    quiz: {
        selectedUnit: null,
        conversationHistory: [],
        isLoading: false
    },
    
    // Exam Practice Mode
    practice: {
        selectedPaper: '2023',
        selectedQuestion: null,
        attemptNumber: 1,
        attempt1Answer: '',
        isLoading: false
    }
};

// ==================== QUESTION DATA ====================
// Maps paper → questions (unit-filtered for 1.1–1.3 scope)
// This will be expanded once the question mapping (task 1.6) is complete

const questionData = {
    '2023': [
        { id: '1', label: 'Q1', topic: 'Data Representation', marks: 10, unit: '1.2', subparts: '(a)–(d)' },
        { id: '2', label: 'Q2', topic: 'Networks', marks: 10, unit: '1.3', subparts: '(a)–(c)' },
        { id: '3', label: 'Q3', topic: 'Images, Sound & Compression', marks: 12, unit: '1.2', subparts: '(a)–(d)' },
        { id: '4', label: 'Q4', topic: 'Security Threats', marks: 8, unit: '1.3', subparts: '(a)–(c)' },
        { id: '5', label: 'Q5', topic: 'Storage & Systems Software', marks: 12, unit: '1.1', subparts: '(a)–(d)' },
        { id: '6', label: 'Q6', topic: 'Legal, Ethical & Privacy (QER)', marks: 8, unit: 'other', subparts: 'Extended response' },
        { id: '7', label: 'Q7', topic: 'Embedded Systems', marks: 10, unit: '1.1', subparts: '(a)–(c)' }
    ],
    '2024': [
        { id: '1', label: 'Q1', topic: 'Binary & Data Representation', marks: 9, unit: '1.2', subparts: '(a)–(c)' },
        { id: '2', label: 'Q2', topic: 'Networks & Protocols', marks: 12, unit: '1.3', subparts: '(a)–(d)' },
        { id: '3', label: 'Q3', topic: 'Storage & Memory', marks: 10, unit: '1.2', subparts: '(a)–(c)' },
        { id: '4', label: 'Q4', topic: 'Systems Architecture', marks: 10, unit: '1.1', subparts: '(a)–(c)' },
        { id: '5', label: 'Q5', topic: 'Security & Network Threats', marks: 10, unit: '1.3', subparts: '(a)–(c)' },
        { id: '6', label: 'Q6', topic: 'Impacts of Technology (QER)', marks: 8, unit: 'other', subparts: 'Extended response' },
        { id: '7', label: 'Q7', topic: 'Programming & Logic', marks: 11, unit: 'other', subparts: '(a)–(d)' }
    ]
};

// Filter to only show in-scope questions (units 1.1, 1.2, 1.3)
function getInScopeQuestions(paper) {
    const validUnits = ['1.1', '1.2', '1.3'];
    return questionData[paper].filter(q => validUnits.includes(q.unit));
}

// Unit display names
const unitNames = {
    '1.1': 'Systems Architecture',
    '1.2': 'Memory & Storage',
    '1.3': 'Networks, Connections & Protocols'
};

// PDF paths
const paperPDFs = {
    '2023': '/papers/j277_01_2023_question_paper.pdf',
    '2024': '/papers/j277_01_2024_question_paper.pdf'
};


// ==================== NAVIGATION ====================

function navigateTo(viewName) {
    // Hide all views
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    
    // Show target view
    const target = document.getElementById(`view-${viewName}`);
    if (target) {
        target.classList.add('active');
        state.currentView = viewName;
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // View-specific setup
    if (viewName === 'practice') {
        renderQuestionList();
        updatePaperPDFLink();
    }
}


// ==================== QUIZ MODE ====================

function selectUnit(unit) {
    state.quiz.selectedUnit = unit;
    state.quiz.conversationHistory = [];
    
    // Hide setup, show chat
    document.getElementById('quiz-setup').style.display = 'none';
    document.getElementById('quiz-chat').style.display = 'flex';
    
    // Set unit label
    document.getElementById('quiz-unit-label').textContent = `Unit ${unit}: ${unitNames[unit]}`;
    
    // Clear previous messages
    const messagesContainer = document.getElementById('quiz-messages');
    messagesContainer.innerHTML = '';
    
    // Show loading while we get the first question from the API
    state.quiz.isLoading = true;
    addLoadingIndicator();
    document.getElementById('quiz-send-btn').disabled = true;
    
    // Call API to start the quiz — no messages yet, just the unit
    callQuizAPI(unit, [])
        .then(reply => {
            removeLoadingIndicator();
            addChatMessage('assistant', reply);
            state.quiz.isLoading = false;
            document.getElementById('quiz-send-btn').disabled = false;
            document.getElementById('quiz-input').focus();
        })
        .catch(err => {
            removeLoadingIndicator();
            addChatMessage('assistant', `Sorry, something went wrong starting the quiz. ${err.message || 'Please try again.'}`);
            state.quiz.isLoading = false;
            document.getElementById('quiz-send-btn').disabled = false;
        });
}

function endQuiz() {
    // Reset and return to setup
    state.quiz.selectedUnit = null;
    state.quiz.conversationHistory = [];
    
    document.getElementById('quiz-chat').style.display = 'none';
    document.getElementById('quiz-setup').style.display = 'block';
}

function addChatMessage(role, content) {
    const messagesContainer = document.getElementById('quiz-messages');
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${role}`;
    
    if (role === 'assistant') {
        // Parse markdown formatting for AI responses
        messageEl.innerHTML = formatFeedback(content);
    } else {
        // Plain text for student messages (safe against XSS)
        messageEl.textContent = content;
    }
    
    messagesContainer.appendChild(messageEl);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Track in history
    state.quiz.conversationHistory.push({ role, content });
}

function addLoadingIndicator() {
    const messagesContainer = document.getElementById('quiz-messages');
    const loading = document.createElement('div');
    loading.className = 'loading-dots';
    loading.id = 'quiz-loading';
    loading.innerHTML = '<span></span><span></span><span></span>';
    messagesContainer.appendChild(loading);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeLoadingIndicator() {
    const loading = document.getElementById('quiz-loading');
    if (loading) loading.remove();
}

function sendQuizMessage() {
    const input = document.getElementById('quiz-input');
    const message = input.value.trim();
    
    if (!message || state.quiz.isLoading) return;
    
    // Add user message to UI and history
    addChatMessage('user', message);
    input.value = '';
    
    // Auto-resize textarea back
    input.style.height = 'auto';
    
    // Show loading
    state.quiz.isLoading = true;
    addLoadingIndicator();
    document.getElementById('quiz-send-btn').disabled = true;
    
    // Build the messages array for the API
    // The conversation history includes the initial system-generated opening,
    // so we need to construct the proper alternating user/assistant format
    const apiMessages = buildQuizAPIMessages();
    
    callQuizAPI(state.quiz.selectedUnit, apiMessages)
        .then(reply => {
            removeLoadingIndicator();
            addChatMessage('assistant', reply);
            state.quiz.isLoading = false;
            document.getElementById('quiz-send-btn').disabled = false;
            document.getElementById('quiz-input').focus();
        })
        .catch(err => {
            removeLoadingIndicator();
            addChatMessage('assistant', `Sorry, something went wrong. ${err.message || 'Please try again.'}`);
            state.quiz.isLoading = false;
            document.getElementById('quiz-send-btn').disabled = false;
            document.getElementById('quiz-input').focus();
        });
}

function handleQuizKeydown(event) {
    // Send on Enter (without Shift)
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendQuizMessage();
    }
}


// ==================== QUIZ API ====================

/**
 * Build the messages array for the Quiz API call.
 * The conversation history tracks both user and assistant messages.
 * For the API, we need proper alternating user/assistant format.
 * The first user message (unit selection) is handled server-side when messages is empty.
 */
function buildQuizAPIMessages() {
    const history = state.quiz.conversationHistory;
    
    if (history.length === 0) return [];
    
    // The first message in history is always the assistant's opening question (from the API).
    // We need to reconstruct the conversation starting with the implicit user unit-selection message.
    const messages = [];
    
    // The server sent the first assistant message in response to an implicit
    // "I'd like to be quizzed on Unit X" user message. We need to include that
    // implicit message so the conversation alternates correctly.
    messages.push({
        role: 'user',
        content: `I'd like to be quizzed on Unit ${state.quiz.selectedUnit}: ${unitNames[state.quiz.selectedUnit]}.`
    });
    
    // Now add all messages from the conversation history
    for (const msg of history) {
        messages.push({
            role: msg.role,
            content: msg.content
        });
    }
    
    return messages;
}

/**
 * Call the Quiz Mode API endpoint.
 * 
 * @param {string} unit - The selected unit ('1.1', '1.2', '1.3')
 * @param {Array} messages - The conversation messages array
 * @returns {Promise<string>} - The assistant's reply text
 */
async function callQuizAPI(unit, messages) {
    const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unit, messages })
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error (${response.status})`);
    }
    
    const data = await response.json();
    return data.reply;
}


// ==================== EXAM PRACTICE MODE ====================

function selectPaper(paper) {
    state.practice.selectedPaper = paper;
    state.practice.selectedQuestion = null;
    
    // Update toggle buttons
    document.querySelectorAll('#paper-toggle .toggle-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.paper === paper);
    });
    
    // Re-render question list
    renderQuestionList();
    updatePaperPDFLink();
}

function renderQuestionList() {
    const container = document.getElementById('question-list');
    const questions = getInScopeQuestions(state.practice.selectedPaper);
    
    container.innerHTML = questions.map(q => `
        <button class="question-btn ${state.practice.selectedQuestion === q.id ? 'selected' : ''}" 
                onclick="selectQuestion('${q.id}')">
            <div class="question-btn-left">
                <span class="question-btn-number">${q.label}</span>
                <span class="question-btn-topic">${q.topic} <span style="color: var(--text-muted); font-size: 0.85rem;">${q.subparts}</span></span>
            </div>
            <span class="question-btn-marks">${q.marks} marks</span>
        </button>
    `).join('');
}

function updatePaperPDFLink() {
    const link = document.getElementById('paper-pdf-link');
    link.href = paperPDFs[state.practice.selectedPaper];
    link.textContent = '';
    link.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="vertical-align: middle; margin-right: 6px;">
            <path d="M4 2H9L12 5V14H4V2Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
            <path d="M9 2V5H12" stroke="currentColor" stroke-width="1.5" fill="none"/>
        </svg>
        View ${state.practice.selectedPaper} Question Paper (PDF)
    `;
}

function selectQuestion(questionId) {
    const questions = getInScopeQuestions(state.practice.selectedPaper);
    const question = questions.find(q => q.id === questionId);
    
    if (!question) return;
    
    state.practice.selectedQuestion = questionId;
    state.practice.attemptNumber = 1;
    state.practice.attempt1Answer = '';
    
    // Hide setup, show session
    document.getElementById('practice-setup').style.display = 'none';
    document.getElementById('practice-session').style.display = 'block';
    
    // Set labels
    document.getElementById('practice-question-label').textContent = 
        `${state.practice.selectedPaper} ${question.label}: ${question.topic}`;
    document.getElementById('practice-attempt-label').textContent = 'Attempt 1 of 2';
    
    // Set question reference
    document.getElementById('practice-question-text').innerHTML = 
        `<strong>${question.label} ${question.subparts}</strong> — ${question.topic} (${question.marks} marks)<br>
        <em style="color: var(--text-muted);">Refer to the question paper PDF for the full question text.</em>`;
    
    // Reset answer area
    document.getElementById('practice-answer').value = '';
    document.getElementById('practice-answer-section').style.display = 'block';
    document.getElementById('practice-feedback').style.display = 'none';
    document.getElementById('practice-submit-btn').disabled = false;
    document.getElementById('practice-submit-btn').textContent = 'Submit Answer';
    
    // Focus answer field
    document.getElementById('practice-answer').focus();
}

function exitPractice() {
    state.practice.selectedQuestion = null;
    state.practice.attemptNumber = 1;
    state.practice.attempt1Answer = '';
    
    document.getElementById('practice-session').style.display = 'none';
    document.getElementById('practice-setup').style.display = 'block';
    
    renderQuestionList();
}

function submitAnswer() {
    const answer = document.getElementById('practice-answer').value.trim();
    
    if (!answer || state.practice.isLoading) return;
    
    // Store attempt 1 answer for sending with attempt 2
    if (state.practice.attemptNumber === 1) {
        state.practice.attempt1Answer = answer;
    }
    
    state.practice.isLoading = true;
    document.getElementById('practice-submit-btn').disabled = true;
    document.getElementById('practice-submit-btn').textContent = 'Marking…';
    
    // Call the practice API
    callPracticeAPI(
        state.practice.selectedPaper,
        state.practice.selectedQuestion,
        answer,
        state.practice.attemptNumber,
        state.practice.attemptNumber === 2 ? state.practice.attempt1Answer : ''
    )
        .then(result => {
            const feedbackPanel = document.getElementById('practice-feedback');
            
            if (state.practice.attemptNumber === 1) {
                // Attempt 1: coaching feedback, no marks
                feedbackPanel.innerHTML = `
                    <h4>Feedback — Attempt 1</h4>
                    <div class="feedback-content">
                        ${formatFeedback(result.reply)}
                    </div>
                    <div class="feedback-actions">
                        <button class="btn-primary" onclick="startAttempt2()">Try Again (Attempt 2)</button>
                        <button class="btn-secondary btn-small" onclick="exitPractice()">Different Question</button>
                    </div>
                `;
            } else {
                // Attempt 2: full marks and feedback
                // Try to extract marks from metadata
                const marksAwarded = result.metadata?.marks_awarded || '?';
                const marksAvailable = result.metadata?.marks_available || '?';
                
                feedbackPanel.innerHTML = `
                    <h4>Marks &amp; Feedback — Attempt 2</h4>
                    <div class="feedback-marks">
                        <span>${marksAwarded}</span>
                        <span class="marks-total">/ ${marksAvailable} marks</span>
                    </div>
                    <div class="feedback-content">
                        ${formatFeedback(result.reply)}
                    </div>
                    <div class="feedback-actions">
                        <button class="btn-primary" onclick="exitPractice()">Next Question</button>
                    </div>
                `;
            }
            
            feedbackPanel.style.display = 'block';
            state.practice.isLoading = false;
            document.getElementById('practice-submit-btn').textContent = 'Submit Answer';
            
            // Hide the answer area after submission to reduce clutter
            document.getElementById('practice-answer-section').style.display = 'none';
            
            // Scroll to feedback
            feedbackPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        })
        .catch(err => {
            const feedbackPanel = document.getElementById('practice-feedback');
            feedbackPanel.innerHTML = `
                <h4>Error</h4>
                <div class="feedback-content">
                    <p>Sorry, something went wrong. ${err.message || 'Please try again.'}</p>
                </div>
                <div class="feedback-actions">
                    <button class="btn-secondary" onclick="retrySubmission()">Try Again</button>
                    <button class="btn-secondary btn-small" onclick="exitPractice()">Different Question</button>
                </div>
            `;
            feedbackPanel.style.display = 'block';
            state.practice.isLoading = false;
            document.getElementById('practice-submit-btn').textContent = 'Submit Answer';
        });
}

function retrySubmission() {
    // Show answer area again so student can resubmit
    document.getElementById('practice-answer-section').style.display = 'block';
    document.getElementById('practice-feedback').style.display = 'none';
    document.getElementById('practice-submit-btn').disabled = false;
}

function startAttempt2() {
    state.practice.attemptNumber = 2;
    
    document.getElementById('practice-attempt-label').textContent = 'Attempt 2 of 2';
    document.getElementById('practice-answer').value = '';
    document.getElementById('practice-answer-section').style.display = 'block';
    document.getElementById('practice-feedback').style.display = 'none';
    document.getElementById('practice-submit-btn').disabled = false;
    document.getElementById('practice-submit-btn').textContent = 'Submit Answer';
    
    document.getElementById('practice-answer').focus();
}


// ==================== PRACTICE API ====================

/**
 * Call the Exam Practice Mode API endpoint.
 * 
 * @param {string} paper - The paper year ('2023', '2024')
 * @param {string} question - The question number ('1', '2', etc.)
 * @param {string} answer - The student's answer text
 * @param {number} attemptNumber - 1 or 2
 * @param {string} attempt1Answer - The student's first attempt (only sent on attempt 2)
 * @returns {Promise<{reply: string, metadata: object}>} - The feedback and metadata
 */
async function callPracticeAPI(paper, question, answer, attemptNumber, attempt1Answer) {
    const response = await fetch('/api/practice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            paper,
            question,
            answer,
            attemptNumber,
            attempt1Answer: attempt1Answer || ''
        })
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error (${response.status})`);
    }
    
    const data = await response.json();
    return {
        reply: data.reply,
        metadata: data.metadata || {}
    };
}

/**
 * Format feedback text for display.
 * Converts markdown-style formatting to HTML for better readability.
 * Handles bold, bullet points, and paragraphs.
 */
function formatFeedback(text) {
    if (!text) return '<p>No feedback received.</p>';
    
    // Split into paragraphs
    const paragraphs = text.split(/\n\n+/);
    
    return paragraphs.map(para => {
        // Check if this paragraph is a list (starts with bullet points or numbered items)
        const lines = para.split('\n');
        const isList = lines.every(line => 
            line.trim() === '' || 
            line.trim().startsWith('•') || 
            line.trim().startsWith('- ') ||
            line.trim().startsWith('* ') ||
            /^\d+\./.test(line.trim())
        );
        
        if (isList) {
            const items = lines
                .filter(line => line.trim() !== '')
                .map(line => {
                    // Strip bullet/number prefix
                    let content = line.trim()
                        .replace(/^[•\-\*]\s*/, '')
                        .replace(/^\d+\.\s*/, '');
                    content = applyInlineFormatting(content);
                    return `<li>${content}</li>`;
                });
            return `<ul>${items.join('')}</ul>`;
        }
        
        // Regular paragraph
        let content = applyInlineFormatting(para.replace(/\n/g, ' '));
        return `<p>${content}</p>`;
    }).join('');
}

/**
 * Apply inline markdown formatting (bold, italic).
 */
function applyInlineFormatting(text) {
    // Bold: **text**
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Italic: *text*
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
    return text;
}


// ==================== AUTO-RESIZE TEXTAREA ====================

document.addEventListener('DOMContentLoaded', () => {
    // Auto-resize textareas on input
    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 200) + 'px';
        });
    });
});