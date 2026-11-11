/**
 * MARAR DROP 3.0 ULTIMATE — Полный скрипт мега шуточного казино со всеми фичами:
 * - Битвы кейсов против ботов (Case Battles 1v1)
 * - Плинко (Plinko) с физикой отскока шарика на Canvas
 * - Шуточные напёрстки (Thimbles) с перемешиванием стаканчиков
 * - Контракты обмена (Котёл Марара)
 * - Пассивный доход / Империя бизнеса (Idle-майнинг)
 * - Профиль игрока, Уровни (XP), Звания и Аватарки
 * - Кейсы с 3D Tilt эффектом
 * - CS:GO рулетка
 * - Crash (Ракета Марара)
 * - Сапёр (Mines 5x5)
 * - Апгрейдер предметов (Upgrader)
 * - Выдвижной чат с ботами
 * - Промокоды + Шуточный бан
 * - Колесо Фортуны (Canvas Lucky Wheel)
 * - Достижения (Ачивки)
 * - Web Audio API звуковой синтезатор
 */

// ============================================================================
// 1. БАЗА ДАННЫХ ПРЕДМЕТОВ, КЕЙСОВ И АВАТАРОК
// ============================================================================

const RARITIES = {
  common: { name: 'Ширпотреб', color: '#94a3b8', class: 'rarity-common', weight: 55 },
  uncommon: { name: 'Армейское', color: '#38bdf8', class: 'rarity-uncommon', weight: 25 },
  rare: { name: 'Засекреченное', color: '#c084fc', class: 'rarity-rare', weight: 12 },
  legendary: { name: 'Тайное', color: '#ff204e', class: 'rarity-legendary', weight: 6 },
  exotic: { name: 'Экзотическое', color: '#fbbf24', class: 'rarity-exotic', weight: 2 }
};

const CASES_DATA = [
  {
    id: 'bomzh',
    name: 'Кейс «Общажный Бомж-Пакет»',
    desc: 'Стартовый набор первокурсника: чистый кипяток, майонез и вера в светлое будущее.',
    price: 50,
    icon: '🍜',
    badge: 'ЭКОНОМ',
    glow: '#10b981',
    items: [
      { id: 'bp1', name: 'Пакетик чая «Принцесса Нури»', icon: '🫖', rarity: 'common', price: 12 },
      { id: 'bp2', name: 'Полбулки черствого батона', icon: '🍞', rarity: 'common', price: 22 },
      { id: 'bp3', name: 'Майонез «Провансаль» на донышке', icon: '🍶', rarity: 'uncommon', price: 45 },
      { id: 'bp4', name: 'Кипятильник из лезвий «Нева»', icon: '⚡', rarity: 'uncommon', price: 75 },
      { id: 'bp5', name: 'Чужая сковородка с общей кухни', icon: '🍳', rarity: 'rare', price: 160 },
      { id: 'bp6', name: 'Банка тушенки с настоящим мясом', icon: '🥫', rarity: 'legendary', price: 380 },
      { id: 'bp7', name: 'Ключ от свободной душевой кабинки', icon: '🗝️', rarity: 'exotic', price: 1200 }
    ]
  },
  {
    id: 'student',
    name: 'Студенческий Кейс',
    desc: 'Набор для выживания на стипендию: от пустого пакетика до автомата по сессии.',
    price: 150,
    icon: '📦',
    badge: 'СТУДЕНТ',
    glow: '#3b82f6',
    items: [
      { id: 's1', name: 'Пустой Дошик', icon: '🥣', rarity: 'common', price: 25 },
      { id: 's2', name: 'Купон в столовку (2018 г.)', icon: '🎫', rarity: 'common', price: 40 },
      { id: 's3', name: 'Ручка без пасты', icon: '🖊️', rarity: 'uncommon', price: 80 },
      { id: 's4', name: 'Шпаргалка размером с ковер', icon: '📜', rarity: 'uncommon', price: 130 },
      { id: 's5', name: 'Счастливый студенческий билет', icon: '🪪', rarity: 'rare', price: 320 },
      { id: 's6', name: 'Конспект отличницы с ароматом лаванды', icon: '📖', rarity: 'legendary', price: 750 },
      { id: 's7', name: 'Автомат по Высшей Математике', icon: '🎓', rarity: 'exotic', price: 2600 }
    ]
  },
  {
    id: 'anime',
    name: 'Аниме Кейс Отаку',
    desc: 'Концентрированная сила дружбы, катаны с Алиэкспресса и любимые вайфу.',
    price: 250,
    icon: '🌸',
    badge: 'ОТАКУ',
    glow: '#ec4899',
    items: [
      { id: 'an1', name: 'Стикер с тянкой на телефон', icon: '🏷️', rarity: 'common', price: 55 },
      { id: 'an2', name: 'Ободок с кошачьими ушками', icon: '🐱', rarity: 'common', price: 95 },
      { id: 'an3', name: 'Рамэн «Ичираку» быстрого заваривания', icon: '🍜', rarity: 'uncommon', price: 200 },
      { id: 'an4', name: 'Катана Саске из FixPrice', icon: '🗡️', rarity: 'uncommon', price: 280 },
      { id: 'an5', name: 'Фигурка без руки из посылки', icon: '🎎', rarity: 'rare', price: 620 },
      { id: 'an6', name: 'Огромная Дакимакура в полный рост', icon: '🛏️', rarity: 'legendary', price: 1650 },
      { id: 'an7', name: 'Билет на Comic-Con в Токио (Бизнес)', icon: '✈️', rarity: 'exotic', price: 5200 }
    ]
  },
  {
    id: 'meme',
    name: 'Мемный Кейс Марара',
    desc: 'Сборник концентрированного абсурда из глубин интернета.',
    price: 350,
    icon: '🐸',
    badge: 'МЕМ',
    glow: '#8b5cf6',
    items: [
      { id: 'm1', name: 'Синий экран смерти (BSOD)', icon: '💻', rarity: 'common', price: 60 },
      { id: 'm2', name: 'Подписка на чистый кислород', icon: '🌬️', rarity: 'common', price: 100 },
      { id: 'm3', name: 'Шаурма в сырном лаваше', icon: '🌯', rarity: 'uncommon', price: 280 },
      { id: 'm4', name: 'Большой Русский Кот Шлёпа', icon: '🐱', rarity: 'rare', price: 650 },
      { id: 'm5', name: 'Pepe в смокинге с бокалом', icon: '🤵', rarity: 'legendary', price: 1500 },
      { id: 'm6', name: 'Золотая кнопка «БАБЛО»', icon: '🔘', rarity: 'exotic', price: 4800 }
    ]
  },
  {
    id: 'garage',
    name: 'Гаражный Кейс Бати',
    desc: 'Сокровища дедушкиного погреба и отцовского верстака.',
    price: 600,
    icon: '🛢️',
    badge: 'БАТЯ',
    glow: '#f97316',
    items: [
      { id: 'g1', name: 'Ржавый гвоздь на 120', icon: '🔩', rarity: 'common', price: 80 },
      { id: 'g2', name: 'Истинная Синяя Изолента', icon: '🌀', rarity: 'uncommon', price: 350 },
      { id: 'g3', name: 'Оригинальный баллон WD-40', icon: '🥫', rarity: 'rare', price: 950 },
      { id: 'g4', name: 'Батин рассол 1999 года', icon: '🥒', rarity: 'legendary', price: 2400 },
      { id: 'g5', name: 'Ключи от девятки ВАЗ-2109', icon: '🚗', rarity: 'exotic', price: 8500 }
    ]
  },
  {
    id: 'streamer',
    name: 'Кейс Стримера «Хайп Твич»',
    desc: 'Оборудование для донатов, вебки с мылом и вечный бан от модераторов.',
    price: 850,
    icon: '🎙️',
    badge: 'ХАЙП',
    glow: '#a855f7',
    items: [
      { id: 'st1', name: 'Веб-камера Genius 480p с шумами', icon: '📹', rarity: 'common', price: 180 },
      { id: 'st2', name: 'Анонимный донат на 10 рублей', icon: '💸', rarity: 'common', price: 270 },
      { id: 'st3', name: 'RGB Кольцевая лампа блогера', icon: '💡', rarity: 'uncommon', price: 650 },
      { id: 'st4', name: 'Микрофон HyperX с красной подсветкой', icon: '🎙️', rarity: 'uncommon', price: 920 },
      { id: 'st5', name: 'Геймерское кресло с ушками', icon: '🪑', rarity: 'rare', price: 2400 },
      { id: 'st6', name: 'Донат на 50 000 руб от Арабского Шейха', icon: '💎', rarity: 'legendary', price: 5800 },
      { id: 'st7', name: 'Кнопка Разбана на Твиче', icon: '🔓', rarity: 'exotic', price: 18000 }
    ]
  },
  {
    id: 'vip',
    name: 'VIP Кейс Олигарха',
    desc: 'Роскошь, которую заслужил каждый школьник и студент.',
    price: 1200,
    icon: '👑',
    badge: 'VIP',
    glow: '#fbbf24',
    items: [
      { id: 'v1', name: 'Пакет из ЦУМа с кирпичами', icon: '🛍️', rarity: 'common', price: 160 },
      { id: 'v2', name: 'Кроссовки с подсветкой подошвы', icon: '👟', rarity: 'uncommon', price: 680 },
      { id: 'v3', name: 'Чипсы со вкусом черной икры', icon: '🥔', rarity: 'rare', price: 1900 },
      { id: 'v4', name: 'Крипто-кошелёк с 0.0000001 BTC', icon: '🪙', rarity: 'legendary', price: 4700 },
      { id: 'v5', name: 'Яхта Марара из золотого картона', icon: '🛥️', rarity: 'exotic', price: 16000 }
    ]
  },
  {
    id: 'cyber',
    name: 'Кейс Киберпанк 2077',
    desc: 'Хай-тек, лоу-лайф: неоновые импланты, протезы из фольги и биочипы.',
    price: 1800,
    icon: '🦾',
    badge: 'НЕОН',
    glow: '#06b6d4',
    items: [
      { id: 'cb1', name: 'Очки с неоновыми полосками', icon: '🕶️', rarity: 'common', price: 380 },
      { id: 'cb2', name: 'Нелегальный брейнданец из Найт-Сити', icon: '📼', rarity: 'common', price: 590 },
      { id: 'cb3', name: 'Кибер-протез пальца с зажигалкой', icon: '👆', rarity: 'uncommon', price: 1350 },
      { id: 'cb4', name: 'Летающий дрон курьера с шаурмой', icon: '🛸', rarity: 'uncommon', price: 1950 },
      { id: 'cb5', name: 'Биочип «Relic» с оцифрованным Мараром', icon: '🧬', rarity: 'rare', price: 4900 },
      { id: 'cb6', name: 'Легендарные клинки богомола', icon: '⚔️', rarity: 'legendary', price: 12000 },
      { id: 'cb7', name: 'Орбитальный Шаттл Корпорации Арасака', icon: '🚀', rarity: 'exotic', price: 38000 }
    ]
  },
  {
    id: 'crypto',
    name: 'Кейс «Крипто-Ферма»',
    desc: 'Шум вентиляторов, пробитые кредитки и вечный полет на Луну (To the Moon).',
    price: 2800,
    icon: '⚡',
    badge: 'ТОП',
    glow: '#f59e0b',
    items: [
      { id: 'cr1', name: 'Сгоревшая видеокарта RX 580 с майнинга', icon: '🔥', rarity: 'common', price: 650 },
      { id: 'cr2', name: 'Шумный кулер Delta на 7000 оборотов', icon: '💨', rarity: 'common', price: 980 },
      { id: 'cr3', name: 'Флешка с забытым сид-паролем от кошелька', icon: '🔐', rarity: 'uncommon', price: 2200 },
      { id: 'cr4', name: 'Майнинг-риг на 8 карт в картонной коробке', icon: '🖥️', rarity: 'uncommon', price: 3200 },
      { id: 'cr5', name: 'Топовая видеокарта RTX 4090 24GB OC', icon: '📟', rarity: 'rare', price: 7500 },
      { id: 'cr6', name: 'Аппаратный сейф Ledger из чистого золота', icon: '🛡️', rarity: 'legendary', price: 19500 },
      { id: 'cr7', name: 'Один Настоящий Физический Bitcoin', icon: '🪙', rarity: 'exotic', price: 60000 }
    ]
  },
  {
    id: 'god',
    name: 'Секретный Кейс Марара',
    desc: 'Абсолютная власть над казино: золотой трон, вертолет и печать создателя.',
    price: 5000,
    icon: '💎',
    badge: 'SECRET',
    glow: '#ff204e',
    items: [
      { id: 'gd1', name: 'Чехол для iPhone с золотым ликом Марара', icon: '📱', rarity: 'common', price: 1100 },
      { id: 'gd2', name: 'Фирменные носки Marar Drop (+100 к удаче)', icon: '🧦', rarity: 'common', price: 1600 },
      { id: 'gd3', name: 'Черная безлимитная карта Marar Black Card', icon: '💳', rarity: 'uncommon', price: 3900 },
      { id: 'gd4', name: 'Исходный код сайта на золотой дискете 3.5', icon: '💾', rarity: 'uncommon', price: 5500 },
      { id: 'gd5', name: 'Золотой унитаз с подогревом и подсветкой', icon: '🚽', rarity: 'rare', price: 14000 },
      { id: 'gd6', name: 'Черный вертолет с мигалкой и аудиосистемой', icon: '🚁', rarity: 'legendary', price: 38000 },
      { id: 'gd7', name: 'Корона Марара Великого Повелителя Азарта', icon: '👑', rarity: 'exotic', price: 135000 }
    ]
  }
];

const ALL_CATALOG_ITEMS = [];
CASES_DATA.forEach(c => {
  c.items.forEach(it => {
    if (!ALL_CATALOG_ITEMS.some(x => x.name === it.name)) {
      ALL_CATALOG_ITEMS.push(it);
    }
  });
});
ALL_CATALOG_ITEMS.sort((a, b) => a.price - b.price);

const ROULETTE_NUMBERS = [
  { num: 0, color: 'green', mult: 14, label: 'МАРАР' },
  { num: 1, color: 'red', mult: 2, label: '1' },
  { num: 14, color: 'black', mult: 2, label: '14' },
  { num: 2, color: 'red', mult: 2, label: '2' },
  { num: 13, color: 'black', mult: 2, label: '13' },
  { num: 3, color: 'red', mult: 2, label: '3' },
  { num: 12, color: 'black', mult: 2, label: '12' },
  { num: 4, color: 'red', mult: 2, label: '4' },
  { num: 11, color: 'black', mult: 2, label: '11' },
  { num: 5, color: 'red', mult: 2, label: '5' },
  { num: 10, color: 'black', mult: 2, label: '10' },
  { num: 6, color: 'red', mult: 2, label: '6' },
  { num: 9, color: 'black', mult: 2, label: '9' },
  { num: 7, color: 'red', mult: 2, label: '7' },
  { num: 8, color: 'black', mult: 2, label: '8' }
];

const ACHIEVEMENTS_DATA = [
  { id: 'mom_boy', name: 'Маменькин сынок', desc: 'Нажми кнопку «Мама, дай денег!» 5 раз', icon: '👶', reward: 500 },
  { id: 'case_lover', name: 'Кейсоман', desc: 'Открой 5 любых кейсов', icon: '📦', reward: 350 },
  { id: 'crash_pilot', name: 'На волоске', desc: 'Забери выигрыш в Crash на x2.0 или выше', icon: '🚀', reward: 600 },
  { id: 'mines_pro', name: 'Сапёр-профи', desc: 'Открой 4 безопасные клетки в Сапёре', icon: '💣', reward: 400 },
  { id: 'alchemist', name: 'Алхимик Марара', desc: 'Успешно улучши предмет в Апгрейдере', icon: '⚡', reward: 800 },
  { id: 'battle_hero', name: 'Гладиатор Кейсов', desc: 'Выиграй дуэль в Битве Кейсов', icon: '⚔️', reward: 700 },
  { id: 'plinko_luck', name: 'Плинко-Мастер', desc: 'Попади в карман x10 или x50 в Плинко', icon: '🟢', reward: 1000 },
  { id: 'dorm_rich', name: 'Олигарх из общаги', desc: 'Накопи баланс свыше 15 000 MD', icon: '👑', reward: 1500 },
  { id: 'bonus_master', name: 'Ловец Бонусок', desc: 'Активируй бонусную игру фриспинов в слоте Marar Bonanza', icon: '🎰', reward: 1200 },
  { id: 'mega_win', name: 'Занос Года', desc: 'Поймай выигрыш более 25x от ставки в слоте', icon: '💥', reward: 2000 }
];

const AVATARS = [
  { id: 'cat', icon: '🐱', name: 'Шлёпа' },
  { id: 'pepe', icon: '🐸', name: 'Пепе' },
  { id: 'batya', icon: '🚗', name: 'Батя' },
  { id: 'sigma', icon: '🕶️', name: 'Сигма' },
  { id: 'student', icon: '🎓', name: 'Студент' }
];

const BUSINESSES_DATA = [
  { id: 'shawarma', name: 'Ларёк с шаурмой на вокзале', icon: '🌯', baseCost: 200, incomePerSec: 5 },
  { id: 'mining', name: 'Ферма майнинга на утюгах', icon: '⚡', baseCost: 1000, incomePerSec: 28 },
  { id: 'notes', name: 'Перепродажа конспектов', icon: '📚', baseCost: 4500, incomePerSec: 140 },
  { id: 'crypto', name: 'Крипто-котельная Марара', icon: '🏭', baseCost: 18000, incomePerSec: 650 }
];

// ============================================================================
// 1.5. TELEGRAM MINI APP (TMA) ИНТЕГРАЦИЯ (НАТИВНЫЕ ФИЧИ + ЛОКАЛЬНЫЙ СТЕЙТ)
// ============================================================================

const TMA = {
  tg: null,
  isTMA: false,
  lastHapticAt: 0,
  observer: null,

  init() {
    const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
    if (!tg) return;
    this.tg = tg;
    this.isTMA = Boolean(tg.initData || (tg.platform && tg.platform !== 'unknown'));

    try {
      tg.ready();
      tg.expand();
      if (typeof tg.disableVerticalSwipes === 'function') tg.disableVerticalSwipes();
      if (typeof tg.setHeaderColor === 'function') tg.setHeaderColor('#08080c');
      if (typeof tg.setBackgroundColor === 'function') tg.setBackgroundColor('#08080c');
    } catch (e) {}

    if (this.isTMA) {
      document.body.classList.add('is-tma');
    }

    if (typeof tg.onEvent === 'function') {
      tg.onEvent('viewportChanged', () => this.syncViewport());
    }
    this.syncViewport();

    if (tg.BackButton && typeof tg.BackButton.onClick === 'function') {
      tg.BackButton.onClick(() => this.handleBackButton());
    }

    this.watchOverlays();
    this.syncUserProfile();
    this.updateBackButton();
  },

  syncViewport() {
    if (!this.tg) return;
    const h = this.tg.viewportStableHeight || this.tg.viewportHeight;
    if (h) {
      document.documentElement.style.setProperty('--tg-vh', `${h}px`);
    }
    if (typeof resizeSlotCanvas === 'function') resizeSlotCanvas();
    if (typeof window._resizeCrash === 'function') window._resizeCrash();
  },

  syncUserProfile() {
    const user = this.tg?.initDataUnsafe?.user;
    if (!user) return;
    const tgDisplay = user.username
      ? `@${user.username}`
      : [user.first_name, user.last_name].filter(Boolean).join(' ');

    // Заполняем имя из Telegram при первом запуске, но всё хранится в localStorage
    if (tgDisplay && !localStorage.getItem('marar_profile_name')) {
      STATE.profile.name = tgDisplay;
      saveState();
    }

    const tgRow = document.getElementById('profileTgRow');
    const tgUserEl = document.getElementById('profileTgUser');
    if (tgRow && tgUserEl && tgDisplay) {
      tgRow.style.display = 'flex';
      tgUserEl.textContent = tgDisplay;
    }
  },

  hapticImpact(style = 'light', minGapMs = 0) {
    if (!this.tg?.HapticFeedback) return;
    if (minGapMs > 0) {
      const now = Date.now();
      if (now - this.lastHapticAt < minGapMs) return;
      this.lastHapticAt = now;
    }
    try {
      this.tg.HapticFeedback.impactOccurred(style);
    } catch (e) {}
  },

  hapticNotify(type = 'success') {
    if (!this.tg?.HapticFeedback) return;
    try {
      this.tg.HapticFeedback.notificationOccurred(type);
    } catch (e) {}
  },

  watchOverlays() {
    if (this.observer || typeof MutationObserver === 'undefined') return;
    const targets = [
      ...document.querySelectorAll('.modal-overlay'),
      document.getElementById('chatDrawer'),
      document.getElementById('tab-games')
    ].filter(Boolean);

    this.observer = new MutationObserver(() => this.updateBackButton());
    targets.forEach(el => {
      this.observer.observe(el, { attributes: true, attributeFilter: ['class'] });
    });
  },

  updateBackButton() {
    if (!this.tg?.BackButton || !this.isTMA) return;
    const hasOpenModal = Boolean(document.querySelector('.modal-overlay.open:not(#banModal)'));
    const hasChatOpen = Boolean(document.getElementById('chatDrawer')?.classList.contains('open'));
    const activeSub = document.querySelector('#tab-games.active .subgame-view.active');
    const inSubGame = Boolean(activeSub && activeSub.id !== 'subgame-hub');
    const activeTab = document.querySelector('.nav-tab.active')?.dataset.tab;
    const notHomeTab = Boolean(activeTab && activeTab !== 'cases');

    try {
      if (hasOpenModal || hasChatOpen || inSubGame || notHomeTab) {
        this.tg.BackButton.show();
      } else {
        this.tg.BackButton.hide();
      }
    } catch (e) {}
  },

  handleBackButton() {
    this.hapticImpact('light');
    const chatDrawer = document.getElementById('chatDrawer');
    if (chatDrawer?.classList.contains('open')) {
      chatDrawer.classList.remove('open');
      this.updateBackButton();
      return;
    }

    const openModals = Array.from(document.querySelectorAll('.modal-overlay.open'));
    if (openModals.length > 0) {
      const topModal = openModals[openModals.length - 1];
      if (topModal.id === 'banModal') return;
      if (topModal.id === 'caseModal') {
        if (typeof closeCaseModal === 'function') closeCaseModal();
      } else {
        topModal.classList.remove('open');
      }
      this.updateBackButton();
      return;
    }

    const activeSub = document.querySelector('#tab-games.active .subgame-view.active');
    if (activeSub && activeSub.id !== 'subgame-hub') {
      openSubGame('hub');
      return;
    }

    const casesTab = document.querySelector('.nav-tab[data-tab="cases"]');
    if (casesTab && !casesTab.classList.contains('active')) {
      casesTab.click();
    }
  }
};

// ============================================================================
// 2. ЗВУКОВОЙ ДВИЖОК (WEB AUDIO API)
// ============================================================================

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.muted = false;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) this.audioCtx = new AudioContext();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playTick() {
    TMA.hapticImpact('light', 65);
    if (this.muted) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.audioCtx.currentTime + 0.035);
      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.04);
    } catch (e) {}
  }

  playClick() {
    TMA.hapticImpact('light', 30);
    if (this.muted) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.audioCtx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.06);
    } catch (e) {}
  }

  playCoin() {
    TMA.hapticImpact('medium', 80);
    if (this.muted) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc1 = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(987.77, now);
      osc1.frequency.setValueAtTime(1318.51, now + 0.08);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc1.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.35);
    } catch (e) {}
  }

  playWin(rarity = 'rare') {
    TMA.hapticNotify('success');
    if (this.muted) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const start = this.audioCtx.currentTime + idx * 0.08;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(start);
        osc.stop(start + 0.28);
      });
    } catch (e) {}
  }

  playExplosion() {
    TMA.hapticNotify('error');
    if (this.muted) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.4);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {}
  }

  playPlinkoBounce(freq = 700) {
    TMA.hapticImpact('soft', 90);
    if (this.muted) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.06, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.035);
    } catch (e) {}
  }

  playSlotReelStop(isScatter = false) {
    TMA.hapticImpact(isScatter ? 'heavy' : 'light', 60);
    if (this.muted) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = isScatter ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(isScatter ? 587.33 : 180, now);
      osc.frequency.exponentialRampToValueAtTime(isScatter ? 880 : 40, now + 0.08);
      gain.gain.setValueAtTime(isScatter ? 0.22 : 0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {}
  }

  playScatterDing(count = 1) {
    TMA.hapticImpact('medium', 80);
    if (this.muted) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const pitches = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      const freq = pitches[Math.min(pitches.length - 1, count - 1)];
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {}
  }

  playBonusChime() {
    TMA.hapticNotify('success');
    if (this.muted) return;
    this.init();
    if (!this.audioCtx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const start = this.audioCtx.currentTime + idx * 0.07;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(start);
        osc.stop(start + 0.32);
      });
    } catch (e) {}
  }
}

