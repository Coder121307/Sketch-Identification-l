function setup(){
    canvas = createCanvas(280,280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function preload(){
    Classifier = ml5.imageClassifier('DoodleNet');
}

function clearCanvas(){

    background("white");
}

function draw(){
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas(){
    Classifier.classify(canvas, gotResult);
}

function gotResult(error, results){
    if (error){
        console.log(error);
    }
    else {
        console.log(results);
        document.getElementById('label').innerHTML = 'Label:  '+ results[0].label;
        document.getElementById('confidence').innerHTML = 'Confidence:  '+ Math.round(results[0].confidence * 100) + '%';
        utterThis = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);
    }
    
}

