const canvasSize = 95 / 100 * window.innerHeight;

const canvasContainer = document.getElementById('canvasContainer');

function setup() {
  let canvas = createCanvas(canvasSize, canvasSize);

  canvas.parent('canvasContainer');
  console.log("ca c'est le canvas" + canvas);

}


// fullscreen
var fullscreenAvailable = true;

// ———— DÉFINITION VARIABLES À PERSONNALISER ————

var setIndications = false; // indications sur les boutons

var shapesCount = 3; // forme des motifs [carré, triangle, cercle]

var numberOfShapes = 1; // nombre de motifs
var moduleSize; // taille des motifs -> dépend de numberOfShapes

var backShapes = 3; // formes des aplats arrière-plan

var outlineWeight = 3; // épaisseur contours motifs

const RVB = [
  [
    255, 0, 0
  ],
  [
    0, 255, 0
  ],
  [
    0, 0, 255
  ],
  [
    0, 255, 255
  ],
  [
    255, 255, 0
  ],
  [
    255, 0, 255
  ]
] // couleur du fond

let randomizeIsActive = false; // trigger pour pas trop de crise d'épilepsie

var colorIndex = 0; // compte pour parcourir le tableau de couleurs RVB

var backgroundColor = RVB[colorIndex];

// ———— DÉFINITION BOUTONS ET ADEVENTLISTENERS

// on choppe les containers
const leftContainer = document.getElementById('left-container');
const rightContainer = document.getElementById('right-container');

// changement de couleur
const changeColor = () => {
  colorIndex++;

  if (colorIndex >= RVB.length) {
    colorIndex = 0;
  }

  backgroundColor = RVB[colorIndex];
  console.log(backgroundColor);
  draw();
}

// augmenter le nombre de motifs
const increaseShapesNumber = () => {
  if (numberOfShapes < 10) {
    numberOfShapes += 1;
  } else if (numberOfShapes >= 10 && numberOfShapes < 70) {
    numberOfShapes += 10;
  }
  console.log(numberOfShapes);
  draw();
}

// diminuer le nombre de motifs
const decreaseShapesNumber = () => {
  if (numberOfShapes <= 10 && numberOfShapes > 1) {
    numberOfShapes -= 1;

  } else if (numberOfShapes >= 20) {
    numberOfShapes -= 10;

  }
  // console.log(numberOfShapes);
  draw();
}

// forme des motifs
const frontShapesForm = () => {

  if (shapesCount == 3) {
    shapesCount = 1;
  } else {
    shapesCount += 1;
  }
  console.log(shapesCount);
  draw();
}

// augmenter épaisseur du contour
const increaseOutlineWeight = () => {
  outlineWeight = Math.round(outlineWeight += 1 * (70 - numberOfShapes) / 5);
  console.log(outlineWeight);
  draw();
}

// diminuer épaisseur du contour
const decreaseOutlineWeight = () => {
  if (outlineWeight > 3) {
    outlineWeight = Math.round(outlineWeight -= 1 * (70 - numberOfShapes) / 5);
  }
  console.log(outlineWeight);
  draw();
}

// changement de formes arrière plan
const changeBackShapes = () => {

  if (backShapes == 3) {
    backShapes = 1;
  } else {
    backShapes += 1;
  }
  console.log(backShapes);
  draw();

}

// return une integer
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// map les valeurs pour s'adapter au comptes des formes
// - return un de ces chiffres [1,2,3,4,5,6,7,8,9,10,20,30,40,50,60]
function getRandomForNumberOfShapes(min, max) {
  var goCheckThis = getRandomIntInclusive(min, max);
  if (goCheckThis <= 1) {
    return getRandomIntInclusive(1, 10);
  } else {

    return 10 * Math.floor(getRandomIntInclusive(10, 60) / 10);
  }
}

// effet de vibration sur le bouton random - le shake est sur le canvas
const addShake = () => {
  canvas.classList.add('shake');
}

const removeShake = () => {
  canvas.classList.remove('shake');
}

// randomize all parameters
var drawRandom = () => {

  backgroundColor = RVB[getRandomIntInclusive(0, RVB.length - 1)];

  shapesCount = getRandomIntInclusive(1, 3);

  numberOfShapes = getRandomForNumberOfShapes(0, 2);
  moduleSize = getRandomIntInclusive(1, 155);
  //
  backShapes = getRandomIntInclusive(1, 3);

  //
  outlineWeight = getRandomIntInclusive(1, 7);

  if (randomizeIsActive) {
    draw();
  }

}

// randomize en boucle pour 1 seconde
const randomize = () => {

  if (!randomizeIsActive) {

    randomizeIsActive = true;

    console.log('ça va randomizer très fort ')
    var randomLoop = setInterval(drawRandom, 200);
    addShake();

    console.log(numberOfShapes);

    setTimeout(function() {
      removeShake();
      clearInterval(randomLoop);
      console.log("backgroundColor" + backgroundColor + " || " + "shapesCount" + shapesCount + " || " + "numberOfShapes" + numberOfShapes + " || " + "moduleSize" + moduleSize + " || " + "backShapes" + backShapes + " || " + "outlineWeight" + outlineWeight + " || ")
      // setTimeout( function(){
      randomizeIsActive = false;
      // }, 2000);
    }, 1000);;

  }

}

