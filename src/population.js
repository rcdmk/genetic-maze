class Population {
    constructor(size, lifeSpan, mutationFactor, maze) {
        this.size = size;
        this.lifeSpan = lifeSpan;
        this.mutationFactor = mutationFactor;
        this.maze = maze;
        this.goals = 0;
        this.maxGoals = 0;
        this.fitness = 0;
        this.maxFitness = 0;
        this.generation = 0;
        this.population = new Array(size);
        this.allDead = false;
    }

    produceGeneration(parent1, parent2) {
        this.generation++;

        for (let i = 0; i < this.size; i++) {
            let dna;

            if (parent2) {
                dna = parent2.dna;
            } else {
                dna = new DNA(this.lifeSpan, this.mutationFactor);
            }

            if (parent1) dna = dna.cross(parent1.dna);

            let rat = this.population[i];

            if (rat) {
                rat.reset(this.maze.start.x, this.maze.start.y, dna);
            } else {
                rat = new Rat(this.maze.start.x, this.maze.start.y, this.maze.tileSize, dna);
            }

            this.population[i] = rat;
        }
    }

    selection() {
        let fittest = this.population[0];
        let secondFittest = this.population[0];
        this.goals = 0;

        for (let i = 0; i < this.population.length; i++) {
            const rat = this.population[i];

            if (rat.x == this.maze.target.x && rat.y == this.maze.target.y) {
                // goal bonus
                rat.fitness += 100;
                // shorter path bonus
                rat.fitness += (this.lifeSpan - rat.dna.curr) * 10;
                this.goals++;
            }

            rat.fitness += this.maze.maxDistance - this.maze.calculateDistance(rat.x, rat.y, this.maze.target.x, this.maze.target.y);
            rat.fitness = round(rat.fitness, 2);

            // select fittest
            if (rat.fitness > fittest.fitness) {
                secondFittest = fittest;
                fittest = rat;
            } else if (rat.fitness > secondFittest.fitness) {
                secondFittest = rat;
            }
        }

        this.fitness = fittest.fitness;
        if (this.fitness > this.maxFitness) this.maxFitness = this.fitness;
        if (this.goals > this.maxGoals) this.maxGoals = this.goals;

        this.produceGeneration(fittest, secondFittest);
    }

    update() {
        if (this.allDead) this.selection();

        this.allDead = true;

        for(let i = 0; i < this.population.length; i++) {
            this.population[i].update(this.maze);
            if (!this.population[i].dead) this.allDead = false;
        }
    }

    show() {
        this.population.forEach(rat => rat.show());
    }
}
