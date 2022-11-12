var is_add_words = false;
var is_ipa = false;

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
    var knownList_1 = JSON.parse(localStorage.getItem(now_knownList)); //mutil-users 探路
    knownList_1.push(o.innerText);
    localStorage.setItem(now_knownList, JSON.stringify(knownList_1)); //mutil-users 探路
  }
}
