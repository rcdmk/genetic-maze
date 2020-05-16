const dirs = [
    { x:  0, y: -1 }, // up
    { x:  1, y:  0 }, // right
    { x:  0, y:  1 }, // down
    { x: -1, y:  0 }  // left
];

const noMove = { x: 0, y: 0 };

class DNA {
    constructor(lifeSpan, generation) {
      if (lifeSpan && lifeSpan.push) {
        // received array of genes
        this.genes = lifeSpan;
      } else {
        // random chain
        this.genes = new Array(lifeSpan);

        for (let i = 0; i < lifeSpan; i++) {
          this.genes[i] = random(dirs);
        }
      }

      this.generation = generation || 1;
      this.curr = 0;
    }

    next() {
      if (this.curr >= this.genes.length) return noMove;

      const gene = this.genes[this.curr];
      this.curr++;

      return gene;
    }

    cross(parent) {
      const mid = random(this.genes.length);

      const newGenes = new Array(this.genes.length);

      for(let i = 0; i < this.genes.length; i++) {
        if (random(100) < 1) {
          // mutation
          newGenes[i] = random(dirs);
        } else {
          // inheritance
          newGenes[i] = i < mid ? parent.genes[i] : this.genes[i];
        }
      }

      return new DNA(newGenes, parent.generation + 1);
    }
  }
