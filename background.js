function updateTime() {
  var date = new Date();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;
  document.getElementsByClassName("clock")[0].innerHTML = `${h}:${m}:${s}`;
}
updateTime();
setInterval(updateTime, 1000);
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
    document.getElementById("bg").style.display = "block";
    document.getElementsByClassName("clock")[0].style["align-items"] =
      "flex-start";
    document.getElementsByClassName("clock")[0].style.top = "100px";
  } else {
    video.style.display = "block";
    document.getElementById("bg").style.display = "none";
    document.getElementsByClassName("clock")[0].style["align-items"] = "center";
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "updateOptions") {
    chrome.storage.sync.set({ options: message.options }, function () {
      if (message.options.static) {
        video.style.display = "none";
        document.getElementById("bg").style.display = "block";
        document.getElementsByClassName("clock")[0].style["align-items"] =
          "flex-start";
      } else {
        video.style.display = "block";
        video.muted = true;
        document.getElementById("bg").style.display = "none";
        document.getElementsByClassName("clock")[0].style["align-items"] =
          "center";
      }
      sendResponse({ success: true });
    });
  }
});
