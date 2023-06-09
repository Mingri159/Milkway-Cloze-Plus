// 方向键 前进后退 步数  【已使用】
var step = 5;

// 生词弹窗、右侧单词释义列表  右键单击时  文中的等级标注  是否取消   【已使用】
var is_mark_del = true;

// 选择高等级时，清除低等级的标注  【未使用】
var mark_clear = false;

// 选择高等级时， 低等级的也同时自动标注 【未使用】
var mark_too = false;

// 等级选择框 选择默认后  生词弹窗【M按钮】是否要保存等级排序  【已使用】
var is_also_mark_save = true;

// 主窗口  单击 双击 控制发音、复制  【已使用】
var is_voc_copy_explain = true;

// 主窗口  点击生词时  发音 ；不影响右侧单词释义列表正常发音 【已使用】
var is_voc = true;

// 主窗口  点击生词时 自动复制  【已使用】
var is_copy = true;

// 主窗口  点击生词时 右侧跳转释义详情  【已使用】
var is_explain = true;

// 主窗口 双击未标注的  标注为红色 发音 复制 【已使用】
var is_select_mark = true;

// word-filler 双击选中状态 默认不选中   【已使用】
var is_dbl_select = false;

// 原生右键菜单 默认屏蔽     【已使用】
var is_menu_prevent = true;

// 标注出重复的单词 word-filler-dup 【已使用】
var is_dup = true;

// 阅读区 右键取消标注功能  【已使用】
var is_read_rit_clk_blk = true;

// 词组识别 是否启用预置文件  【未使用】
var is_phr_preset = true;

//在完型填空模式下 跳转上一个单词时 清空单词拼写
var is_cloze_last_clear = false;

// 提示 弹窗
window.QMSG_GLOBALS = {
  DEFAULTS: {
    showClose: false,
    timeout: 2000, //停留时间
  },
};