const sounds = new SoundEngine();

// ============================================================================
// 3. КОНФЕТТИ САЛЮТ (CANVAS FX)
// ============================================================================

class ConfettiFX {
  constructor() {
    this.canvas = document.getElementById('confettiCanvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.active = false;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(count = 70) {
    if (!this.canvas || !this.ctx) return;
    const spawnCount = (typeof window !== 'undefined' && window.innerWidth <= 768) ? Math.min(count, 35) : count;
    const colors = ['#ff204e', '#fbbf24', '#ffffff', '#38bdf8', '#10b981', '#c084fc'];
    for (let i = 0; i < spawnCount; i++) {
      this.particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.7) * 18,
        size: 6 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 12,
        life: 1.0,
        decay: 0.012 + Math.random() * 0.015
      });
    }
    if (!this.active) {
      this.active = true;
      this.loop();
    }
  }

  loop() {
    if (!this.active) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.45;
      p.rotation += p.vr;
      p.life -= p.decay;

      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = p.life;
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.loop());
    } else {
      this.active = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

const confetti = new ConfettiFX();

// ============================================================================
// 4. СОСТОЯНИЕ ПРИЛОЖЕНИЯ (APP STATE)
// ============================================================================

function safeJsonParse(val, fallback) {
  try {
    return val ? JSON.parse(val) : fallback;
  } catch (e) {
    return fallback;
  }
}

function safeIntParse(val, fallback) {
  const n = parseInt(val, 10);
  return isNaN(n) ? fallback : n;
}

let uidCounter = 0;
function generateUid() {
  uidCounter = (uidCounter + 1) % 10000;
  return Date.now() * 10000 + uidCounter;
}

const STATE = {
  balance: safeIntParse(localStorage.getItem('marar_balance'), 5000),
  inventory: safeJsonParse(localStorage.getItem('marar_inventory'), []),
  stats: {
    opened: safeIntParse(localStorage.getItem('marar_stat_opened'), 0),
    jackpots: safeIntParse(localStorage.getItem('marar_stat_jackpots'), 0),
    battlesWon: safeIntParse(localStorage.getItem('marar_stat_battles_won'), 0)
  },
  profile: {
    name: localStorage.getItem('marar_profile_name') || 'Студент_Марара',
    avatar: localStorage.getItem('marar_profile_avatar') || '🐱',
    xp: safeIntParse(localStorage.getItem('marar_profile_xp'), 0)
  },
  businesses: safeJsonParse(localStorage.getItem('marar_businesses'), { "shawarma": 0, "mining": 0, "notes": 0, "crypto": 0 }),
  businessVault: safeIntParse(localStorage.getItem('marar_biz_vault'), 0),

  achievements: safeJsonParse(localStorage.getItem('marar_achievements'), {}),
  activatedPromos: safeJsonParse(localStorage.getItem('marar_promos'), []),
  counters: safeJsonParse(localStorage.getItem('marar_counters'), { "mom": 0, "chat": 0 }),
  lastWheelSpin: safeIntParse(localStorage.getItem('marar_wheel_spin'), 0),

  currentCase: null,
  isCaseOpening: false,

  roulette: {
    isSpinning: false,
    bets: { red: 0, green: 0, black: 0 },
    timer: null,
    timeLeft: 12,
    maxTime: 12
  },

  crash: {
    running: false,
    bet: 0,
    multiplier: 1.0,
    crashPoint: 1.0,
    startTime: 0,
    animId: null,
    hasCashedOut: false
  },

  mines: {
    active: false,
    bet: 0,
    mineCount: 3,
    grid: [],
    revealedCount: 0,
    currentMult: 1.0
  },

  upgrader: {
    mode: 'inventory',
    sourceItem: null,
    betMD: 250,
    targetItem: null,
    side: 'left',
    isSpinning: false,
    rarityFilter: 'all',
    searchFilter: ''
  },

  thimbles: {
    bet: 100,
    winningIdx: 0,
    isShuffling: false,
    canPick: false
  },

  contractPicks: [],

  slot: {
    bet: 100,
    isSpinning: false,
    turbo: false,
    auto: false,
    forceBonus: false,
    inFreeSpins: false,
    freeSpinsLeft: 0,
    freeSpinsTotal: 0,
    freeSpinsTotalWin: 0,
    grid: [],
    lastWin: 0
  }
};

function saveState() {
  localStorage.setItem('marar_balance', STATE.balance.toString());
  localStorage.setItem('marar_inventory', JSON.stringify(STATE.inventory));
  localStorage.setItem('marar_stat_opened', STATE.stats.opened.toString());
  localStorage.setItem('marar_stat_jackpots', STATE.stats.jackpots.toString());
  localStorage.setItem('marar_stat_battles_won', STATE.stats.battlesWon.toString());
  localStorage.setItem('marar_profile_name', STATE.profile.name);
  localStorage.setItem('marar_profile_avatar', STATE.profile.avatar);
  localStorage.setItem('marar_profile_xp', STATE.profile.xp.toString());
  localStorage.setItem('marar_businesses', JSON.stringify(STATE.businesses));
  localStorage.setItem('marar_biz_vault', STATE.businessVault.toString());
  localStorage.setItem('marar_achievements', JSON.stringify(STATE.achievements));
  localStorage.setItem('marar_promos', JSON.stringify(STATE.activatedPromos));
  localStorage.setItem('marar_counters', JSON.stringify(STATE.counters));
  localStorage.setItem('marar_wheel_spin', STATE.lastWheelSpin.toString());
}

function addXP(amount) {
  const oldLvl = Math.floor(Math.sqrt(STATE.profile.xp / 100)) + 1;
  STATE.profile.xp += amount;
  const newLvl = Math.floor(Math.sqrt(STATE.profile.xp / 100)) + 1;
  saveState();
  updateUI();

  if (newLvl > oldLvl) {
    sounds.playWin('exotic');
    confetti.burst(60);
    showToast(`🎉 НОВЫЙ УРОВЕНЬ! Теперь ты <b>Уровень ${newLvl}</b>! Получен бонус +500 MD!`, 'gold');
    STATE.balance += 500;
    saveState();
    updateUI();
  }
}

let currentDisplayBalance = STATE.balance;
let balanceAnimId = null;

function animateBalanceTo(target) {
  const balanceEl = document.getElementById('userBalance');
  if (!balanceEl) return;

  if (balanceAnimId) {
    cancelAnimationFrame(balanceAnimId);
    balanceAnimId = null;
  }

  const start = currentDisplayBalance;
  const diff = target - start;
  if (diff === 0) {
    balanceEl.textContent = target.toLocaleString('ru-RU');
    return;
  }

  balanceEl.classList.add('balance-updating');
  const duration = 450;
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + diff * ease);
    currentDisplayBalance = current;
    balanceEl.textContent = current.toLocaleString('ru-RU');

    if (progress < 1) {
      balanceAnimId = requestAnimationFrame(step);
    } else {
      currentDisplayBalance = target;
      balanceEl.textContent = target.toLocaleString('ru-RU');
      balanceAnimId = null;
      setTimeout(() => balanceEl.classList.remove('balance-updating'), 150);
    }
  }

  balanceAnimId = requestAnimationFrame(step);
}

function spawnFloatingBadge(x, y, text, type = 'gold') {
  const badge = document.createElement('div');
  badge.className = `floating-coin-badge ${type}`;
  badge.textContent = text;
  badge.style.left = `${x}px`;
  badge.style.top = `${y}px`;
  document.body.appendChild(badge);
  setTimeout(() => {
    if (badge.parentNode) badge.parentNode.removeChild(badge);
  }, 1200);
}

function updateUI() {
  animateBalanceTo(STATE.balance);

  const invBadge = document.getElementById('invBadge');
  if (invBadge) invBadge.textContent = STATE.inventory.length;

  const statOpened = document.getElementById('statOpened');
  const statJackpots = document.getElementById('statJackpots');
  const statBattles = document.getElementById('statBattlesWon');
  if (statOpened) statOpened.textContent = STATE.stats.opened;
  if (statJackpots) statJackpots.textContent = STATE.stats.jackpots;
  if (statBattles) statBattles.textContent = STATE.stats.battlesWon;

  // Профиль в шапке
  const curLvl = Math.floor(Math.sqrt(STATE.profile.xp / 100)) + 1;
  const nextLvlXp = Math.pow(curLvl, 2) * 100;
  const prevLvlXp = Math.pow(curLvl - 1, 2) * 100;
  const pct = Math.min(100, Math.max(0, ((STATE.profile.xp - prevLvlXp) / (nextLvlXp - prevLvlXp)) * 100));

  const hdrAvatar = document.getElementById('headerAvatar');
  const hdrName = document.getElementById('headerPlayerName');
  const hdrLvl = document.getElementById('headerLvlBadge');
  const hdrXp = document.getElementById('headerXpFill');

  if (hdrAvatar) hdrAvatar.textContent = STATE.profile.avatar;
  if (hdrName) hdrName.textContent = STATE.profile.name;
  if (hdrLvl) hdrLvl.textContent = `LVL ${curLvl}`;
  if (hdrXp) hdrXp.style.width = `${pct}%`;

  // Пассивный доход бейдж
  const incomePerSec = calcTotalIncomePerSec();
  const bizTopNotice = document.getElementById('businessTopNotice');
  if (bizTopNotice) bizTopNotice.textContent = `+${incomePerSec}/с`;

  // Ачивки
  const unlockedCount = Object.keys(STATE.achievements).length;
  const achCountEl = document.getElementById('statAchievementsCount');
  if (achCountEl) achCountEl.textContent = `${unlockedCount}/${ACHIEVEMENTS_DATA.length}`;

  checkMilestoneAchievements();
}

