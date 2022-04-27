const machineState = { play: false, loop: false };
const tracks = [
  "All track",
  "Tambourine",
  "B vocal",
  "Drums",
  "Hehe vocal",
  "High vocal",
  "Jibrish",
  "Lead 1",
  "Uuho",
];

const audios = [];
const playPressedHandler = () => {
  machineState.play = true;
  audios.forEach((element) => {
    element.audio.play();
  });
};

const stopPressedHandler = () => {
  machineState.play = false;
  audios.forEach((element) => {
    element.audio.pause();
    element.audio.currentTime = 0;
  });
};

const loopPressedHandler = () => {
  if (machineState.loop) {
    machineState.loop = false;
  } else {
    machineState.loop = true;
  }
  audios.forEach((element) => {
    element.audio.loop = machineState.loop;
  });
};

const muteButtonPresses = (element) => {
  console.log(element);
  let id = element.id;
  let button = document.getElementById(element.name);
  if (audios[id].audio.muted) {
    button.style.color = "black";
    audios[id].audio.muted = false;
  } else if (!audios[id].audio.muted) {
    button.style.color = "red";
    audios[id].audio.muted = true;
  }
};

const initElement = function () {
  let id = 0;
  tracks.forEach((element) => {
    let aud = new Audio(`/audio/${element}.mp3`);
    let obj = {
      audio: aud,
      name: element,
      id: id,
    };
    audios.push(obj);
    document.getElementById(element).addEventListener("click", () => {
      muteButtonPresses(obj);
    });
    id++;
  });

  document.getElementById("play").addEventListener("click", playPressedHandler);
  document.getElementById("stop").addEventListener("click", stopPressedHandler);
  document.getElementById("loop").addEventListener("click", loopPressedHandler);
};

initElement();
