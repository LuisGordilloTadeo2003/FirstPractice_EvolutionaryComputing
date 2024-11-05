let poblation = [];
const TARGET = "lorem ipsum";
const PoblationSize = 1000;

let randomWord;

function main() {
    generatePoblation();

    //console.log(poblation);

    childPoblation(poblation)
}

function childPoblation(poblation) {
    for (let i = 0; i < PoblationSize; i++) {
        let childA = ruleta(poblation);
        let childB = ruleta(poblation);

        let crossover = Math.floor(Math.random() * TARGET.length)

        randomWord = childA.word.substring(0, crossover) + childB.word.substring(crossover, childB.word.length);
    }
}

function generatePoblation() {
    for (let i = 0; i < PoblationSize; i++) {
        randomWord = "";
        for (let j = 0; j < TARGET.length; j++) {
            randomWord += randomCharacter();
        }

        let fit = fitness(randomWord);

        poblation.push(
            {
                id: i,
                word: randomWord,
                fitness: fit
            }
        )
    }
}

function ruleta(poblation) {
    let aleatorio = Math.random() * sumaFit(poblation);

    let suma = 0;
    let iteration = 0;

    do {
        suma += poblation[iteration].fitness;
        iteration++;
    } while (suma < aleatorio)

    return poblation[iteration - 1]
}

function sumaFit(poblation) {
    let sumFit = 0;

    for (let i = 0; i < poblation.length; i++) {
        sumFit += poblation[i].fitness;
    }

    return sumFit;
}

function fitness(randomWord) {
    let fit = 0;

    for (let i = 0; i < TARGET.length; i++) {
        if (randomWord[i] === TARGET[i]) {
            fit += 1;
        }
    }

    return fit;
}

function randomCharacter() {
    let c = Math.floor(Math.random() * 96 + 32);
    return String.fromCharCode(c);
}


main();