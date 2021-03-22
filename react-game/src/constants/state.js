// опции с которыми начинается игра: сложность и тема, они устаавлиаются в DifficultSettings(когда нажимаем
// на ту или иную кнопку) и в ThemeSettings
const [options, setOptions] = useState({
  difficult: savedDifficult || null,
  theme: savedTheme || 'stars',
});

// текущая тема (dark/light)
// const [currentMode, setCurrentMode] = useState('dark');

// включен ли переключатель тем(т.е. включена ли светла тема)
const [isChecked, setIsChecked] = useState(false);

// та опция => та кнопка, которая подсвечивается как выбраная
const [currentOptions, setCurrentOptions] = useState({
  currentDifficult: savedDifficult || null,
  currentTheme: savedTheme || null,
});

// игра началась, или нет, от этого зависит будет отображаться меню и все его компоненты, 
// либо будет отображаться поле для игры
const [isGameStarted, setIsGameStarted] = useState(savedStartGame || false);

// идет ли таймер
const [isRunningStopwatch, setIsRunningStopwatch] = useState(false);

// кол-во прошедших секунд 
const [stopwatchSeconds, setStopwatchSeconds] = useState(savedSeconds || 0);

// кол-во ходов (кликов на карточку)
const [movesCount, setMovesCount] = useState(savedMoves || 0);

// наилучший результат по ходам
const [highScore, setHighScore] = useState(0);

// размер поля, потом додбавляет нужный мне класс полю, чтобы карточки на разных сложностях
// были разного размера и влазили красиво в контейнер
const [field, setField] = useState('');

// массив с нужными путями картинок, которые мы используем, выбрав ту, или иную тему
const [currentImages, setCurrentImages] = useState(null);

// для отображения окна завершения игры
const [isGameFinished, setIsGameFinished] = useState(false);

// включен ли звук
const [isSoundOn, setIsSoundOn] = useState(savedIsSoundOn);

// громкость звука
const [soundValue, setSoundValue] = useState(savedSoundVolume || 0.5);

// так как в игре несколько видов звука (правильно, неправильно, конец игры), тут хранится
// путь на текущий звук, который передается в src audio
const [currentTrack, setCurrentTrack] = useState(null);

// включена ли музыка
const [isMusicOn, setIsMusicOn] = useState(savedIsMusicOn);

// громкость музыки
const [musicValue, setMusicValue] = useState(savedMusicVolume || 0.5);

// для каждой карточки - перевернута ли она
const [flipped, setFlipped] = useState(false);

// объект карточки с полями id, image, imageId, isFlipped, его мы обновляем, когда карточки совпали (поле 
// isFlipped у карточки), либо когда начинаем новую игру)
const [game, setGame] = useState([]);

// кол-во кликов на карточку, по нему добавляет в массив flippedIndexes инидексы карточек
const [flippedCount, setFlippedCount] = useState(0);

// индексы перевернутых карточек и значек true - если карточки не совпали, и false - если соппали
const [flippedIndexes, setFlippedIndexes] = useState([]);


const state = {
  //global

  //TODO refactor to
  // selectedCards: ['abstract_1', 'abstract_2'], // Array<string>

  // theme: 'light', // string one of ['light', 'dark']
  currentImages: ['abstract_1', 'abstract_2'],
  // cardTheme: 'abstract', // string one of ['abstract', 'animal'...]
  fieldCssClass: 'field__normal', // string one of ['field__easy', 'field__normal', field__hard]

  // difficulty: '18', // number one of ['12', '18, '24']
  isGameStarted: false, //boolean
  isGameFinished: false, //boolean
  isStopwatchRunning: false, //boolean
  elapsedTime: 0, //number in ms
  isSoundOn: true, //boolean
  soundVolume: 0.5, //number from 0 to 1
  currentSound: 'assets/sounds/right_sound.mp3', //string file to source
  isMusicOn: true, //boolean
  musicValue: 0.5, //number from 0 to 1
  movesCoun: 0, //number int
  highScore: 0, // number TODO: refactor to Array<{score: number, name: string, moves: number, difficulty: string}>
  gameCardsSet: [], // array<{id: number, imgId: number, isFlipped: boolean, image: string}>
  flipsCount: 0, // number
  cardMatchBatch: [], // [number, number, boolean] // 0 and 1 cards indexes 2 comparison result
  
  //local
  isFlipped: false, //boolean
};