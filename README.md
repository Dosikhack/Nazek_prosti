# Назек кешіресіңбе? 🫶

Кішкентай романтикалық mini-website: dark + pink стиль, glassmorphism, floating hearts, қашатын «Жоқ» батырмасы, өсетін «Иә» батырмасы және confetti финалы.

Таза **HTML / CSS / JavaScript**. Ешқандай framework немесе кітапхана жоқ — GitHub Pages-ке өзгеріссіз жүктеуге дайын.

## 📁 Структура проекта

```
nazek-site/
├── index.html      # разметка страницы
├── style.css       # все стили и анимации
├── script.js       # вся логика (hearts, кнопки, confetti)
└── README.md        # этот файл
```

## ▶️ Запуск локально

Просто открой `index.html` двойным кликом в браузере. Шрифты подгружаются с Google Fonts, поэтому нужен интернет.

---

## 🚀 Как загрузить сайт на GitHub и включить GitHub Pages

### Вариант A — через сайт GitHub (без терминала)

1. Зайди на [github.com](https://github.com) и войди в аккаунт.
2. Нажми **New** (или **+ → New repository**) сверху справа.
3. Введи имя репозитория, например `nazek-site`, оставь его **Public** и нажми **Create repository**.
4. На странице репозитория нажми **Add file → Upload files**.
5. Перетащи туда **все файлы** из этой папки: `index.html`, `style.css`, `script.js`, `README.md`.
   > Важно: загружай сами файлы, а не папку целиком, чтобы `index.html` лежал в корне репозитория.
6. Нажми **Commit changes**.
7. Перейди в **Settings → Pages** (слева в меню).
8. В разделе **Build and deployment → Source** выбери **Deploy from a branch**.
9. В **Branch** выбери `main` и папку `/ (root)`, затем **Save**.
10. Подожди 1–2 минуты и обнови страницу — появится зелёная плашка со ссылкой.

### Вариант B — через терминал (Git)

```bash
# в папке проекта
git init
git add .
git commit -m "Назек кешіресіңбе 🫶"
git branch -M main

# замени USERNAME и REPO на свои
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

Потом включи Pages так же, как в шагах 7–10 выше (**Settings → Pages**).

---

## 🔗 Какая будет ссылка

После включения GitHub Pages сайт будет доступен по адресу:

```
https://USERNAME.github.io/REPO/
```

Например, если твой логин `aida` и репозиторий `nazek-site`:

```
https://aida.github.io/nazek-site/
```

> Если хочешь короткую ссылку вида `https://USERNAME.github.io/` (без названия репозитория) —
> назови репозиторий именно `USERNAME.github.io` (где USERNAME — твой логин GitHub).

---

## 🎨 Как изменить текст

| Что менять | Где |
|---|---|
| Главный вопрос | `index.html` → блок `<h1 class="title">` |
| Подпись под заголовком | `index.html` → `<p class="subtitle">` |
| Текст кнопок | `index.html` → `#yesBtn` и `#noBtn` |
| Финальный текст «ой, отдуши» | `index.html` → блок `.finale__content` |
| Фразы-дразнилки при побеге кнопки | `script.js` → массив `TAUNTS` |
| Цвета / розовый оттенок | `style.css` → секция `:root` (`--pink`, `--rose`, и т.д.) |

Готово! 💖
