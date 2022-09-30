https://github.com/QSCTech/2022-Autumn-Round-Two/blob/main/h5-game/%E5%86%99%E7%BB%99%E5%B9%BC%E5%84%BF%E5%9B%AD%E5%B0%8F%E6%9C%8B%E5%8F%8B%E7%9A%84H5%E5%B0%8F%E6%B8%B8%E6%88%8F%E6%8C%87%E5%8C%97.md

### Question0

~~我一开始就是在css里写的宽高~~，然后一画图，就能明显感觉到尺寸的不对劲。

（css中width和height实际上是将原来300x150的画布拉伸，造成图像变形，因此一般在画布标签中改变其长宽。
canvas标签中设置的宽高为其在页面中占据大小，也就是说当css设置大小(eg:700x700)和canvas(eg:100x100)不同时，先取一空间绘制700x700图像，再将图像缩放进100x100实际空间中）

### Bonus0

尺寸单位用vw\vh，相对于viewport

### Question1

（const myCanvas = document.getElementById('canvas') 该语句使得myCanvas获取了canvas元素(有const的话也可以说是绑定该元素)，后续对画布操作时候用“myCanvas.getContext”即可
引用类型

若myCanvas为画布，则返回2d对象，否则返回undefined）

### Question2

（setInterval函数按照固定频率渲染动画，requestAnimationFrame也可按照固定频率渲染，但是可以避免跳帧
在使用者切换到其他网页时，requestAnimation会停止渲染，避免性能浪费）