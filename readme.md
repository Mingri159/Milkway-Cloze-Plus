# 简要介绍

原作者： [@QThePerfect](https://forum.freemdict.com/t/topic/2228)

项目仓库地址： [qtheperfect/milkyway: Milkyway-Cloze: Practice Cloze With Any Text (github.com)](https://github.com/qtheperfect/milkyway/)



二次开发： [@胡桃的精通沙](https://space.bilibili.com/96466254)

功能更新详情：[https://forum.freemdict.com/t/topic/16422](https://forum.freemdict.com/t/topic/16422)

---

##### 1、推荐使用【**Edge 浏览器**】

##### 2、文件:

- worker.js：主进程文件；

- knownList.js：使其不被标注；

- rules.js：词形还原规则；

- dict\*\*.js：词典文件；

- mark-*.js：各等级所含词汇；

- mdx-query.js：本地启动mdx-sever后，查询单词；

- add-words.js：添加【单词 | 词组】至localStorage，用于补充词典文件缺少的词条；

##### 3、[按键说明](https://mingri159.github.io/myBlog/pages/e189d2/)

##### 4、本地mdx查询单词

- 需要下载 [ninja33/mdx-server: a service to read mdx/mdd file and provide http interface (github.com)](https://github.com/ninja33/mdx-server)

- **使用详情**请查看上述链接；

# 详情

### 一、**原作**

- 原作发布地址：[最近用js写了一个用完形填空的方式进行单词语境快速识记的程序: Milkyway-Cloze](https://forum.freemdict.com/t/topic/2228)

- 原作提供的**网页版**： [Milkyway-Cloze: Awesome AI-Aided Language Skill Enhancement (milkywaycloze.tk)](https://milkywaycloze.tk/milkyway/?install=frfrm)

- 感谢 `@QThePerfect` 开源代码：[qtheperfect/milkyway: Milkyway-Cloze: Practice Cloze With Any Text (github.com)](https://github.com/qtheperfect/milkyway/)

---------

### 二、**更新**

- 一个月前发现了这款工具【Milkway-Cloze】，感觉功能出发点很好，但是**使用时却有些地方很卡手（功能缺失、缺少细节、操作不连贯等体验不好）**。于是，当时我用了一周多的空余时间，<u>针对自己的习惯，做了些相应修改</u>（称：**Milkway-Cloze-Plus**），并陆续做了些更新；
- 测试平台：**Edge浏览器**

- 主要是为了 配合[MDict ](https://www.mdict.cn/wp/?lang=zh)、 [MDictCapture](https://www.pdawiki.com/forum/forum.php?mod=viewthread&tid=13886&extra=page%3D1&_dsign=619f07d7)使用，所以该 **Milkway-Cloze-Plus**更适合用来阅读 **双语例句**（ 例：[利用碎片化时间，突破英语30000词](https://forum.freemdict.com/t/topic/9418)）；

- 推荐 [【已完结】 SIO双向双解词典v3.3](https://forum.freemdict.com/t/topic/8973/773)；查找**例句**很方便；

- <font color=BlueViolet>**平时查单词，可以顺便把例句记录下来，这样单词就有了语境；**</font>
- 使用该工具可以很方便进行复盘（可以隐藏中文）；
- 右侧自带的词典可以参考，但不推荐，**COCA20000**单词释义是用Anki的**FastWordQuery**获取的；
- [ReadMe | 胡桃的精通沙 (mingri159.github.io)](https://mingri159.github.io/myBlog/pages/e189d2/)
- 推荐词典：**牛津、柯林斯、朗文、英汉大词典（第二版）**

- **【Milkway-Cloze-Plus】**图例：![3](https://forumcdn.freemdict.com/uploads/default/original/3X/0/c/0cc160d71536eac2149903efadd0ee4ceade37c2.png)![4](https://forumcdn.freemdict.com/uploads/default/original/3X/6/c/6c5061a2858c2e3a15de13ea5bbd1714dcebcd7e.png)![5](https://forumcdn.freemdict.com/uploads/default/original/3X/0/7/0775ebe5ec28e8886ffdf9a4d1337e7096763d48.png)![6](https://forumcdn.freemdict.com/uploads/default/original/3X/9/f/9f0dd6543242e62463a64316d17bdc274053f747.png)![7](https://forumcdn.freemdict.com/uploads/default/original/3X/7/a/7a522d27fc89be91be45c878eec9a3d9df995950.png)

#### 【**新增功能**介绍】：

**(1)**、右侧**单词列表**添加了**序号**；可移动到左侧，或者**隐藏**（然后使用**MDict**搭配**牛津8**、**朗文**或**柯林斯**均可；若为了<u>在例句语境中学单词</u><u>，不推荐右侧自带的释义</u>）；**右键**单击【**生词**】还可**一键复制**列表中的生词，然后使用其他工具进一步处理（例：Anki、 [欧路词典 (eudic.net)](http://my.eudic.net/studylist/import/) ）；

**(2)、正文部分：**

- > 1. 用 **正则** 匹配了**中文**，所以可换行、可**隐藏**；【复盘双语例句时很有用吧，可能】
  > 2. **正文部分**英文字体大小可调；
  > 3. 自动标注出来的**生词**，**点击**时有红色状态框；
  > 4. **空格键**，可切换该处为填空，再次空格键，可**还原**；并对输入做了优化，**非填空状态**，不能输入，退格键一次**删除一位**；
  > 5. **焦点**从某个标注的单词移开时，上一个和下一个都会有拼写检查，错误会有弹窗提示；焦点移动至输入错误的位置时，可**直接**编辑修改；亦可使用4.【空格键】直接还原；
  > 6. **左键双击** 未被标注的单词 ，会获取网络发音（有道）、**复制**（用于唤起MDict查词），并变**浅红色**；
  > 7. **左键单击**浅红色，可直接复制、发音；
  > 8. **右键** 单击 双击生成的**浅红色**单词时，会取消标注；
  > 9. 鼠标划过7处理过的单词时，光标会有变化，予以提示；
  > 10. 双击8中提到的单词，则可以再次 赋予 标注状态；
  > 11. 添加了**方向键**作为**上一个** **下一个**切换，已屏蔽方向键默认功能，屏幕不会滚动；（options.js可修改前进步数，默认为5）

(3)、导出 时会将浅红色的单词一并导出；亦可从历史文件中批量导入；

(4)、可全屏模式；同【F11】；

(5)、关于等级（使用**默认COCA20000**或**CET-6**均可，**看个人**）：

- > 【以下针对使用 **本地文件 - 离线版** 时】
  >
  > 1. 若想某个单词能够 **填空**，就先看看【badList.js】里有没，有就注释掉，没有就把它添加到【dict9k.js】末尾；
  > 2. 若想某个单词 **不再出现填空**，就把它添加到【badList.js】末尾即可；
  > 3. 由于浏览器无法直接操作本地文件，所以只能**手动**增删；

(6)、推荐使用**黑色主题**；

(7)、使用-**导入文本**

- 文本框输入![QQ截图20221205092641](https://forumcdn.freemdict.com/uploads/default/original/3X/4/1/410d300eeb0ba7dee0ea24dbe570b6845ed5f5e2.png)

- 导入txt、html、json文件![QQ截图20221205092554](https://forumcdn.freemdict.com/uploads/default/original/3X/9/c/9c95ca5ad205189ad5a5d44e9d8fc4c791bc2607.png)

-------

- 大概就是以上内容了；主要是对操作上细节的处理，优化使用体验；可能会存在未知的bug，不过目前可正常使用【测试平台：**Edge浏览器**】；

- 感谢 `@QThePerfect` 已经做了完整的基础功能，**<font color=BlueViolet>有许多设计都很巧妙</font>**；

--------

### 三、**后续更新**

- 【更新文件见上方蓝奏云，下载【最新】并替换对应文件】

- **偷看一眼**（当处于【中文-隐藏】模式时**生效**）![偷看一眼](https://forumcdn.freemdict.com/uploads/default/original/3X/0/7/078aecb52797ff0105658dac824fd6eb0acd8a4a.gif)

- 添加【**生词**】按钮，定位至生词列表（可在阅读文章前**阅览一遍生词**）；【该处已优化为**生词弹窗**】

- 右侧单词列表、生词弹窗中，**右键单击**黄色、绿色单词，可使文中取消标注（用于取消简单词的标注）；![右键取消标注](https://forumcdn.freemdict.com/uploads/default/original/3X/e/0/e004661c283ee22869912788fc7f977cfa246846.gif)

- Ctrl+Z 可撤销上述操作【由于存在BUG，取消文中右键单击功能】

- **<font color=MediumOrchid>---------------2022.10.13---------------：</font>**

- 单词释义列表同步文章窗口滚动；![单词释义列表同步文章滚动](https://forumcdn.freemdict.com/uploads/default/original/3X/2/3/23be1b6ca4a92cd608b1a75da0706d453b0c0995.gif)

- 合并【生词】【COPY】按钮，设置独立的**生词弹窗**；右键单击【生词】一键复制；![生词弹窗](https://forumcdn.freemdict.com/uploads/default/original/3X/9/6/9607472debee0a0d71be614dd6415b43d36852c1.gif)

- 增加了**COCA20000**词典文件**dict2w.js**，其中包含了**大量基础词汇**，没有去除；在【**English level**】中选择；点击【Click To Start】生效；

- **<font color=MediumOrchid>---------------2022.10.17---------------：</font>**

- 增加了【**导入badList**】按钮，用于**屏蔽基础词汇**，可在顶部文本框中批量导入，亦或是在**单词列表**右键单击导入该单词（Ctrl+Z可撤回）;

- F12打开**控制台**，找到【应用程序】下的【本地存储】badList条目，【复制object】即可复制到剪贴板，可粘贴到记事本查看；

- 增加【**查看已屏蔽**】读取localStorage中保存的badList，输出到文本框，用于查看已经屏蔽了多少词汇；![image](https://forumcdn.freemdict.com/uploads/default/original/3X/b/2/b2a62577cc99b886bf34945bba12274a80772346.png)

- **<font color=MediumOrchid>---------------2022.10.25---------------：</font>**

- **词汇分级标注**：【类 **蒙哥阅读器**】（花里胡哨）![词汇分级34](https://forumcdn.freemdict.com/uploads/default/original/3X/3/c/3c256dcc78f8b9b98f1138472d8343c015ca5796.png)

- 【**Tail +**】开启/关闭 **词汇分级**的小尾巴

- **<font color=MediumOrchid>---------------2022.10.26---------------：</font>**

- **生词弹窗** 里4个按钮功能介绍：![image](https://forumcdn.freemdict.com/uploads/default/original/3X/4/6/467fb234fe063af1d923f8d4a323591f3f2711e0.png)

  > 【↑】： 按字母顺序 排序；【•】 ：还原默认；
  > 【M】：【Mark】按词汇标注的等级排序；
  > 【D】：【Default】清除等级标注；（不影响 2 【M】的功能)
  > 【C】：【Copy】一键复制生词；

- 增加【:art:All Mark】按钮，功能：一键标注**全部等级**；【Cancel Mark】：取消全部标注；

- 增加【**宽点**】按钮，功能：加宽 右侧单词释义列表，仅在**右侧时**有效；【窄点】：恢复**默认宽度**；

- **<font color=MediumOrchid>---------------2022.10.27---------------：</font>**

- 增加【释义-**隐藏**】按钮，功能：一键隐藏右侧释义列表释义项；【释义-**显示**】：恢复默认；

- 增加【:balloon:Nav +】按钮，功能：隐藏顶部输入框等信息；【:balloon:**Nav -**】：恢复默认；![image](https://forumcdn.freemdict.com/uploads/default/original/3X/8/a/8a184c414a1561907541315341b45c71ccb98f18.png)

- 【:page_facing_up:**Load Article**】除了可以读取由【:rocket: Export】导出的 **json文件**；还可读取 **txt文件**，效果等同【复制文本到输入框再点 **Click To Start**】

- 【:page_facing_up:**Load Article**】增加校验，只加载**一个**json/txt文件；

- **<font color=MediumOrchid>---------------2022.10.29---------------：</font>**

- 可识别文中**带连字符**的单词，**首字母大写**的单词、**全部大写**的单词；
  如果没有识别，那是词典文件里没有该词条；

- **<font color=MediumOrchid>---------------2022.10.30---------------：</font>**

- 做了个简易的设置弹窗；![image](https://forumcdn.freemdict.com/uploads/default/original/3X/e/2/e2e6cb5cdd411c3f5bb36d46971143035d8e7c41.png)

- **<font color=MediumOrchid>---------------2022.10.31---------------：</font>**

- 在 设置弹窗 中 可添加用户；在导航区可 切换用户；

  ![image](https://forumcdn.freemdict.com/uploads/default/original/3X/8/5/85c1697ed7d8976587cb8196829a984bcb5eda74.png)

- **<font color=MediumOrchid>---------------2022.11.3---------------：</font>**

- 【填空模式】 初次打开填空模式，自动定位至第一个填空；

- 【填空模式】去除**当前位置**（切换至上一个、下一个时）校验的 **错误提示**；

- 【填空模式】当输入正确时，自动切换至下一个填空；

- 修复：填空模式下，当删除完填空内的字符并切换至下一个时，该位置无法再被定位到的问题；

- 注意：一部分单词发音是原形的发音，因此在填空时，需注意**时态**及复数；

- **<font color=MediumOrchid>---------------2022.11.9---------------：</font>**

- 【添加】：载入文件类型添加**html**，并对其**预处理**（去除所有 **id、class**，并去除 [ p、strong、em、i ] 之外的所有标签）

- 处理：载入html文件后，双击获取网络发音失效问题；

- 处理： **滚动条的滑块过小 不易拖动**的问题

- 【 添加】：**【词组识别】功能**

  > 不能识别 含人称代词、标点符号、中文的词组；【词典文件里不要添加这些】

- **<font color=MediumOrchid>---------------2022.11.10---------------：</font>**

- 优化【词组识别】，词组**长度不限**，问题同上；

- 处理，使用右键屏蔽单词后及【Ctrl+Z】后，当前**定位**问题；（用于方向键切换上一个、下一个）

- 【添加】：快捷键【Ctrl+X】，用于 **隐藏/显示**页面中的非阅读区域；配合【F11】【全屏】阅读体验更佳；

- **<font color=MediumOrchid>---------------2022.11.11---------------：</font>**

- 【添加】：快捷键【Ctrl+A】，右侧**释义列表**【宽点】；

- 【添加】：快捷键【Ctrl+S】，打开设置弹窗；

- 【添加】：快捷键【Ctrl+D】，清除/恢复**重复生词**的标注；

- 【添加】：【设置7】关闭时，将一同清除文中**重复生词**的标注；可使用【Ctrl+D】恢复标注；

- 【优化】：【词组识别】

  > 1. 识别到一个词组后，**长度为1**的不予记录（正常是不会有这样的数据的，出现该问题的**原因未知**)；
  > 2. 识别完成后，将汇总结果**去重**，以免在文中匹配时，生成大量重复数据；

- 【修复】：【生词弹窗】

  > 1. 按字母排序后，右键单击时没有保持字母排序的问题；
  > 2. 再次打开【生词弹窗】，保持上次的排序方式；

- **<font color=MediumOrchid>---------------2022.11.12---------------：</font>**

- 【添加】：【Ctrl+鼠标滚轮】

  > 1. **输入框**激活时，**缩放**【输入框】字体
  > 2. 输入框未激活时，**缩放**【阅读区】字体；
  > 3. 【Ctrl+Shift+滚轮】，**缩放**【浏览器页面】；

- 【添加】：【Ctrl+M】，将【红色状态框】内的词屏蔽；【同右侧释义列表的右键单击】

- 【更改】:【关于右键单击及快捷键 [Ctrl+M] 的使用方法】

  > 1. 在【生词弹窗】【右侧释义列表】，右键单击【屏蔽该词，添加至knownList】【同以往】；
  >
  > 2. 在【阅读区】，**右键单击**【按键5（绿色）】的标注 —> 使其恢复为【生词（橙色）】【同以往】；
  >
  > 3. 在【阅读区】，**右键单击**【生词（橙色）】的标注 —> 使其无标注；【用于消除**程序识别错误**的词组】【可双击恢复】【新】；【Ctrl+Z无效】
  >
  > 4. 在【阅读区】，快捷键【Ctrl+M】【屏蔽该词，添加至knownList】；作用于红色状态框的**单词/词组**【通过 鼠标单击|方向键切换 出现】【新】；【可 Ctrl+Z 恢复】
  >
  >    ![image](https://forumcdn.freemdict.com/uploads/default/original/3X/8/5/85fa1a290af802b22c288f3af74c9ff8b42024a0.png)![image](https://forumcdn.freemdict.com/uploads/default/original/3X/7/9/79c0ec75b3ef770dd15fd342a7c6cf255cf27cef.png)

- 【处理】：右键取消【阅读区】的某个单词的标注后的定位问题；

- **<font color=MediumOrchid>---------------2022.11.13---------------：</font>**

- **本地启动 mdx-sever 后，可在该页面内查词；**

  > 1. [ninja33/mdx-server: a service to read mdx/mdd file and provide http interface (github.com)](https://github.com/ninja33/mdx-server)
  > 2. [einverne/mdx-server at morphology (github.com)](https://github.com/einverne/mdx-server/tree/morphology) 【查词时可词形还原】
  > 3. **Python**下载地址：https://www.python.org/downloads/windows/

- 查词窗口：

  > 1. 可拖动；
  > 2. 可缩放；
  > 3. 可隐藏；
  > 4. 内容可缩放；

- 查词方式：

  > 1. 单击任意被标注的单词；
  > 2. 双击未被标注的单词；
  > 3. 词组：鼠标选中后，鼠标中键点击；
  > 4. Ctrl+Shift+Space，输入框填入单词，点击查询；

  ![本地mdx查词](https://forumcdn.freemdict.com/uploads/default/original/3X/d/1/d1bb2800c246bc0cd75d7764addc2b784739b6c0.gif)

- **<font color=MediumOrchid>---------------2022.11.14---------------：</font>**

- 添加颜色选择器，便于更换词典**背景颜色**；

  ![QQ截图20221114114321](https://forumcdn.freemdict.com/uploads/default/original/3X/3/b/3bbd8426e9f2872460e4ab71f9e1560f643ea4cd.png)

- 在查询页面下方，展示出词形还原的结果，**便于切换查询**；例：文中标注了permanently，点击后，mdx查询不到，这时可点击最下方的 **permanent** 查询；![QQ截图20221114141446](https://forumcdn.freemdict.com/uploads/default/original/3X/4/5/450e50943d60a11d8ca7adaba9da95301cee3fe1.png)

- 关于词形还原：

  > 1. 在文章加载后，自行词形还原，去词典文件中匹配词条；【依据**还原规则**】【有失误的地方：stepped–>steppe；正确：stepped–>step】
  > 2. mdx-server-morphology 自带词形还原；【依据**还原词条文件**】
  > 3. mdx窗口下方；【依据还原规则】【会出现许多**不是单词**的单词，例：inclined\incline\ <u>inclin</u>；blocking\block\ <u>blocke</u>】

- 添加：快捷键【Ctrl+B】，打开/关闭 mdx查词窗口；

- **<font color=MediumOrchid>---------------2022.11.15---------------：</font>**

- 添加：快捷键【Ctrl+Shift+Space】，打开窗口，可添加【单词 | 词组】至**LocalStorage**；也可用于**查单词**；

  > 用户自己添加的**单词**，默认跟随【COCA20000】，一同标注；
  > 用户自己添加的**词组**，默认跟随【词组】，一同标注；

- 更改【下拉单选】为【下拉多选】，可单独标注【词组】；![image](https://forumcdn.freemdict.com/uploads/default/original/3X/2/b/2bfa6f3399468da244adfe1f4a51b224638184f1.png)

- 添加，【Ctrl+滚轮】，缩放mdx查词页面；【需鼠标置于**顶部功能栏**】![mdx页面缩放](https://forumcdn.freemdict.com/uploads/default/original/3X/d/f/df2bae19cc66f2339825185d09aa450360c8c833.gif)

- **<font color=MediumOrchid>---------------2022.11.17---------------：</font>**

- 修复，Cet-4不生效问题；

- 优化，mdx窗口默认缩放1.2X；

- 添加，点击空白处，mdx窗口取消最宽状态；![点击空白处，mdx页面取消最宽](https://forumcdn.freemdict.com/uploads/default/original/3X/6/b/6b5137a9d2300ea2bf911b1e5d21bdbf6b5865b0.gif)

- **<font color=MediumOrchid>---------------2022.12.3---------------：</font>**

- 添加：【设置】配置项，Cloze模式下，跳转上一个单词时，清空单词；

- 优化：【空格键】切换【填空】与【还原】时的逻辑；

### 四、其他：

- 控制台 查单词代码（没什么用）：

  ```js
  dict2w.word;//单词：word
  dict9k.foreword;//单词：foreword
  dictList.abash;//单词：abash
  ```

- 控制台查看内部词典数据代码：

  ```js
  console.log(Object.keys(dict2w));
  console.log(Object.keys(dict9k));
  console.log(Object.keys(dictList));
  ```

- 控制台查看各等级词表

  ```js
  console.log('中考:',mark_1);
  console.log('高考:',mark_2);
  console.log('考研:',mark_3);
  console.log('六级:',mark_4);
  console.log('专八:',mark_5);
  console.log('GRE:',mark_6);
  ```

- **<font color=MediumOrchid>---------------2022.10.27---------------：</font>**

- 自动生成的生词表，经过右键屏蔽掉认识的单词后，可以【C】一键复制，然后导入欧路生词表；网址：![导入欧路生词本](https://forumcdn.freemdict.com/uploads/default/original/3X/a/2/a23537c4ec929f0d6ff5f206a5155de2a4cb0950.jpeg)

- **<font color=MediumOrchid>---------------2022.10.28---------------：</font>**

- 关闭点击生词发音、双击未标注单词获取网络发音；右侧单词释义列表可正常发音【F12 控制台】

  ```js
  方向键 前进后退 步数 ， 默认5
  step = 5;//可修改为其他大于0的整数
  ```

- 生词弹窗、右侧单词释义列表 右键单击时 文中的等级标注 (颜色) 是否取消 ；默认取消

  ```js
  is_mark = true;   //取消
  is_mark = false;  //不取消
  ```

- 等级选择框 选择默认后 生词弹窗【M】按钮 是否要保存等级排序 【已使用】, 默认保存

  ```js
  is_also_mark = true; // 保存
  is_also_mark = false; // 不保存
  ```

- **<font color=MediumOrchid>---------------2022.10.29---------------：</font>**

- 双击选中状态 默认不选中

  ```js
  is_dbl_select = false; //关闭
  is_dbl_select = true; //开启选中
  ```

- 原生右键菜单 默认屏蔽

  ```js
  is_menu_prevent = true; //屏蔽
  is_menu_prevent = false; //开启
  ```

