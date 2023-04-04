const PHOTOS_COUNT = 25;
const NAMES = ['Катя', 'Алина', 'Карина', 'Настя'];
const DESCRIPTIONS = Array.from({length: PHOTOS_COUNT}, (_, i) => `Описание ${i}`);
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
 
];
const COMMENT_IDS = [];


const isCorrectLength = (str, maxLength) => str.length <= maxLength;

const getRandomLikes = () => getRandomInt(15, 200);

const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

function getRandomInt(from, to) {
  if (from < 0 || to < 0) {
    throw new RangeError('Числа в диапазоне должны быть положительными');
  }

  if (from === to) {
    return from;
  }
  if (from > to){
  if (from > to) {
    [from, to] = [to, from];
  }

  return Math.round(Math.random() * (to - from) + from);
}

const isCorrectLength = (str, maxLength) => str.length <= maxLength;
const getId = (() => {
  let id = 1;
  return () => id++;
})();

function getCommentId() {
  let id = getRandomInt(1, 1000);
  while (COMMENT_IDS.includes(id)) {
    id = getRandomInt(1, 1000);
  }
  return id;
}

function generateComment() {
  const messageTexts = [];
  for (let i = 0; i < getRandomInt(1, 2); i++) {
    messageTexts.push(getRandomElement(MESSAGES));
  }
  return {
    id: getCommentId(),
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: messageTexts.join(' '),
    name: getRandomElement(NAMES)
  };
}

function generateDescription() {
  const comments = Array.from({length: getRandomInt(0, 3)}, generateComment);
  const id = getId();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: DESCRIPTIONS[id - 1],
    likes: getRandomLikes(),
    comments: comments
  };
}

const descriptions = Array.from({length: PHOTOS_COUNT}, generateDescription);

isCorrectLength(descriptions, PHOTOS_COUNT); // Чтобы eslint не ругался

