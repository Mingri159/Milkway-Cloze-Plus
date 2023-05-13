let default_color = "#ffa31a";
let mark_color_1 = "#ff7676";
let mark_color_2 = "#6094ea";
let mark_color_3 = "#736efe";
let mark_color_4 = "#ddd278";
let mark_color_5 = "#ce9ffc";
let mark_color_6 = "#c535ef";
var words_filler_all;
var mark_words_1 = [];
var mark_words_2 = [];
var mark_words_3 = [];
var mark_words_4 = [];
var mark_words_5 = [];
var mark_words_6 = [];
function getArrEqual(arr1, arr2) {
  let newArr = [];
  for (let i = 0; i < arr2.length; i++) {
    for (let j = 0; j < arr1.length; j++) {
      if (arr1[j].innerText === arr2[i]) {
        newArr.push(arr1[j]);
      }
    }
  }
  return newArr;
}
function get_words_filler_all() {
  var explain_head = document.getElementById("explain-head");
  words_filler_all = explain_head.querySelectorAll(".word-filler");
}
function get_words_filler_all_demo() {
  var demo = document.getElementById("demo");
  words_filler_all = demo.querySelectorAll(".word-filler");
}
function mark_color(arr, color) {
  for (i = 0; i < arr.length; i++) {
    var h = document.getElementById(arr[i].id);
    var h1 = document.getElementById(arr[i].id + "-exp");
    if (h) h.style.color = color;
    if (h1) h1.style.color = color;
  }
}
function mark_color_inner(arr, color) {
  var headDiv = document.querySelector("#explain-head");
  for (i = 0; i < arr.length; i++) {
    var h = headDiv.querySelector("#" + arr[i].id);
    if (h) {
      h.style.color = color;
    }
  }
}
function fun_cancel_mark() {
  console.log("还原默认");
  get_words_filler_all();
  mark_color(words_filler_all, default_color);
  is_mark_default = true;
  is_mark_default_c = true;
  is_all_mark = false;
  is_fun_mark_1 = false;
  is_fun_mark_2 = false;
  is_fun_mark_3 = false;
  is_fun_mark_4 = false;
  is_fun_mark_5 = false;
  is_fun_mark_6 = false;
  document.getElementById("all-mark").value = "🎨All Mark";
}
var is_fun_mark_1 = false;
var is_fun_mark_2 = false;
var is_fun_mark_3 = false;
var is_fun_mark_4 = false;
var is_fun_mark_5 = false;
var is_fun_mark_6 = false;
function fun_mark(mark_n, mark_color_n, is_fun_mark_n) {
  get_words_filler_all();
  var mark_m = getArrEqual(words_filler_all, mark_n);
  if (mark_m.length) mark_color(mark_m, mark_color_n);
  is_mark_default = false;
  if (is_fun_mark_n == "is_fun_mark_1") {
    is_fun_mark_1 = true;
    mark_words_1 = mark_m;
  }
  if (is_fun_mark_n == "is_fun_mark_2") {
    is_fun_mark_2 = true;
    mark_words_2 = mark_m;
  }
  if (is_fun_mark_n == "is_fun_mark_3") {
    is_fun_mark_3 = true;
    mark_words_3 = mark_m;
  }
  if (is_fun_mark_n == "is_fun_mark_4") {
    is_fun_mark_4 = true;
    mark_words_4 = mark_m;
  }
  if (is_fun_mark_n == "is_fun_mark_5") {
    is_fun_mark_5 = true;
    mark_words_5 = mark_m;
  }
  if (is_fun_mark_n == "is_fun_mark_6") {
    is_fun_mark_6 = true;
    mark_words_6 = mark_m;
  }
  if_mark_all_done();
}
function if_mark_all_done() {
  if (
    is_fun_mark_1 &
    is_fun_mark_2 &
    is_fun_mark_3 &
    is_fun_mark_4 &
    is_fun_mark_5 &
    is_fun_mark_6
  ) {
    is_all_mark = true;
    document.getElementById("all-mark").value = "Cancel Mark";
  }
}
var is_mark_default = true;
document.getElementById("mark-level").addEventListener("change", () => {
  var user_selected_degree = document.getElementById("mark-level").value;
  if (user_selected_degree == "mark-0") fun_cancel_mark();
  else if (user_selected_degree == "mark-1")
    fun_mark(mark_1, mark_color_1, "is_fun_mark_1");
  else if (user_selected_degree == "mark-2")
    fun_mark(mark_2, mark_color_2, "is_fun_mark_2");
  else if (user_selected_degree == "mark-3")
    fun_mark(mark_3, mark_color_3, "is_fun_mark_3");
  else if (user_selected_degree == "mark-4")
    fun_mark(mark_4, mark_color_4, "is_fun_mark_4");
  else if (user_selected_degree == "mark-5")
    fun_mark(mark_5, mark_color_5, "is_fun_mark_5");
  else if (user_selected_degree == "mark-6")
    fun_mark(mark_6, mark_color_6, "is_fun_mark_6");
});
var is_all_mark = false;
document.getElementById("all-mark").onclick = debounce(function () {
  var explain_head = document.getElementById("explain-head");
  words_filler_all = explain_head.querySelectorAll(".word-filler");
  if (words_filler_all.length) {
    if (!is_all_mark) {
      if (!is_fun_mark_1) fun_mark(mark_1, mark_color_1, "is_fun_mark_1");
      if (!is_fun_mark_2) fun_mark(mark_2, mark_color_2, "is_fun_mark_2");
      if (!is_fun_mark_3) fun_mark(mark_3, mark_color_3, "is_fun_mark_3");
      if (!is_fun_mark_4) fun_mark(mark_4, mark_color_4, "is_fun_mark_4");
      if (!is_fun_mark_5) fun_mark(mark_5, mark_color_5, "is_fun_mark_5");
      if (!is_fun_mark_6) fun_mark(mark_6, mark_color_6, "is_fun_mark_6");
      is_all_mark = true;
      close_loadingMsg = true;
      Qmsg.success("标注完成😊", { showClose: true });
      document.getElementById("all-mark").value = "Cancel Mark";
    } else {
      fun_cancel_mark();
      Qmsg.success("已取消标注😊", { showClose: true });
      document.getElementById("all-mark").value = "🎨All Mark";
      document.getElementById("mark-level").value = "mark-0";
    }
  }
}, 1500);
var close_loadingMsg = false;
function debounce(callback, delay = 1000) {
  let timer = null;
  return function () {
    timer && clearTimeout(timer);
    if (!is_load_article) {
      Qmsg.warning("😥当前无数据");
    } else if (!is_all_mark && is_load_article) {
      var loadingMsg = Qmsg.loading("正在标注【等级】...");
    }
    timer = setTimeout(function () {
      callback();
      if (close_loadingMsg) {
        loadingMsg.close();
        close_loadingMsg = false;
      }
    }, delay);
  };
}
var is_tail = true;
document.getElementById("word-tail").onclick = () => {
  if (is_tail) {
    document
      .getElementsByTagName("head")
      .item(0)
      .removeChild(document.getElementById("mark"));
    document.getElementById("word-tail").value = "Tail -";
    is_tail = false;
  } else {
    var link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("id", "mark");
    link.setAttribute("href", "./css/mark.css");
    document.getElementsByTagName("head")[0].appendChild(link);
    document.getElementById("word-tail").value = "Tail +";
    is_tail = true;
  }
};
var is_to_color = false;
var is_to_color_more = false;
var is_mark_default_c = false;
var mark_word;
document.getElementById("to-color").onclick = () => {
  if (!is_to_color || is_to_color_more) {
    if (!is_mark_default || is_mark_default_c) {
      is_to_color = true;
      is_to_color_more = true;
      mark_word = mark_words_1
        .concat(mark_words_2)
        .concat(mark_words_3)
        .concat(mark_words_4)
        .concat(mark_words_5)
        .concat(mark_words_6);
      let al = [];
      let arr4 = [];
      words_filler_all.forEach((item) => {
        for (i = 0; i < mark_word.length; i++) {
          if (mark_word[i].id == item.id) {
            al.push(item);
          }
        }
      });
      words_filler_all.forEach((item) => {
        if (!al.includes(item)) arr4.push(item);
      });
      mark_word = mark_word.concat(arr4);
      var headDiv = document.getElementById("explain-head");
      headDiv.innerText = "";
      no_sort_wds(mark_word);
      if (is_also_mark_save) {
        if (mark_words_1.length) mark_color_inner(mark_words_1, mark_color_1);
        if (mark_words_2.length) mark_color_inner(mark_words_2, mark_color_2);
        if (mark_words_3.length) mark_color_inner(mark_words_3, mark_color_3);
        if (mark_words_4.length) mark_color_inner(mark_words_4, mark_color_4);
        if (mark_words_5.length) mark_color_inner(mark_words_5, mark_color_5);
        if (mark_words_6.length) mark_color_inner(mark_words_6, mark_color_6);
      }
      function no_sort_wds(wds) {
        var headDiv = document.getElementById("explain-head");
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
            if (navigator.clipboard)
              navigator.clipboard.writeText(elemInfo(o).voc);
          };
        });
      }
    } else {
      Qmsg.warning("😥当前 没有选择 【等级】");
    }
  }
};
document.getElementById("to-default-color").onclick = () => {
  if (!is_mark_default) {
    var confirm_d = confirm("确认取消单词的【等级标注】，还原为默认样式");
    if (confirm_d) {
      console.log("还原默认");
      mark_color(words_filler_all, default_color);
      document.getElementById("mark-level").value = "mark-0";
      document.getElementById("all-mark").value = "🎨All Mark";
      fresh_listWords();
      is_to_color = false;
      is_mark_default = true;
      is_mark_default_c = true;
      is_all_mark = false;
    }
  } else {
    Qmsg.warning("😥当前 没有单词【等级】标注");
  }
};
function mark_reset() {
  document.getElementById("mark-level").value = "mark-0";
  document.getElementById("all-mark").value = "🎨All Mark";
  is_to_color = false;
  is_mark_default = true;
  is_mark_default_c = false;
  is_all_mark = false;
  mark_words_1 = [];
  mark_words_2 = [];
  mark_words_3 = [];
  mark_words_4 = [];
  mark_words_5 = [];
  mark_words_6 = [];
}
