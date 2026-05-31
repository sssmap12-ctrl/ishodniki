/* ========================================
   APP.JS — Навигация и управление состоянием
   ======================================== */

// Global variables for active character's data
window.CURRENT_STORY_NODES = null;
window.CURRENT_PHOTO_GALLERY = null;

const App = {
  // Global App State (not character specific)
  globalState: {
    installed: false,
    currentCharacter: null,
  },

  // State
  state: {
    playerName: '',
    points: 0,
    currentNode: 'start',
    unlockedPhotos: [],
    chatHistory: [],
    completedNodes: [],
    currentScreen: 'start',
    previousScreen: null,
  },

  // DOM references
  screens: {},
  nameInput: null,
  startBtn: null,
  galleryBtn: null,
  installBtn: null,
  launchBtn: null,
  installStatus: null,
  installPercent: null,
  installProgressFill: null,
  consoleBox: null,

  init() {
    // Cache DOM
    this.screens = {
      install: document.getElementById('install-screen'),
      characterSelect: document.getElementById('character-select-screen'),
      start: document.getElementById('start-screen'),
      chat: document.getElementById('chat-screen'),
      gallery: document.getElementById('gallery-screen'),
    };
    this.nameInput = document.getElementById('name-input');
    this.startBtn = document.getElementById('btn-start-chat');
    this.galleryBtn = document.getElementById('btn-open-gallery');
    this.installBtn = document.getElementById('btn-start-install');
    this.launchBtn = document.getElementById('btn-launch-game');
    this.installStatus = document.getElementById('install-status');
    this.installPercent = document.getElementById('install-percent');
    this.installProgressFill = document.getElementById('install-progress-fill');
    this.consoleBox = document.getElementById('console-box');

    // Load saved state
    this.loadState();

    // Check if assets are already installed
    this.globalState.installed = localStorage.getItem('hamari_assets_installed') === 'true';
    if (this.globalState.installed) {
      this.screens.install.classList.remove('active');
      this.screens.characterSelect.classList.add('active');
      this.state.currentScreen = 'characterSelect';
    } else {
      this.state.currentScreen = 'install';
    }

    // Installer Events
    this.installBtn.addEventListener('click', () => this.startInstallation());
    this.launchBtn.addEventListener('click', () => {
      this.showScreen('characterSelect');
    });

    // Character Selection Events
    document.getElementById('select-hamari').addEventListener('click', () => this.selectCharacter('hamari'));
    document.getElementById('select-rika').addEventListener('click', () => this.selectCharacter('rika'));
    document.getElementById('select-nastya').addEventListener('click', () => this.selectCharacter('nastya'));
    document.getElementById('select-lisa').addEventListener('click', () => this.selectCharacter('lisa'));

    // If we have a saved name, pre-fill it
    if (this.state.playerName) {
      this.nameInput.value = this.state.playerName;
      this.startBtn.disabled = false;
    }

    // Events
    this.nameInput.addEventListener('input', () => {
      const name = this.nameInput.value.trim();
      this.startBtn.disabled = name.length === 0;
    });

    this.nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && this.nameInput.value.trim()) {
        this.startChat();
      }
    });

    this.startBtn.addEventListener('click', () => this.startChat());
    this.galleryBtn.addEventListener('click', () => this.showScreen('gallery'));

    // Chat header buttons
    document.getElementById('chat-back-btn').addEventListener('click', () => {
      this.showScreen('characterSelect');
    });
    document.getElementById('btn-gallery-from-chat').addEventListener('click', () => {
      this.showScreen('gallery');
    });
    document.getElementById('btn-restart').addEventListener('click', () => {
      this.showRestartConfirm();
    });

    // Gallery back button
    document.getElementById('gallery-back-btn').addEventListener('click', () => {
      this.showScreen(this.state.previousScreen || 'characterSelect');
    });

    // Init gallery
    Gallery.init();
  },

  selectCharacter(charId) {
    this.globalState.currentCharacter = charId;
    
    // Set the globals
    if (charId === 'hamari') {
      window.CURRENT_STORY_NODES = STORY_NODES_HAMARI;
      window.CURRENT_PHOTO_GALLERY = PHOTO_GALLERY_HAMARI;
      document.querySelector('.start-title').textContent = 'Хамари';
      document.getElementById('start-avatar').src = 'photo/easy/1.jpg';
      document.querySelector('.chat-user-name').textContent = 'Хамари';
      document.querySelector('.chat-avatar').src = 'photo/easy/1.jpg';
    } else if (charId === 'rika') {
      window.CURRENT_STORY_NODES = STORY_NODES_RIKA;
      window.CURRENT_PHOTO_GALLERY = PHOTO_GALLERY_RIKA;
      document.querySelector('.start-title').textContent = 'Рика';
      document.getElementById('start-avatar').src = 'photo/Рика/обычные/в спорт зале.jpg';
      document.querySelector('.chat-user-name').textContent = 'Рика';
      document.querySelector('.chat-avatar').src = 'photo/Рика/обычные/в спорт зале.jpg';
    } else if (charId === 'nastya') {
      window.CURRENT_STORY_NODES = STORY_NODES_NASTYA;
      window.CURRENT_PHOTO_GALLERY = PHOTO_GALLERY_NASTYA;
      document.querySelector('.start-title').textContent = 'Настя';
      document.getElementById('start-avatar').src = 'photo/Настя/обычные/в школе днем.jpg';
      document.querySelector('.chat-user-name').textContent = 'Настя';
      document.querySelector('.chat-avatar').src = 'photo/Настя/обычные/в школе днем.jpg';
    } else if (charId === 'lisa') {
      window.CURRENT_STORY_NODES = STORY_NODES_LISA;
      window.CURRENT_PHOTO_GALLERY = PHOTO_GALLERY_LISA;
      document.querySelector('.start-title').textContent = 'Лиза';
      document.getElementById('start-avatar').src = 'photo/Лиза/обычные/в школьной светлой форме с красным галстуком  в школе селфи сидит за партой рано утром.jpg';
      document.querySelector('.chat-user-name').textContent = 'Лиза';
      document.querySelector('.chat-avatar').src = 'photo/Лиза/обычные/в школьной светлой форме с красным галстуком  в школе селфи сидит за партой рано утром.jpg';
    }

    // Load state for this character
    this.loadState();

    // Setup gallery counts
    document.getElementById('gallery-total').textContent = window.CURRENT_PHOTO_GALLERY.length;

    // If we have a saved name for this character, pre-fill it
    if (this.state.playerName) {
      this.nameInput.value = this.state.playerName;
      this.startBtn.disabled = false;
    } else {
      this.nameInput.value = '';
      this.startBtn.disabled = true;
    }

    this.showScreen('start');
  },

  startInstallation() {
    this.installBtn.disabled = true;
    this.installBtn.innerHTML = '<span class="btn-icon">⏳</span> Установка...';
    
    this.logConsole('[Сеть] Соединение с Google Drive (https://drive.google.com/drive/folders/1s0o5IGxHSrTW72DP29wxEhbARSJp5Jy-)...');
    
    const steps = [
      { p: 5, t: 'Подключение к Google Drive API...', log: '[Сеть] Успешное подключение к облачному хранилищу.' },
      { p: 10, t: 'Анализ папок в корне Google Drive...', log: '[Система] Обнаружено 3 папки: /обычные, /средние, /хард.' },
      { p: 15, t: 'Создание локальной директории /photo/обычные...', log: '[Локал] Создана папка /photo/обычные в корне Android.' },
      { p: 22, t: 'Скачивание photo/easy/1.jpg...', log: '[Загрузка] Скачано: photo/easy/1.jpg (142 KB)' },
      { p: 28, t: 'Скачивание photo/easy/new_clothes.jpg...', log: '[Загрузка] Скачано: photo/easy/new_clothes.jpg (198 KB)' },
      { p: 35, t: 'Скачивание photo/easy/shower.jpg...', log: '[Загрузка] Скачано: photo/easy/shower.jpg (154 KB)' },
      { p: 42, t: 'Скачивание photo/easy/selfie_bed.jpg...', log: '[Загрузка] Скачано: photo/easy/selfie_bed.jpg (185 KB)' },
      { p: 48, t: 'Создание локальной директории /photo/средние...', log: '[Локал] Создана папка /photo/средние в корне Android.' },
      { p: 55, t: 'Скачивание средних фото (7 файлов)...', log: '[Загрузка] Скачано: photo/medium/intime.jpg (310 KB)' },
      { p: 58, t: 'Установка средних фото...', log: '[Установка] Распаковано 7 файлов средних фото в /photo/средние/' },
      { p: 65, t: 'Создание локальной директории /photo/хард...', log: '[Локал] Создана папка /photo/хард в корне Android.' },
      { p: 75, t: 'Скачивание хард фото (10 файлов)...', log: '[Загрузка] Скачано: photo/hard/intime_spicy.jpg (512 KB)' },
      { p: 85, t: 'Скачивание хард фото (10 файлов)...', log: '[Загрузка] Скачано: photo/hard/intime_hamari_1.jpg (480 KB)' },
      { p: 92, t: 'Извлечение файлов хард галереи...', log: '[Установка] Распаковано 10 файлов хард галереи в /photo/хард/' },
      { p: 97, t: 'Синхронизация локальных индексов...', log: '[Система] Индексация 21 файла успешно завершена.' },
      { p: 100, t: 'Установка успешно завершена! 🎉', log: '[Система] Все ресурсы успешно установлены в корень папки Android!' }
    ];

    let currentStep = 0;
    
    const nextStep = () => {
      if (currentStep >= steps.length) {
        localStorage.setItem('hamari_assets_installed', 'true');
        this.installBtn.classList.add('hidden');
        this.launchBtn.classList.remove('hidden');
        return;
      }
      
      const step = steps[currentStep];
      this.installStatus.textContent = step.t;
      this.installPercent.textContent = `${step.p}%`;
      this.installProgressFill.style.width = `${step.p}%`;
      this.logConsole(step.log);
      
      currentStep++;
      const delay = 350 + Math.random() * 400;
      setTimeout(nextStep, delay);
    };

    setTimeout(nextStep, 500);
  },

  logConsole(text) {
    const line = document.createElement('div');
    line.className = 'console-line';
    line.textContent = text;
    this.consoleBox.appendChild(line);
    this.consoleBox.scrollTop = this.consoleBox.scrollHeight;
  },

  startChat() {
    const name = this.nameInput.value.trim();
    if (!name) return;

    this.state.playerName = name;
    this.saveState();

    this.showScreen('chat');

    // Initialize chat engine if it hasn't started yet or if resuming
    if (this.state.chatHistory.length === 0) {
      Chat.start();
    } else {
      Chat.restore();
    }
  },

  showScreen(screenName) {
    this.state.previousScreen = this.state.currentScreen;

    Object.values(this.screens).forEach(s => s.classList.remove('active'));
    this.screens[screenName].classList.add('active');
    this.state.currentScreen = screenName;

    if (screenName === 'gallery') {
      Gallery.render();
    }
  },

  // Points
  addPoints(amount) {
    this.state.points += amount;
    if (this.state.points < 0) this.state.points = 0;
    this.saveState();
    this.showPointsNotification(amount);
  },

  showPointsNotification(amount) {
    if (amount === 0) return;
    const notif = document.createElement('div');
    notif.className = `points-notification ${amount > 0 ? 'positive' : 'negative'}`;
    notif.textContent = amount > 0 ? `+${amount} 💕` : `${amount} 💔`;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2000);
  },

  // Photo unlock
  unlockPhoto(photoPath) {
    if (this.state.unlockedPhotos.includes(photoPath)) return;
    this.state.unlockedPhotos.push(photoPath);
    this.saveState();
    this.showPhotoUnlockNotification(photoPath);
  },

  showPhotoUnlockNotification(photoPath) {
    // Find photo info from gallery
    const photoInfo = window.CURRENT_PHOTO_GALLERY.find(p => p.path === photoPath);
    const tierNames = { easy: 'Обычное', medium: 'Среднее', hard: 'Хард' };

    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';

    const notif = document.createElement('div');
    notif.className = 'photo-unlock-notification';
    notif.innerHTML = `
      <div class="unlock-icon">🔓</div>
      <div class="unlock-text">Фото разблокировано!</div>
      <div class="unlock-sub">${photoInfo ? photoInfo.name : 'Новое фото'} • ${tierNames[photoInfo?.tier] || ''}</div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(notif);

    const dismiss = () => {
      overlay.remove();
      notif.remove();
    };

    overlay.addEventListener('click', dismiss);
    notif.addEventListener('click', dismiss);
    setTimeout(dismiss, 2500);
  },

  // Ending
  showEnding(type) {
    const totalPhotos = window.CURRENT_PHOTO_GALLERY.length;
    const unlocked = this.state.unlockedPhotos.length;
    const points = this.state.points;

    const endings = {
      good: {
        emoji: '💕',
        title: 'Хорошая концовка!',
        message: 'Ты покорил сердце Хамари! Она доверилась тебе полностью. Это было незабываемое приключение...',
      },
      neutral: {
        emoji: '🤔',
        title: 'Нейтральная концовка',
        message: 'Хамари была не до конца уверена в тебе. Может, если попробуешь снова, результат будет другим?',
      },
      bad: {
        emoji: '💔',
        title: 'Плохая концовка',
        message: 'Увы, Хамари не почувствовала достаточной связи. Попробуй заново и будь более внимательным к её чувствам.',
      },
    };

    const ending = endings[type] || endings.neutral;

    const overlay = document.createElement('div');
    overlay.className = 'ending-overlay';
    overlay.innerHTML = `
      <div class="ending-emoji">${ending.emoji}</div>
      <h2 class="ending-title">${ending.title}</h2>
      <div class="ending-stats">
        <div class="ending-stat">
          <div class="ending-stat-value">${points}</div>
          <div class="ending-stat-label">Очков</div>
        </div>
        <div class="ending-stat">
          <div class="ending-stat-value">${unlocked}/${totalPhotos}</div>
          <div class="ending-stat-label">Фото</div>
        </div>
      </div>
      <p class="ending-message">${ending.message}</p>
      <div class="ending-buttons">
        <button class="btn btn-primary" id="ending-gallery-btn">
          <span class="btn-icon">📸</span> Посмотреть галерею
        </button>
        <button class="btn btn-secondary" id="ending-restart-btn">
          <span class="btn-icon">🔄</span> Начать заново
        </button>
      </div>
    `;

    document.body.appendChild(overlay);

    // Emoji rain for good ending
    if (type === 'good') {
      this.startEmojiRain();
    }

    document.getElementById('ending-gallery-btn').addEventListener('click', () => {
      overlay.remove();
      this.showScreen('gallery');
    });

    document.getElementById('ending-restart-btn').addEventListener('click', () => {
      overlay.remove();
      this.restart();
    });
  },

  startEmojiRain() {
    const container = document.createElement('div');
    container.className = 'emoji-rain';
    document.body.appendChild(container);

    const emojis = ['💕', '💖', '✨', '🌸', '💗', '💫', '❤️', '🦋'];
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const span = document.createElement('span');
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        span.style.left = Math.random() * 100 + '%';
        span.style.animationDuration = (2 + Math.random() * 2) + 's';
        span.style.fontSize = (16 + Math.random() * 20) + 'px';
        container.appendChild(span);
      }, i * 100);
    }

    setTimeout(() => container.remove(), 5000);
  },

  // Restart
  showRestartConfirm() {
    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';

    const dialog = document.createElement('div');
    dialog.className = 'confirm-dialog';
    dialog.innerHTML = `
      <h3>Начать заново? 🔄</h3>
      <p>Прогресс чата будет сброшен, но галерея останется.</p>
      <div class="confirm-buttons">
        <button class="btn btn-secondary" id="confirm-cancel">Отмена</button>
        <button class="btn btn-primary" id="confirm-restart">Да, заново</button>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(dialog);

    document.getElementById('confirm-cancel').addEventListener('click', () => {
      overlay.remove();
      dialog.remove();
    });

    overlay.addEventListener('click', () => {
      overlay.remove();
      dialog.remove();
    });

    document.getElementById('confirm-restart').addEventListener('click', () => {
      overlay.remove();
      dialog.remove();
      this.restart();
    });
  },

  restart() {
    // Keep unlocked photos and player name, reset everything else
    const keepPhotos = [...this.state.unlockedPhotos];
    const keepName = this.state.playerName;

    this.state = {
      playerName: keepName,
      points: 0,
      currentNode: 'start',
      unlockedPhotos: keepPhotos,
      chatHistory: [],
      completedNodes: [],
      currentScreen: 'chat',
      previousScreen: null,
    };
    this.saveState();

    // Clear chat messages
    const messagesContainer = document.getElementById('chat-messages');
    messagesContainer.innerHTML = '<div class="chat-date"><span>Сегодня</span></div>';

    // Hide choices
    const choicesPanel = document.getElementById('choices-panel');
    choicesPanel.innerHTML = '';
    choicesPanel.classList.add('hidden');

    // Reset progress bar
    document.getElementById('progress-fill').style.width = '2%';

    // Start fresh
    this.showScreen('chat');
    Chat.start();
  },

  // Replace {name} placeholder
  formatText(text) {
    return text.replace(/\{name\}/g, this.state.playerName);
  },

  // Persistence
  saveState() {
    if (!this.globalState.currentCharacter) return;
    try {
      const key = `chat_state_${this.globalState.currentCharacter}`;
      localStorage.setItem(key, JSON.stringify(this.state));
    } catch (e) {
      // localStorage might be unavailable
    }
  },

  loadState() {
    if (!this.globalState.currentCharacter) return;
    try {
      const key = `chat_state_${this.globalState.currentCharacter}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state = { ...this.state, ...parsed };
      } else {
        // Reset to default state if no save exists for this char
        this.state = {
          playerName: '',
          points: 0,
          currentNode: 'start',
          unlockedPhotos: [],
          chatHistory: [],
          completedNodes: [],
          currentScreen: 'start',
          previousScreen: null,
        };
      }
    } catch (e) {
      // Use default state
    }
  },

  // Get total node count for progress
  getTotalNodes() {
    if (!window.CURRENT_STORY_NODES) return 1;
    return Object.keys(window.CURRENT_STORY_NODES).length;
  },

  updateProgress() {
    const total = this.getTotalNodes();
    const completed = this.state.completedNodes.length;
    const pct = Math.max(2, Math.round((completed / total) * 100));
    document.getElementById('progress-fill').style.width = pct + '%';
  },
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
