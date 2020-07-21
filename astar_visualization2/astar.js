const WALL = 0;
const DRAW = 1;
let rows = 25;
let cols = 25;
let grid = new Array(cols);
let openlist = [];
let closedlist=[];
let start;
let end;
let w;
let h;
let path = [];
let current;
let state = -1;
let song;
let button;
let startastar = 0;



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


function preload(){
    song = loadSound('song.mp3')
}

function mousePressed(){
    state = WALL;
}
function mouseReleased(){
    state = -1;
    if(startastar == 1){
        state = DRAW;
    }
}


function setup(){
    createCanvas(600,600);
    state = -1;
    w = width / cols;
    h = height / rows;
    button  = createButton('start!');
    button.position(325, 650)
    button.mousePressed(()=>{
        startastar = 1;
    });
    
    song.play();
    
    for(let i = 0; i< cols; i++){
        grid[i] = new Array(cols);
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
    
    start = grid[0][0];
    end = grid[cols - 1][rows - 1];
    start.wall = false;
    end.wall = false;
    openlist.push(start);

}



function draw(){
    background(200);
    for(let i = 0; i< cols; i++){
        for(let j = 0; j< rows; j++){
            grid[i][j].show(color(255));
        }
    }
    if(state == WALL){
        for(let i = 0; i< cols; i++){
            for(let j = 0; j< rows; j++){
                if(grid[i][j].contains(mouseX, mouseY)){
                    grid[i][j].wall = true;
                }
            }
            
        }

    }
    else if(state === DRAW){
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
                console.log('Done');
                song.stop();
                
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
}