function showToast(text, type = 'normal') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : ''} ${type === 'gold' ? 'toast-gold' : ''}`;
  toast.innerHTML = text;

  container.appendChild(toast);
  setTimeout(() => {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 3000);
}

// ============================================================================
// 5. ДОСТИЖЕНИЯ
// ============================================================================

function unlockAchievement(id) {
  if (STATE.achievements[id]) return;

  const ach = ACHIEVEMENTS_DATA.find(x => x.id === id);
  if (!ach) return;

  STATE.achievements[id] = true;
  STATE.balance += ach.reward;
  saveState();
  updateUI();

  sounds.playWin('exotic');
  confetti.burst(50);
  showToast(`🏆 Достижение разблокировано: <b>${ach.name}</b>! (+${ach.reward} MD)`, 'gold');
  renderAchievements();
}

function checkMilestoneAchievements() {
  if (STATE.balance >= 15000) unlockAchievement('dorm_rich');
  if (STATE.stats.opened >= 5) unlockAchievement('case_lover');
  if (STATE.counters.mom >= 5) unlockAchievement('mom_boy');
}

function renderAchievements() {
  const grid = document.getElementById('achievementsGrid');
  if (!grid) return;

  grid.innerHTML = ACHIEVEMENTS_DATA.map(ach => {
    const isUnlocked = !!STATE.achievements[ach.id];
    return `
      <div class="achievement-card ${isUnlocked ? 'unlocked' : ''}">
        <div class="ach-icon-box">${ach.icon}</div>
        <div class="ach-info">
          <div class="ach-title">${ach.name} ${isUnlocked ? '✅' : '🔒'}</div>
          <div class="ach-desc">${ach.desc}</div>
          <div class="ach-status">Награда: +${ach.reward} MD</div>
        </div>
      </div>
    `;
  }).join('');
}

// ============================================================================
// 6. НАВИГАЦИЯ И ВЕРХНИЕ МОДАЛКИ
// ============================================================================

function openSubGame(gameId) {
  sounds.playClick();

  // Делаем активной главную вкладку "Игровой Зал"
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === 'games'));

  document.querySelectorAll('.tab-view').forEach(view => {
    view.classList.remove('active');
  });
  const gamesView = document.getElementById('tab-games');
  if (gamesView) gamesView.classList.add('active');

  // Переключаем пилл в под-навигации
  document.querySelectorAll('.subgame-pill').forEach(pill => {
    pill.classList.toggle('active', pill.dataset.game === gameId);
  });

  // Переключаем игровой экран
  document.querySelectorAll('.subgame-view').forEach(view => {
    view.classList.remove('active');
  });

  const targetView = document.getElementById(`subgame-${gameId}`);
  if (targetView) {
    targetView.classList.add('active');
  }

  // Специфические инициализации для игр
  if (gameId === 'slot') resizeSlotCanvas();
  if (gameId === 'battles') initBattleSelect();
  if (gameId === 'crash') {
    setTimeout(() => {
      if (window._resizeCrash) window._resizeCrash();
    }, 50);
  }
  if (gameId === 'roulette') {
    updateRouletteBetsUI();
    if (typeof updateRouletteStatsUI === 'function') updateRouletteStatsUI();
  }
  if (gameId === 'mines' && typeof updateMinesInfo === 'function') {
    updateMinesInfo();
  }
  if (typeof TMA !== 'undefined') TMA.updateBackButton();
}

function initGamesHub() {
  // Клики по кнопкам под-навигации
  document.querySelectorAll('.subgame-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      openSubGame(pill.dataset.game);
    });
  });

  // Клики по карточкам игр в лобби
  document.querySelectorAll('.game-hub-card').forEach(card => {
    card.addEventListener('click', () => {
      const gId = card.dataset.game;
      if (gId) openSubGame(gId);
    });
  });

  // Кнопки возврата в лобби
  document.querySelectorAll('.btn-subgame-back').forEach(btn => {
    btn.addEventListener('click', () => {
      openSubGame('hub');
    });
  });
}

function initNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      sounds.playClick();
      const targetId = tab.dataset.tab;
      
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('.tab-view').forEach(view => {
        view.classList.remove('active');
      });

      const activeView = document.getElementById(`tab-${targetId}`);
      if (activeView) activeView.classList.add('active');

      if (targetId === 'games') {
        const activeSub = document.querySelector('.subgame-view.active');
        if (!activeSub) openSubGame('hub');
      }
      if (targetId === 'inventory') renderInventory();
      if (targetId === 'achievements') renderAchievements();
      if (targetId === 'upgrader') initUpgraderCatalog();
      if (targetId === 'contracts') renderContractPicker();
      if (targetId === 'battles') initBattleSelect();
      if (targetId === 'slot') resizeSlotCanvas();
      if (typeof TMA !== 'undefined') TMA.updateBackButton();
    });
  });

  initGamesHub();

  // Звук
  const soundBtn = document.getElementById('soundToggle');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      sounds.muted = !sounds.muted;
      soundBtn.classList.toggle('muted', sounds.muted);
      soundBtn.textContent = sounds.muted ? '🔇' : '🔊';
      if (!sounds.muted) sounds.playClick();
    });
  }

  // Мама дай денег
  const freeMoneyBtn = document.getElementById('btnFreeMoney');
  if (freeMoneyBtn) {
    freeMoneyBtn.addEventListener('click', (e) => {
      sounds.playCoin();
      const freeAmount = 1000;
      STATE.balance += freeAmount;
      STATE.counters.mom += 1;
      addXP(15);
      saveState();
      updateUI();
      const rect = freeMoneyBtn.getBoundingClientRect();
      spawnFloatingBadge(rect.left + rect.width / 2, rect.top - 10, `+${freeAmount} MD`);
      showToast(`💸 Мама перевела тебе <b>${freeAmount} MD</b> со словами «только не на ерунду»!`, 'gold');
    });
  }

  // Чат
  const chatToggle = document.getElementById('btnToggleChat');
  const chatDrawer = document.getElementById('chatDrawer');
  const chatClose = document.getElementById('btnCloseChat');
  if (chatToggle && chatDrawer) {
    chatToggle.addEventListener('click', () => {
      sounds.playClick();
      chatDrawer.classList.toggle('open');
      if (chatDrawer.classList.contains('open')) {
        const cm = document.getElementById('chatMessages');
        if (cm) cm.scrollTop = cm.scrollHeight;
      }
    });
  }
  if (chatClose && chatDrawer) {
    chatClose.addEventListener('click', () => {
      sounds.playClick();
      chatDrawer.classList.remove('open');
    });
  }

  // Бизнес
  const btnBiz = document.getElementById('btnOpenBusiness');
  const bizModal = document.getElementById('businessModal');
  const closeBiz = document.getElementById('closeBusinessModal');
  if (btnBiz && bizModal) {
    btnBiz.addEventListener('click', () => {
      sounds.playClick();
      renderBusinessCards();
      const vEl = document.getElementById('vaultAmount');
      if (vEl) vEl.textContent = STATE.businessVault.toLocaleString('ru-RU');
      bizModal.classList.add('open');
    });
  }
  if (closeBiz && bizModal) {
    closeBiz.addEventListener('click', () => {
      sounds.playClick();
      bizModal.classList.remove('open');
    });
  }

  // Профиль
  const btnProf = document.getElementById('btnOpenProfile');
  const profModal = document.getElementById('profileModal');
  const closeProf = document.getElementById('closeProfileModal');
  if (btnProf && profModal) {
    btnProf.addEventListener('click', () => {
      sounds.playClick();
      renderProfileModal();
      profModal.classList.add('open');
    });
  }
  if (closeProf && profModal) {
    closeProf.addEventListener('click', () => {
      sounds.playClick();
      profModal.classList.remove('open');
    });
  }

  // Колесо
  const btnWheel = document.getElementById('btnOpenWheel');
  const wheelModal = document.getElementById('wheelModal');
  const closeWheel = document.getElementById('closeWheelModal');
  if (btnWheel && wheelModal) {
    btnWheel.addEventListener('click', () => {
      sounds.playClick();
      wheelModal.classList.add('open');
      drawWheel();
      updateWheelTimerUI();
    });
  }
  if (closeWheel && wheelModal) {
    closeWheel.addEventListener('click', () => {
      sounds.playClick();
      wheelModal.classList.remove('open');
    });
  }

  // Промокод
  const btnPromo = document.getElementById('btnOpenPromo');
  const promoModal = document.getElementById('promoModal');
  const closePromo = document.getElementById('closePromoModal');
  if (btnPromo && promoModal) {
    btnPromo.addEventListener('click', () => {
      sounds.playClick();
      promoModal.classList.add('open');
    });
  }
  if (closePromo && promoModal) {
    closePromo.addEventListener('click', () => {
      sounds.playClick();
      promoModal.classList.remove('open');
    });
  }

  // Закрытие по клику на фон оверлея
  [bizModal, profModal, wheelModal, promoModal].forEach(m => {
    if (m) {
      m.addEventListener('click', (e) => {
        if (e.target === m) m.classList.remove('open');
      });
    }
  });
}

// ============================================================================
// 7. БИТВА КЕЙСОВ (CASE BATTLES 1v1 ПРОТИВ БОТА)
// ============================================================================

const BATTLE_BOTS = {
  dimon: { name: 'Димон_2007', avatar: '🤖', title: 'Любитель Доширака' },
  batya: { name: 'Батя на Девятке', avatar: '🚗', title: 'Владелец гаража' },
  shlepa: { name: 'Кот Шлёпа', avatar: '🐱', title: 'Легендарный хищник' }
};

let isBattleRunning = false;
let battleConfig = {
  isCrazy: false,
  isFast: false,
  totalRounds: 1,
  currentRound: 0,
  playerWins: 0,
  botWins: 0,
  playerTotal: 0,
  botTotal: 0,
  playerPicks: [],
  botPicks: []
};

function initBattleSelect() {
  const caseSelect = document.getElementById('battleCaseSelect');
  if (!caseSelect) return;
  if (caseSelect.children.length === CASES_DATA.length) return;

  caseSelect.innerHTML = CASES_DATA.map(c => `
    <option value="${c.id}">${c.name} (${c.price} MD)</option>
  `).join('');
}

function initBattleSystem() {
  initBattleSelect();
  const btnStart = document.getElementById('btnStartBattle');
  const botSelect = document.getElementById('battleBotSelect');
  const roundsSelect = document.getElementById('battleRoundsSelect');
  const crazyToggle = document.getElementById('btnBattleCrazyToggle');
  const fastToggle = document.getElementById('btnBattleFastToggle');

  if (botSelect) {
    botSelect.addEventListener('change', () => {
      const botKey = botSelect.value;
      const b = BATTLE_BOTS[botKey];
      if (b) {
        document.getElementById('battleBotName').textContent = b.name;
        document.getElementById('battleBotAvatar').textContent = b.avatar;
      }
    });
  }

  if (roundsSelect) {
    roundsSelect.addEventListener('change', () => {
      battleConfig.totalRounds = parseInt(roundsSelect.value, 10) || 1;
      updateBattleScoreboard();
    });
  }

  if (crazyToggle) {
    crazyToggle.addEventListener('click', () => {
      sounds.playClick();
      battleConfig.isCrazy = !battleConfig.isCrazy;
      document.getElementById('battleCrazyStatus').textContent = battleConfig.isCrazy ? 'ВКЛ' : 'ВЫКЛ';
      crazyToggle.classList.toggle('active', battleConfig.isCrazy);
      const modeTag = document.getElementById('battleCurrentModeTag');
      if (modeTag) {
        modeTag.textContent = battleConfig.isCrazy
          ? '🤪 РЕЖИМ БЕЗУМИЯ (наименьшая стоимость побеждает!)'
          : 'Обычный режим (побеждает наибольшая стоимость)';
        modeTag.style.color = battleConfig.isCrazy ? '#ffaa00' : 'var(--text-muted)';
      }
      showToast(battleConfig.isCrazy ? '🤪 Режим «Безумие» активирован! Дешевый дроп тащит!' : 'Обычный режим битвы активен.');
    });
  }

  if (fastToggle) {
    fastToggle.addEventListener('click', () => {
      sounds.playClick();
      battleConfig.isFast = !battleConfig.isFast;
      document.getElementById('battleFastStatus').textContent = battleConfig.isFast ? 'ВКЛ' : 'ВЫКЛ';
      fastToggle.classList.toggle('active', battleConfig.isFast);
    });
  }

  if (btnStart) {
    btnStart.addEventListener('click', () => startBattleSeries());
  }
}

function updateBattleScoreboard() {
  const roundEl = document.getElementById('battleRoundCounter');
  const scoreEl = document.getElementById('battleSeriesScore');
  const potEl = document.getElementById('battlePotPreview');

  if (roundEl) roundEl.textContent = `Раунд ${Math.min(battleConfig.currentRound + 1, battleConfig.totalRounds)} из ${battleConfig.totalRounds}`;
  if (scoreEl) scoreEl.textContent = `Ты ${battleConfig.playerWins} : ${battleConfig.botWins} Соперник`;
  if (potEl) potEl.textContent = `Банк: ${battleConfig.playerTotal + battleConfig.botTotal} MD`;
}

function startBattleSeries() {
  if (isBattleRunning) return;
  const caseSelect = document.getElementById('battleCaseSelect');
  const roundsSelect = document.getElementById('battleRoundsSelect');
  const c = CASES_DATA.find(x => x.id === caseSelect.value);
  if (!c) return;

  const totalRounds = parseInt(roundsSelect ? roundsSelect.value : '1', 10) || 1;
  const totalCost = c.price * totalRounds;

  if (STATE.balance < totalCost) {
    return showToast(`❌ Недостаточно средств на серию (${totalCost} MD)! 💸`);
  }

  isBattleRunning = true;
  const btnStart = document.getElementById('btnStartBattle');
  if (btnStart) btnStart.disabled = true;

  STATE.balance -= totalCost;
  addXP(30 * totalRounds);
  saveState();
  updateUI();

  // Сброс состояния серии
  battleConfig.totalRounds = totalRounds;
  battleConfig.currentRound = 0;
  battleConfig.playerWins = 0;
  battleConfig.botWins = 0;
  battleConfig.playerTotal = 0;
  battleConfig.botTotal = 0;
  battleConfig.playerPicks = [];
  battleConfig.botPicks = [];

  const playerHist = document.getElementById('battlePlayerHistory');
  const botHist = document.getElementById('battleBotHistory');
  if (playerHist) playerHist.innerHTML = '';
  if (botHist) botHist.innerHTML = '';

  runNextBattleRound();
}

function runNextBattleRound() {
  isBattleRunning = true;
  document.getElementById('btnStartBattle').disabled = true;

  const caseSelect = document.getElementById('battleCaseSelect');
  const botSelect = document.getElementById('battleBotSelect');
  const c = CASES_DATA.find(x => x.id === caseSelect.value);
  const bot = BATTLE_BOTS[botSelect.value];
  if (!c || !bot) {
    isBattleRunning = false;
    document.getElementById('btnStartBattle').disabled = false;
    return;
  }

  updateBattleScoreboard();

  document.getElementById('battlePlayerScore').textContent = 'Крутится...';
  document.getElementById('battleBotScore').textContent = 'Крутится...';
  document.getElementById('battlePlayerDrop').innerHTML = '<span class="waiting-txt">Лента крутится...</span>';
  document.getElementById('battleBotDrop').innerHTML = '<span class="waiting-txt">Лента крутится...</span>';
  document.getElementById('battleVerdictTitle').textContent = `⚔️ РАУНД ${battleConfig.currentRound + 1} ИЗ ${battleConfig.totalRounds}`;
  document.getElementById('battleVerdictDesc').textContent = battleConfig.isCrazy
    ? '🤪 Безумие: победит тот, у кого дроп ДЕШЕВЛЕ!'
    : 'Обычный режим: победит тот, у кого дроп ДОРОЖЕ!';

  const playerWinItem = pickWinningItem(c);
  const botWinItem = pickWinningItem(c);

  const playerStrip = document.getElementById('battlePlayerStrip');
  const botStrip = document.getElementById('battleBotStrip');
  setupBattleStrip(playerStrip, c, playerWinItem);
  setupBattleStrip(botStrip, c, botWinItem);

  const itemWidth = 150;
  const boxWidth = playerStrip.parentElement.offsetWidth;
  const targetIndex = 52;
  const randomOffset = 30 + Math.random() * 80;
  const targetX = -(targetIndex * itemWidth - boxWidth / 2 + randomOffset);

  const duration = battleConfig.isFast ? 800 : 4200;
  const startTime = performance.now();

  function animateBattle(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    const currentPos = targetX * ease;

    playerStrip.style.transform = `translateX(${currentPos}px)`;
    botStrip.style.transform = `translateX(${currentPos}px)`;

    if (!battleConfig.isFast && Math.floor(elapsed / 120) % 2 === 0) sounds.playTick();

    if (progress < 1) {
      requestAnimationFrame(animateBattle);
    } else {
      finishBattleRound(playerWinItem, botWinItem, bot, c);
    }
  }

  requestAnimationFrame(animateBattle);
}

function setupBattleStrip(strip, c, winningItem) {
  strip.style.transition = 'none';
  strip.style.transform = 'translateX(0px)';
  strip.innerHTML = '';

  const winningIndex = 52;
  for (let i = 0; i < 70; i++) {
    const it = (i === winningIndex) ? winningItem : c.items[Math.floor(Math.random() * c.items.length)];
    const el = document.createElement('div');
    el.className = `strip-item ${RARITIES[it.rarity].class}`;
    el.innerHTML = `
      <div class="strip-item-icon">${it.icon}</div>
      <div class="strip-item-name">${it.name}</div>
      <div class="strip-item-price">${it.price} MD</div>
    `;
    strip.appendChild(el);
  }
}

function finishBattleRound(playerItem, botItem, bot, c) {
  battleConfig.playerPicks.push(playerItem);
  battleConfig.botPicks.push(botItem);
  battleConfig.playerTotal += playerItem.price;
  battleConfig.botTotal += botItem.price;

  document.getElementById('battlePlayerScore').textContent = `${playerItem.price} MD (Сумма: ${battleConfig.playerTotal} MD)`;
  document.getElementById('battleBotScore').textContent = `${botItem.price} MD (Сумма: ${battleConfig.botTotal} MD)`;

  document.getElementById('battlePlayerDrop').innerHTML = `
    <b>${playerItem.icon} ${playerItem.name}</b> (${playerItem.price} MD)
  `;
  document.getElementById('battleBotDrop').innerHTML = `
    <b>${botItem.icon} ${botItem.name}</b> (${botItem.price} MD)
  `;

  // Добавляем в историю дропов раунда
  const pHist = document.getElementById('battlePlayerHistory');
  const bHist = document.getElementById('battleBotHistory');
  if (pHist) {
    pHist.innerHTML += `<span class="b-hist-drop">${playerItem.icon} ${playerItem.price} MD</span>`;
  }
  if (bHist) {
    bHist.innerHTML += `<span class="b-hist-drop">${botItem.icon} ${botItem.price} MD</span>`;
  }

  // Определение победителя раунда с учетом Безумия
  let playerWonRound = false;
  let botWonRound = false;

  if (battleConfig.isCrazy) {
    // В безумии побеждает меньшая цена
    if (playerItem.price < botItem.price) playerWonRound = true;
    else if (playerItem.price > botItem.price) botWonRound = true;
  } else {
    // Обычный режим - большая цена
    if (playerItem.price > botItem.price) playerWonRound = true;
    else if (playerItem.price < botItem.price) botWonRound = true;
  }

  if (playerWonRound) {
    battleConfig.playerWins++;
    sounds.playCoin();
  } else if (botWonRound) {
    battleConfig.botWins++;
  }

  battleConfig.currentRound++;
  updateBattleScoreboard();

  // Проверяем, завершилась ли серия
  if (battleConfig.currentRound < battleConfig.totalRounds) {
    setTimeout(() => {
      runNextBattleRound();
    }, battleConfig.isFast ? 600 : 2000);
  } else {
    finishBattleSeries(bot);
  }
}

function finishBattleSeries(bot) {
  isBattleRunning = false;
  document.getElementById('btnStartBattle').disabled = false;

  const bannerTitle = document.getElementById('battleVerdictTitle');
  const bannerDesc = document.getElementById('battleVerdictDesc');

  // Вся серия: сравниваем суммарную стоимость или количество побед в серии
  let isPlayerGrandWinner = false;
  let isDraw = false;

  if (battleConfig.isCrazy) {
    if (battleConfig.playerTotal < battleConfig.botTotal) isPlayerGrandWinner = true;
    else if (battleConfig.playerTotal === battleConfig.botTotal) isDraw = true;
  } else {
    if (battleConfig.playerTotal > battleConfig.botTotal) isPlayerGrandWinner = true;
    else if (battleConfig.playerTotal === battleConfig.botTotal) isDraw = true;
  }

  const allItems = [...battleConfig.playerPicks, ...battleConfig.botPicks];
  const totalPotValue = battleConfig.playerTotal + battleConfig.botTotal;

  if (isPlayerGrandWinner) {
    sounds.playWin('exotic');
    confetti.burst(100);
    STATE.stats.battlesWon += 1;
    // Игрок забирает ВСЕ предметы раундов
    allItems.forEach((it, idx) => {
      STATE.inventory.unshift({ ...it, uid: generateUid() });
    });
    addXP(100 * battleConfig.totalRounds);
    unlockAchievement('battle_hero');
    saveState();
    updateUI();
    if (document.getElementById('tab-inventory')?.classList.contains('active')) renderInventory();

    bannerTitle.textContent = '🎉 ТЫ АБСОЛЮТНЫЙ ЧЕМПИОН ДУЭЛИ!';
    bannerTitle.style.color = '#10b981';
    bannerDesc.textContent = battleConfig.isCrazy
      ? `🤪 Безумие сработало! Твой суммарный дроп дешевле (${battleConfig.playerTotal} против ${battleConfig.botTotal} MD). Забирай все ${allItems.length} предметов (${totalPotValue} MD)!`
      : `🏆 Твой суммарный банк выше (${battleConfig.playerTotal} против ${battleConfig.botTotal} MD)! Ты забираешь все ${allItems.length} предметов (${totalPotValue} MD)!`;

    showToast(`🏆 Триумф в дуэли против <b>${bot.name}</b>! Получено ${allItems.length} предметов в инвентарь!`, 'gold');
  } else if (!isDraw) {
    sounds.playExplosion();
    bannerTitle.textContent = `💀 ${bot.name.toUpperCase()} ЗАБРАЛ ВЕСЬ БАНК!`;
    bannerTitle.style.color = '#ff204e';
    bannerDesc.textContent = battleConfig.isCrazy
      ? `🤪 В Безумии бот нашел еще более дешевый мусор (${battleConfig.botTotal} против ${battleConfig.playerTotal} MD) и забрал весь куш!`
      : `Соперник набрал больше (${battleConfig.botTotal} против ${battleConfig.playerTotal} MD). Бот забрал все предметы серии.`;

    showToast(`😢 Бот <b>${bot.name}</b> победил в серии и забрал весь банк. Возьми реванш!`, 'normal');
  } else {
    sounds.playClick();
    battleConfig.playerPicks.forEach((it, idx) => {
      STATE.inventory.unshift({ ...it, uid: generateUid() });
    });
    saveState();
    updateUI();
    if (document.getElementById('tab-inventory')?.classList.contains('active')) renderInventory();

    bannerTitle.textContent = '🤝 НИЧЬЯ В СЕРИИ ДУЭЛИ!';
    bannerTitle.style.color = '#fbbf24';
    bannerDesc.textContent = `Суммарные банки абсолютно равны (${battleConfig.playerTotal} MD). Ты сохранил свои предметы!`;
  }
}

// ============================================================================
// 8. ПЛИНКО (PLINKO)
// ============================================================================

const PLINKO_TABLES = {
  8: {
    low: [5.6, 2.1, 1.1, 1.0, 0.5, 1.0, 1.1, 2.1, 5.6],
    medium: [13, 3, 1.3, 0.7, 0.4, 0.7, 1.3, 3, 13],
    high: [29, 4, 1.5, 0.3, 0.2, 0.3, 1.5, 4, 29]
  },
  12: {
    low: [10, 3, 1.6, 1.4, 1.1, 1.0, 0.5, 1.0, 1.1, 1.4, 1.6, 3, 10],
    medium: [33, 11, 4, 2, 1.1, 0.6, 0.3, 0.6, 1.1, 2, 4, 11, 33],
    high: [65, 18, 5, 2, 0.7, 0.2, 0.1, 0.2, 0.7, 2, 5, 18, 65]
  },
  16: {
    low: [16, 9, 2, 1.4, 1.4, 1.2, 1.1, 1.0, 0.5, 1.0, 1.1, 1.2, 1.4, 1.4, 2, 9, 16],
    medium: [45, 15, 6, 3, 2, 1.2, 0.7, 0.5, 0.3, 0.5, 0.7, 1.2, 2, 3, 6, 15, 45],
    high: [110, 41, 10, 5, 3, 1.5, 0.5, 0.2, 0.1, 0.2, 0.5, 1.5, 3, 5, 10, 41, 110]
  }
};

let plinkoConfig = {
  rows: 12,
  risk: 'medium'
};

let currentPlinkoBuckets = [];
let plinkoBalls = [];
let plinkoPegs = [];
let plinkoSparks = [];
let plinkoPegCacheCanvas = null;
let plinkoLoopActive = false;
let plinkoRafId = null;

function getBucketColor(mult) {
  if (mult >= 50) return '#ff0055';
  if (mult >= 15) return '#ff204e';
  if (mult >= 5) return '#f97316';
  if (mult >= 2) return '#eab308';
  if (mult >= 1) return '#22c55e';
  return '#06b6d4';
}

function buildPlinkoPegCache(width, height) {
  if (typeof document === 'undefined') return null;
  const cache = document.createElement('canvas');
  cache.width = width;
  cache.height = height;
  const cctx = cache.getContext('2d');
  if (!cctx) return null;

  cctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
  plinkoPegs.forEach(peg => {
    cctx.beginPath();
    cctx.arc(peg.x, peg.y, peg.r + 2, 0, Math.PI * 2);
    cctx.fill();
  });

  cctx.fillStyle = '#ffffff';
  plinkoPegs.forEach(peg => {
    cctx.beginPath();
    cctx.arc(peg.x, peg.y, peg.r, 0, Math.PI * 2);
    cctx.fill();
  });

  return cache;
}

function rebuildPlinkoBoard() {
  const canvas = document.getElementById('plinkoCanvas');
  const bucketsContainer = document.getElementById('plinkoBuckets');
  if (!canvas || !bucketsContainer) return;

  const rawMults = PLINKO_TABLES[plinkoConfig.rows][plinkoConfig.risk];
  currentPlinkoBuckets = rawMults.map(m => ({
    mult: m,
    color: getBucketColor(m)
  }));

  // Генерируем корзины в DOM
  bucketsContainer.innerHTML = currentPlinkoBuckets.map((b, i) => `
    <div class="plinko-bucket" id="plinkoBucket${i}" style="background: ${b.color}; font-size: ${plinkoConfig.rows === 16 ? '9px' : '11px'};">
      ${b.mult}x
    </div>
  `).join('');

  // Создаем штырьки пирамиды
  const rows = plinkoConfig.rows;
  const startY = rows === 16 ? 40 : (rows === 12 ? 55 : 70);
  const rowSpacing = (canvas.height - startY - 50) / rows;
  const centerX = canvas.width / 2;
  const pegSpacing = Math.min(48, (canvas.width - 60) / (rows + 2));

  plinkoPegs = [];
  for (let r = 0; r < rows; r++) {
    const count = r + 3;
    const rowWidth = (count - 1) * pegSpacing;
    const startX = centerX - rowWidth / 2;
    for (let c = 0; c < count; c++) {
      plinkoPegs.push({
        x: startX + c * pegSpacing,
        y: startY + r * rowSpacing,
        r: rows === 16 ? 3.2 : 4,
        glow: 0
      });
    }
  }

  plinkoPegCacheCanvas = buildPlinkoPegCache(canvas.width, canvas.height);
  if (!plinkoLoopActive) {
    const ctx = canvas.getContext('2d');
    if (ctx && plinkoPegCacheCanvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(plinkoPegCacheCanvas, 0, 0);
    }
  }
}

function initPlinko() {
  const canvas = document.getElementById('plinkoCanvas');
  const bucketsContainer = document.getElementById('plinkoBuckets');
  if (!canvas || !bucketsContainer) return;

  const ctx = canvas.getContext('2d');
  rebuildPlinkoBoard();

  // Слушатели переключения риска
  document.querySelectorAll('#plinkoRiskGroup .btn-plinko-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      sounds.playClick();
      document.querySelectorAll('#plinkoRiskGroup .btn-plinko-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      plinkoConfig.risk = btn.dataset.risk;
      rebuildPlinkoBoard();
    });
  });

  // Слушатели переключения рядов
  document.querySelectorAll('#plinkoRowsGroup .btn-plinko-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      sounds.playClick();
      document.querySelectorAll('#plinkoRowsGroup .btn-plinko-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      plinkoConfig.rows = parseInt(btn.dataset.rows, 10);
      rebuildPlinkoBoard();
    });
  });

  // Пресеты ставок
  document.querySelectorAll('.plinko-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      sounds.playClick();
      const input = document.getElementById('plinkoBetInput');
      let val = parseInt(input.value, 10) || 0;
      if (btn.dataset.mult === '0.5') val = Math.max(10, Math.floor(val / 2));
      else if (btn.dataset.mult === '2') val = val * 2;
      else if (btn.dataset.mult === 'max') val = STATE.balance;
      else if (btn.dataset.val) val += parseInt(btn.dataset.val, 10);
      input.value = Math.max(10, val);
    });
  });

  function dropPlinkoBalls(count) {
    const betInput = document.getElementById('plinkoBetInput');
    const betPerBall = parseInt(betInput.value, 10) || 0;
    const totalCost = betPerBall * count;

    if (betPerBall <= 0) return showToast('⚠️ Введи ставку!');
    if (STATE.balance < totalCost) return showToast(`❌ Недостаточно средств на ${count} шаров (${totalCost} MD)! 💸`);

    STATE.balance -= totalCost;
    addXP(12 * count);
    saveState();
    updateUI();

    const centerX = canvas.width / 2;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        plinkoBalls.push({
          x: centerX + (Math.random() - 0.5) * 16,
          y: 15,
          vx: (Math.random() - 0.5) * 1.6,
          vy: 1.4,
          r: plinkoConfig.rows === 16 ? 6 : 7.5,
          bet: betPerBall,
          hue: Math.floor(Math.random() * 60) + 330 // оттенки красно-розового
        });
        updatePlinkoBallsUI();
        startPlinkoLoop();
      }, i * 180);
    }
  }

  // Кнопки броска
  document.getElementById('btnDropPlinko').addEventListener('click', () => dropPlinkoBalls(1));
  const btnDrop5 = document.getElementById('btnDropPlinko5');
  if (btnDrop5) btnDrop5.addEventListener('click', () => dropPlinkoBalls(5));
  const btnDrop10 = document.getElementById('btnDropPlinko10');
  if (btnDrop10) btnDrop10.addEventListener('click', () => dropPlinkoBalls(10));

  function updatePlinkoBallsUI() {
    const el = document.getElementById('plinkoActiveBalls');
    if (el) el.textContent = plinkoBalls.length;
  }

  function startPlinkoLoop() {
    if (plinkoLoopActive || (typeof document !== 'undefined' && document.hidden)) return;
    plinkoLoopActive = true;
    plinkoRafId = requestAnimationFrame(loopPlinko);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (plinkoRafId !== null) {
        cancelAnimationFrame(plinkoRafId);
        plinkoRafId = null;
      }
      plinkoLoopActive = false;
    } else if (plinkoBalls.length > 0 || plinkoSparks.length > 0) {
      startPlinkoLoop();
    }
  });

  // Анимационный цикл Плинко (по требованию, с кешем штырьков и без shadowBlur)
  function loopPlinko() {
    if (document.hidden) {
      plinkoLoopActive = false;
      plinkoRafId = null;
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (plinkoPegCacheCanvas) {
      ctx.drawImage(plinkoPegCacheCanvas, 0, 0);
    }

    // Поверх кеша рисуем только подсвеченные штырьки
    let hasGlow = false;
    for (let p = 0; p < plinkoPegs.length; p++) {
      const peg = plinkoPegs[p];
      if (!plinkoPegCacheCanvas) {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(peg.x, peg.y, peg.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (peg.glow > 0) {
        hasGlow = true;
        ctx.fillStyle = `rgba(0, 229, 255, ${(0.35 * peg.glow).toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(peg.x, peg.y, peg.r + 4 * peg.glow, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#00e5ff';
        ctx.beginPath();
        ctx.arc(peg.x, peg.y, peg.r, 0, Math.PI * 2);
        ctx.fill();
        peg.glow = Math.max(0, peg.glow - 0.06);
      }
    }

    // Искры от столкновений без shadowBlur
    for (let s = plinkoSparks.length - 1; s >= 0; s--) {
      const sp = plinkoSparks[s];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.life -= 0.05;
      if (sp.life <= 0) {
        plinkoSparks.splice(s, 1);
        continue;
      }
      ctx.globalAlpha = sp.life;
      ctx.fillStyle = sp.color;
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, 2.2 * sp.life, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Физика шариков
    for (let i = plinkoBalls.length - 1; i >= 0; i--) {
      const b = plinkoBalls[i];
      b.vy += 0.26; // гравитация
      b.x += b.vx;
      b.y += b.vy;

      // Столкновение со штырьками (квадрат расстояния вместо sqrt)
      for (let p = 0; p < plinkoPegs.length; p++) {
        const peg = plinkoPegs[p];
        const dx = b.x - peg.x;
        const dy = b.y - peg.y;
        const minDist = b.r + peg.r;
        if (dx * dx + dy * dy < minDist * minDist) {
          const angle = Math.atan2(dy, dx);
          b.vx = Math.cos(angle) * 2.7 + (Math.random() - 0.5) * 0.9;
          b.vy = Math.sin(angle) * 2.1;
          peg.glow = 1.0;
          hasGlow = true;
          sounds.playPlinkoBounce(450 + Math.random() * 500);

          if (plinkoSparks.length < 48) {
            for (let k = 0; k < 2; k++) {
              plinkoSparks.push({
                x: peg.x,
                y: peg.y,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3,
                life: 1.0,
                color: '#00e5ff'
              });
            }
          }
        }
      }

      // Стенки
      if (b.x < b.r) { b.x = b.r; b.vx *= -0.6; }
      if (b.x > canvas.width - b.r) { b.x = canvas.width - b.r; b.vx *= -0.6; }

      // Светящийся шарик с мягким ореолом (без shadowBlur)
      ctx.fillStyle = `hsla(${b.hue}, 95%, 55%, 0.28)`;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r + 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `hsl(${b.hue}, 95%, 55%)`;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();

      // Попадание в корзину
      if (b.y >= canvas.height - 14) {
        finishPlinkoBall(b);
        plinkoBalls.splice(i, 1);
        updatePlinkoBallsUI();
      }
    }

    if (plinkoBalls.length > 0 || plinkoSparks.length > 0 || hasGlow) {
      plinkoRafId = requestAnimationFrame(loopPlinko);
    } else {
      plinkoLoopActive = false;
      plinkoRafId = null;
    }
  }
}

function addPlinkoHistory(mult) {
  const container = document.getElementById('plinkoHistoryList');
  if (!container) return;

  const chip = document.createElement('span');
  let cls = 'mult-mid';
  if (mult < 1) cls = 'mult-low';
  else if (mult >= 10) cls = 'mult-high';

  chip.className = `p-hist-chip ${cls}`;
  chip.textContent = `${mult}x`;

  container.insertBefore(chip, container.firstChild);
  while (container.children.length > 9) {
    container.removeChild(container.lastChild);
  }
}

function finishPlinkoBall(b) {
  const canvas = document.getElementById('plinkoCanvas');
  const count = currentPlinkoBuckets.length;
  const bucketWidth = canvas.width / count;
  let bucketIdx = Math.floor(b.x / bucketWidth);
  bucketIdx = Math.max(0, Math.min(count - 1, bucketIdx));

  const bucket = currentPlinkoBuckets[bucketIdx];
  const winAmount = Math.floor(b.bet * bucket.mult);

  STATE.balance += winAmount;
  saveState();
  updateUI();

  // Подсветка корзины
  const bucketEl = document.getElementById(`plinkoBucket${bucketIdx}`);
  if (bucketEl) {
    bucketEl.classList.add('hit');
    setTimeout(() => bucketEl.classList.remove('hit'), 350);
  }

  document.getElementById('plinkoLastMult').textContent = `${bucket.mult}x`;
  document.getElementById('plinkoLastWin').textContent = `${winAmount} MD`;
  addPlinkoHistory(bucket.mult);

  if (bucket.mult >= 10) {
    sounds.playWin('exotic');
    confetti.burst(80);
    unlockAchievement('plinko_luck');
    showToast(`🟢 ДЖЕКПОТ В ПЛИНКО! Шарик упал в <b>${bucket.mult}x</b> (+${winAmount} MD)!`, 'gold');
  } else if (bucket.mult >= 1) {
    sounds.playCoin();
  }
}

// ============================================================================
// 9. ШУТОЧНЫЕ НАПЁРСТКИ (THIMBLES)
// ============================================================================

let thimblesConfig = {
  ballsCount: 1, // 1 или 2
  winningIndices: [1],
  streak: 0,
  cupSlots: [0, 1, 2] // cupSlots[i] хранит текущий физический слот стаканчика i (0 = слева, 1 = в центре, 2 = справа)
};

function getThimblesSlotStep() {
  const stage = document.getElementById('thimblesStage');
  const cup0 = document.getElementById('thimble0');
  if (!stage || !cup0) return 170;
  const comp = window.getComputedStyle(stage);
  const gap = parseFloat(comp.gap) || (window.innerWidth <= 640 ? 20 : 60);
  const cupWidth = cup0.offsetWidth || (window.innerWidth <= 640 ? 85 : 110);
  return cupWidth + gap;
}

