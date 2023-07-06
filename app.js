
//board
let board
let boardWidth = 360
let boardHeight = 640
let context


//bird

let birdWidth= 34;  //width/height ratio = 408/228 = 17/12
let birdHeight= 24;  // kuşun yüksekliği
let birdX = boardWidth/8; //kuşun Yatay konumu konumu.
let birdY=boardHeight/2;  //kuşun dikey konumu
let birdImg;


//pipes 
let pipe = [];
let pipeWidth= 64; // width/height ratio = 384/3072= 1/8
let pipeHeight= 512;
let pipeX= boardWidth
let pipeY=0;

let topPipeImg;
let bottomPipeImg;


let bird = {
    x : birdX, //Kuşun x konumu
    y : birdY, // kuşun y konumu
    width: birdWidth, // kuşun genişliği
    height: birdHeight // kuşun yüksekliği 
}


window.onload = function() {
      // Sayfa tamamen yüklendiğinde gerçekleştirilecek işlemler
    board=document.getElementById('board');
    board.height=boardHeight
    board.boardWidth=boardWidth
    context = board.getContext("2d");  // used for drawing on the board


    //draw flappy bird

    context.fillStyle='green'
    context.fillRect(bird.x, bird.y, bird.width, bird.height);

    //load images
    birdImg = new Image();
    birdImg.src="images/flappybird.png";
    birdImg.onload= function() {
        
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)
    }

    topPipeImg = new Image()
    topPipeImg.src="images/toppipe.png"

    bottomPipeImg= new Image()
    bottomPipeImg.src="images/bottompipe.png"

    requestAnimationFrame(update)

    setInterval(placePipes, 1500) //every 1.5 seconds.
}

function update() {

    requestAnimationFrame(update)
    context.clearRect(0, 0, board.width, board.height)

    //bird
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)

    //pipes
    for (let i=0; i< pipeArray.length; i++) {
        let pipe  = pipeArray[i];
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height)
    }
}


function placePipes() {
    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : pipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }


    pipeArray.push(topPipe)
}

