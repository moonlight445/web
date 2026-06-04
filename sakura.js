// ===== Система лепестков сакуры =====

const SakuraEffect = {
    container: null,
    
    config: {
        backgroundPetals: 40,
        spawnInterval: 400,
        fallDuration: 10000,
        clickPetals: 20,
        burstRadius: 250
    },
    
    init() {
        this.createContainer();
        this.startBackgroundPetals();
        this.addClickListeners();
        console.log('🌸 Sakura effect initialized');
    },
    
    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'sakura-container';
        document.body.appendChild(this.container);
    },
    
    createPetal(x = null, y = null, isClickPetal = false) {
    const petal = document.createElement('div');
    petal.className = 'sakura-petal';
    
    const posX = x !== null ? x : Math.random() * window.innerWidth;
    const startY = y !== null ? y : -50;
    
    petal.style.left = posX + 'px';
    petal.style.top = startY + 'px';
    
    const size = 10 + Math.random() * 10; // Немного уменьшим размер для изящности
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    
    petal.style.opacity = 0.4 + Math.random() * 0.5;
    
    if (isClickPetal) {
        // ... (код для клика оставляем без изменений)
        petal.classList.add('click-petal');
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const distance = 80 + Math.random() * this.config.burstRadius;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance + 150;
        const rotation = (Math.random() - 0.5) * 1080;
        petal.style.setProperty('--tx', tx + 'px');
        petal.style.setProperty('--ty', ty + 'px');
        petal.style.setProperty('--rot', rotation + 'deg');
        setTimeout(() => { if (petal.parentNode) petal.parentNode.removeChild(petal); }, 1500);
    } else {
        const duration = this.config.fallDuration + Math.random() * 5000;
        const delay = Math.random() * 5000; // Добавим случайную задержку
        
        // Добавляем разные типы анимации покачивания
        const curve = Math.random() > 0.5 ? 'sway-1' : 'sway-2';
        petal.style.animation = `fallingPetal ${duration}ms linear infinite, ${curve} ${2000 + Math.random() * 3000}ms ease-in-out infinite alternate`;
        petal.style.animationDelay = `0ms, ${delay}ms`;

        setTimeout(() => {
            if (petal.parentNode) {
                petal.parentNode.removeChild(petal);
            }
        }, duration);
    }
    
    this.container.appendChild(petal);
    return petal;
},
    
    startBackgroundPetals() {
        for (let i = 0; i < this.config.backgroundPetals; i++) {
            setTimeout(() => {
                this.createPetal();
            }, i * 100);
        }
        
        setInterval(() => {
            this.createPetal();
        }, this.config.spawnInterval);
    },
    
    addClickListeners() {
        const interactiveElements = document.querySelectorAll(
            'button, a, .nav-link, .contact-link, .mail-btn, .settings-btn, .settings-action-btn'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('click', (e) => {
                this.createBurst(e.clientX, e.clientY);
            });
        });
    },
    
    createBurst(x, y) {
        for (let i = 0; i < this.config.clickPetals; i++) {
            setTimeout(() => {
                this.createPetal(x, y, true);
            }, i * 20);
        }
    },
    
    clear() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    },
    
    pause() {
        if (this.container) {
            this.container.style.display = 'none';
        }
    },
    
    resume() {
        if (this.container) {
            this.container.style.display = 'block';
        }
    }
};

let sakuraEnabled = true;

function toggleSakura() {
    sakuraEnabled = !sakuraEnabled;
    const btn = document.getElementById('sakuraToggleBtn');
    
    if (sakuraEnabled) {
        SakuraEffect.resume();
        if (btn) btn.textContent = '🌸 Выключить сакуру';
    } else {
        SakuraEffect.pause();
        if (btn) btn.textContent = '🌸 Включить сакуру';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    SakuraEffect.init();
});

window.SakuraEffect = SakuraEffect;
window.toggleSakura = toggleSakura;