function initThimbles() {
  const btnStart = document.getElementById('btnStartThimbles');
  const betInput = document.getElementById('thimblesBetInput');
  const hint = document.getElementById('thimblesStatusHint');
  const wraps = [document.getElementById('thimble0'), document.getElementById('thimble1'), document.getElementById('thimble2')];
  const btn1Ball = document.getElementById('btnThimble1Ball');
  const btn2Balls = document.getElementById('btnThimble2Balls');
  const streakEl = document.getElementById('thimblesStreak');

  if (btn1Ball && btn2Balls) {
    btn1Ball.addEventListener('click', () => {
      sounds.playClick();
      thimblesConfig.ballsCount = 1;
      btn1Ball.classList.add('active');
      btn2Balls.classList.remove('active');
      btnStart.textContent = '🎲 ПЕРЕМЕШАТЬ (x2.90)';
    });

    btn2Balls.addEventListener('click', () => {
      sounds.playClick();
      thimblesConfig.ballsCount = 2;
      btn2Balls.classList.add('active');
      btn1Ball.classList.remove('active');
      btnStart.textContent = '🎲 ПЕРЕМЕШАТЬ (x1.45)';
    });
  }

  // Пресеты ставок
  document.querySelectorAll('.thimbles-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      sounds.playClick();
      let val = parseInt(betInput.value, 10) || 0;
      if (btn.dataset.mult === '0.5') val = Math.max(10, Math.floor(val / 2));
      else if (btn.dataset.mult === '2') val = val * 2;
      else if (btn.dataset.mult === 'max') val = STATE.balance;
      else if (btn.dataset.val) val += parseInt(btn.dataset.val, 10);
      betInput.value = Math.max(10, val);
    });
  });

  btnStart.addEventListener('click', () => {
    if (STATE.thimbles.isShuffling || STATE.thimbles.canPick) return;
    const bet = parseInt(betInput.value, 10) || 0;
    if (bet <= 0) return showToast('⚠️ Введи ставку!');
    if (STATE.balance < bet) return showToast('❌ Недостаточно средств! 💸');

    STATE.balance -= bet;
    STATE.thimbles.bet = bet;

    // Выбираем выигрышные стаканчики
    if (thimblesConfig.ballsCount === 1) {
      thimblesConfig.winningIndices = [Math.floor(Math.random() * 3)];
    } else {
      // 2 шарика из 3
      const emptyIdx = Math.floor(Math.random() * 3);
      thimblesConfig.winningIndices = [0, 1, 2].filter(i => i !== emptyIdx);
    }

    STATE.thimbles.isShuffling = true;
    STATE.thimbles.canPick = false;
    btnStart.disabled = true;
    addXP(20);
    saveState();
    updateUI();

    // 1. Плавно возвращаем стаканчики на исходные слоты (0, 1, 2)
    wraps.forEach(w => {
      w.classList.remove('lifted', 'show-item', 'can-pick');
      w.style.transition = 'transform 0.28s cubic-bezier(0.2, 0, 0, 1)';
      w.style.transform = 'translate(0px, 0px)';
      w.style.zIndex = '5';
    });
    thimblesConfig.cupSlots = [0, 1, 2];

    // Настраиваем видимость призов внутри выигрышных стаканов
    wraps.forEach((w, i) => {
      const prize = document.getElementById(`thimblePrize${i}`);
      const isWinner = thimblesConfig.winningIndices.includes(i);
      if (prize) prize.style.display = isWinner ? 'block' : 'none';
    });

    hint.textContent = thimblesConfig.ballsCount === 1
      ? '👀 Запоминай, где спрятан Золотой Дошик!'
      : '👀 Запоминай, где лежат ДВА Дошика!';

    // 2. Через 300ms поднимаем стаканчики, чтобы показать, где лежит Дошик
    setTimeout(() => {
      thimblesConfig.winningIndices.forEach(idx => {
        wraps[idx].classList.add('lifted', 'show-item');
      });

      // 3. Через 1200ms опускаем стаканы и запускаем НАСТОЯЩЕЕ перемешивание
      setTimeout(() => {
        wraps.forEach(w => w.classList.remove('lifted'));
        hint.textContent = '🌀 Стаканчики перемешиваются... Следи за Дошиком!';

        // Небольшая пауза после опускания стаканов
        setTimeout(() => {
          const stepDistance = getThimblesSlotStep();
          const totalSwaps = 7 + Math.floor(Math.random() * 4); // 7..10 перестановок
          const pairs = [[0, 1], [1, 2], [0, 2]];
          let swapIdx = 0;
          let lastPairIdx = -1;

          function executeNextSwap() {
            if (swapIdx >= totalSwaps) {
              // Завершение перемешивания!
              STATE.thimbles.isShuffling = false;
              STATE.thimbles.canPick = true;
              wraps.forEach(w => {
                w.classList.add('can-pick');
                w.style.zIndex = '5';
              });
              hint.textContent = '👉 ВЫБЕРИ СТАКАНЧИК! Где спрятан Дошик?';
              return;
            }

            // Выбираем пару слотов для обмена (отличную от предыдущей)
            const availPairs = [0, 1, 2].filter(p => p !== lastPairIdx);
            const chosenPairIdx = availPairs[Math.floor(Math.random() * availPairs.length)];
            lastPairIdx = chosenPairIdx;
            const [slotA, slotB] = pairs[chosenPairIdx];

            // Находим какие стаканчики сейчас находятся в этих слотах
            const cupA = thimblesConfig.cupSlots.indexOf(slotA);
            const cupB = thimblesConfig.cupSlots.indexOf(slotB);

            // Обновляем логические слоты стаканчиков
            thimblesConfig.cupSlots[cupA] = slotB;
            thimblesConfig.cupSlots[cupB] = slotA;

            sounds.playTick();

            // Смещение для каждого стакана относительно его начального базового положения
            const xA = (slotB - cupA) * stepDistance;
            const xB = (slotA - cupB) * stepDistance;

            // Анимация траектории: Cup A скользит по верхней дуге (zIndex 15), Cup B снизу (zIndex 5)
            wraps[cupA].style.transition = 'transform 0.22s cubic-bezier(0.4, 0, 0.2, 1)';
            wraps[cupB].style.transition = 'transform 0.22s cubic-bezier(0.4, 0, 0.2, 1)';
            wraps[cupA].style.zIndex = '15';
            wraps[cupB].style.zIndex = '5';

            wraps[cupA].style.transform = `translate(${xA}px, -15px) scale(1.04)`;
            wraps[cupB].style.transform = `translate(${xB}px, 6px) scale(0.96)`;

            // Выравниваем Y к концу фазы перестановки
            setTimeout(() => {
              wraps[cupA].style.transform = `translate(${xA}px, 0px)`;
              wraps[cupB].style.transform = `translate(${xB}px, 0px)`;
            }, 140);

            swapIdx++;
            setTimeout(executeNextSwap, 250);
          }

          executeNextSwap();
        }, 280);
      }, 1200);
    }, 300);
  });

  // Клик по стаканчику
  wraps.forEach((w, idx) => {
    w.addEventListener('click', () => {
      if (!STATE.thimbles.canPick) return;
      STATE.thimbles.canPick = false;
      wraps.forEach(cup => cup.classList.remove('can-pick'));
      btnStart.disabled = false;

      // Поднимаем ВСЕ стаканы и показываем где лежали призы
      wraps.forEach((cup, i) => {
        cup.classList.add('lifted');
        if (thimblesConfig.winningIndices.includes(i)) {
          cup.classList.add('show-item');
        }
      });

      const isWon = thimblesConfig.winningIndices.includes(idx);
      const mult = thimblesConfig.ballsCount === 1 ? 2.90 : 1.45;

      if (isWon) {
        sounds.playWin('exotic');
        confetti.burst(75);
        thimblesConfig.streak++;
        if (streakEl) streakEl.textContent = thimblesConfig.streak;

        const win = Math.floor(STATE.thimbles.bet * mult);
        STATE.balance += win;
        saveState();
        updateUI();

        hint.textContent = `🎉 ТОЧНО! Дошик найден! Выигрыш: +${win} MD (x${mult})!`;
        showToast(`🥤 УГАДАЛ! Получено <b>+${win} MD</b>! Серия: 🔥 ${thimblesConfig.streak}`, 'gold');
      } else {
        sounds.playExplosion();
        thimblesConfig.streak = 0;
        if (streakEl) streakEl.textContent = '0';

        // Определяем в каких физических слотах были призы (0=слева, 1=по центру, 2=справа)
        const slotNames = ['слева', 'в центре', 'справа'];
        const winLocations = thimblesConfig.winningIndices
          .map(wIdx => slotNames[thimblesConfig.cupSlots[wIdx]])
          .join(' и ');

        hint.textContent = `😢 Мимо! Стаканчик пуст. Дошик был ${winLocations}!`;
        showToast('❌ Пусто! В следующий раз следи внимательнее.', 'normal');
      }
    });
  });
}

// ============================================================================
// 10. КОНТРАКТЫ ОБМЕНА (КОТЁЛ МАРАРА)
// ============================================================================

function renderContractPicker() {
  const grid = document.getElementById('contractPickerGrid');
  if (!grid) return;

  if (STATE.inventory.length === 0) {
    grid.innerHTML = `<p class="empty-slot-msg">Инвентарь пуст. Открой кейсы или выиграй предметы в играх!</p>`;
    updateContractSummary();
    return;
  }

  grid.innerHTML = STATE.inventory.map(it => `
    <div class="contract-pick-card ${STATE.contractPicks.includes(it.uid) ? 'selected' : ''}" data-uid="${it.uid}">
      <div class="cicon">${it.icon}</div>
      <div class="cname">${it.name}</div>
      <div class="cprice">${it.price} MD</div>
    </div>
  `).join('');

  grid.querySelectorAll('.contract-pick-card').forEach(card => {
    card.addEventListener('click', () => {
      sounds.playClick();
      const uid = parseInt(card.dataset.uid, 10);
      const idx = STATE.contractPicks.indexOf(uid);

      if (idx > -1) {
        STATE.contractPicks.splice(idx, 1);
        card.classList.remove('selected');
      } else {
        if (STATE.contractPicks.length >= 10) {
          return showToast('⚠️ Максимум 10 предметов для одного контракта!');
        }
        STATE.contractPicks.push(uid);
        card.classList.add('selected');
      }

      updateContractSummary();
    });
  });

  updateContractSummary();
}

function updateContractSummary() {
  const countEl = document.getElementById('contractCountText');
  const valEl = document.getElementById('contractTotalVal');
  const previewEl = document.getElementById('contractRewardPreview');
  const btn = document.getElementById('btnForgeContract');

  const selectedItems = STATE.inventory.filter(x => STATE.contractPicks.includes(x.uid));
  const totalVal = selectedItems.reduce((acc, it) => acc + it.price, 0);

  if (countEl) countEl.textContent = `${STATE.contractPicks.length}/10`;
  if (valEl) valEl.textContent = `${totalVal} MD`;

  if (previewEl) {
    if (selectedItems.length >= 3) {
      const minReward = Math.round(totalVal * 0.95);
      const maxReward = Math.round(totalVal * 2.4);
      previewEl.textContent = `от ${minReward} до ${maxReward} MD`;
    } else {
      previewEl.textContent = `от 0 до 0 MD`;
    }
  }

  // Для контракта нужно минимум 3 предмета
  if (btn) btn.disabled = STATE.contractPicks.length < 3;
}

function initContracts() {
  const btnForge = document.getElementById('btnForgeContract');
  const btnAutoFill = document.getElementById('btnContractAutoFill');
  const btnClear = document.getElementById('btnContractClear');

  if (btnAutoFill) {
    btnAutoFill.addEventListener('click', () => {
      sounds.playClick();
      if (STATE.inventory.length < 3) {
        return showToast('⚠️ Нужно хотя бы 3 предмета в инвентаре для контракта!');
      }

      // Сортируем инвентарь по возрастанию цены (самые дешевые)
      const sorted = [...STATE.inventory].sort((a, b) => a.price - b.price);
      STATE.contractPicks = sorted.slice(0, 10).map(x => x.uid);
      renderContractPicker();
      showToast(`⚡ Выбрано ${STATE.contractPicks.length} самых дешевых предметов для варки!`);
    });
  }

  if (btnClear) {
    btnClear.addEventListener('click', () => {
      sounds.playClick();
      STATE.contractPicks = [];
      renderContractPicker();
    });
  }

  if (btnForge) {
    btnForge.addEventListener('click', () => {
      if (STATE.contractPicks.length < 3) return;

      sounds.playCoin();
      const selectedItems = STATE.inventory.filter(x => STATE.contractPicks.includes(x.uid));
      const totalVal = selectedItems.reduce((acc, it) => acc + it.price, 0);

      // Удаляем выбранные предметы из инвентаря
      STATE.inventory = STATE.inventory.filter(x => !STATE.contractPicks.includes(x.uid));
      STATE.contractPicks = [];

      btnForge.disabled = true;

      // Анимация варки в котле
      const cauldron = document.getElementById('cauldronVisual');
      if (cauldron) cauldron.classList.add('boiling');

      setTimeout(() => {
        if (cauldron) cauldron.classList.remove('boiling');

        // Ищем предмет стоимостью в 1.2 - 2.4 раза выше суммарной загрузки
        const possibleTargets = ALL_CATALOG_ITEMS.filter(x => x.price >= totalVal * 0.9);
        const rewardItem = possibleTargets.length > 0
          ? possibleTargets[Math.floor(Math.random() * possibleTargets.length)]
          : ALL_CATALOG_ITEMS[ALL_CATALOG_ITEMS.length - 1];

        sounds.playWin(rewardItem.rarity);
        confetti.burst(85);
        STATE.inventory.unshift({ ...rewardItem, uid: Date.now() });
        addXP(70);
        saveState();
        updateUI();
        renderContractPicker();

        showToast(`🧪 КОНТРАКТ СВАРЕН! Получен предмет: <b>${rewardItem.name}</b> (${rewardItem.price} MD)!`, 'gold');
      }, 1800);
    });
  }
}

// ============================================================================
// 11. ИМПЕРИЯ БИЗНЕСА (ПАССИВНЫЙ ДОХОД)
// ============================================================================

function calcTotalIncomePerSec() {
  let sum = 0;
  BUSINESSES_DATA.forEach(b => {
    const lvl = STATE.businesses[b.id] || 0;
    sum += lvl * b.incomePerSec;
  });
  return sum;
}

