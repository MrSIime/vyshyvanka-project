// frontend/src/features/infopanel/mockData.js

export const styles = [
  {
    id: 1,
    name: 'Борщівська вишивка',
    description: "Унікальний стиль вишитої сорочки з Тернопільського Поділля (Борщівський район), що вирізняється домінуючим чорним кольором (\"шиття чорним\"), який, за легендою, символізує траур жінок за загиблими чоловіками. Орнаменти переважно геометричні, виконані густими вовняними нитками.",
    key_elements: [
      { name: "Ромб з крапками", description: "Символ родючості та засіяного поля." },
      { name: "S-подібні мотиви (\"вужі\")", description: "Символи води та зв'язку з землею." },
      { name: "Ламані лінії", description: "Часто символізують нескінченність або воду." },
      { name: "Трикутники", description: "Оберіг, символ гір або Божественного начала." }
    ],
    technique: "занизування (верхоплут), пряма гладь, кручений шов",
    key_colors: [
      { name: "Чорний", hex: "#000000" },
      { name: "Вишневий", hex: "#8B0000" },
      { name: "Фіолетовий", hex: "#551A8B" },
      { name: "Зелений", hex: "#006400" }
    ]
  },
  {
    id: 9,
    name: 'Поліська вишивка',
    description: "Архаїчна та монументальна вишивка з лісистого Полісся, що зберегла одні з найдавніших орнаментів. Характеризується лаконічними геометричними мотивами, виконаними майже виключно червоною ниткою на білому або сірому домотканому полотні.",
    key_elements: [
        { name: "Ромб", description: "Символ землі та родючості." },
        { name: "Розетка", description: "Солярний символ, знак сонця." },
        { name: "Восьмикутна зірка", description: "Символ гармонії, зірка-алатир." },
        { name: "Квітка-зоря", description: "Поєднання рослинного та солярного символів." }
    ],
    technique: "занизування, заволікання, вирізування, мережка, хрестик",
    key_colors: [
        { name: "Червоний", hex: "#FF0000" },
        { name: "Білий", hex: "#FFFFFF" }
    ]
  },
   {
    id: 2,
    name: "Гуцульська вишивка",
    description: "Яскрава та багатобарвна вишивка з карпатського високогір'я (Гуцульщина), що вирізняється багатством колориту та динамічними геометричними композиціями.",
    key_elements: [
      { name: "Ромб", description: "Символ землі." },
      { name: "Хрест", description: "Оберіг." },
      { name: "Розета", description: "Зірка, сонце." }
    ],
    technique: "низинка, хрестик, кручений шов, заволікання, гладь",
    key_colors: [
      { name: "Помаранчевий", hex: "#FFA500" },
      { name: "Зелений", hex: "#008000" },
      { name: "Жовтий", hex: "#FFFF00" },
      { name: "Червоний", hex: "#FF0000" },
      { name: "Чорний", hex: "#000000" }
    ]
  }
];

export const artifacts = [
  {
    id: 1,
    title: 'Сорочка жіноча, поч. XX ст',
    location: 'Київська область, Полісся',
    location_x: 30.52, // Довгота
    location_y: 50.45, // Широта
    coordinates: [50.45, 30.52], // [широта, довгота]
    style_id: 9, // Поліська вишивка
    description: 'В цій сорочці ходила навіть стародавня версія Комарова. Виконана червоними нитками технікою занизування.',
    source_url: 'https://honchar.org.ua/collection/kn-3151/', // Приклад URL
    photo_url: 'https://placehold.co/200x200/E8DED2/333333?text=Сорочка+1', // URL головного фото
    ornament_photo_url: 'https://placehold.co/400x100/C73F3F/FFFFFF?text=Орнамент+1' // URL чистого орнаменту
  },
  {
    id: 2,
    title: 'Інша сорочка',
    location: 'Львівська область, Бойківщина',
    location_x: 23.50,
    location_y: 49.30,
    coordinates: [49.30, 23.50],
    style_id: 5, // Бойківська вишивка
    description: 'Опис для іншої сорочки. Характерне брижування на рукавах.',
    source_url: 'https://honchar.org.ua/collection/kn-xxxx/',
    photo_url: 'https://placehold.co/200x200/D1C4E9/333333?text=Сорочка+2',
    ornament_photo_url: 'https://placehold.co/400x100/5E35B1/FFFFFF?text=Орнамент+2'
  },
  {
    id: 3,
    title: 'Рушник весільний',
    location: 'Полтавська область',
    location_x: 34.55,
    location_y: 49.58,
    coordinates: [49.58, 34.55],
    style_id: 11, // Полтавська вишивка (білим по білому)
    description: 'Виконаний складними техніками білим по білому. Дерево Життя.',
    source_url: 'https://honchar.org.ua/collection/kn-yyyy/',
    photo_url: 'https://placehold.co/200x200/FFFFFF/CCCCCC?text=Рушник',
    ornament_photo_url: 'https://placehold.co/400x100/FAFAFA/999999?text=Орнамент+3'
  },
  {
    id: 4,
    title: 'Гуцульський кептар',
    location: 'Івано-Франківська область, Гуцульщина',
    location_x: 24.71,
    location_y: 48.92,
    coordinates: [48.92, 24.71],
    style_id: 2, // Гуцульська вишивка
    description: 'Багато оздоблений кептар з характерними геометричними візерунками.',
    source_url: 'https://honchar.org.ua/collection/kn-zzzz/',
    photo_url: 'https://placehold.co/200x200/FFEB3B/333333?text=Кептар',
    ornament_photo_url: 'https://placehold.co/400x100/FFA000/FFFFFF?text=Орнамент+4'
  }
];

export const analysisMockData = styles.map(style => ({
    ...style,
    techniques: style.technique ? style.technique.split(', ') : [],
    // Якщо AnalysisModal очікує масив рядків для key_elements
    // key_elements: style.key_elements.map(el => el.name) 
}));