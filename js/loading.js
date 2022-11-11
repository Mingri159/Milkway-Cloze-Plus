// 首页加载时loading
document.onreadystatechange = completeLoading;
// 加载状态为complete时移除loading效果
function completeLoading() {
  if (document.readyState == "complete") {
    setTimeout(() => {
      document.getElementById("main-loading").style.display = "none";
    }, 800);
  } else {
    document.getElementById("main-loading").style.display = "block";
  }
}
