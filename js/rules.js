// all transformation rules of English word appendings.
var ruleArray = [
  "-g-n-i",
  "-g-n-i+e",
  "-g-n-i-%2-%s-%1$$;",
  "-g-n-i-y+i+e;",
  "-s-g-n-i-%2$+e", //lodgings -> lodge
  "-s-g-n-i", //meanderings -> meander

  "-d-e$",
  "-d-e",
  "-d-e-%2-%s-%1$$",

  "-s", /////////////pl_for_a_noun,
  "-s-e-s$",
  "-s-e-c$",
  "-s-e-x$",
  "-s-e-o$",
  "-s-e-h$",
  "-s-e-i+y",
  "-s-e-v+f",

  "-s-e-v+f+e",

  "-y-l", //likely -> like
  "-y-l-i----$$$$+y", // luckily -> lucky
  "-y-l-a-c-i$$", // dramatically -> dramatic
  // "-y-l$+e", // gently-> gentle      错误：supply --> supple

  "-r-e$", //__bijiaoji
  "-r-e",
  "-r-e-i+y",
  "-r-e-%2-%s-%1$$",
  "-t-s-e$",
  "-t-s-e",
  "-t-s-e-i+y",
  "-t-s-e-%2-%s-%1$$",

  "-s-r-e$", // workers->work
  "-s-r-e",
  "-s-r-e-i+y",
  "-s-r-e-%2-%2-%1$$",

  "-c-i-%2$", //prophetic -> prophet
  "-n-o-i-%2$", // invention -> invent
  "-n-o-i-%2-a-%2$+e", // limitation -> limite
  "-n-o-i-t-i-%2$+e", // competition -> compete

  "-l-a-c$", // historical->historic
  "-l-a-c$+e", // practical->practice
  "-y-t-i-%2$", // originality->original
  "-e-v-i-t-----$$$$$$", // subjective -> subject
  "-e-v-i-t$+e-----$$$$$", // generative -> generate
  "-e-v-i-t-i-%2%+e", // competitive -> compete
  "-s-s-e-n----$$$$", // plainness -> plain
  "-t-n-e-m", // government -> govern
];
