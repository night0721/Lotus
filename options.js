chrome.storage.sync.get("options", function (data) {
  document.getElementById("save").addEventListener("click", function () {
    var checkbox = document.getElementById("static");
    chrome.runtime.sendMessage(
      {
        type: "updateOptions",
        options: {
          static: checkbox.checked,
        },
      },
      function (response) {
        if (response.success) {
          console.log("Options saved");
        }
      }
    );
  });
});