function renderBusinessCards() {
  const grid = document.getElementById('businessCardsGrid');
  if (!grid) return;

  grid.innerHTML = BUSINESSES_DATA.map(b => {
    const lvl = STATE.businesses[b.id] || 0;
    const upgradeCost = Math.floor(b.baseCost * Math.pow(1.5, lvl));
    const currentIncome = lvl * b.incomePerSec;

    return `
      <div class="biz-card">
        <div class="biz-card-top">
          <span class="biz-icon">${b.icon}</span>
          <div>
            <div class="biz-title">${b.name}</div>
            <div class="biz-income">+${currentIncome} MD/сек</div>
            <div class="biz-level">Уровень бизнеса: ${lvl}</div>
          </div>
        </div>
        <button class="btn-biz-upgrade" data-id="${b.id}" data-cost="${upgradeCost}">
          Купить уровень (${upgradeCost} MD)
        </button>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.btn-biz-upgrade').forEach(btn => {
    btn.addEventListener('click', () => {
      const bId = btn.dataset.id;
      const cost = parseInt(btn.dataset.cost, 10);

      if (STATE.balance < cost) {
        return showToast('❌ Недостаточно средств для улучшения бизнеса! 💸');
      }

      sounds.playCoin();
      STATE.balance -= cost;
      STATE.businesses[bId] = (STATE.businesses[bId] || 0) + 1;
      addXP(40);
      saveState();
      updateUI();
      renderBusinessCards();
      showToast(`🏪 Бизнес улучшен! Пассивный доход увеличен!`, 'gold');
    });
  });

  document.getElementById('vaultAmount').textContent = STATE.businessVault.toLocaleString('ru-RU');
}

function initBusinessTicker() {
  let bizPersistTick = 0;
  const persistVault = () => {
    localStorage.setItem('marar_biz_vault', STATE.businessVault.toString());
  };

  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) persistVault();
    });
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('pagehide', persistVault);
  }

  // Начисление пассивного дохода каждую секунду (без лишней сериализации инвентаря)
  setInterval(() => {
    const income = calcTotalIncomePerSec();
    if (income > 0) {
      STATE.businessVault += income;
      bizPersistTick++;
      if (bizPersistTick % 5 === 0) persistVault();

      if (document.getElementById('businessModal')?.classList.contains('open')) {
        const vaultEl = document.getElementById('vaultAmount');
        if (vaultEl) vaultEl.textContent = STATE.businessVault.toLocaleString('ru-RU');
      }
    }
  }, 1000);

  // Кнопка забрать прибыль
  const btnCollect = document.getElementById('btnCollectProfit');
  if (btnCollect) {
    btnCollect.addEventListener('click', () => {
      if (STATE.businessVault <= 0) return showToast('В кассе пока пусто!');

      sounds.playCoin();
      confetti.burst(50);
      STATE.balance += STATE.businessVault;
      const collected = STATE.businessVault;
      STATE.businessVault = 0;
      saveState();
      updateUI();
      renderBusinessCards();

      showToast(`💰 Ты забрал прибыль <b>+${collected.toLocaleString('ru-RU')} MD</b>!`, 'gold');
    });
  }
}

// ============================================================================
// 12. ПРОФИЛЬ И КАСТОМИЗАЦИЯ АВАТАРОК
// ============================================================================

function renderProfileModal() {
  const row = document.getElementById('avatarOptionsRow');
  if (!row) return;

  row.innerHTML = AVATARS.map(a => `
    <div class="avatar-option ${STATE.profile.avatar === a.icon ? 'selected' : ''}" data-icon="${a.icon}">
      ${a.icon}
    </div>
  `).join('');

  row.querySelectorAll('.avatar-option').forEach(opt => {
    opt.addEventListener('click', () => {
      sounds.playClick();
      STATE.profile.avatar = opt.dataset.icon;
      saveState();
      updateUI();
      renderProfileModal();
      showToast('🪪 Аватар успешно изменен!');
    });
  });

  const curLvl = Math.floor(Math.sqrt(STATE.profile.xp / 100)) + 1;
  document.getElementById('profileLvl').textContent = curLvl;
  document.getElementById('profileXp').textContent = `${STATE.profile.xp} XP`;
  document.getElementById('profileBattles').textContent = STATE.stats.battlesWon;
  document.getElementById('profileIncome').textContent = `+${calcTotalIncomePerSec()} MD/сек`;
}

// ============================================================================
// 13. КЕЙСЫ (3D TILT И CS:GO ОТКРЫТИЕ)
// ============================================================================

function renderCases() {
  const grid = document.getElementById('casesGrid');
  if (!grid) return;

  grid.innerHTML = CASES_DATA.map(c => `
    <div class="case-card" data-case-id="${c.id}">
      <span class="case-badge-hot" style="background: ${c.glow || 'var(--red-neon)'}; box-shadow: 0 0 10px ${c.glow || 'var(--red-neon)'}66;">${c.badge || 'ХИТ'}</span>
      <div class="case-card-image">
        <div class="case-glow" style="background: ${c.glow || '#ff204e'};"></div>
        <span>${c.icon}</span>
      </div>
      <h3 class="case-card-name">${c.name}</h3>
      <p class="case-card-desc">${c.desc}</p>
      <div class="case-card-footer">
        <div class="case-price">${c.price} <span>MD</span></div>
        <button class="btn-case-open">ОТКРЫТЬ</button>
      </div>
    </div>
  `).join('');

  const supportsHover = window.matchMedia && window.matchMedia('(hover: hover)').matches;

  grid.querySelectorAll('.case-card').forEach(card => {
    if (supportsHover) {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rx = -(y / rect.height) * 16;
        const ry = (x / rect.width) * 16;
        card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    }

    card.addEventListener('click', () => {
      const caseId = card.dataset.caseId;
      openCaseModal(caseId);
    });
  });
}

let caseModalConfig = {
  count: 1,
  isFast: false
};

let pendingCaseDrop = null;

function initCaseModalControls() {
  document.querySelectorAll('.btn-case-count').forEach(btn => {
    btn.addEventListener('click', () => {
      sounds.playClick();
      document.querySelectorAll('.btn-case-count').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      caseModalConfig.count = parseInt(btn.dataset.count, 10) || 1;
      updateCaseOpenButton();
    });
  });

  const fastBtn = document.getElementById('btnCaseFast');
  if (fastBtn) {
    fastBtn.addEventListener('click', () => {
      sounds.playClick();
      caseModalConfig.isFast = !caseModalConfig.isFast;
      fastBtn.classList.toggle('active', caseModalConfig.isFast);
      document.getElementById('caseFastStatus').textContent = caseModalConfig.isFast ? 'ВКЛ' : 'ВЫКЛ';
    });
  }
}

function updateCaseOpenButton() {
  const c = STATE.currentCase;
  const btnStart = document.getElementById('btnStartOpen');
  if (!c || !btnStart) return;

  const totalCost = c.price * caseModalConfig.count;
  btnStart.textContent = `ОТКРЫТЬ (${caseModalConfig.count}x) ЗА ${totalCost} MD`;
}

function openCaseModal(caseId) {
  sounds.playClick();
  const c = CASES_DATA.find(x => x.id === caseId);
  if (!c) return;

  STATE.currentCase = c;

  const modal = document.getElementById('caseModal');
  const title = document.getElementById('modalCaseTitle');
  const sub = document.getElementById('modalCaseSub');
  const previews = document.getElementById('casePreviewItems');
  const winBox = document.getElementById('winResultBox');
  const winMultiBox = document.getElementById('winMultiResultBox');
  const actions = document.getElementById('modalActions');
  const btnStart = document.getElementById('btnStartOpen');
  const rouletteBox = document.getElementById('caseRouletteBox');

  title.textContent = c.name;
  sub.textContent = `Стоимость 1 открытия: ${c.price} MD`;
  updateCaseOpenButton();
  btnStart.disabled = false;

  winBox.classList.remove('show');
  if (winMultiBox) winMultiBox.style.display = 'none';
  if (rouletteBox) rouletteBox.style.display = 'block';
  actions.style.display = 'flex';

  previews.innerHTML = c.items.map(it => `
    <div class="preview-item-card ${RARITIES[it.rarity].class}">
      <span class="preview-icon">${it.icon}</span>
      <span class="preview-name">${it.name}</span>
      <span class="preview-price">${it.price} MD</span>
    </div>
  `).join('');

  setupCaseStrip(c);
  modal.classList.add('open');
}

function closeCaseModal() {
  if (STATE.isCaseOpening) return;
  sounds.playClick();

  if (pendingCaseDrop) {
    if (pendingCaseDrop.type === 'single') {
      const it = pendingCaseDrop.item;
      STATE.inventory.unshift({ ...it, uid: generateUid() });
      showToast(`🎒 <b>${it.name}</b> сохранён в твоём инвентаре!`, 'success');
    } else if (pendingCaseDrop.type === 'multi') {
      pendingCaseDrop.items.forEach(it => {
        STATE.inventory.unshift({ ...it, uid: generateUid() });
      });
      showToast(`🎒 Выигранные предметы (${pendingCaseDrop.items.length} шт.) сохранены в инвентаре!`, 'success');
    }
    pendingCaseDrop = null;
    saveState();
    updateUI();
    if (document.getElementById('tab-inventory')?.classList.contains('active')) renderInventory();
  }

  document.getElementById('caseModal').classList.remove('open');
}

function setupCaseStrip(c) {
  const strip = document.getElementById('caseStrip');
  strip.style.transition = 'none';
  strip.style.transform = 'translateX(0px)';
  strip.innerHTML = '';

  for (let i = 0; i < 65; i++) {
    const randomItem = c.items[Math.floor(Math.random() * c.items.length)];
    const el = document.createElement('div');
    el.className = `strip-item ${RARITIES[randomItem.rarity].class}`;
    el.innerHTML = `
      <div class="strip-item-icon">${randomItem.icon}</div>
      <div class="strip-item-name">${randomItem.name}</div>
      <div class="strip-item-price">${randomItem.price} MD</div>
    `;
    strip.appendChild(el);
  }
}

function pickWinningItem(c) {
  const pool = [];
  c.items.forEach(it => {
    const weight = RARITIES[it.rarity].weight;
    for (let w = 0; w < weight; w++) pool.push(it);
  });
  return pool[Math.floor(Math.random() * pool.length)];
}

function startCaseOpen() {
  if (STATE.isCaseOpening) return;
  const c = STATE.currentCase;
  if (!c) return;

  const count = caseModalConfig.count;
  const totalCost = c.price * count;

  if (STATE.balance < totalCost) {
    sounds.playClick();
    return showToast(`❌ Недостаточно средств на открытие ${count}x (${totalCost} MD)! 💸`);
  }

  STATE.balance -= totalCost;
  STATE.stats.opened += count;
  addXP(25 * count);
  saveState();
  updateUI();

  STATE.isCaseOpening = true;
  const btnStart = document.getElementById('btnStartOpen');
  const winBox = document.getElementById('winResultBox');
  const winMultiBox = document.getElementById('winMultiResultBox');
  const rouletteBox = document.getElementById('caseRouletteBox');
  const actions = document.getElementById('modalActions');

  btnStart.disabled = true;
  winBox.classList.remove('show');
  if (winMultiBox) winMultiBox.style.display = 'none';
  if (rouletteBox) rouletteBox.style.display = 'block';

  // Генерируем выигранные предметы
  const winningItems = [];
  for (let k = 0; k < count; k++) {
    const it = pickWinningItem(c);
    winningItems.push(it);
    if (it.rarity === 'exotic') {
      STATE.stats.jackpots += 1;
    }
  }

  const primaryItem = winningItems[0];
  const strip = document.getElementById('caseStrip');
  strip.innerHTML = '';

  const winningIndex = 52;
  for (let i = 0; i < 70; i++) {
    const it = (i === winningIndex) ? primaryItem : c.items[Math.floor(Math.random() * c.items.length)];
    const el = document.createElement('div');
    el.className = `strip-item ${RARITIES[it.rarity].class}`;
    el.innerHTML = `
      <div class="strip-item-icon">${it.icon}</div>
      <div class="strip-item-name">${it.name}</div>
      <div class="strip-item-price">${it.price} MD</div>
    `;
    strip.appendChild(el);
  }

  const itemWidth = 150;
  const boxWidth = strip.parentElement.offsetWidth;
  const randomInnerOffset = 25 + Math.random() * 95;
  const targetX = -(winningIndex * itemWidth - boxWidth / 2 + randomInnerOffset);

  const duration = caseModalConfig.isFast ? 650 : 4800;
  const startTime = performance.now();
  let lastPassedIndex = -1;

  function animateStrip(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4.2);
    const currentPos = targetX * ease;

    strip.style.transform = `translateX(${currentPos}px)`;

    const currentCenterPos = -currentPos + boxWidth / 2;
    const currentIndex = Math.floor(currentCenterPos / itemWidth);

    if (!caseModalConfig.isFast && currentIndex !== lastPassedIndex && currentIndex >= 0) {
      sounds.playTick();
      lastPassedIndex = currentIndex;
    }

    if (progress < 1) {
      requestAnimationFrame(animateStrip);
    } else {
      STATE.isCaseOpening = false;
      if (count === 1) {
        finishCaseOpen(primaryItem);
      } else {
        finishCaseMultiOpen(winningItems);
      }
    }
  }

  requestAnimationFrame(animateStrip);
}

function finishCaseOpen(item) {
  sounds.playWin(item.rarity);
  if (item.rarity === 'exotic' || item.rarity === 'legendary') {
    confetti.burst(85);
  }

  pendingCaseDrop = { type: 'single', item };

  const winBox = document.getElementById('winResultBox');
  const winDisplay = document.getElementById('winItemDisplay');
  const winSellPrice = document.getElementById('winSellPrice');
  const actions = document.getElementById('modalActions');

  actions.style.display = 'none';

  winDisplay.innerHTML = `
    <div class="win-item-icon">${item.icon}</div>
    <div class="win-item-name">${item.name}</div>
    <div class="win-item-rarity" style="color: ${RARITIES[item.rarity].color}">
      [${RARITIES[item.rarity].name}]
    </div>
  `;

  winSellPrice.textContent = item.price;
  winBox.classList.add('show');

  addLiveDrop('Ты', item);

  const btnKeep = document.getElementById('btnKeepItem');
  const btnSell = document.getElementById('btnSellItem');
  const btnAgain = document.getElementById('btnOpenAgain');

  btnKeep.onclick = () => {
    sounds.playClick();
    pendingCaseDrop = null;
    STATE.inventory.unshift({ ...item, uid: generateUid() });
    saveState();
    updateUI();
    showToast(`🎒 <b>${item.name}</b> добавлен в инвентарь!`, 'success');
    closeCaseModal();
  };

  btnSell.onclick = () => {
    sounds.playCoin();
    pendingCaseDrop = null;
    STATE.balance += item.price;
    saveState();
    updateUI();
    showToast(`💰 Предмет продан за <b>${item.price} MD</b>!`, 'gold');
    closeCaseModal();
  };

  btnAgain.onclick = () => {
    sounds.playClick();
    pendingCaseDrop = null;
    STATE.inventory.unshift({ ...item, uid: generateUid() });
    saveState();
    updateUI();
    startCaseOpen();
  };
}

function finishCaseMultiOpen(items) {
  const hasExotic = items.some(x => x.rarity === 'exotic' || x.rarity === 'legendary');
  sounds.playWin(hasExotic ? 'exotic' : 'rare');
  if (hasExotic) confetti.burst(100);

  pendingCaseDrop = { type: 'multi', items };

  const actions = document.getElementById('modalActions');
  const winMultiBox = document.getElementById('winMultiResultBox');
  const grid = document.getElementById('winMultiGrid');
  const priceEl = document.getElementById('winMultiSellPrice');
  const rouletteBox = document.getElementById('caseRouletteBox');

  actions.style.display = 'none';
  if (rouletteBox) rouletteBox.style.display = 'none';

  const totalPrice = items.reduce((acc, it) => acc + it.price, 0);
  if (priceEl) priceEl.textContent = totalPrice;

  grid.innerHTML = items.map(it => `
    <div class="multi-item-card ${RARITIES[it.rarity].class}">
      <div class="multi-item-icon">${it.icon}</div>
      <div class="multi-item-name">${it.name}</div>
      <div class="multi-item-price">${it.price} MD</div>
    </div>
  `).join('');

  items.forEach(it => addLiveDrop('Ты', it));

  if (winMultiBox) winMultiBox.style.display = 'block';

  const btnKeepAll = document.getElementById('btnMultiKeepAll');
  const btnSellAll = document.getElementById('btnMultiSellAll');
  const btnMultiAgain = document.getElementById('btnMultiOpenAgain');

  if (btnKeepAll) {
    btnKeepAll.onclick = () => {
      sounds.playClick();
      pendingCaseDrop = null;
      items.forEach((it, idx) => {
        STATE.inventory.unshift({ ...it, uid: generateUid() });
      });
      saveState();
      updateUI();
      showToast(`🎒 Добавлено <b>${items.length} предметов</b> в инвентарь!`, 'success');
      closeCaseModal();
    };
  }

  if (btnSellAll) {
    btnSellAll.onclick = () => {
      sounds.playCoin();
      pendingCaseDrop = null;
      STATE.balance += totalPrice;
      saveState();
      updateUI();
      showToast(`💰 Все предметы проданы за <b>${totalPrice} MD</b>!`, 'gold');
      closeCaseModal();
    };
  }

  if (btnMultiAgain) {
    btnMultiAgain.onclick = () => {
      sounds.playClick();
      pendingCaseDrop = null;
      items.forEach((it, idx) => {
        STATE.inventory.unshift({ ...it, uid: generateUid() });
      });
      saveState();
      updateUI();
      startCaseOpen();
    };
  }
}

// ============================================================================
// 14. РУЛЕТКА (CS:GO ROLL)
// ============================================================================

let rouletteBotPool = { red: 450, green: 100, black: 600 };
let rouletteColorHistory = ['red', 'black', 'red', 'red', 'black', 'green', 'black', 'red'];

function updateRouletteStatsUI() {
  const total = rouletteColorHistory.length || 1;
  const redCount = rouletteColorHistory.filter(c => c === 'red').length;
  const greenCount = rouletteColorHistory.filter(c => c === 'green').length;
  const blackCount = rouletteColorHistory.filter(c => c === 'black').length;

  const redPct = Math.round((redCount / total) * 100);
  const greenPct = Math.round((greenCount / total) * 100);
  const blackPct = 100 - redPct - greenPct;

  const rEl = document.getElementById('statRedPct');
  const gEl = document.getElementById('statGreenPct');
  const bEl = document.getElementById('statBlackPct');
  if (rEl) rEl.textContent = `${redPct}%`;
  if (gEl) gEl.textContent = `${greenPct}%`;
  if (bEl) bEl.textContent = `${blackPct}%`;

  const bRed = document.getElementById('botPoolRed');
  const bGreen = document.getElementById('botPoolGreen');
  const bBlack = document.getElementById('botPoolBlack');
  if (bRed) bRed.textContent = `Общий пул: ${rouletteBotPool.red} MD`;
  if (bGreen) bGreen.textContent = `Общий пул: ${rouletteBotPool.green} MD`;
  if (bBlack) bBlack.textContent = `Общий пул: ${rouletteBotPool.black} MD`;
}

function initRoulette() {
  const tape = document.getElementById('rouletteTape');
  if (!tape) return;

  renderRouletteTape();
  updateRouletteStatsUI();

  document.querySelectorAll('.bet-presets .btn-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.id === 'btnRouletteClear' || btn.id === 'btnRouletteDouble') return;
      sounds.playClick();
      const input = document.getElementById('betAmountInput');
      let val = parseInt(input.value, 10) || 0;
      if (btn.dataset.mult === '0.5') val = Math.max(10, Math.floor(val / 2));
      else if (btn.dataset.mult === '2') val = val * 2;
      else if (btn.dataset.mult === 'max') val = STATE.balance;
      else if (btn.dataset.val) val += parseInt(btn.dataset.val, 10);
      input.value = Math.max(10, val);
    });
  });

  // Кнопка сброса ставок
  const btnClear = document.getElementById('btnRouletteClear');
  if (btnClear) {
    btnClear.addEventListener('click', () => {
      if (STATE.roulette.isSpinning) return;
      sounds.playClick();
      const totalRefund = STATE.roulette.bets.red + STATE.roulette.bets.green + STATE.roulette.bets.black;
      if (totalRefund > 0) {
        STATE.balance += totalRefund;
        STATE.roulette.bets = { red: 0, green: 0, black: 0 };
        saveState();
        updateUI();
        updateRouletteBetsUI();
        showToast(`🗑️ Ставки отменены. Возврат <b>+${totalRefund} MD</b> на баланс.`);
      }
    });
  }

  // Кнопка удвоения ставок
  const btnDouble = document.getElementById('btnRouletteDouble');
  if (btnDouble) {
    btnDouble.addEventListener('click', () => {
      if (STATE.roulette.isSpinning) return;
      const totalBets = STATE.roulette.bets.red + STATE.roulette.bets.green + STATE.roulette.bets.black;
      if (totalBets === 0) return showToast('⚠️ Нет активных ставок для удвоения!');
      if (STATE.balance < totalBets) return showToast('❌ Недостаточно средств для удвоения всех ставок! 💸');

      sounds.playClick();
      STATE.balance -= totalBets;
      STATE.roulette.bets.red *= 2;
      STATE.roulette.bets.green *= 2;
      STATE.roulette.bets.black *= 2;
      saveState();
      updateUI();
      updateRouletteBetsUI();
      showToast(`⚡ Все текущие ставки удвоены (списано ${totalBets} MD)!`);
    });
  }

  document.querySelectorAll('.bet-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (STATE.roulette.isSpinning) return;
      sounds.playClick();

      const color = btn.dataset.color;
      const input = document.getElementById('betAmountInput');
      const amount = parseInt(input.value, 10) || 0;

      if (amount <= 0) return showToast('⚠️ Введи сумму ставки!');
      if (STATE.balance < amount) return showToast('❌ Недостаточно средств! 💸');

      STATE.balance -= amount;
      STATE.roulette.bets[color] += amount;
      rouletteBotPool[color] += amount;
      addXP(15);
      saveState();
      updateUI();
      updateRouletteBetsUI();
      updateRouletteStatsUI();
      showToast(`Ставка <b>${amount} MD</b> принята на <b>${color.toUpperCase()}</b>!`);
    });
  });

  const spinNowBtn = document.getElementById('btnSpinNow');
  if (spinNowBtn) {
    spinNowBtn.addEventListener('click', () => {
      if (STATE.roulette.isSpinning) return;
      const totalBets = STATE.roulette.bets.red + STATE.roulette.bets.green + STATE.roulette.bets.black;
      if (totalBets === 0) return showToast('⚠️ Сначала сделай ставку на Красное, Черное или Марар!');
      sounds.playClick();
      spinRouletteWheel();
    });
  }

  startRouletteTimer();
}

function renderRouletteTape() {
  const tape = document.getElementById('rouletteTape');
  tape.innerHTML = '';
  for (let s = 0; s < 6; s++) {
    ROULETTE_NUMBERS.forEach(item => {
      const tile = document.createElement('div');
      tile.className = `tape-tile tile-${item.color}`;
      tile.innerHTML = `
        <span>${item.label}</span>
        <span class="tape-tile-sub">${item.color === 'green' ? 'x14' : 'x2'}</span>
      `;
      tape.appendChild(tile);
    });
  }
}

function updateRouletteBetsUI() {
  document.getElementById('myBetRed').textContent = `${STATE.roulette.bets.red} MD`;
  document.getElementById('myBetGreen').textContent = `${STATE.roulette.bets.green} MD`;
  document.getElementById('myBetBlack').textContent = `${STATE.roulette.bets.black} MD`;
}

function startRouletteTimer() {
  const statusMsg = document.getElementById('rouletteStatusMsg');
  const timerFill = document.getElementById('timerFill');
  STATE.roulette.timeLeft = STATE.roulette.maxTime;

  // Случайный начальный пул ботов
  rouletteBotPool = {
    red: Math.floor(200 + Math.random() * 800),
    green: Math.floor(20 + Math.random() * 150),
    black: Math.floor(200 + Math.random() * 800)
  };
  updateRouletteStatsUI();

  if (STATE.roulette.timer) clearInterval(STATE.roulette.timer);

  STATE.roulette.timer = setInterval(() => {
    if (STATE.roulette.isSpinning || document.hidden) return;
    if (!document.getElementById('subgame-roulette')?.classList.contains('active') || !document.getElementById('tab-games')?.classList.contains('active')) return;
    STATE.roulette.timeLeft -= 0.1;

    // Рандомные мелкие ставки ботов в процессе обратного отсчета
    if (Math.random() < 0.25) {
      const colors = ['red', 'black', 'green'];
      const pick = colors[Math.floor(Math.random() * (Math.random() < 0.1 ? 3 : 2))];
      rouletteBotPool[pick] += Math.floor(50 + Math.random() * 150);
      updateRouletteStatsUI();
    }

    const pct = Math.max(0, (STATE.roulette.timeLeft / STATE.roulette.maxTime) * 100);
    timerFill.style.width = `${pct}%`;
    statusMsg.textContent = `Ставки принимаются: ${(Math.max(0, STATE.roulette.timeLeft)).toFixed(1)} сек...`;

    if (STATE.roulette.timeLeft <= 0) {
      clearInterval(STATE.roulette.timer);
      spinRouletteWheel();
    }
  }, 100);
}

function spinRouletteWheel() {
  if (STATE.roulette.isSpinning) return;
  STATE.roulette.isSpinning = true;

  if (STATE.roulette.timer) clearInterval(STATE.roulette.timer);

  const statusMsg = document.getElementById('rouletteStatusMsg');
  statusMsg.textContent = 'Барабан крутится... Никакого мошенничества! 🎰';

  const tape = document.getElementById('rouletteTape');
  const tileWidth = 84;
  const boxWidth = tape.parentElement.offsetWidth;

  const winningTileData = ROULETTE_NUMBERS[Math.floor(Math.random() * ROULETTE_NUMBERS.length)];
  const setIndex = 3;
  const numIndexInSet = ROULETTE_NUMBERS.findIndex(x => x.num === winningTileData.num);
  const targetIndex = setIndex * ROULETTE_NUMBERS.length + numIndexInSet;
  const randomOffset = 15 + Math.random() * (tileWidth - 30);
  const targetX = -(targetIndex * tileWidth - boxWidth / 2 + randomOffset);

  const duration = 5000;
  const startTime = performance.now();
  let lastPassedTile = -1;

  function animateRoulette(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3.8);
    const currentPos = targetX * ease;

    tape.style.transform = `translateX(${currentPos}px)`;

    const currentCenter = -currentPos + boxWidth / 2;
    const currentIdx = Math.floor(currentCenter / tileWidth);

    if (currentIdx !== lastPassedTile) {
      sounds.playTick();
      lastPassedTile = currentIdx;
    }

    if (progress < 1) {
      requestAnimationFrame(animateRoulette);
    } else {
      finishRouletteSpin(winningTileData);
    }
  }

  requestAnimationFrame(animateRoulette);
}

function finishRouletteSpin(winning) {
  const bets = STATE.roulette.bets;
  let totalWinnings = 0;
  if (bets[winning.color] > 0) {
    totalWinnings = bets[winning.color] * winning.mult;
  }

  if (totalWinnings > 0) {
    sounds.playWin(winning.color === 'green' ? 'exotic' : 'rare');
    if (winning.color === 'green') confetti.burst(90);
    STATE.balance += totalWinnings;
    saveState();
    updateUI();
    showToast(`🎉 ПОБЕДА! Выпало <b>${winning.label} (${winning.color.toUpperCase()})</b>. Выигрыш: <b>${totalWinnings} MD</b>!`, 'gold');
  } else if (bets.red > 0 || bets.green > 0 || bets.black > 0) {
    showToast(`😢 Выпало <b>${winning.label} (${winning.color.toUpperCase()})</b>. Не повезло!`, 'normal');
  }

  addRouletteHistory(winning);
  rouletteColorHistory.push(winning.color);
  if (rouletteColorHistory.length > 50) rouletteColorHistory.shift();
  updateRouletteStatsUI();

  STATE.roulette.bets = { red: 0, green: 0, black: 0 };
  updateRouletteBetsUI();

  const statusMsg = document.getElementById('rouletteStatusMsg');
  statusMsg.textContent = `Победитель: ${winning.label} (${winning.color.toUpperCase()})!`;

  setTimeout(() => {
    STATE.roulette.isSpinning = false;
    startRouletteTimer();
  }, 3500);
}

function addRouletteHistory(winning) {
  const container = document.getElementById('rouletteHistory');
  if (!container) return;
  const chip = document.createElement('div');
  chip.className = `hist-chip hist-${winning.color}`;
  chip.textContent = winning.label;
  container.insertBefore(chip, container.firstChild);
  while (container.children.length > 14) {
    container.removeChild(container.lastChild);
  }
}

// ============================================================================
// 15. РЕЖИМ CRASH
// ============================================================================

const CRASH_FAIL_REASONS = [
  'Ракета врезалась в забор общаги!',
  'Декан подписал приказ об отчислении!',
  'Мама зашла в комнату без стука!',
  'Интернет отключили за неуплату!',
  'Ракета заглохла от некачественного топлива!'
];

let crashStars = [];
let crashFlames = [];
let crashLiveCrew = [];

function initCrashStars(canvas) {
  crashStars = [];
  for (let i = 0; i < 45; i++) {
    crashStars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 0.5 + Math.random() * 2,
      r: Math.random() * 1.8
    });
  }
}

function initCrash() {
  const canvas = document.getElementById('crashCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCrashCanvas() {
    if (!canvas || !canvas.parentElement) return;
    const w = canvas.parentElement.offsetWidth;
    const h = canvas.parentElement.offsetHeight;
    if (w > 0 && h > 0) {
      canvas.width = w;
      canvas.height = h;
      initCrashStars(canvas);
      drawCrashIdle(ctx, canvas);
    }
  }
  window._resizeCrash = resizeCrashCanvas;
  resizeCrashCanvas();
  window.addEventListener('resize', resizeCrashCanvas);

  const btnStart = document.getElementById('btnCrashStart');
  const btnCashout = document.getElementById('btnCrashCashout');
  const betInput = document.getElementById('crashBetInput');
  const autoInput = document.getElementById('crashAutoCashout');
  const targetValEl = document.getElementById('crashTargetVal');

  // Пресеты ставки
  document.querySelectorAll('.crash-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      sounds.playClick();
      let val = parseInt(betInput.value, 10) || 0;
      if (btn.dataset.mult === '0.5') val = Math.max(10, Math.floor(val / 2));
      else if (btn.dataset.mult === '2') val = val * 2;
      else if (btn.dataset.mult === 'max') val = STATE.balance;
      else if (btn.dataset.val) val += parseInt(btn.dataset.val, 10);
      betInput.value = Math.max(10, val);
    });
  });

  // Пресеты автовывода
  document.querySelectorAll('.crash-auto-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sounds.playClick();
      if (btn.dataset.val === 'off') {
        autoInput.value = '';
        if (targetValEl) targetValEl.textContent = 'ВЫКЛ';
      } else {
        autoInput.value = btn.dataset.val;
        if (targetValEl) targetValEl.textContent = `${btn.dataset.val}x`;
      }
    });
  });

  if (autoInput) {
    autoInput.addEventListener('input', () => {
      const val = parseFloat(autoInput.value);
      if (targetValEl) targetValEl.textContent = val > 1 ? `${val.toFixed(2)}x` : 'ВЫКЛ';
    });
  }

  function renderCrashCrew() {
    const list = document.getElementById('crashPlayersList');
    if (!list) return;

    list.innerHTML = crashLiveCrew.map(p => `
      <div class="crash-player-row">
        <span class="crash-player-name">${p.isUser ? '👤 Ты' : '🤖 ' + p.name} (${p.bet} MD)</span>
        <span class="crash-player-status ${p.status}">
          ${p.status === 'cashed' ? `💰 ${p.cashMult.toFixed(2)}x (+${p.profit} MD)` : (p.status === 'crashed' ? '💥 Сгорел' : '🚀 В полёте')}
        </span>
      </div>
    `).join('');
  }

  btnStart.addEventListener('click', () => {
    if (STATE.crash.running) return;
    const bet = parseInt(betInput.value, 10) || 0;

    if (bet <= 0) return showToast('⚠️ Введи сумму ставки на полет!');
    if (STATE.balance < bet) return showToast('❌ Недостаточно средств! 💸');

    STATE.balance -= bet;
    addXP(20);
    saveState();
    updateUI();

    STATE.crash.running = true;
    STATE.crash.bet = bet;
    STATE.crash.hasCashedOut = false;
    STATE.crash.multiplier = 1.0;
    STATE.crash.startTime = performance.now();

    const rand = Math.random();
    if (rand < 0.1) {
      STATE.crash.crashPoint = 1.0 + Math.random() * 0.15;
    } else {
      STATE.crash.crashPoint = Math.min(60, 1.0 + Math.pow(Math.E, (1 - rand) * 3.2));
    }

    // Инициализация живой команды на этот полет
    crashLiveCrew = [
      { name: 'Ты', bet: bet, isUser: true, status: 'in-flight', targetMult: parseFloat(autoInput.value) || 0, cashMult: 0, profit: 0 },
      { name: 'Артем Студент', bet: 80, isUser: false, status: 'in-flight', targetMult: 1.4 + Math.random() * 0.8, cashMult: 0, profit: 0 },
      { name: 'Димон_2007', bet: 200, isUser: false, status: 'in-flight', targetMult: 1.8 + Math.random() * 1.5, cashMult: 0, profit: 0 },
      { name: 'Батя на Девятке', bet: 450, isUser: false, status: 'in-flight', targetMult: 2.2 + Math.random() * 3.5, cashMult: 0, profit: 0 }
    ];
    renderCrashCrew();

    btnStart.disabled = true;
    btnCashout.disabled = false;

    const multDisplay = document.getElementById('crashMultiplier');
    const statusSub = document.getElementById('crashStatusSub');
    multDisplay.classList.remove('crashed');
    statusSub.textContent = 'Ракета набирает высоту... 🚀';

    runCrashFlight(ctx, canvas, renderCrashCrew);
  });

  btnCashout.addEventListener('click', () => {
    doUserCashout();
  });

  function doUserCashout() {
    if (!STATE.crash.running || STATE.crash.hasCashedOut) return;
    STATE.crash.hasCashedOut = true;

    const wonAmount = Math.floor(STATE.crash.bet * STATE.crash.multiplier);
    STATE.balance += wonAmount;
    saveState();
    updateUI();

    sounds.playWin(STATE.crash.multiplier >= 2.0 ? 'exotic' : 'rare');
    if (STATE.crash.multiplier >= 2.0) {
      unlockAchievement('crash_pilot');
      confetti.burst(65);
    }

    // Обновляем статус в экипаже
    const me = crashLiveCrew.find(p => p.isUser);
    if (me) {
      me.status = 'cashed';
      me.cashMult = STATE.crash.multiplier;
      me.profit = wonAmount;
      renderCrashCrew();
    }

    showToast(`💰 Ты успел спрыгнуть на <b>${STATE.crash.multiplier.toFixed(2)}x</b>! Выигрыш: <b>${wonAmount} MD</b>!`, 'gold');
    btnCashout.disabled = true;
  }

  window._doCrashCashout = doUserCashout;
}

function drawCrashIdle(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;

  for (let x = 0; x < canvas.width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function runCrashFlight(ctx, canvas, renderCrewCallback) {
  const multDisplay = document.getElementById('crashMultiplier');
  const currentProfit = document.getElementById('crashCurrentProfit');
  const autoInput = document.getElementById('crashAutoCashout');
  const autoCashVal = parseFloat(autoInput ? autoInput.value : '0') || 0;

  function step(now) {
    if (!STATE.crash.running) return;

    const elapsedSec = (now - STATE.crash.startTime) / 1000;
    STATE.crash.multiplier = 1.0 + Math.pow(elapsedSec * 0.55, 1.85);

    multDisplay.textContent = `${STATE.crash.multiplier.toFixed(2)}x`;
    currentProfit.textContent = Math.floor(STATE.crash.bet * STATE.crash.multiplier);

    // Авто-вывод для игрока
    if (!STATE.crash.hasCashedOut && autoCashVal > 1.0 && STATE.crash.multiplier >= autoCashVal) {
      if (window._doCrashCashout) window._doCrashCashout();
    }

    // Обновление ботов в раунде
    let crewChanged = false;
    crashLiveCrew.forEach(p => {
      if (!p.isUser && p.status === 'in-flight' && STATE.crash.multiplier >= p.targetMult && p.targetMult < STATE.crash.crashPoint) {
        p.status = 'cashed';
        p.cashMult = p.targetMult;
        p.profit = Math.floor(p.bet * p.targetMult);
        crewChanged = true;
      }
    });
    if (crewChanged && renderCrewCallback) renderCrewCallback();

    // Отрисовка звезд и сетки
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCrashIdle(ctx, canvas);

    // Движение звездного неба назад
    ctx.fillStyle = '#ffffff';
    crashStars.forEach(st => {
      st.x -= st.speed * (1 + elapsedSec * 0.4);
      if (st.x < 0) st.x = canvas.width;
      ctx.beginPath();
      ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
      ctx.fill();
    });

    const progressX = Math.min(canvas.width - 40, (canvas.width - 40) * (elapsedSec / 8));
    const progressY = canvas.height - 20 - Math.min(canvas.height - 60, Math.pow(elapsedSec * 22, 1.3));

    // Спавн реактивных искр из сопла
    for (let k = 0; k < 2; k++) {
      crashFlames.push({
        x: progressX - 10,
        y: progressY + 6,
        vx: -2 - Math.random() * 3,
        vy: (Math.random() - 0.5) * 2,
        life: 1.0,
        color: Math.random() < 0.6 ? '#ff204e' : '#f97316'
      });
    }

    // Отрисовка пламени ракеты
    for (let f = crashFlames.length - 1; f >= 0; f--) {
      const fl = crashFlames[f];
      fl.x += fl.vx;
      fl.y += fl.vy;
      fl.life -= 0.05;
      if (fl.life <= 0) {
        crashFlames.splice(f, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = fl.life;
      ctx.fillStyle = fl.color;
      ctx.beginPath();
      ctx.arc(fl.x, fl.y, 4 * fl.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Траектория полета
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 20);
    ctx.quadraticCurveTo(progressX * 0.4, canvas.height - 20, progressX, progressY);
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'rgba(255, 32, 78, 0.25)';
    ctx.lineWidth = 11;
    ctx.stroke();

    ctx.strokeStyle = '#ff204e';
    ctx.lineWidth = 4.5;
    ctx.stroke();

    // Сама ракета
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(progressX, progressY, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (STATE.crash.multiplier >= STATE.crash.crashPoint) {
      finishCrashFlight(renderCrewCallback);
    } else {
      STATE.crash.animId = requestAnimationFrame(step);
    }
  }

  STATE.crash.animId = requestAnimationFrame(step);
}

function finishCrashFlight(renderCrewCallback) {
  cancelAnimationFrame(STATE.crash.animId);
  STATE.crash.running = false;

  const multDisplay = document.getElementById('crashMultiplier');
  const btnStart = document.getElementById('btnCrashStart');
  const btnCashout = document.getElementById('btnCrashCashout');
  const statusSub = document.getElementById('crashStatusSub');

  multDisplay.classList.add('crashed');
  multDisplay.textContent = `КРАШ @ ${STATE.crash.multiplier.toFixed(2)}x`;

  // Помечаем всех не успевших как crashed
  crashLiveCrew.forEach(p => {
    if (p.status === 'in-flight') p.status = 'crashed';
  });
  if (renderCrewCallback) renderCrewCallback();

  sounds.playExplosion();
  const reason = CRASH_FAIL_REASONS[Math.floor(Math.random() * CRASH_FAIL_REASONS.length)];
  statusSub.textContent = `💥 ${reason}`;

  addCrashHistory(STATE.crash.multiplier);

  btnStart.disabled = false;
  btnCashout.disabled = true;
}

function addCrashHistory(mult) {
  const container = document.getElementById('crashHistory');
  if (!container) return;
  const chip = document.createElement('div');
  chip.className = `crash-chip ${mult >= 2.0 ? 'crash-chip-high' : 'crash-chip-low'}`;
  chip.textContent = `${mult.toFixed(2)}x`;
  container.insertBefore(chip, container.firstChild);
  while (container.children.length > 8) {
    container.removeChild(container.lastChild);
  }
}

// ============================================================================
// 16. САПЁР (MINES)
// ============================================================================

function initMines() {
  const grid = document.getElementById('minesGrid');
  const btnStart = document.getElementById('btnMinesStart');
  const btnRandom = document.getElementById('btnMinesRandom');
  const btnCashout = document.getElementById('btnMinesCashout');
  const betInput = document.getElementById('minesBetInput');
  const selectCount = document.getElementById('minesCountSelect');

  renderMinesCells(25);

  // Пресеты ставок
  document.querySelectorAll('.mines-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      sounds.playClick();
      let val = parseInt(betInput.value, 10) || 0;
      if (btn.dataset.mult === '0.5') val = Math.max(10, Math.floor(val / 2));
      else if (btn.dataset.mult === '2') val = val * 2;
      else if (btn.dataset.mult === 'max') val = STATE.balance;
      else if (btn.dataset.val) val += parseInt(btn.dataset.val, 10);
      betInput.value = Math.max(10, val);
      updateMinesInfo();
    });
  });

  if (selectCount) {
    selectCount.addEventListener('change', () => {
      updateMinesInfo();
    });
  }

  btnStart.addEventListener('click', () => {
    if (STATE.mines.active) return;
    const bet = parseInt(betInput.value, 10) || 0;
    if (bet <= 0) return showToast('⚠️ Введи ставку для Сапёра!');
    if (STATE.balance < bet) return showToast('❌ Недостаточно средств! 💸');

    STATE.balance -= bet;
    addXP(15);
    saveState();
    updateUI();

    STATE.mines.active = true;
    STATE.mines.bet = bet;
    STATE.mines.mineCount = parseInt(selectCount.value, 10);
    STATE.mines.revealedCount = 0;
    STATE.mines.currentMult = 1.0;

    const totalCells = 25;
    const gridData = new Array(totalCells).fill(false);
    let placed = 0;
    while (placed < STATE.mines.mineCount) {
      const idx = Math.floor(Math.random() * totalCells);
      if (!gridData[idx]) {
        gridData[idx] = true;
        placed++;
      }
    }
    STATE.mines.grid = gridData;

    btnStart.disabled = true;
    btnCashout.disabled = true;
    if (btnRandom) btnRandom.disabled = false;
    selectCount.disabled = true;
    betInput.disabled = true;

    updateMinesInfo();
    renderMinesCells(totalCells, true);
    showToast(`💣 Сапёр запущен! Мины (${STATE.mines.mineCount} шт) расставлены.`);
  });

  // Кнопка «Случайный выбор»
  if (btnRandom) {
    btnRandom.addEventListener('click', () => {
      if (!STATE.mines.active) return;
      const unrevealed = [];
      const cells = document.querySelectorAll('.mine-cell');
      cells.forEach((c, idx) => {
        if (!c.classList.contains('revealed')) unrevealed.push({ cell: c, idx });
      });

      if (unrevealed.length === 0) return;
      const pick = unrevealed[Math.floor(Math.random() * unrevealed.length)];
      handleMineCellClick(pick.cell, pick.idx);
    });
  }

  btnCashout.addEventListener('click', () => {
    if (!STATE.mines.active || STATE.mines.revealedCount === 0) return;
    STATE.mines.active = false;
    btnCashout.disabled = true;
    sounds.playCoin();

    const winAmount = Math.floor(STATE.mines.bet * STATE.mines.currentMult);
    STATE.balance += winAmount;
    saveState();
    updateUI();

    showToast(`🎉 Ты забрал <b>${winAmount} MD</b> (${STATE.mines.currentMult.toFixed(2)}x)!`, 'gold');
    revealAllMinesCascade();
    finishMinesGame();
  });

  updateMinesInfo();
}

function renderMinesCells(total, interactive = false) {
  const grid = document.getElementById('minesGrid');
  grid.innerHTML = '';

  for (let i = 0; i < total; i++) {
    const cell = document.createElement('div');
    cell.className = 'mine-cell';
    cell.dataset.index = i;

    if (interactive) {
      cell.addEventListener('click', () => handleMineCellClick(cell, i));
    }
    grid.appendChild(cell);
  }
}

function handleMineCellClick(cell, idx) {
  if (!STATE.mines.active || cell.classList.contains('revealed')) return;

  const isBomb = STATE.mines.grid[idx];
  cell.classList.add('revealed');

  if (isBomb) {
    sounds.playExplosion();
    cell.classList.add('revealed-bomb');
    cell.textContent = '💣';
    showToast('💥 БАБАХ! Ты наступил на двойку в зачетку!', 'normal');
    revealAllMinesCascade();
    finishMinesGame();
  } else {
    sounds.playTick();
    cell.classList.add('revealed-safe');
    const safeIcons = ['🌯', '🥣', '💎', '🪙', '✨'];
    cell.textContent = safeIcons[Math.floor(Math.random() * safeIcons.length)];

    STATE.mines.revealedCount++;
    const baseMult = 1 + (STATE.mines.mineCount / 25) * 1.35;
    STATE.mines.currentMult = Math.pow(baseMult, STATE.mines.revealedCount);

    if (STATE.mines.revealedCount >= 4) {
      unlockAchievement('mines_pro');
    }

    updateMinesInfo();
    document.getElementById('btnMinesCashout').disabled = false;
  }
}

function updateMinesInfo() {
  const multEl = document.getElementById('minesCurrentMult');
  const potEl = document.getElementById('minesPotentialWin');
  const nextEl = document.getElementById('minesNextMult');
  const gemsEl = document.getElementById('minesGemsLeft');
  const bombsEl = document.getElementById('minesBombsLeft');
  const selectCount = document.getElementById('minesCountSelect');
  const betInput = document.getElementById('minesBetInput');

  const bet = parseInt(betInput ? betInput.value : '100', 10) || 100;
  const mineCount = STATE.mines.active ? STATE.mines.mineCount : (parseInt(selectCount ? selectCount.value : '3', 10) || 3);
  const revealed = STATE.mines.active ? STATE.mines.revealedCount : 0;
  const currentMult = STATE.mines.active ? STATE.mines.currentMult : 1.0;

  if (multEl) multEl.textContent = `${currentMult.toFixed(2)}x`;
  if (potEl) potEl.textContent = `${Math.floor(bet * currentMult)} MD`;

  // Расчет следующего шага
  const baseMult = 1 + (mineCount / 25) * 1.35;
  const nextMult = Math.pow(baseMult, revealed + 1);
  const nextProfit = Math.floor(bet * nextMult) - Math.floor(bet * currentMult);
  if (nextEl) nextEl.textContent = `x${nextMult.toFixed(2)} (+${nextProfit} MD)`;

  if (gemsEl) gemsEl.textContent = Math.max(0, 25 - mineCount - revealed);
  if (bombsEl) bombsEl.textContent = mineCount;
}

function revealAllMinesCascade() {
  const cells = document.querySelectorAll('.mine-cell');
  cells.forEach((c, idx) => {
    if (!c.classList.contains('revealed')) {
      setTimeout(() => {
        c.classList.add('revealed');
        if (STATE.mines.grid[idx]) {
          c.classList.add('revealed-bomb');
          c.textContent = '💣';
        } else {
          c.classList.add('revealed-safe');
          c.style.opacity = '0.45';
          c.textContent = '💎';
        }
      }, idx * 25);
    }
  });
}

function finishMinesGame() {
  STATE.mines.active = false;
  document.getElementById('btnMinesStart').disabled = false;
  document.getElementById('btnMinesCashout').disabled = true;
  const btnRandom = document.getElementById('btnMinesRandom');
  if (btnRandom) btnRandom.disabled = true;
  document.getElementById('minesCountSelect').disabled = false;
  document.getElementById('minesBetInput').disabled = false;
}

// ============================================================================
// 17. АПГРЕЙДЕР 2.0 (UPGRADER PRO)
// ============================================================================

function initUpgraderCatalog() {
  renderUpgraderCatalog();
  renderUpgraderSlots();
}

function renderUpgraderCatalog() {
  const catalog = document.getElementById('upgraderTargetCatalog');
  if (!catalog) return;

  const currentVal = STATE.upgrader.mode === 'balance'
    ? STATE.upgrader.betMD
    : (STATE.upgrader.sourceItem ? STATE.upgrader.sourceItem.price : 100);

  const search = (STATE.upgrader.searchFilter || '').toLowerCase().trim();
  const rarity = STATE.upgrader.rarityFilter || 'all';

  const filtered = ALL_CATALOG_ITEMS.filter(it => {
    if (search && !it.name.toLowerCase().includes(search)) return false;
    if (rarity !== 'all' && it.rarity !== rarity) return false;
    return true;
  });

  if (filtered.length === 0) {
    catalog.innerHTML = `<div class="empty-slot-msg" style="grid-column: 1/-1; padding: 20px;">Предметы не найдены по заданным фильтрам</div>`;
    return;
  }

  catalog.innerHTML = filtered.map(it => {
    const isSelected = STATE.upgrader.targetItem && STATE.upgrader.targetItem.name === it.name;
    const chance = Math.min(95, Math.max(1, (currentVal / it.price) * 100));
    return `
      <div class="target-item-card ${RARITIES[it.rarity].class} ${isSelected ? 'selected' : ''}" data-name="${it.name}">
        <div class="target-icon">${it.icon}</div>
        <div class="target-name">${it.name}</div>
        <div class="target-price">${it.price} MD</div>
        <div class="target-chance-badge">${chance.toFixed(1)}% ШАНС</div>
      </div>
    `;
  }).join('');

  catalog.querySelectorAll('.target-item-card').forEach(card => {
    card.addEventListener('click', () => {
      sounds.playClick();
      catalog.querySelectorAll('.target-item-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      const targetName = card.dataset.name;
      STATE.upgrader.targetItem = ALL_CATALOG_ITEMS.find(x => x.name === targetName);
      renderUpgraderSlots();
    });
  });
}

function renderUpgraderSlots() {
  const slotSrc = document.getElementById('upgradeSlotSource');
  const slotTgt = document.getElementById('upgradeSlotTarget');
  const btnStart = document.getElementById('btnStartUpgrade');
  const chanceVal = document.getElementById('upgradeChanceVal');
  const multHint = document.getElementById('upgradeMultHint');
  const winSector = document.getElementById('radarWinSector');
  const sideLabel = document.getElementById('upgradeSideLabel');
  const priceDiff = document.getElementById('targetPriceDiff');

  if (sideLabel) {
    sideLabel.textContent = STATE.upgrader.side === 'left' ? 'СЛЕВА (0° - Win)' : 'СПРАВА (Win - 360°)';
    sideLabel.style.color = STATE.upgrader.side === 'left' ? 'var(--color-green)' : 'var(--color-purple)';
  }

  let sourceVal = 0;

  if (STATE.upgrader.mode === 'balance') {
    sourceVal = STATE.upgrader.betMD;
    if (slotSrc) {
      slotSrc.innerHTML = `
        <div class="picked-card">
          <span class="slot-icon">💰</span>
          <span class="slot-name">Ставка монетами MD</span>
          <span class="slot-price">${sourceVal} MD</span>
        </div>
      `;
    }
  } else {
    // Режим Инвентаря
    if (!STATE.upgrader.sourceItem && STATE.inventory.length > 0) {
      STATE.upgrader.sourceItem = STATE.inventory[0];
    }
    if (STATE.upgrader.sourceItem) {
      sourceVal = STATE.upgrader.sourceItem.price;
      if (slotSrc) {
        slotSrc.innerHTML = `
          <div class="picked-card">
            <span class="slot-icon">${STATE.upgrader.sourceItem.icon}</span>
            <span class="slot-name">${STATE.upgrader.sourceItem.name}</span>
            <span class="slot-price">${STATE.upgrader.sourceItem.price} MD</span>
          </div>
        `;
      }
    } else {
      sourceVal = 0;
      if (slotSrc) {
        slotSrc.innerHTML = `<span class="empty-slot-msg">Инвентарь пуст! Переключись на «За монеты» или открой кейс.</span>`;
      }
    }
  }

  // Целевой предмет
  if (STATE.upgrader.targetItem) {
    if (slotTgt) {
      slotTgt.innerHTML = `
        <div class="picked-card">
          <span class="slot-icon">${STATE.upgrader.targetItem.icon}</span>
          <span class="slot-name">${STATE.upgrader.targetItem.name}</span>
          <span class="slot-price">${STATE.upgrader.targetItem.price} MD</span>
        </div>
      `;
    }
    if (priceDiff && sourceVal > 0) {
      const diff = STATE.upgrader.targetItem.price - sourceVal;
      priceDiff.textContent = diff > 0 ? `+${diff} MD профит` : 'Равная ценность';
    }
  } else {
    if (slotTgt) slotTgt.innerHTML = `<span class="empty-slot-msg">Выбери целевой предмет в каталоге ниже</span>`;
    if (priceDiff) priceDiff.textContent = '';
  }

  // Расчет шанса и отрисовка дуги радара
  if (sourceVal > 0 && STATE.upgrader.targetItem) {
    let chance = (sourceVal / STATE.upgrader.targetItem.price) * 100;
    chance = Math.min(95, Math.max(1, chance));
    if (chanceVal) chanceVal.textContent = `${chance.toFixed(1)}%`;

    const mult = (STATE.upgrader.targetItem.price / sourceVal).toFixed(1);
    if (multHint) multHint.textContent = `x${mult}`;

    const circum = 534;
    const arcLength = (circum * chance) / 100;
    const offset = circum - arcLength;

    if (winSector) {
      winSector.style.strokeDashoffset = offset;
      winSector.style.stroke = STATE.upgrader.side === 'left' ? 'var(--color-green)' : 'var(--color-purple)';
      winSector.style.transform = STATE.upgrader.side === 'left' ? 'none' : 'scaleX(-1) translate(-200px, 0)';
    }

    if (btnStart) btnStart.disabled = false;
  } else {
    if (chanceVal) chanceVal.textContent = '0%';
    if (multHint) multHint.textContent = 'x0.0';
    if (winSector) winSector.style.strokeDashoffset = 534;
    if (btnStart) btnStart.disabled = true;
  }
}

function openUpgraderInventoryPicker() {
  const modal = document.getElementById('upgInventoryModal');
  const grid = document.getElementById('upgInvPickerGrid');
  if (!modal || !grid) return;

  if (STATE.inventory.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 30px; color: var(--text-muted);">
        <div style="font-size: 38px; margin-bottom: 8px;">🎒</div>
        <h4>Твой инвентарь пуст!</h4>
        <p style="font-size: 12px; margin-top: 4px;">Открой кейсы в первой вкладке или переключись на режим «За монеты MD»</p>
      </div>
    `;
  } else {
    grid.innerHTML = STATE.inventory.map(item => `
      <div class="upg-pick-card ${RARITIES[item.rarity].class}" data-uid="${item.uid}">
        <div class="pick-icon">${item.icon}</div>
        <div class="pick-name">${item.name}</div>
        <div class="pick-price">${item.price} MD</div>
      </div>
    `).join('');

    grid.querySelectorAll('.upg-pick-card').forEach(card => {
      card.addEventListener('click', () => {
        sounds.playClick();
        const uid = parseInt(card.dataset.uid, 10);
        const found = STATE.inventory.find(x => x.uid === uid);
        if (found) {
          STATE.upgrader.sourceItem = found;
          modal.classList.remove('open');
          renderUpgraderCatalog();
          renderUpgraderSlots();
        }
      });
    });
  }

  modal.classList.add('open');
}

function initUpgraderAction() {
  const btnStart = document.getElementById('btnStartUpgrade');
  const needle = document.getElementById('radarNeedle');
  const shockwave = document.getElementById('radarShockwave');

  // Переключение режима (Инвентарь / Баланс)
  const btnModeInv = document.getElementById('btnUpgModeInv');
  const btnModeBal = document.getElementById('btnUpgModeBal');
  const balInputWrap = document.getElementById('upgBalanceInputWrap');
  const btnChooseSource = document.getElementById('btnChooseSourceInv');
  const sourceTitle = document.getElementById('upgSourceTitle');

  if (btnModeInv && btnModeBal) {
    btnModeInv.addEventListener('click', () => {
      sounds.playClick();
      STATE.upgrader.mode = 'inventory';
      btnModeInv.classList.add('active');
      btnModeBal.classList.remove('active');
      if (balInputWrap) balInputWrap.style.display = 'none';
      if (btnChooseSource) btnChooseSource.style.display = 'inline-block';
      if (sourceTitle) sourceTitle.textContent = '1. Твой предмет (жертва):';
      renderUpgraderCatalog();
      renderUpgraderSlots();
    });

    btnModeBal.addEventListener('click', () => {
      sounds.playClick();
      STATE.upgrader.mode = 'balance';
      btnModeBal.classList.add('active');
      btnModeInv.classList.remove('active');
      if (balInputWrap) balInputWrap.style.display = 'block';
      if (btnChooseSource) btnChooseSource.style.display = 'none';
      if (sourceTitle) sourceTitle.textContent = '1. Ставка монетами:';
      renderUpgraderCatalog();
      renderUpgraderSlots();
    });
  }

  // Кнопка открытия инвентаря
  if (btnChooseSource) {
    btnChooseSource.addEventListener('click', () => {
      sounds.playClick();
      openUpgraderInventoryPicker();
    });
  }

  // Закрытие модалки инвентаря
  const upgInvModal = document.getElementById('upgInventoryModal');
  const closeUpgInvBtn = document.getElementById('closeUpgInvModal');
  if (closeUpgInvBtn && upgInvModal) {
    closeUpgInvBtn.addEventListener('click', () => {
      upgInvModal.classList.remove('open');
    });
  }
  if (upgInvModal) {
    upgInvModal.addEventListener('click', (e) => {
      if (e.target === upgInvModal) upgInvModal.classList.remove('open');
    });
  }

  // Ввод ставки в режиме баланса
  const balBetInput = document.getElementById('upgBalanceBet');
  if (balBetInput) {
    balBetInput.addEventListener('input', () => {
      let val = parseInt(balBetInput.value, 10);
      if (isNaN(val) || val < 10) val = 10;
      STATE.upgrader.betMD = val;
      renderUpgraderCatalog();
      renderUpgraderSlots();
    });
  }

  document.querySelectorAll('.btn-preset.upg-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      sounds.playClick();
      let current = STATE.upgrader.betMD || 250;
      if (btn.dataset.val) current += parseInt(btn.dataset.val, 10);
      if (btn.dataset.mult === '2') current = Math.floor(current * 2);
      if (btn.dataset.mult === 'max') current = Math.max(10, STATE.balance);

      STATE.upgrader.betMD = current;
      if (balBetInput) balBetInput.value = current;
      renderUpgraderCatalog();
      renderUpgraderSlots();
    });
  });

  // Быстрые множители
  document.querySelectorAll('.btn-upg-mult').forEach(btn => {
    btn.addEventListener('click', () => {
      sounds.playClick();
      document.querySelectorAll('.btn-upg-mult').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      const mult = parseFloat(btn.dataset.mult);
      const sourceVal = STATE.upgrader.mode === 'balance'
        ? STATE.upgrader.betMD
        : (STATE.upgrader.sourceItem ? STATE.upgrader.sourceItem.price : 100);

      const targetPrice = sourceVal * mult;
      // Находим ближайший предмет из каталога
      let bestItem = ALL_CATALOG_ITEMS[0];
      let bestDiff = Infinity;
      ALL_CATALOG_ITEMS.forEach(it => {
        const diff = Math.abs(it.price - targetPrice);
        if (diff < bestDiff) {
          bestDiff = diff;
          bestItem = it;
        }
      });

      STATE.upgrader.targetItem = bestItem;
      renderUpgraderCatalog();
      renderUpgraderSlots();
    });
  });

  // Переключатель стороны сектора
  const btnSide = document.getElementById('btnUpgradeSide');
  if (btnSide) {
    btnSide.addEventListener('click', () => {
      sounds.playClick();
      STATE.upgrader.side = STATE.upgrader.side === 'left' ? 'right' : 'left';
      renderUpgraderSlots();
    });
  }

  // Поиск и фильтры по редкости в каталоге
  const searchInput = document.getElementById('upgSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      STATE.upgrader.searchFilter = searchInput.value;
      renderUpgraderCatalog();
    });
  }

  document.querySelectorAll('#upgRarityFilter .rarity-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      sounds.playClick();
      document.querySelectorAll('#upgRarityFilter .rarity-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      STATE.upgrader.rarityFilter = pill.dataset.rarity;
      renderUpgraderCatalog();
    });
  });

  // Запуск апгрейда
  if (!btnStart) return;

  btnStart.addEventListener('click', () => {
    if (STATE.upgrader.isSpinning) return;
    const tgt = STATE.upgrader.targetItem;
    if (!tgt) return;

    let sourceVal = 0;

    if (STATE.upgrader.mode === 'inventory') {
      const src = STATE.upgrader.sourceItem;
      if (!src) return showToast('⚠️ Выбери предмет для апгрейда!');
      const invIdx = STATE.inventory.findIndex(x => (src.uid && x.uid === src.uid) || x.name === src.name);
      if (invIdx === -1) {
        return showToast('❌ Предмет не найден в твоем инвентаре!');
      }
      sourceVal = src.price;
      STATE.inventory.splice(invIdx, 1);
    } else {
      sourceVal = STATE.upgrader.betMD;
      if (STATE.balance < sourceVal) {
        sounds.playExplosion();
        return showToast('❌ Недостаточно MD на балансе для апгрейда!');
      }
      STATE.balance -= sourceVal;
    }

    STATE.upgrader.isSpinning = true;
    btnStart.disabled = true;

    addXP(35);
    saveState();
    updateUI();

    let chance = (sourceVal / tgt.price) * 100;
    chance = Math.min(95, Math.max(1, chance));
    const winAngle = (chance / 100) * 360;

    const fullSpins = 4 + Math.floor(Math.random() * 3);
    const finalAngle = Math.random() * 360;
    const totalRotation = fullSpins * 360 + finalAngle;

    needle.style.transition = 'transform 4.5s cubic-bezier(0.12, 0.8, 0.25, 1)';
    needle.style.transform = `translate(-50%, -100%) rotate(${totalRotation}deg)`;

    // Динамический треск стрелки с замедлением
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      sounds.playTick();
      tickCount++;
      if (tickCount > 35) clearInterval(tickInterval);
    }, 110);

    setTimeout(() => {
      clearInterval(tickInterval);
      STATE.upgrader.isSpinning = false;

      // Проверка победы в зависимости от стороны сектора
      let won = false;
      if (STATE.upgrader.side === 'left') {
        won = finalAngle <= winAngle;
      } else {
        won = finalAngle >= (360 - winAngle);
      }

      if (won) {
        if (shockwave) {
          shockwave.classList.remove('boom');
          void shockwave.offsetWidth;
          shockwave.classList.add('boom');
        }
        sounds.playWin(tgt.rarity);
        confetti.burst(90);
        STATE.inventory.unshift({ ...tgt, uid: Date.now() });
        saveState();
        updateUI();
        unlockAchievement('alchemist');

        const rect = btnStart.getBoundingClientRect();
        spawnFloatingBadge(rect.left + rect.width / 2, rect.top - 20, `+${tgt.price} MD`, 'gold');

        showToast(`⚡ <b>УСПЕХ!</b> Выигран предмет <b>${tgt.name} (${tgt.price} MD)</b>!`, 'gold');
      } else {
        sounds.playExplosion();
        showToast(`💥 НЕУДАЧА! Предмет сгорел в печи Марара...`, 'normal');
      }

      setTimeout(() => {
        needle.style.transition = 'none';
        needle.style.transform = `translate(-50%, -100%) rotate(0deg)`;
        if (STATE.upgrader.mode === 'inventory') {
          STATE.upgrader.sourceItem = STATE.inventory[0] || null;
        }
        renderUpgraderSlots();
      }, 1500);
    }, 4600);
  });
}

