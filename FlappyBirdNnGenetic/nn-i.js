//crated by @iboraham
//Single Layer Neural Network

class SNeuralNetwork {
  constructor(x) {
    if (x instanceof SNeuralNetwork) {
      let t = x;
      this.weights = a.weights.copy()
    } else {
      this.weights = []
      if (x != 0) {
        for (var i = 0; i < x; i++) {
          this.weights[i] = random(-1, 1);
        }
      }
    }
  }

  //guess
  decide(inputs) {
    let sum = 0;
    for (var i = 0; i < this.weights.length; i++) {
      sum += this.weights[i] + inputs[i];
    }
    this.outputs = this.sign(sum);
  }

  //Activation
  sign(sum) {
    if (sum >= 0) {
      return 1;
    } else {
      return -1;
    }
  }

  // train
  train(inputs, targets) {
    errorAr = [];
    for (let i = 0; i < inputs.length; i++) {
      errorAr[i] = targets[i] - input[i];
    }

    for (let i = 0; i < this.weights.length; i++) {
      this.weigth = this.weight + errorAr[i] * this.learningRate;
    }
  }

  setLearningRates(learningRate = 0.1) {
    this.learningRate = learningRate;
  }

  copy() {
    return new SNeuralNetwork(this)
  }

}