let video;  
let model;  
let face;   
let az
let us
let ru

let firstFace = true;

function preload() {
   az = loadImage('assets/az.png');
  us =    loadImage('assets/us.png');
  ru =    loadImage('assets/ru.jpg');
}


function setup() {
  createCanvas(640, 480); 
  video = createCapture(VIDEO);
  video.hide();
  loadFaceModel();
}

async function loadFaceModel() {
  model = await faceLandmarksDetection.load(
    faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
    { maxFaces: 1 }
  );
}


function draw() {
  
  if (video.loadedmetadata && model !== undefined) {
    getFace();
  }

  if (face !== undefined) {
    fill(226,188, 164)
    image(video, 0,0, width,height);
    rect(0,0,640,480)
    if (firstFace) {
      console.log(face);
      firstFace = false;
    }

    for (let pt of face.scaledMesh) {
      pt = scalePoint(pt);
      //circle(pt.x, pt.y, 3);
    }


    // silhouette
    fill(250,225, 204);
    beginShape();
    for (pt of face.annotations.silhouette) {
      pt = scalePoint(pt);
      vertex(pt.x, pt.y);
    }
    endShape(CLOSE);

   
    // silhouette 
    fill(260,235, 214);
    beginShape();
    for (pt of face.annotations.silhouette) {     
      pt = scalePoint(pt);
      vertex(pt.x-200, pt.y);
    }
    endShape(CLOSE);
    
     // silhouette
    fill(235,210, 190);
    beginShape();
    for (pt of face.annotations.silhouette) {     
      pt = scalePoint(pt);
      vertex(pt.x+200, pt.y);
    }
    endShape(CLOSE);
    
    let firsteye = []; {
    for (let pt of face.annotations.leftEyeUpper0) {
      pt = scalePoint(pt);
      firsteye.push(pt);
    }
    for (let pt of face.annotations.leftEyeLower0) {
      pt = scalePoint(pt);
      firsteye.push(pt);
    }

    fill(255,255,255);
    noStroke();
    beginShape();
    for (let pt of firsteye) {
      vertex(pt.x, pt.y);
    }
    endShape(CLOSE);
    beginShape();
    for (let pt of firsteye) {
      vertex(pt.x+200, pt.y);
    }
    endShape(CLOSE);
      beginShape();
    for (let pt of firsteye) {
      vertex(pt.x-200, pt.y);
    }
    endShape(CLOSE);
    }

    let secondeye = [];{
    for (let pt of face.annotations.rightEyeUpper0) {
      pt = scalePoint(pt);
      secondeye.push(pt);
    }
    for (let pt of face.annotations.rightEyeLower0) {
      pt = scalePoint(pt);
      secondeye.push(pt);
    }

    fill(255,255,255);
    noStroke();
    beginShape();
    for (let pt of secondeye) {
      vertex(pt.x, pt.y);
    }
    endShape(CLOSE);
      beginShape();
    for (let pt of secondeye) {
      vertex(pt.x-200, pt.y);
    }
    endShape(CLOSE);
      beginShape();
    for (let pt of secondeye) {
      vertex(pt.x+200, pt.y);
    }
    endShape(CLOSE);
    }
    
    
    //eyes
    {
    let leftEye =  scalePoint(face.annotations.leftEyeIris[0]);
    let rightEye = scalePoint(face.annotations.rightEyeIris[0]);

    let topLeft =     scalePoint(face.boundingBox.topLeft);
    let bottomRight = scalePoint(face.boundingBox.bottomRight);
    let w = bottomRight.x - topLeft.x;
    let dia = 15;
    //middle
    fill(0,91,0);
    noStroke();
    circle(leftEye.x,  leftEye.y,  dia);
    circle(rightEye.x, rightEye.y, dia);
    fill(0,0,0);
   
    circle(leftEye.x,  leftEye.y,  5);
    circle(rightEye.x, rightEye.y, 5);
    fill(255);
   
    circle(leftEye.x+2,  leftEye.y+1,  2);
    circle(rightEye.x+2, rightEye.y, 2);
    
    //right
    fill(0,71,0);
    circle(leftEye.x+200,  leftEye.y,  dia);
    circle(rightEye.x+200, rightEye.y, dia);
    fill(0,0,0);
   
    circle(leftEye.x+200,  leftEye.y,  5);
    circle(rightEye.x+200, rightEye.y, 5);
    fill(255);
   
    circle(leftEye.x+202,  leftEye.y+1,  2);
    circle(rightEye.x+202, rightEye.y, 2);
    
      //left
       fill(20,131,0);
    circle(leftEye.x-200,  leftEye.y,  dia);
    circle(rightEye.x-200, rightEye.y, dia);
    fill(0,0,0);
   
    circle(leftEye.x-200,  leftEye.y,  5);
    circle(rightEye.x-200, rightEye.y, 5);
    fill(255);
   
    circle(leftEye.x-198,  leftEye.y+1,  2);
    circle(rightEye.x-198, rightEye.y, 2);
  }
    
    
    let upperlip = [];{
    for (let pt of face.annotations.lipsUpperOuter) {
      pt = scalePoint(pt);
      upperlip.push(pt);
    }
    for (let pt of face.annotations.lipsLowerOuter) {
      pt = scalePoint(pt);
      upperlip.push(pt);
    }

    fill(216,128,96);
    noStroke();
    beginShape();
    for (let pt of upperlip) {
      vertex(pt.x, pt.y);
    }
    endShape(CLOSE);
      fill(186,59,26);
      beginShape();
    for (let pt of upperlip) {
      vertex(pt.x+200, pt.y);
    }

    endShape(CLOSE);
    beginShape();
      fill(226,149,136);
    for (let pt of upperlip) {
      vertex(pt.x-200, pt.y);
    }
    endShape(CLOSE);

    }
    
   
    let mouth = [];{
    for (let pt of face.annotations.lipsUpperInner) {
      pt = scalePoint(pt);
      mouth.push(pt);
    }
    for (let pt of face.annotations.lipsLowerInner) {
      pt = scalePoint(pt);
      mouth.push(pt);
    }

    fill(255,255,255);
    noStroke();
    beginShape();
    for (let pt of mouth) {
      vertex(pt.x, pt.y);
    }
    endShape(CLOSE);
      beginShape();
    for (let pt of mouth) {
      vertex(pt.x-200, pt.y);
    }
    endShape(CLOSE);
      beginShape();
    for (let pt of mouth) {
      vertex(pt.x+200, pt.y);
    }
    endShape(CLOSE);
    }
    
    
    let eyebrowR = [];{
    for (let pt of face.annotations.rightEyebrowUpper) {
      pt = scalePoint(pt);
      eyebrowR.push(pt);
    }
    

    fill(61,35,0);
    noStroke();
    beginShape();
    for (let pt of eyebrowR) {
      vertex(pt.x, pt.y);
    }
    endShape(CLOSE);
    }
    
    
    let eyebrowL = [];{
    for (let pt of face.annotations.leftEyebrowUpper) {
      pt = scalePoint(pt);
      eyebrowL.push(pt);
    }
    for (let pt of face.annotations.leftEyebrowUpper) {
      pt = scalePoint(pt);
      eyebrowL.push(pt);
    }

    fill(61,35,0);
    noStroke();
    beginShape();
    for (let pt of eyebrowL) {
      vertex(pt.x, pt.y);
    }
    endShape(CLOSE);

    }
    
    
    let noseR = []; {
    for (let pt of face.annotations.noseLeftCorner) {
      pt = scalePoint(pt);
      noseR.push(pt);
    }

    for (let pt of face.annotations.noseBottom) {
      pt = scalePoint(pt);
      noseR.push(pt);
    }
    for (let pt of face.annotations.noseRightCorner) {
      pt = scalePoint(pt);
      noseR.push(pt);
    }

    fill(102,51,0);
    noStroke();
    beginShape();
    for (let pt of noseR) {
      vertex(pt.x, pt.y);
    }
    endShape(CLOSE);
      beginShape();
    for (let pt of noseR) {
      vertex(pt.x+200, pt.y);
    }
    endShape(CLOSE);
      beginShape();
    for (let pt of noseR) {
      vertex(pt.x-200, pt.y);
    }
    endShape(CLOSE);

   
    }
    
    
    
    
     
    
    }
  
}


// converts points from video coordinates to canvas
function scalePoint(pt) {
  let x = map(pt[0], 0,video.width, 0,width);
  let y = map(pt[1], 0,video.height, 0,height);
  return createVector(x, y);
}


// gets face points from video input
async function getFace() {
  const predictions = await model.estimateFaces({
    input: document.querySelector('video')
  }); 
  if (predictions.length === 0) {
    face = undefined;
  }
  else {
    face = predictions[0];
  }
}
