// function getChamps(data) {
//     console.log(data);
// }

var THUMBNAIL_CONTAINER_SEL = '[data-thumbnail-container]'
var thumbnailContainer = document.querySelector(THUMBNAIL_CONTAINER_SEL);
var LS_KEY = 'champ-fighter-data';

function getChamps(fighters) {
    // assigns weight property to fighters to prep for sorting
    function assignWeights(fighter) {
        if (fighter.weight_class !== null) {
            if (fighter.weight_class.includes('Straw')) {
                fighter.weight = 115;
            }
            else if (fighter.weight_class.includes('Fly')) {
                fighter.weight = 125;
            }
            else if (fighter.weight_class.includes('Bantam')) {
                fighter.weight = 135;
            }
            else if (fighter.weight_class.includes('Feather')) {
                fighter.weight = 145;
            }
            else if (fighter.weight_class.includes('Lightw')) {
                fighter.weight = 155;
            }
            else if (fighter.weight_class.includes('Welter')) {
                fighter.weight = 170;
            }
            else if (fighter.weight_class.includes('Middle')) {
                fighter.weight = 185;
            }
            else if (fighter.weight_class.includes('Light_H')) {
                fighter.weight = 205;
            }
            else {
                fighter.weight = 275;
            }
        }    
    }

    fighters.forEach(assignWeights);

    function isMenChamp (fighter) {
        // return fighter.title_holder === true && fighter.weight_class.slice(0,5) !== 'Women';
        return fighter.title_holder === true;
        }
    var menChamps = fighters.filter(isMenChamp);
    
    console.log(menChamps); 
    // drawThumbnails(menChamps);
    return menChamps;   
}

function appendFrameToContainer(fighterFrame) {
    thumbnailContainer.appendChild(fighterFrame);
}

function createThumbnail(champData) {
    var imgEl = document.createElement('img');
    imgEl.setAttribute('src', champData.thumbnail);

    var anchorEl = document.createElement('a');
    anchorEl.setAttribute('href', champData.thumbnail);
    anchorEl.setAttribute('data-trigger', '');
    anchorEl.appendChild(imgEl);

    var weightClassEl = document.createElement('h2');
    weightClassEl.textContent = champData.weight_class;
    var nameEl = document.createElement('h2');
    nameEl.textContent = champData.first_name + ' ' + champData.last_name;

    var fighterFrame = document.createElement('div');
    fighterFrame.classList.add('thumbnail-item');
    fighterFrame.appendChild(anchorEl);
    fighterFrame.appendChild(nameEl);
    fighterFrame.appendChild(weightClassEl);
    

    return fighterFrame
} 

function drawThumbnails(champArray) {
    champArray.map(createThumbnail).forEach(appendFrameToContainer);
}

function getFighterData() {
    // retrieves fighter info from the UFC
    var URL = 'http://localhost:3000/http://ufc-data-api.ufc.com/api/v1/us/fighters';
    return $.get(URL);
}

function storeData(data) {
    localStorage.setItem(LS_KEY, JSON.stringify(data));
    return data;
  }

function loadData() {
    return JSON.parse(localStorage.getItem(LS_KEY));
}

function main() {
    getFighterData()
    .then(getChamps)
    .then(storeData)
    .catch(loadData)
    .then(drawThumbnails)
}

main();



