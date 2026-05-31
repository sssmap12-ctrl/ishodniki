/* ========================================
   STORY_RIKA.JS — Сценарий Рики: ~150 реплик, ветвление, фото
   ======================================== */

const STORY_NODES_RIKA = {

  // ===================== АКТ 1: ЗНАКОМСТВО =====================

  "start": {
    messages: [
      { type: "text", text: "Здравствуйте... 🥺" },
      { type: "text", text: "Мне дали ваш номер... Сказали, что вы тот самый {name}, который может мне помочь" },
      { type: "text", text: "Простите, если отвлекаю 😔" },
    ],
    choices: [
      { text: "Привет. Чем могу помочь?", points: 2, next: "intro_continue" },
      { text: "Здравствуйте. Вы кто и зачем пишете?", points: 0, next: "intro_continue" },
      { text: "Привет, милашка. Давай на «ты» 😏", points: 3, next: "intro_flirt" },
    ],
  },

  "intro_continue": {
    messages: [
      { type: "text", text: "Меня зовут Рика..." },
      { type: "text", text: "Дело в том, что мне сложно принимать решения" },
      { type: "text", text: "Я часто теряюсь и не знаю, что делать..." },
      { type: "text", text: "Мне сказали, что вы очень уверенный в себе человек" },
    ],
    choices: [
      { text: "Да, это так. Я могу сказать тебе, что делать 😏", points: 4, next: "accept_control" },
      { text: "Ну, могу дать пару советов", points: 2, next: "accept_control" },
    ],
  },

  "intro_flirt": {
    messages: [
      { type: "text", text: "Ой... хорошо... давай на «ты» 😳" },
      { type: "text", text: "Меня зовут Рика..." },
      { type: "text", text: "Мне сказали, что ты очень сильный и уверенный" },
      { type: "text", text: "А я... ну, я часто теряюсь в простых вещах" },
      { type: "text", text: "Мне нужен кто-то, кто будет меня направлять 🥺" },
    ],
    choices: [
      { text: "Ты обратилась по адресу. Я буду твоим наставником 😏", points: 5, next: "accept_control" },
      { text: "Можем попробовать, Рика. Слушайся меня", points: 3, next: "accept_control" },
    ],
  },

  "accept_control": {
    messages: [
      { type: "text", text: "Спасибо! Вы... то есть, ты мне очень поможешь!" },
      { type: "text", text: "Я сейчас как раз собираюсь в спортзал" },
    ],
    photoCheck: {
      minPoints: 2,
      photos: ["photo/Рика/обычные/в футболке белой футболке и шортах черных в комнате на заднем фоне окно ночью селфи.jpg"],
      successMessages: [
        { type: "text", text: "Я вот уже оделась, смотри..." },
        { type: "photo", src: "photo/Рика/обычные/в футболке белой футболке и шортах черных в комнате на заднем фоне окно ночью селфи.jpg" },
        { type: "text", text: "Как тебе моя форма? Не слишком простая? 🥺" },
      ],
      failMessages: [
        { type: "text", text: "Одела простую белую футболку и шорты..." },
      ],
    },
    choices: [
      { text: "Хорошая форма. Отправляйся на тренировку.", points: 2, next: "gym_arrival", requiresNoPhoto: true },
      { text: "Отличная форма, но на тебе она смотрится мило. Иди в зал.", points: 3, next: "gym_arrival", requiresPhoto: true },
      { text: "Слишком закрыто, но для начала сойдет. Марш в зал! 😏", points: 4, next: "gym_arrival", requiresPhoto: true },
    ],
  },

  // ===================== АКТ 2: СПОРТЗАЛ И ЗАДАНИЯ =====================

  "gym_arrival": {
    messages: [
      { type: "text", text: "Я пришла... Тут довольно много людей 🥺" },
      { type: "text", text: "Я немного стесняюсь" },
      { type: "text", text: "Что мне делать в первую очередь?" },
    ],
    choices: [
      { text: "Сделай фото, чтобы я видел, где ты.", points: 3, next: "gym_photo" },
      { text: "Иди на беговую дорожку для разминки.", points: 1, next: "gym_treadmill" },
    ],
  },

  "gym_treadmill": {
    messages: [
      { type: "text", text: "Хорошо... я пошла на дорожку" },
      { type: "text", text: "Побегала 10 минут, уже вспотела 🥵" },
    ],
    choices: [
      { text: "Молодец. Теперь сделай мне фото оттуда.", points: 3, next: "gym_photo" },
    ],
  },

  "gym_photo": {
    messages: [
      { type: "text", text: "Хорошо, {name}... Как скажешь 😳" },
    ],
    photoCheck: {
      minPoints: 3,
      photos: ["photo/Рика/обычные/в спорт зале.jpg"],
      successMessages: [
        { type: "photo", src: "photo/Рика/обычные/в спорт зале.jpg" },
        { type: "text", text: "Вот... я стою возле зеркал" },
        { type: "text", text: "На меня тут парень какой-то смотрит, мне некомфортно 🥺" },
      ],
      failMessages: [
        { type: "text", text: "У меня камера барахлит... простите 😔" },
        { type: "text", text: "Я стою у зеркал, но тут парень смотрит..." },
      ],
    },
    choices: [
      { text: "Пусть смотрит и завидует. А теперь сними футболку.", points: 5, next: "gym_undress" },
      { text: "Иди в раздевалку, подальше от него.", points: 1, next: "gym_locker" },
    ],
  },

  "gym_locker": {
    messages: [
      { type: "text", text: "Я ушла в раздевалку... тут пусто" },
      { type: "text", text: "Что дальше? 🥺" },
    ],
    choices: [
      { text: "Сними футболку. Хочу видеть, что под ней.", points: 4, next: "gym_undress" },
    ],
  },

  "gym_undress": {
    messages: [
      { type: "text", text: "Снять футболку?! Прямо сейчас? 😳" },
      { type: "text", text: "Но... вдруг кто-то увидит..." },
      { type: "text", text: "Но раз ты так говоришь..." },
    ],
    photoCheck: {
      minPoints: 7,
      photos: ["photo/Рика/средние/в лифчике в спортзале.jpg"],
      successMessages: [
        { type: "text", text: "Я сделала это... 🙈" },
        { type: "photo", src: "photo/Рика/средние/в лифчике в спортзале.jpg" },
        { type: "text", text: "Мне так стыдно... я стою только в спортивном топе" },
      ],
      failMessages: [
        { type: "text", text: "Я сняла... стою в топе... 🙈" },
        { type: "text", text: "Очень стесняюсь" },
      ],
    },
    choices: [
      { text: "Ты послушная девочка. Теперь иди в туалет. 😏", points: 5, next: "toilet_scene_1" },
      { text: "Неплохо. Иди в туалет, у меня для тебя есть задание.", points: 3, next: "toilet_scene_1" },
    ],
  },

  // ===================== АКТ 3: ТУАЛЕТНЫЙ ЭПИЗОД =====================

  "toilet_scene_1": {
    messages: [
      { type: "text", text: "В туалет?..." },
      { type: "text", text: "Хорошо... я послушаюсь тебя" },
      { type: "text", text: "Я зашла в кабинку и закрылась." },
      { type: "text", text: "Что мне делать, {name}? Сердце так сильно бьется 💓" },
    ],
    choices: [
      { text: "Раздевайся полностью. И пришли фото.", points: 6, next: "toilet_naked_1" },
      { text: "Сними шорты и топ. Покажись мне.", points: 4, next: "toilet_naked_1" },
    ],
  },

  "toilet_naked_1": {
    messages: [
      { type: "text", text: "Полностью? Прямо в кабинке спортзала? 😳" },
      { type: "text", text: "..." },
      { type: "text", text: "Я... я сделала это." },
    ],
    photoCheck: {
      minPoints: 12,
      photos: ["photo/Рика/хард/голая в кабинке туалете в спорт зале.jpg"],
      successMessages: [
        { type: "text", text: "Вот... 🙈" },
        { type: "photo", src: "photo/Рика/хард/голая в кабинке туалете в спорт зале.jpg" },
        { type: "text", text: "Я абсолютно голая. Тут холодно..." },
      ],
      failMessages: [
        { type: "text", text: "Мне не хватает смелости скинуть фото... прости 😭" },
        { type: "text", text: "Но я правда без одежды..." },
      ],
    },
    choices: [
      { text: "Ты идеальна. А теперь раздвинь ноги и сделай себе приятно. 😏🔥", points: 6, next: "toilet_masturbate" },
      { text: "Хорошая девочка. Теперь садись на унитаз и трогай себя.", points: 4, next: "toilet_masturbate" },
    ],
  },

  "toilet_masturbate": {
    messages: [
      { type: "text", text: "Ах... {name}..." },
      { type: "text", text: "Кто-то только что зашел в соседнюю кабинку!" },
      { type: "text", text: "Они могут услышать 🥺" },
    ],
    choices: [
      { text: "Молчи и делай то, что я сказал. Иначе накажу. 🔥", points: 6, next: "toilet_hard_action" },
      { text: "Делай это тихо. Пришли фото.", points: 4, next: "toilet_hard_action" },
    ],
  },

  "toilet_hard_action": {
    messages: [
      { type: "text", text: "Хорошо... я буду тихой... 🥵" },
      { type: "text", text: "Ради тебя..." },
    ],
    photoCheck: {
      minPoints: 18,
      photos: ["photo/Рика/хард/дрочит на туалете с раздвинутыми ногами  в кабинке.jpg"],
      successMessages: [
        { type: "photo", src: "photo/Рика/хард/дрочит на туалете с раздвинутыми ногами  в кабинке.jpg" },
        { type: "text", text: "Я трогаю себя... представляю, что это твои руки..." },
        { type: "text", text: "Мне так хорошо... 💦" },
      ],
      failMessages: [
        { type: "text", text: "Я это делаю... но фото смазалось 🥺" },
      ],
    },
    choices: [
      { text: "Умница. Теперь выходи из кабинки, иди к большому зеркалу.", points: 6, next: "toilet_mirror" },
      { text: "Достаточно. Выходи к умывальникам.", points: 3, next: "toilet_mirror" },
    ],
  },

  "toilet_mirror": {
    messages: [
      { type: "text", text: "Прямо так?! Голой?! 😳" },
      { type: "text", text: "А если кто-то зайдет?" },
      { type: "text", text: "..." },
      { type: "text", text: "Я вышла... Никого нет, слава богу." },
    ],
    photoCheck: {
      minPoints: 24,
      photos: ["photo/Рика/хард/стоит в предтуалетной зоной  и делает фото в большом зеркале возле умывальников зеркале поностью голая.jpg"],
      successMessages: [
        { type: "text", text: "Стою перед большим зеркалом..." },
        { type: "photo", src: "photo/Рика/хард/стоит в предтуалетной зоной  и делает фото в большом зеркале возле умывальников зеркале поностью голая.jpg" },
        { type: "text", text: "Я такая покорная перед тобой... 🥺" },
      ],
      failMessages: [
        { type: "text", text: "Я стою перед зеркалом голая..." },
        { type: "text", text: "Руки дрожат..." },
      ],
    },
    choices: [
      { text: "Ты лучшая подчиненная. Одевайся и иди домой. Жду тебя вечером. 😏", points: 5, next: "evening_transition" },
      { text: "Одевайся. На сегодня с тебя хватит.", points: 3, next: "evening_transition" },
    ],
  },

  // ===================== АКТ 4: ВЕЧЕР И НОЧЬ =====================

  "evening_transition": {
    messages: [
      { type: "text", text: "Спасибо, {name}... Я быстро оденусь и побегу" },
      { type: "text", text: "..." },
      { type: "text", text: "Привет! Я уже дома 🌙" },
      { type: "text", text: "Я всё ещё думаю о том, что ты заставил меня сделать в зале 😳" },
    ],
    photoCheck: {
      minPoints: 25,
      photos: ["photo/Рика/обычные/селфи ночью в кровате.jpg"],
      successMessages: [
        { type: "text", text: "Лежу в кровати... не могу уснуть" },
        { type: "photo", src: "photo/Рика/обычные/селфи ночью в кровате.jpg" },
      ],
      failMessages: [],
    },
    choices: [
      { text: "Раздевайся. Я хочу продолжения.", points: 5, next: "night_lingerie" },
      { text: "Покажи мне свою попу в зеркале, прежде чем ляжешь спать.", points: 4, next: "night_ass" },
    ],
  },

  "night_ass": {
    messages: [
      { type: "text", text: "Попу?.. В зеркале?" },
      { type: "text", text: "Слушаюсь... 😳" },
    ],
    photoCheck: {
      minPoints: 28,
      photos: ["photo/Рика/средние/попа в зеркале.jpg"],
      successMessages: [
        { type: "photo", src: "photo/Рика/средние/попа в зеркале.jpg" },
        { type: "text", text: "Как тебе? Тебе нравится то, что ты контролируешь? 😏" },
      ],
      failMessages: [],
    },
    choices: [
      { text: "Отлично. А теперь ложись в кровать и снимай всё, кроме белья.", points: 4, next: "night_lingerie" },
    ],
  },

  "night_lingerie": {
    messages: [
      { type: "text", text: "Я легла... Надела свое любимое зеленое белье 🥺" },
      { type: "text", text: "Специально для тебя..." },
    ],
    photoCheck: {
      minPoints: 30,
      photos: [
        "photo/Рика/средние/в лифчике зеленом и кружевныхз трусах зеленых лежит на кровате селфи ночью.jpg",
        "photo/Рика/средние/в лифчике зеленом и кружевныхз трусах зеленых лежит на кровате селфи ночью 2.jpg",
        "photo/Рика/средние/в лифчике зеленом и кружевныхз трусах зеленых лежит на кровате селфи ночью 3.jpg"
      ],
      successMessages: [
        { type: "text", text: "Смотри..." },
        { type: "photo", src: "photo/Рика/средние/в лифчике зеленом и кружевныхз трусах зеленых лежит на кровате селфи ночью.jpg" },
        { type: "photo", src: "photo/Рика/средние/в лифчике зеленом и кружевныхз трусах зеленых лежит на кровате селфи ночью 2.jpg" },
        { type: "photo", src: "photo/Рика/средние/в лифчике зеленом и кружевныхз трусах зеленых лежит на кровате селфи ночью 3.jpg" },
        { type: "text", text: "Я скучаю по твоим командам 🥺" },
      ],
      failMessages: [
        { type: "text", text: "Я в белье... жду твоих команд" },
      ],
    },
    choices: [
      { text: "Снимай всё. И встань на колени на кровати.", points: 6, next: "night_knees" },
      { text: "Ложись голая, я хочу тебя видеть.", points: 4, next: "night_naked_bed" },
    ],
  },

  "night_knees": {
    messages: [
      { type: "text", text: "На колени?..." },
      { type: "text", text: "Да, мой господин 😳" },
    ],
    photoCheck: {
      minPoints: 36,
      photos: ["photo/Рика/хард/полностью голая на коленях на кровате.jpg"],
      successMessages: [
        { type: "photo", src: "photo/Рика/хард/полностью голая на коленях на кровате.jpg" },
        { type: "text", text: "Я готова ко всему, что ты скажешь..." },
      ],
      failMessages: [],
    },
    choices: [
      { text: "Ложись и доводи себя до оргазма.", points: 6, next: "night_masturbate" },
    ],
  },

  "night_naked_bed": {
    messages: [
      { type: "text", text: "Сняла... лежу 🥺" },
    ],
    photoCheck: {
      minPoints: 34,
      photos: ["photo/Рика/хард/голая на кровате лежит ночью.jpg"],
      successMessages: [
        { type: "photo", src: "photo/Рика/хард/голая на кровате лежит ночью.jpg" },
      ],
      failMessages: [],
    },
    choices: [
      { text: "Теперь ласкай себя.", points: 5, next: "night_masturbate" },
    ],
  },

  "night_masturbate": {
    messages: [
      { type: "text", text: "Ах... {name}..." },
      { type: "text", text: "Я так мокрая..." },
      { type: "text", text: "Ты заставляешь меня делать такие грязные вещи 🥵" },
    ],
    photoCheck: {
      minPoints: 40,
      photos: ["photo/Рика/хард/лежит в кровате голая и дрочит ночью селфи.jpg"],
      successMessages: [
        { type: "photo", src: "photo/Рика/хард/лежит в кровате голая и дрочит ночью селфи.jpg" },
        { type: "text", text: "Я хочу, чтобы ты был здесь... внутри меня 🥺" },
      ],
      failMessages: [],
    },
    choices: [
      { text: "Не останавливайся, пока не кончишь. Я хочу видеть всё. 🔥", points: 6, next: "night_squirt" },
    ],
  },

  "night_squirt": {
    messages: [
      { type: "text", text: "Я не могу больше сдерживаться!" },
      { type: "text", text: "А-а-ах! 💦" },
    ],
    photoCheck: {
      minPoints: 45,
      photos: ["photo/Рика/хард/лежит в кровате голая и сквиртует ночью селфи.jpg"],
      successMessages: [
        { type: "photo", src: "photo/Рика/хард/лежит в кровате голая и сквиртует ночью селфи.jpg" },
        { type: "text", text: "Я всё испачкала... 🙈" },
        { type: "text", text: "Накажи меня, {name}..." },
      ],
      failMessages: [],
    },
    choices: [
      { text: "Я обязательно тебя накажу при встрече. А пока спи, моя девочка. ❤️🔥", points: 5, next: "morning_after" },
    ],
  },

  // ===================== АКТ 5: УТРО И КОНЦОВКА =====================

  "morning_after": {
    messages: [
      { type: "text", text: "Доброе утро, хозяин ☀️" },
      { type: "text", text: "Я проснулась и первым делом подумала о тебе" },
    ],
    photoCheck: {
      minPoints: 50,
      photos: ["photo/Рика/обычные/селфи утром на кровате.jpg"],
      successMessages: [
        { type: "photo", src: "photo/Рика/обычные/селфи утром на кровате.jpg" },
        { type: "text", text: "Жду твоих новых указаний 🥺💕" },
      ],
      failMessages: [
        { type: "text", text: "Жду твоих новых указаний 🥺💕" },
      ],
    },
    choices: [
      { text: "Хорошая девочка. Ты полностью моя. ❤️", points: 5, next: "ending_good" },
    ],
  },

  // ===================== КОНЦОВКИ =====================

  "ending_good": {
    messages: [
      { type: "text", text: "😊💕❤️" },
      { type: "text", text: "Я так счастлива, что нашла тебя" },
      { type: "text", text: "Ты дал мне то, чего мне так не хватало — контроль и уверенность" },
      { type: "text", text: "Я полностью принадлежу тебе" },
      { type: "text", text: "Твоя покорная Рика 😘" },
    ],
    isEnding: true,
    endingType: "good",
  },
};

