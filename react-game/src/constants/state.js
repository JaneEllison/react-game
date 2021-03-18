// опции с которыми начинается игра: сложность и тема, они устаавлиаются в DifficultSettings(когда нажимаем
// на ту или иную кнопку) и в ThemeSettings
const [options, setOptions] = useState({
  difficult: savedDifficult || null,
  theme: savedTheme || 'stars',
});

// текущая тема (dark/light)
const [currentMode, setCurrentMode] = useState('dark');

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


