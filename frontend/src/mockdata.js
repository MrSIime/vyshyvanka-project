// Це об'єкт-довідник, щоб перетворювати ID стилю на зрозумілу назву.
// В майбутньому це може приходити з бази даних окремим запитом.
export const styles = {
  2: 'Гуцульщина',
  4: 'Покуття',
  8: 'Волинь',
};

export const artifacts = [
  {
    id: 2,
    title: 'Сорочка жіноча, поч. XX ст.',
    location: 'Івано-Франківська область, Косівський район, с. Космач, Гуцульщина',
    // Карта Leaflet очікує координати у форматі [широта, довгота]
    coordinates: [48.3308, 24.825], 
    style_id: 2,
    // Додаємо назву стилю з нашого довідника
    styleName: styles[2], 
    description: 'Жіноча сорочка з домотканого конопляного полотна. Вишивка виконана вовняними нитками (гранатовими, помаранчевими, зеленими) у гуцульському стилі. Техніки: низинка, хрестик, кучерявий шов.',
    source_url: 'https://honchar.org.ua/collections/detail/1471',
    photo_url: 'https://baza.honchar.org.ua/upload/_thumbs/_site/2a64b85610409ab542d81012db58159e.jpg',
    // У базі даних NULL, тут представляємо як null
    ornament_photo_url: null, 
    // Додаємо назву музею, оскільки вона однакова для всіх
    museumName: 'Музей Івана Гончара',
  },
  {
    id: 3,
    title: 'Безрукавка вишита дитяча, І пол. XX ст.',
    location: 'Івано-Франківська область, Коломийський район, с. Підвисоке, Покуття',
    coordinates: [48.5572, 25.5214],
    style_id: 4,
    styleName: styles[4],
    description: 'Дитяча безрукавка з плису, оздоблена ручною вишивкою вовняними нитками, муліне, бісером та лелітками. Орнамент рослинний. Техніки: гладь, стебловий шов. Характерна для покутської вишивки.',
    source_url: 'https://honchar.org.ua/collections/detail/2786',
    photo_url: 'https://baza.honchar.org.ua/upload/_thumbs/eface117eab3b0b2ae499e69ebeb1098.jpg',
    ornament_photo_url: null,
    museumName: 'Музей Івана Гончара',
  },
  {
    id: 4,
    title: 'Рушник вишитий, кін. XIX ст.',
    location: 'Рівненська область, Рівненський район, с. Розваж, Волинь',
    coordinates: [50.3663, 26.5146],
    style_id: 8,
    styleName: styles[8],
    description: 'Рушник з лляної тканини, вишитий заполоччю. Орнамент геометричний, рослинний та зооморфний. Техніки: хрестик косий, мережка одинарний прутик, мережка латана. Зразок волинської вишивки.',
    source_url: 'https://honchar.org.ua/collections/detail/1657',
    photo_url: 'https://baza.honchar.org.ua/upload/_thumbs/228ee40ca7a94eb639f2c22c27d37ccc.jpg',
    ornament_photo_url: null,
    museumName: 'Музей Івана Гончара',
  },
];