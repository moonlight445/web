// AI Компаньон АиРин - Заглушка (Версия в обучении)
let isChatOpen = false;

document.addEventListener('DOMContentLoaded', function() {
    createAICompanion();
});

function createAICompanion() {
    const companionHTML = `
        <div id="ai-companion" class="ai-companion">
            <img id="companion-sprite" src="images/calm-sprite.png" alt="АиРин" class="companion-sprite">
            <div id="chat-window" class="chat-window" style="display: none;">
                <div class="chat-header">
                    <h3>АиРин</h3>
                    <button onclick="toggleChat()" class="close-btn">×</button>
                </div>
                <div id="chat-messages" class="chat-messages">
                    <div class="message ai">
                        Привет! Я пока еще только учусь и не совсем готова к полноценному общению. 
                        Загляни ко мне чуть позже, когда я закончу свое обучение! 
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', companionHTML);
    
    const sprite = document.getElementById('companion-sprite');
    sprite.addEventListener('click', toggleChat);
}

function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    const sprite = document.getElementById('companion-sprite');
    
    if (!isChatOpen) {
        chatWindow.style.display = 'flex';
        sprite.src = 'images/happy-sprite.png'; // Если файлов нет, браузер покажет alt
        isChatOpen = true;
    } else {
        chatWindow.style.display = 'none';
        sprite.src = 'images/calm-sprite.png';
        isChatOpen = false;
    }
}