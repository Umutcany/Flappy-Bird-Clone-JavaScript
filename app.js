
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
let pipeArray = [];
let pipeWidth= 64; // width/height ratio = 384/3072= 1/8
let pipeHeight= 512;
let pipeX= boardWidth
let pipeY=0;

let topPipeImg;
let bottomPipeImg;

// physics
let velocityX= -2; // pipes'ın sola geliş hızı.
let velocityY= 0 // kuşun zıplama hızı.

 

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

    document.addEventListener("keydown", moveBird);
}

function update() {

    requestAnimationFrame(update)
    context.clearRect(0, 0, board.width, board.height)

    //bird
    bird.y += velocityY
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)

    //pipes
    for (let i=0; i< pipeArray.length; i++) {
        let pipe  = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
    }
}


function placePipes() {

    // (0-1) * pipeHeight/2.
    // 0 -> -128 (pipeHeight/4)
    // 1 -> -128 -256 (pipeHeight/4 - pipeHeight/2)= -3/4 pipeHeight

    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2); // boruların rastgele şekilde gelmesini istiyorum.
    let openingSpace = board.height/4;

    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }


    pipeArray.push(topPipe)

    let bottomPipe = {
        img: bottomPipeImg,
        x:pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width:pipeWidth,
        height:pipeHeight,
        passed:false
    }

    pipeArray.push(bottomPipe)
}

function moveBird(e) {
    if(e.code =="Space" || e.code =="ArrowUp" || e.code=="KeyX") {

        //jump
        velocityY=-6;
    }
}