// AI Business Coach - Main Application
// Handles chat interactions, voice input/output, and AI coaching logic

class BusinessCoach {
    constructor() {
        this.conversationHistory = [];
        this.currentSession = {
            id: Date.now(),
            startTime: new Date(),
            messages: [],
            context: {
                industry: null,
                challenges: [],
                goals: [],
                businessStage: null
            }
        };
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.isRecording = false;

        this.init();
    }

    init() {
        this.loadElements();
        this.setupEventListeners();
        this.initSpeechRecognition();
        this.loadHistory();
    }

    loadElements() {
        this.welcomeScreen = document.getElementById('welcomeScreen');
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.voiceBtn = document.getElementById('voiceBtn');
        this.voiceIcon = document.getElementById('voiceIcon');
        this.newSessionBtn = document.getElementById('newSessionBtn');
        this.historyBtn = document.getElementById('historyBtn');
        this.historyModal = document.getElementById('historyModal');
        this.historyList = document.getElementById('historyList');
    }

    setupEventListeners() {
        // Send message
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-resize textarea
        this.messageInput.addEventListener('input', () => {
            this.messageInput.style.height = 'auto';
            this.messageInput.style.height = this.messageInput.scrollHeight + 'px';
        });

        // Voice input
        this.voiceBtn.addEventListener('click', () => this.toggleVoiceInput());

        // Topic buttons
        document.querySelectorAll('.topic-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const topic = btn.dataset.topic;
                this.handleTopicClick(topic);
            });
        });

        // New session
        this.newSessionBtn.addEventListener('click', () => this.startNewSession());

        // History
        this.historyBtn.addEventListener('click', () => this.showHistory());
        document.querySelector('.modal-close').addEventListener('click', () => {
            this.historyModal.classList.remove('active');
        });
    }

    initSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.messageInput.value = transcript;
                this.sendMessage();
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.stopVoiceInput();
            };

            this.recognition.onend = () => {
                this.stopVoiceInput();
            };
        }
    }

    toggleVoiceInput() {
        if (!this.recognition) {
            this.addBotMessage("Sorry, voice input is not supported in your browser. Please type your message instead.");
            return;
        }

        if (this.isRecording) {
            this.stopVoiceInput();
        } else {
            this.startVoiceInput();
        }
    }

    startVoiceInput() {
        this.isRecording = true;
        this.voiceBtn.classList.add('recording');
        this.voiceIcon.textContent = '⏸️';
        this.recognition.start();
    }

    stopVoiceInput() {
        this.isRecording = false;
        this.voiceBtn.classList.remove('recording');
        this.voiceIcon.textContent = '🎤';
        if (this.recognition) {
            this.recognition.stop();
        }
    }

    handleTopicClick(topic) {
        const topicPrompts = {
            strategy: "I'd like help developing my business strategy. Can you guide me through key strategic frameworks?",
            leadership: "I want to grow as a leader. What are the most important leadership principles I should focus on?",
            metrics: "How do I identify and track the right metrics for my business?",
            scaling: "What should I consider when scaling my business?",
            productivity: "I'm struggling with time management and productivity. Can you help?",
            marketing: "I need advice on marketing and customer acquisition strategies."
        };

        this.messageInput.value = topicPrompts[topic] || '';
        this.sendMessage();
    }

    sendMessage() {
        const text = this.messageInput.value.trim();
        if (!text) return;

        // Hide welcome screen
        this.welcomeScreen.classList.add('hidden');

        // Add user message
        this.addUserMessage(text);
        this.messageInput.value = '';
        this.messageInput.style.height = 'auto';

        // Store in context
        this.currentSession.messages.push({
            role: 'user',
            content: text,
            timestamp: new Date()
        });

        // Show typing indicator
        this.showTypingIndicator();

        // Generate AI response
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateCoachResponse(text);
            this.addBotMessage(response);

            this.currentSession.messages.push({
                role: 'coach',
                content: response,
                timestamp: new Date()
            });

            this.saveSession();
        }, 1000 + Math.random() * 1000); // Simulate thinking time
    }

    generateCoachResponse(userInput) {
        const input = userInput.toLowerCase();

        // Update context based on input
        this.updateContext(input);

        // Determine response type
        if (this.matchesPattern(input, ['hello', 'hi', 'hey', 'greetings'])) {
            return this.generateGreeting();
        }

        if (this.matchesPattern(input, ['product-market fit', 'pmf', 'product market'])) {
            return this.generateFrameworkResponse('productMarketFit');
        }

        if (this.matchesPattern(input, ['okr', 'objectives', 'key results', 'goal setting', 'goals'])) {
            return this.generateFrameworkResponse('okrs');
        }

        if (this.matchesPattern(input, ['swot', 'strategic analysis', 'strengths weaknesses'])) {
            return this.generateFrameworkResponse('swotAnalysis');
        }

        if (this.matchesPattern(input, ['business model', 'canvas', 'revenue model'])) {
            return this.generateFrameworkResponse('businessModelCanvas');
        }

        if (this.matchesPattern(input, ['metric', 'kpi', 'measure', 'track', 'north star'])) {
            return this.generateMetricsResponse(input);
        }

        if (this.matchesPattern(input, ['leadership', 'leader', 'level 5', 'leading'])) {
            return this.generateLeadershipResponse(input);
        }

        if (this.matchesPattern(input, ['scale', 'scaling', 'grow', 'growth', 'expand'])) {
            return this.generateScalingResponse(input);
        }

        if (this.matchesPattern(input, ['time management', 'productivity', 'focus', 'overwhelmed', 'busy'])) {
            return this.generateProductivityResponse(input);
        }

        if (this.matchesPattern(input, ['marketing', 'customer acquisition', 'sales', 'traction'])) {
            return this.generateMarketingResponse(input);
        }

        if (this.matchesPattern(input, ['cash', 'money', 'revenue', 'profit', 'financial'])) {
            return this.generateFinancialResponse(input);
        }

        if (this.matchesPattern(input, ['hire', 'hiring', 'team', 'people', 'culture'])) {
            return this.generateHiringResponse();
        }

        if (this.matchesPattern(input, ['imposter', 'not good enough', 'fraud', 'doubt'])) {
            return this.generateImposterSyndromeResponse();
        }

        // Industry-specific
        if (this.currentSession.context.industry) {
            return this.generateIndustryResponse(input);
        }

        // Generic coaching response
        return this.generateGenericCoachResponse(input);
    }

    matchesPattern(input, keywords) {
        return keywords.some(keyword => input.includes(keyword));
    }

    updateContext(input) {
        // Detect industry
        const industries = ['saas', 'ecommerce', 'consulting', 'content'];
        industries.forEach(industry => {
            if (input.includes(industry)) {
                this.currentSession.context.industry = industry;
            }
        });

        // Detect business stage
        if (input.includes('startup') || input.includes('just started')) {
            this.currentSession.context.businessStage = 'startup';
        } else if (input.includes('scale') || input.includes('scaling')) {
            this.currentSession.context.businessStage = 'scaling';
        }
    }

    generateGreeting() {
        const greetings = [
            "Hello! I'm your AI Business Coach. I'm here to help you grow your business and develop as a leader. What challenges are you facing today?",
            "Hi there! Ready to work on your business? Whether it's strategy, leadership, or overcoming specific challenges, I'm here to help. What's on your mind?",
            "Welcome! Let's work together to take your business to the next level. What would you like to focus on today?"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    generateFrameworkResponse(frameworkKey) {
        const framework = KnowledgeBase.frameworks[frameworkKey];
        if (!framework) return this.generateGenericCoachResponse('');

        let response = `<strong>${framework.name}</strong>\n\n`;

        if (framework.source) {
            response += `<em>From ${framework.source}</em>\n\n`;
        }

        response += `${framework.concept}\n\n`;

        if (frameworkKey === 'productMarketFit') {
            response += `<h4>Key Indicators:</h4>\n<ul>`;
            framework.indicators.forEach(indicator => {
                response += `<li>${indicator}</li>`;
            });
            response += `</ul>\n\n`;
            response += `<h4>How to Measure:</h4>\n${framework.howToMeasure}\n\n`;
            response += `<div class="message-quote">${framework.application}</div>`;
        }

        if (frameworkKey === 'okrs') {
            response += `<h4>Structure:</h4>\n`;
            response += `<strong>Objective:</strong> ${framework.structure.objective}\n`;
            response += `<strong>Key Results:</strong> ${framework.structure.keyResults}\n\n`;
            response += `<h4>Example:</h4>\n`;
            response += `<strong>Objective:</strong> ${framework.example.objective}\n`;
            response += `<strong>Key Results:</strong>\n<ul>`;
            framework.example.keyResults.forEach(kr => {
                response += `<li>${kr}</li>`;
            });
            response += `</ul>\n\n`;
            response += `<div class="message-quote">${framework.quote}</div>`;
        }

        if (frameworkKey === 'swotAnalysis') {
            response += `<h4>Key Questions:</h4>\n`;
            response += `<strong>Strengths:</strong> ${framework.questions.strengths.join(', ')}\n\n`;
            response += `<strong>Weaknesses:</strong> ${framework.questions.weaknesses.join(', ')}\n\n`;
            response += `<strong>Opportunities:</strong> ${framework.questions.opportunities.join(', ')}\n\n`;
            response += `<strong>Threats:</strong> ${framework.questions.threats.join(', ')}`;
        }

        if (frameworkKey === 'businessModelCanvas') {
            response += `<h4>9 Building Blocks:</h4>\n<ul>`;
            framework.components.forEach(component => {
                response += `<li>${component}</li>`;
            });
            response += `</ul>`;
        }

        return response;
    }

    generateMetricsResponse(input) {
        const nsm = KnowledgeBase.frameworks.northStarMetric;
        const industry = this.currentSession.context.industry;

        let response = `<strong>Measuring Your Business Success</strong>\n\n`;
        response += `The key is focusing on metrics that truly matter. Let me share two critical concepts:\n\n`;

        response += `<h4>${nsm.name}</h4>\n`;
        response += `<em>${nsm.concept}</em>\n\n`;
        response += `<strong>Examples:</strong>\n<ul>`;
        Object.entries(nsm.examples).forEach(([company, metric]) => {
            response += `<li>${company}: ${metric}</li>`;
        });
        response += `</ul>\n\n`;
        response += `<div class="message-quote">${nsm.howToFind}</div>\n\n`;

        if (industry && KnowledgeBase.industries[industry]) {
            const industryData = KnowledgeBase.industries[industry];
            response += `<h4>For ${industry.toUpperCase()} specifically:</h4>\n`;
            response += `<strong>Key Metrics:</strong> ${industryData.keyMetrics.join(', ')}\n\n`;
            response += `<strong>Benchmarks:</strong> ${industryData.benchmarks}\n\n`;
            response += `<div class="message-quote">${industryData.advice}</div>`;
        }

        return response;
    }

    generateLeadershipResponse(input) {
        const level5 = KnowledgeBase.leadership.levelFive;
        const mindset = KnowledgeBase.leadership.growthMindset;

        let response = `<strong>Growing as a Leader</strong>\n\n`;

        response += `<h4>${level5.name}</h4>\n`;
        response += `<em>From ${level5.source}</em>\n\n`;
        response += `${level5.concept}\n\n`;
        response += `<strong>Characteristics:</strong>\n<ul>`;
        level5.characteristics.forEach(char => {
            response += `<li>${char}</li>`;
        });
        response += `</ul>\n\n`;
        response += `<div class="message-quote">${level5.quote}</div>\n\n`;

        response += `<h4>${mindset.name}</h4>\n`;
        response += `<em>From ${mindset.source}</em>\n\n`;
        response += `${mindset.concept}\n\n`;
        response += `<div class="message-quote">${mindset.application}</div>`;

        return response;
    }

    generateScalingResponse(input) {
        const unitEcon = KnowledgeBase.scaling.unitEconomics;
        const twoWay = KnowledgeBase.scaling.twoWayDoor;

        let response = `<strong>Scaling Your Business</strong>\n\n`;

        response += `Before scaling, ensure you have the fundamentals right:\n\n`;

        response += `<h4>${unitEcon.name}</h4>\n`;
        response += `${unitEcon.concept}\n\n`;
        response += `<strong>Key Metrics:</strong>\n<ul>`;
        unitEcon.keyMetrics.forEach(metric => {
            response += `<li>${metric}</li>`;
        });
        response += `</ul>\n\n`;
        response += `<div class="message-quote">${unitEcon.rule}</div>\n\n`;

        response += `<h4>Decision Making While Scaling</h4>\n`;
        response += `<em>From ${twoWay.source}</em>\n\n`;
        response += `${twoWay.concept}\n\n`;
        response += `<strong>Type 1:</strong> ${twoWay.type1}\n`;
        response += `<strong>Type 2:</strong> ${twoWay.type2}\n\n`;
        response += `<div class="message-quote">${twoWay.quote}</div>`;

        return response;
    }

    generateProductivityResponse(input) {
        const eisenhower = KnowledgeBase.leadership.timeManagement;
        const deepWork = KnowledgeBase.leadership.deepWork;
        const challenge = KnowledgeBase.challenges.timeManagement;

        let response = `<strong>Mastering Productivity & Time Management</strong>\n\n`;

        response += `<h4>${eisenhower.name}</h4>\n`;
        response += `<em>From ${eisenhower.source}</em>\n\n`;
        response += `<strong>The Four Quadrants:</strong>\n<ul>`;
        eisenhower.quadrants.forEach(q => {
            response += `<li>${q}</li>`;
        });
        response += `</ul>\n\n`;
        response += `<div class="message-quote">${eisenhower.insight}</div>\n\n`;

        response += `<h4>${deepWork.name}</h4>\n`;
        response += `<em>From ${deepWork.source}</em>\n\n`;
        response += `${deepWork.concept}\n\n`;
        response += `<strong>Strategies:</strong>\n<ul>`;
        deepWork.strategies.forEach(strategy => {
            response += `<li>${strategy}</li>`;
        });
        response += `</ul>\n\n`;

        response += `<h4>Practical Solutions:</h4>\n<ul>`;
        challenge.solutions.forEach(solution => {
            response += `<li>${solution}</li>`;
        });
        response += `</ul>`;

        return response;
    }

    generateMarketingResponse(input) {
        const positioning = KnowledgeBase.marketing.positioning;
        const traction = KnowledgeBase.marketing.traction;

        let response = `<strong>Marketing & Customer Acquisition</strong>\n\n`;

        response += `<h4>${positioning.name}</h4>\n`;
        response += `<em>From ${positioning.source}</em>\n\n`;
        response += `${positioning.concept}\n\n`;
        response += `<strong>Key Components:</strong>\n<ul>`;
        positioning.components.forEach(component => {
            response += `<li>${component}</li>`;
        });
        response += `</ul>\n\n`;

        response += `<h4>Finding Traction</h4>\n`;
        response += `<em>From ${traction.source}</em>\n\n`;
        response += `There are 19 potential traction channels. The key is to test multiple channels, then double down on what works.\n\n`;
        response += `<div class="message-quote">${traction.strategy}</div>`;

        return response;
    }

    generateFinancialResponse(input) {
        const challenge = KnowledgeBase.challenges.cashFlow;

        let response = `<strong>Financial Management</strong>\n\n`;
        response += `Cash flow is the lifeblood of any business.\n\n`;
        response += `<strong>Common Issue:</strong> ${challenge.problem}\n\n`;
        response += `<strong>Solutions:</strong>\n<ul>`;
        challenge.solutions.forEach(solution => {
            response += `<li>${solution}</li>`;
        });
        response += `</ul>\n\n`;
        response += `<div class="message-quote">${challenge.rule}</div>`;

        return response;
    }

    generateHiringResponse() {
        const challenge = KnowledgeBase.challenges.hiring;

        let response = `<strong>Building Your Team</strong>\n\n`;
        response += `<strong>Challenge:</strong> ${challenge.problem}\n\n`;
        response += `<strong>Best Practices:</strong>\n<ul>`;
        challenge.solutions.forEach(solution => {
            response += `<li>${solution}</li>`;
        });
        response += `</ul>\n\n`;
        response += `<div class="message-quote">${challenge.quote}</div>`;

        return response;
    }

    generateImposterSyndromeResponse() {
        const challenge = KnowledgeBase.challenges.imposterSyndrome;

        let response = `<strong>Overcoming Imposter Syndrome</strong>\n\n`;
        response += `First, know that you're not alone. Most successful entrepreneurs feel this way.\n\n`;
        response += `<strong>How to Address It:</strong>\n<ul>`;
        challenge.solutions.forEach(solution => {
            response += `<li>${solution}</li>`;
        });
        response += `</ul>\n\n`;
        response += `<div class="message-quote">${challenge.insight}</div>`;

        return response;
    }

    generateIndustryResponse(input) {
        const industry = this.currentSession.context.industry;
        const industryData = KnowledgeBase.industries[industry];

        if (!industryData) return this.generateGenericCoachResponse(input);

        let response = `<strong>Advice for ${industry.toUpperCase()}</strong>\n\n`;
        response += `<strong>Key Metrics to Track:</strong> ${industryData.keyMetrics.join(', ')}\n\n`;
        response += `<strong>Benchmarks:</strong> ${industryData.benchmarks}\n\n`;
        response += `<strong>Key Advice:</strong> ${industryData.advice}\n\n`;

        if (industryData.scaling) {
            response += `<strong>Scaling Strategy:</strong> ${industryData.scaling}`;
        }

        return response;
    }

    generateGenericCoachResponse(input) {
        const quotes = KnowledgeBase.quotes;
        const allQuotes = [...quotes.strategy, ...quotes.execution, ...quotes.leadership, ...quotes.innovation];
        const randomQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];

        let response = `<strong>Let me help you think through this</strong>\n\n`;
        response += `That's a great question. Let me share some insights:\n\n`;
        response += `The key is to break down complex challenges into manageable pieces. `;
        response += `Ask yourself:\n\n`;
        response += `<ul>`;
        response += `<li>What's the core problem I'm trying to solve?</li>`;
        response += `<li>What would success look like?</li>`;
        response += `<li>What's the smallest step I can take today?</li>`;
        response += `<li>Who has solved this before, and what can I learn from them?</li>`;
        response += `</ul>\n\n`;
        response += `<div class="message-quote">${randomQuote}</div>\n\n`;
        response += `What specific aspect would you like to dive deeper into? I can help with:\n`;
        response += `• Strategy & Planning\n`;
        response += `• Metrics & KPIs\n`;
        response += `• Leadership Development\n`;
        response += `• Scaling Challenges\n`;
        response += `• Marketing & Sales\n`;
        response += `• Productivity & Focus`;

        return response;
    }

    addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">👤</div>
            <div class="message-content">
                <div class="message-bubble">${this.escapeHtml(text)}</div>
                <div class="message-timestamp">${this.formatTime(new Date())}</div>
            </div>
        `;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addBotMessage(html) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">🎯</div>
            <div class="message-content">
                <div class="message-bubble">${this.formatResponse(html)}</div>
                <div class="message-timestamp">${this.formatTime(new Date())}</div>
            </div>
        `;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator-message';
        typingDiv.innerHTML = `
            <div class="message-avatar">🎯</div>
            <div class="message-content">
                <div class="message-bubble">
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        `;
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = this.chatMessages.querySelector('.typing-indicator-message');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    formatResponse(html) {
        return html
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>')
            .replace(/•/g, '•');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatTime(date) {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.parentElement.scrollTop = this.chatMessages.parentElement.scrollHeight;
        }, 100);
    }

    startNewSession() {
        if (confirm('Start a new coaching session? Your current conversation will be saved to history.')) {
            this.saveSession();
            this.currentSession = {
                id: Date.now(),
                startTime: new Date(),
                messages: [],
                context: {
                    industry: null,
                    challenges: [],
                    goals: [],
                    businessStage: null
                }
            };
            this.chatMessages.innerHTML = '';
            this.welcomeScreen.classList.remove('hidden');
        }
    }

    saveSession() {
        if (this.currentSession.messages.length > 0) {
            let history = JSON.parse(localStorage.getItem('coachHistory') || '[]');

            // Add summary for display
            const firstUserMessage = this.currentSession.messages.find(m => m.role === 'user');
            this.currentSession.summary = firstUserMessage ?
                firstUserMessage.content.substring(0, 60) + '...' :
                'Coaching Session';

            history.unshift(this.currentSession);

            // Keep only last 50 sessions
            if (history.length > 50) {
                history = history.slice(0, 50);
            }

            localStorage.setItem('coachHistory', JSON.stringify(history));
        }
    }

    loadHistory() {
        this.conversationHistory = JSON.parse(localStorage.getItem('coachHistory') || '[]');
    }

    showHistory() {
        this.loadHistory();
        this.historyList.innerHTML = '';

        if (this.conversationHistory.length === 0) {
            this.historyList.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No conversation history yet.</p>';
        } else {
            this.conversationHistory.forEach(session => {
                const item = document.createElement('div');
                item.className = 'history-item';
                item.innerHTML = `
                    <div class="history-title">${session.summary || 'Coaching Session'}</div>
                    <div class="history-date">${new Date(session.startTime).toLocaleDateString()} - ${session.messages.length} messages</div>
                `;
                item.addEventListener('click', () => {
                    this.loadSession(session);
                    this.historyModal.classList.remove('active');
                });
                this.historyList.appendChild(item);
            });
        }

        this.historyModal.classList.add('active');
    }

    loadSession(session) {
        this.currentSession = JSON.parse(JSON.stringify(session));
        this.chatMessages.innerHTML = '';
        this.welcomeScreen.classList.add('hidden');

        session.messages.forEach(msg => {
            if (msg.role === 'user') {
                this.addUserMessage(msg.content);
            } else {
                this.addBotMessage(msg.content);
            }
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BusinessCoach();
});
