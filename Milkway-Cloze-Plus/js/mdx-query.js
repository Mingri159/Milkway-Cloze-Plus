jscolor.presets.default = {
  palette: [
    "#000000",
    "#7d7d7d",
    "#870014",
    "#ec1c23",
    "#ff7e26",
    "#fef100",
    "#22b14b",
    "#00a1e7",
    "#3f47cc",
    "#a349a4",
    "#ffffff",
    "#c3c3c3",
    "#b87957",
    "#feaec9",
    "#ffc80d",
    "#eee3af",
    "#b5e61d",
    "#99d9ea",
    "#7092be",
    "#c8bfe7",
  ],
};
function update(picker, selector) {
  document.querySelector(selector).style.background = picker.toBackground();
}
let mdx_div = document.getElementById("mdx-div"),
  mdx_move = document.getElementById("mdx-btn-wrapper"),
  mdx_resize = document.getElementById("mdx-resize"),
  size = mdx_resize.offsetWidth,
  max_width = 1600,
  max_height = 1000,
  min_width = 340,
  min_height = 350;
var is_mdx_show = false;
var is_mdx_high = false;
var is_mdx_wide = false;
var mdx_position = { top: "", left: "", right: "", width: "", height: "" };
document.getElementById("local-mdx").onclick = () => mdx_show();
function mdx_show() {
  if (!is_mdx_show) {
    mdx_div.style.display = "block";
    is_mdx_show = true;
    zoom_iframe(1.2);
    init_zoom_iframe = 1.2;
  } else {
    mdx_div.style.display = "none";
    is_mdx_show = false;
  }
}
document.getElementById("mdx-btn").onclick = (e) => mdx_show();
document.getElementById("query-btn").onclick = (e) => query_fun();
function query_fun() {
  if (add_words.value) {
    if (is_mdx_show) go_to_mdx(add_words.value);
    else
      window.open(
        "https://www.youdao.com/result?word=" + add_words.value + "&lang=en",
        "_blank"
      );
  }
}
function go_to_mdx(mdx_word) {
  word_query(mdx_word);
  var word_r = word2rules(mdx_word, ruleArray);
  var str = "";
  for (i = 0; i < word_r.length; i++) {
    str += "<li>" + word_r[i] + "</li>";
  }
  document.getElementById("mdx-word-hold").innerHTML = str;
  var word_r_lis = document
    .getElementById("mdx-word-hold")
    .querySelectorAll("li");
  for (var i = 0; i < word_r_lis.length; i++) {
    let li_val = word_r_lis[i].innerText;
    word_r_lis[i].onclick = () => word_query(li_val);
  }
}
function word_query(mdx_word) {
  document.getElementById("mdx-iframe").src =
    "http://localhost:8000/" + mdx_word;
}
document.getElementById("demo").onmousedown = (e) => {
  const selection = window.getSelection();
  if (e.button == 1) {
    e.preventDefault();
    go_to_mdx(selection.toString());
  }
};
mdx_move.onmousedown = (e) => {
  let wrapTop = mdx_div.offsetTop,
    wrapLeft = mdx_div.offsetLeft,
    wrapHeight = mdx_div.offsetHeight,
    wrapWidth = mdx_div.offsetWidth,
    cursorY = e.clientY,
    cursorX = e.clientX,
    positionY = document.documentElement.clientHeight - wrapHeight,
    positionX = document.documentElement.clientWidth - wrapWidth;
  document.onmousemove = (e) => {
    let changeY = e.clientY - cursorY + wrapTop,
      changeX = e.clientX - cursorX + wrapLeft;
    if (changeY <= 0 || changeY > positionY) {
      changeY = Math.max(0, Math.min(changeY, positionY));
    }
    if (changeX <= 0 || changeX > positionX) {
      changeX = Math.max(0, Math.min(changeX, positionX));
    }
    mdx_div.style.cssText += `top:${changeY}px;left:${changeX}px;`;
    if (is_mdx_high) {
      is_mdx_high = false;
      document.getElementById("mdx-div-2").innerText = " ⇳ ";
      mdx_div.style.right = "20px";
      mdx_div.style.width = "380px";
      mdx_div.style.height = "500px";
    }
  };
};
mdx_resize.onmousedown = (e) => {
  e.stopPropagation();
  let wrapTop = mdx_div.offsetTop,
    wrapLeft = mdx_div.offsetLeft,
    wrapHeight = mdx_div.offsetHeight,
    wrapWidth = mdx_div.offsetWidth,
    cursorY = e.clientY,
    cursorX = e.clientX,
    positionY = wrapTop + wrapHeight - size,
    positionX = wrapLeft + wrapWidth - size;
  document.onmousemove = (e) => {
    let changeY = e.clientY - cursorY,
      changeX = e.clientX - cursorX,
      [iwrapTop, iwrapLeft, iwrapHeight, iwrapWidth] = [
        wrapTop,
        wrapLeft,
        wrapHeight,
        wrapWidth,
      ];
    iwrapTop = wrapTop + changeY;
    iwrapLeft = wrapLeft + changeX;
    iwrapWidth = wrapWidth - changeX;
    iwrapHeight = wrapHeight - changeY;
    iwrapTop = Math.min(iwrapTop, positionY);
    iwrapLeft = Math.min(iwrapLeft, positionX);
    iwrapWidth = Math.max(size, iwrapWidth);
    iwrapHeight = Math.max(size, iwrapHeight);
    if (iwrapWidth >= max_width) {
      iwrapWidth = max_width;
      iwrapLeft = mdx_div.offsetLeft;
    }
    if (iwrapHeight >= max_height) {
      iwrapHeight = max_height;
      iwrapTop = mdx_div.offsetTop;
    }
    if (iwrapWidth <= min_width) {
      iwrapWidth = min_width;
      iwrapLeft = mdx_div.offsetLeft;
    }
    if (iwrapHeight <= min_height) {
      iwrapHeight = min_height;
      iwrapTop = mdx_div.offsetTop;
    }
    mdx_div.style.cssText += `top:${iwrapTop}px;left:${iwrapLeft}px;width:${iwrapWidth}px;height:${iwrapHeight}px`;
    if (is_mdx_wide) {
      is_mdx_wide = false;
      document.getElementById("mdx-div-4").innerText = " ⇦ ";
    }
  };
};
document.onmouseup = () => {
  document.onmousemove = null;
};
document.getElementById("mdx-div-1").onclick = () => {
  mdx_div.style.display = "none";
  is_mdx_show = false;
};
document.getElementById("mdx-div-2").onclick = () => {
  if (!is_mdx_high) {
    if (!is_wide) wide_more();
    if (!is_mdx_wide) mdx_div_position_record();
    mdx_div.style.removeProperty("left");
    mdx_div.style.right = 0;
    mdx_div.style.top = 0;
    mdx_div.style.width = "30%";
    if (is_buttons_show) mdx_div.style.height = "94.5vh";
    else mdx_div.style.height = "100vh";
    document.getElementById("mdx-div-2").innerText = " ⇵ ";
    document.getElementById("mdx-div-4").innerText = " ⇦ ";
    is_mdx_high = true;
    is_mdx_wide = false;
  } else {
    wide_more();
    mdx_div.style.removeProperty("right");
    mdx_div.style.left = mdx_position.left;
    mdx_div.style.top = mdx_position.top;
    mdx_div.style.width = mdx_position.width;
    mdx_div.style.height = mdx_position.height;
    document.getElementById("mdx-div-2").innerText = " ⇳ ";
    document.getElementById("mdx-div-4").innerText = " ⇦ ";
    is_mdx_high = false;
    is_mdx_wide = false;
  }
};
document.getElementById("mdx-div-3").onclick = () => {
  mdx_div.style.removeProperty("left");
  mdx_div.style.right = 0;
};
document.getElementById("mdx-div-4").onclick = () => {
  if (!is_mdx_wide) {
    is_mdx_wide = true;
    if (!is_mdx_high) mdx_div_position_record();
    mdx_div.style.removeProperty("left");
    mdx_div.style.width = "80%";
    document.getElementById("mdx-div-4").innerText = " ⇿ ";
  } else {
    close_mdx_wide();
  }
};
document.getElementById("mdx-div-5").onclick = () => {
  window.parent.history.forward(1);
};
document.getElementById("mdx-div-6").onclick = () => {
  window.parent.history.back(-1);
};
document.getElementById("mdx-div-7").onclick = () => {
  resize_default();
  if (is_mdx_high) {
    is_mdx_high = false;
    document.getElementById("mdx-div-2").innerText = " ⇳ ";
  }
  if (is_mdx_wide) {
    is_mdx_wide = false;
    document.getElementById("mdx-div-4").innerText = " ⇦ ";
  }
};
function mdx_div_position_record() {
  mdx_position.top = mdx_div.style.top;
  mdx_position.left = mdx_div.style.left;
  mdx_position.width = mdx_div.style.width;
  mdx_position.height = mdx_div.style.height;
}
function resize_default() {
  if (mdx_div.style.left) mdx_div.style.removeProperty("left");
  mdx_div.style.right = 0;
  mdx_div.style.top = "100px";
  mdx_div.style.width = "380px";
  mdx_div.style.height = "500px";
  is_resize_default = true;
}
var init_zoom_iframe = 1;
let mdx_iframe = document.getElementById("mdx-iframe");
function zoom_iframe(m) {
  mdx_iframe.style.width = 100 / m + "%";
  mdx_iframe.style.height = 100 / m + "%";
  mdx_iframe.style.transform = "scale(" + m + ")";
}
function mdx_wheel(e) {
  e = e || window.event;
  if (e.shiftKey) return;
  if (e.ctrlKey) {
    e.preventDefault();
    e.stopPropagation();
    if (e.wheelDelta < 0 || e.detail < 0) {
      init_zoom_iframe -= 0.1;
      if (init_zoom_iframe < 1) init_zoom_iframe = 1;
      zoom_iframe(init_zoom_iframe);
    } else if (e.wheelDelta > 0 || e.detail > 0) {
      init_zoom_iframe += 0.1;
      if (init_zoom_iframe > 1.5) init_zoom_iframe = 1.5;
      zoom_iframe(init_zoom_iframe);
    }
  }
}
document
  .getElementById("mdx-div")
  .addEventListener("wheel", mdx_wheel, { passive: false });
document.getElementById("mdx-div").addEventListener("mouseout", function () {
  if (is_mdx_wide)
    document.getElementById("text-container").onclick = close_mdx_wide;
});
function close_mdx_wide() {
  if (!is_mdx_high) {
    mdx_div.style.left = mdx_position.left;
    mdx_div.style.top = mdx_position.top;
    mdx_div.style.height = mdx_position.height;
  }
  if (is_mdx_high && is_wide) {
    mdx_div.style.width = "30%";
  } else if (is_mdx_high && !is_wide) {
    mdx_div.style.width = "22%";
  } else mdx_div.style.width = mdx_position.width;
  is_mdx_wide = false;
  document.getElementById("mdx-div-4").innerText = " ⇦ ";
}
