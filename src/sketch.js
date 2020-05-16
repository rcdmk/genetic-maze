const tileSize = 32;
const populationSize = 500;
const lifeSpan = 50;
const mutationFactor = 1; // %

let maze;
let population;
let status;
let frameRateToggle;
let currFrameRate;
let currFrameRateIndex = 0;
const frameRateValues = [1, 15, 30, 60];

function setup() {
    maze = new Maze(tileSize);
    population = new Population(populationSize, lifeSpan, mutationFactor, maze);

    // generate random population to start with
    population.produceGeneration();

    createCanvas(maze.cols * tileSize, maze.rows * tileSize);
    status = createP();

    frameRateToggle = createButton("Toggle Framerate");
    frameRateToggle.mouseClicked(toggleFrameRate);
}

function toggleFrameRate() {
    currFrameRateIndex = (currFrameRateIndex + 1) % frameRateValues.length;
    currFrameRate = frameRateValues[currFrameRateIndex];
    frameRate(currFrameRate);
}

function draw() {
    currFrameRate = Math.round(frameRate());
    background(255);
    maze.show();

    population.update();
    population.show();

    status.html(`<br>
    Frame rate: ` + currFrameRate + `<br>
    Population size: ` + population.size + `<br>
    Population life span: ` + population.lifeSpan + `<br>
    Current generation: ` + population.generation + `<br>
    Current fitness: ` + population.fitness + `<br>
    Max fitness: ` + population.maxFitness + `<br>
    Current goals reached: ` + population.goals + `<br>
    Max goals reached:` + population.maxGoals);
}

