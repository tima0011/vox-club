/* js/materials.js — Interactive Materials View
   1. AREO-Тренажёр («Собери аргумент», Click-to-Slot, 7 кейсов)
   2. Генератор тем раунда (32 темы, 4 категории) + Турнирный таймер
   3. База быстрых шпаргалок с копированием
   4. Быстрый переход по якорям секций
*/
(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════════════
  // 1. DATA: AREO CASES (7 full cases)
  // ═══════════════════════════════════════════════════════════════════════════
  var AREO_CASES = [
    {
      id: 1,
      topicTag: 'Школа и образование',
      resolution: 'Эта палата запретит домашние задания в старших классах',
      cards: [
        {
          id: 'case1-a',
          type: 'assertion',
          typeLabel: 'Assertion · Тезис',
          text: 'Отмена обязательных домашних заданий снимет проблему хронического стресса и переутомления старшеклассников.'
        },
        {
          id: 'case1-r',
          type: 'reasoning',
          typeLabel: 'Reasoning · Объяснение',
          text: 'В 10–11 классах совокупная учебная нагрузка превышает 50 часов в неделю, а депривация сна приводит к эмоциональному выгоранию и падению познавательной мотивации.'
        },
        {
          id: 'case1-e',
          type: 'evidence',
          typeLabel: 'Evidence · Пример / факт',
          text: 'Исследования Stanford University и опыт реформы школ Финляндии доказывают, что ограничение ДЗ до 30 минут в день повышает успеваемость на 28% и улучшает психологическое благополучие.'
        },
        {
          id: 'case1-o',
          type: 'outcome',
          typeLabel: 'Outcome · Вывод / импакт',
          text: 'В масштабах раунда мы защищаем базовое право подростка на здоровье и осознанную профориентацию против механической и неэффективной зубрёжки.'
        }
      ]
    },
    {
      id: 2,
      topicTag: 'Технологии и ИИ',
      resolution: 'Эта палата обяжет школы обучать работе с генеративным ИИ вместо его запрета',
      cards: [
        {
          id: 'case2-a',
          type: 'assertion',
          typeLabel: 'Assertion · Тезис',
          text: 'Тотальные запреты генеративного ИИ неэффективны и создают цифровое неравенство, тогда как открытая интеграция развивает критическое мышление.'
        },
        {
          id: 'case2-r',
          type: 'reasoning',
          typeLabel: 'Reasoning · Объяснение',
          text: 'Когда школа запрещает технологию, ученики используют её бесконтрольно; легализация же переносит акцент с механического написания на фактчекинг, промпт-инжиниринг и проверку источников.'
        },
        {
          id: 'case2-e',
          type: 'evidence',
          typeLabel: 'Evidence · Пример / факт',
          text: 'Эксперимент в 40 гимназиях Сингапура показал, что практические уроки анализа галлюцинаций нейросетей улучшили глубину аналитических эссе учащихся на 35%.'
        },
        {
          id: 'case2-o',
          type: 'outcome',
          typeLabel: 'Outcome · Вывод / импакт',
          text: 'Мы готовим школьников к реальному рынку труда XXI века, где ключевым навыком становится верификация данных, а не слепое механическое воспроизведение контента.'
        }
      ]
    },
    {
      id: 3,
      topicTag: 'Права и культура',
      resolution: 'Эта палата отменит обязательную школьную форму во всех средних учебных заведениях',
      cards: [
        {
          id: 'case3-a',
          type: 'assertion',
          typeLabel: 'Assertion · Тезис',
          text: 'Принудительная унификация одежды подавляет индивидуальность и право на самовыражение подростков в ключевой период формирования личности.'
        },
        {
          id: 'case3-r',
          type: 'reasoning',
          typeLabel: 'Reasoning · Объяснение',
          text: 'Одежда — первичный маркер идентичности; принудительный дресс-код провоцирует скрытый протест и смещает фокус администрации с качества знаний на дисциплинарный надзор.'
        },
        {
          id: 'case3-e',
          type: 'evidence',
          typeLabel: 'Evidence · Пример / факт',
          text: 'Масштабный мета-анализ ОЭСР и UNESCO в 25 странах не выявил никакой статистически значимой связи между наличием формы и академической успеваемостью или уровнем буллинга.'
        },
        {
          id: 'case3-o',
          type: 'outcome',
          typeLabel: 'Outcome · Вывод / импакт',
          text: 'Приоритетом современной школы должно быть воспитание свободной, ответственной личности, готовой к осознанному выбору, а не конформное подчинение внешним регламентам.'
        }
      ]
    },
    {
      id: 4,
      topicTag: 'Здоровье и цифровая среда',
      resolution: 'Эта палата законодательно ограничит экранное время подростков до 2 часов в день',
      cards: [
        {
          id: 'case4-a',
          type: 'assertion',
          typeLabel: 'Assertion · Тезис',
          text: 'Законодательное ограничение экранного времени снизит риск развития тревожно-депрессивных расстройств и улучшит физическое здоровье подростков.'
        },
        {
          id: 'case4-r',
          type: 'reasoning',
          typeLabel: 'Reasoning · Объяснение',
          text: 'Алгоритмы соцсетей намеренно удерживают внимание через механизм дофаминовых петель, а волевая саморегуляция в подростковом возрасте ещё биологически не сформирована.'
        },
        {
          id: 'case4-e',
          type: 'evidence',
          typeLabel: 'Evidence · Пример / факт',
          text: 'Исследования Harvard Medical School и европейский опыт цифрового детокса подтверждают снижение уровня бессонницы и синдрома дефицита внимания на 31% при ограничении экранов.'
        },
        {
          id: 'case4-o',
          type: 'outcome',
          typeLabel: 'Outcome · Вывод / импакт',
          text: 'Государство обязано защищать базовую безопасность развивающейся психики детей от манипулятивных бизнес-моделей технологических корпораций.'
        }
      ]
    },
    {
      id: 5,
      topicTag: 'Школа и технологии',
      resolution: 'Эта палата заменит бумажные школьные учебники на единый защищённый планшет',
      cards: [
        {
          id: 'case5-a',
          type: 'assertion',
          typeLabel: 'Assertion · Тезис',
          text: 'Переход на единый электронный носитель снижает физическую нагрузку на школьников и гарантирует мгновенный доступ к актуальной информации.'
        },
        {
          id: 'case5-r',
          type: 'reasoning',
          typeLabel: 'Reasoning · Объяснение',
          text: 'Бумажные учебники устаревают за годы до переиздания, а тяжёлые рюкзаки приводят к хроническим сколиозам у 40% старшеклассников.'
        },
        {
          id: 'case5-e',
          type: 'evidence',
          typeLabel: 'Evidence · Пример / факт',
          text: 'Государственная программа Южной Кореи "Digital Textbook" показала, что планшеты сократили расходы госбюджета на переиздание книг на 25% и ускорили поиск данных на уроках.'
        },
        {
          id: 'case5-o',
          type: 'outcome',
          typeLabel: 'Outcome · Вывод / импакт',
          text: 'Мы создаём современную, экологичную и гибкую среду обучения вместо неэффективных бюджетных затрат на тонны ежегодно устаревающей макулатуры.'
        }
      ]
    },
    {
      id: 6,
      topicTag: 'Школьная программа',
      resolution: 'Эта палата введёт обязательные уроки финансовой грамотности за счёт сокращения часов тригонометрии',
      cards: [
        {
          id: 'case6-a',
          type: 'assertion',
          typeLabel: 'Assertion · Тезис',
          text: 'Школьная программа обязана формировать прикладные жизненные навыки, критически необходимые для независимой взрослой жизни каждого гражданина.'
        },
        {
          id: 'case6-r',
          type: 'reasoning',
          typeLabel: 'Reasoning · Объяснение',
          text: 'Сложные разделы тригонометрии нужны лишь будущим инженерам, тогда как с кредитами, налогами, инвестициями и финансовыми пирамидами сталкивается 100% выпускников.'
        },
        {
          id: 'case6-e',
          type: 'evidence',
          typeLabel: 'Evidence · Пример / факт',
          text: 'Анализ Всемирного банка и опыт школьной реформы в Эстонии доказали, что уроки финграмотности снизили уровень закредитованности и банкротств среди молодёжи на 27%.'
        },
        {
          id: 'case6-o',
          type: 'outcome',
          typeLabel: 'Outcome · Вывод / импакт',
          text: 'Приоритет всеобщего образования — финансовая безопасность и устойчивость гражданина, а узкую математику рациональнее оставить профильным спецклассам.'
        }
      ]
    },
    {
      id: 7,
      topicTag: 'Спорт и общество',
      resolution: 'Эта палата запретит участие в коммерческих киберспортивных турнирах лицам младше 16 лет',
      cards: [
        {
          id: 'case7-a',
          type: 'assertion',
          typeLabel: 'Assertion · Тезис',
          text: 'Запрет профессионального киберспорта до 16 лет защитит подростков от ранней коммерческой эксплуатации и потери шанса на полноценное базовое образование.'
        },
        {
          id: 'case7-r',
          type: 'reasoning',
          typeLabel: 'Reasoning · Объяснение',
          text: 'Профессиональная сцена требует по 12–14 часов тренировок ежедневно; погоня за контрактами заставляет бросать школу, хотя успешную карьеру строит лишь 0.01% игроков.'
        },
        {
          id: 'case7-e',
          type: 'evidence',
          typeLabel: 'Evidence · Пример / факт',
          text: 'Отчёт ВОЗ по азиатскому киберспортивному рынку зафиксировал, что 68% несовершеннолетних про-игроков страдают от туннельного синдрома, нарушений зрения и социальной дезадаптации.'
        },
        {
          id: 'case7-o',
          type: 'outcome',
          typeLabel: 'Outcome · Вывод / импакт',
          text: 'Мы защищаем детей от риска остаться у разбитого корыта без здоровья и аттестата ради сиюминутной сверхприбыли киберспортивных клубов.'
        }
      ]
    }
  ];

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. DATA: RESOLUTIONS DATABASE (32 topics, 8 per category)
  // ═══════════════════════════════════════════════════════════════════════════
  var RESOLUTIONS = [
    // ── 1. ШКОЛА (8 тем) ──
    { category: 'school', categoryLabel: 'Школа · Образование', text: 'Эта палата заменит традиционные оценки (1–5) качественной обратной связью без баллов' },
    { category: 'school', categoryLabel: 'Школа · Образование', text: 'Эта палата предоставит ученикам 9–11 классов право самостоятельно выбирать 50% школьных предметов' },
    { category: 'school', categoryLabel: 'Школа · Образование', text: 'Эта палата введёт обязательные уроки критического мышления и дебатов вместо ОБЖ' },
    { category: 'school', categoryLabel: 'Школа · Образование', text: 'Эта палата отменит все государственные экзамены в формате стандартизированного тестирования' },
    { category: 'school', categoryLabel: 'Школа · Образование', text: 'Эта палата запретит использование смартфонов в учебных аудиториях во время школьных занятий' },
    { category: 'school', categoryLabel: 'Школа · Образование', text: 'Эта палата перенесёт начало уроков в старших классах на 10:00 для сохранения здоровья подростков' },
    { category: 'school', categoryLabel: 'Школа · Образование', text: 'Эта палата сделает участие в волонтёрских проектах обязательным условием получения аттестата' },
    { category: 'school', categoryLabel: 'Школа · Образование', text: 'Эта палата введёт регулярную анонимную оценку работы учителей школьниками с влиянием на премии' },

    // ── 2. ТЕХНОЛОГИИ И ИИ (8 тем) ──
    { category: 'tech', categoryLabel: 'Технологии · ИИ', text: 'Эта палата запретит использование алгоритмов рекомендаций в социальных сетях для несовершеннолетних' },
    { category: 'tech', categoryLabel: 'Технологии · ИИ', text: 'Эта палата признает право произведений генеративного ИИ на статус общественного достояния' },
    { category: 'tech', categoryLabel: 'Технологии · ИИ', text: 'Эта палата введёт персональный экологический налог на тренировку крупных генеративных моделей' },
    { category: 'tech', categoryLabel: 'Технологии · ИИ', text: 'Эта палата запретит разработку полностью автономных боевых систем под управлением искусственного интеллекта' },
    { category: 'tech', categoryLabel: 'Технологии · ИИ', text: 'Эта палата возложит прямую юридическую ответственность за ошибки ИИ на компании-разработчики' },
    { category: 'tech', categoryLabel: 'Технологии · ИИ', text: 'Эта палата обяжет маркировать любой сгенерированный нейросетью контент несмываемым цифровым водяным знаком' },
    { category: 'tech', categoryLabel: 'Технологии · ИИ', text: 'Эта палата запретит применение систем распознавания лиц в общественных пространствах городов' },
    { category: 'tech', categoryLabel: 'Технологии · ИИ', text: 'Эта палата введёт уголовную ответственность за создание несанкционированных дипфейков реальных людей' },

    // ── 3. ОБЩЕСТВО (8 тем) ──
    { category: 'society', categoryLabel: 'Общество · Политика', text: 'Эта палата сделает участие в гражданских выборах обязательным под угрозой административного штрафа' },
    { category: 'society', categoryLabel: 'Общество · Экономика', text: 'Эта палата ограничит максимальный доход топ-менеджеров кратностью к медианной зарплате компании' },
    { category: 'society', categoryLabel: 'Общество · Права', text: 'Эта палата снизит возраст активного избирательного права до 16 лет' },
    { category: 'society', categoryLabel: 'Общество · Социальная сфера', text: 'Эта палата введёт безусловный базовый доход для всей молодёжи в возрасте от 18 до 25 лет' },
    { category: 'society', categoryLabel: 'Общество · Урбанистика', text: 'Эта палата сделает весь общественный транспорт в мегаполисах полностью бесплатным за счёт налога на авто' },
    { category: 'society', categoryLabel: 'Общество · Экономика', text: 'Эта палата законодательно закрепит 4-дневную рабочую неделю с сохранением заработной платы' },
    { category: 'society', categoryLabel: 'Общество · Бюджет', text: 'Эта палата откажется от проведения коммерческих мега-событий (Олимпиады, ЧМ) за счёт государственного бюджета' },
    { category: 'society', categoryLabel: 'Общество · Инфраструктура', text: 'Эта палата запретит приватизацию и частное владение объектами коммунального водоснабжения и электросетей' },

    // ── 4. ПОП-КУЛЬТУРА И СПОРТ (8 тем) ──
    { category: 'culture', categoryLabel: 'Культура · Спорт', text: 'Эта палата признает киберспорт официальным олимпийским видом спорта наравне с классическими дисциплинами' },
    { category: 'culture', categoryLabel: 'Культура · Спорт', text: 'Эта палата запретит прямое государственное финансирование профессиональных футбольных и хоккейных клубов' },
    { category: 'culture', categoryLabel: 'Культура · Медиа', text: 'Эта палата ограничит влияние фанатских сообществ на сюжетные и кастинговые решения в киноиндустрии' },
    { category: 'culture', categoryLabel: 'Культура · Медиа', text: 'Эта палата полностью запретит рекламу букмекерских контор и ставок на спорт во время медиа-трансляций' },
    { category: 'culture', categoryLabel: 'Культура · Искусство', text: 'Эта палата считает, что престижные мировые кинопремии должны отказаться от разделения актёрских номинаций по полу' },
    { category: 'culture', categoryLabel: 'Культура · Игры', text: 'Эта палата запретит использование механик лутбоксов и микротранзакций в видеоиграх с рейтингом до 18 лет' },
    { category: 'culture', categoryLabel: 'Культура · Творчество', text: 'Эта палата отдаст предпочтение развитию сообществ независимых инди-авторов перед поддержкой гигантских медиа-франшиз' },
    { category: 'culture', categoryLabel: 'Культура · Стриминг', text: 'Эта палата обяжет стриминговые платформы направлять 20% локальной выручки в национальные фонды поддержки дебютного кино' }
  ];

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. DATA: CHEATSHEETS TEXT FOR CLIPBOARD
  // ═══════════════════════════════════════════════════════════════════════════
  var CHEAT_TEXTS = {
    structure: [
      '★ Конструктор речи 5 минут (World Schools):',
      '• 0:00–1:00 — Хук и модель: яркий пример/хук, дефиниции, статус-кво и модель палаты (POI запрещены).',
      '• 1:00–4:00 — Аргументы и отбивка: контраргументация оппонентов + 2 ключевых аргумента по AREO (окно POI: взять 1–2).',
      '• 4:00–5:00 — Взвешивание (Weighing): сравнение миров, масштабность, необратимость и долгосрочность импакта (POI запрещены).'
    ].join('\n'),

    poi: [
      '★ Правило POI (Point of Information):',
      '• Как задавать (15 сек): встать со словами «POI!» / «Вопрос!». Сформулировать ровно 1 острый вопрос или панч. До 15 секунд, без предисловий.',
      '• Как принимать: спикер решает сам — принять («Слушаю вас») или вежливо отклонить («Спасибо, нет»).',
      '• Тайминг и этикет: только с 1:00 по 4:00 мин речи. Норма — ровно 1–2 принятых вопроса за речь.'
    ].join('\n'),

    fallacies: [
      '★ 4 главные ошибки логики в дебатах:',
      '1. Соломенное чучело (Straw Man): утрирование тезиса оппонента для лёгкого опровержения. Фикс: возвращайте к реальной формулировке.',
      '2. Ad Hominem: атака на возраст, опыт или личность вместо сути аргумента. Фикс: требуйте анализа логики.',
      '3. Ложная дилемма (False Dilemma): сведение ситуации к двум крайностям («либо так, либо катастрофа»). Фикс: покажите промежуточные альтернативы.',
      '4. Slippery Slope (Скользкая дорожка): утверждение без доказательств о цепи катастроф от одного шага. Фикс: требуйте доказать причинную связь каждого звена.'
    ].join('\n')
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. AREO-ТРЕНАЖЁР LOGIC
  // ═══════════════════════════════════════════════════════════════════════════
  var areoState = {
    currentCaseIndex: 0,
    slotOrder: ['assertion', 'reasoning', 'evidence', 'outcome'],
    slotAssignments: {
      assertion: null,
      reasoning: null,
      evidence: null,
      outcome: null
    },
    poolCards: []
  };

  function shuffleArray(arr) {
    var copy = arr.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }

  function loadAreoCase(index) {
    if (index < 0) index = AREO_CASES.length - 1;
    if (index >= AREO_CASES.length) index = 0;
    areoState.currentCaseIndex = index;

    var c = AREO_CASES[index];
    areoState.slotAssignments = {
      assertion: null,
      reasoning: null,
      evidence: null,
      outcome: null
    };

    // Shuffle cards for pool
    areoState.poolCards = shuffleArray(c.cards);

    // Update Header
    var indicatorEl = document.getElementById('areo-case-indicator');
    var topicTagEl = document.getElementById('areo-case-topic-tag');
    var resTextEl = document.getElementById('areo-resolution-text');
    var feedbackEl = document.getElementById('areo-feedback');
    var nextCaseBtn = document.getElementById('areo-next-case-action-btn');

    if (indicatorEl) indicatorEl.textContent = 'Кейс ' + (index + 1) + ' из ' + AREO_CASES.length;
    if (topicTagEl) topicTagEl.textContent = c.topicTag;
    if (resTextEl) resTextEl.textContent = c.resolution;
    clearDom(feedbackEl);
    if (nextCaseBtn) nextCaseBtn.classList.add('is-hidden');

    renderAreoSlots();
    renderAreoPool();
  }

  // ── SAFE DOM UTILITIES ───────────────────────────────────────────────────
  function clearDom(el) {
    if (!el) return;
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  function setFeedbackBadge(feedbackEl, type, message) {
    if (!feedbackEl) return;
    clearDom(feedbackEl);
    var badge = document.createElement('span');
    badge.className = 'areo-feedback-badge areo-feedback-badge--' + type;

    var iconWrapper = document.createElement('span');
    iconWrapper.setAttribute('aria-hidden', 'true');
    iconWrapper.style.display = 'inline-flex';
    iconWrapper.style.alignItems = 'center';

    if (type === 'success') {
      iconWrapper.innerHTML = '<svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>';
    } else if (type === 'warning') {
      iconWrapper.innerHTML = '<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>';
    } else {
      iconWrapper.innerHTML = '<svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>';
    }

    var textNode = document.createTextNode(' ' + message);
    badge.appendChild(iconWrapper);
    badge.appendChild(textNode);
    feedbackEl.appendChild(badge);
  }

  function renderAreoSlots() {
    areoState.slotOrder.forEach(function (slotKey) {
      var slotEl = document.getElementById('slot-' + slotKey);
      var bodyEl = document.getElementById('slot-body-' + slotKey);
      if (!slotEl || !bodyEl) return;

      // Reset validation classes
      slotEl.classList.remove('is-correct', 'is-wrong', 'is-wrong-shake');
      clearDom(bodyEl);

      var assignedCard = areoState.slotAssignments[slotKey];
      if (assignedCard) {
        slotEl.classList.add('is-filled');

        var cardDiv = document.createElement('div');
        cardDiv.className = 'areo-slot-card';
        cardDiv.setAttribute('data-card-id', assignedCard.id);
        cardDiv.title = 'Нажмите, чтобы вернуть в пул';
        cardDiv.setAttribute('role', 'button');
        cardDiv.tabIndex = 0;

        var textP = document.createElement('p');
        textP.className = 'areo-slot-card__text';
        textP.textContent = assignedCard.text; // Safe textContent (prevents XSS)

        var hintSpan = document.createElement('span');
        hintSpan.className = 'areo-slot-card__hint';
        hintSpan.innerHTML = '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> Вернуть в пул';

        cardDiv.appendChild(textP);
        cardDiv.appendChild(hintSpan);
        bodyEl.appendChild(cardDiv);
      } else {
        slotEl.classList.remove('is-filled');
        var placeholderText = 'Нажмите на фрагмент из пула';
        if (slotKey === 'assertion') placeholderText = 'Нажмите на тезис из пула ниже';
        else if (slotKey === 'reasoning') placeholderText = 'Нажмите на объяснение из пула ниже';
        else if (slotKey === 'evidence') placeholderText = 'Нажмите на пример или факт из пула';
        else if (slotKey === 'outcome') placeholderText = 'Нажмите на вывод или импакт из пула';

        var emptyDiv = document.createElement('div');
        emptyDiv.className = 'areo-slot__empty-msg';

        var svgSpan = document.createElement('span');
        svgSpan.setAttribute('aria-hidden', 'true');
        svgSpan.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

        var textSpan = document.createElement('span');
        textSpan.textContent = placeholderText; // Safe textContent

        emptyDiv.appendChild(svgSpan);
        emptyDiv.appendChild(textSpan);
        bodyEl.appendChild(emptyDiv);
      }
    });
  }

  function renderAreoPool() {
    var poolGrid = document.getElementById('areo-pool-grid');
    if (!poolGrid) return;

    clearDom(poolGrid);

    // Filter cards currently in slots
    var assignedIds = {};
    areoState.slotOrder.forEach(function (key) {
      if (areoState.slotAssignments[key]) {
        assignedIds[areoState.slotAssignments[key].id] = true;
      }
    });

    var availableCards = areoState.poolCards.filter(function (card) {
      return !assignedIds[card.id];
    });

    if (availableCards.length === 0) {
      var emptyDiv = document.createElement('div');
      emptyDiv.className = 'areo-pool-empty';

      var iconSpan = document.createElement('span');
      iconSpan.className = 'areo-pool-empty__icon';
      iconSpan.textContent = '✓';

      var textP = document.createElement('p');
      textP.className = 'areo-pool-empty__text';
      textP.textContent = 'Все карточки распределены по слотам. Нажмите «Проверить», чтобы узнать результат!';

      emptyDiv.appendChild(iconSpan);
      emptyDiv.appendChild(textP);
      poolGrid.appendChild(emptyDiv);
      return;
    }

    availableCards.forEach(function (card) {
      var cardDiv = document.createElement('div');
      cardDiv.className = 'areo-pool-card';
      cardDiv.setAttribute('data-card-id', card.id);
      cardDiv.setAttribute('role', 'button');
      cardDiv.tabIndex = 0;

      var hintSpan = document.createElement('span');
      hintSpan.className = 'areo-pool-card__drag-hint';
      hintSpan.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 9h14M5 15h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> Нажмите для перемещения в слот';

      var p = document.createElement('p');
      p.className = 'areo-pool-card__text';
      p.textContent = card.text; // Safe textContent (prevents XSS)

      cardDiv.appendChild(hintSpan);
      cardDiv.appendChild(p);
      poolGrid.appendChild(cardDiv);
    });
  }

  // Put card in first free slot
  function handlePoolCardClick(cardId) {
    var currentCase = AREO_CASES[areoState.currentCaseIndex];
    var cardObj = currentCase.cards.find(function (c) { return c.id === cardId; });
    if (!cardObj) return;

    // Find first empty slot
    var targetSlot = null;
    for (var i = 0; i < areoState.slotOrder.length; i++) {
      var slotKey = areoState.slotOrder[i];
      if (!areoState.slotAssignments[slotKey]) {
        targetSlot = slotKey;
        break;
      }
    }

    if (!targetSlot) {
      showToast('Все слоты AREO заполнены! Нажмите «Проверить» или освободите слот.');
      return;
    }

    areoState.slotAssignments[targetSlot] = cardObj;
    renderAreoSlots();
    renderAreoPool();

    // Clear feedback when editing
    var feedbackEl = document.getElementById('areo-feedback');
    clearDom(feedbackEl);
  }

  // Return card from slot to pool
  function handleSlotCardClick(slotKey) {
    if (!areoState.slotAssignments[slotKey]) return;
    areoState.slotAssignments[slotKey] = null;
    renderAreoSlots();
    renderAreoPool();

    var feedbackEl = document.getElementById('areo-feedback');
    clearDom(feedbackEl);
    var nextCaseBtn = document.getElementById('areo-next-case-action-btn');
    if (nextCaseBtn) nextCaseBtn.classList.add('is-hidden');
  }

  // Check AREO argument logic
  function checkAreoOrder() {
    var feedbackEl = document.getElementById('areo-feedback');
    var nextCaseBtn = document.getElementById('areo-next-case-action-btn');

    // 1. Are all slots filled?
    var allFilled = areoState.slotOrder.every(function (key) {
      return areoState.slotAssignments[key] !== null;
    });

    if (!allFilled) {
      setFeedbackBadge(feedbackEl, 'warning', 'Заполните все 4 слота AREO перед проверкой!');
      return;
    }

    // 2. Validate correctness
    var incorrectSlots = [];
    areoState.slotOrder.forEach(function (slotKey) {
      var slotEl = document.getElementById('slot-' + slotKey);
      var card = areoState.slotAssignments[slotKey];
      if (card.type === slotKey) {
        if (slotEl) {
          slotEl.classList.remove('is-wrong', 'is-wrong-shake');
          slotEl.classList.add('is-correct');
        }
      } else {
        incorrectSlots.push(slotKey);
        if (slotEl) {
          slotEl.classList.remove('is-correct');
          slotEl.classList.add('is-wrong', 'is-wrong-shake');
          setTimeout(function () {
            slotEl.classList.remove('is-wrong-shake');
          }, 600);
        }
      }
    });

    // 3. Feedback results
    if (incorrectSlots.length === 0) {
      // 100% correct!
      setFeedbackBadge(feedbackEl, 'success', 'Идеальная связка +100 к убедительности');
      if (nextCaseBtn) nextCaseBtn.classList.remove('is-hidden');
    } else {
      setFeedbackBadge(feedbackEl, 'error', 'Логическая ошибка в выделенных слотах. Попробуйте переставить карточки!');
      if (nextCaseBtn) nextCaseBtn.classList.add('is-hidden');
    }
  }
  }

  function resetAreo() {
    loadAreoCase(areoState.currentCaseIndex);
  }

  function initAreoTrainer() {
    var checkBtn = document.getElementById('areo-check-btn');
    var resetBtn = document.getElementById('areo-reset-btn');
    var prevBtn = document.getElementById('areo-prev-case-btn');
    var nextBtn = document.getElementById('areo-next-case-btn');
    var nextCaseActionBtn = document.getElementById('areo-next-case-action-btn');
    var poolGrid = document.getElementById('areo-pool-grid');
    var slotsGrid = document.getElementById('areo-slots-grid');

    if (checkBtn) checkBtn.addEventListener('click', checkAreoOrder);
    if (resetBtn) resetBtn.addEventListener('click', resetAreo);
    if (prevBtn) prevBtn.addEventListener('click', function () {
      loadAreoCase(areoState.currentCaseIndex - 1);
    });
    if (nextBtn) nextBtn.addEventListener('click', function () {
      loadAreoCase(areoState.currentCaseIndex + 1);
    });
    if (nextCaseActionBtn) nextCaseActionBtn.addEventListener('click', function () {
      loadAreoCase(areoState.currentCaseIndex + 1);
    });

    // Delegate click on pool cards
    if (poolGrid) {
      poolGrid.addEventListener('click', function (e) {
        var cardEl = e.target.closest('.areo-pool-card');
        if (!cardEl) return;
        var cardId = cardEl.getAttribute('data-card-id');
        if (cardId) handlePoolCardClick(cardId);
      });
      // Keyboard support
      poolGrid.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          var cardEl = e.target.closest('.areo-pool-card');
          if (!cardEl) return;
          e.preventDefault();
          var cardId = cardEl.getAttribute('data-card-id');
          if (cardId) handlePoolCardClick(cardId);
        }
      });
    }

    // Delegate click inside slot to remove card
    if (slotsGrid) {
      slotsGrid.addEventListener('click', function (e) {
        var slotCardEl = e.target.closest('.areo-slot-card');
        if (!slotCardEl) return;
        var slotEl = slotCardEl.closest('.areo-slot');
        if (!slotEl) return;
        var slotKey = slotEl.getAttribute('data-slot');
        if (slotKey) handleSlotCardClick(slotKey);
      });
      // Keyboard support
      slotsGrid.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          var slotCardEl = e.target.closest('.areo-slot-card');
          if (!slotCardEl) return;
          var slotEl = slotCardEl.closest('.areo-slot');
          if (!slotEl) return;
          e.preventDefault();
          var slotKey = slotEl.getAttribute('data-slot');
          if (slotKey) handleSlotCardClick(slotKey);
        }
      });
    }

    // Initial load
    loadAreoCase(0);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. RESOLUTION GENERATOR LOGIC
  // ═══════════════════════════════════════════════════════════════════════════
  var generatorState = {
    activeFilter: 'all',
    currentTopic: null
  };

  function getRandomTopic() {
    var pool = RESOLUTIONS;
    if (generatorState.activeFilter !== 'all') {
      pool = RESOLUTIONS.filter(function (t) {
        return t.category === generatorState.activeFilter;
      });
    }
    if (!pool.length) pool = RESOLUTIONS;

    // Avoid picking identical topic consecutively if pool has > 1
    var next = pool[Math.floor(Math.random() * pool.length)];
    if (pool.length > 1 && generatorState.currentTopic && next.text === generatorState.currentTopic.text) {
      var filtered = pool.filter(function (t) { return t.text !== generatorState.currentTopic.text; });
      if (filtered.length) {
        next = filtered[Math.floor(Math.random() * filtered.length)];
      }
    }
    return next;
  }

  function displayTopic(topic) {
    generatorState.currentTopic = topic;
    var topicTextEl = document.getElementById('generator-topic-text');
    var catBadgeEl = document.getElementById('generator-cat-badge');

    if (!topicTextEl) return;

    // Smooth transition
    topicTextEl.classList.add('is-switching');
    setTimeout(function () {
      topicTextEl.textContent = '«' + topic.text.replace(/^[«"]|[»"]$/g, '') + '»';
      if (catBadgeEl) catBadgeEl.textContent = topic.categoryLabel;
      topicTextEl.classList.remove('is-switching');
    }, 180);
  }

  function initResolutionGenerator() {
    var chipsBar = document.querySelector('.tool-chips-bar');
    var randomBtn = document.getElementById('btn-random-topic');
    var copyBtn = document.getElementById('btn-copy-topic');

    if (chipsBar) {
      chipsBar.addEventListener('click', function (e) {
        var chip = e.target.closest('.tool-chip');
        if (!chip) return;

        var filter = chip.getAttribute('data-filter') || 'all';
        generatorState.activeFilter = filter;

        chipsBar.querySelectorAll('.tool-chip').forEach(function (c) {
          var isCurrent = c === chip;
          c.classList.toggle('is-active', isCurrent);
          c.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
        });

        displayTopic(getRandomTopic());
      });
    }

    if (randomBtn) {
      randomBtn.addEventListener('click', function () {
        displayTopic(getRandomTopic());
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        if (!generatorState.currentTopic) return;
        copyToClipboard(generatorState.currentTopic.text, 'Тема скопирована в буфер!');
      });
    }

    // Initial display
    displayTopic(RESOLUTIONS[0]);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 6. DEBATE TIMER LOGIC
  // ═══════════════════════════════════════════════════════════════════════════
  var timerState = {
    presetSeconds: 300, // 5 min default
    remainingSeconds: 300,
    isRunning: false,
    intervalId: null
  };

  function formatTime(totalSeconds) {
    var m = Math.floor(totalSeconds / 60);
    var s = totalSeconds % 60;
    var mm = m < 10 ? '0' + m : '' + m;
    var ss = s < 10 ? '0' + s : '' + s;
    return mm + ':' + ss;
  }

  function updateTimerUI() {
    var digitsEl = document.getElementById('timer-digits');
    var barEl = document.getElementById('timer-progress-bar');
    var stageEl = document.getElementById('timer-stage-badge');
    var hintEl = document.getElementById('timer-protection-hint');
    var displayBox = document.getElementById('timer-display-box');
    var startBtn = document.getElementById('timer-start-btn');
    var pauseBtn = document.getElementById('timer-pause-btn');
    var startLabel = document.getElementById('timer-start-label');

    if (digitsEl) digitsEl.textContent = formatTime(timerState.remainingSeconds);

    // Progress bar
    if (barEl) {
      var pct = timerState.presetSeconds > 0
        ? Math.max(0, Math.min(100, (timerState.remainingSeconds / timerState.presetSeconds) * 100))
        : 0;
      barEl.style.width = pct + '%';
    }

    // Buttons
    if (startBtn && pauseBtn) {
      if (timerState.isRunning) {
        startBtn.disabled = true;
        startBtn.classList.remove('btn-primary');
        startBtn.classList.add('btn-ghost');
        pauseBtn.disabled = false;
        pauseBtn.classList.remove('btn-ghost');
        pauseBtn.classList.add('btn-primary');
      } else {
        startBtn.disabled = false;
        startBtn.classList.add('btn-primary');
        startBtn.classList.remove('btn-ghost');
        pauseBtn.disabled = true;
        pauseBtn.classList.add('btn-ghost');
        pauseBtn.classList.remove('btn-primary');
        if (startLabel) {
          startLabel.textContent = (timerState.remainingSeconds < timerState.presetSeconds && timerState.remainingSeconds > 0)
            ? 'Продолжить'
            : 'Старт';
        }
      }
    }

    // 15 seconds warning mode (amber-red pulsing)
    if (displayBox) {
      if (timerState.remainingSeconds <= 15 && timerState.remainingSeconds > 0 && timerState.isRunning) {
        displayBox.classList.add('is-warning-pulse');
        displayBox.classList.remove('is-finished');
        if (stageEl) stageEl.textContent = 'Внимание: финал речи!';
        if (hintEl) hintEl.textContent = 'Осталось менее 15 секунд — завершайте речь';
      } else if (timerState.remainingSeconds === 0) {
        displayBox.classList.remove('is-warning-pulse');
        displayBox.classList.add('is-finished');
        if (stageEl) stageEl.textContent = 'Время вышло!';
        if (hintEl) hintEl.textContent = 'Регламент спикера исчерпан';
      } else {
        displayBox.classList.remove('is-warning-pulse', 'is-finished');
        if (timerState.isRunning) {
          if (stageEl) stageEl.textContent = 'Идёт раунд';
          // Protected minutes logic for 5 min speech
          if (timerState.presetSeconds === 300) {
            var elapsed = 300 - timerState.remainingSeconds;
            if (elapsed < 60) {
              if (hintEl) hintEl.textContent = 'Защищённая 1-я минута (POI запрещены)';
            } else if (timerState.remainingSeconds <= 60) {
              if (hintEl) hintEl.textContent = 'Защищённая финальная минута (POI запрещены)';
            } else {
              if (hintEl) hintEl.textContent = 'Открытая зона вопросов (POI разрешены)';
            }
          } else {
            if (hintEl) hintEl.textContent = 'Таймер активен';
          }
        } else {
          if (stageEl) stageEl.textContent = 'Готов к запуску';
          if (hintEl) hintEl.textContent = 'Защищённая 1-я и последняя минуты';
        }
      }
    }
  }

  // Play subtle synthesis beep on timer finish / warning
  function playBeep(freq, duration) {
    try {
      var AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      var ctx = new AudioCtx();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq || 587.33, ctx.currentTime); // D5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (duration || 0.4));
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + (duration || 0.4));
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  function startTimer() {
    if (timerState.isRunning) return;
    if (timerState.remainingSeconds <= 0) {
      timerState.remainingSeconds = timerState.presetSeconds;
    }

    clearInterval(timerState.intervalId);
    timerState.isRunning = true;
    updateTimerUI();

    timerState.intervalId = setInterval(function () {
      if (timerState.remainingSeconds > 0) {
        timerState.remainingSeconds--;
        if (timerState.remainingSeconds === 15) {
          playBeep(440, 0.3); // Alert beep
        }
        updateTimerUI();
      } else {
        pauseTimer();
        playBeep(659.25, 0.7); // Finish chime
        updateTimerUI();
      }
    }, 1000);
  }

  function pauseTimer() {
    if (timerState.intervalId) {
      clearInterval(timerState.intervalId);
      timerState.intervalId = null;
    }
    timerState.isRunning = false;
    updateTimerUI();
  }

  function resetTimer() {
    pauseTimer();
    timerState.remainingSeconds = timerState.presetSeconds;
    updateTimerUI();
  }

  function setTimerPreset(seconds) {
    pauseTimer();
    timerState.presetSeconds = seconds;
    timerState.remainingSeconds = seconds;

    var presetButtons = document.querySelectorAll('.timer-preset-btn');
    presetButtons.forEach(function (btn) {
      var s = parseInt(btn.getAttribute('data-seconds'), 10);
      var isCurrent = s === seconds;
      btn.classList.toggle('is-active', isCurrent);
      btn.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
    });

    updateTimerUI();
  }

  function initDebateTimer() {
    var startBtn = document.getElementById('timer-start-btn');
    var pauseBtn = document.getElementById('timer-pause-btn');
    var resetBtn = document.getElementById('timer-reset-btn');
    var presetButtons = document.querySelectorAll('.timer-preset-btn');

    if (startBtn) startBtn.addEventListener('click', startTimer);
    if (pauseBtn) pauseBtn.addEventListener('click', pauseTimer);
    if (resetBtn) resetBtn.addEventListener('click', resetTimer);

    presetButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sec = parseInt(btn.getAttribute('data-seconds'), 10);
        if (!isNaN(sec)) setTimerPreset(sec);
      });
    });

    setTimerPreset(300);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 7. CHEATSHEETS LOGIC & CLIPBOARD TOAST
  // ═══════════════════════════════════════════════════════════════════════════
  var toastTimer = null;

  function showToast(message) {
    var toast = document.getElementById('mat-toast');
    var msgEl = document.getElementById('mat-toast-msg');
    if (!toast) return;

    if (msgEl) msgEl.textContent = message || 'Скопировано!';
    toast.classList.add('is-show');
    toast.setAttribute('aria-hidden', 'false');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('is-show');
      toast.setAttribute('aria-hidden', 'true');
    }, 2400);
  }

  function copyToClipboard(text, successMsg) {
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast(successMsg || 'Скопировано в буфер!');
      }).catch(function () {
        fallbackCopy(text, successMsg);
      });
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast(successMsg || 'Скопировано в буфер!');
    } catch (err) {
      showToast('Не удалось скопировать');
    }
    document.body.removeChild(ta);
  }

  function initCheatsheets() {
    var copyButtons = document.querySelectorAll('.cheat-copy-btn');
    copyButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cheatKey = btn.getAttribute('data-cheat');
        if (cheatKey && CHEAT_TEXTS[cheatKey]) {
          copyToClipboard(CHEAT_TEXTS[cheatKey], 'Суть шпаргалки скопирована!');
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 8. HERO ANCHORS (Quick scroll buttons)
  // ═══════════════════════════════════════════════════════════════════════════
  function initHeroAnchors() {
    var anchorBtns = document.querySelectorAll('.mat-anchor-btn');
    anchorBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var targetId = btn.getAttribute('data-target');
        if (!targetId) return;
        var targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 9. LIFECYCLE & GLOBAL EXPORTS
  // ═══════════════════════════════════════════════════════════════════════════
  var isInitialized = false;

  function initMaterialsView() {
    var view = document.getElementById('view-materials');
    if (!view) return;

    if (!isInitialized) {
      initHeroAnchors();
      initAreoTrainer();
      initResolutionGenerator();
      initDebateTimer();
      initCheatsheets();
      isInitialized = true;
    } else {
      // Re-entering view: ensure UI is fresh, timer not leaking
      updateTimerUI();
    }
  }

  function cleanupMaterialsView() {
    // When leaving the screen, always pause timer and clear interval
    pauseTimer();
  }

  // Expose to window for router.js integration
  window.initMaterialsView = initMaterialsView;
  window.cleanupMaterialsView = cleanupMaterialsView;

  // Auto-init if DOM ready and materials is initial view
  document.addEventListener('DOMContentLoaded', function () {
    var hash = (window.location.hash || '').replace('#', '').split('?')[0];
    if (hash === 'materials') {
      initMaterialsView();
    }
  });

})();
