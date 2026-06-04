// ===== Система управления Cookies =====

const CookieManager = {
    prefix: 'aniTaste_',
    
    setCookie(name, value, days = 30) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        const expiresString = 'expires=' + expires.toUTCString();
        document.cookie = this.prefix + name + '=' + encodeURIComponent(value) + ';' + expiresString + ';path=/';
    },
    
    getCookie(name) {
        const nameEQ = this.prefix + name + '=';
        const cookies = document.cookie.split(';');
        
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(nameEQ) === 0) {
                return decodeURIComponent(cookie.substring(nameEQ.length));
            }
        }
        return null;
    },
    
    deleteCookie(name) {
        document.cookie = this.prefix + name + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
    },
    
    clearAllCookies() {
        const cookies = document.cookie.split(';');
        
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(this.prefix) === 0) {
                const cookieName = cookie.substring(this.prefix.length).split('=')[0];
                this.deleteCookie(cookieName);
            }
        }
    },
    
    recordLastVisit() {
        const now = new Date();
        this.setCookie('lastVisit', now.toLocaleString('ru-RU'));
        this.setCookie('lastVisitTimestamp', now.getTime().toString());
    },
    
    recordLastPage() {
        this.setCookie('lastPage', window.location.pathname);
    },
    
    saveScrollPosition() {
        const scrollData = {
            x: window.scrollX,
            y: window.scrollY,
            timestamp: Date.now(),
            page: window.location.pathname
        };
        this.setCookie('scrollPosition', JSON.stringify(scrollData));
    },
    
    restoreScrollPosition() {
        const scrollData = this.getCookie('scrollPosition');
        
        if (scrollData) {
            try {
                const data = JSON.parse(scrollData);
                const timeDiff = Date.now() - data.timestamp;
                if (data.page === window.location.pathname && timeDiff < 1800000) {
                    window.scrollTo(data.x, data.y);
                }
            } catch (e) {
                console.error('Ошибка восстановления прокрутки:', e);
            }
        }
    },
    
    getAllCookies() {
        const cookies = document.cookie.split(';');
        let aniTasteCookies = [];
        
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf(this.prefix) === 0) {
                aniTasteCookies.push(cookie);
            }
        }
        
        return aniTasteCookies;
    },
    
    getStats() {
        const allCookies = this.getAllCookies();
        
        if (allCookies.length === 0) {
            return '<p style="color: #999; text-align: center;">Нет сохранённых cookies<br><small>Обновите страницу</small></p>';
        }
        
        let stats = '<div style="text-align: left; font-size: 0.85em;">';
        stats += '<p style="margin: 5px 0;"><strong>📅 Последний вход:</strong><br>' + (this.getCookie('lastVisit') || 'Нет данных') + '</p>';
        stats += '<p style="margin: 5px 0;"><strong>📍 Страница:</strong><br>' + (this.getCookie('lastPage') || 'Нет данных') + '</p>';
        stats += '<p style="margin: 5px 0;"><strong>🔢 Посещений:</strong> ' + (this.getCookie('visitCount') || '1') + '</p>';
        stats += '<p style="margin: 5px 0;"><strong>💾 Cookies:</strong> ' + allCookies.length + ' шт.</p>';
        stats += '</div>';
        
        return stats;
    },
    
    incrementVisitCount() {
        let count = parseInt(this.getCookie('visitCount') || '0');
        count++;
        this.setCookie('visitCount', count.toString());
    },
    
    createTestCookies() {
        this.recordLastVisit();
        this.recordLastPage();
        this.incrementVisitCount();
    }
};

function showCookieStats() {
    const statsDiv = document.getElementById('cookieStats');
    
    if (statsDiv) {
        const allCookies = CookieManager.getAllCookies();
        
        if (allCookies.length === 0) {
            CookieManager.createTestCookies();
        }
        
        statsDiv.innerHTML = CookieManager.getStats();
        statsDiv.style.display = 'flex';
    }
}

function clearAllCookies() {
    if (confirm('Вы уверены, что хотите удалить все сохранённые cookies?')) {
        CookieManager.clearAllCookies();
        alert('Все cookies успешно очищены!');
        
        const statsDiv = document.getElementById('cookieStats');
        if (statsDiv) {
            statsDiv.innerHTML = CookieManager.getStats();
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    CookieManager.recordLastVisit();
    CookieManager.recordLastPage();
    CookieManager.incrementVisitCount();
    CookieManager.restoreScrollPosition();
});

window.addEventListener('beforeunload', function() {
    CookieManager.saveScrollPosition();
});

setInterval(function() {
    CookieManager.saveScrollPosition();
}, 5000);

window.CookieManager = CookieManager;
window.showCookieStats = showCookieStats;
window.clearAllCookies = clearAllCookies;