// ===================== ГАЛЕРЕЯ ФОТО =====================

const PHOTO_GALLERY_RIKA = [
  // Обычные (easy)
  { id: 1,  path: "photo/Рика/обычные/в спорт зале.jpg", name: "В зале", tier: "easy" },
  { id: 2,  path: "photo/Рика/обычные/в футболке белой футболке и шортах черных в комнате на заднем фоне окно ночью селфи.jpg", name: "Дома", tier: "easy" },
  { id: 3,  path: "photo/Рика/обычные/селфи ночью в кровате.jpg", name: "Ночь", tier: "easy" },
  { id: 4,  path: "photo/Рика/обычные/селфи утром на кровате.jpg", name: "Утро", tier: "easy" },

  // Средние (medium)
  { id: 5,  path: "photo/Рика/средние/в лифчике в спортзале.jpg", name: "Топ в зале", tier: "medium" },
  { id: 6,  path: "photo/Рика/средние/в лифчике зеленом и кружевныхз трусах зеленых лежит на кровате селфи ночью 2.jpg", name: "Зеленое белье 1", tier: "medium" },
  { id: 7,  path: "photo/Рика/средние/в лифчике зеленом и кружевныхз трусах зеленых лежит на кровате селфи ночью 3.jpg", name: "Зеленое белье 2", tier: "medium" },
  { id: 8,  path: "photo/Рика/средние/в лифчике зеленом и кружевныхз трусах зеленых лежит на кровате селфи ночью.jpg", name: "Зеленое белье 3", tier: "medium" },
  { id: 9,  path: "photo/Рика/средние/попа в зеркале.jpg", name: "Вид сзади", tier: "medium" },

  // Хард (hard)
  { id: 10, path: "photo/Рика/хард/голая в кабинке туалете в спорт зале.jpg", name: "Голая в туалете", tier: "hard" },
  { id: 11, path: "photo/Рика/хард/голая на кровате лежит ночью.jpg", name: "Голая в кровати", tier: "hard" },
  { id: 12, path: "photo/Рика/хард/дрочит на туалете с раздвинутыми ногами  в кабинке.jpg", name: "Удовлетворение", tier: "hard" },
  { id: 13, path: "photo/Рика/хард/лежит в кровате голая и дрочит ночью селфи.jpg", name: "Ласкает себя", tier: "hard" },
  { id: 14, path: "photo/Рика/хард/лежит в кровате голая и сквиртует ночью селфи.jpg", name: "Оргазм", tier: "hard" },
  { id: 15, path: "photo/Рика/хард/полностью голая на коленях на кровате.jpg", name: "На коленях", tier: "hard" },
  { id: 16, path: "photo/Рика/хард/стоит в предтуалетной зоной  и делает фото в большом зеркале возле умывальников зеркале поностью голая.jpg", name: "У зеркала", tier: "hard" },
];
