/* ============================================
   J277 REVISION TUTOR — FRONTEND LOGIC
   Handles: navigation, quiz UI
   ============================================ */

// ==================== STATE ====================

const state = {
    currentView: 'landing',
    
    // Quiz Mode
    quiz: {
        selectedUnit: null,
        selectedSubtopic: null,
        conversationHistory: [],
        isLoading: false
    }
};

// Unit display names
const unitNames = {
    '1.1': 'Systems Architecture',
    '1.2': 'Memory & Storage',
    '1.3': 'Networks, Connections & Protocols',
    '1.4': 'System Security',
    '1.5': 'Systems Software',
    '1.6': 'Ethical, Legal, Cultural & Environmental Impacts'
};

// Sub-topic data for granular quiz selection
// Units with only one teaching file (1.6) have no subtopics — quiz covers the whole unit
const subtopicData = {
    '1.1': [
        { id: '1.1.1', label: '1.1.1', name: 'CPU Architecture', description: 'Von Neumann, registers, FDE cycle' },
        { id: '1.1.2', label: '1.1.2', name: 'CPU Performance', description: 'Clock speed, cores, cache' },
    ],
    '1.2': [
        { id: '1.2.1', label: '1.2.1', name: 'Primary Storage', description: 'RAM, ROM, virtual memory, cache' },
        { id: '1.2.2', label: '1.2.2', name: 'Secondary Storage', description: 'Magnetic, optical, solid-state' },
        { id: '1.2.3', label: '1.2.3', name: 'Units of Data', description: 'Bits, bytes, nibbles, units' },
        { id: '1.2.4', label: '1.2.4', name: 'Data Storage', description: 'Binary, hex, characters, images, sound' },
        { id: '1.2.5', label: '1.2.5', name: 'Compression', description: 'Lossy vs lossless, RLE, Huffman' },
    ],
    '1.3': [
        { id: '1.3.1', label: '1.3.1', name: 'Networks & Topologies', description: 'LANs, WANs, star, mesh, client-server' },
        { id: '1.3.2', label: '1.3.2', name: 'Protocols & Layers', description: 'TCP/IP, HTTP, FTP, layers model' },
    ],
    '1.4': [
        { id: '1.4.1', label: '1.4.1', name: 'Threats to Systems & Networks', description: 'Malware, social engineering, DoS, SQL injection' },
        { id: '1.4.2', label: '1.4.2', name: 'Preventing Threats', description: 'Firewalls, encryption, passwords, backups' },
    ],
    '1.5': [
        { id: '1.5.1', label: '1.5.1', name: 'Operating Systems', description: 'OS functions, memory management, drivers' },
        { id: '1.5.2', label: '1.5.2', name: 'Utility Software', description: 'Defrag, encryption, backup, compression' },
    ],
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
}


// ==================== QUIZ MODE ====================

function selectUnit(unit) {
    // If this unit has no subtopics, start the quiz directly
    if (!subtopicData[unit]) {
        startQuiz(unit, null);
        return;
    }
    
    // Toggle expansion — if already expanded, collapse it
    const existingPanel = document.getElementById(`subtopics-${unit}`);
    if (existingPanel) {
        existingPanel.remove();
        document.querySelector(`.unit-btn[data-unit="${unit}"]`).classList.remove('expanded');
        return;
    }
    
    // Collapse any other expanded unit
    document.querySelectorAll('.subtopic-panel').forEach(p => p.remove());
    document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('expanded'));
    
    // Mark this unit as expanded
    document.querySelector(`.unit-btn[data-unit="${unit}"]`).classList.add('expanded');
    
    // Build sub-topic panel
    const subtopics = subtopicData[unit];
    const panel = document.createElement('div');
    panel.id = `subtopics-${unit}`;
    panel.className = 'subtopic-panel';
    
    panel.innerHTML = `
        <button class="subtopic-btn subtopic-btn-all" onclick="startQuiz('${unit}', null)">
            <span class="subtopic-label">All of Unit ${unit}</span>
            <span class="subtopic-desc">Cover the full unit</span>
        </button>
        ${subtopics.map(st => `
            <button class="subtopic-btn" onclick="startQuiz('${unit}', '${st.id}')">
                <span class="subtopic-number">${st.label}</span>
                <span class="subtopic-label">${st.name}</span>
                <span class="subtopic-desc">${st.description}</span>
            </button>
        `).join('')}
    `;
    
    // Insert after the unit button
    const unitBtn = document.querySelector(`.unit-btn[data-unit="${unit}"]`);
    unitBtn.after(panel);
}

