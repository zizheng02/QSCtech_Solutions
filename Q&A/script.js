const data = [
  {
    title: "这是问题",
    content: "这是答案",
  },
  {
    title: "浙大最潮的学生组织是?",
    content: "求是潮",
  },
  {
    title: "求是潮的办公室在哪里？",
    content: "小剧场B217",
  },
  {
    title: "想不出问题了随便写点什么吧",
    content: "想不出答案了随便写点什么吧",
  },
  {
    title: "我的id是?",
    content: "黏魔",
  },
];
// 获取到容器container,每个问题都是一个Box,先只插入title。
// 点击title后，加入content。通过改变className来管理元素的状态
// 再次点击后删除content

var container = document.getElementById("container");

for (var i = 0; i < data.length; i++) {
  var newNode = document.createElement("div");
  newNode.className = "title_unclick";
  newNode.id = i; // 用于匹配答案
  newNode.addEventListener("click", handleClick);
  newNode.innerText = data[i].title;
  container.appendChild(newNode);
}
function handleClick(e) {
  var title = e.target;
  if (title.className === "title_unclick") {
    // 关闭已展开的节点
    var expandList = document.getElementsByClassName("content");
    if (expandList.length !== 0) {
      var node = expandList[0].parentNode;
      node.className = "title_clicked";
      var child = node.lastChild;
      node.removeChild(child);
    }
    title.className = "title_expand";
    var newContent = document.createElement("div");
    newContent.className = "content";
    newContent.innerText = data[title.id].content;
    title.appendChild(newContent);
  } else if (title.className === "title_expand") {
    title.className = "title_clicked";
    var child = title.lastChild;
    title.removeChild(child);
  } else {
    // 关闭已展开的节点
    var expandList = document.getElementsByClassName("content");
    if (expandList.length !== 0) {
      var node = expandList[0].parentNode;
      node.className = "title_clicked";
      var child = node.lastChild;
      node.removeChild(child);
    }
    title.className = "title_expand";
    var newContent = document.createElement("div");
    newContent.className = "content";
    newContent.innerText = data[title.id].content;
    title.appendChild(newContent);
  }
}