// compilation de toutes les fonctions dans tableau pour attribution
const functionsArray = [
  [
    changeColor, "changeColor"
  ],
  [
    increaseShapesNumber, "increaseShapesNumber"
  ],
  [
    decreaseShapesNumber, "decreaseShapesNumber"
  ],
  [
    frontShapesForm, "frontShapesForm"
  ],
  [
    increaseOutlineWeight, "increaseOutlineWeight"
  ],
  [
    decreaseOutlineWeight, "decreaseOutlineWeight"
  ],
  [
    changeBackShapes, "changeBackShapes"
  ],
  [
    randomize, "randomize"
  ]
]
// mélange du tableau
functionsArray.sort(() => Math.random() - 0.5);

// création des boutons
for (var i = 0; i < functionsArray.length; i++) {
  const button = document.createElement('button');
  button.classList.add('controller-btn');

  if (setIndications) {
    button.innerHTML = String(functionsArray[i][1]); // sets indications
  }

  if (i >= functionsArray.length / 2) {
    leftContainer.appendChild(button);
  } else {
    rightContainer.appendChild(button);
  }
  // attribution des différentes fonctions
  button.addEventListener('click', functionsArray[i][0]);
}

// ——— check for fullscreen ————

var elem = document.body;
document.addEventListener('click', function() {
  if (fullscreenAvailable) {
    requestFullScreen(elem);
    fullscreenAvailable = false;
  }
})

function requestFullScreen(element) {

  // Supports most browsers and their versions.
  var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

  if (requestMethod) { // Native full screen.
    requestMethod.call(element);
  } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
    var wscript = new ActiveXObject("WScript.Shell");
    if (wscript !== null) {
      wscript.SendKeys("{F11}");
    }
  }
}

function closeFullscreen() {

  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}



//———————————— BEGIN DRAW —————————

function draw() {
  noLoop();

  moduleSize = canvasSize / numberOfShapes;

  // console.log(canvasSize);

  frameRate(5);
  background(backgroundColor);

  rectMode(CENTER)
  if (backShapes == 1) {

    noStroke()

    fill(255, 0, 0)
    rect(canvasSize / 4, canvasSize / 5, canvasSize / 5, canvasSize / 5)
    rect(canvasSize / 1.5, canvasSize / 2, canvasSize / 2, canvasSize / 2)
    rect(canvasSize / 6, canvasSize / 1.2, canvasSize / 5, canvasSize / 2)

  } else if (backShapes == 2) {
    noStroke()

    fill(0, 255, 0)
    ellipse(canvasSize / 4, canvasSize / 5, canvasSize / 5, canvasSize / 5)
    ellipse(canvasSize / 1.15, canvasSize / 1.8, canvasSize / 2.5, canvasSize / 2.5)
    ellipse(canvasSize / 6, canvasSize / 1.2, canvasSize / 1.15, canvasSize / 1.15)
  } else if (backShapes == 3) {
    noStroke()
    fill(0, 0, 255)
    triangle(canvasSize / 4, canvasSize / 6, canvasSize / 3, canvasSize / 2, canvasSize / 1.15, canvasSize / 9)
    triangle(canvasSize / 1.10, canvasSize / 1.4, canvasSize / 1.2, canvasSize / 2, canvasSize / 2, canvasSize / 1.25)
    triangle(canvasSize / 5, canvasSize / 1.2, canvasSize / 4, canvasSize / 1.6, canvasSize / 2, canvasSize / 1.4)

  }

  for (var i = 0; i < numberOfShapes; i++) {
    for (var e = 0; e < numberOfShapes; e++) {

      noFill();
      stroke(255);
      strokeWeight(outlineWeight);
      if (shapesCount == 1) {

        ellipse(i * moduleSize + moduleSize / 2, e * moduleSize + moduleSize / 2, moduleSize, moduleSize)
      } else if (shapesCount == 2) {

        rect(i * moduleSize + moduleSize / 2, e * moduleSize + moduleSize / 2, moduleSize, moduleSize)
      } else if (shapesCount == 3) {

        triangle(i * moduleSize, // x1
            e * moduleSize, // y1
            i * moduleSize + moduleSize / 3, // x2
            e * moduleSize + moduleSize, // y2
            i * moduleSize + moduleSize, // x3
            e * moduleSize + moduleSize / 3,) // y3
      }

    }
  }

  console.log("outlineWeight " + outlineWeight)

  noFill()
  // rect(0, 0, canvasSize, canvasSize)

  // ———— CHECK FOR VICTORY ———————




  if (backgroundColor === RVB[1] && shapesCount === 1 && numberOfShapes === 6 && backShapes === 3 && outlineWeight >= 10 && outlineWeight <= 30) {
    // window.alert('BAM VICTOIRE'); // alert n'est pas une bonne solution - ça fait sauter le plein écran


    const victoryBox = document.createElement('div');
    victoryBox.classList.add('victory-box');
    victoryBox.innerHTML = " Bravo, tu as réussi ! "
    elem.appendChild(victoryBox); // adding to body
    victoryBox.style.left = window.innerWidth/2 - 250 + "px";
    victoryBox.style.top = window.innerHeight/2 - 200 + "px";



  }

}
