const chatData = {
    menu: {
        monday: {
            breakfast: "Bread, Butter, Jam, Millet Dosa, Idly, Podi Oil, Chutney, Sambar, Chapathi",
            lunch: "Chappathi, Rajma Masala, Jeera Pulao, Steamed Rice",
            snacks: "Pav Bajji, Tea/Coffee",
            dinner: "MadrasParatha, Mattar Pannaer Masala"
        },
        // Add other days similarly
    },
    holidays: [
        "May Day - May 1",
        "Bakrid [Idul Azha] - June 7",
        "Mahaveer Jayanthi - April 10",
        "Good Friday - April 18",
        "Tamil New Year's Day - April 14"
    ],
    courses: [
        {
            code: "21MAB204T",
            title: "Probability and Queueing Theory",
            faculty: "Dr. Karthik Chinnasamy",
            attendance: "90.91%"
        },
        // Add other courses
    ],
    timetable: {
        morning: "8:00-8:50 - Design and Analysis of Algorithms",
        afternoon: "12:30-1:20 - Probability and Queueing Theory",
        evening: "3:10-4:00 - Artificial Intelligence"
    }
};

class Chatbot {
    constructor() {
        this.messages = document.getElementById('chatMessages');
        this.input = document.getElementById('userInput');
        this.sendBtn = document.getElementById('sendBtn');
        
        this.sendBtn.addEventListener('click', () => this.handleUserInput());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserInput();
        });
        
        // Add ripple effect to send button
        this.sendBtn.addEventListener('mousedown', this.createRipple);
        
        this.showWelcomeMessage();
    }
    
    createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        ripple.style.width = ripple.style.height = '100px';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        button.appendChild(ripple);
        
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    }
    
    showWelcomeMessage() {
        this.addMessage("Hello! I'm your Educational Assistant. I can help you with:", 'bot');
        this.addMessage("• Menu information\n• Holiday schedule\n• Attendance details\n• Timetable\n\nWhat would you like to know?", 'bot');
    }
    
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        // Create and append text with typing animation
        const textSpan = document.createElement('span');
        textSpan.className = 'message-text';
        messageDiv.appendChild(textSpan);
        
        this.messages.appendChild(messageDiv);
        this.messages.scrollTop = this.messages.scrollHeight;
        
        // Animate text typing
        let i = 0;
        const speed = 30;
        const typeWriter = () => {
            if (i < text.length) {
                textSpan.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        };
        typeWriter();
    }
    
    async handleUserInput() {
        const userText = this.input.value.trim();
        if (!userText) return;
        
        this.addMessage(userText, 'user');
        this.input.value = '';
        
        // Show typing indicator
        const typingIndicator = document.querySelector('.typing-indicator');
        typingIndicator.style.display = 'flex';
        
        // Simulate thinking time
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        
        const response = this.generateResponse(userText);
        typingIndicator.style.display = 'none';
        this.addMessage(response, 'bot');
    }
    
    generateResponse(userInput) {
        const input = userInput.toLowerCase();
        
        // Menu related queries
        if (input.includes('menu') || input.includes('food') || input.includes('eat')) {
            return "Today's special items include:\n• Millet Dosa for breakfast\n• Rajma Masala for lunch\n• Mattar Pannaer Masala for dinner";
        }
        
        // Holiday related queries
        if (input.includes('holiday') || input.includes('vacation')) {
            return "Upcoming holidays:\n• May Day - May 1\n• Bakrid [Idul Azha] - June 7\n• Good Friday - April 18";
        }
        
        // Attendance related queries
        if (input.includes('attendance') || input.includes('present')) {
            return "Your attendance:\n• Probability Theory: 90.91%\n• Digital Image Processing: 83.33%\n• Database Systems: 66.67%";
        }
        
        // Timetable related queries
        if (input.includes('schedule') || input.includes('class') || input.includes('time')) {
            return "Today's schedule:\n8:00-8:50: Design and Analysis of Algorithms\n12:30-1:20: Probability and Queueing Theory\n3:10-4:00: Artificial Intelligence";
        }
        
        return "I'm not sure about that. Would you like to know about:\n• Menu\n• Holidays\n• Attendance\n• Class schedule";
    }
}

// Add ripple animation style
const style = document.createElement('style');
style.textContent = `
@keyframes ripple {
    to {
        transform: translate(-50%, -50%) scale(4);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);

// Initialize chatbot when page loads
window.addEventListener('load', () => {
    new Chatbot();
});