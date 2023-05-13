/* document.oncontextmenu = function (event) {
   event.preventDefault();
   * }; */
var cookable = window.location.search;
var cookedRecords = document.cookie.split(";");
window.cookin = (s) => {};
window.cookout = (f) => {};

window.onload = () => {
  [...document.querySelectorAll(".colorful-button, .dark-button")].forEach(
    (b) => (b.onkeydown = () => b.blur())
  );
  document.getElementById("overall-restyle").onclick = changeTheme;
};

var baseServer = window.location.origin + window.location.pathname;

// 发音
var audiourl = "audio/";

function getAudioEnclosure() {
  var soundSrcs = {};
  function res(w) {
    if (soundSrcs[w]) {
      return soundSrcs[w];
    } else {
      var o = document.createElement("audio");
      o.src = audiourl + w + ".mp3";
      soundSrcs[w] = o;
      return o;
    }
  }
  return res;
}

var getAudio = getAudioEnclosure();

function getOrElse(o, l) {
  if (l.length == 0) return o;
  else if (o == undefined) return o;
  else return getOrElse(o[l[0]], l.slice(1));
}

var pluginStorage = getOrElse(window, ["chrome", "storage", "local"]);
if (pluginStorage) {
  window.cookout = (f) =>
    chrome.storage.local.get(["exciseuri"], (s) => {
      f(s.exciseuri);
    });
  window.cookin = (s) => {
    chrome.storage.local.set({ exciseuri: s }, () =>
      console.log(" <-localdata set")
    );
  };
} else if (cookable.length <= 5 && cookedRecords[0].length > 0) {
  cookable = cookedRecords[0];
}
if (cookable.length > 5) {
  window.cookout = (f) => f(cookable);
}

// 切换主题
window.currentThemeIndex = 0;

function changeTheme(themeNum = -1) {
  const themeList = [
    { noter: "Switch To DARK Theme", href: "css/milkyway-light.css" },
    { noter: "Switch To LIGHT Theme", href: "css/milkyway-dark.css" },
  ];
  let css = document.getElementById("overall-style");
  let styleButton = document.getElementById("overall-restyle");
  let last = styleButton.attributes["currentThemeIndex"];
  window.currentThemeIndex = last ? parseFloat(last.value) : 1;

  let tmNew =
    (themeNum >= 0 ? themeNum : window.currentThemeIndex + 1) %
    themeList.length;

  if (!themeList[tmNew]) {
    console.log(`Error in theme change to ${tmNew}`);
    return;
  } else
    console.log(
      `Theme switched to ${tmNew} replacing ${window.currentThemeIndex}`
    );

  styleButton.value = themeList[tmNew].noter;
  styleButton.onclick = (e) => changeTheme(-1);
  css.href = themeList[tmNew].href;
  styleButton.setAttribute("currentThemeIndex", tmNew);
  window.currentThemeIndex = tmNew;
}
