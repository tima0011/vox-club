# 🎙️ VOX Debate Club Platform

> **Live Production**: [https://vox-club.vercel.app/](https://vox-club.vercel.app/)  
> **Format**: World Schools Debate & Model United Nations (MUN)  
> **Status**: Release v1.1 — Production Ready (Milestone v1.1)

---

## 🇷🇺 О проекте (Russian)

**VOX Debate Club Platform** — интерактивная веб-платформа для школьного дебатного клуба, объединяющая форматы World Schools Debate и Модель ООН (MUN). Платформа разработана в премиальной эстетике Dark SaaS с акцентом на высокую интерактивность, доступность и мгновенный отклик без тяжелых фреймворков.

### ✨ Ключевые возможности

1. **Интерактивный AREO-тренажёр («Собери аргумент»)**:
   - Практическая мини-игра (Click-to-Slot) для отработки структуры убедительной речи:
     - **A** (Assertion) — Тезис
     - **R** (Reasoning) — Логическое обоснование
     - **E** (Evidence) — Факты и статистика
     - **O** (Outcome) — Влияние и вывод
   - Банк из **7 проработанных кейсов** с мгновенной проверкой логической связки и анимацией обратной связи.
   - **Click-Swap & Сетка 2х2**: рокировка аргументов между слотами в 2 клика и ультракомпактная мобильная сетка.
2. **Турнирный дебатный таймер**:
   - Пресеты: 4 мин (подготовка), 5 мин (речь новичка), 8 мин (официальный регламент WSDC).
   - Индикация защищенных минут (запрет реплик с места — POI) и звуковые сигналы гонга на Web Audio API.
3. **Генератор тем раундов**:
   - База из **32 резолюций** по 4 категориям (*Школа*, *Технологии и ИИ*, *Общество*, *Философия и этика*).
   - Фильтрация по категориям и кнопка быстрой генерации случайной темы.
4. **Дорожная карта на 10 недель**:
   - Структурированный трек развития в 3 этапа (*Базовые навыки*, *Турнирные дебаты*, *Модель ООН & Дипломатия*).
   - **Нативная мобильная свайп-карусель (CSS Scroll Snap)** для комфортного просмотра недель без бесконечного вертикального скролла.
   - Динамический бейдж круглогодичного открытого набора и фокус на текущей неделе.
   - Минималистичный таймлайн занятия: **15'** (Теория) → **20'** (Подготовка) → **40'** (Раунд) → **15'** (Судейский разбор).
5. **Шпаргалки и проверенные первоисточники**:
   - Быстрые шпаргалки дебатёра с мобильной свайп-каруселью и копированием в буфер обмена в один клик.
   - Компактная мобильная сетка 2х2 для ссылок на официальные руководства ООН, Best Delegate, Атлас софизмов и SEP.
6. **Бренд и строгий Hero-дизайн**:
   - Фирменная парящая круглая эмблема клуба VOX KAIS с мягким неоновым ореолом свечения, очищенная от псевдонаучного визуального шума.
7. **Защищенная форма записи**:
   - Клиентская санитизация данных, встроенная ловушка ботов (Honeypot), защита от повторных кликов (`isSubmitting`) и `AbortController` с таймаутом 15 сек.
   - Прямая интеграция с Google Таблицами через Google Apps Script Web App.

---

## 🇬🇧 About the Project (English)

**VOX Debate Club Platform** is an interactive, lightweight single-page web platform designed for school debate clubs practicing World Schools Debate and Model United Nations (MUN) formats. Built with a sleek Dark SaaS visual language, providing zero-dependency speed and interactive learning tools.

### 🚀 Key Features

* **AREO Argument Constructor**: Drag/click interactive trainer based on the AREO framework (Assertion, Reasoning, Evidence, Outcome) across 7 tournament-grade debate cases, featuring 2-click slot swapping (Click-Swap) and compact mobile 2x2 grid.
* **Debate Round Timer**: Built-in 4/5/8-minute speech timer with Point of Information (POI) protected minute logic and Web Audio synth bell sounds.
* **Motions & Resolutions Generator**: Database of 32 curated motions across 4 categories with smooth filtering.
* **10-Week Cohort Curriculum**: 3-stage semester track with mobile CSS Scroll Snap swipe carousel, rolling admission status, and a 4-step debate meeting workflow (15' 20' 40' 15').
* **Cheat Sheets & Primary Sources**: Mobile horizontal swipe carousel, one-click clipboard copy for speech rules, and compact 2x2 resource tiles (UN MUN Guide, Best Delegate, Fallacy Guides, SEP).
* **Refined Hero & Brand Identity**: Floating glowing circular VOX KAIS emblem with dual drop-shadow aura, free of clutter and AI-generated noise.
* **Anti-Abuse Registration Form**: Honeypot bot protection, debounce submission guards, string sanitization, network timeouts, and asynchronous Google Apps Script dispatch.

---

## 🛠️ Стек технологий / Tech Stack

* **Frontend**: Vanilla HTML5, Modern CSS3 (CSS Variables, Flexbox, CSS Grid), Vanilla ES6+ JavaScript.
* **Routing**: Hash-based lightweight SPA router (`#home`, `#program`, `#materials`, `#register`) with smooth page transitions.
* **Architecture**: Zero npm dependencies, 100% native browser APIs, optimal Core Web Vitals (CWV).
* **Audio**: Native Web Audio API synthesizer for debate bell alerts (zero audio assets to download).
* **Deployment**: Vercel Edge Network.

---

## 📂 Структура проекта / Project Structure

```text
VOX web/
├── index.html              # Core single-page markup & shell
├── README.md               # Presentation & documentation
├── PROJECT_MAP.md          # Internal architecture map
├── css/
│   ├── reset.css           # Modern reset with horizontal overflow protection
│   ├── tokens.css          # Design system tokens (colors, typography, spacing)
│   ├── components.css      # Reusable UI primitives (buttons, cards, badges)
│   ├── layout.css          # Shell layout (navbar, grids, steps, footer)
│   ├── animations.css      # Scroll reveal & keyframe animations
│   ├── spa.css             # View-specific styles (AREO, roadmap, timer, form)
│   └── pages/home.css      # Homepage specific hero & interactive orbs
└── js/
    ├── router.js           # SPA hash router & view transitions
    ├── nav.js              # Sticky navbar scroll listener & mobile drawer
    ├── theme.js            # Enforced dark theme controller
    ├── animate.js          # IntersectionObserver scroll reveals
    ├── home.js             # Animated stat counters & dynamic footer year
    ├── program.js          # Interactive mouse glow effects on roadmap cards
    ├── materials.js        # AREO game engine, debate timer, topic generator, cheatsheets
    └── register.js         # Form validation, honeypot anti-spam, Apps Script dispatch
```

---

## 💻 Локальный запуск / Local Development

Проект не требует сборщиков (Node.js, Webpack, Vite не обязательны). Запустить проект можно любым статическим веб-сервером:

### Вариант 1: VS Code Live Server
1. Откройте директорию в **VS Code**;
2. Нажмите правой кнопкой на `index.html` → **«Open with Live Server»**.

### Вариант 2: Python HTTP Server
```bash
# В терминале в корневой папке проекта:
python -m http.server 3000
```
Затем откройте в браузере: `http://localhost:3000`

### Вариант 3: Любой браузер
Просто дважды кликните по файлу `index.html` в проводнике.

---

## 🚀 Деплой / Deployment

### Vercel (Production)
Проект настроен для моментального деплоя на Vercel из ветки `main`:
1. Репозиторий: `https://github.com/tima0011/vox-club`
2. Root Directory: `./` (корневая папка)
3. Build Command: *оставить пустым*
4. Output Directory: *оставить пустым*

При каждом пуше в ветку `main` Vercel автоматически разворачивает актуальную версию на [vox-club.vercel.app](https://vox-club.vercel.app/).

---

## 📌 История релизов / Release Notes

### v1.1 (02.10.2026) — Milestone: Mobile UX & Brand Refactor
* **Нативные свайп-карусели (CSS Scroll Snap)**: горизонтальный свайп для дорожной карты программы (10 недель) и базы быстрых шпаргалок с скрытием полос прокрутки.
* **AREO-тренажер v1.1**: компактная мобильная сетка 2х2 и интерактивная рокировка аргументов в 2 клика (Click-Swap).
* **Мобильное меню**: изолирующий полноэкранный оверлей с `z-index: 9999` и `backdrop-filter: blur(24px)`.
* **Бренд и Hero**: парящая круглая эмблема клуба VOX KAIS с неоновым контуром, полное удаление визуального AI-слопа.
* **Контент**: карточка уровня английского (ENG A2-B1+ Note Card) и круглогодичный открытый набор.
* **Первоисточники**: компактная сетка 2x2 на смартфонах.

### v1.0 (01.10.2026) — Initial Production Release
* Первичный публичный релиз платформы, 4 SPA-экрана, AREO-тренажер, таймер раундов, генератор тем, форма записи в Google Таблицы.

---

## 📄 Лицензия / License

© 2026 VOX Debate Club. Все права защищены.
