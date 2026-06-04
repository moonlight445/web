import sqlite3

class AniTasteDB:
    def __init__(self, db_name="anitaste.db"):
        self.db_name = db_name
        self.init_db()

    def get_connection(self):
        # Устанавливаем соединение с БД
        return sqlite3.connect(self.db_name)

    def init_db(self):
        """Создание таблиц, если они не существуют"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            # Таблица пользователей
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL,
                    favorite_genres TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            # Таблица просмотренного аниме
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS watched_anime (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    anime_title TEXT NOT NULL,
                    score INTEGER,
                    FOREIGN KEY (user_id) REFERENCES users (id)
                )
            ''')
            conn.commit()

    # --- РАБОТА С ПОЛЬЗОВАТЕЛЯМИ (РЕГИСТРАЦИЯ И ЧТЕНИЕ) ---

    def register_user(self, username, password, genres=""):
        """Запись (Create): Регистрация нового пользователя"""
        try:
            with self.get_connection() as conn:
                cursor = conn.cursor()
                # Используем параметры (?), чтобы избежать SQL-инъекций
                cursor.execute(
                    "INSERT INTO users (username, password, favorite_genres) VALUES (?, ?, ?)",
                    (username, password, genres)
                )
                conn.commit()
                return True
        except sqlite3.IntegrityError:
            print("Ошибка: Пользователь с таким именем уже существует.")
            return False

    def get_user_data(self, username):
        """Выборка (Read): Получение данных пользователя"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
            return cursor.fetchone()

    # --- ОБНОВЛЕНИЕ И УДАЛЕНИЕ ---

    def update_genres(self, user_id, new_genres):
        """Обновление (Update): Изменение любимых жанров"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                "UPDATE users SET favorite_genres = ? WHERE id = ?",
                (new_genres, user_id)
            )
            conn.commit()

    def delete_user(self, user_id):
        """Удаление (Delete): Удаление аккаунта"""
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))
            conn.commit()

# --- ПРИМЕР ИСПОЛЬЗОВАНИЯ ---
if __name__ == "__main__":
    db = AniTasteDB()
    
    # 1. Регистрация (Запись)
    if db.register_user("Andrey_Admin", "pink_sakura_123", "Сёнэн, Драма"):
        print("Пользователь зарегистрирован!")

    # 2. Получение данных (Выборка)
    user = db.get_user_data("Andrey_Admin")
    print(f"Данные из БД: {user}")

    # 3. Обновление (Update)
    if user:
        db.update_genres(user[0], "Сёнэн, Драма, Психология")
        print("Жанры обновлены.")

    # 4. Демонстрация удаления (закомментировано для сохранности данных)
    # db.delete_user(user[0])