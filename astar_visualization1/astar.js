
let rows = 50;
let cols = 50;
let grid = new Array(cols);
let openlist = [];
let closedlist=[];
let start;
let end;
let w;
let h;
let path = [];
let current;


function removethis(arr, elt){
    for(let i = arr.length -1; i >=0;i--){
        if(arr[i] == elt){
            arr.splice(i,1);
        }
    }
}

function heuristic(a,b){
    //euclidean
    //let d = dist(a.i,a.j, b.i, b.j);

    //manhattan distance
    let d = abs(a.i-b.i) + abs(a.j - b.j);
    return d;
}

function setup(){
    createCanvas(400,400);
    w = width / cols;
    h = height / rows;
    for(let i = 0; i< cols; i++){
        grid[i] = new Array(rows);
        for(let j = 0; j< cols; j++){
            grid[i][j] = new Spot(i,j);
        }
    }
    for(let i = 0; i< cols; i++){
        for(let j = 0; j< rows; j++){
            grid[i][j] = new Spot(i,j);
        }
    }
    for(let i = 0; i< cols; i++){
        for(let j = 0; j< rows; j++){
            grid[i][j].addNeighbours();
        }
    }
    
    start = grid[20][0];
    end = grid[cols - 1][rows - 1];
    start.wall = false;
    end.wall = false;
    openlist.push(start);

}

function draw(){
    background(0);
    if(openlist.length > 0){
        // keep going
        let lowest = 0;
        for(let i = 0; i< openlist.length; i++){
            if (openlist[i].f < openlist[lowest].f){
                lowest = i;
            }

            
        }
        current  = openlist[lowest];
        if(current === end){
            //find the path  
            noLoop();
            console.log('Done') 
        }
        removethis(openlist, current);
        closedlist.push(current);


        let neighbours = current.neighbours;
        for(let i = 0; i< neighbours.length; i++){
            let neighbour = neighbours[i];

            if(!closedlist.includes(neighbour) && !neighbour.wall){
                let tempG  = current.g + 1;
                if(openlist.includes(neighbour)){
                    if(tempG < neighbour.g){
                        neighbour.g = tempG;
                    }
                } else {
                    neighbour.g = tempG;
                    openlist.push(neighbour);
                }
                neighbour.h = heuristic(neighbour , end);
                neighbour.f = neighbour.g + neighbour.h;
                neighbour.previous = current;
            }
            
        }
        

    } else {
        console.log('no solution');
        noLoop();
        return;
    }
    for(let i = 0; i< cols; i++){
        for(let j = 0; j< rows; j++){
            grid[i][j].show(color(255));
        }
    }
    for(let i = 0; i< openlist.length; i++){
        openlist[i].show(color(0,255,0));
    }
    for(let i = 0; i< closedlist.length; i++){
        closedlist[i].show(color(255, 0 ,0));   
    }
    path = [];
    let temp = current;
    path.push(temp);
    while(temp.previous){
        path.push(temp.previous);
        temp = temp.previous;
    }
    for(let i = 0; i< path.length; i++){
        
        path[i].show(color(0, 0 ,255));
        
    }

}
