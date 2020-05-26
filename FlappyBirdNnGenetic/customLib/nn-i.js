//crated by @iboraham
//Single Layer Neural Network

class SNeuralNetwork {
  constructor(x) {
    if (x instanceof SNeuralNetwork) {
      let t = x;
      this.weights_ho = t.weights_ho.slice()
    } else {
      this.weights_ho = []
      if (x != 0) {
        for (var i = 0; i < x; i++) {
          this.weights_ho[i] = random(-1, 1);
        }
      }
    }
  }

  //guess
  decide(inputs) {
    let sum = 0;
    for (var i = 0; i < this.weights_ho.length; i++) {
      sum += this.weights_ho[i] + inputs[i];
    }
    this.outputs = this.sign(sum);
    return this.outputs
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

    for (let i = 0; i < this.weights_ho.length; i++) {
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