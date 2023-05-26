const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function t() {
  var d = new Date();
  document.getElementById("time").innerHTML = d.toLocaleTimeString();
  document.getElementById("date").innerHTML = `${d.toLocaleDateString("en-US", {
    weekday: "long",
  })} ${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
t();
window.setInterval(t, 1000);
const songs = [
  {
    url: "https://cdn.discordapp.com/attachments/842014909264953354/1111362763739123863/h.mp4",
    len: 209,
  },
  {
    url: "https://cdn.discordapp.com/attachments/842014909264953354/1111351221404565614/hins.mp4",
    len: 330,
  },
  {
    url: "https://cdn.discordapp.com/attachments/842014909264953354/1111398234204676178/ps.mp4",
    len: 289,
  },
  {
    url: "https://cdn.discordapp.com/attachments/842014909264953354/1111398255935373322/ca.mp4",
    len: 237,
  },
];
const video = document.getElementById("video");
function chooseSong() {
  const song = songs[Math.floor(Math.random() * songs.length)];
  video.src = song.url;
  video.play();
}
chooseSong();
video.addEventListener("ended", chooseSong);
chrome.storage.sync.get("options", function (data) {
  if (data.options.static) {
    video.style.display = "none";
    // document.getElementById("bg").style.display = "block";
    // document.getElementsByClassName("clock")[0].style["align-items"] =
    //   "flex-start";
    // document.getElementsByClassName("clock")[0].style.top = "100px";
  } else {
    video.style.display = "block";
    // document.getElementById("bg").style.display = "none";
    // document.getElementsByClassName("clock")[0].style["align-items"] = "center";
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "updateOptions") {
    chrome.storage.sync.set({ options: message.options }, function () {
      if (message.options.static) {
        video.style.display = "none";
        // document.getElementById("bg").style.display = "block";
        // document.getElementsByClassName("clock")[0].style["align-items"] =
        //   "flex-start";
      } else {
        video.style.display = "block";
        video.muted = true;
        // document.getElementById("bg").style.display = "none";
        // document.getElementsByClassName("clock")[0].style["align-items"] =
        //   "center";
      }
      sendResponse({ success: true });
    });
  }
});
