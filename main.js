song="";
lwristx="";
rwristx="";
lwristy="";
rwristy="";
lwrists="";
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
        lwrists=results[0].pose.keypoints[9].score;
        console.log(lwristx,lwristy,rwristx,rwristy);
    }
}
function draw(){
    image(video,0,0,400,400);
    if(lwristx>0.2){
        fill("red");
        stroke("blue");
        circle(lwristx,lwristy,20);
        lwristy_number=Number(lwristy);
        remd=floor(lwristy);
        volume=remd/500;
        song.setVolume(volume);
        document.getElementById("vol").innerHTML="volume= "+ volume;
    }
}