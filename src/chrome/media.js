/**
 * @description on first load the message listeners are not setup so call webcam start explicitly
 */
window.onload = () => {
  const videoElement = document.getElementById("webcam_feed");
  _StartWebCamFeed(videoElement);
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request === "video_input_changed") {
    chrome.storage.sync.get("video", videoObject => {
      const videoElement = document.getElementById("webcam_feed");
      if (videoObject.video) {
        _StartWebCamFeed(videoElement);
      }
    });
  }
});

/**
 * @memberof mediaPermission
 * @description starts the webcam feed
 */
function _StartWebCamFeed(videoElement) {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        chrome.storage.sync.set({ "media": true });
        videoElement.srcObject = stream;
      });
  }
}