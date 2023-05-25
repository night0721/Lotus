function updateTime() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();
  document.getElementsByClassName("clock")[0].innerHTML = `${
    (hours < 10 ? "0" : "") + hours
  }:${(minutes < 10 ? "0" : "") + minutes}:${
    (seconds < 10 ? "0" : "") + seconds
  }`;
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
