class GameOfLife {
    private grid: boolean[][];
    private rows: number;
    private cols: number;

    constructor(rows: number = 30, cols: number = 30) {
        this.rows = rows;
        this.cols = cols;
        this.grid = this.initializeGrid();
    }

    private initializeGrid(): boolean[][] {
        return Array(this.rows).fill(null).map(() => 
            Array(this.cols).fill(null).map(() => Math.random() > 0.7)
        );
    }

    private countNeighbors(x: number, y: number): number {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const newX = x + i;
                const newY = y + j;
                if (newX >= 0 && newX < this.rows && newY >= 0 && newY < this.cols) {
                    count += this.grid[newX][newY] ? 1 : 0;
                }
            }
        }
        return count;
    }

    public nextGeneration(): void {
        const newGrid = this.grid.map((row, i) =>
            row.map((cell, j) => {
                const neighbors = this.countNeighbors(i, j);
                if (cell) {
                    // Cell is alive
                    return neighbors === 2 || neighbors === 3;
                } else {
                    // Cell is dead
                    return neighbors === 3;
                }
            })
        );
        this.grid = newGrid;
    }

    public toggleCell(x: number, y: number): void {
        if (x >= 0 && x < this.rows && y >= 0 && y < this.cols) {
            this.grid[x][y] = !this.grid[x][y];
        }
    }

    public getGrid(): boolean[][] {
        return this.grid;
    }

    public printGrid(): void {
        const display = this.grid.map(row => 
            row.map(cell => cell ? '■' : '□').join(' ')
        ).join('\n');
        console.log(display);
    }
}

// Example usage:
const game = new GameOfLife(10, 10);
game.printGrid();  // Print initial state
game.nextGeneration();  // Advance to next generation
game.printGrid();  // Print new state
