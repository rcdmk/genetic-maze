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
    }

    get rows() {
        return this.map.length;
    }

    get cols() {
        return this.map[0].length;
    }

    get maxDistance() {
        return this.cols + this.rows;
    }

    calculateDistance(startX, startY, targetX, targetY) {
       return abs(targetX - startX) + abs(targetY - startY);
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