// ============================================================================
// 18. ЧАТ, ПРОМОКОДЫ, КОЛЕСО ФОРТУНЫ И ИНВЕНТАРЬ
// ============================================================================

const BOT_MESSAGES = [
  { user: 'Артем_Гусь', badge: 'ИГРОК', text: 'Админ, отдай мои 500 MD на дошик!' },
  { user: 'Димон_2007', badge: 'VIP', text: 'Кто на дуэль в битвах кейсов?!' },
  { user: 'Санёк_Шаурма', badge: 'ЛЮБИТЕЛЬ', text: 'Плинко занесло x50 прямо в угол!' },
  { user: 'Марар_Снайпер', badge: 'БОГ', text: 'Краш на 1.02x это вообще законно?! 😂' },
  { user: 'Бабка_Гренни', badge: 'ВЕТЕРАН', text: 'Внучок, крути зеленый, он всегда залетает!' },
  { user: 'Система', badge: 'BOT', text: '⚡ Игрок Влад_2009 сорвал куш 4,500 MD в Рулетке!' }
];

function initLiveChat() {
  const container = document.getElementById('chatMessages');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  if (!container || !form) return;

  BOT_MESSAGES.slice(0, 4).forEach(msg => appendChatMessage(msg.user, msg.badge, msg.text));

  setInterval(() => {
    if (document.hidden) return;
    const rand = BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)];
    appendChatMessage(rand.user, rand.badge, rand.text);
  }, 7500);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    sounds.playClick();
    appendChatMessage(STATE.profile.name, 'ИГРОК', text, true);
    input.value = '';

    STATE.counters.chat += 1;
    addXP(10);
    saveState();
  });
}

