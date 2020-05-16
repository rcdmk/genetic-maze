const dirs = [
    { x:  0, y: -1 }, // up
    { x:  1, y:  0 }, // right
    { x:  0, y:  1 }, // down
    { x: -1, y:  0 }  // left
];

const noMove = { x: 0, y: 0 };

class DNA {
    constructor(chainLength, mutationFactor = 0, genes = null, generation = 1) {
      if (genes) {
        this.genes = genes;
      } else {
        // create random chain
        this.genes = new Array(chainLength);

        for (let i = 0; i < chainLength; i++) {
          this.genes[i] = random(dirs);
        }
      }

      this.mutationFactor = mutationFactor;
      this.generation = generation;
      this.curr = 0;
    }

    nextStep() {
      if (this.curr >= this.genes.length) return noMove;

      const gene = this.genes[this.curr];
      this.curr++;

      return gene;
    }

    clone() {
      return new DNA(this.genes.length, this.mutationFactor, this.genes.slice(0));
    }

    cross(parent) {
      const mid = random(this.genes.length);

      const newGenes = new Array(this.genes.length);

      for(let i = 0; i < this.genes.length; i++) {
        if (random(100) < this.mutationFactor) {
          // mutation
          newGenes[i] = random(dirs);
        } else {
          // inheritance
          newGenes[i] = i < mid ? parent.genes[i] : this.genes[i];
        }
      }

      return new DNA(newGenes.length, this.mutationFactor, newGenes, parent.generation + 1);
    }
  }
