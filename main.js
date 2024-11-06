let poblation = [];
const TARGET = "El codigo bien escrito facilita el trabajo en equipo y ayuda a ¡PROSPERAR!.";
const PoblationSize = 5000;

let randomWord;
let generation = 0;

function main() {
    generatePoblation();

    //console.log(poblation);

    if (!isCorrect(poblation)) console.log("Generando...")

    do {
        poblation = childPoblation(poblation)
        mutation(poblation);
        generation++;

        let maxFitness = Math.max(...poblation.map(obj => obj.fitness))

        console.log("Generacion: " + generation)
        console.log(poblation.find(obj => obj.fitness === maxFitness).word)
        //if (generation % 100 == 0) console.log(generation + ". " + poblation[49].word);
    } while (!isCorrect(poblation))
}

function mutation(poblation) {
    let mutationRate = 0.1;

    if (Math.random() < mutationRate) {
        let index = Math.floor(Math.random() * poblation.length);
        poblation[index].word[Math.floor(Math.random() * TARGET.length)] = randomCharacter();
    }
}

function isCorrect(poblation) {
    for (let i = 0; i < poblation.length; i++) {
        if (poblation[i].word == TARGET) {
            console.log(generation)
            console.log(poblation[i].word);
            return true;
        }
    }

    return false;
}

function childPoblation(poblation) {
    let childPoblation = [];

    for (let i = 0; i < PoblationSize; i++) {
        let childA = ruleta(poblation);
        let childB = ruleta(poblation);

        let crossover = Math.floor(Math.random() * TARGET.length)

        randomWord = childA.word.substring(0, crossover) + childB.word.substring(crossover, childB.word.length);

        let fit = fitness(randomWord);

        childPoblation.push(
            {
                id: i,
                word: randomWord,
                fitness: fit
            }
        )

        //console.log(poblation[i], childPoblation[i])
    }
    //poblation = childPoblation;
    poblation = [];
    //console.log(childPoblation)
    return childPoblation;
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