function appendChatMessage(user, badge, text, isMe = false) {
  const container = document.getElementById('chatMessages');
  if (!container) return;

  const msgEl = document.createElement('div');
  msgEl.className = 'chat-msg';

  const isSystem = user === 'Система';

  msgEl.innerHTML = `
    <div class="chat-user-line">
      <span class="chat-badge">${badge}</span>
      <span class="chat-author ${isMe ? 'is-me' : ''} ${isSystem ? 'is-system' : ''}">${user}:</span>
    </div>
    <div class="chat-text">${text}</div>
  `;

  container.appendChild(msgEl);
  while (container.children.length > 30) {
    container.removeChild(container.firstChild);
  }
  if (document.getElementById('chatDrawer')?.classList.contains('open')) {
    container.scrollTop = container.scrollHeight;
  }
}

const PROMO_CODES = {
  MARAR2026: { reward: 1000, desc: 'Бонус +1000 MD' },
  SHAVUHA: { reward: 500, desc: 'Шаурма + 500 MD', item: { id: 'sh1', name: 'Свежая Шаурма в лаваше', icon: '🌯', rarity: 'uncommon', price: 300 } },
  BABLO: { reward: 2500, desc: 'Кнопка бабло +2500 MD' },
  KOT: { reward: 300, desc: 'Кот Шлёпа + 300 MD', item: { id: 'kt1', name: 'Кот Шлёпа (Оригинал)', icon: '🐱', rarity: 'rare', price: 650 } }
};

function initPromoSystem() {
  const btn = document.getElementById('btnActivatePromo');
  const input = document.getElementById('promoCodeInput');
  const promoModal = document.getElementById('promoModal');
  const banModal = document.getElementById('banModal');
  if (!btn || !input) return;

  btn.addEventListener('click', () => {
    const code = input.value.trim().toUpperCase();
    if (!code) return showToast('⚠️ Введи промокод!');

    if (code === 'ADMIN') {
      sounds.playExplosion();
      promoModal.classList.remove('open');
      banModal.classList.add('open');
      input.value = '';

      let countdown = 5;
      const countEl = document.getElementById('banCountdown');
      countEl.textContent = countdown;

      const timer = setInterval(() => {
        countdown--;
        countEl.textContent = countdown;
        if (countdown <= 0) {
          clearInterval(timer);
          banModal.classList.remove('open');
          STATE.balance += 1;
          saveState();
          updateUI();
          showToast('😇 Разбанен! Начислено +1 MD компенсации :)', 'gold');
        }
      }, 1000);
      return;
    }

    if (STATE.activatedPromos.includes(code)) {
      return showToast('❌ Этот промокод уже был активирован ранее!');
    }

    const data = PROMO_CODES[code];
    if (data) {
      sounds.playCoin();
      confetti.burst(60);
      STATE.balance += data.reward;
      if (data.item) STATE.inventory.unshift({ ...data.item, uid: Date.now() });
      STATE.activatedPromos.push(code);
      addXP(50);
      saveState();
      updateUI();

      showToast(`🎁 Промокод <b>${code}</b> активирован! (+${data.reward} MD)`, 'gold');
      input.value = '';
      promoModal.classList.remove('open');
    } else {
      sounds.playClick();
      showToast('❌ Неверный промокод!');
    }
  });
}

const WHEEL_SECTORS = [
  { label: '+250 MD', type: 'coins', val: 250, color: '#ff204e' },
  { label: 'Золотой Дошик', type: 'item', val: { name: 'Золотой Дошик', icon: '🥣', rarity: 'rare', price: 400 }, color: '#1c1c2b' },
  { label: '+1 000 MD', type: 'coins', val: 1000, color: '#10b981' },
  { label: 'Дырка от бублика', type: 'empty', val: 0, color: '#13131f' },
  { label: 'Шавуха', type: 'item', val: { name: 'Царская Шавуха', icon: '🌯', rarity: 'uncommon', price: 300 }, color: '#ff204e' },
  { label: '+500 MD', type: 'coins', val: 500, color: '#38bdf8' },
  { label: 'ДЖЕКПОТ 2.5k', type: 'coins', val: 2500, color: '#fbbf24' },
  { label: 'Изолента', type: 'item', val: { name: 'Синяя Изолента', icon: '🌀', rarity: 'uncommon', price: 350 }, color: '#2b2b3f' }
];

let wheelRotation = 0;
let isWheelSpinning = false;

function drawWheel() {
  const canvas = document.getElementById('wheelCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = cx - 10;
  const total = WHEEL_SECTORS.length;
  const arc = (Math.PI * 2) / total;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(wheelRotation);

  WHEEL_SECTORS.forEach((sec, i) => {
    const angle = i * arc;
    ctx.beginPath();
    ctx.fillStyle = sec.color;
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, angle, angle + arc);
    ctx.lineTo(0, 0);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.save();
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Montserrat';
    ctx.fillText(sec.label, radius - 18, 5);
    ctx.restore();
  });

  ctx.beginPath();
  ctx.fillStyle = '#08080c';
  ctx.arc(0, 0, 32, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ff204e';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 11px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('MARAR', 0, 0);
  ctx.restore();
}

function updateWheelTimerUI() {
  const notice = document.getElementById('wheelTimerNotice');
  const btn = document.getElementById('btnSpinWheel');
  if (!notice || !btn) return;

  if (isWheelSpinning) {
    notice.textContent = 'Колесо крутится... Удачи! 🎡';
    btn.disabled = true;
    return;
  }

  const now = Date.now();
  const cooldown = 2 * 60 * 1000;
  const diff = now - STATE.lastWheelSpin;

  if (diff < cooldown) {
    const remainingSec = Math.ceil((cooldown - diff) / 1000);
    notice.textContent = `Бесплатный спин через: ${remainingSec} сек.`;
    btn.disabled = true;
  } else {
    notice.textContent = 'Бесплатный спин готов! Крути прямо сейчас 🎡';
    btn.disabled = false;
  }
}

function initWheel() {
  const btn = document.getElementById('btnSpinWheel');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (isWheelSpinning) return;
    isWheelSpinning = true;
    btn.disabled = true;

    STATE.lastWheelSpin = Date.now();
    saveState();

    const total = WHEEL_SECTORS.length;
    const arc = (Math.PI * 2) / total;
    const winningIdx = Math.floor(Math.random() * total);

    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const targetSectorAngle = (total - winningIdx - 0.5) * arc - Math.PI / 2;
    const targetRotation = wheelRotation + extraSpins * Math.PI * 2 + (targetSectorAngle - (wheelRotation % (Math.PI * 2)));

    const startRot = wheelRotation;
    const duration = 4500;
    const startTime = performance.now();

    function animateWheel(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3.5);
      wheelRotation = startRot + (targetRotation - startRot) * ease;
      drawWheel();

      if (progress < 1) {
        requestAnimationFrame(animateWheel);
      } else {
        isWheelSpinning = false;
        finishWheelSpin(WHEEL_SECTORS[winningIdx]);
      }
    }

    requestAnimationFrame(animateWheel);
  });

  setInterval(() => {
    if (document.hidden) return;
    if (!document.getElementById('wheelModal')?.classList.contains('open')) return;
    updateWheelTimerUI();
  }, 1000);
}

function finishWheelSpin(sector) {
  sounds.playWin('rare');

  if (sector.type === 'coins') {
    STATE.balance += sector.val;
    saveState();
    updateUI();
    confetti.burst(60);
    showToast(`🎡 Колесо: выиграно <b>+${sector.val} MD</b>!`, 'gold');
  } else if (sector.type === 'item') {
    STATE.inventory.unshift({ ...sector.val, uid: generateUid() });
    saveState();
    updateUI();
    if (document.getElementById('tab-inventory')?.classList.contains('active')) renderInventory();
    confetti.burst(50);
    showToast(`🎡 Колесо: получен предмет <b>${sector.val.name}</b>!`, 'gold');
  } else {
    showToast(`🎡 Колесо: выпала <b>${sector.label}</b>.`);
  }

  updateWheelTimerUI();
}

