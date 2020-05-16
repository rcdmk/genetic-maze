class Rat {
    constructor(x, y, size, dna) {
        this.size = size;
        this.reset(x, y, dna);
    }

    reset(x, y, dna) {
        this.x = x;
        this.y = y;
        this.dna = dna;
        this.dead = false;
        this.fitness = 0;
    }

    update(maze) {
        if (this.dead) return;

        if (this.x == maze.target.x && this.y == maze.target.y) {
            // reached goal, no point in keep processing
            this.dead = true;
            return;
        }

        const step = this.dna.nextStep();

        if (step.x == 0 && step.y == 0) {
            // no more steps to do, end of life span
            this.dead = true;
            return;
        }

        const stepX = this.x + step.x;
        const stepY = this.y + step.y;

        // out of bounds
        if (stepX < 0 || stepX >= maze.cols) return;
        if (stepY < 0 || stepY >= maze.rows) return;

        // do not move through walls
        if (maze.map[stepY][stepX] !== 0) return;

        this.x = stepX;
        this.y = stepY;
    }

    show() {
        if (this.dead) {
            stroke(255, 0, 0);
        } else {
            noStroke();
        }

        fill(150, this.dead ? 128 : 180);
        ellipse(this.x * this.size + this.size * 0.5,
            this.y * this.size + this.size * 0.5,
            this.size * 0.5,
            this.size * 0.7);

        noStroke();
        fill(255);
        textAlign(CENTER, CENTER);
        text(this.dna.curr,
            this.x * this.size + this.size * 0.5,
            this.y * this.size + this.size * 0.5);
    }
}
