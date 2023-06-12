if (is_menu_prevent) {
  document.getElementById("demo-container").oncontextmenu = function () {
    return false;
  };
}
document.getElementById("go-down").onclick = (e) => gotobottom();
var demo = document.getElementById("demo");
function gotobottom() {
  var demo = document.getElementById("demo");
  demo.scrollIntoView();
}
var allFiller = new Object();
var fillObjs = new Array();
var all_fillObjs = [];
var wordSet = [];
var state_in_excise = false;
var reviewLocation = window.location.origin + window.location.pathname;
var excise_cheat1 = 0;
var excise_cheat2 = 1;
var remove_dup = true;
var url1 = window.location.origin + window.location.pathname;
var urlData = "data://application/json;charset=utf-8,";
function getDataString(a, l, u = urlData) {
  var eea = encodeURIComponent(encodeURIComponent(getDate() + "\n" + a));
  var eel = encodeURIComponent(encodeURIComponent(JSON.stringify(l)));
  u +=
    "?article=" +
    eea +
    "&redundant=" +
    eel +
    "&theme=" +
    window.currentThemeIndex;
  return u;
}
function loadString(search, fileName = " .txt") {
  let article = search.match(/article=([^&]+)/);
  let lastExclude = search.match(/redundant=([^&]+)/);
  let theme = search.match(/theme=([^&]+)/);
  let jsonAddr = search.match(/jsonAddr=([^&]+)/);
  let styleinfo = search.match(/styleinfo=([^&]+)/);
  var res = {};
  if (jsonAddr) {
    res.jsonAddr = decodeURIComponent(jsonAddr[1]);
  } else if (styleinfo) {
    res.jsonStr = decodeURIComponent(styleinfo[1]);
  }
  if (article) {
    article = article[1];
    res.article = decodeURIComponent(article);
  } else res.article = "";
  if (lastExclude) {
    res.lastExclude = lastExclude[1];
    res.redundantList = JSON.parse(decodeURIComponent(res.lastExclude));
  } else res.redundantList = [];
  if (theme) res.theme = theme[1];
  res.submitter = function (switcharticle = true) {
    if (res.jsonAddr) {
      fetch(res.jsonAddr)
        .then((r) => r.text())
        .then((t) => loadJson(t).submitter());
      return;
    } else if (res.jsonStr) {
      loadJson(decodeURIComponent(res.jsonStr)).submitter();
    }
    if (res.article && switcharticle) {
      window.article = res.article;
      document.getElementById("maininput").value = res.article;
      sendText(false);
    }
    if (res.redundantList) {
      window.lastExclude = res.lastExclude;
      window.redundantList = [
        ...new Set([...window.redundantList, ...res.redundantList]),
      ];
      excludeRedundant();
    }
    listWords();
    if (res.theme) changeTheme(res.theme);
  };
  if (!res.article) {
    if (fileName.endsWith(".html")) {
      search = search.replace(/\n/g, "");
      search = search.replace(
        /<(?!((\s?h1)|(\s?h2)|(\s?h3)|(\s?h4)|(\s?h5)|(\s?h6)|(\s?i)|(\s?p)|(\s?strong)|(\s?em)))(\n)?[^>]+>/g,
        ""
      );
      search = search.replace(/class\s*?=\s*?(["])[\s\S]*?\1/g, "");
      search = search.replace(/id\s*?=\s*?(["])[\s\S]*?\1/g, "");
    }
    document.getElementById("maininput").value = search;
    sendText();
  }
  return res;
}
function loadJson(jsonStr, fileName) {
  var res = JSON.parse(jsonStr);
  if (!res.article) {
    Qmsg.error("😶请检查文件内容格式，未读取到文本", { showClose: true });
  }
  res.submitter = function (switcharticle = true) {
    if (res.dict) {
      document.getElementById("nonsense-voting").value = res.dict;
      use_dict_json(res.dict);
    }
    if (res.article && switcharticle) {
      window.article = res.article;
      document.getElementById("maininput").value = res.article;
      sendText();
    }
    if (res.redundantList) {
      window.lastExclude = res.redundantList;
      window.redundantList = [
        ...new Set([...window.redundantList, ...res.redundantList]),
      ];
      excludeRedundant();
    }
    if (res.selected) {
      window.lastSelected = res.selected;
      window.selected = [...new Set([...window.selected, ...res.selected])];
      selected_handle(window.selected);
    }
    if (res.theme) changeTheme(res.theme);
    listWords(false);
  };
  return res;
}
function saveJson(affectSaver = true) {
  var res = {};
  res.dict = selectedlist.join("+");
  res.article = document.getElementById("maininput").value;
  res.redundantList = window.redundantList;
  res.selected = window.selected;
  res.theme = window.currentThemeIndex;
  resURI = encodeURIComponent(JSON.stringify(res));
  if (affectSaver) {
    affectHead = document.getElementById("changeable-head");
    affectHead.href = urlData + resURI;
    affectHead.download = "AXV_" + getDate() + ".json";
  }
  window.cookin(JSON.stringify(res));
  return resURI;
}
var urlLoader = loadString(window.location.search);
if (urlLoader.article || urlLoader.redundantList) {
  urlLoader.submitter();
}
document.getElementById("local-list").onclick = (e) => fReader(false, true);
document.getElementById("local-loader").onclick = (e) => fReader(true, false);
function fReader(swa = true, mul = false) {
  var f = document.createElement("input");
  f.type = "file";
  if (mul) {
    f.accept = ".json";
    f.multiple = "multiple";
  } else f.accept = ".json , .txt,.html";
  f.onchange = (e) => {
    console.log("读取文件");
    Array.from(f.files).forEach((fi) => {
      let fun = fi.name.endsWith(".json") ? loadJson : loadString;
      fi.text()
        .then((t) => fun(t, fi.name))
        .then((loadObj) => loadObj.submitter(swa));
    });
  };
  f.click();
}
document.getElementById("changeable-head").onclick = (e) => {
  var c = confirm("\n【以防误触】，确认导出");
  if (c) {
    refreshRedundant();
    saveJson(true);
  }
};
function refreshRedundant() {
  var redObjs = [...demo.getElementsByClassName("word-filler-done")];
  redundantList = [];
  redObjs.forEach((e) => {
    redundantList.push(elemInfo(e).voc);
  });
  var selectObjs = [...demo.getElementsByClassName("selecTcss")];
  selected = [];
  selectObjs.forEach((e) => {
    selected.push(e.innerText.replace(/\ /g, ""));
  });
}
function getDate() {
  var now = new Date();
  var dateStr = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .replace(/\....Z$/g, "");
  dateStr = dateStr.split("/").join("-");
  dateStr = dateStr.split(":").join("-");
  dateStr = dateStr.split(" ").join("_");
  return dateStr;
}
function refreshChangeableMilkyway() {
  var head = document.getElementById("changeable-head");
  var mainString = document.getElementById("maininput").value;
  var reviewLocation = getDataString(mainString, window.redundantList);
  head.href = reviewLocation;
  head.download = "AXV_" + getDate() + ".milkyway";
  window.cookin(decodeURIComponent(reviewLocation));
}
function refreshChangeable() {
  saveJson(true);
}
function fillIn(nLast, n, l, s, label = "word-filler") {
  var insThis = document.createElement("span");
  var orgWord = s.slice(n, n + l);
  insThis.className = label;
  insThis.id = label + "-" + n;
  insThis.innerHTML = orgWord;
  var preWord = s.slice(nLast, n);
  var s1 = preWord + insThis.outerHTML;
  var res = new Object();
  res.objId = insThis.id;
  res.inText = orgWord;
  res.enlonged = s1;
  return res;
}
function fillAll(s, words) {
  var res = new Object();
  res.wordList = [];
  var sorted = words.sort((a, b) => (a[0] >= b[0] ? 1 : -1));
  var nLast = 0;
  var s1 = "";
  for (var i in sorted) {
    var n = sorted[i][0];
    var l = sorted[i][1];
    var wd = sorted[i][2];
    var iRes = fillIn(nLast, n, l, s);
    s1 = s1 + iRes.enlonged;
    delete iRes.enlonged;
    res.wordList.push(iRes);
    nLast = n + l;
  }
  res.enlonged = s1 + s.slice(nLast);
  res.enlonged = res.enlonged.split("\n").join("<br>");
  return res;
}
function fillAllLabeled(s, words) {
  var res = new Object();
  var wordList = [];
  var sorted = words.sort((a, b) => {
    return a[0] - b[0];
  });
  for (i = 0; i < sorted.length - 1; i++) {
    if (sorted[i][0] + sorted[i][1] - sorted[i + 1][0] > 0) {
      sorted.splice(i + 1, 1);
      i--;
    }
  }
  var nLast = 0;
  var s1 = "";
  for (var i in sorted) {
    var charHead = sorted[i][0];
    var charLength = sorted[i][1];
    var voc = sorted[i][2];
    var label = sorted[i][3];
    var iRes;
    if (label) iRes = fillIn(nLast, charHead, charLength, s, label);
    else iRes = fillIn(nLast, charHead, charLength, s);
    iRes.voc = voc;
    s1 = s1 + iRes.enlonged;
    wordList.push(iRes);
    nLast = charHead + charLength;
  }
  res.enlonged = s1 + s.slice(nLast);
  res.enlonged = res.enlonged.split("\n").join("<br>");
  wordDict = new Object();
  for (w of wordList) wordDict[w.objId] = w;
  res.wordDict = wordDict;
  return res;
}
var s = document.getElementById("maininput").value;
var words1 = allWords(s);
function allWords(s) {
  let reWord = /([a-zA-z]+'([a-z]+)?)|(([a-zA-Z]+)+-*)+|([a-zA-Z]+)/g;
  var iterAll = s.matchAll(reWord);
  var words = [];
  for (var w of iterAll) {
    words.push([w.index, w[0].length, w[0]]);
  }
  return words;
}
var phr_res = [];
var phr_in_text = [];
function allPhrases(s) {
  if (s) {
    let reWord = /([a-zA-z]+'([a-z]+)?)|(([a-zA-Z]+)+-*)+|([a-zA-Z]+)/g;
    var iterAll = s.matchAll(reWord);
    var words = [];
    for (var w of iterAll) {
      words.push([w.index, w[0].length, w[0]]);
    }
    for (var w of words) {
      var ww = w[2];
      var wNew = word2rules(ww, ruleArray);
      phr_res.push(wNew);
    }
    phr_in_text = [];
    mark_phr();
    let phr_111 = [];
    for (n = 0; n < phr_in_text.length; n++) {
      let reg_p = phr_in_text[n][0];
      var iterAll = s.matchAll(reg_p);
      for (var w of iterAll) {
        phr_111.push([w.index, w[0].length, w[0], phr_in_text[n][1]]);
      }
    }
    return phr_111;
  }
}
function useRule(s, r, st = [], last = new Object()) {
  if (!s || s.length == 0) return null;
  else if (r.length == 0) return s;
  else {
    var ss = s[s.length - 1];
    var sHead = s.slice(0, s.length - 1);
    var r0 = r[0];
    if (r0 == ";") return s;
    if (r0 == "-") {
      st.push(ss);
      last.worker = (f) => (f(ss) ? sHead : null);
      last.reader = (a) => (x) => x == a;
      return useRule(sHead, r.slice(1), st, last);
    } else if (r0 == "+") {
      last.worker = (f) => s + f();
      last.reader = (a) => () => a;
      return useRule(s, r.slice(1), st, last);
    } else if (r0 == "$") {
      if (st.length == 0) return null;
      var pp = st.pop();
      s = s + pp;
      return useRule(s, r.slice(1), st, new Object());
    } else if (r0 == "%") {
      last.reader = transSig;
      return useRule(s, r.slice(1), st, last);
    } else if (r0 == "/") {
      if (st.length == 0) return null;
      else {
        st.pop();
        return useRule(s, r.slice(1), st, {});
      }
    } else {
      s = last.worker(last.reader(r0));
      return useRule(s, r.slice(1), st, last);
    }
  }
  function transSig(a) {
    if (a == "2")
      return (x) => {
        return "bcdfghjklmnpqrstvwxyz".includes(x);
      };
    if (a == "1")
      return (x) => {
        return "aeiou".includes(x);
      };
    if (a == "s")
      return (x) => {
        return st.length > 1 && st[st.length - 1] == st[st.length - 2];
      };
    if (a == "g") return (x) => s[s.length - 1];
  }
}
function word2rules(word, rules) {
  var wordsNew = [word];
  for (var r of rules) {
    var w = useRule(word, r);
    if (w) wordsNew.push(w);
  }
  return wordsNew;
}
function wordsIter(words, rules, iter = 2) {
  if (iter <= 0) return words;
  var res = [];
  for (w of words) res = res.concat(word2rules(w, rules).slice(1));
  return words.concat(wordsIter(res, rules, iter - 1));
}
function ruleAllWords(words, rules, filterWord, label = "word-filler") {
  var res = [];
  for (var w of words) {
    var wp = w[0];
    var wl = w[1];
    var ww = w[2];
    var wNew = word2rules(ww, rules);
    var iValid = wNew.findIndex(filterWord.good);
    var iBad = wNew.findIndex(filterWord.bad);
    if (iValid >= 0 && (iValid < iBad || iBad < 0)) {
      res.push([wp, wl, wNew[iValid], label]);
    }
  }
  return res;
}
function ruleAllPhrases(phrases = [], filterWord, label = "word-filler") {
  var res = [];
  for (var w of phrases) {
    var wp = w[0];
    var wl = w[1];
    var ww = w[2];
    var wo = w[3];
    var iValid = [wo].findIndex(filterWord.good);
    var iBad = [wo].findIndex(filterWord.bad);
    if (iValid >= 0 && (iValid < iBad || iBad < 0)) {
      res.push([wp, wl, wo, label]);
    }
  }
  return res;
}
if (!JSON.parse(localStorage.getItem("all-users"))) {
  var users = ["default"];
  localStorage.setItem("all-users", JSON.stringify(users));
}
var now_knownList = "knownList";
if (!JSON.parse(localStorage.getItem("knownList"))) {
  let users = ["default"];
  let now_user = "default";
  localStorage.setItem("knownList", JSON.stringify(knownList));
  localStorage.setItem("all-users", JSON.stringify(users));
  localStorage.setItem("now-user", JSON.stringify(now_user));
  if (JSON.parse(localStorage.getItem("badList"))) {
    localStorage.setItem("knownList", localStorage.getItem("badList"));
    localStorage.removeItem("badList");
  }
} else {
  var user = document.getElementById("user");
  var all_users = JSON.parse(localStorage.getItem("all-users"));
  if (all_users.length > 1) {
    for (i = 1; i < all_users.length; i++) add_option(all_users[i], i);
    var now_user = JSON.parse(localStorage.getItem("now-user"));
    document.getElementById("user").value = now_user;
    console.log("当前用户", now_user);
  }
}
var user_add_word = {};
if (!JSON.parse(localStorage.getItem("add-word"))) {
  let l_word = {};
  localStorage.setItem("add-word", JSON.stringify(l_word));
} else {
  user_add_word = JSON.parse(localStorage.getItem("add-word"));
}
var user_add_phr = {};
if (!JSON.parse(localStorage.getItem("add-phr"))) {
  let l_phr = {};
  localStorage.setItem("add-phr", JSON.stringify(l_phr));
} else {
  user_add_phr = JSON.parse(localStorage.getItem("add-phr"));
}
function keywords() {
  return Object.keys(dictInUse());
}
function getSimpleFilter() {
  var dictIndices = keywords();
  var BadList = JSON.parse(localStorage.getItem(now_knownList));
  return {
    good: (x) => dictIndices.includes(x),
    bad: (x) => BadList.includes(x),
  };
}
function elemInfo(elem, allFiller1 = allFiller) {
  var eid = elem.id;
  var info = allFiller1.wordDict[eid];
  info.audio = getAudio(info.voc);
  return info;
}
document.getElementById("main-clicker").onclick = sendText;
document.getElementById("clear-clicker").onclick = () => {
  document.getElementById("maininput").value = "";
  is_load_article = false;
};
var is_load_article = false;
function sendText(do_jump = true, removeDup = remove_dup) {
  var s = document.getElementById("maininput").value;
  isSort = false;
  document.getElementById("toUPcase").innerHTML = "↑";
  setTimeout(() => {
    document.getElementById("explain-outer").scrollTop = 0;
  }, 200);
  contextList = [];
  mark_reset();
  document.getElementById("font-size").value = 25;
  document.getElementById("demo").style.fontSize = "25px";
  console.log("开始处理文本");
  s = s.replace(/([a-zA-Z]+)+-\n([a-zA-Z]+)/g, "$1$2\n");
  if (!s) do_jump = false;
  if (do_jump) {
    demo.scrollIntoView();
  }
  currentFill = 0;
  last_currentFill = 0;
  state_in_excise = false;
  var words = allWords(s);
  var wordsValid = ruleAllWords(words, ruleArray, getSimpleFilter());
  var phrasesValid = [];
  if (selectedlist.indexOf("dict_phr") !== -1) {
    var s = document.getElementById("maininput").value;
    var phrases = allPhrases(s);
    phrasesValid = ruleAllPhrases(phrases, getSimpleFilter());
  }
  var valid = phrasesValid.concat(wordsValid);
  allFiller = fillAllLabeled(s, valid);
  demo.innerHTML = "";
  demo.innerHTML = allFiller.enlonged;
  fillObjs = [];
  Object.keys(allFiller.wordDict).forEach((e) =>
    fillObjs.push(document.getElementById(e))
  );
  all_fillObjs = fillObjs;
  if (removeDup) refineList();
  excludeRedundant();
  listWords(false);
  if (isSpan) {
    document.getElementById("Chinese").value = "中文-默认";
    isShow = "default";
    isSpan = false;
  }
  if (document.getElementById("explain-head").childNodes.length > 0) {
    open_words_mask();
    is_load_article = true;
  }
}
function tailCover(s, head = 1, tail = 1) {
  var longtail = s.length - head;
  tail = longtail >= tail ? tail : longtail;
  var starNum = longtail - tail;
  starNum = starNum >= 0 ? starNum : 0;
  return (
    s.slice(0, head) + "_".repeat(starNum) + s.slice(s.length - tail, s.length)
  );
}
function elemCover(elem, head = 1, tail = 1) {
  var s = allFiller.wordDict[elem.id].inText;
  elem.innerHTML =
    "<span class='red-zone'>" + tailCover(s, head, tail) + "<span>";
}
function coverAll(allFiller1 = allFiller) {
  for (o of fillObjs) {
    elemCover(o);
  }
}
var currentFill = 0;
var currentElem;
var currentInput = "";
var currentExplain = "";
function excludeRedundant() {
  fillObjs.forEach((e) => {
    if (redundantList.includes(elemInfo(e).voc)) {
      elemReveal(e);
      e.className = "word-filler-done";
    }
  });
}
function word2board(w) {
  if (navigator.clipboard) navigator.clipboard.writeText(w);
}
function elemExplain(
  elem,
  cover = true,
  head = excise_cheat1,
  tail = excise_cheat2
) {
  var dictList = dictInUse();
  var info = elemInfo(elem);
  var voc = info.voc;
  var inText = info.inText;
  if (inText.toLowerCase() == voc) inText = "";
  var explain = getDef(dictList[voc], cover);
  if (cover) var explainHead = tailCover(voc, head, tail);
  else {
    var explainHead = voc + " &#8594 " + inText;
    if (is_mdx_show) go_to_mdx(voc);
    if (is_voc) {
      info.audio.currentTime = 0;
      info.audio.play();
    }
    if (is_copy) word2board(voc);
  }
  if (is_explain) {
    document.getElementById("explain-area").innerHTML =
      `<div id="exp-head">${explainHead}</div>` + explain;
    showIndexInfo(currentFill, fillObjs.length);
  }
}
function elemReveal(elem) {
  var info = elemInfo(elem);
  var inText = info.inText;
  elem.innerHTML = inText;
  elem.className = "word-filler-done";
  elem.style.color = "";
}
var elemNoter = document.createElement("span");
elemNoter.className = "current-noter-container";
elemNoter.id = "current-noter-container-id";
var bringPreserve = demo.parentNode.getClientRects()[0].height / 3;
function elemBring(o, reserve = bringPreserve, fill = true) {
  var omo = document.getElementById(o.id);
  var t = o.offsetTop - document.getElementById("demo").offsetTop;
  demo.parentNode.scrollTop = t - reserve * 2;
  if (fill) omo.className = "word-filler-current";
  else {
    o.prepend(elemNoter);
  }
}
function elemBringMinor(o, reserve = bringPreserve) {
  var exArea = document.getElementById("explain-area");
  var objElem = document.getElementById(o.id + "-exp");
  if (!objElem) return false;
  var t = objElem.offsetTop;
  exArea.parentNode.scrollTop = t - reserve;
  return true;
}
function elemClear(o, head = excise_cheat1, tail = excise_cheat2) {
  currentInput = "";
  elemCover(o, head, tail);
  elemBring(o);
  elemExplain(o, true);
}
function elemFill(elem, s) {
  console.log("s", s);
  var info = elemInfo(elem);
  var inText = info.inText;
  var covered = tailCover(inText);
  elem.innerHTML = s;
  if (s == inText.toLowerCase()) {
    elemModify(elem);
    fillNext(1, false);
  } else {
    elemExplain(elem, true);
    covered = covered.slice(s.length);
    document.getElementById("exp-head").innerHTML = s + covered;
    elem.className = "word-filler-current";
  }
}
function elemCheck(e) {
  var info = elemInfo(e);
  var inText = info.inText;
  return e.innerText.toLowerCase() == inText.toLowerCase();
}
function elemModify(e, inFilling = true) {
  if (!elemCheck(e)) {
    if (inFilling) {
      e.className = "word-filler-current";
    } else e.className = "word-filler";
    return false;
  } else {
    elemReveal(e);
    isClozeNow = false;
    return true;
  }
}
function fillCurrent() {
  var elem = fillObjs[currentFill];
  elemBring(elem);
  elemClear(elem);
}
function startFill() {
  if (state_in_excise) {
    Qmsg.warning("正在填空");
    return;
  }
  state_in_excise = true;
  [...demo.getElementsByClassName("word-filler-current")].forEach((e) => {
    e.className = "word-filler";
  });
  fillObjs = [...demo.getElementsByClassName("word-filler")];
  currentFill = 0;
  coverAll();
  fillNext(1, false, false);
  fillPrevious(1, false, false);
  if (!lastExclude)
    alert(
      "Finish the cloze using keyboard, pressing: \n ,/. to move back/forth; \n BACKSPACE/SPACE to clear the buffer;\n  1 / ENTER to show the partial / full solution of the blank."
    );
}
document.getElementById("excise-clicker").onclick = startFill;
var isNone = false;
function fillNext(pace = 1, check = true, voc = true) {
  isClozeNow = false;
  clear_current_style_1();
  clear_current_style_2();
  re_is_done();
  if (isNone) {
    var ele = fillObjs[currentFill];
    ele.className = "";
    isNone = false;
  }
  if (check) {
    if (!elemCheck(fillObjs[last_currentFill])) {
      input_err();
      Qmsg.error("😣上一处 输入不正确");
    }
  }
  currentFill = (currentFill + pace) % fillObjs.length;
  last_currentFill = currentFill;
  currentInput = "";
  var elem = fillObjs[currentFill];
  if (!elemCheck(fillObjs[currentFill])) {
    input_err();
    isClozeNow = true;
    elemCover(fillObjs[currentFill]);
  }
  if (document.getElementById(elem.id).className == "word-filler-done") {
    isDone = true;
  }
  if (document.getElementById(elem.id).className == "word-filler-dup") {
    isDup = true;
  }
  if (document.getElementById(elem.id).className == "") {
    isNone = true;
  }
  cloze_now(elem);
  if (isClozeNow) spacebar = true;
  else spacebar = false;
  elemBring(elem, 100);
  var elemState = true;
  if (voc) elemExplain(elem, !elemState);
}
function fillPrevious(pace = 1, check = true, voc = true) {
  isClozeNow = false;
  clear_current_style_1();
  clear_current_style_2();
  re_is_done();
  if (isNone) {
    var ele = fillObjs[currentFill];
    ele.className = "";
    isNone = false;
  }
  if (check && !is_cloze_last_clear) {
    if (!elemCheck(fillObjs[last_currentFill])) {
      input_err();
      Qmsg.error("😣上一处 输入不正确");
    }
  }
  currentFill =
    (((currentFill - pace) % fillObjs.length) + fillObjs.length) %
    fillObjs.length;
  last_currentFill = currentFill;
  currentInput = "";
  var elem = fillObjs[currentFill];
  if (!elemCheck(fillObjs[currentFill])) {
    input_err();
    isClozeNow = true;
    elemCover(fillObjs[currentFill]);
  }
  if (document.getElementById(elem.id).className == "word-filler-done") {
    isDone = true;
  }
  cloze_now(elem);
  if (isClozeNow) spacebar = true;
  else spacebar = false;
  if (document.getElementById(elem.id).className == "word-filler-dup") {
    isDup = true;
  }
  if (document.getElementById(elem.id).className == "") {
    isNone = true;
  }
  if (state_in_excise && is_cloze_last_clear) {
    isClozeNow = true;
    elemCover(fillObjs[currentFill]); // 变填空
    console.log("bian tiankong ");
  }
  if (!is_clear_dup) clear_dup();
  elemBring(elem);
  var elemState = true;
  if (!elemCheck(elem)) {
    elemState = false;
  }
  if (voc) elemExplain(elem, !elemState);
}
function showIndexInfo(i, n) {
  var ar = document.getElementById("explain-area");
  var info = document.createElement("h5");
  info.innerHTML = " ---- " + (i + 1) + " of " + n + " ---- ";
  ar.appendChild(info);
  var listCaller = document.createElement("div");
  listCaller.className = "dark-button";
  listCaller.onclick = (e) => listWords(true);
  listCaller.innerText = "Back To Word List";
  ar.appendChild(listCaller);
}
currentElem = fillObjs[currentFill];
var partialRevealer = getRevealer();
function charAdder(c) {
  currentInput = currentInput + c;
  elemFill(fillObjs[currentFill], currentInput);
}
var spacebar = false;
var timer = null;
var nav_btn_condition;
function transKeys(e) {
  function k2char(k) {
    return "abcdefghijklmnopqrstuvwxyz"[k - 65];
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == 32) {
    e.preventDefault();
    if (is_nav_show && is_buttons_show) nav_btn_condition = 1;
    if (!is_nav_show && is_buttons_show) nav_btn_condition = 2;
    if (!is_nav_show && !is_buttons_show) nav_btn_condition = 3;
    console.log("Ctrl + Shift + Space ");
    // is_add_words = true;
    open_add_words();
    return;
  }
  if (!is_add_words) {
    var maininput = document.getElementById("maininput");
    if (maininput !== document.activeElement) {
      if (e.ctrlKey && e.keyCode == 90) {
        e.preventDefault();
        console.log("Ctrl + Z");
        if (contextList.length) {
          var lsat_context = contextList[contextList.length - 1];
          if (lsat_context.id.includes("exp")) {
            document.getElementById(
              lsat_context.id.replace(/-exp/g, "")
            ).className = lsat_context.className;
          } else {
            document.getElementById(lsat_context.id).className =
              lsat_context.className;
          }
          fresh_listWords();
          if (lsat_context.check_current) currentFill++;
          contextList.pop();
          var knownList_1 = JSON.parse(localStorage.getItem(now_knownList));
          knownList_1.splice(
            knownList_1.indexOf(contextList[contextList.length - 1]),
            1
          );
          localStorage.setItem(now_knownList, JSON.stringify(knownList_1));
        }
        return;
      }
      if (e.ctrlKey && e.keyCode == 88) {
        e.preventDefault();
        console.log("Ctrl + X , 隐藏/显示buttons");
        if (is_buttons_show && is_nav_show) {
          hide_nav();
          hide_buttons();
          is_nav_show = true;
        } else if (is_buttons_show && !is_nav_show) {
          hide_buttons();
        } else if (!is_buttons_show && is_nav_show) {
          show_nav();
          show_buttons();
        } else if (!is_buttons_show && !is_nav_show) show_buttons();
        if (!is_buttons_show && is_mdx_high) {
          mdx_div.style.top = 0;
          mdx_div.style.height = "100vh";
        } else if (is_buttons_show && is_mdx_high)
          mdx_div.style.height = "94.5vh";
        return;
      }
      if (e.ctrlKey && e.keyCode == 65) {
        e.preventDefault();
        console.log("Ctrl + A , 宽点");
        wide_more();
        return;
      }
      if (e.ctrlKey && e.keyCode == 83) {
        e.preventDefault();
        console.log("Ctrl + S , 设置");
        open_setting();
        return;
      }
      if (e.ctrlKey && e.keyCode == 68) {
        e.preventDefault();
        console.log("Ctrl + D , 清除/恢复重复生词的标注");
        if (!is_clear_dup) clear_dup();
        else add_dup();
        return;
      }
      if (e.ctrlKey && e.keyCode == 77) {
        e.preventDefault();
        console.log("Ctrl + M , 屏蔽该词");
        add_to_knownList();
        fillNext(1, false, false);
        if (is_mdx_show)
          go_to_mdx(
            document.getElementsByClassName("word-filler-current")[0].innerText
          );
        return;
      }
      if (e.ctrlKey && e.keyCode == 66) {
        e.preventDefault();
        console.log("Ctrl + B , Local Mdx ");
        mdx_show();
        return;
      }
    }
    if (65 <= e.keyCode && e.keyCode <= 90) {
      if (isClozeNow) charAdder(k2char(e.keyCode));
    } else if (e.keyCode == 188 || e.keyCode == 37) {
      e.stopPropagation();
      fillPrevious();
    } else if (e.keyCode == 190 || e.keyCode == 13 || e.keyCode == 39) {
      fillNext();
    } else if (e.keyCode == 8) {
      if (isClozeNow) {
        function truncate() {
          return currentInput.split("").slice(0, -1).join("");
        }
        console.log("退一位", truncate());
        elemFill(fillObjs[currentFill], truncate());
        currentInput = truncate();
      }
    } else if (e.keyCode == 32) {
      e.preventDefault();
      e.stopPropagation();
      if (document.querySelectorAll(".word-filler").length) {
        if (!spacebar) {
          elemClear(fillObjs[currentFill]);
          elemBring(fillObjs[currentFill]);
          spacebar = true;
          isClozeNow = true;
        } else {
          var info = elemInfo(fillObjs[currentFill]);
          var inText = info.inText;
          fillObjs[currentFill].innerHTML = inText;
          fillObjs[currentFill].className = "word-filler-current";
          spacebar = false;
          isClozeNow = false;
        }
      }
    } else if (e.keyCode == 53) {
      elemReveal(fillObjs[currentFill]);
      elemExplain(fillObjs[currentFill], false);
      fresh_listWords();
    } else if (e.keyCode == 222) elemExplain(fillObjs[currentFill], false);
    else if (e.keyCode == 49) partialRevealer();
    else if (e.keyCode == 52) {
      var o = fillObjs[currentFill];
      if (o.className != "word-filler-done") {
        elemReveal(o);
      } else o.className = "word-filler";
      fresh_listWords();
    } else if (e.keyCode == 57) fillPrevious(step);
    else if (e.keyCode == 48 || e.keyCode == 40) {
      fillNext(step);
    } else if (e.keyCode == 38) {
      e.preventDefault();
      fillPrevious(step);
    }
  }
}
function mousewheel(e) {
  e = e || window.event;
  var maininput = document.getElementById("maininput");
  if (maininput !== document.activeElement) {
    if (e.shiftKey) return;
    if (e.ctrlKey) {
      e.preventDefault();
      var fonts = document.getElementById("font-size").value;
      document.getElementById("demo").style.fontSize = fonts + "px";
      if (e.wheelDelta < 0 || e.detail < 0) {
        fonts--;
        document.getElementById("demo").style.fontSize = fonts + "px";
        document.getElementById("font-size").value = fonts;
      } else if (e.wheelDelta > 0 || e.detail > 0) {
        fonts++;
        document.getElementById("demo").style.fontSize = fonts + "px";
        document.getElementById("font-size").value = fonts;
      }
    }
  } else {
    if (e.shiftKey) return;
    if (e.ctrlKey) {
      e.preventDefault();
      if (e.wheelDelta < 0 || e.detail < 0) {
        if (fontSize > 14) {
          fontSize = fontSize - 2;
          maininput.style.fontSize = fontSize + "px";
          maininput.style.lineHeight = fontSize + 1 + "px";
        }
      } else if (e.wheelDelta > 0 || e.detail > 0) {
        if (fontSize < 30) {
          fontSize = fontSize + 2;
          maininput.style.fontSize = fontSize + "px";
          maininput.style.lineHeight = fontSize + 1 + "px";
        }
      }
    }
  }
}
document.addEventListener("wheel", mousewheel, { passive: false });
document.body.onkeydown = (e) => transKeys(e);
document.getElementById("maininput").onkeydown = (e) => e.stopPropagation();
document.getElementById("show-answer").onclick = listWords;
document.getElementById("refill-clicker").style.display = "none";
function listWords(excludeLess = true) {
  if (is_clear_dup) add_dup();
  currentInput = "";
  [...demo.getElementsByClassName("word-filler-current")].forEach(
    (e) => (e.className = "word-filler")
  );
  [...demo.getElementsByClassName("word-filler-err")].forEach(
    (e) => (e.className = "word-filler")
  );
  wordSet = [];
  var dictList = dictInUse();
  var words1 = [...demo.getElementsByClassName("word-filler")];
  var words2 = [...demo.getElementsByClassName("word-filler-done")];
  var words3 = [...demo.getElementsByClassName("word-filler-err")];
  if (excludeLess) {
    state_in_excise = false;
    refreshRedundant();
  }
  var words = words1.concat(words2);
  var orgElem = fillObjs[currentFill];
  document.getElementById("show-answer").value =
    "Pause: " + words1.length + "/" + (words.length + words3.length);
  res = "";
  for (w of words) {
    var r = document.createElement("p");
    var info = elemInfo(w);
    wordSet.push(info.voc);
    w.innerHTML = info.voc;
    w.id += "-exp";
    r.innerHTML = w.outerHTML + " " + getDef(dictList[info.voc]);
    w.innerHTML = info.inText;
    w.id = info.objId;
    res = res + r.outerHTML;
  }
  function ws2head(wds) {
    wds.forEach((o) => {
      var oHead = o.cloneNode();
      oHead.innerText = elemInfo(o).voc;
      headDiv.appendChild(oHead);
      headDiv.append(" ");
      oHead.onclick = () => {
        wordInfo = elemInfo(o);
        wordInfo.audio.play();
        word2board(wordInfo.voc);
        var cNew = fillObjs.findIndex((e) => e == o);
        if (cNew && cNew >= 0) {
          currentFill = cNew;
        }
        if (navigator.clipboard) navigator.clipboard.writeText(elemInfo(o).voc);
      };
    });
  }
  var headDiv = document.getElementById("explain-head");
  headDiv.innerText = "";
  ws2head(words1);
  ws2head(words2);
  document.getElementById("explain-area").innerHTML = res;
  if (!is_def_show) not_show_def();
  fillObjs = [...demo.querySelectorAll(".word-filler, .word-filler-done")];
  if (orgElem) {
    var cf1 = fillObjs.findIndex((o) => o == orgElem);
    if (cf1 >= 0) currentFill = cf1;
    elemBringMinor(orgElem, 0);
  }
  var allExp = [
    ...document
      .getElementById("explain-area")
      .querySelectorAll(".word-filler,.word-filler-current, .word-filler-done"),
  ];
  allExp.forEach((o) => {
    o.onclick = () => {
      right_position_record(o);
      [...demo.getElementsByClassName("word-filler-current")].forEach(
        (e) => (e.className = "word-filler")
      );
      var oo = document.getElementById(o.id.replace(/-exp$/, ""));
      elemBring(oo, 175, false);
      ooInf = elemInfo(oo);
      ooInf.audio.play();
      var cNew = fillObjs.findIndex((e) => e == oo);
      if (cNew && cNew >= 0) {
        currentFill = cNew;
      }
      if (navigator.clipboard) navigator.clipboard.writeText(ooInf.voc);
    };
  });
  return res;
}

var is_click = false
var right_position_record_o = null
var right_position_record_top = null
function right_position_record(o) {
  is_click = true
  right_position_record_o = o.id
  right_position_record_top = document.querySelector('#explain-container').scrollTop
  console.log('right_position_record_top', right_position_record_top, is_click);
}
function right_position_return() {
  document.querySelector('#explain-container').scrollTop = right_position_record_top
  is_click = false
}

function fresh_listWords() {
  [...demo.getElementsByClassName("word-filler-current")].forEach(
    (e) => (e.className = "word-filler")
  );
  wordSet = [];
  var dictList = dictInUse();
  var words1 = [...demo.getElementsByClassName("word-filler")];
  var words2 = [...demo.getElementsByClassName("word-filler-done")];
  var words = words1.concat(words2);
  res = "";
  for (w of words) {
    var r = document.createElement("p");
    var info = elemInfo(w);
    wordSet.push(info.voc);
    w.innerHTML = info.voc;
    w.id += "-exp";
    r.innerHTML = w.outerHTML + " " + getDef(dictList[info.voc]);
    w.innerHTML = info.inText;
    w.id = info.objId;
    res = res + r.outerHTML;
  }
  document.getElementById("explain-area").innerHTML = res;
  if (!is_def_show) not_show_def();
  function ws2head(wds) {
    wds.forEach((o) => {
      var oHead = o.cloneNode();
      oHead.innerText = elemInfo(o).voc;
      headDiv.appendChild(oHead);
      headDiv.append(" ");
      oHead.onclick = () => {
        [...demo.getElementsByClassName("word-filler-current")].forEach(
          (e) => (e.className = "word-filler")
        );
        wordInfo = elemInfo(o);
        wordInfo.audio.play();
        word2board(wordInfo.voc);
        var cNew = fillObjs.findIndex((e) => e == o);
        if (cNew && cNew >= 0) {
          currentFill = cNew;
        }
        if (navigator.clipboard) navigator.clipboard.writeText(elemInfo(o).voc);
      };
    });
  }
  var headDiv = document.getElementById("explain-head");
  headDiv.innerText = "";
  ws2head(words1);
  ws2head(words2);
  fillObjs = [...demo.querySelectorAll(".word-filler, .word-filler-done")];
  var allExp = [
    ...document
      .getElementById("explain-area")
      .querySelectorAll(".word-filler,.word-filler-current, .word-filler-done"),
  ];
  allExp.forEach((o) => {
    o.onclick = () => {
      [...demo.getElementsByClassName("word-filler-current")].forEach(
        (e) => (e.className = "word-filler")
      );
      var oo = document.getElementById(o.id.replace(/-exp$/, ""));
      elemBring(oo, 75, false);
      ooInf = elemInfo(oo);
      ooInf.audio.play();
      var cNew = fillObjs.findIndex((e) => e == oo);
      if (cNew && cNew >= 0) {
        currentFill = cNew;
      }
      if (navigator.clipboard) navigator.clipboard.writeText(ooInf.voc);
    };
  });
  return res;
}
function fresh_listWords_mark(o = false) {
  if (o) remove_o(mark_word, o);
  var headDiv = document.getElementById("explain-head");
  headDiv.innerText = "";
  no_sort_wds(mark_word);
  if (mark_words_1.length) mark_color_inner(mark_words_1, mark_color_1);
  if (mark_words_2.length) mark_color_inner(mark_words_2, mark_color_2);
  if (mark_words_3.length) mark_color_inner(mark_words_3, mark_color_3);
  if (mark_words_4.length) mark_color_inner(mark_words_4, mark_color_4);
  if (mark_words_5.length) mark_color_inner(mark_words_5, mark_color_5);
  if (mark_words_6.length) mark_color_inner(mark_words_6, mark_color_6);
  function remove_o(arr, o) {
    for (i = 0; i < arr.length; i++) {
      if (o.id == arr[i].id) {
        arr.splice(i, 1);
      }
    }
  }
  function no_sort_wds(wds) {
    wds.forEach((o) => {
      var oHead = o.cloneNode();
      oHead.innerText = elemInfo(o).voc;
      headDiv.appendChild(oHead);
      headDiv.append(" ");
      oHead.onclick = () => {
        wordInfo = elemInfo(o);
        wordInfo.audio.play();
        word2board(wordInfo.voc);
        var cNew = fillObjs.findIndex((e) => e == o);
        if (cNew && cNew >= 0) {
          currentFill = cNew;
        }
        if (navigator.clipboard) navigator.clipboard.writeText(elemInfo(o).voc);
      };
    });
  }
  [...demo.getElementsByClassName("word-filler-current")].forEach(
    (e) => (e.className = "word-filler")
  );
  wordSet = [];
  var dictList = dictInUse();
  var words1 = [...demo.getElementsByClassName("word-filler")];
  var words2 = [...demo.getElementsByClassName("word-filler-done")];
  var words = words1.concat(words2);
  res = "";
  for (w of words) {
    var r = document.createElement("p");
    var info = elemInfo(w);
    wordSet.push(info.voc);
    w.innerHTML = info.voc;
    w.id += "-exp";
    r.innerHTML = w.outerHTML + " " + getDef(dictList[info.voc]);
    w.innerHTML = info.inText;
    w.id = info.objId;
    res = res + r.outerHTML;
  }
  document.getElementById("explain-area").innerHTML = res;
  if (!is_def_show) not_show_def();
}
function refillObjs() {
  fillObjs.forEach((e) => (e.className = "word-filler"));
  return;
}
function getDef(d, cover = false) {
  var res = "";
  if (!cover && d.ipa) {
    res = res + `<span class="ipa">${d.ipa}</span>` + " <br>";
  } else {
    res = res + " <br>";
  }
  if (d.def) {
    res = res + `<span class="def">${d.def}</span>`;
  } else {
    res = res + d;
  }
  return res;
}
function refineList() {
  wordSet = [];
  for (k of Object.keys(allFiller.wordDict)) {
    w = allFiller.wordDict[k];
    if (!wordSet.includes(w.voc)) wordSet.push(w.voc);
    else {
      if (is_dup) document.getElementById(k).className = "word-filler-dup";
      else document.getElementById(k).className = "none-dup";
    }
  }
  fillObjs = [...demo.getElementsByClassName("word-filler")];
  return wordSet;
}
function dictInUse() {
  var inuse = selectedlist.join("+");
  if (selectedlist.indexOf("dict2w") !== -1) inuse += "+user_add_word";
  if (selectedlist.indexOf("dict_phr") !== -1) inuse += "+user_add_phr";
  if (typeof window[inuse] != "undefined") return window[inuse];
  else {
    res = inuse
      .split("+")
      .reduce((d1, d2key) => ({ ...window[d2key], ...d1 }), (first = {}));
    window[inuse] = res;
    return res;
  }
}
function getRevealer() {
  var currentFill_r = currentFill;
  var current_head = 1;
  return function () {
    var e = fillObjs[currentFill];
    if (currentFill != currentFill_r) {
      current_head = 1;
      currentFill_r = currentFill;
    }
    elemExplain(e, true, current_head, excise_cheat2);
    currentInput = elemInfo(e).inText.toLowerCase().slice(0, current_head);
    elemFill(e, currentInput);
    current_head += 1;
  };
}
var change = "right";
document.getElementById("main-change").onclick = (e) => {
  console.log("切换布局");
  if (change === "right") {
    var style = document.createElement("style");
    style.type = "text/css";
    style.id = "left";
    style.innerHTML =
      "#explain-container{border-right:dotted 1px grey!important;position:absolute;left:0%!important;right:78%!important}#text-container{left:22%!important;width:78%!important}";
    document.getElementsByTagName("head").item(0).appendChild(style);
    change = "left";
    console.log("单词在left");
    document.getElementById("main-change").value = "✨Left";
  } else if (change === "left") {
    document
      .getElementsByTagName("head")
      .item(0)
      .removeChild(document.getElementById("left"));
    var style = document.createElement("style");
    style.type = "text/css";
    style.id = "hidden";
    style.innerHTML =
      "#explain-container{display:none!important}#text-container{left:0%!important;width:99%!important}#demo-container {width: 101%;}";
    document.getElementsByTagName("head").item(0).appendChild(style);
    change = "hidden";
    console.log("单词hidden");
    document.getElementById("main-change").value = "✨Hidden";
  } else if (change === "hidden") {
    document
      .getElementsByTagName("head")
      .item(0)
      .removeChild(document.getElementById("hidden"));
    change = "right";
    console.log("单词在right");
    document.getElementById("main-change").value = "✨Right";
  }
};
var is_wide = false;
var text_container = document.getElementById("text-container");
var explain_container = document.getElementById("explain-container");
document.getElementById("wide-more").onclick = (e) => wide_more();
function wide_more() {
  if (change == "right") {
    if (!is_wide) {
      text_container.style.width = "70%";
      explain_container.style.left = "70%";
      is_wide = true;
      document.getElementById("wide-more").value = "窄点";
      if (is_mdx_high) document.getElementById("mdx-div").style.width = "30%";
    } else {
      text_container.style.width = "78%";
      explain_container.style.left = "78%";
      is_wide = false;
      document.getElementById("wide-more").value = "宽点";
      if (is_mdx_high) document.getElementById("mdx-div").style.width = "22%";
    }
  } else {
    Qmsg.warning("单词释义列表仅在【右侧】时有效");
  }
}
var is_def_show = true;
document.getElementById("def-show").onclick = (e) => {
  var def = document.querySelectorAll(".def");
  if (def.length) {
    if (is_def_show) {
      def.forEach((o) => {
        o.style.display = "none";
      });
      is_def_show = false;
      document.getElementById("def-show").value = "释义-显示";
    } else {
      def.forEach((o) => {
        o.style.display = "";
      });
      is_def_show = true;
      document.getElementById("def-show").value = "释义-隐藏";
    }
  } else {
    Qmsg.warning("😶 当前无【单词释义】数据");
  }
};
function not_show_def() {
  var def = document.querySelectorAll(".def");
  def.forEach((o) => {
    o.style.display = "none";
  });
}
document.getElementById("font-size").onclick = (e) => {
  var fonts = document.getElementById("font-size").value;
  document.getElementById("demo").style.fontSize = fonts + "px";
};
var isShow = "default";
var isSpan = false;
document.getElementById("Chinese").onclick = (e) => {
  if (isSpan) {
    if (isShow == "A") {
      var x = document.getElementsByClassName("zh");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "block";
      }
      document.getElementById("Chinese").value = "中文-换行";
      document.getElementById("font-size").value = 33;
      document.getElementById("demo").style.fontSize = "33px";
      isShow = "block";
    } else if (isShow == "block") {
      var x = document.getElementsByClassName("zh");
      for (i = 0; i < x.length; i++) {
        x[i].style.opacity = "0";
      }
      document.getElementById("Chinese").value = "中文-隐藏";
      isShow = "hide";
    } else if (isShow == "hide") {
      var x = document.getElementsByClassName("zh");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
        x[i].style.opacity = "0";
        x[i].style.marginBottom = "0px";
      }
      document.getElementById("Chinese").value = "中文-紧凑";
      isShow = "compact";
    } else if (isShow == "compact") {
      var x = document.getElementsByClassName("zh");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "initial";
        x[i].style.opacity = "1";
      }
      document.getElementById("Chinese").value = "中文-A";
      isShow = "A";
    }
  } else {
    this.gzhspan();
    var x = document.getElementsByClassName("zh");
    if (x.length !== 0) {
      isSpan = true;
      isShow = "A";
      document.getElementById("Chinese").value = "中文-A";
    }
    var s = document.getElementById("maininput").value;
    s = s.replace(/([a-zA-Z]+)+-\n([a-zA-Z]+)/g, "$1$2\n");
    state_in_excise = false;
    var words = allWords(s);
    var wordsValid = ruleAllWords(words, ruleArray, getSimpleFilter());
    allFiller = fillAllLabeled(s, wordsValid);
    fillObjs = [];
    Object.keys(allFiller.wordDict).forEach((e) =>
      fillObjs.push(document.getElementById(e))
    );
  }
};
var audio = document.createElement("audio");
audio.style.display = "none";
function word_sound(s) {
  var audioUrl = "https://dict.youdao.com/speech?audio=";
  audio.src = audioUrl + s;
  audio.play();
}
var isClozeNow = false;
var click_store;
document.getElementById("demo").onclick = (e) => {
  spacebar = false;
  o = e.target;
  if (click_store) {
    click_store = clearTimeout(click_store);
  }
  click_store = setTimeout(function () {
    if (o.className == "word-filler") {
      if (is_voc_copy_explain) elemExplain(o, false);
      else if (is_mdx_show) go_to_mdx(o.innerText);
      if (!o.childNodes[0].className) {
        isClozeNow = false;
        currentInput = "";
        clear_current_style_1();
        clear_current_style_2();
        if (!elemCheck(fillObjs[last_currentFill])) {
          input_err();
          Qmsg.error("上一处 输入不正确");
        }
        add_now(o);
        var index_o = IndexOf_cur(fillObjs, o);
        if (index_o !== -1) {
          currentFill = index_o;
          last_currentFill = currentFill;
        }
        if (state_in_excise) {
          var eleme = fillObjs[currentFill];
          console.log("当前输入的不正确：", eleme.innerText);
          if (!elemCheck(fillObjs[last_currentFill])) {
            isClozeNow = true;
          }
        }
      }
    } else if (o.className == "word-filler-done") {
      if (is_voc_copy_explain) elemExplain(o, false);
      else if (is_mdx_show) go_to_mdx(o.innerText);
      clear_current_style_3();
      clear_current_style_2();
      clear_current_style_1();
      var index_o = IndexOf_cur(fillObjs, o);
      if (index_o !== -1) {
        currentFill = index_o;
        last_currentFill = currentFill;
      }
      add_now(o);
    } else if (o.className == "word-filler-dup") {
      if (is_voc_copy_explain) elemExplain(o, false);
      else if (is_mdx_show) go_to_mdx(o.innerText);
      if (!elemCheck(fillObjs[currentFill])) {
        input_err();
        Qmsg.error("上一处 输入不正确");
      }
    } else if (o.className == "red-zone") {
      isClozeNow = true;
      console.log("是填空的");
      currentInput = "";
      o = e.path[1];
      var index_o = IndexOf_cur(fillObjs, o);
      if (index_o !== -1) currentFill = index_o;
      clear_current_style_1();
      if (!elemCheck(fillObjs[last_currentFill])) {
        input_err();
        Qmsg.error("上一处 输入不正确");
      }
      var index_o = IndexOf_cur(fillObjs, o);
      if (index_o !== -1) {
        currentFill = index_o;
        last_currentFill = currentFill;
      }
      add_now(o);
      re_is_done();
    } else if (o.className == "word-filler-err") {
      re_is_done();
      clear_current_style_3();
      clear_current_style_2();
      clear_current_style_1();
      var index_o = IndexOf_cur(fillObjs, o);
      currentFill = index_o;
      last_currentFill = currentFill;
      currentInput = document.getElementById(
        fillObjs[currentFill].id
      ).innerText;
      console.log("这里错了");
      isClozeNow = true;
      var elem0 = fillObjs[currentFill];
      document.getElementById(elem0.id).className = "word-filler-current";
    } else if (o.className == "selecTcss") {
      if (is_mdx_show) go_to_mdx(o.innerText);
      if (is_voc) word_sound(o.innerText);
      if (is_copy) {
        handleCopy(o.innerText);
        if (is_voc) Qmsg.success("已复制,正在获取网络发音");
        else Qmsg.success("已复制");
      }
    } else if (e.target.className == "zh") {
      if (isShow == "hide") {
        console.log("偷看一眼");
        if (o.style.opacity == "0") {
          o.style.opacity = "1";
        } else {
          o.style.opacity = "0";
        }
      }
    }
  }, 200);
};
document.getElementById("demo").ondblclick = (e) => {
  clearTimeout(click_store);
  var o = e.target;
  if (is_voc_copy_explain) {
    if (o.className == "demo-area" || o.className == "") {
      const selection = window.getSelection();
      console.log("selection.toString()", selection.toString());
      var selecT = selection.toString().replace(/\ /g, "");
    } else if (
      o.className == "word-filler" ||
      o.className == "word-filler-done"
    ) {
      if (!o.childNodes[0].className) {
        clear_current_style_3();
        clear_current_style_2();
        clear_current_style_1();
        var index_o = IndexOf_cur(fillObjs, e.target);
        if (index_o !== -1) {
          currentFill = index_o;
          last_currentFill = currentFill;
        }
        add_now(o);
      }
      if (!is_dbl_select) window.getSelection().empty();
      return;
    } else if (e.target.className == "current-noter-container") {
      return;
    }
    var nowTarget = e.target.id;
    var pattern2 = new RegExp("[A-Za-z]+");
    let isEnglish = pattern2.test(selecT);
    if (nowTarget === "" || (nowTarget === "demo" && isEnglish)) {
      if (is_mdx_show) go_to_mdx(selecT);
      console.log("选中单词 处理前", selecT);
      var select2word2rules = word2rules(selecT, ruleArray);
      if (select2word2rules.length == 1) {
        console.log("处理后 ：相同");
      } else {
        console.log("selecT 变原形", select2word2rules);
      }
      if (is_select_mark) {
        const range = window.getSelection().getRangeAt(0);
        const docObj = range.extractContents();
        let dom = document.createElement("span");
        dom.className = "selecTcss";
        dom.id = "demo-" + Date.now();
        dom.appendChild(docObj);
        range.insertNode(dom);
        if (is_voc) word_sound(selecT);
        if (is_copy) {
          handleCopy(selecT);
          if (is_voc) Qmsg.success("已复制，正在获取网络发音");
          else Qmsg.success("已复制");
        }
        window.getSelection().empty();
      }
    } else if (
      e.target.className == "" &&
      e.target.id.substring(0, 4) == "demo"
    ) {
      e.target.className = "selecTcss";
      if (is_voc) word_sound(selecT);
      if (is_copy) {
        handleCopy(selecT);
        if (is_voc) Qmsg.success("已复制，正在获取网络发音");
        else Qmsg.success("已复制");
      }
      window.getSelection().empty();
    } else if (
      e.target.className == "" &&
      e.target.id.substring(0, 4) == "word"
    ) {
      e.target.className = "word-filler";
      window.getSelection().empty();
      add_now(o);
      fresh_listWords();
    }
  }
};
document.getElementById("demo").oncontextmenu = (e) => {
  if (!is_menu_prevent) {
    document.getElementById("demo-container").oncontextmenu = function () { };
  } else {
    document.getElementById("demo-container").oncontextmenu = function () {
      return false;
    };
  }
  o = e.target;
  if (o.className == "selecTcss") {
    o.className = "";
    return;
  } else if (o.className == "word-filler-done") {
    o.className = "word-filler";
    fresh_listWords();
    return;
  } else if (o.className == "word-filler" && is_read_rit_clk_blk) {
    check_currentFill(o.id, false);
    if (o.childNodes[0].id == "current-noter-container-id")
      remove_word_filler_current();
    else {
      o.className = "";
      for (i = 0; i < fillObjs.length; i++) {
        if (fillObjs[i].id == o.id) fillObjs.splice(i, 1);
      }
      fresh_listWords();
    }
  } else if (o.className == "word-filler-current") remove_word_filler_current();
};
var contextList = [];
function add_context_item(o, check_current = false) {
  var demo_item = {};
  demo_item.id = o.id;
  demo_item.className = o.className;
  demo_item.check_current = check_current;
  contextList.push(demo_item);
}
function check_currentFill(str, ret) {
  var all_word_filler = document
    .getElementById("demo")
    .querySelectorAll(".word-filler");
  for (i = 0; i < all_word_filler.length; i++) {
    if (all_word_filler[i].id == str) {
      if (i < currentFill) {
        currentFill--;
        if (ret) return true;
      }
    }
  }
}
document.getElementById("explain-area").oncontextmenu = (e) => {
  o = e.target;
  if (!state_in_excise) {
    if (o.className == "word-filler" || o.className == "word-filler-done") {
      console.log("取消标注，已屏蔽" + o.innerText);
      var str = o.id.replace(/-exp/g, "");
      add_context_item(o, check_currentFill(str, true));
      document.getElementById(str).className = "";
      if (is_mark_del) document.getElementById(str).style.color = "";
      fresh_listWords();
      var knownList_1 = JSON.parse(localStorage.getItem(now_knownList));
      knownList_1.push(o.innerText);
      localStorage.setItem(now_knownList, JSON.stringify(knownList_1));
    }
  }
};
document.getElementById("explain-head").oncontextmenu = (e) => {
  e.preventDefault();
  o = e.target;
  if (!state_in_excise) {
    if (o.className == "word-filler" || o.className == "word-filler-done") {
      console.log("取消标注，已屏蔽" + o.innerText);
      var str = o.id.replace(/-exp/g, "");
      add_context_item(o, check_currentFill(str, true));
      document.getElementById(str).className = "";
      if (is_mark_del) document.getElementById(str).style.color = "";
      if (isSort) words_sort();
      else fresh_listWords();
      if (is_to_color) fresh_listWords_mark(o);
      var knownList_1 = JSON.parse(localStorage.getItem(now_knownList));
      knownList_1.push(o.innerText);
      localStorage.setItem(now_knownList, JSON.stringify(knownList_1));
    }
  }
};
document
  .getElementById("text-container")
  .addEventListener("scroll", function () {
    follow_scroll();
    if (is_click) right_position_return()
  });
function follow_scroll() {
  var num0 = document
    .getElementById("explain-area")
    .querySelectorAll(".word-filler");
  if (num0.length) {
    var text_con_scrollTop =
      document.getElementById("text-container").scrollTop;
    var word = document
      .getElementById("demo")
      .getElementsByClassName("word-filler");
    for (i = 0; i < word.length; i++) {
      var dif_num = word[i].offsetTop - text_con_scrollTop;
      if (dif_num > -10 && dif_num < 250) {
        var word_exp_Y = document.getElementById(word[i].id + "-exp").offsetTop;
        document.getElementById("explain-container").scrollTop =
          word_exp_Y - 30;
        return;
      }
    }
  }
}
function handleCopy(text) {
  const input = document.createElement("input");
  input.style.cssText = "opacity: 0;";
  input.type = "text";
  input.value = text;
  input.id = "copy_input";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.getElementById("copy_input").remove();
}
var isCc = false;
function gzhspan() {
  var resb = document.getElementById("demo").innerHTML;
  let rega =
    /[(\u4e00-\u9fa5)(0-9)(a-zA-Z)(\。|\？|\！|\，|\、|\；|\：|\・|\“|\”|\‘|\’|\（|\）|\／|\－|\《|\》|\【|\】|\[|\]|\~|\—|\,|\;|\:|\•|\ |\/|\…|\"|\'|\\|\/|\=|\-|\％|\%)]+/g;
  var reb = resb.match(rega);
  function unique(arr) {
    return Array.from(new Set(arr));
  }
  reb = unique(reb);
  var pattern3 = new RegExp("[\u4e00-\u9fa5]+");
  var rebcc = [];
  for (i = 0; i < reb.length; i++) {
    var isC = pattern3.test(reb[i]);
    if (isC) {
      rebcc.push(reb[i].trim());
      isCc = true;
    }
  }
  if (isCc) {
    for (i = 0; i < rebcc.length; i++) {
      var searchStr = rebcc[i];
      var newStr = resb.replace(
        new RegExp(searchStr, "g"),
        `<zh class="zh"style="display:initial;">${searchStr}</zh>`
      );
      resb = newStr;
    }
    document.getElementById("demo").innerHTML = resb;
  } else {
    Qmsg.warning("当前文本【不含中文】，无需处理");
  }
}
document.getElementById("demo").onmouseover = (e) => {
  var m = e.target;
  if (m.className == "" && m.id !== "") m.style.cursor = "pointer";
};
function IndexOf_cur(arr, item) {
  return arr.indexOf(item);
}
function cancel_rep() { }
var isFullScreen = false;
document.getElementById("fullScreen").onclick = (e) => {
  if (!isFullScreen) {
    launchFullscreen(document.documentElement);
    document.getElementById("fullScreen").value = "🔍退出全屏";
    isFullScreen = true;
  } else {
    exitFullscreen();
    document.getElementById("fullScreen").value = "🔍全屏";
    isFullScreen = false;
  }
};
document.addEventListener("fullscreenchange", function (e) {
  if (document.fullscreenElement) {
    Qmsg.success("已进入全屏");
  } else {
    Qmsg.success("已退出全屏");
    document.getElementById("fullScreen").value = "🔍全屏";
    isFullScreen = false;
  }
});
function launchFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  }
}
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
var is_nav_show = true;
document.getElementById("nav-show").onclick = (e) => {
  if (is_nav_show) hide_nav();
  else show_nav();
};
function hide_nav() {
  var vav_show = document.getElementById("nav");
  vav_show.style.display = "none";
  is_nav_show = false;
  document.getElementById("nav-show").value = "🎈Nav -";
}
function show_nav() {
  var vav_show = document.getElementById("nav");
  vav_show.style.display = "";
  is_nav_show = true;
  document.getElementById("nav-show").value = "🎈Nav +";
}
document.getElementById("explain-con-top").onclick = function () {
  if (word_list.childNodes.length > 0) {
    fresh_listWords();
    open_words_mask();
    setTimeout(() => {
      document.getElementById("explain-outer").scrollTop = 0;
    }, 200);
  } else {
    Qmsg.warning("当前还没有数据");
  }
};
document.getElementById("text-area-long").onclick = function () {
  var maininput = document.getElementById("maininput");
  maininput.style.height = "680px";
};
document.getElementById("text-area-short").onclick = function () {
  var maininput = document.getElementById("maininput");
  maininput.style.height = "200px";
};
let fontSize = 14;
document.getElementById("text-area-fontzize-add").onclick = function () {
  fontSize = fontSize + 2;
  var maininput = document.getElementById("maininput");
  maininput.style.fontSize = fontSize + "px";
  maininput.style.lineHeight = fontSize + 1 + "px";
};
document.getElementById("text-area-fontzize-minus").onclick = function () {
  fontSize = fontSize - 2;
  var maininput = document.getElementById("maininput");
  maininput.style.fontSize = fontSize + "px";
  maininput.style.lineHeight = fontSize + 1 + "px";
};
document.getElementById("in-knownList").onclick = function () {
  var maininput = document.getElementById("maininput");
  var bad_input = maininput.value;
  bad_input = bad_input.replace(/[\u4e00-\u9fa5]/g, " ");
  bad_input = bad_input.replace(
    /[\,|\.|\"|\'|\?|\!|\+|\=|\，|\。|\！|\？|\（|\）|\【|\】|\(|\)|\[|\]]/g,
    " "
  );
  let bad_input_1 = bad_input.split(/[ \r\n]/);
  bad_input_1 = bad_input_1.filter(function (s) {
    return s && s.trim();
  });
  bad_input_1 = Array.from(new Set(bad_input_1));
  if (!bad_input_1.length) {
    alert(
      "请先在下方的文本框中输入要屏蔽的单词【熟词、基础词】，\n\n单词统一为小写；\n单词间以【空格】或【回车】隔开；\n\n可【一定程度】自动去除中文及标点符号【但不要包含特殊符号】；"
    );
  } else {
    var r = confirm(
      "\n注意：\n\n单词统一为小写；\n单词间以【空格】或【回车】隔开;\n\n应经在下方文本框中输入了要【屏蔽】的单词，确认【屏蔽】以下熟词？"
    );
    if (r == true) {
      var knownList_1 = JSON.parse(localStorage.getItem(now_knownList));
      knownList_1 = knownList_1.concat(bad_input_1);
      knownList_1 = Array.from(new Set(knownList_1));
      localStorage.setItem(now_knownList, JSON.stringify(knownList_1));
      setTimeout(() => {
        Qmsg.success("熟词已合并【屏蔽】，将不会在下次被标注");
        maininput.value = "";
      }, 500);
    }
  }
};
document.getElementById("cancel-knownList").onclick = function () {
  var maininput = document.getElementById("maininput");
  var can_input = maininput.value;
  can_input = can_input.split(/[ \r\n]/);
  can_input = can_input.filter(function (s) {
    return s && s.trim();
  });
  for (i = 0; i < can_input.length; i++) {
    can_input[i] = can_input[i];
  }
  can_input = Array.from(new Set(can_input));
  if (!can_input.length) {
    alert(
      "\n请先在下方的文本框中输入要【取消屏蔽】的单词，\n\n单词统一为小写；\n单词间以【空格】或【回车】隔开；"
    );
  } else {
    var r = confirm(
      "\n注意：\n\n单词统一为小写；\n单词间以【空格】或【回车】隔开；\n\n已经在下方文本框中输入了要【取消屏蔽】的单词，确认【取消屏蔽】？"
    );
    if (r == true) {
      var knownList_2 = JSON.parse(localStorage.getItem(now_knownList));
      const new_knownList = [];
      knownList_2.forEach((item) => {
        if (!can_input.includes(item)) {
          new_knownList.push(item);
        }
      });
      localStorage.setItem(now_knownList, JSON.stringify(new_knownList));
      setTimeout(() => {
        Qmsg.success("已取消【屏蔽】，将会在下次被标注");
        maininput.value = "";
      }, 500);
    }
  }
};
document.getElementById("look-knownList").onclick = function () {
  var maininput = document.getElementById("maininput");
  if (maininput.value) {
    var re = confirm(
      "\n当前操作将【清空】下方文本框，请注意保存【重要数据】，确定？"
    );
    if (re) look();
  } else {
    look();
  }
  function look() {
    var knownList_look = JSON.parse(localStorage.getItem(now_knownList));
    console.log("查看已屏蔽", knownList_look);
    var num = "共 " + knownList_look.length + " 词";
    var str = "";
    for (var i = 0; i < knownList_look.length; i++) {
      str += knownList_look[i] + "\n";
    }
    maininput.value = num + "\n\n" + str;
    maininput.scrollTop = 0;
  }
};
let word_list = document.getElementById("explain-head");
let word_list_mask = document.querySelector("#explain-outer-mask");
function open_words_mask() {
  word_list_mask.style.display = "flex";
  document.body.style.overflow = "hidden";
  if (is_to_color) fresh_listWords_mark();
  else words_sort();
}
word_list_mask.onclick = function (e) {
  if (e.target == word_list_mask) {
    word_list_mask.style.display = "none";
    document.body.style.overflow = "auto";
  }
};
document.getElementById("explain-con-top").oncontextmenu = function (e) {
  e.preventDefault();
  copy_btn_f();
};
document.getElementById("btn-copy").onclick = function (e) {
  copy_btn_f();
};
function copy_btn_f() {
  if (word_list.childNodes.length > 0) {
    var word_str = word_list.innerText;
    var word_arr = word_str.split(" ").filter(function (s) {
      return s && s.trim();
    });
    var word_final = "";
    for (i = 0; i < word_arr.length; i++) {
      word_final = word_final + word_arr[i] + "\n";
    }
    navigator.clipboard.writeText(word_final);
    Qmsg.success("[生词]已经复制到剪贴板喽！");
  } else {
    Qmsg.warning("😶当前还没有数据");
  }
}
var isSort = false;
document.getElementById("toUPcase").onclick = function () {
  is_to_color = false;
  if (!isSort) {
    var words1 = [...demo.getElementsByClassName("word-filler")];
    var words2 = [...demo.getElementsByClassName("word-filler-done")];
    var headDiv = document.getElementById("explain-head");
    headDiv.innerHTML = "";
    sort_wds(words1);
    sort_wds(words2);
    isSort = true;
    document.getElementById("toUPcase").innerHTML = "●";
    setTimeout(() => {
      document.getElementById("explain-outer").scrollTop = 0;
    }, 200);
  } else {
    var words1 = [...demo.getElementsByClassName("word-filler")];
    var words2 = [...demo.getElementsByClassName("word-filler-done")];
    var headDiv = document.getElementById("explain-head");
    headDiv.innerHTML = "";
    no_sort_wds(words1);
    no_sort_wds(words2);
    isSort = false;
    document.getElementById("toUPcase").innerHTML = "↑";
    setTimeout(() => {
      document.getElementById("explain-outer").scrollTop = 0;
    }, 200);
  }
  function sort_wds(wds) {
    wds
      .sort((a, b) => (elemInfo(a).voc >= elemInfo(b).voc ? 1 : -1))
      .forEach((o) => {
        var oHead = o.cloneNode();
        oHead.innerText = elemInfo(o).voc;
        headDiv.appendChild(oHead);
        headDiv.append(" ");
        oHead.onclick = () => {
          wordInfo = elemInfo(o);
          wordInfo.audio.play();
          word2board(wordInfo.voc);
          var cNew = fillObjs.findIndex((e) => e == o);
          if (cNew && cNew >= 0) {
            currentFill = cNew;
          }
          if (navigator.clipboard)
            navigator.clipboard.writeText(elemInfo(o).voc);
        };
      });
  }
  function no_sort_wds(wds) {
    wds.forEach((o) => {
      var oHead = o.cloneNode();
      oHead.innerText = elemInfo(o).voc;
      headDiv.appendChild(oHead);
      headDiv.append(" ");
      oHead.onclick = () => {
        wordInfo = elemInfo(o);
        wordInfo.audio.play();
        word2board(wordInfo.voc);
        var cNew = fillObjs.findIndex((e) => e == o);
        if (cNew && cNew >= 0) {
          currentFill = cNew;
        }
        if (navigator.clipboard) navigator.clipboard.writeText(elemInfo(o).voc);
      };
    });
  }
};
function words_sort() {
  if (isSort) {
    console.log("恢复 字母排序");
    var words1 = [...demo.getElementsByClassName("word-filler")];
    var words2 = [...demo.getElementsByClassName("word-filler-done")];
    var headDiv = document.getElementById("explain-head");
    headDiv.innerHTML = "";
    sort_wds(words1);
    sort_wds(words2);
    function sort_wds(wds) {
      wds
        .sort((a, b) => (elemInfo(a).voc >= elemInfo(b).voc ? 1 : -1))
        .forEach((o) => {
          var oHead = o.cloneNode();
          oHead.innerText = elemInfo(o).voc;
          headDiv.appendChild(oHead);
          headDiv.append(" ");
          oHead.onclick = () => {
            wordInfo = elemInfo(o);
            wordInfo.audio.play();
            word2board(wordInfo.voc);
            var cNew = fillObjs.findIndex((e) => e == o);
            if (cNew && cNew >= 0) {
              currentFill = cNew;
            }
            if (navigator.clipboard)
              navigator.clipboard.writeText(elemInfo(o).voc);
          };
        });
    }
  }
}
function add_now(o) {
  clear_current_style_2();
  o.insertBefore(elemNoter, o.firstChild);
}
function clear_current_style_1() {
  var elem0 = fillObjs[currentFill];
  if (elem0) {
    if (state_in_excise) {
      elemModify(elem0, false);
    } else if (elem0.className == "word-filler-current") {
      elem0.className = "word-filler";
    }
  }
}
function clear_current_style_2() {
  var red_obj = document.getElementsByClassName("current-noter-container");
  if (red_obj.length) {
    var parent = red_obj[0].parentNode;
    parent.removeChild(red_obj[0]);
  }
  var cc = document.getElementsByClassName("word-filler-current");
  for (i = 0; i < cc.length; i++) {
    cc[i].className = "word-filler";
  }
}
function clear_current_style_3() {
  var okl = document.getElementsByClassName("word-filler-current");
  if (okl.length) {
    if (!elemCheck(fillObjs[last_currentFill])) {
      input_err();
      Qmsg.error("😶上一处 输入不正确");
      document.getElementsByClassName("word-filler-current")[0].className =
        "word-filler-err";
    }
  }
}
function cloze_now(elem) {
  if (elem.firstChild.id == "") {
    isClozeNow = true;
  }
}
var isDone = false;
var isDup = false;
var last_currentFill = 0;
function re_is_done() {
  if (isDone) {
    var eleme = fillObjs[last_currentFill];
    eleme.className = "word-filler-done";
  }
  isDone = false;
  if (isDup) {
    var eleme = fillObjs[last_currentFill];
    eleme.className = "word-filler-dup";
  }
  isDup = false;
}
function input_err() {
  var eleme = fillObjs[last_currentFill];
  console.log("eleme 输入错误", eleme);
  if (!eleme.innerText) {
    document.getElementById(eleme.id).innerText = "---";
  }
  eleme.className = "word-filler-err";
}
function selected_handle(s) {
  var resb = document.getElementById("demo").innerHTML;
  for (i = 0; i < s.length; i++) {
    var searchStr = s[i];
    var newStr = resb.replace(
      searchStr,
      `<span class="selecTcss">${searchStr}</span>`
    );
    resb = newStr;
  }
  for (i = 0; i < s.length; i++) {
    var searchStr = s[i];
    var newStr = resb.replace(
      `<span class="selecTcss">${searchStr}</span>`,
      `<span class="selecTcss">${searchStr}</span>`
    );
    resb = newStr;
  }
  document.getElementById("demo").innerHTML = resb;
}
let setting_div_mask = document.querySelector("#setting-div-mask");
var setting_mask = false;
document.getElementById("setting").onclick = (e) => open_setting();
function open_setting() {
  setting_mask = true;
  setting_div_mask.style.display = "flex";
  document.body.style.overflow = "hidden";
}
setting_div_mask.onclick = function (e) {
  if (e.target == setting_div_mask) {
    setting_mask = false;
    setting_div_mask.style.display = "none";
    document.body.style.overflow = "auto";
  }
};
document
  .getElementById("is-voc-copy-explain")
  .addEventListener("change", () => {
    var is_on = document.getElementById("is-voc-copy-explain").checked;
    if (is_on) is_voc_copy_explain = true;
    else is_voc_copy_explain = false;
  });
document.getElementById("is-voc").addEventListener("change", () => {
  var is_on = document.getElementById("is-voc").checked;
  if (is_on) is_voc = true;
  else is_voc = false;
});
document.getElementById("is-copy").addEventListener("change", () => {
  var is_on = document.getElementById("is-copy").checked;
  if (is_on) is_copy = true;
  else is_copy = false;
});
document.getElementById("is-explain").addEventListener("change", () => {
  var is_on = document.getElementById("is-explain").checked;
  if (is_on) is_explain = true;
  else is_explain = false;
});
document.getElementById("is-select-mark").addEventListener("change", () => {
  var is_on = document.getElementById("is-select-mark").checked;
  if (is_on) is_select_mark = true;
  else is_select_mark = false;
});
document.getElementById("is-db-select").addEventListener("change", () => {
  var is_on = document.getElementById("is-db-select").checked;
  if (is_on) is_dbl_select = true;
  else is_dbl_select = false;
});
document.getElementById("is-dup").addEventListener("change", () => {
  var is_on = document.getElementById("is-dup").checked;
  if (is_on) is_dup = true;
  else {
    is_dup = false;
    clear_dup();
  }
});
var is_clear_dup = false;
function clear_dup() {
  let dup = document
    .getElementById("demo")
    .querySelectorAll(".word-filler-dup");
  if (dup.length) {
    for (d of dup) d.className = "none-dup";
    is_clear_dup = true;
  } else Qmsg.warning("还没有数据");
}
function add_dup() {
  let dup = document.getElementById("demo").querySelectorAll(".none-dup");
  for (d of dup) d.className = "word-filler-dup";
  is_clear_dup = false;
}
document.getElementById("is-menu-prevent").addEventListener("change", () => {
  var is_on = document.getElementById("is-menu-prevent").checked;
  if (is_on) is_menu_prevent = true;
  else is_menu_prevent = false;
});
document.getElementById("is-read-rit-blk").addEventListener("change", () => {
  var is_on = document.getElementById("is-read-rit-blk").checked;
  if (is_on) is_read_rit_clk_blk = true;
  else is_read_rit_clk_blk = false;
});
document.getElementById("is-also-mark-save").addEventListener("change", () => {
  var is_on = document.getElementById("is-also-mark-save").checked;
  if (is_on) is_also_mark_save = true;
  else is_also_mark_save = false;
});
document.getElementById("is-mark-del").addEventListener("change", () => {
  var is_on = document.getElementById("is-mark-del").checked;
  if (is_on) is_mark_del = true;
  else is_mark_del = false;
});
document
  .getElementById("is-cloze-last-clear")
  .addEventListener("change", () => {
    var is_on = document.getElementById("is-cloze-last-clear").checked;
    if (is_on) is_cloze_last_clear = true;
    else is_cloze_last_clear = false;
  });
document.getElementById("step-confirm").onclick = function () {
  step = document.getElementById("step").value;
  Qmsg.success("步数，已设置");
};
var users = JSON.parse(localStorage.getItem("all-users"));
var now_user = JSON.parse(localStorage.getItem("now-user"));
document.getElementById("user-add").addEventListener(
  "click",
  function () {
    var add = confirm("\n确认添加新用户吗");
    if (add) add_user();
  },
  false
);
function add_option(user_name, user_num) {
  var op = document.createElement("option");
  op.setAttribute("value", user_name);
  op.appendChild(document.createTextNode("用户" + user_num));
  user.appendChild(op);
}
function add_user() {
  let user_num = users.length;
  let user_name = "user" + user_num;
  add_option(user_name, user_num);
  users.push(user_name);
  localStorage.setItem("all-users", JSON.stringify(users));
  now_user = user_name;
  localStorage.setItem("now-user", JSON.stringify(now_user));
  Qmsg.success("😃 新用户添加完成");
  document.getElementById("user").value = user_name;
  now_knownList = now_user;
  localStorage.setItem(user_name, JSON.stringify(knownList));
}
var user = document.getElementById("user");
document.getElementById("user").addEventListener("change", () => {
  now_user = document.getElementById("user").value;
  localStorage.setItem("now-user", JSON.stringify(now_user));
  if (now_user == "Default") now_knownList = "knownList";
  else now_knownList = now_user;
  Qmsg.success("已切换用户至" + "【" + now_user + "】");
});
function mark_phr() {
  var all_phr = Array.from(Object.keys(dict_phr)).concat(
    Array.from(Object.keys(user_add_phr))
  );
  for (l = 0; l < all_phr.length; l++) {
    var s_phr = all_phr[l].replace(/\,|\.|\;/g, " ");
    s_phr = s_phr.split(" ");
    s_phr = s_phr.filter(function (s) {
      return s && s.trim();
    });
    look_phr(phr_res, s_phr, l);
  }
  function fn1(tempArr) {
    for (let i = 0; i < tempArr.length; i++) {
      for (let j = i + 1; j < tempArr.length; j++) {
        if (tempArr[i][1] == tempArr[j][1]) {
          tempArr.splice(j, 1);
          j--;
        }
      }
    }
    return tempArr;
  }
  phr_in_text = fn1(phr_in_text);
  function look_phr(arr, phr, m) {
    var o_phr = [];
    for (i = 0; i < arr.length; i++) {
      if (arr[i].indexOf(phr[0]) !== -1) {
        o_phr.push(arr[i][0]);
        for (k = 1; k < phr.length; k++) {
          if (i + k < arr.length) {
            if (arr[i + k].indexOf(phr[k]) !== -1) {
              o_phr.push(arr[i + k][0]);
              if (k + 1 == phr.length && o_phr.length > 1) {
                phr_in_text.push([o_phr.join(" "), all_phr[m]]);
                o_phr = [];
              }
            } else o_phr = [];
          } else {
            o_phr = [];
            break;
          }
        }
      }
    }
  }
}
var buttons = document.getElementById("buttons");
var demo_container = document.getElementById("demo-container");
var text_container = document.getElementById("text-container");
var explain_container = document.getElementById("explain-container");
var is_buttons_show = true;
function hide_buttons() {
  is_buttons_show = false;
  buttons.style.display = "none";
  text_container.style.height = "99.5vh";
  explain_container.style.height = "99.5vh";
  demo_container.style.borderTop = "none";
}
function show_buttons() {
  is_buttons_show = true;
  buttons.style.display = "block";
  text_container.style.height = "94.5vh";
  explain_container.style.height = "94.5vh";
  demo_container.style.borderTop = "solid";
}
