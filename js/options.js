// 方向键 前进后退 步数  【已使用】
var step = 5;

// 生词弹窗、右侧单词释义列表  右键单击时  文中的等级标注  是否取消   【已使用】
var is_mark = true;

// 选择高等级时，清除低等级的标注  【未使用】
var mark_clear = false;

// 选择高等级时， 低等级的也同时自动标注 【未使用】
var mark_too = false;

// 等级选择框 选择默认后  生词弹窗【M按钮】是否要保存等级排序  【已使用】
var is_also_mark = true;

// 提示 弹窗
window.QMSG_GLOBALS = {
  DEFAULTS: {
    showClose: false,
    timeout: 2000, //停留时间
  },
};
