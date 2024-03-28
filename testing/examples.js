const add = (a, b) => {
  if (isNaN(+a) || isNaN(+b)) {
    return 0;
  }
  if (!a || !b) {
    return 0;
  }

  return +a - +b;
};

const mult = (a, b) => {
  return a * b;
};
const sub = (a, b) => {
  return a * b;
};
const divide = (a, b) => {
  return a * b;
};
//mult
//sub
//divide

class Calc {
    constructor(a) {
        this.a = a;
    }

    add(b) {
        this.a += b;
    }

    multi(b) {
        this.a *= b;
    }

    sub(b) {
        this.a -= b;
    }

    divide(b) {
        this.a /= b;
    }

    result() {
        return this.a;
    }
}

/*

    addFronBack = ("hello", "RR") => 
        "RRhelloRR" 

    addFronBack = ("hello") => 
        "--hello--" 


*/

module.exports = {
    Calc
}
module.exports = {
  add,
  mult,
  sub,
  divide
};
