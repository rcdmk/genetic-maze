class Maze {
    constructor(tileSize) {
        this.tileSize = tileSize;
        this.map = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
            [1, 1, 0, 0, 1, 1, 0, 1, 1, 1],
            [1, 1, 1, 0, 1, 0, 0, 0, 1, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
        this.start = {
            x: 1,
            y: 1
        };
        this.target = {
            x: 3,
            y: 1
        };

        // longest path possible
        this.maxPathLength = (this.cols * this.rows) * 0.65;
    }

    get rows() {
        return this.map.length;
    }

    get cols() {
        return this.map[0].length;
    }

    get maxDistance() {
        return this.maxPathLength;
    }

    calculateDistance(startX, startY, targetX, targetY) {
       return this.computeAStarPath(startX, startY, targetX, targetY).length;
    }

    #buildVisitedKey(x, y) {
        return x + "," + y;
    }

    computeAStarPath(startX, startY, targetX, targetY) {
        let queue = [{
            x: targetX,
            y: targetY,
            cost: 0,
        }];

        let curr;
        let visited = new Map();

        while(queue.length > 0) {
            curr = queue.shift();
            visited.set(this.#buildVisitedKey(curr.x, curr.y), curr);
            if (curr.x == startX && curr.y == startY) break;

            let neighbours = [];

            if (curr.y - 1 >= 0 && this.map[curr.y - 1][curr.x] === 0) {
                if (!visited.has(this.#buildVisitedKey(curr.x, curr.y - 1))) {
                    neighbours.push({ x: curr.x, y: curr.y - 1, cost: curr.cost + 1 });
                }
            }

            if (curr.x + 1 < this.cols && this.map[curr.y][curr.x + 1] === 0) {
                if (!visited.has(this.#buildVisitedKey(curr.x + 1, curr.y))) {
                    neighbours.push({ x: curr.x + 1, y: curr.y, cost: curr.cost + 1 });
                }
            }

            if (curr.y + 1 < this.rows && this.map[curr.y + 1][curr.x] === 0) {
                if (!visited.has(this.#buildVisitedKey(curr.x, curr.y + 1))) {
                    neighbours.push({ x: curr.x, y: curr.y + 1, cost: curr.cost + 1 });
                }
            }

            if (curr.x - 1 >= 0 && this.map[curr.y][curr.x - 1] === 0) {
                if (!visited.has(this.#buildVisitedKey(curr.x - 1, curr.y))) {
                    neighbours.push({ x: curr.x - 1, y: curr.y, cost: curr.cost + 1 });
                }
            }

            for(let neighbour of neighbours) {
                let found = queue.filter(cell => cell.x == neighbour.x && cell.y == neighbour.y);
                if (found.length > 0 && found[0].cost > neighbour.cost) {
                    found[0].cost = neighbour.cost;
                } else if (!visited.has(this.#buildVisitedKey(neighbour.x, neighbour.y))) {
                    queue.push(neighbour);
                }
            }
        }

        // no path possible
        if (queue.length === 0 && (curr.x !== startX || curr.y !== startY)) return [];
        queue.length = 0;

        let path = [curr];

        while (curr.x != targetX || curr.y != targetY) {
            // top
            if (curr.y - 1 >= 0 && this.map[curr.y - 1][curr.x] === 0) {
                let found = visited.get(this.#buildVisitedKey(curr.x, curr.y - 1));
                if (found && found.cost < curr.cost) {
                    curr = found;
                    path.push(curr);
                    continue;
                }
            }

            // right
            if (curr.x + 1 < this.cols && this.map[curr.y][curr.x + 1] === 0) {
                let found = visited.get(this.#buildVisitedKey(curr.x + 1, curr.y));
                if (found && found.cost < curr.cost) {
                    curr = found;
                    path.push(curr);
                    continue;
                }
            }

            // bottom
            if (curr.y + 1 < this.rows && this.map[curr.y + 1][curr.x] === 0) {
                let found = visited.get(this.#buildVisitedKey(curr.x, curr.y + 1));
                if (found && found.cost < curr.cost) {
                    curr = found;
                    path.push(curr);
                    continue;
                }
            }

            // left
            if (curr.x - 1 >= 0 && this.map[curr.y][curr.x - 1] === 0) {
                let found = visited.get(this.#buildVisitedKey(curr.x - 1, curr.y));
                if (found && found.cost < curr.cost) {
                    curr = found;
                    path.push(curr);
                    continue;
                }
            }
        }

        return path;
    }

    show() {
        // tiles
        stroke(0);

        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                if (this.map[y][x] > 0) {
                    fill(0);
                } else {
                    noFill();
                }

                rect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
            }
        }

        noStroke();

        // start
        fill(0, 150, 0, 128);
        ellipse(this.start.x * this.tileSize + this.tileSize / 2,
            this.start.y * this.tileSize + this.tileSize / 2,
            this.tileSize * 0.7, this.tileSize * 0.7);

        // target
        fill(150, 0, 0, 128);
        ellipse(this.target.x * this.tileSize + this.tileSize / 2,
            this.target.y * this.tileSize + this.tileSize / 2,
            this.tileSize * 0.7, this.tileSize * 0.7);
    }
}
