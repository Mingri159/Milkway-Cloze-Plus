var initlist = ["Cet-4", "Cet-6", "COCA20000", "词组"];
var init_list_value = ["dictList", "dict9k", "dict2w", "dict_phr"];
var all_check_box;
var selectdiv = document.getElementById("selectdiv");
var indiv = false;
var selectedlist = ["dict2w"];
var selectednamelist = ["COCA20000"];
window.onload = function () {
  for (var i = 0; i < initlist.length; i++) {
    var tmpdiv = document.createElement("div");
    var tmpinput = document.createElement("input");
    tmpinput.setAttribute("name", "mycheckbox");
    tmpinput.setAttribute("type", "checkbox");
    tmpinput.setAttribute("onclick", "mycheck(this)");
    tmpinput.setAttribute("value", init_list_value[i]);
    if (init_list_value[i] == "dict2w") {
      tmpinput.setAttribute("checked", true);
      document.getElementById("selectButton").value = selectednamelist;
    }
    var tmptext = document.createTextNode(initlist[i]);
    tmpdiv.appendChild(tmpinput);
    tmpdiv.appendChild(tmptext);
    tmpdiv.setAttribute("onclick", "mycheck(this)");
    selectdiv.appendChild(tmpdiv);
  }
  document.onclick = function (event) {
    if (event.target.id == "selectButton" || indiv) {
      return;
    }
    selectdiv.style.display = "none";
  };
  defaultChecked();
  function defaultChecked() {
    for (var i = 0; i < initlist.length; i++) {}
  }
  all_check_box = document
    .getElementById("selectdiv")
    .querySelectorAll("input");
};
function myclick() {
  selectdiv.style.display = "block";
}
function mousein() {
  indiv = true;
}
function mouseout() {
  indiv = false;
}
function mycheck(obj) {
  if (obj.tagName == "DIV") {
    obj = obj.children[0];
    if (!obj.checked) {
      obj.checked = true;
      selectedlist.push(obj.value);
      selectednamelist.push(obj.nextSibling.nodeValue);
    } else {
      if (selectedlist.length > 1) {
        obj.checked = false;
        for (var i = 0; i < selectedlist.length; i++) {
          if (selectedlist[i] == obj.value) {
            selectedlist.splice(i, 1);
            selectednamelist.splice(i, 1);
          }
        }
      } else {
        alert("至少选择一项");
        obj.checked = true;
      }
    }
  } else {
    if (obj.checked) {
      selectedlist.push(obj.value);
      selectednamelist.push(obj.nextSibling.nodeValue);
    } else if (selectedlist.length > 1) {
      for (var i = 0; i < selectedlist.length; i++) {
        if (selectedlist[i] == obj.value) {
          selectedlist.splice(i, 1);
          selectednamelist.splice(i, 1);
        }
      }
    } else {
      alert("至少选择一项");
      obj.checked = true;
    }
  }
  document.getElementById("selectButton").value = selectednamelist;
}
function use_dict_json(str) {
  selectedlist = [];
  selectednamelist = [];
  for (i = 0; i < all_check_box.length; i++) {
    all_check_box[i].checked = false;
  }
  selectedlist = str.split("+");
  for (var i = 0; i < selectedlist.length; i++) {
    for (j = 0; j < init_list_value.length; j++) {
      if (selectedlist[i] == init_list_value[j]) {
        selectednamelist.push(initlist[j]);
      }
    }
  }
  document.getElementById("selectButton").value = selectednamelist;
  for (i = 0; i < all_check_box.length; i++) {
    for (j = 0; j < selectedlist.length; j++) {
      if (all_check_box[i].value == selectedlist[j]) {
        all_check_box[i].checked = true;
      }
    }
  }
}
