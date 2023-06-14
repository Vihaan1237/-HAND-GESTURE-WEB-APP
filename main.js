//https://teachablemachine.withgoogle.com/models/JRYXPAnCO/model.json//

prediction = "";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capturedimage" src="'+data_uri+'"/>'
    });
}

Classfier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/JRYXPAnCO/model.json',modelLoaded);

function modelLoaded(){
console.log("Model Loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "My prediction is" + prediction; 
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('capturedimage');
    Classfier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error) {
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;
        speak();
        if(results[0].label == "Nice"){
            document.getElementById("result_gesture").innerHTML = "&#128076";
        }

        if(results[0].label == "Thumbs up"){
            document.getElementById("result_gesture").innerHTML = "&#128077";
        }

        if(results[0].label == "Angry"){
            document.getElementById("result_gesture").innerHTML = "&#9994";
        }
    }
}