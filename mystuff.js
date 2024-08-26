// Teachable Machine
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/TeachableMachine/3-teachable-audio
// https://editor.p5js.org/codingtrain/sketches/e3nrNMG7A


// Storing the label
let label = "Ready?";

// Classifier and model url
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/IMC7vh-2m/';

let mic;
let fft;






// STEP 1: Load the model!
function preload() {
  classifier = ml5.soundClassifier(modelURL + 'model.json');


}

function setup() {
  createCanvas(displayWidth, displayHeight);

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.5, 1024);
  fft.setInput(mic);

  // STEP 2: Start classifying (will listen to mic by default)
  classifyAudio();
}

// STEP 2 classify!
function classifyAudio() {
  classifier.classify(gotResults);
}

function draw() {
  background(255);
  // STEP 4: Draw the label
  textSize(40);
  textAlign(CENTER, CENTER);
  // fill(0);
  text(label, width/2, height - 200);
  

  let waveform = fft.waveform();
  let spectrum = fft.analyze(); 

  if (label !== "Ready?") {
    // Get amplitude from the microphone
    // let level = amplitude.getLevel();
    

    // Blue waveform
    stroke(0, 0, 255);
    beginShape();
    strokeWeight(1);
    for (let i = 0; i < waveform.length; i++) {
        let x = map(i, 0, waveform.length, 0, width);
        let y = map(waveform[i], -1, 1, height, 0);
        vertex(x, y);
    }
    endShape();

    //////KEEPS IT SNAPPY IF LEFT RUNNING, PREVENTING MEMORY LEAK?
    spectrum = null;
    waveform = null;
  }

  // Background noise
  let emoji = " ";
  // Pick an emoji based on alphabet label
  if (label == "A") {
    emoji = "🍎";
  } else if (label == "B") {
    emoji = "👶";
  } else if (label == "C") {
    emoji = "🐱";
  } else if (label == "D") {
    emoji = "🐶";
  } else if (label == "E") {
    emoji = "🥚";
  } else if (label == "F") {
    emoji = "🐟";
  } else if (label == "G") {
    emoji = "👧🏻";
  } else if (label == "H") {
    emoji = "👒";
  } else if (label == "I") {
    emoji = "🍦";
  } else if (label == "J") {
    emoji = "🧃";
  } else if (label == "K") {
    emoji = "🪁";
  } else if (label == "L") {
    emoji = "🍋";
  } else if (label == "M") {
    emoji = "🏔️";
  } else if (label == "N") {
    emoji = "📘";
  } else if (label == "O") {
    emoji = "🐙";
  } else if (label == "P") {
    emoji = "✏️";
  } else if (label == "Q") {
    emoji = "❔";
  } else if (label == "R") {
    emoji = "🐰";
  } else if (label == "S") {
    emoji = "☀️";
  } else if (label == "T") {
    emoji = "🎾";
  } else if (label == "U") {
    emoji = "☂️";
  } else if (label == "V") {
    emoji = "🎻";
  } else if (label == "W") {
    emoji = "💧";
  } else if (label == "X") {
    emoji = "🩻";
  } else if (label == "Y") {
    emoji = "🪀";
  } else if (label == "Z") {
    emoji = "🦓";
  } 

  // Draw the emoji
  
  textSize(256);
  text(emoji, width / 2, height / 2);
  
}

// STEP 3: Get the classification!
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // Store the label
  label = results[0].label;
}