function startQuiz(unit, subtopic) {
    state.quiz.selectedUnit = unit;
    state.quiz.selectedSubtopic = subtopic;
    state.quiz.conversationHistory = [];
    
    // Navigate to quiz view
    navigateTo('quiz');
    
    // Set unit label
    if (subtopic) {
        const st = subtopicData[unit].find(s => s.id === subtopic);
        document.getElementById('quiz-unit-label').textContent = `Unit ${subtopic}: ${st.name}`;
    } else {
        document.getElementById('quiz-unit-label').textContent = `Unit ${unit}: ${unitNames[unit]}`;
    }
    
    // Clear previous messages
    const messagesContainer = document.getElementById('quiz-messages');
    messagesContainer.innerHTML = '';
    
    // Show loading while we get the first question from the API
    state.quiz.isLoading = true;
    addLoadingIndicator();
    document.getElementById('quiz-send-btn').disabled = true;
    
    // Call API to start the quiz
    callQuizAPI(unit, [], subtopic)
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
    // Reset quiz state
    state.quiz.selectedUnit = null;
    state.quiz.selectedSubtopic = null;
    state.quiz.conversationHistory = [];
    
    // Collapse any expanded sub-topic panels on the landing page
    document.querySelectorAll('.subtopic-panel').forEach(p => p.remove());
    document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('expanded'));
    
    // Navigate back to landing
    navigateTo('landing');
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
    const apiMessages = buildQuizAPIMessages();
    
    callQuizAPI(state.quiz.selectedUnit, apiMessages, state.quiz.selectedSubtopic)
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
    let topicLabel;
    if (state.quiz.selectedSubtopic) {
        const st = subtopicData[state.quiz.selectedUnit].find(s => s.id === state.quiz.selectedSubtopic);
        topicLabel = `Unit ${state.quiz.selectedSubtopic}: ${st.name}`;
    } else {
        topicLabel = `Unit ${state.quiz.selectedUnit}: ${unitNames[state.quiz.selectedUnit]}`;
    }
    messages.push({
        role: 'user',
        content: `I'd like to be quizzed on ${topicLabel}.`
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
 * @param {string|null} subtopic - Optional sub-topic code (e.g. '1.2.3')
 * @returns {Promise<string>} - The assistant's reply text
 */
async function callQuizAPI(unit, messages, subtopic) {
    const payload = { unit, messages };
    if (subtopic) payload.subtopic = subtopic;
    
    const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error (${response.status})`);
    }
    
    const data = await response.json();
    return data.reply;
}


// ==================== TEXT FORMATTING ====================

/**
 * Format feedback text for display.
 * Converts markdown-style formatting to HTML for better readability.
 * Handles bold, bullet points, paragraphs, and separates trailing questions.
 */
function formatFeedback(text) {
    if (!text) return '<p>No feedback received.</p>';
    
    // Split into paragraphs
    const paragraphs = text.split(/\n\n+/);
    
    const htmlBlocks = paragraphs.map(para => {
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
    });
    
    // Find where the trailing question section starts.
    // Walk backwards from the end — any consecutive blocks containing '?' are the next question.
    let splitIndex = htmlBlocks.length;
    for (let i = htmlBlocks.length - 1; i >= 1; i--) {
        if (htmlBlocks[i].includes('?')) {
            splitIndex = i;
        } else {
            break;
        }
    }
    
    // If we found a question section (and it's not the entire message), wrap it
    if (splitIndex < htmlBlocks.length && splitIndex > 0) {
        const feedbackPart = htmlBlocks.slice(0, splitIndex).join('');
        const questionPart = htmlBlocks.slice(splitIndex).join('');
        return feedbackPart + `<div class="next-question">${questionPart}</div>`;
    }
    
    return htmlBlocks.join('');
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