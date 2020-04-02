if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      chrome.storage.sync.set({ "media": true }, function(){
        console.log("permission granted");
      });
      const videoElement = document.getElementById("webcam_feed");
      videoElement.srcObject = stream;
    });
}