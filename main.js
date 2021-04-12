song="";
lwristx="";
rwristx="";
lwristy="";
rwristy="";
function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(400,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelloaded);
    posenet.on('pose',gotposes);
}
function modelloaded(){
    console.log("Model Loaded");
}
function draw(){
    image(video,0,0,400,400);
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function pause(){
    song.pause();
}
function gotposes(results){
    if(results.length>0){
        console.log(results);
        lwristx=results[0].pose.leftWrist.x;
        lwristy=results[0].pose.leftWrist.y;
        rwristx=results[0].pose.rightWrist.x;
        rwristy=results[0].pose.rightWrist.y;
        console.log(lwristx,lwristy,rwristx,rwristy);
    }
}