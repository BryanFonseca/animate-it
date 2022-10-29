const canvas = document.querySelector(".canvas");
const obj = document.querySelector(".object");
const playButton = document.querySelector(".play-button");
const recordButton = document.querySelector(".record-button");
const keyframesContainer = document.querySelector(".keyframes-container");

const keyFrames = [];
let isRecording = false;

recordButton.addEventListener("click", (e) => {
    e.stopPropagation();
    isRecording = !isRecording;
    canvas.classList.toggle("is-recording", isRecording);
    recordButton.textContent = `${!isRecording ? "Start" : "Stop"} recording`;
});

document.addEventListener("click", (e) => {
    if (!isRecording) return;
    const { x: xPos, y: yPos } = e;
    // Create a keyframe on every click
    keyFrames.push({
        xPos,
        yPos,
    });
    const keyframeEl = document.createElement("div");
    keyframeEl.classList.add("keyframe");
    keyframesContainer.insertAdjacentElement("beforeend", keyframeEl);
    console.log("Keyframe created");
});

function animate(keyFrames, stepCallback) {
    let frameCounter = 0;
    return function () {
        if (frameCounter > keyFrames.length - 1) return;
        stepCallback(keyFrames[frameCounter]);
        frameCounter++;
        if (frameCounter > keyFrames.length - 1) {
            // Descartar animación
            console.log("Animation done!");
        }
    };
}

playButton.addEventListener("click", animate(keyFrames, updateTransform));

function updateTransform(frameInfo) {
    const { xPos, yPos } = frameInfo;
    obj.style.transform = `translate(${xPos}px, ${yPos}px)`;
}