function renderInventory() {
  const grid = document.getElementById('inventoryGrid');
  if (!grid) return;

  if (STATE.inventory.length === 0) {
    grid.innerHTML = `
      <div class="empty-inventory">
        <div class="empty-icon">🎒</div>
        <h3>Твой инвентарь пока пуст</h3>
        <p>Открывай кейсы в первой вкладке или выигрывай в битвах!</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = STATE.inventory.map(item => `
    <div class="inv-card ${RARITIES[item.rarity].class}">
      <div class="inv-icon">${item.icon}</div>
      <div class="inv-name">${item.name}</div>
      <div class="inv-rarity" style="color: ${RARITIES[item.rarity].color}">
        ${RARITIES[item.rarity].name}
      </div>
      <div class="inv-price">${item.price} MD</div>
      <button class="btn-inv-sell" data-uid="${item.uid}">Продать</button>
    </div>
  `).join('');

  grid.querySelectorAll('.btn-inv-sell').forEach(btn => {
    btn.addEventListener('click', () => {
      const uid = parseInt(btn.dataset.uid, 10);
      sellInventoryItem(uid);
    });
  });
}

function sellInventoryItem(uid) {
  const idx = STATE.inventory.findIndex(x => x.uid === uid);
  if (idx === -1) return;

  sounds.playCoin();
  const item = STATE.inventory[idx];
  STATE.balance += item.price;
  STATE.inventory.splice(idx, 1);

  // Очистка привязок в контрактах и апгрейдере
  STATE.contractPicks = STATE.contractPicks.filter(x => x !== uid);
  if (STATE.upgrader.sourceItem && STATE.upgrader.sourceItem.uid === uid) {
    STATE.upgrader.sourceItem = STATE.inventory[0] || null;
    if (typeof renderUpgraderSlots === 'function') renderUpgraderSlots();
  }

  saveState();
  updateUI();
  renderInventory();
  if (typeof updateContractSummary === 'function') updateContractSummary();
  showToast(`💰 Предмет <b>${item.name}</b> продан за <b>${item.price} MD</b>!`, 'gold');
}

function sellAllInventory() {
  if (STATE.inventory.length === 0) return showToast('Инвентарь и так пуст!');

  sounds.playCoin();
  const total = STATE.inventory.reduce((sum, it) => sum + it.price, 0);
  const count = STATE.inventory.length;

  STATE.balance += total;
  STATE.inventory = [];
  STATE.contractPicks = [];
  STATE.upgrader.sourceItem = null;
  if (typeof renderUpgraderSlots === 'function') renderUpgraderSlots();

  saveState();
  updateUI();
  renderInventory();
  if (typeof updateContractSummary === 'function') updateContractSummary();
  showToast(`💰 Продано предметов: <b>${count} шт.</b> на общую сумму <b>${total} MD</b>!`, 'gold');
}

function initLiveTicker() {
  const track = document.getElementById('liveTickerTrack');
  if (!track) return;

  const FAKE_USERS = ['Артем_Гусь', 'Димон_2007', 'Крутой_Бобер', 'Санёк_Шаурма', 'Бабка_Гренни', 'Илья_Матан'];
  for (let i = 0; i < 8; i++) {
    const randomUser = FAKE_USERS[Math.floor(Math.random() * FAKE_USERS.length)];
    const randomCase = CASES_DATA[Math.floor(Math.random() * CASES_DATA.length)];
    const randomItem = randomCase.items[Math.floor(Math.random() * randomCase.items.length)];
    addLiveDrop(randomUser, randomItem);
  }

  setInterval(() => {
    if (document.hidden) return;
    const randomUser = FAKE_USERS[Math.floor(Math.random() * FAKE_USERS.length)];
    const randomCase = CASES_DATA[Math.floor(Math.random() * CASES_DATA.length)];
    const randomItem = randomCase.items[Math.floor(Math.random() * randomCase.items.length)];
    addLiveDrop(randomUser, randomItem);
  }, 6500);
}

function addLiveDrop(user, item) {
  const track = document.getElementById('liveTickerTrack');
  if (!track) return;

  const itemEl = document.createElement('div');
  itemEl.className = `ticker-item ${RARITIES[item.rarity].class}`;
  itemEl.innerHTML = `
    <span class="ticker-icon">${item.icon}</span>
    <span class="ticker-user">${user}:</span>
    <span class="ticker-name">${item.name}</span>
  `;

  track.insertBefore(itemEl, track.firstChild);
  while (track.children.length > 10) {
    track.removeChild(track.lastChild);
  }
}

// ============================================================================
// 18.1. СЛОТ MARAR BONANZA (5x3 СЛОТ С БОНУСКОЙ, МНОЖИТЕЛЯМИ И ПОКУПКОЙ БОНУСКИ)
// ============================================================================

const SLOT_SYMBOLS = {
  crown:    { id: 'crown',    name: 'Золотой Дошик', icon: '👑', type: 'regular', color: '#fbbf24', rates: { 3: 5,   4: 20,  5: 50 } },
  car:      { id: 'car',      name: 'Батя 2109',     icon: '🚗', type: 'regular', color: '#ef4444', rates: { 3: 3,   4: 10,  5: 25 } },
  pickle:   { id: 'pickle',   name: 'Рассол',        icon: '🥒', type: 'regular', color: '#10b981', rates: { 3: 2,   4: 6,   5: 15 } },
  cat:      { id: 'cat',      name: 'Шлёпа',         icon: '🐱', type: 'regular', color: '#ec4899', rates: { 3: 1.5, 4: 4,   5: 10 } },
  shawarma: { id: 'shawarma', name: 'Шавуха',        icon: '🌯', type: 'regular', color: '#f59e0b', rates: { 3: 1,   4: 2.5, 5: 6 } },
  studak:   { id: 'studak',   name: 'Студак',        icon: '🪪', type: 'regular', color: '#3b82f6', rates: { 3: 0.8, 4: 2,   5: 5 } },
  crib:     { id: 'crib',     name: 'Шпора',         icon: '📜', type: 'regular', color: '#a855f7', rates: { 3: 0.6, 4: 1.5, 5: 4 } },
  doshik:   { id: 'doshik',   name: 'Дошик',         icon: '🥣', type: 'regular', color: '#ff204e', rates: { 3: 0.4, 4: 1,   5: 3 } },
  wild:     { id: 'wild',     name: 'WILD',          icon: '🃏', type: 'wild',    color: '#a855f7' },
  scatter:  { id: 'scatter',  name: 'SCATTER',       icon: '⚡', type: 'scatter', color: '#fbbf24' },
  bomb:     { id: 'bomb',     name: 'БОМБА',         icon: '💣', type: 'bomb',    color: '#ef4444' }
};

const BOMB_MULTIPLIERS = [
  { mult: 2,   weight: 32 },
  { mult: 3,   weight: 26 },
  { mult: 5,   weight: 18 },
  { mult: 8,   weight: 10 },
  { mult: 10,  weight: 6 },
  { mult: 15,  weight: 4 },
  { mult: 25,  weight: 2 },
  { mult: 50,  weight: 1.2 },
  { mult: 100, weight: 0.8 }
];

const SLOT_PAYLINES = [
  [1, 1, 1, 1, 1], // 1: центральная линия
  [0, 0, 0, 0, 0], // 2: верхняя линия
  [2, 2, 2, 2, 2], // 3: нижняя линия
  [0, 1, 2, 1, 0], // 4: V-образная
  [2, 1, 0, 1, 2], // 5: перевернутая V
  [0, 0, 1, 2, 2], // 6: ступенька вниз
  [2, 2, 1, 0, 0], // 7: ступенька вверх
  [1, 0, 0, 0, 1], // 8: дуга вверх
  [1, 2, 2, 2, 1], // 9: чаша вниз
  [0, 1, 0, 1, 0], // 10: зигзаг верх-центр
  [2, 1, 2, 1, 2], // 11: зигзаг низ-центр
  [1, 0, 1, 0, 1], // 12: волна центр-верх
  [1, 2, 1, 2, 1], // 13: волна центр-низ
  [0, 1, 1, 1, 0], // 14: мелкая V вверху
  [2, 1, 1, 1, 2], // 15: мелкая перевернутая V
  [0, 0, 1, 0, 0], // 16: гребень верх
  [2, 2, 1, 2, 2], // 17: гребень низ
  [1, 1, 0, 1, 1], // 18: горб в центре
  [1, 1, 2, 1, 1], // 19: ямка в центре
  [0, 2, 0, 2, 0]  // 20: широкий зигзаг
];

function getRandomBombMultiplier() {
  const totalWeight = BOMB_MULTIPLIERS.reduce((sum, b) => sum + b.weight, 0);
  let rand = Math.random() * totalWeight;
  for (const b of BOMB_MULTIPLIERS) {
    if (rand < b.weight) return b.mult;
    rand -= b.weight;
  }
  return 2;
}

function getRandomSlotSymbol(inBonus = false) {
  // В бонуске могут выпадать бомбы с множителями
  if (inBonus && Math.random() < 0.08) {
    return {
      ...SLOT_SYMBOLS.bomb,
      mult: getRandomBombMultiplier()
    };
  }

  // Шанс Scatter: в обычной игре около 4%, в бонуске для ретриггера около 3.5%
  const scatterChance = inBonus ? 0.035 : 0.045;
  if (Math.random() < scatterChance) {
    return { ...SLOT_SYMBOLS.scatter };
  }

  // Шанс Wild: 5.5%
  if (Math.random() < 0.055) {
    return { ...SLOT_SYMBOLS.wild };
  }

  // Обычные символы с весами
  const REGULAR_WEIGHTS = [
    { id: 'doshik',   weight: 22 },
    { id: 'crib',     weight: 18 },
    { id: 'studak',   weight: 16 },
    { id: 'shawarma', weight: 14 },
    { id: 'cat',      weight: 11 },
    { id: 'pickle',   weight: 9 },
    { id: 'car',      weight: 6 },
    { id: 'crown',    weight: 4 }
  ];

  const total = REGULAR_WEIGHTS.reduce((s, w) => s + w.weight, 0);
  let r = Math.random() * total;
  for (const w of REGULAR_WEIGHTS) {
    if (r < w.weight) return { ...SLOT_SYMBOLS[w.id] };
    r -= w.weight;
  }
  return { ...SLOT_SYMBOLS.doshik };
}

function createSlotCellElement(sym) {
  const cell = document.createElement('div');
  cell.className = `slot-cell cell-${sym.type}`;
  let subText = sym.name;
  if (sym.type === 'bomb') {
    subText = `x${sym.mult}`;
  } else if (sym.type === 'wild') {
    subText = 'WILD';
  } else if (sym.type === 'scatter') {
    subText = 'SCATTER';
  }

  cell.innerHTML = `
    <div class="sym-icon">${sym.icon}</div>
    <div class="sym-sub">${subText}</div>
  `;
  return cell;
}

function renderSlotInitialReels() {
  STATE.slot.grid = [];
  for (let col = 0; col < 5; col++) {
    const strip = document.getElementById(`reelStrip${col}`);
    if (!strip) continue;
    strip.innerHTML = '';
    const colSymbols = [];
    for (let row = 0; row < 3; row++) {
      const sym = getRandomSlotSymbol(false);
      colSymbols.push(sym);
      strip.appendChild(createSlotCellElement(sym));
    }
    STATE.slot.grid.push(colSymbols);
  }
}

function updateSlotBuyBonusPrice() {
  const priceEl = document.getElementById('buyBonusPrice');
  if (!priceEl) return;
  const cost = STATE.slot.bet * 100;
  priceEl.textContent = `${cost.toLocaleString('ru-RU')} MD`;
}

function resizeSlotCanvas() {
  const canvas = document.getElementById('slotLinesCanvas');
  const windowEl = document.getElementById('slotReelsWindow');
  if (!canvas || !windowEl) return;
  canvas.width = windowEl.clientWidth;
  canvas.height = windowEl.clientHeight;
}

function clearSlotLines() {
  const canvas = document.getElementById('slotLinesCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Убираем подсветку выигрышных ячеек
  document.querySelectorAll('.slot-cell.cell-win').forEach(c => c.classList.remove('cell-win'));

  // Прячем оверлей выигрыша
  const overlay = document.getElementById('slotWinOverlay');
  if (overlay) overlay.classList.remove('show');
}

function drawSlotWinningLines(winningLines) {
  const canvas = document.getElementById('slotLinesCanvas');
  const windowEl = document.getElementById('slotReelsWindow');
  if (!canvas || !windowEl || !winningLines || winningLines.length === 0) return;

  resizeSlotCanvas();
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const colWidth = canvas.width / 5;
  const rowHeight = canvas.height / 3;

  winningLines.forEach(line => {
    // Подсвечиваем ячейки линии
    line.cells.forEach(([c, r]) => {
      const strip = document.getElementById(`reelStrip${c}`);
      if (strip && strip.children[r]) {
        strip.children[r].classList.add('cell-win');
      }
    });

    // Рисуем неоновую траекторию
    ctx.beginPath();
    line.cells.forEach(([c, r], idx) => {
      const x = c * colWidth + colWidth / 2;
      const y = r * rowHeight + rowHeight / 2;
      if (idx === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    const lineColor = line.leadSym.color || '#ff204e';
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = lineColor;
    ctx.globalAlpha = 0.28;
    ctx.lineWidth = 10;
    ctx.stroke();

    ctx.globalAlpha = 1;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();
  });
}

function buySlotBonus() {
  if (STATE.slot.isSpinning) return;
  if (STATE.slot.inFreeSpins) {
    showToast('⚠️ Бонусный раунд уже активен!', 'normal');
    return;
  }

  const cost = STATE.slot.bet * 100;
  if (STATE.balance < cost) {
    sounds.playExplosion();
    showToast(`❌ Недостаточно средств для покупки бонуски! Нужно <b>${cost.toLocaleString('ru-RU')} MD</b>.`, 'normal');
    return;
  }

  STATE.balance -= cost;
  STATE.slot.forceBonus = true;
  saveState();
  updateUI();

  sounds.playCoin();
  confetti.burst(50);
  showToast(`🎰 <b>Бонуска куплена за ${cost.toLocaleString('ru-RU')} MD!</b> Гарантировано 3+ Scatter!`, 'gold');

  spinSlot();
}

function spinSlot() {
  if (STATE.slot.isSpinning) return;

  const inBonus = STATE.slot.inFreeSpins;

  // Если обычный спин (не в бонуске), проверяем и списываем ставку
  if (!inBonus && !STATE.slot.forceBonus) {
    const betInput = document.getElementById('slotBetInput');
    const betVal = Math.max(10, parseInt(betInput?.value, 10) || 10);
    STATE.slot.bet = betVal;

    if (STATE.balance < STATE.slot.bet) {
      STATE.slot.auto = false;
      updateSlotAutoUI();
      sounds.playExplosion();
      showToast('❌ Недостаточно MD на балансе для спина!', 'normal');
      return;
    }

    STATE.balance -= STATE.slot.bet;
    addXP(10);
    saveState();
    updateUI();
  }

  STATE.slot.isSpinning = true;
  clearSlotLines();

  // Обновляем состояние кнопки спина
  const spinBtn = document.getElementById('btnSlotSpin');
  if (spinBtn) {
    spinBtn.disabled = true;
    spinBtn.classList.add('spinning');
    const lbl = spinBtn.querySelector('.spin-lbl');
    if (lbl) lbl.textContent = inBonus ? 'БОНУСКА...' : 'КРУТИТСЯ...';
  }

  // Блокируем покупку бонуски и ставку во время спина
  const buyBtn = document.getElementById('btnBuyBonus');
  if (buyBtn) buyBtn.disabled = true;
  const betInput = document.getElementById('slotBetInput');
  if (betInput) betInput.disabled = true;

  // Прячем старый бейдж множителя
  const multBadge = document.getElementById('slotSpinMultBadge');
  if (multBadge) multBadge.style.display = 'none';

  // Генерируем целевую сетку 5 колонок x 3 строки
  const targetGrid = [];
  for (let c = 0; c < 5; c++) {
    const colSyms = [];
    for (let r = 0; r < 3; r++) {
      colSyms.push(getRandomSlotSymbol(inBonus));
    }
    targetGrid.push(colSyms);
  }

  // Если была куплена бонуска, гарантируем 3+ Scatter на барабанах 0, 1, 2
  if (STATE.slot.forceBonus) {
    const r0 = Math.floor(Math.random() * 3);
    const r1 = Math.floor(Math.random() * 3);
    const r2 = Math.floor(Math.random() * 3);
    targetGrid[0][r0] = { ...SLOT_SYMBOLS.scatter };
    targetGrid[1][r1] = { ...SLOT_SYMBOLS.scatter };
    targetGrid[2][r2] = { ...SLOT_SYMBOLS.scatter };

    // 35% шанс на 4-й скаттер, 15% шанс на 5-й
    if (Math.random() < 0.35) {
      targetGrid[3][Math.floor(Math.random() * 3)] = { ...SLOT_SYMBOLS.scatter };
      if (Math.random() < 0.45) {
        targetGrid[4][Math.floor(Math.random() * 3)] = { ...SLOT_SYMBOLS.scatter };
      }
    }
    STATE.slot.forceBonus = false;
  }

  // Подсчитываем скаттеры на каждом барабане для эффекта Anticipation
  const scatterCountsPerCol = targetGrid.map(col => col.filter(s => s.type === 'scatter').length);

  // Параметры скорости
  const isTurbo = STATE.slot.turbo;
  const baseReelDuration = isTurbo ? 320 : 600;
  const reelGap = isTurbo ? 140 : 250;
  const anticipationExtra = isTurbo ? 500 : 1100;

  let cumulativeScatters = 0;
  let currentDelay = 0;
  const reelStopTimes = [];

  for (let col = 0; col < 5; col++) {
    let reelDuration = baseReelDuration;
    const isAnticipation = (cumulativeScatters >= 2 && col >= 2);
    if (isAnticipation) {
      reelDuration += anticipationExtra;
    }
    currentDelay += (col === 0 ? 0 : reelGap);
    const stopTime = currentDelay + reelDuration;
    reelStopTimes.push({ col, stopTime, isAnticipation, duration: reelDuration });
    cumulativeScatters += scatterCountsPerCol[col];
  }

  // Запуск анимации для каждого из 5 барабанов
  for (let col = 0; col < 5; col++) {
    const strip = document.getElementById(`reelStrip${col}`);
    const reelColEl = document.getElementById(`slotReel${col}`);
    if (!strip || !reelColEl) continue;

    // Предыдущие 3 символа
    const oldSymbols = STATE.slot.grid[col] || [
      getRandomSlotSymbol(inBonus),
      getRandomSlotSymbol(inBonus),
      getRandomSlotSymbol(inBonus)
    ];

    // Генерируем 18 промежуточных символов для эффекта полета
    const fillerCount = isTurbo ? 10 : 18;
    const fillerSymbols = [];
    for (let f = 0; f < fillerCount; f++) {
      fillerSymbols.push(getRandomSlotSymbol(inBonus));
    }

    // Собираем ленту: [Target (3)] + [Fillers] + [Old (3)]
    strip.innerHTML = '';
    const finalSyms = targetGrid[col];

    finalSyms.forEach(s => strip.appendChild(createSlotCellElement(s)));
    fillerSymbols.forEach(s => strip.appendChild(createSlotCellElement(s)));
    oldSymbols.forEach(s => strip.appendChild(createSlotCellElement(s)));

    const totalCells = strip.children.length;
    const cellHeight = strip.children[0]?.offsetHeight || 94;
    const slideDistance = (totalCells - 3) * cellHeight;

    // Начальная позиция ленты: показываем старые символы внизу
    strip.style.transition = 'none';
    strip.style.transform = `translateY(-${slideDistance}px)`;
    strip.classList.add('spinning-blur');

    // Проверяем, нужно ли включить anticipation на этом барабане
    const config = reelStopTimes[col];
    if (config.isAnticipation) {
      setTimeout(() => {
        reelColEl.classList.add('anticipation');
        sounds.playScatterDing(2);
      }, currentDelay - 200);
    }

    // Принудительный reflow
    void strip.offsetHeight;

    // Запускаем скролл ленты к финальным символам
    strip.style.transition = `transform ${config.duration}ms cubic-bezier(0.12, 0.8, 0.2, 1.05)`;
    strip.style.transform = 'translateY(0px)';

    // Остановка барабана
    setTimeout(() => {
      strip.classList.remove('spinning-blur');
      reelColEl.classList.remove('anticipation');

      // Оставляем в ленте только 3 финальных символа
      strip.style.transition = 'none';
      strip.innerHTML = '';
      finalSyms.forEach(s => strip.appendChild(createSlotCellElement(s)));

      // Звуки остановки
      const hasScatter = scatterCountsPerCol[col] > 0;
      if (hasScatter) {
        let landedSoFar = 0;
        for (let k = 0; k <= col; k++) landedSoFar += scatterCountsPerCol[k];
        sounds.playScatterDing(landedSoFar);
      } else {
        sounds.playSlotReelStop(false);
      }

      // Если это последний барабан — оцениваем результат всего спина
      if (col === 4) {
        evaluateSlotSpin(targetGrid);
      }
    }, config.stopTime);
  }
}

function evaluateSlotSpin(grid) {
  STATE.slot.grid = grid;
  const inBonus = STATE.slot.inFreeSpins;

  // 1. Проверяем 20 линий выплат слева направо
  const winningLines = [];
  let totalLinePayout = 0;

  SLOT_PAYLINES.forEach((lineCoords, lineIdx) => {
    const lineSymbols = [
      grid[0][lineCoords[0]],
      grid[1][lineCoords[1]],
      grid[2][lineCoords[2]],
      grid[3][lineCoords[3]],
      grid[4][lineCoords[4]]
    ];

    // Ищем первый регулярный символ в линии (дикие символы подстраиваются)
    let leadSym = null;
    for (const sym of lineSymbols) {
      if (sym.type === 'regular') {
        leadSym = sym;
        break;
      }
    }
    // Если вся линия состоит из Wild, берем наивысший символ (Золотой Дошик)
    if (!leadSym) leadSym = SLOT_SYMBOLS.crown;

    // Считаем количество совпадений подряд слева направо
    let matchCount = 0;
    const matchingCells = [];

    for (let c = 0; c < 5; c++) {
      const current = lineSymbols[c];
      if (current.id === leadSym.id || current.type === 'wild') {
        matchCount++;
        matchingCells.push([c, lineCoords[c]]);
      } else {
        break;
      }
    }

    if (matchCount >= 3 && leadSym.rates && leadSym.rates[matchCount]) {
      const rate = leadSym.rates[matchCount];
      // Выплата по линии пропорциональна ставке на спин
      const linePayout = Math.round((STATE.slot.bet / 20) * rate * 4);
      totalLinePayout += linePayout;
      winningLines.push({
        lineIndex: lineIdx + 1,
        leadSym,
        matchCount,
        linePayout,
        cells: matchingCells
      });
    }
  });

  // 2. Проверяем наличие Бомб-Множителей (в бонуске)
  let totalBombMultiplier = 1;
  const bombCells = [];
  if (inBonus) {
    for (let c = 0; c < 5; c++) {
      for (let r = 0; r < 3; r++) {
        if (grid[c][r].type === 'bomb') {
          bombCells.push(grid[c][r]);
        }
      }
    }
    if (bombCells.length > 0) {
      const sumMult = bombCells.reduce((sum, b) => sum + (b.mult || 1), 0);
      totalBombMultiplier = sumMult;

      // Отображаем бейдж бомбы
      const badge = document.getElementById('slotSpinMultBadge');
      const badgeVal = document.getElementById('slotSpinMultVal');
      if (badge && badgeVal) {
        badge.style.display = 'inline-flex';
        badgeVal.textContent = `x${totalBombMultiplier}`;
      }
      sounds.playExplosion();
    }
  }

  // Итоговый выигрыш спина с учетом бомб
  let spinFinalWin = totalLinePayout;
  if (bombCells.length > 0 && totalLinePayout > 0) {
    spinFinalWin = totalLinePayout * totalBombMultiplier;
  }

  // 3. Подсчет Scatter (молний)
  let totalScatters = 0;
  for (let c = 0; c < 5; c++) {
    for (let r = 0; r < 3; r++) {
      if (grid[c][r].type === 'scatter') totalScatters++;
    }
  }

  // 4. Отрисовка линий и отображение выигрыша
  const winDisplay = document.getElementById('slotLastWinDisplay');
  if (winDisplay) winDisplay.textContent = `${spinFinalWin.toLocaleString('ru-RU')} MD`;
  STATE.slot.lastWin = spinFinalWin;

  if (winningLines.length > 0) {
    drawSlotWinningLines(winningLines);

    // Всплывающий баннер по центру
    const overlay = document.getElementById('slotWinOverlay');
    const overlayVal = document.getElementById('slotWinOverlayVal');
    const overlayLabel = document.getElementById('slotWinOverlayLabel');
    if (overlay && overlayVal && overlayLabel) {
      overlayLabel.textContent = totalBombMultiplier > 1 ? `ВЫИГРЫШ x${totalBombMultiplier}!` : 'ВЫИГРЫШ!';
      overlayVal.textContent = `+${spinFinalWin.toLocaleString('ru-RU')} MD`;
      overlay.classList.add('show');
    }
  }

  // 5. Начисление баланса и проверка на джекпот/бигвин
  if (inBonus) {
    STATE.slot.freeSpinsTotalWin += spinFinalWin;
    const fsWinEl = document.getElementById('slotFsTotalWin');
    if (fsWinEl) fsWinEl.textContent = `${STATE.slot.freeSpinsTotalWin.toLocaleString('ru-RU')} MD`;
  } else if (spinFinalWin > 0) {
    STATE.balance += spinFinalWin;
    saveState();
    updateUI();
  }

  // Звук выигрыша
  if (spinFinalWin >= STATE.slot.bet * 25) {
    unlockAchievement('mega_win');
    sounds.playWin('exotic');
    confetti.burst(80);
    triggerBigWinModal('BIG WIN!', 'НЕВЕРОЯТНЫЙ ЗАНОС В СЛОТЕ', spinFinalWin);
  } else if (spinFinalWin > 0) {
    sounds.playWin('rare');
  }

  // 6. Обработка Scatter: запуск бонуски или ретриггер
  if (totalScatters >= 3) {
    if (inBonus) {
      // Ретриггер во время фриспинов: +5 спинов
      STATE.slot.freeSpinsLeft += 5;
      STATE.slot.freeSpinsTotal += 5;
      const fsTotalEl = document.getElementById('slotFsTotal');
      if (fsTotalEl) fsTotalEl.textContent = STATE.slot.freeSpinsTotal;
      sounds.playBonusChime();
      confetti.burst(60);
      showToast('🔥 <b>РЕТРИГГЕР В БОНУСКЕ!</b> Начислено +5 бесплатных спинов!', 'gold');
    } else {
      // Запуск нового бонусного раунда из обычной игры
      let awardedSpins = 10;
      if (totalScatters === 4) awardedSpins = 12;
      if (totalScatters >= 5) awardedSpins = 15;
      unlockAchievement('bonus_master');
      sounds.playBonusChime();
      confetti.burst(100);
      showToast(`⚡ <b>${totalScatters} SCATTER!</b> Активирована бонуска: <b>${awardedSpins} ФРИСПИНОВ</b>!`, 'gold');

      setTimeout(() => {
        startFreeSpinsBonus(awardedSpins);
      }, 1500);
      return; // управление переходит в startFreeSpinsBonus
    }
  }

  // 7. Завершение спина и планирование следующего (для бонуски или авто)
  setTimeout(() => {
    STATE.slot.isSpinning = false;

    // Разблокируем контролы, если спины завершены
    const spinBtn = document.getElementById('btnSlotSpin');
    if (spinBtn) {
      spinBtn.disabled = false;
      spinBtn.classList.remove('spinning');
      const lbl = spinBtn.querySelector('.spin-lbl');
      if (lbl) lbl.textContent = inBonus ? 'БОНУСКА...' : 'КРУТИТЬ';
    }
    const buyBtn = document.getElementById('btnBuyBonus');
    if (buyBtn && !inBonus) buyBtn.disabled = false;
    const betInput = document.getElementById('slotBetInput');
    if (betInput && !inBonus) betInput.disabled = false;

    // Если сейчас идет бонуска
    if (inBonus) {
      if (STATE.slot.freeSpinsLeft > 0) {
        // Запускаем следующий бесплатный спин
        const currentSpinNum = STATE.slot.freeSpinsTotal - STATE.slot.freeSpinsLeft + 1;
        const curEl = document.getElementById('slotFsCurrent');
        if (curEl) curEl.textContent = currentSpinNum;
        STATE.slot.freeSpinsLeft--;

        const nextDelay = STATE.slot.turbo ? 600 : 1300;
        setTimeout(spinSlot, nextDelay);
      } else {
        // Бонуска завершена!
        finishFreeSpinsBonus();
      }
    } else if (STATE.slot.auto) {
      // Автоспины в обычном режиме
      if (STATE.balance >= STATE.slot.bet) {
        const nextDelay = STATE.slot.turbo ? 450 : 1100;
        setTimeout(spinSlot, nextDelay);
      } else {
        STATE.slot.auto = false;
        updateSlotAutoUI();
        showToast('⚠️ Авто-спины остановлены: недостаточно MD!', 'normal');
      }
    }
  }, STATE.slot.turbo ? 600 : 1200);
}

function startFreeSpinsBonus(count) {
  STATE.slot.inFreeSpins = true;
  STATE.slot.freeSpinsTotal = count;
  STATE.slot.freeSpinsLeft = count - 1; // Первый спин сейчас спишется
  STATE.slot.freeSpinsTotalWin = 0;

  const container = document.getElementById('slotContainer');
  if (container) container.classList.add('bonus-mode');

  const fsBanner = document.getElementById('slotFsBanner');
  if (fsBanner) fsBanner.style.display = 'flex';

  const curEl = document.getElementById('slotFsCurrent');
  if (curEl) curEl.textContent = '1';

  const totalEl = document.getElementById('slotFsTotal');
  if (totalEl) totalEl.textContent = count;

  const winEl = document.getElementById('slotFsTotalWin');
  if (winEl) winEl.textContent = '0 MD';

  const buyBtn = document.getElementById('btnBuyBonus');
  if (buyBtn) buyBtn.disabled = true;

  const betInput = document.getElementById('slotBetInput');
  if (betInput) betInput.disabled = true;

  // Запуск первого фриспина
  STATE.slot.isSpinning = false;
  spinSlot();
}

function finishFreeSpinsBonus() {
  const totalWon = STATE.slot.freeSpinsTotalWin;
  STATE.balance += totalWon;
  saveState();
  updateUI();

  // Отключаем режим бонуски
  const container = document.getElementById('slotContainer');
  if (container) container.classList.remove('bonus-mode');

  const fsBanner = document.getElementById('slotFsBanner');
  if (fsBanner) fsBanner.style.display = 'none';

  const multBadge = document.getElementById('slotSpinMultBadge');
  if (multBadge) multBadge.style.display = 'none';

  const buyBtn = document.getElementById('btnBuyBonus');
  if (buyBtn) buyBtn.disabled = false;

  const betInput = document.getElementById('slotBetInput');
  if (betInput) betInput.disabled = false;

  STATE.slot.inFreeSpins = false;
  STATE.slot.freeSpinsLeft = 0;

  // Открываем победное окно бонуски
  sounds.playWin('exotic');
  confetti.burst(120);
  triggerBigWinModal('БОНУСКА ЗАВЕРШЕНА!', 'ОБЩИЙ ВЫИГРЫШ ЗА ФРИСПИНЫ', totalWon);
}

function triggerBigWinModal(title, sub, amount) {
  const modal = document.getElementById('slotBigWinModal');
  const titleEl = document.getElementById('slotBigWinTitle');
  const subEl = document.getElementById('slotBigWinSub');
  const amountEl = document.getElementById('slotBigWinAmount');

  if (!modal) return;
  if (titleEl) titleEl.textContent = title;
  if (subEl) subEl.textContent = sub;
  if (amountEl) amountEl.textContent = `${amount.toLocaleString('ru-RU')} MD`;

  modal.classList.add('open');
}

function updateSlotAutoUI() {
  const btn = document.getElementById('btnSlotAuto');
  const status = document.getElementById('autoStatus');
  if (!btn || !status) return;
  btn.classList.toggle('active', STATE.slot.auto);
  btn.classList.toggle('btn-active', STATE.slot.auto);
  status.textContent = STATE.slot.auto ? 'ВКЛ' : 'ВЫКЛ';
}

function updateSlotTurboUI() {
  const btn = document.getElementById('btnSlotTurbo');
  const status = document.getElementById('turboStatus');
  if (!btn || !status) return;
  btn.classList.toggle('active', STATE.slot.turbo);
  btn.classList.toggle('btn-active', STATE.slot.turbo);
  status.textContent = STATE.slot.turbo ? 'ВКЛ' : 'ВЫКЛ';
}

function initSlotGame() {
  renderSlotInitialReels();
  updateSlotBuyBonusPrice();
  resizeSlotCanvas();

  window.addEventListener('resize', resizeSlotCanvas);

  // Кнопка спина
  const spinBtn = document.getElementById('btnSlotSpin');
  if (spinBtn) {
    spinBtn.addEventListener('click', () => {
      sounds.playClick();
      spinSlot();
    });
  }

  // Покупка бонуски
  const buyBtn = document.getElementById('btnBuyBonus');
  if (buyBtn) {
    buyBtn.addEventListener('click', () => {
      sounds.playClick();
      buySlotBonus();
    });
  }

  // Турбо-режим
  const turboBtn = document.getElementById('btnSlotTurbo');
  if (turboBtn) {
    turboBtn.addEventListener('click', () => {
      sounds.playClick();
      STATE.slot.turbo = !STATE.slot.turbo;
      updateSlotTurboUI();
    });
  }

  // Авто-спины
  const autoBtn = document.getElementById('btnSlotAuto');
  if (autoBtn) {
    autoBtn.addEventListener('click', () => {
      sounds.playClick();
      STATE.slot.auto = !STATE.slot.auto;
      updateSlotAutoUI();
      if (STATE.slot.auto && !STATE.slot.isSpinning) {
        spinSlot();
      }
    });
  }

  // Управление ставкой
  const betInput = document.getElementById('slotBetInput');
  if (betInput) {
    betInput.addEventListener('input', () => {
      let val = parseInt(betInput.value, 10);
      if (isNaN(val) || val < 10) val = 10;
      STATE.slot.bet = val;
      updateSlotBuyBonusPrice();
    });
  }

  document.querySelectorAll('.btn-preset.slot-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      sounds.playClick();
      let current = STATE.slot.bet || 100;
      if (btn.dataset.mult === '0.5') current = Math.max(10, Math.floor(current / 2));
      if (btn.dataset.mult === '2') current = Math.floor(current * 2);
      if (btn.dataset.val) current += parseInt(btn.dataset.val, 10);
      if (btn.dataset.mult === 'max') current = Math.max(10, STATE.balance);

      STATE.slot.bet = current;
      if (betInput) betInput.value = current;
      updateSlotBuyBonusPrice();
    });
  });

  // Таблица выплат
  const paytableBtn = document.getElementById('btnOpenPaytable');
  const paytableModal = document.getElementById('paytableModal');
  const closePaytableBtn = document.getElementById('closePaytableModal');

  if (paytableBtn && paytableModal) {
    paytableBtn.addEventListener('click', () => {
      sounds.playClick();
      paytableModal.classList.add('open');
    });
  }
  if (closePaytableBtn && paytableModal) {
    closePaytableBtn.addEventListener('click', () => {
      sounds.playClick();
      paytableModal.classList.remove('open');
    });
  }
  if (paytableModal) {
    paytableModal.addEventListener('click', (e) => {
      if (e.target === paytableModal) paytableModal.classList.remove('open');
    });
  }

  // Кнопка сбора выигрыша в Big Win модалке
  const bigWinModal = document.getElementById('slotBigWinModal');
  const collectBigWinBtn = document.getElementById('btnCollectBigWin');
  if (collectBigWinBtn && bigWinModal) {
    collectBigWinBtn.addEventListener('click', () => {
      sounds.playCoin();
      confetti.burst(70);
      bigWinModal.classList.remove('open');
    });
  }
  if (bigWinModal) {
    bigWinModal.addEventListener('click', (e) => {
      if (e.target === bigWinModal) {
        sounds.playCoin();
        confetti.burst(70);
        bigWinModal.classList.remove('open');
      }
    });
  }

  // Пробел для спина
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      const isSlotActive = (document.getElementById('subgame-slot')?.classList.contains('active') &&
                            document.getElementById('tab-games')?.classList.contains('active')) ||
                           document.querySelector('.nav-tab.active')?.dataset.tab === 'slot';
      if (!isSlotActive) return;
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (document.querySelector('.modal-overlay.open')) return;
      e.preventDefault();
      spinSlot();
    }
  });
}

// ============================================================================
// 19. СТАРТ ВСЕГО ПРИЛОЖЕНИЯ
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Разблокировка Web Audio API по первому касанию (для iOS/Android Telegram WebView)
  const unlockAudioOnce = () => {
    sounds.init();
    document.removeEventListener('touchstart', unlockAudioOnce);
    document.removeEventListener('pointerdown', unlockAudioOnce);
  };
  document.addEventListener('touchstart', unlockAudioOnce, { passive: true });
  document.addEventListener('pointerdown', unlockAudioOnce, { passive: true });

  initNavigation();
  renderCases();
  initBattleSystem();
  initPlinko();
  initRoulette();
  initCrash();
  initMines();
  initThimbles();
  initUpgraderAction();
  initContracts();
  initBusinessTicker();
  initLiveChat();
  initPromoSystem();
  initWheel();
  initLiveTicker();
  renderAchievements();
  initCaseModalControls();
  initSlotGame();
  TMA.init();
  updateUI();

  // Модалка открытия кейса
  const closeBtn = document.getElementById('modalClose');
  if (closeBtn) closeBtn.addEventListener('click', closeCaseModal);

  const modalOverlay = document.getElementById('caseModal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeCaseModal();
    });
  }

  const btnStartOpen = document.getElementById('btnStartOpen');
  if (btnStartOpen) btnStartOpen.addEventListener('click', startCaseOpen);

  const btnSellAll = document.getElementById('btnSellAll');
  if (btnSellAll) btnSellAll.addEventListener('click', sellAllInventory);

  // Стартовая история рулетки и краша
  for (let i = 0; i < 7; i++) {
    const rand = ROULETTE_NUMBERS[Math.floor(Math.random() * ROULETTE_NUMBERS.length)];
    addRouletteHistory(rand);
  }
  [1.45, 2.12, 1.05, 5.80, 1.88, 3.40].forEach(m => addCrashHistory(m));
});
