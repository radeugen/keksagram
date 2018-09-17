
var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

var picturesBlock = document.querySelector('.pictures');

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var DESCRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var getRandomElement = function (min, max) {
    return Math.floor(Math.random() * ((max + 1) - min)) + min;
};


var generateRandomPicturesNumbers = function () {

    var numbers = [];

    while (numbers.length < 25) {
        var number = getRandomElement(1,25);
        if (numbers.indexOf(number) !== -1) {
            continue;
        } else {
            numbers.push(number);
        }
    }

    return numbers;
};

var generateRandomComments = function (commentsSource) {

    var comments = [];

    for (var i = 0; i < getRandomElement(1,2); i++) {
        comments.push(commentsSource[getRandomElement(0,(commentsSource.length - 1))]);
    }

    return comments;
};

var generatePictures = function (comments, descriptions) {
    var pictures = [];
    var pictureNumbers = generateRandomPicturesNumbers();

    for(var i = 0; i < 25; i++) {
        pictures.push({
            url: 'photos/'+ pictureNumbers[i] + '.jpg',
            // url: 'photos/{{'+ pictureNumbers[i] + '}}.jpg',
            likes: getRandomElement(15, 200),
            comments: generateRandomComments(comments),
            description: descriptions[getRandomElement(0,(descriptions.length -1))]
        });
    }

    return pictures;

};

var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('img').src = picture.url;
    pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;
    pictureElement.querySelector('.picture-likes').textContent = picture.likes;

    return pictureElement;
};

var insertPictures = function (pictures) {

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; i++) {
        fragment.appendChild(renderPicture(pictures[i]));
    }

    console.log(pictures);

    picturesBlock.appendChild(fragment);

};

var pictures = generatePictures(COMMENTS, DESCRIPTIONS);

insertPictures(pictures);

var bigPicture = document.querySelector('.gallery-overlay');
bigPicture.classList.remove('hidden');

bigPicture.querySelector('.gallery-overlay-image').src = pictures[0].url;
bigPicture.querySelector('.likes-count').textContent = pictures[0].likes;
bigPicture.querySelector('.comments-count').textContent = pictures[0].comments.length;




// console.log(generatePictures(COMMENTS, DESCRIPTIONS));