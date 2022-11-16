let add_container = document.getElementById("add-words-container");
let form_wrapper = document.querySelector(".form-wrapper");
let add_words = document.getElementById("add-words");
let add_def = document.getElementById("add-def");
let ipa_btn = document.getElementById("ipa-btn");
let cancel_btn = document.getElementById("cancel-btn");
let confirm_btn = document.getElementById("confirm-btn");
var is_add_words = false;
function open_add_words() {
  if (!is_add_words) {
    if (is_buttons_show && is_nav_show) {
      hide_nav();
      hide_buttons();
      is_nav_show = true;
    } else if (is_buttons_show && !is_nav_show) hide_buttons();
  }
  if (!is_buttons_show && is_mdx_high) {
    mdx_div.style.top = 0;
    mdx_div.style.height = "100vh";
  } else if (is_buttons_show && is_mdx_high) mdx_div.style.height = "94.5vh";
  add_container.style.display = "flex";
  document.body.style.overflow = "hidden";
  const selection = window.getSelection();
  add_words.value = selection.toString();
  is_add_words = true;
}

function close_add_words() {
  is_add_words = false;
  if (is_ipa) remove_ipa_form();
  add_words.value = "";
  add_def.value = "";
  add_container.style.display = "none";
  document.body.style.overflow = "auto";
  if (nav_btn_condition == 1) {
    show_nav();
    show_buttons();
  } else if (nav_btn_condition == 2) show_buttons();
  if (!is_buttons_show && is_mdx_high) {
    mdx_div.style.top = 0;
    mdx_div.style.height = "100vh";
  } else if (is_buttons_show && is_mdx_high) mdx_div.style.height = "94.5vh";
}
function confirm_add_words() {
  close_add_words();
  Qmsg.success("已添加");
}
var is_ipa = false;
function add_ipa_form() {
  var ipa_form = document.createElement("input");
  ipa_form.className = "input-item";
  ipa_form.id = "ipa-form";
  ipa_form.placeholder = "格式: [ˈhæpi]";
  if (!is_ipa) {
    insertAfter(ipa_form, add_words);
    is_ipa = true;
    form_wrapper.style.height = "460px";
  } else remove_ipa_form();
}
function insertAfter(newElement, targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}
function remove_ipa_form() {
  document.getElementById("ipa-form").remove();
  is_ipa = false;
  form_wrapper.style.height = "405px";
}
cancel_btn.onclick = (e) => close_add_words();
confirm_btn.onclick = (e) => confirm_add_words();
ipa_btn.onclick = (e) => add_ipa_form();
confirm_btn.onclick = () => {
  if (is_ipa) add_word_to_localStorage();
  else add_phr_to_localStorage();
  flesh_user_add();
  close_add_words();
};
function remove_word_filler_current() {
  var now_target_id = "";
  var now_target = document
    .getElementById("demo")
    .querySelector(".word-filler-current");
  if (now_target) {
    now_target_id = now_target.id;
    now_target.className = "";
  } else {
    var red_obj = document.getElementsByClassName("current-noter-container");
    if (red_obj.length) {
      var parent = red_obj[0].parentNode;
      now_target_id = parent.id;
      parent.removeChild(red_obj[0]);
      parent.className = "";
    }
  }
  for (i = 0; i < fillObjs.length; i++) {
    if (fillObjs[i].id == now_target_id) fillObjs.splice(i, 1);
  }
  currentFill--;
  fresh_listWords();
}
function add_to_knownList() {
  if (!state_in_excise) {
    var now_target_id = "";
    var now_target = document
      .getElementById("demo")
      .querySelector(".word-filler-current");
    var red_obj = document.getElementsByClassName("current-noter-container");
    if (now_target) {
      now_target_id = now_target.id;
      now_target.className = "";
    } else if (red_obj.length) {
      var parent = red_obj[0].parentNode;
      now_target_id = parent.id;
      parent.removeChild(red_obj[0]);
      parent.className = "";
    }
    if (now_target_id) {
      for (i = 0; i < fillObjs.length; i++) {
        if (fillObjs[i].id == now_target_id) fillObjs.splice(i, 1);
      }
      currentFill--;
    }
    var o = document
      .getElementById("explain-head")
      .querySelector("#" + now_target_id);
    console.log("取消标注，已屏蔽" + o.innerText);
    add_context_item(o, check_currentFill(now_target_id, true));
    if (is_mark_del) document.getElementById(now_target_id).style.color = "";
    fresh_listWords();
    var knownList_1 = JSON.parse(localStorage.getItem(now_knownList));
    knownList_1.push(o.innerText);
    localStorage.setItem(now_knownList, JSON.stringify(knownList_1));
  }
}
let new_ipa = "";
function add_word_to_localStorage() {
  let new_word = "",
    obj = {};
  new_word = add_words.value;
  new_ipa = document.getElementById("ipa-form").value;
  obj[new_word] = { ipa: new_ipa, def: add_def.value };
  var www = JSON.parse(localStorage.getItem("add-word"));
  www = { ...obj };
  localStorage.setItem("add-word", JSON.stringify(www));
}
function add_phr_to_localStorage() {
  let new_phr = "",
    obj = {};
  new_phr = add_words.value;
  obj[new_phr] = { def: add_def.value };
  var www = JSON.parse(localStorage.getItem("add-phr"));
  www = { ...obj };
  localStorage.setItem("add-phr", JSON.stringify(www));
}
function flesh_user_add() {
  user_add_word = JSON.parse(localStorage.getItem("add-word"));
  user_add_phr = JSON.parse(localStorage.getItem("add-phr"));
}
