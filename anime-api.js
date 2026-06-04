// ===== API для получения информации об аниме =====

const AnimeAPI = {
    baseUrl: 'https://api.jikan.moe/v4',
    
    // Получить последние новости с пагинацией
    async getNews(limit = 12, page = 1) {
        try {
            console.log('Загрузка новостей, страница:', page);
            const response = await fetch(`${this.baseUrl}/news?page=${page}&limit=${limit}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'AniTaste-App/1.0'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Получены новости:', data.data.length);
            
            return {
                data: data.data || [],
                hasMore: data.pagination?.has_next_page || false
            };
        } catch (error) {
            console.error('❌ Ошибка получения новостей:', error);
            return this.getMockNews(limit);
        }
    },
    
    // Получить топ аниме
    async getTopAnime(limit = 10, page = 1) {
        try {
            console.log('Загрузка топ аниме...');
            const response = await fetch(`${this.baseUrl}/top/anime?limit=${limit}&page=${page}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'AniTaste-App/1.0'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Получен топ аниме:', data.data.length);
            return data.data || [];
        } catch (error) {
            console.error('❌ Ошибка получения топ аниме:', error);
            return this.getMockTopAnime(limit);
        }
    },
    
    // Получить аниме текущего сезона
    async getCurrentSeason() {
        try {
            console.log('Загрузка текущего сезона...');
            const response = await fetch(`${this.baseUrl}/seasons/now?limit=15`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'AniTaste-App/1.0'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Получен сезон:', data.data.length);
            return data.data || [];
        } catch (error) {
            console.error('❌ Ошибка получения сезонного аниме:', error);
            return this.getMockSeasonalAnime();
        }
    },
    
    // Поиск аниме по названию
    async searchAnime(query, page = 1) {
        try {
            console.log('Поиск аниме:', query);
            const response = await fetch(`${this.baseUrl}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=10`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'AniTaste-App/1.0'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Результаты поиска:', data.data.length);
            return data.data || [];
        } catch (error) {
            console.error('❌ Ошибка поиска аниме:', error);
            return [];
        }
    },
    
    // ===== МОКОВЫЕ ДАННЫЕ (если API не работает) =====
    
    getMockNews(limit) {
        console.log('⚠️ Используем тестовые новости');
        return {
            data: [
                {
                    mal_id: 1,
                    title: 'Новый сезон популярного аниме анонсирован',
                    url: 'https://myanimelist.net',
                    images: { jpg: { image_url: 'https://cdn.myanimelist.net/s/common/ogp/ogp-mal.png' } },
                    date: new Date().toISOString(),
                    excerpt: 'Студия объявила о производстве продолжения...'
                },
                {
                    mal_id: 2,
                    title: 'Интервью с создателями нового аниме',
                    url: 'https://myanimelist.net',
                    images: { jpg: { image_url: 'https://cdn.myanimelist.net/s/common/ogp/ogp-mal.png' } },
                    date: new Date().toISOString(),
                    excerpt: 'Режиссер рассказал о планах на проект...'
                }
            ],
            hasMore: true
        };
    },
    
    getMockTopAnime(limit) {
        console.log('⚠️ Используем тестовый топ');
        return [
            {
                mal_id: 5114,
                title: 'Fullmetal Alchemist: Brotherhood',
                url: 'https://myanimelist.net/anime/5114',
                images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1223/96541.jpg' } },
                score: 9.1,
                type: 'TV',
                episodes: 64
            },
            {
                mal_id: 9253,
                title: 'Steins;Gate',
                url: 'https://myanimelist.net/anime/9253',
                images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/5/73199.jpg' } },
                score: 9.07,
                type: 'TV',
                episodes: 24
            }
        ];
    },
    
    getMockSeasonalAnime() {
        console.log('⚠️ Используем тестовый сезон');
        return [
            {
                mal_id: 52991,
                title: 'Sousou no Frieren',
                url: 'https://myanimelist.net/anime/52991',
                images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg' } },
                score: 9.15
            },
            {
                mal_id: 51009,
                title: 'Jujutsu Kaisen 2nd Season',
                url: 'https://myanimelist.net/anime/51009',
                images: { jpg: { image_url: 'https://cdn.myanimelist.net/images/anime/1792/138022.jpg' } },
                score: 8.85
            }
        ];
    },
    
    // Получить расписание
    async getSchedule() {
        try {
            const response = await fetch(`${this.baseUrl}/schedules`, {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'AniTaste-App/1.0'
                }
            });
            const data = await response.json();
            return data.data || [];
        } catch (error) {
            console.error('Ошибка получения расписания:', error);
            return [];
        }
    }
};

// ===== Отображение данных =====

const AnimeDisplay = {
    newsState: {
        currentPage: 1,
        isLoading: false,
        hasMore: true
    },
    
    displayNews(news, append = false) {
        const container = document.getElementById('newsContainer');
        if (!container) return;
        
        if (!news || news.length === 0) {
            container.innerHTML = '<p style="color: #999; text-align: center;">😔 Не удалось загрузить новости<br><small>Попробуйте обновить страницу</small></p>';
            return;
        }
        
        let html = append ? container.innerHTML : '<div class="anime-news-grid">';
        
        news.forEach(item => {
            const date = item.date ? new Date(item.date).toLocaleDateString('ru-RU') : 'Дата неизвестна';
            const imageUrl = item.images?.jpg?.image_url || 'https://cdn.myanimelist.net/s/common/ogp/ogp-mal.png';
            
            html += `
                <div class="news-card" onclick="window.open('${item.url}', '_blank')">
                    <div class="news-image">
                        <img src="${imageUrl}" alt="${item.title}" 
                             onerror="this.src='https://cdn.myanimelist.net/s/common/ogp/ogp-mal.png'">
                    </div>
                    <div class="news-content">
                        <h3>${item.title || 'Без названия'}</h3>
                        <p class="news-date">📅 ${date}</p>
                        <p class="news-excerpt">${item.excerpt ? item.excerpt.substring(0, 100) + '...' : 'Описание недоступно'}</p>
                    </div>
                </div>
            `;
        });
        
        if (!append) {
            html += '</div>';
            html += '<div id="newsLoading" class="loading-indicator" style="display: none;">⏳ Загрузка...</div>';
            html += '<div id="newsEnd" class="loading-indicator" style="display: none; color: #999;">📰 Больше новостей нет</div>';
        }
        
        container.innerHTML = html;
    },
    
    showLoadingIndicator() {
        const indicator = document.getElementById('newsLoading');
        if (indicator) indicator.style.display = 'block';
    },
    
    hideLoadingIndicator() {
        const indicator = document.getElementById('newsLoading');
        if (indicator) indicator.style.display = 'none';
    },
    
    showEndMessage() {
        const endMsg = document.getElementById('newsEnd');
        if (endMsg) endMsg.style.display = 'block';
        this.newsState.hasMore = false;
    },
    
    displayTopAnime(anime) {
        const container = document.getElementById('topAnimeContainer');
        if (!container) return;
        
        if (!anime || anime.length === 0) {
            container.innerHTML = '<p style="color: #999; text-align: center;">😔 Не удалось загрузить топ</p>';
            return;
        }
        
        let html = '<div class="anime-list">';
        anime.forEach((item, index) => {
            const imageUrl = item.images?.jpg?.image_url || 'https://cdn.myanimelist.net/s/common/ogp/ogp-mal.png';
            
            html += `
                <div class="anime-item" onclick="window.open('${item.url}', '_blank')">
                    <span class="anime-rank">#${index + 1}</span>
                    <img src="${imageUrl}" alt="${item.title}" class="anime-thumb"
                         onerror="this.src='https://cdn.myanimelist.net/s/common/ogp/ogp-mal.png'">
                    <div class="anime-info">
                        <h4>${item.title || 'Без названия'}</h4>
                        <div class="anime-meta">
                            <span class="anime-score">⭐ ${item.score || 'N/A'}</span>
                            <span class="anime-type">${item.type || 'Unknown'}</span>
                            <span class="anime-episodes">${item.episodes || '?'} эп.</span>
                        </div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        
        container.innerHTML = html;
    },
    
    displaySeasonalAnime(anime) {
        const container = document.getElementById('seasonalAnimeContainer');
        if (!container) return;
        
        if (!anime || anime.length === 0) {
            container.innerHTML = '<p style="color: #999; text-align: center;">😔 Не удалось загрузить</p>';
            return;
        }
        
        let html = '<div class="seasonal-grid">';
        anime.slice(0, 12).forEach(item => {
            const imageUrl = item.images?.jpg?.image_url || 'https://cdn.myanimelist.net/s/common/ogp/ogp-mal.png';
            
            html += `
                <div class="seasonal-card" onclick="window.open('${item.url}', '_blank')">
                    <img src="${imageUrl}" alt="${item.title}" 
                         onerror="this.src='https://cdn.myanimelist.net/s/common/ogp/ogp-mal.png'">
                    <div class="seasonal-info">
                        <h4>${item.title || 'Без названия'}</h4>
                        <span class="seasonal-score">⭐ ${item.score || 'N/A'}</span>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        
        container.innerHTML = html;
    },
    
    displaySearchResults(results, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        if (!results || results.length === 0) {
            container.innerHTML = '<p style="color: #999; text-align: center;">😔 Ничего не найдено<br><small>Попробуйте другой запрос</small></p>';
            return;
        }
        
        let html = '<div class="search-results">';
        results.forEach(item => {
            const imageUrl = item.images?.jpg?.image_url || 'https://cdn.myanimelist.net/s/common/ogp/ogp-mal.png';
            
            html += `
                <div class="search-item" onclick="window.open('${item.url}', '_blank')">
                    <img src="${imageUrl}" alt="${item.title}" 
                         onerror="this.src='https://cdn.myanimelist.net/s/common/ogp/ogp-mal.png'">
                    <div class="search-info">
                        <h4>${item.title || 'Без названия'}</h4>
                        <p class="search-meta">
                            ${item.type || 'Unknown'} • ${item.status || 'Unknown'} • 
                            ⭐ ${item.score || 'N/A'} • ${item.episodes || '?'} эп.
                        </p>
                        <p class="search-synopsis">${item.synopsis ? item.synopsis.substring(0, 150) + '...' : 'Описание недоступно'}</p>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        
        container.innerHTML = html;
    },
    
    showLoading(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '<div class="loading">⏳ Загрузка...</div>';
        }
    },
    
    async loadMoreNews() {
        if (this.newsState.isLoading || !this.newsState.hasMore) return;
        
        this.newsState.isLoading = true;
        this.showLoadingIndicator();
        this.newsState.currentPage++;
        
        try {
            const result = await AnimeAPI.getNews(12, this.newsState.currentPage);
            
            if (result.data.length > 0) {
                this.displayNews(result.data, true);
                this.newsState.hasMore = result.hasMore;
                if (!result.hasMore) this.showEndMessage();
            } else {
                this.showEndMessage();
            }
        } catch (error) {
            console.error('Ошибка загрузки новостей:', error);
        } finally {
            this.hideLoadingIndicator();
            this.newsState.isLoading = false;
        }
    }
};

// ===== Отслеживание прокрутки =====

let scrollTimeout = null;

function handleScroll() {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(() => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        if (scrollTop + windowHeight >= documentHeight * 0.8) {
            AnimeDisplay.loadMoreNews();
        }
    }, 200);
}

// ===== Инициализация =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Инициализация страницы новостей...');
    
    // Новости
    const newsContainer = document.getElementById('newsContainer');
    if (newsContainer) {
        console.log('Загружаем новости...');
        AnimeAPI.getNews(12, 1).then(result => {
            console.log('Результат:', result);
            AnimeDisplay.displayNews(result.data, false);
            AnimeDisplay.newsState.hasMore = result.hasMore;
            if (!result.hasMore) AnimeDisplay.showEndMessage();
            window.addEventListener('scroll', handleScroll);
        }).catch(err => {
            console.error('Критическая ошибка:', err);
            newsContainer.innerHTML = '<p style="color: red; text-align: center;">❌ Ошибка загрузки<br>Откройте консоль (F12) для деталей</p>';
        });
    }
    
    // Топ аниме
    const topContainer = document.getElementById('topAnimeContainer');
    if (topContainer) {
        console.log('Загружаем топ...');
        AnimeAPI.getTopAnime(8).then(anime => {
            console.log('Топ:', anime);
            AnimeDisplay.displayTopAnime(anime);
        }).catch(err => {
            console.error('Ошибка топа:', err);
        });
    }
    
    // Сезонное аниме
    const seasonalContainer = document.getElementById('seasonalAnimeContainer');
    if (seasonalContainer) {
        console.log('Загружаем сезон...');
        AnimeAPI.getCurrentSeason().then(anime => {
            console.log('Сезон:', anime);
            AnimeDisplay.displaySeasonalAnime(anime);
        }).catch(err => {
            console.error('Ошибка сезона:', err);
        });
    }
    
    // Поиск
    const searchForm = document.getElementById('animeSearchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const query = document.getElementById('searchInput').value.trim();
            
            if (query) {
                AnimeDisplay.showLoading('searchResultsContainer');
                const results = await AnimeAPI.searchAnime(query);
                AnimeDisplay.displaySearchResults(results, 'searchResultsContainer');
            }
        });
    }
});

window.addEventListener('beforeunload', () => {
    window.removeEventListener('scroll', handleScroll);
});

window.AnimeAPI = AnimeAPI;
window.AnimeDisplay = AnimeDisplay;