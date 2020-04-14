import * as tmPose from '@teachablemachine/pose';


/**
 * @description on first load the message listeners are not setup so call webcam start explicitly
 */
window.onload = () => {
  init();
  // const videoElement = document.getElementById("webcam_feed");
  // _StartWebCamFeed(videoElement);
}

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request === "video_input_changed") {
//     chrome.storage.sync.get("video", videoObject => {
//       const videoElement = document.getElementById("webcam_feed");
//       if (videoObject.video) {
//         _StartWebCamFeed(videoElement);
//       }
//     });
//   }
// });

// /**
//  * @memberof mediaPermission
//  * @description starts the webcam feed
//  */
// function _StartWebCamFeed(videoElement) {
//   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then(stream => {
//         chrome.storage.sync.set({ "media": true });
//         videoElement.srcObject = stream;
//       });
//   }
// }

let model, webcam;

async function init() {
  const modelURL = './model/model.json';
  const metadataURL = './model/metadata.json';

  model = await tmPose.load(modelURL, metadataURL);
  webcam = new tmPose.Webcam(200, 200, true);
  
  await webcam.setup();

  webcam.play();
  window.requestAnimationFrame(loop);
}


async function loop(timestamp) {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  // Prediction #1: run input through posenet
  // estimatePose can take in an image, video or canvas html element
  const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
  // Prediction 2: run input through teachable machine classification model
  const prediction = await model.predict(posenetOutput);
  //chrome.runtime.sendMessage(prediction);
  var counter = -1;
  var flag = 0;
  chrome.storage.sync.get("counter", (counterObject) => {
    counter = counterObject.counter;
    if(prediction[0].probability < prediction[1].probability){
      chrome.storage.sync.set({ "counter": counter + 1 });
    }
  });  
}

async function updateCounter(counter){
  chrome.storage.sync.set({ "counter": counter + 1 });
}