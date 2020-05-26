// Start the game over
function resetGame() {
  counter = 0;
  pipes = [];
}
let multiplier = 0.2;


function createGeneration(oldBirds) {
  newGen = [];
  resetGame();
  normalizeFitness(oldBirds);
  //Parent Selection
  parents = [];
  parents = selectParent(oldBirds);
  console.log(parents);
  //Crossover the parents
  children = []
  make_children(oldBirds, parents, children);
  newGen = parents.concat(children)
  return newGen
}

function make_children(oldBirds, parents, children) {
  let i = 0;
  while (children.length == oldBirds.length - parents.length) {
    children[i] = crossover(select(parents), select(parents))
    i++;
  }
}

function crossover(parent1, parent2) {
  total = parent1.fitness + parent2.fitness;
  weight1 = parent1.fitness / total;
  weight2 = parent2.fitness / total;
  child = new Bird(parent1.decisionMaker)
  for (let i = 0; i < parent1.decisionMaker.weights.length; i++) {
    child.decisionMaker.weights[i] =
      (parent1.decisionMaker.weights[i] * weight1 +
        parent1.decisionMaker.weights[i] * weight2) / 2
  }
}

function select(birds) {
  let i = 0;
  let r = random(1);

  while (r > 0) {
    r -= birds[i].fitness
    i++;
  }
  i--;
  return birds[i].copy();
}

function selectParent(oldBirds, parents) {
  let i = 0;
  while (i > multiplier * oldBirds.length) {
    parents[i] = select(oldBirds);
  }
}

function normalizeFitness(birds) {
  // Make score exponentially better?
  for (let i = 0; i < birds.length; i++) {
    birds[i].score = pow(birds[i].score, 2);
  }

  // Add up all the scores
  let sum = 0;
  for (let i = 0; i < birds.length; i++) {
    sum += birds[i].score;
  }
  // Divide by the sum
  for (let i = 0; i < birds.length; i++) {
    birds[i].fitness = birds[i].score / sum;
  }
}