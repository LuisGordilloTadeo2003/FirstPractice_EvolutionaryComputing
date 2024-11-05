const abecedario = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' '
];

let pool = [];
let poolChild = [];
let betters = [];

let generation = 0;

const word = "ca";
let randomword = "";

function setup() {
  for (let i = 0; i < 100; i++) {
    randomword = "";
    for (let j = 0; j < word.length; j++) {
      let select_letter = floor(random(abecedario.length));
      randomword += abecedario[select_letter];
    }
    let pruebafitness = fitness(randomword, word)
    pool.push({
      id: i,
      word: randomword,
      fitness: pruebafitness,
    })
  }

  //for (let i = 0; i < 50; i++) {
  do {
    //console.log(pool);
    //betters = ruleta(pool);

    console.log(generation);
    childs(pool);
    generation++;
  } while (!isCorrect(pool))
  //}
}

function mutation(randomword) {
  if (random(100) < 30) {
    let select_letter = floor(random(abecedario.length));

    randomword[floor(random(randomword.length))] = select_letter;
  }

  return randomword;
}

function isCorrect(pool) {
  for (let i = 0; i < pool.length; i++) {
    if (pool[i].word == word) {
      console.log(pool[i].word)
      return true
    } else {
      return false
    }
  }
}

function childs(pool) {
  poolChild = [];

  for (let i = 0; i < 100; i++) {
    randomword = "";
    let childA = ruleta(pool);
    let childB = ruleta(pool);

    let tamChild = floor(random(childA.length));

    childA.word.substring(0, tamChild);
    childB.word.substring(tamChild);

    randomword = childA.word.substring(0, tamChild) + childB.word.substring(tamChild)

    randomword = mutation(randomword);
    //console.log(randomword)

    let pruebafitness = fitness(randomword, word)
    poolChild.push({
      id: i,
      word: randomword,
      fitness: pruebafitness,
    })
  }

  //console.log(poolChild);

  pool = poolChild;;
}

function ruleta(pool) {
  let suma = 0;

  for (let i = 0; i < pool.length; i++) {
    suma += pool[i].fitness;
  }

  let aleatorio = random(suma);

  let suma2 = 0;
  let iteration = 0;
  let best;

  do {
    suma2 += pool[iteration].fitness;
    best = iteration;
    iteration++;
  } while (suma2 < aleatorio)

  return pool[best];
}

function fitness(randomword, word) {
  let fitness = 0;
  for (let i = 0; i < word.length; i++) {
    if (randomword[i] == word[i]) {
      fitness++;
    }
  }

  return fitness;
}