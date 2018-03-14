'use strict';

var nouns = [
    'chicken',
    'walrus',
    'horse',
    'cat',
    'dog',
    'mouse',
    'hippo',
    'elephant',
    'potato',
    'giraffe',
    'cow',
    'pig',
    'deer',
    'rabbit',
    'dolphin',
    'hamster',
    'bear',
    'antelope',
    'squirrel',
    'frog',
];

var adjectives = [
    'adventurous',
    'quarrelsome',
    'exhausted',
    'excited',
    'fabulous',
    'nimble',
    'jazzy',
    'incredible',
    'heroic',
    'grateful',
    'hungry',
    'handsome',
    'exotic',
    'dramatic',
    'cute',
    'cosmic',
    'astonishing',
    'peaceful',
    'pretty',
    'royal',
    'unusual',
    'thankful',
];

var adverbs = [
    'unbearably',
    'amazingly',
    'elegantly',
    'tremendously',
    'really',
    'occasionally',
    'joyfully',
    'generally',
    'annually',
    'curiously',
    'somewhat',
    'perfectly',
    'wonderfully',
    'consistently',
    'faithfully',
    'very',
    'rarely',
    'mostly',
    'recently',
    'surprisingly',
    'ferociously',
    'optimistically',
];

function randomArray (array) {
    return array[Math.floor(Math.random() * array.length)];
}

function projectName () {
    return `${randomArray(adverbs)}-${randomArray(adjectives)}-${randomArray(nouns)}`;
}

window.addEventListener('load', function () {
    var name = projectName();
    Array.prototype.slice.call(document.querySelectorAll('.project-name')).forEach(el => {
        el.textContent = name;
    });
});
