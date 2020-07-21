class Spot{
    constructor(i,j){
        this.g = 0;
        this.h = 0;
        this.f = 0;
        this.i = i;
        this.j = j;
        this.neighbours = [];
        this.previous = undefined;
        this.wall = false;
        // wall
        if(random(1) < 0.5){
            this.wall = true;
        }
    }
    show(color){
        fill(color);
        if(this.wall){
            fill(0);
        }
        
        noStroke(0);
        rect(this.i*w, this.j*h, w - 1 , h - 1 );
    }
    addNeighbours(){
        if(this.i < cols - 1){
            this.neighbours.push(grid[this.i + 1][this.j]);
        }
        if(this.i > 0){
            this.neighbours.push(grid[this.i - 1][this.j]);
        }
        if(this.j < rows - 1){
            this.neighbours.push(grid[this.i][this.j + 1]);
        }
        if(this.j > 0){
            this.neighbours.push(grid[this.i][this.j - 1]);
        }
        if(this.i>0 && this.j>0){
            this.neighbours.push(grid[this.i - 1][this.j - 1]);
        }
        if(this.i< cols - 1 && this.j< rows - 1){
            this.neighbours.push(grid[this.i + 1][this.j + 1]);
        }
        if(this.i< cols - 1 && this.j>0){
            this.neighbours.push(grid[this.i + 1][this.j - 1]);
        }
        if(this.i>0 && this.j< rows - 1){
            this.neighbours.push(grid[this.i - 1][this.j + 1]);
        }

    }
}