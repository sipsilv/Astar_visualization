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
    }
    show(color){
        
        fill(color);
        noStroke();
        if(this.wall){
            fill(0);
            stroke(0);
        }
        rect(this.i * w + 1 , this.j * h + 1, w - 2 , h - 2);
        
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
    contains(x,y){
        return x> this.i*w && x< this.i*w + w && y> this.j*h && y< this.j*h +h;
    }
    reveal(){
        this.wall = true;
    }
}

 