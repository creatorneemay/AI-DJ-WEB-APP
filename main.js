song="";
lwristx="";
rwristx="";
lwristy="";
rwristy="";
lwrists="";
rwrists="";
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
        rwrists=results[0].pose.keypoints[10].score;
        console.log(lwristx,lwristy,rwristx,rwristy);
    }
}
function draw(){
    image(video,0,0,400,400);
    fill("red");
    stroke("blue");
    if(lwrists>0.2){
        circle(lwristx,lwristy,20);
        lwristy_number=Number(lwristy);
        remd=floor(lwristy);
        volume=remd/500;
        song.setVolume(volume);
        document.getElementById("vol").innerHTML="volume= "+ volume;
    }
    if(rwrists>0.2){
        circle(rwristx,rwristy,20);
        if(rwristy>0&&rwristy<=100){
            song.rate(0.5)
            document.getElementById("speed").innerHTML="speed= 0.5x";
        }
        else if(rwristy>100&&rwristy<=200){
            song.rate(1)
            document.getElementById("speed").innerHTML="speed= 1x";
        }
        else if(rwristy>200&&rwristy<=300){
            song.rate(1.5)
            document.getElementById("speed").innerHTML="speed= 1.5x";
        }
        else if(rwristy>300&&rwristy<=400){
            song.rate(2)
            document.getElementById("speed").innerHTML="speed= 2x";
        }
        else if(rwristy>400&&rwristy<=500){
            song.rate(2.5)
            document.getElementById("speed").innerHTML="speed= 2.5x";
        }
    }
}