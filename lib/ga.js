// Start the game over
function resetGame() {
  counter = 0;
  pipes = [];
}

let multiplier = 0.2;


function createGeneration() {
  var nextGen = []
  resetGame();
  calculateFitness(birds);
  //Select fittest one with prob. and add them to next generation
  survivalofFittest();
  //Crossover the parents
  make_children();
}

function make_children() {
  var i = multiplier * generationSize;
  while (i < generationSize) {
    activeBirds[i] = crossover(selectParents(activeBirds.slice(0, i), 2))
    i++;
  }
}

function selectParents(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x].copy();
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

function crossover(parents) {
  var child = new Bird(parents[0].decisionMaker)
  for (var i = 0; i < parents[0].decisionMaker.weights_ho.length; i++) {
    child.decisionMaker.weights_ho[i] =
      (parents[0].decisionMaker.weights_ho[i] +
        parents[1].decisionMaker.weights_ho[i]) / 2;
  }
  return child.copy();
}

function selectBird(x) {
  var i = 0;
  var r = random(1);
  while (r > 0) {
    r -= x[i].fitness
    i++;
  }
  i--;

  return x[i].copy();
}

function survivalofFittest() {
  var i = 0;
  while (i < multiplier * generationSize) {
    activeBirds[i] = selectBird(birds);
    birds.splice(birds.indexOf(activeBirds[i]), 1)
    i++;
  }
}

function calculateFitness(x) {
  // Make score exponentially better?
  for (let i = 0; i < x.length; i++) {
    x[i].score = pow(x[i].score, 2);
  }

  // Add up all the scores
  let sum = 0;
  for (let i = 0; i < x.length; i++) {
    sum += x[i].score;
  }
  // Divide by the sum
  for (let i = 0; i < x.length; i++) {
    x[i].fitness = x[i].score / sum;
  }
}