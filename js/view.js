class Storage{
    constructor(name){
        this.name = 'storage';
    }
    //设置缓存
    setItem(params){
        let obj = {
            name:'',
            value:'',
            expires:"",
            startTime:new Date().getTime()//记录何时将值存入缓存，毫秒级
        }
        let options = {};
        //将obj和传进来的params合并
        Object.assign(options,obj,params);
        if(options.expires){
            //如果options.expires设置了的话
            //以options.name为key，options为值放进去
            localStorage.setItem(options.name,JSON.stringify(options));
        }else{
            //如果options.expires没有设置，就判断一下value的类型
            let type = Object.prototype.toString.call(options.value);
            //如果value是对象或者数组对象的类型，就先用JSON.stringify转一下，再存进去
            if(Object.prototype.toString.call(options.value) == '[object Object]'){
                options.value = JSON.stringify(options.value);
            }
            if(Object.prototype.toString.call(options.value) == '[object Array]'){
                options.value = JSON.stringify(options.value);
            }
            localStorage.setItem(options.name,options.value);
        }
    }
    //拿到缓存
    getItem(name){
        let item = localStorage.getItem(name);
        if(item == null){
            return new Array();
        }
        //先将拿到的试着进行json转为对象的形式
        try{
            item = JSON.parse(item);
        }catch(error){
            //如果不行就不是json的字符串，就直接返回
            item = item;
        }
        //如果有startTime的值，说明设置了失效时间
        if(item.startTime){
            let date = new Date().getTime();
            //何时将值取出减去刚存入的时间，与item.expires比较，如果大于就是过期了，如果小于或等于就还没过期
            if(date - item.startTime > item.expires){
                //缓存过期，清除缓存，返回false
                localStorage.removeItem(name);
                return false;
            }else{
                //缓存未过期，返回值
                return item.value;
            }
        }else{
            //如果没有设置失效时间，直接返回值
            return item;
        }
    }
    //移出缓存
    removeItem(name){
        localStorage.removeItem(name);
    }
    //移出全部缓存
    clear(){
        localStorage.clear();
    }
}

document.addEventListener('DOMContentLoaded', function(event) {
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
    });
});
let viewer = document.querySelector(".view");
if(viewer){
    new Viewer(viewer,{
        url:"data-original",
        navbar: false,  //显示缩略图导航
        zoomRatio: 0.4,  //鼠标滚动时的缩放比例
        // minZoomRatio:0.01, //最小缩放比例
        // maxZoomRatio:100, //最大缩放比例
        // zIndex:2015, //设置图片查看器 modal 模式时的 z-index
        button: true,  //显示右上角关闭按钮（jQuery 版本无效）
        title: false,  //显示当前图片的标题（现实 alt 属性及图片尺寸）
        keyboard: true,  //是否支持键盘
        movable: true,  //图片是否可移动
        tooltip: true,  //显示缩放百分比
        // rotatable: true,  //图片是否可旋转
        // scalable: true,  //图片是否可翻转
        toolbar: {   //显示工具栏
            zoomIn: 1,
            zoomOut: 1,
            oneToOne: 1,
            reset: 1,
            prev: 0,
            play: 0,
            next: 0,
            rotateLeft: 1,
            rotateRight: 1,
            flipHorizontal: 1,
            flipVertical: 1,
        }
    });
    /* code */
    let initCopyCode = function(){
        let copyHtml = '<span class="btn-copy">拷贝</span>';
        let pre = document.getElementsByTagName("pre");
        for (let i = 0; i <pre.length ; i++) {
            pre[i].insertAdjacentHTML("afterBegin",copyHtml);
        }
        new ClipboardJS('.btn-copy', {
            target: function(trigger) {
                trigger.title = '已拷贝';
                return trigger.nextElementSibling;
            }
        });
    }
    initCopyCode();
}
let storage = new Storage();
let v = storage.getItem("v");
let vs = window.location.href.substring(window.location.href.lastIndexOf("/")+1,window.location.href.length)
if (v.toString().indexOf(vs) < 0) {
    v.push(vs);
    storage.setItem(storage.setItem({
        name:"v",
        value:v,
        expires:new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1)-new Date().getTime()
    }))
    let t = new Image;
    t.src = "/s.gif?v="+vs;
}