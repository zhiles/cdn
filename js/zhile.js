// 反调试函数,参数：开关，执行代码
function cdc() {
    document.onkeydown = function() {
        let e = window.event || arguments[0];
        if (e.keyCode == 123) {
            message.show({text:"(╯‵□′)╯炸弹！•••*～●～",duration:3000});
            return false;
        }
    }
    document.oncontextmenu = function() {
        return false;
    }
    ! function(e) {
        function n(e) {
            function n() {
                return u;
            }

            function o() {
                window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized ? t("on") : (a = "off", console.log(d), console.clear(), t(a));
            }

            function t(e) {
                u !== e && (u = e, "function" == typeof c.onchange && c.onchange(e));
            }

            function r() {
                l || (l = !0, window.removeEventListener("resize", o), clearInterval(f));
            }
            "function" == typeof e && (e = {
                onchange: e
            });
            let i = (e = e || {}).delay || 500,
                c = {};
            c.onchange = e.onchange;
            let a, d = new Image;
            d.__defineGetter__("id", function() {
                a = "on"
            });
            let u = "unknown";
            c.getStatus = n;
            let f = setInterval(o, i);
            window.addEventListener("resize", o);
            let l;
            return c.free = r, c;
        }
        var o = o || {};
        o.create = n, "function" == typeof define ? (define.amd || define.cmd) && define(function() {
            return o
        }) : "undefined" != typeof module && module.exports ? module.exports = o : window.jdetects = o
    }(), jdetects.create(function(e) {
        let a = 0;
        let n = setInterval(function() {
            if ("on" == e) {
                setTimeout(function() {
                    if (a == 0) {
                        a = 1;
                        setTimeout(function (){document.write("请尊重他人劳动成果，检测到非法调试，请关闭后刷新重试!");});
                    }
                }, 200);
            }
        }, 100);
    })
}
function t() {
    let r = "V",
        n = "5",
        e = "8";

    function o(r) {
        if (!r) return "";
        for (let t = "", n = 44106, e = 0; e < r.length; e++) {
            let o = r.charCodeAt(e) ^ n;
            n = n * e % 256 + 2333, t += String.fromCharCode(o)
        }
        return t
    }
    try {
        let a = ["r", o("갯"), "g", o("갭"), function (t) {
            if (!t) return "";
            for (let o = "", a = r + n + e + "7", c = 45860, f = 0; f < t.length; f++) {
                let i = t.charCodeAt(f);
                c = (c + 1) % a.length, i ^= a.charCodeAt(c), o += String.fromCharCode(i)
            }
            return o
        }("@"), "b", "e", "d"].reverse().join("");
        ! function c(r) {
            (1 !== ("" + r / r).length || 0 === r) && function () {}.constructor(a)(), c(++r)
        }(0)
    } catch (a) {
        setTimeout(t, 100);
    }
}
//Ajax
const $ = (function() {
    let name = 'jquery';
    return {
        ajax: function({type,url,data,isAsync,success}) {
            if (!url) {
                console.error('请输入请求地址')
                return;
            }

            let xhr = new XMLHttpRequest();

            // 处理data对象
            let query = [],
                queryData;
            for (let key in data) {
                // 默认encodeURIComponent一下
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
            queryData = query.join('&');

            if (type == 'GET') {
                // get方式参数要跟在url上
                url = url + '?' + queryData
            }
            loading.show();
            // 默认使用GET,默认异步
            xhr.open(type || 'GET', url, isAsync || true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // 有传入success回调就执行
                    success && success(xhr.responseText,xhr);
                }
            }

            if (type == 'POST') {
                //给指定的HTTP请求头赋值
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                // 数组转成字符串
                xhr.send(queryData)
            } else {
                xhr.send()
            }
            loading.close();
        }
    }
})();

let revise = document.querySelector(".revise"), H = 0, Y = revise
let box = document.getElementById("top");
if(box){
    box.style.display = "none";
    window.onscroll = function(){
        var win_scrol = document.body.scrollTop || document.documentElement.scrollTop;
        if(win_scrol>130){
            box.style.display = "block";
        }else{
            box.style.display = "none";
        }
        if(revise){
            while (Y) {
                H += Y.offsetTop;
                Y = Y.offsetParent;
            }
            if(win_scrol>H) {
                revise.style = "position:absolute;top:"+(win_scrol-13)+"px";
            } else {
                revise.style = ""
            }
        }
    }
    box.onclick = function(){
        scrollAnimate(0,1000);
    }
    function scrollAnimate(target,time){
        var frameNumber = 0;    //帧编号
        var start = document.body.scrollTop || document.documentElement.scrollTop;   //起点
        var distance = target - start;
        var interval = 10;
        var maxFrame = time / interval;

        clearInterval(timer);
        var timer = setInterval(function(){
            frameNumber++;
            if(frameNumber == maxFrame){
                clearInterval(timer);
            }
            //第一个参数t表示当前帧编号
            //第二个参数b表示起始位置
            //第三个参数c表示变化量
            //第四个参数d表示总帧数
            //返回当前帧应该在哪儿
            document.body.scrollTop = document.documentElement.scrollTop = CubicEaseInOut(frameNumber,start,distance,maxFrame);
        },interval);

    }
    function CubicEaseInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    }
}

document.addEventListener('DOMContentLoaded', function (){
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    if ($navbarBurgers.length > 0) {
        $navbarBurgers.forEach( function(el) {
            el.addEventListener('click', function () {
                const target = el.dataset.target;
                const $target = document.getElementById(target);
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }
    let search = document.querySelector('.is-search');
    if(search){
        let sv = search.parentNode.parentNode.parentNode.parentNode;
        let keyword = search.parentNode.parentNode.firstElementChild.firstElementChild;
        let html = document.getElementById('dropdown-menu');
        search.addEventListener('click',function (){
            if (keyword.value.trim() == "") {
                return ;
            }
            $.ajax({
                type:"GET",
                url:"/search",
                data:{"keyword":keyword.value},
                success:function (res){
                    html.innerHTML=res;
                    addClass(sv,'is-active');
                    keyword.focus();
                }
            })
        })
        html.addEventListener('mouseout',function (event){
            if (!isInner(event, sv)) {
                if(hasClass(sv,'is-active')){
                    removeClass(sv,'is-active');
                }
            }
        })
    }
});
function isInner(e,p) {
    var o = e.relatedTarget || e.toElement; //标准浏览器移动到的对象为事件的relatedTarget对象，IE为toElement
    if (!o) return true;//移动到option上为undefined，直接return true
    if (o == p || (p.contains && p.contains(o))) return true;//为容器本身，调用判断DOM对象是否有contains方法（部分低版本浏览器可能不包含这个方法），有调用contains判断是否包含移动到的这个容器
    while (o = o.parentNode) if (o == p) return true;//标准浏览器没有contains方法，遍历父节点实现
    return false;
}
class Message {
    /**
     * 构造函数会在实例化的时候自动执行
     */
    constructor() {

    }
    init(){
        const containerId = 'message-container';
        // 检测下html中是否已经有这个message-container元素
        this.containerEl = document.getElementById(containerId);

        if (!this.containerEl) {
            // 创建一个Element对象，也就是创建一个id为message-container的dom节点
            this.containerEl = document.createElement('div');
            this.containerEl.id = containerId;
            // 把message-container元素放在html的body末尾
            document.body.appendChild(this.containerEl);
        }
    }
    show({ type = 'info', text = '' , duration = 2000, closeable = false}) {
        this.init()
        // 创建一个Element对象
        let messageEl = document.createElement('div');
        // 设置消息class，这里加上move-in可以直接看到弹出效果
        messageEl.className = 'message move-in';
        let msg = "";
        switch (type) {
            case "info":
                msg = `<ion-icon class="icon-info" name="information-circle-outline"></ion-icon>`;
                break;
            case "warning":
                msg = `<ion-icon class="icon-warning" name="alert-circle-outline"></ion-icon>`;
                break;
            case "success":
                msg = `<ion-icon class="icon-success" name="checkmark-circle-outline"></ion-icon>`;
                break;
            case "error":
                msg = `<ion-icon class="icon-error" name="close-circle-outline"></ion-icon>`;
                break;
            default : console.log("type类型错误"); break;
        }
        // 消息内部html字符串
        messageEl.innerHTML = msg+`<div class="text">${text}</div>`;

        // 是否展示关闭按钮
        if (closeable) {
            // 创建一个关闭按钮
            let closeEl = document.createElement('div');
            let icon = document.createElement('i');
            icon.className = 'fas fa-times';
            closeEl.appendChild(icon);
            // 把关闭按钮追加到message元素末尾
            messageEl.appendChild(closeEl);

            // 监听关闭按钮的click事件，触发后将调用我们的close方法
            // 我们把刚才写的移除消息封装为一个close方法
            closeEl.addEventListener('click', () => {
                this.close(messageEl)
            });
        }

        // 追加到message-container末尾
        // this.containerEl属性是我们在构造函数中创建的message-container容器
        this.containerEl.appendChild(messageEl);

        // 只有当duration大于0的时候才设置定时器，这样我们的消息就会一直显示
        if (duration > 0) {
            // 用setTimeout来做一个定时器
            setTimeout(() => {
                this.close(messageEl);
            }, duration);
        }
    }

    /**
     * 关闭某个消息
     * 由于定时器里边要移除消息，然后用户手动关闭事件也要移除消息，所以我们直接把移除消息提取出来封装成一个方法
     * @param {Element} messageEl
     */
    close(messageEl) {
        // 首先把move-in这个弹出动画类给移除掉，要不然会有问题，可以自己测试下
        messageEl.className = messageEl.className.replace('move-in', '');
        // 增加一个move-out类
        messageEl.className += 'move-out';

        // move-out动画结束后把元素的高度和边距都设置为0
        // 由于我们在css中设置了transition属性，所以会有一个过渡动画
        messageEl.addEventListener('animationend', () => {
            messageEl.setAttribute('style', 'height: 0; margin: 0');
        });

        // 这个地方是监听transition的过渡动画结束事件，在动画结束后把消息从dom树中移除。
        messageEl.addEventListener('transitionend', () => {
            // Element对象内部有一个remove方法，调用之后可以将该元素从dom树种移除！
            messageEl.remove();
            this.containerEl.remove();
        });
    }
}
let message = new Message();

/**
 * 修订/完善相关
 * @type {NodeListOf<Element>}
 */
let revises = document.querySelectorAll('.revises');
let E = window.wangEditor;
if(revises){
    let selIndex = null;
    for (let i = 0; i < revises.length; i++) {
        revises[i].addEventListener('click',function () {
            if (this.parentNode.nextElementSibling == null || this.parentNode.nextElementSibling.classList.toString().indexOf("editor") < 0) {
                removeEditor(selIndex);
                selIndex = this;
                const div = document.createElement("div");
                div.setAttribute("class","column has-background-white editor");
                this.parentNode.after(div);
                let editor = new E(this.parentNode.nextElementSibling);
                editor.customConfig.menus = [
                    'bold',
                    'italic',
                    'underline',
                    'link',
                    'undo',  // 撤销
                    'redo'  // 重复
                ];
                editor.customConfig.zIndex =1;
                editor.create();
                const divSubmit = document.createElement("div");
                divSubmit.className = "level";
                divSubmit.style = "margin:.5rem 0;";
                const form = "<div class='level-item'><input type='text' id='nickName' class='input is-small' placeholder='昵称,请勿填写真实信息。'></div>" +
                    "<div class='level-item'><input type='text' id='email' class='input is-small' placeholder='邮箱,仅用作通知使用。'></div>" +
                    "<button class='button is-small is-hidden-mobile onSubmit'>提交</button>"+
                    "<button class='button is-small is-hidden-desktop is-hidden-tablet is-fullwidth onSubmit'>提交</button>";
                divSubmit.innerHTML = form;
                this.parentNode.nextElementSibling.append(divSubmit);
                let source = this.getAttribute("data-source");
                let id = this.getAttribute("data-id");
                let title = this.firstElementChild.firstElementChild.innerHTML + this.getAttribute("data-title");
                const element = document.querySelector(".onSubmit");
                let nickName = document.getElementById("nickName");
                let email = document.getElementById("email");
                let zls_nick_user = JSON.parse(getCookie("zls_nick_user"));
                if(getCookie("zls_nick_user") != ""){
                    nickName.value = zls_nick_user.nickName;
                    email.value = zls_nick_user.email;
                }
                element.addEventListener('click',function (){
                    // let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                    let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                    let txt = editor.txt.text();
                    if(txt.trim() == ""){
                        message.show({text:"内容不能为空！"});
                        return false;
                    }
                    if(nickName.value.trim() == ""){
                        message.show({text:"昵称不能为空！"});
                        return false;
                    }
                    if (!reg.test(email.value.trim())) {
                        message.show({text:"邮箱格式不正确！"});
                        return false;
                    }
                    zls_nick_user = JSON.stringify({"nickName":nickName.value,"email":email.value});
                    setCookie("zls_nick_user",zls_nick_user,7);
                    captchaRevise(this,source,id,nickName.value,email.value,title,txt);
                })
            }else{
                this.parentNode.nextElementSibling.remove();
            }
        })
    }
}

function removeEditor(revises) {
    if(revises != null){
        if (hasClass(revises.parentNode.nextElementSibling, 'editor')) {
            revises.parentNode.nextElementSibling.remove();
        }
    }
}

function captchaRevise(that,source,id,nickName,email,title,content) {
    let captcha1 = new TencentCaptcha('2002020665', function(res) {
        // res（用户主动关闭验证码）= {ret: 2, ticket: null}
        // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
        if (res.ret == 0) {
            $.ajax({
                type:"GET",
                url:"/captchaVerify",
                data:{"randStr":res.randstr,"ticket":res.ticket},
                success:function (o){
                    if(o){
                        saveRevise(that,source,id,nickName,email,title,content,res.randstr,res.ticket);
                    }
                }
            })
        }
    });
    captcha1.show();
}

function saveRevise(that,source,id,nickName,email,title,content,randstr,ticket){
    $.ajax({
        type:"POST",
        url:"/submit",
        data:{"source":source,"objId":id,"nickName":nickName,"email":email,"title":title,"content":content,"randStr":randstr,"ticket":ticket},
        success:function (res){
            if(JSON.parse(res).code == 1){
                message.show({
                    type:"info",
                    text:"提交成功！"
                })
                that.parentNode.parentNode.remove();
            }else{
                captchaRevise(that,source,id,nickName,email,title,content);
            }
        }
    })
}

function hasClass(ele, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
    return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ');
}

function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
        ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
    }
}

function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
        while (newClass.indexOf(' ' + cls + ' ') >= 0) {
            newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        ele.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

class Loading{
    /**
     * 构造函数会在实例化的时候自动执行
     */
    constructor() {

    }
    init(){
        //检测下html中是否已经有这个loading元素
        this.containerEl =document.querySelector(".loading-body");
        if (!this.containerEl) {
            // 创建一个Element对象，也就是创建一个id为message-container的dom节点
            this.containerEl = document.createElement('div');
            this.containerEl.className = "loading-body";
            // 把message-container元素放在html的body末尾
            document.body.appendChild(this.containerEl);
        }
    }
    show(){
        this.init();
        // 创建一个Element对象
        let loadingEl = document.createElement('div');
        loadingEl.className = 'loading';
        loadingEl.innerHTML = "<span></span><span></span><span></span><span></span><span></span>";
        this.containerEl.appendChild(loadingEl);
        document.body.style.overflow='hidden';
        document.documentElement.style.overflow='hidden'
    }
    close() {
        let loadingEl = document.querySelector(".loading");
        loadingEl.remove();
        this.containerEl.remove();
        // document.body.style.overflow='visible';
        document.body.removeAttribute("style")
        document.documentElement.removeAttribute("style")
    }
}
loading = new Loading();

// 网页简繁体转换
// 本js用于客户在网站页面选择繁体中文或简体中文显示，默认是正常显示，即简繁体同时显示
// 在用户第一次访问网页时,会自动检测客户端语言进行操作并提示.此功能可关闭
// 本程序只在UTF8编码下测试过，不保证其他编码有效
// -------------- 以下参数大部分可以更改 --------------------
//s = simplified 简体中文 t = traditional 繁体中文 n = normal 正常显示
let zh_default = 'n'; //默认语言，请不要改变
let zh_choose = 'n'; //当前选择
let zh_expires = 7; //cookie过期天数
let zh_browserLang = ''; //浏览器语言
let zh_autoLang_t = true; //浏览器语言为繁体时自动进行操作
let zh_autoLang_s = true; //浏览器语言为简体时自动进行操作
//自动操作后的提示消息
//判断浏览器语言的正则,ie为小写,ff为大写
let zh_langReg_t = /^zh-TW|zh-HK$/i;
let zh_langReg_s = /^zh-CN$/i;
//简体繁体对照字表,可以自行替换
let zh_st = '㐷:傌,㐹:㑶,㐽:偑,㑇:㑳,㑈:倲,㑔:㑯,㑩:儸,㓆:𠗣,㓥:劏,㓰:劃,㔉:劚,㖊:噚,㖞:喎,㘎:㘚,㚯:㜄,㛀:媰,㛟:𡞵,㛠:𡢃,㛣:㜏,㛤:孋,㛿:𡠹,㟆:㠏,㟜:𡾱,㟥:嵾,㡎:幓,㤘:㥮,㤽:懤,㥪:慺,㧏:掆,㧐:㩳,㧑:撝,㧟:擓,㧰:擽,㨫:㩜,㭎:棡,㭏:椲,㭣:𣙎,㭤:樢,㭴:樫,㱩:殰,㱮:殨,㲿:瀇,㳔:濧,㳕:灡,㳠:澾,㳡:濄,㳢:𣾷,㳽:瀰,㴋:潚,㶉:鸂,㶶:燶,㶽:煱,㺍:獱,㻅:璯,㻏:𤫩,㻘:𤪺,䀥:䁻,䁖:瞜,䂵:碽,䃅:磾,䅉:稏,䅟:穇,䅪:𥢢,䇲:筴,䉤:籔,䌶:䊷,䌷:紬,䌸:縳,䌹:絅,䌺:䋙,䌻:䋚,䌼:綐,䌽:綵,䌾:䋻,䌿:䋹,䍀:繿,䍁:繸,䍠:䍦,䎬:䎱,䏝:膞,䑽:𦪙,䓓:薵,䓕:薳,䓖:藭,䓨:罃,䗖:螮,䘛:𧝞,䘞:𧜗,䙊:𧜵,䙌:䙡,䙓:襬,䜣:訢,䜤:鿁,䜥:𧩙,䜧:䜀,䜩:讌,䝙:貙,䞌:𧵳,䞍:䝼,䞎:𧶧,䞐:賰,䟢:躎,䢀:𨊰,䢁:𨊸,䢂:𨋢,䥺:釾,䥽:鏺,䥾:䥱,䥿:𨯅,䦀:𨦫,䦁:𨧜,䦂:䥇,䦃:鐯,䦅:鐥,䦆:钁,䦶:䦛,䦷:䦟,䩄:靦,䭪:𩞯,䯃:𩣑,䯄:騧,䯅:䯀,䲝:䱽,䲞:𩶘,䲟:鮣,䲠:鰆,䲡:鰌,䲢:鰧,䲣:䱷,䴓:鳾,䴔:鵁,䴕:鴷,䴖:鶄,䴗:鶪,䴘:鷉,䴙:鸊,䶮:龑,万:萬,与:與,丑:醜,专:專,业:業,丛:叢,东:東,丝:絲,丢:丟,两:兩,严:嚴,丧:喪,个:個,个:箇,丰:豐,临:臨,为:爲,丽:麗,举:舉,么:麼,义:義,乌:烏,乐:樂,乔:喬,习:習,乡:鄉,书:書,买:買,乱:亂,了:瞭,争:爭,于:於,亏:虧,云:雲,亘:亙,亚:亞,产:產,亩:畝,亲:親,亵:褻,亸:嚲,亿:億,仅:僅,仆:僕,仇:讎,从:從,仑:侖,仑:崙,仓:倉,仪:儀,们:們,价:價,仿:彷,众:衆,优:優,伙:夥,会:會,伛:傴,伞:傘,伟:偉,传:傳,伡:俥,伣:俔,伤:傷,伥:倀,伦:倫,伧:傖,伪:僞,伫:佇,体:體,余:餘,佛:彿,佣:傭,佥:僉,侠:俠,侣:侶,侥:僥,侦:偵,侧:側,侨:僑,侩:儈,侪:儕,侬:儂,侭:儘,俊:儁,俣:俁,俦:儔,俨:儼,俩:倆,俪:儷,俫:倈,俭:儉,修:脩,借:藉,债:債,倾:傾,偬:傯,偻:僂,偾:僨,偿:償,傤:儎,傥:儻,傧:儐,储:儲,傩:儺,僵:殭,儿:兒,克:剋,兑:兌,兖:兗,党:黨,兰:蘭,关:關,兴:興,兹:茲,养:養,兽:獸,冁:囅,内:內,冈:岡,册:冊,写:寫,军:軍,农:農,冬:鼕,冯:馮,冲:衝,冲:沖,决:決,况:況,冻:凍,净:淨,凄:悽,凄:淒,准:準,凉:涼,凌:淩,减:減,凑:湊,凛:凜,几:幾,凤:鳳,凫:鳧,凭:憑,凯:凱,凶:兇,出:齣,击:擊,凿:鑿,刍:芻,划:劃,刘:劉,则:則,刚:剛,创:創,删:刪,别:別,别:彆,刬:剗,刭:剄,刮:颳,制:製,刹:剎,刽:劊,刾:㓨,刿:劌,剀:剴,剂:劑,剐:剮,剑:劍,剥:剝,剧:劇,劝:勸,办:辦,务:務,劢:勱,动:動,励:勵,劲:勁,劳:勞,势:勢,勋:勳,勋:勛,勚:勩,匀:勻,匦:匭,匮:匱,区:區,医:醫,千:韆,升:昇,华:華,协:協,单:單,卖:賣,卜:蔔,占:佔,卢:盧,卤:滷,卤:鹵,卧:臥,卫:衛,却:卻,卷:捲,卺:巹,厂:廠,厅:廳,历:歷,历:曆,厉:厲,压:壓,厌:厭,厍:厙,厐:龎,厕:廁,厘:釐,厢:廂,厣:厴,厦:廈,厨:廚,厩:廄,厮:廝,县:縣,叁:叄,参:參,参:蔘,叆:靉,叇:靆,双:雙,发:發,发:髮,变:變,叙:敘,叠:疊,只:隻,只:祇,台:臺,台:檯,台:颱,叶:葉,号:號,叹:嘆,叹:歎,叽:嘰,吁:籲,吃:喫,合:閤,吊:弔,同:衕,后:後,向:嚮,向:曏,吓:嚇,吕:呂,吗:嗎,吨:噸,听:聽,启:啓,吴:吳,呐:吶,呒:嘸,呓:囈,呕:嘔,呖:嚦,呗:唄,员:員,呙:咼,呛:嗆,呜:嗚,周:週,周:賙,咏:詠,咙:嚨,咛:嚀,咝:噝,咤:吒,咨:諮,咸:鹹,咽:嚥,哄:鬨,响:響,哑:啞,哒:噠,哓:嘵,哔:嗶,哕:噦,哗:譁,哗:嘩,哙:噲,哜:嚌,哝:噥,哟:喲,唇:脣,唛:嘜,唝:嗊,唠:嘮,唡:啢,唢:嗩,唤:喚,啧:嘖,啬:嗇,啭:囀,啮:齧,啮:嚙,啯:嘓,啰:囉,啴:嘽,啸:嘯,喂:餵,喷:噴,喽:嘍,喾:嚳,嗫:囁,嗳:噯,嘘:噓,嘤:嚶,嘱:囑,噜:嚕,噪:譟,嚣:囂,回:迴,团:團,团:糰,园:園,困:睏,囱:囪,围:圍,囵:圇,国:國,图:圖,圆:圓,圣:聖,圹:壙,场:場,坏:壞,块:塊,坚:堅,坛:壇,坛:罈,坜:壢,坝:壩,坞:塢,坟:墳,坠:墜,垄:壟,垅:壠,垆:壚,垒:壘,垦:墾,垩:堊,垫:墊,垭:埡,垯:墶,垱:壋,垲:塏,垴:堖,埘:塒,埙:壎,埙:塤,埚:堝,堑:塹,堕:墮,塆:壪,墙:牆,壮:壯,声:聲,壳:殼,壶:壺,壸:壼,处:處,备:備,复:復,复:複,复:覆,够:夠,夫:伕,头:頭,夸:誇,夹:夾,夺:奪,奁:奩,奂:奐,奋:奮,奖:獎,奥:奧,奸:姦,妆:妝,妇:婦,妈:媽,妩:嫵,妪:嫗,妫:嬀,姗:姍,姜:薑,姹:奼,娄:婁,娅:婭,娆:嬈,娇:嬌,娈:孌,娘:孃,娱:娛,娲:媧,娴:嫺,娴:嫻,婳:嫿,婴:嬰,婵:嬋,婶:嬸,媪:媼,媭:嬃,嫒:嬡,嫔:嬪,嫱:嬙,嬷:嬤,孙:孫,学:學,孪:孿,宁:寧,宁:甯,它:牠,宝:寶,实:實,宠:寵,审:審,宪:憲,宫:宮,家:傢,宽:寬,宾:賓,寝:寢,对:對,寻:尋,导:導,寿:壽,将:將,尔:爾,尘:塵,尝:嘗,尝:嚐,尧:堯,尴:尷,尸:屍,尽:盡,尽:儘,局:侷,层:層,屃:屓,屉:屜,届:屆,属:屬,屡:屢,屦:屨,屿:嶼,岁:歲,岂:豈,岖:嶇,岗:崗,岘:峴,岚:嵐,岛:島,岩:巖,岭:嶺,岳:嶽,岽:崬,岿:巋,峃:嶨,峄:嶧,峡:峽,峣:嶢,峤:嶠,峥:崢,峦:巒,峰:峯,崂:嶗,崃:崍,崄:嶮,崭:嶄,嵘:嶸,嵚:嶔,嵝:嶁,巅:巔,巨:鉅,巩:鞏,巯:巰,币:幣,布:佈,帅:帥,师:師,帏:幃,帐:帳,帘:簾,帜:幟,带:帶,帧:幀,席:蓆,帮:幫,帱:幬,帻:幘,帼:幗,幂:冪,干:幹,干:乾,并:並,并:併,幸:倖,广:廣,庄:莊,庆:慶,床:牀,庑:廡,库:庫,应:應,庙:廟,庞:龐,废:廢,庵:菴,庼:廎,廪:廩,异:異,弃:棄,弑:弒,张:張,弥:彌,弥:瀰,弦:絃,弪:弳,弯:彎,弹:彈,强:強,归:歸,当:當,当:噹,录:錄,录:彔,彟:彠,彦:彥,彨:彲,彩:綵,彻:徹,征:徵,径:徑,徕:徠,御:禦,忆:憶,忏:懺,志:誌,忧:憂,念:唸,忾:愾,怀:懷,态:態,怂:慫,怃:憮,怄:慪,怅:悵,怆:愴,怜:憐,总:總,怼:懟,怿:懌,恋:戀,恒:恆,恤:卹,恳:懇,恶:惡,恶:噁,恸:慟,恹:懨,恺:愷,恻:惻,恼:惱,恽:惲,悦:悅,悫:愨,悬:懸,悭:慳,悮:悞,悯:憫,惊:驚,惧:懼,惨:慘,惩:懲,惫:憊,惬:愜,惭:慚,惮:憚,惯:慣,愈:癒,愠:慍,愤:憤,愦:憒,愿:願,慑:懾,慭:憖,懑:懣,懒:懶,懔:懍,戆:戇,戋:戔,戏:戲,戗:戧,战:戰,戚:慼,戬:戩,戯:戱,户:戶,才:纔,扎:紮,扑:撲,托:託,扣:釦,执:執,扩:擴,扪:捫,扫:掃,扬:揚,扰:擾,折:摺,抚:撫,抛:拋,抟:摶,抠:摳,抡:掄,抢:搶,护:護,报:報,抵:牴,担:擔,拐:柺,拟:擬,拢:攏,拣:揀,拥:擁,拦:攔,拧:擰,拨:撥,择:擇,挂:掛,挚:摯,挛:攣,挜:掗,挝:撾,挞:撻,挟:挾,挠:撓,挡:擋,挢:撟,挣:掙,挤:擠,挥:揮,挦:撏,挨:捱,挽:輓,捝:挩,捞:撈,损:損,捡:撿,换:換,捣:搗,据:據,掳:擄,掴:摑,掷:擲,掸:撣,掺:摻,掼:摜,揽:攬,揾:搵,揿:撳,搀:攙,搁:擱,搂:摟,搄:揯,搅:攪,搜:蒐,携:攜,摄:攝,摅:攄,摆:擺,摆:襬,摇:搖,摈:擯,摊:攤,撄:攖,撑:撐,撵:攆,撷:擷,撸:擼,撺:攛,擜:㩵,擞:擻,攒:攢,敌:敵,敚:敓,敛:斂,敩:斆,数:數,斋:齋,斓:斕,斗:鬥,斩:斬,断:斷,旋:鏇,无:無,旧:舊,时:時,旷:曠,旸:暘,昆:崑,昙:曇,昵:暱,昼:晝,昽:曨,显:顯,晋:晉,晒:曬,晓:曉,晔:曄,晕:暈,晖:暉,暂:暫,暅:𣈶,暗:闇,暧:曖,曲:麴,术:術,术:朮,朱:硃,朴:樸,机:機,杀:殺,杂:雜,权:權,杆:桿,杠:槓,条:條,来:來,杨:楊,杩:榪,杯:盃,杰:傑,松:鬆,板:闆,极:極,构:構,枞:樅,枢:樞,枣:棗,枥:櫪,枧:梘,枨:棖,枪:槍,枫:楓,枭:梟,柜:櫃,柠:檸,柽:檉,栀:梔,栅:柵,标:標,栈:棧,栉:櫛,栊:櫳,栋:棟,栌:櫨,栎:櫟,栏:欄,树:樹,栖:棲,栗:慄,样:樣,核:覈,栾:欒,桠:椏,桡:橈,桢:楨,档:檔,桤:榿,桥:橋,桦:樺,桧:檜,桨:槳,桩:樁,桪:樳,梁:樑,梦:夢,梼:檮,梾:棶,梿:槤,检:檢,棁:梲,棂:欞,椁:槨,椝:槼,椟:櫝,椠:槧,椢:槶,椤:欏,椫:樿,椭:橢,椮:槮,楼:樓,榄:欖,榅:榲,榇:櫬,榈:櫚,榉:櫸,榝:樧,槚:檟,槛:檻,槟:檳,槠:櫧,横:橫,樯:檣,樱:櫻,橥:櫫,橱:櫥,橹:櫓,橼:櫞,檩:檁,欢:歡,欤:歟,欧:歐,欲:慾,歼:殲,殁:歿,殇:殤,残:殘,殒:殞,殓:殮,殚:殫,殡:殯,殴:毆,毁:毀,毁:燬,毁:譭,毂:轂,毕:畢,毙:斃,毡:氈,毵:毿,毶:𣯶,氇:氌,气:氣,氢:氫,氩:氬,氲:氳,汇:匯,汇:彙,汉:漢,汤:湯,汹:洶,沈:瀋,沟:溝,没:沒,沣:灃,沤:漚,沥:瀝,沦:淪,沧:滄,沨:渢,沩:潙,沪:滬,沾:霑,泛:氾,泛:汎,泞:濘,注:註,泪:淚,泶:澩,泷:瀧,泸:瀘,泺:濼,泻:瀉,泼:潑,泽:澤,泾:涇,洁:潔,洒:灑,洼:窪,浃:浹,浅:淺,浆:漿,浇:澆,浈:湞,浉:溮,浊:濁,测:測,浍:澮,济:濟,浏:瀏,浐:滻,浑:渾,浒:滸,浓:濃,浔:潯,浕:濜,涂:塗,涌:湧,涚:涗,涛:濤,涝:澇,涞:淶,涟:漣,涠:潿,涡:渦,涢:溳,涣:渙,涤:滌,润:潤,涧:澗,涨:漲,涩:澀,淀:澱,渊:淵,渌:淥,渍:漬,渎:瀆,渐:漸,渑:澠,渔:漁,渖:瀋,渗:滲,温:溫,游:遊,湾:灣,湿:溼,溁:濚,溃:潰,溅:濺,溆:漵,溇:漊,滗:潷,滚:滾,滞:滯,滟:灩,滟:灧,滠:灄,满:滿,滢:瀅,滤:濾,滥:濫,滦:灤,滨:濱,滩:灘,滪:澦,漓:灕,潆:瀠,潇:瀟,潋:瀲,潍:濰,潜:潛,潴:瀦,澛:瀂,澜:瀾,濑:瀨,濒:瀕,灏:灝,灭:滅,灯:燈,灵:靈,灶:竈,灾:災,灿:燦,炀:煬,炉:爐,炖:燉,炜:煒,炝:熗,点:點,炼:煉,炼:鍊,炽:熾,烁:爍,烂:爛,烃:烴,烛:燭,烟:煙,烟:菸,烦:煩,烧:燒,烨:燁,烩:燴,烫:燙,烬:燼,热:熱,焕:煥,焖:燜,焘:燾,煴:熅,熏:燻,爱:愛,爷:爺,牍:牘,牦:犛,牵:牽,牺:犧,犊:犢,状:狀,犷:獷,犸:獁,犹:猶,狈:狽,狝:獮,狞:獰,独:獨,狭:狹,狮:獅,狯:獪,狰:猙,狱:獄,狲:猻,猃:獫,猎:獵,猕:獼,猡:玀,猪:豬,猫:貓,猬:蝟,献:獻,獭:獺,玑:璣,玙:璵,玚:瑒,玛:瑪,玩:翫,玮:瑋,环:環,现:現,玱:瑲,玺:璽,珐:琺,珑:瓏,珰:璫,珲:琿,琎:璡,琏:璉,琐:瑣,琼:瓊,瑶:瑤,瑷:璦,瑸:璸,璇:璿,璎:瓔,瓒:瓚,瓮:甕,瓯:甌,电:電,画:畫,畅:暢,畴:疇,疖:癤,疗:療,疟:瘧,疠:癘,疡:瘍,疬:癧,疭:瘲,疮:瘡,疯:瘋,疱:皰,疴:痾,症:癥,痈:癰,痉:痙,痒:癢,痖:瘂,痨:癆,痪:瘓,痫:癇,痴:癡,瘅:癉,瘆:瘮,瘗:瘞,瘘:瘻,瘪:癟,瘫:癱,瘾:癮,瘿:癭,癞:癩,癣:癬,癫:癲,皂:皁,皑:皚,皱:皺,皲:皸,盏:盞,盐:鹽,监:監,盖:蓋,盗:盜,盘:盤,眍:瞘,眦:眥,眬:矓,睁:睜,睐:睞,睑:瞼,瞆:瞶,瞒:瞞,瞩:矚,矩:榘,矫:矯,矶:磯,矾:礬,矿:礦,砀:碭,码:碼,砖:磚,砗:硨,砚:硯,砜:碸,砺:礪,砻:礱,砾:礫,础:礎,硁:硜,硕:碩,硖:硤,硗:磽,硙:磑,硚:礄,确:確,硵:磠,硷:礆,碍:礙,碛:磧,碜:磣,碱:鹼,礼:禮,祃:禡,祎:禕,祢:禰,祯:禎,祷:禱,祸:禍,禀:稟,禄:祿,禅:禪,离:離,私:俬,秃:禿,秆:稈,秋:鞦,种:種,秘:祕,积:積,称:稱,秽:穢,秾:穠,稆:穭,税:稅,稣:穌,稳:穩,穑:穡,穞:穭,穷:窮,窃:竊,窍:竅,窎:窵,窑:窯,窜:竄,窝:窩,窥:窺,窦:竇,窭:窶,竖:豎,竞:競,笃:篤,笋:筍,笔:筆,笕:筧,笺:箋,笼:籠,笾:籩,筑:築,筚:篳,筛:篩,筜:簹,筝:箏,筹:籌,筼:篔,签:籤,签:簽,筿:篠,简:簡,箓:籙,箦:簀,箧:篋,箨:籜,箩:籮,箪:簞,箫:簫,篑:簣,篓:簍,篮:籃,篯:籛,篱:籬,簖:籪,籁:籟,籴:糴,类:類,籼:秈,粜:糶,粝:糲,粤:粵,粪:糞,粮:糧,粽:糉,糁:糝,糇:餱,糍:餈,系:係,系:繫,紧:緊,絷:縶,緼:縕,縆:緪,纟:糹,纠:糾,纡:紆,红:紅,纣:紂,纤:纖,纤:縴,纥:紇,约:約,级:級,纨:紈,纩:纊,纪:紀,纫:紉,纬:緯,纭:紜,纮:紘,纯:純,纰:紕,纱:紗,纲:綱,纳:納,纴:紝,纵:縱,纶:綸,纷:紛,纸:紙,纹:紋,纺:紡,纻:紵,纼:紖,纽:紐,纾:紓,线:線,绀:紺,绁:紲,绂:紱,练:練,组:組,绅:紳,细:細,织:織,终:終,绉:縐,绊:絆,绋:紼,绌:絀,绍:紹,绎:繹,经:經,绐:紿,绑:綁,绒:絨,结:結,绔:絝,绕:繞,绖:絰,绗:絎,绘:繪,给:給,绚:絢,绛:絳,络:絡,绝:絕,绞:絞,统:統,绠:綆,绡:綃,绢:絹,绣:繡,绤:綌,绥:綏,绦:絛,继:繼,绨:綈,绩:績,绪:緒,绫:綾,绬:緓,续:續,绮:綺,绯:緋,绰:綽,绱:鞝,绱:緔,绲:緄,绳:繩,维:維,绵:綿,绶:綬,绷:繃,绷:綳,绸:綢,绹:綯,绺:綹,绻:綣,综:綜,绽:綻,绾:綰,绿:綠,缀:綴,缁:緇,缂:緙,缃:緗,缄:緘,缅:緬,缆:纜,缇:緹,缈:緲,缉:緝,缊:縕,缋:繢,缌:緦,缍:綞,缎:緞,缏:緶,缑:緱,缒:縋,缓:緩,缔:締,缕:縷,编:編,缗:緡,缘:緣,缙:縉,缚:縛,缛:縟,缜:縝,缝:縫,缞:縗,缟:縞,缠:纏,缡:縭,缢:縊,缣:縑,缤:繽,缥:縹,缦:縵,缧:縲,缨:纓,缩:縮,缪:繆,缫:繅,缬:纈,缭:繚,缮:繕,缯:繒,缰:繮,缱:繾,缲:繰,缳:繯,缴:繳,缵:纘,罂:罌,网:網,罗:羅,罚:罰,罢:罷,罴:羆,羁:羈,羟:羥,羡:羨,群:羣,翘:翹,翙:翽,翚:翬,耢:耮,耧:耬,耸:聳,耻:恥,聂:聶,聋:聾,职:職,聍:聹,联:聯,聩:聵,聪:聰,肃:肅,肠:腸,肤:膚,肮:骯,肴:餚,肾:腎,肿:腫,胀:脹,胁:脅,胄:冑,胆:膽,背:揹,胜:勝,胡:鬍,胡:衚,胧:朧,胨:腖,胪:臚,胫:脛,胶:膠,脉:脈,脍:膾,脏:髒,脏:臟,脐:臍,脑:腦,脓:膿,脔:臠,脚:腳,脱:脫,脶:腡,脸:臉,腊:臘,腌:醃,腘:膕,腭:齶,腻:膩,腼:靦,腽:膃,腾:騰,膑:臏,膻:羶,臜:臢,致:緻,舆:輿,舍:捨,舣:艤,舰:艦,舱:艙,舻:艫,艰:艱,艳:豔,艳:艷,艺:藝,节:節,芈:羋,芗:薌,芜:蕪,芦:蘆,芸:蕓,苁:蓯,苇:葦,苈:藶,苋:莧,苌:萇,苍:蒼,苎:苧,苏:蘇,苏:甦,苏:囌,苔:薹,苧:薴,苹:蘋,范:範,茎:莖,茏:蘢,茑:蔦,茔:塋,茕:煢,茧:繭,荆:荊,荐:薦,荙:薘,荚:莢,荛:蕘,荜:蓽,荝:萴,荞:蕎,荟:薈,荠:薺,荡:蕩,荡:盪,荣:榮,荤:葷,荥:滎,荦:犖,荧:熒,荨:蕁,荩:藎,荪:蓀,荫:蔭,荫:廕,荬:蕒,荭:葒,荮:葤,药:藥,药:葯,莅:蒞,莱:萊,莲:蓮,莳:蒔,莴:萵,莶:薟,获:獲,获:穫,莸:蕕,莹:瑩,莺:鶯,莼:蓴,萚:蘀,萝:蘿,萤:螢,营:營,萦:縈,萧:蕭,萨:薩,葱:蔥,蒀:蒕,蒇:蕆,蒉:蕢,蒋:蔣,蒌:蔞,蒏:醟,蒙:矇,蒙:濛,蒙:懞,蓝:藍,蓟:薊,蓠:蘺,蓣:蕷,蓥:鎣,蓦:驀,蔂:虆,蔑:衊,蔷:薔,蔹:蘞,蔺:藺,蔼:藹,蕰:薀,蕲:蘄,蕴:蘊,薮:藪,藓:蘚,藴:蘊,蘖:櫱,虏:虜,虑:慮,虚:虛,虫:蟲,虬:虯,虮:蟣,虱:蝨,虽:雖,虾:蝦,虿:蠆,蚀:蝕,蚁:蟻,蚂:螞,蚃:蠁,蚕:蠶,蚝:蠔,蚬:蜆,蛊:蠱,蛎:蠣,蛏:蟶,蛮:蠻,蛰:蟄,蛱:蛺,蛲:蟯,蛳:螄,蛴:蠐,蜕:蛻,蜗:蝸,蜡:蠟,蝇:蠅,蝈:蟈,蝉:蟬,蝎:蠍,蝼:螻,蝾:蠑,螀:螿,螨:蟎,蟏:蠨,衅:釁,衔:銜,补:補,表:錶,衬:襯,衮:袞,袄:襖,袅:嫋,袅:裊,袆:褘,袜:襪,袭:襲,袯:襏,装:裝,裆:襠,裈:褌,裢:褳,裣:襝,裤:褲,裥:襉,裥:襇,褛:褸,褴:襤,襕:襴,见:見,观:觀,觃:覎,规:規,觅:覓,视:視,觇:覘,览:覽,觉:覺,觊:覬,觋:覡,觌:覿,觍:覥,觎:覦,觏:覯,觐:覲,觑:覷,觞:觴,触:觸,觯:觶,訚:誾,詟:讋,誉:譽,誊:謄,讠:訁,计:計,订:訂,讣:訃,认:認,讥:譏,讦:訐,讧:訌,讨:討,让:讓,讪:訕,讫:訖,讬:託,训:訓,议:議,讯:訊,记:記,讱:訒,讲:講,讳:諱,讴:謳,讵:詎,讶:訝,讷:訥,许:許,讹:訛,论:論,讻:訩,讼:訟,讽:諷,设:設,访:訪,诀:訣,证:證,证:証,诂:詁,诃:訶,评:評,诅:詛,识:識,诇:詗,诈:詐,诉:訴,诊:診,诋:詆,诌:謅,词:詞,诎:詘,诏:詔,诐:詖,译:譯,诒:詒,诓:誆,诔:誄,试:試,诖:詿,诗:詩,诘:詰,诙:詼,诚:誠,诛:誅,诜:詵,话:話,诞:誕,诟:詬,诠:詮,诡:詭,询:詢,诣:詣,诤:諍,该:該,详:詳,诧:詫,诨:諢,诩:詡,诪:譸,诫:誡,诬:誣,语:語,诮:誚,误:誤,诰:誥,诱:誘,诲:誨,诳:誑,说:說,诵:誦,诶:誒,请:請,诸:諸,诹:諏,诺:諾,读:讀,诼:諑,诽:誹,课:課,诿:諉,谀:諛,谁:誰,谂:諗,调:調,谄:諂,谅:諒,谆:諄,谇:誶,谈:談,谉:讅,谊:誼,谋:謀,谌:諶,谍:諜,谎:謊,谏:諫,谐:諧,谑:謔,谒:謁,谓:謂,谔:諤,谕:諭,谖:諼,谗:讒,谘:諮,谙:諳,谚:諺,谛:諦,谜:謎,谝:諞,谞:諝,谟:謨,谠:讜,谡:謖,谢:謝,谣:謠,谤:謗,谥:諡,谥:謚,谦:謙,谧:謐,谨:謹,谩:謾,谪:謫,谫:譾,谬:謬,谭:譚,谮:譖,谯:譙,谰:讕,谱:譜,谲:譎,谳:讞,谴:譴,谵:譫,谶:讖,谷:穀,豮:豶,贝:貝,贞:貞,负:負,贠:貟,贡:貢,财:財,责:責,贤:賢,败:敗,账:賬,货:貨,质:質,贩:販,贪:貪,贫:貧,贬:貶,购:購,贮:貯,贯:貫,贰:貳,贱:賤,贲:賁,贳:貰,贴:貼,贵:貴,贶:貺,贷:貸,贸:貿,费:費,贺:賀,贻:貽,贼:賊,贽:贄,贾:賈,贿:賄,赀:貲,赁:賃,赂:賂,赃:贓,资:資,赅:賅,赆:贐,赇:賕,赈:賑,赉:賚,赊:賒,赋:賦,赌:賭,赍:齎,赎:贖,赏:賞,赐:賜,赑:贔,赒:賙,赓:賡,赔:賠,赕:賧,赖:賴,赗:賵,赘:贅,赙:賻,赚:賺,赛:賽,赜:賾,赝:贗,赝:贋,赞:贊,赞:讚,赟:贇,赠:贈,赡:贍,赢:贏,赣:贛,赪:赬,赵:趙,赶:趕,趋:趨,趱:趲,趸:躉,跃:躍,跄:蹌,跖:蹠,跞:躒,践:踐,跶:躂,跷:蹺,跸:蹕,跹:躚,跻:躋,踌:躊,踪:蹤,踬:躓,踯:躑,蹑:躡,蹒:蹣,蹰:躕,蹿:躥,躏:躪,躜:躦,躯:軀,輼:轀,车:車,轧:軋,轨:軌,轩:軒,轪:軑,轫:軔,转:轉,轭:軛,轮:輪,软:軟,轰:轟,轱:軲,轲:軻,轳:轤,轴:軸,轵:軹,轶:軼,轷:軤,轸:軫,轹:轢,轺:軺,轻:輕,轼:軾,载:載,轾:輊,轿:轎,辀:輈,辁:輇,辂:輅,较:較,辄:輒,辅:輔,辆:輛,辇:輦,辈:輩,辉:輝,辊:輥,辋:輞,辌:輬,辍:輟,辎:輜,辏:輳,辐:輻,辑:輯,辒:轀,输:輸,辔:轡,辕:轅,辖:轄,辗:輾,辘:轆,辙:轍,辚:轔,辞:辭,辟:闢,辩:辯,辫:辮,边:邊,辽:遼,达:達,迁:遷,过:過,迈:邁,运:運,还:還,这:這,进:進,远:遠,违:違,连:連,迟:遲,迩:邇,迳:逕,迹:跡,迹:蹟,适:適,选:選,逊:遜,递:遞,逦:邐,逻:邏,遗:遺,遥:遙,邓:鄧,邝:鄺,邬:鄔,邮:郵,邹:鄒,邺:鄴,邻:鄰,郁:鬱,郏:郟,郐:鄶,郑:鄭,郓:鄆,郦:酈,郧:鄖,郸:鄲,酂:酇,酝:醞,酦:醱,酱:醬,酸:痠,酽:釅,酾:釃,酿:釀,醖:醞,采:採,采:寀,释:釋,里:裏,鉴:鑑,鉴:鑒,銮:鑾,錾:鏨,钅:釒,钆:釓,钇:釔,针:針,针:鍼,钉:釘,钊:釗,钋:釙,钌:釕,钍:釷,钎:釺,钏:釧,钐:釤,钑:鈒,钒:釩,钓:釣,钔:鍆,钕:釹,钖:鍚,钗:釵,钘:鈃,钙:鈣,钚:鈈,钛:鈦,钜:鉅,钝:鈍,钞:鈔,钟:鍾,钟:鐘,钟:鈡,钠:鈉,钡:鋇,钢:鋼,钣:鈑,钤:鈐,钥:鑰,钥:鈅,钦:欽,钧:鈞,钨:鎢,钩:鉤,钪:鈧,钫:鈁,钫:鍅,钬:鈥,钭:鈄,钮:鈕,钯:鈀,钰:鈺,钱:錢,钲:鉦,钳:鉗,钴:鈷,钵:鉢,钶:鈳,钷:鉕,钸:鈽,钹:鈸,钺:鉞,钻:鑽,钻:鉆,钼:鉬,钽:鉭,钾:鉀,钿:鈿,铀:鈾,铁:鐵,铂:鉑,铃:鈴,铄:鑠,铅:鉛,铆:鉚,铇:鉋,铈:鈰,铉:鉉,铊:鉈,铋:鉍,铌:鈮,铍:鈹,铎:鐸,铏:鉶,铐:銬,铑:銠,铒:鉺,铓:鋩,铔:錏,铕:銪,铖:鋮,铗:鋏,铘:鋣,铙:鐃,铚:銍,铛:鐺,铜:銅,铝:鋁,铞:銱,铟:銦,铠:鎧,铡:鍘,铢:銖,铣:銑,铤:鋌,铥:銩,铦:銛,铧:鏵,铨:銓,铩:鎩,铪:鉿,铫:銚,铬:鉻,铭:銘,铮:錚,铯:銫,铰:鉸,铱:銥,铲:鏟,铲:剷,铳:銃,铴:鐋,铵:銨,银:銀,铷:銣,铸:鑄,铹:鐒,铺:鋪,铻:鋙,铼:錸,铽:鋱,链:鏈,链:鍊,铿:鏗,销:銷,锁:鎖,锂:鋰,锃:鋥,锄:鋤,锅:鍋,锆:鋯,锇:鋨,锈:鏽,锉:銼,锊:鋝,锋:鋒,锌:鋅,锍:鋶,锎:鐦,锏:鐧,锐:銳,锑:銻,锒:鋃,锓:鋟,锔:鋦,锕:錒,锖:錆,锗:鍺,锘:鍩,错:錯,锚:錨,锛:錛,锜:錡,锝:鍀,锞:錁,锟:錕,锠:錩,锡:錫,锢:錮,锣:鑼,锤:錘,锥:錐,锦:錦,锧:鑕,锨:鍁,锩:錈,锪:鍃,锫:錇,锫:鉳,锬:錟,锭:錠,键:鍵,锯:鋸,锰:錳,锱:錙,锲:鍥,锳:鍈,锴:鍇,锵:鏘,锶:鍶,锷:鍔,锸:鍤,锹:鍬,锺:鍾,锻:鍛,锼:鎪,锽:鍠,锾:鍰,锿:鎄,镀:鍍,镁:鎂,镂:鏤,镃:鎡,镄:鐨,镅:鎇,镆:鏌,镇:鎮,镈:鎛,镉:鎘,镊:鑷,镋:钂,镋:鎲,镌:鐫,镍:鎳,镎:鎿,镎:錼,镏:鎦,镐:鎬,镑:鎊,镒:鎰,镓:鎵,镔:鑌,镕:鎔,镖:鏢,镗:鏜,镘:鏝,镙:鏍,镚:鏰,镛:鏞,镜:鏡,镝:鏑,镞:鏃,镟:鏇,镠:鏐,镡:鐔,镢:钁,镢:鐝,镣:鐐,镤:鏷,镥:鑥,镦:鐓,镧:鑭,镨:鐠,镩:鑹,镪:鏹,镫:鐙,镬:鑊,镭:鐳,镮:鐶,镯:鐲,镰:鐮,镰:鎌,镱:鐿,镲:鑔,镳:鑣,镴:鑞,镵:鑱,镶:鑲,长:長,门:門,闩:閂,闪:閃,闫:閆,闬:閈,闭:閉,问:問,闯:闖,闰:閏,闱:闈,闲:閒,闲:閑,闳:閎,间:間,闵:閔,闶:閌,闷:悶,闸:閘,闹:鬧,闺:閨,闻:聞,闼:闥,闽:閩,闾:閭,闿:闓,阀:閥,阁:閣,阂:閡,阃:閫,阄:鬮,阅:閱,阆:閬,阇:闍,阈:閾,阉:閹,阊:閶,阋:鬩,阌:閿,阍:閽,阎:閻,阏:閼,阐:闡,阑:闌,阒:闃,阓:闠,阔:闊,阕:闋,阖:闔,阗:闐,阘:闒,阙:闕,阚:闞,阛:闤,队:隊,阳:陽,阴:陰,阵:陣,阶:階,际:際,陆:陸,陇:隴,陈:陳,陉:陘,陕:陝,陦:隯,陧:隉,陨:隕,险:險,随:隨,隐:隱,隶:隸,隽:雋,难:難,雇:僱,雏:雛,雕:鵰,雠:讎,雳:靂,雾:霧,霁:霽,霉:黴,霡:霢,霭:靄,靓:靚,靔:靝,静:靜,面:麪,靥:靨,鞑:韃,鞒:鞽,鞯:韉,鞲:韝,韦:韋,韧:韌,韨:韍,韩:韓,韪:韙,韫:韞,韬:韜,韵:韻,页:頁,顶:頂,顷:頃,顸:頇,项:項,顺:順,须:須,须:鬚,顼:頊,顽:頑,顾:顧,顿:頓,颀:頎,颁:頒,颂:頌,颃:頏,预:預,颅:顱,领:領,颇:頗,颈:頸,颉:頡,颊:頰,颋:頲,颌:頜,颍:潁,颎:熲,颏:頦,颐:頤,频:頻,颒:頮,颓:頹,颔:頷,颕:頴,颖:穎,颗:顆,题:題,颙:顒,颚:顎,颛:顓,颜:顏,额:額,颞:顳,颟:顢,颠:顛,颡:顙,颢:顥,颣:纇,颤:顫,颥:顬,颦:顰,颧:顴,风:風,飏:颺,飐:颭,飑:颮,飒:颯,飓:颶,飔:颸,飕:颼,飖:颻,飗:飀,飘:飄,飙:飆,飚:飈,飞:飛,飨:饗,餍:饜,饣:飠,饤:飣,饥:飢,饥:饑,饦:飥,饧:餳,饨:飩,饩:餼,饪:飪,饫:飫,饬:飭,饭:飯,饮:飲,饯:餞,饰:飾,饱:飽,饲:飼,饳:飿,饴:飴,饵:餌,饶:饒,饷:餉,饸:餄,饹:餎,饺:餃,饻:餏,饼:餅,饽:餑,饾:餖,饿:餓,馀:餘,馁:餒,馂:餕,馃:餜,馄:餛,馅:餡,馆:館,馇:餷,馈:饋,馉:餶,馊:餿,馋:饞,馌:饁,馍:饃,馎:餺,馏:餾,馐:饈,馑:饉,馒:饅,馓:饊,馔:饌,馕:饢,马:馬,驭:馭,驮:馱,驯:馴,驰:馳,驱:驅,驲:馹,驳:駁,驴:驢,驵:駔,驶:駛,驷:駟,驸:駙,驹:駒,驺:騶,驻:駐,驼:駝,驽:駑,驾:駕,驿:驛,骀:駘,骁:驍,骂:罵,骃:駰,骄:驕,骅:驊,骆:駱,骇:駭,骈:駢,骉:驫,骊:驪,骋:騁,验:驗,骍:騂,骎:駸,骏:駿,骐:騏,骑:騎,骒:騍,骓:騅,骔:騌,骕:驌,骖:驂,骗:騙,骘:騭,骙:騤,骚:騷,骛:騖,骜:驁,骝:騮,骞:騫,骟:騸,骠:驃,骡:騾,骢:驄,骣:驏,骤:驟,骥:驥,骦:驦,骧:驤,髅:髏,髋:髖,髌:髕,鬓:鬢,鬶:鬹,魇:魘,魉:魎,鱼:魚,鱽:魛,鱾:魢,鱿:魷,鲀:魨,鲁:魯,鲂:魴,鲃:䰾,鲄:魺,鲅:鮁,鲆:鮃,鲇:鮎,鲈:鱸,鲉:鮋,鲊:鮓,鲋:鮒,鲌:鮊,鲍:鮑,鲎:鱟,鲏:鮍,鲐:鮐,鲑:鮭,鲒:鮚,鲓:鮳,鲔:鮪,鲕:鮞,鲖:鮦,鲗:鰂,鲘:鮜,鲙:鱠,鲚:鱭,鲛:鮫,鲜:鮮,鲝:鮺,鲞:鯗,鲟:鱘,鲠:鯁,鲡:鱺,鲢:鰱,鲣:鰹,鲤:鯉,鲥:鰣,鲦:鰷,鲧:鯀,鲨:鯊,鲩:鯇,鲪:鮶,鲫:鯽,鲬:鯒,鲭:鯖,鲮:鯪,鲯:鯕,鲰:鯫,鲱:鯡,鲲:鯤,鲳:鯧,鲴:鯝,鲵:鯢,鲶:鯰,鲷:鯛,鲸:鯨,鲹:鰺,鲺:鯴,鲻:鯔,鲼:鱝,鲽:鰈,鲾:鰏,鲿:鱨,鳀:鯷,鳁:鰮,鳂:鰃,鳃:鰓,鳄:鱷,鳅:鰍,鳆:鰒,鳇:鰉,鳈:鰁,鳉:鱂,鳊:鯿,鳋:鰠,鳌:鰲,鳍:鰭,鳎:鰨,鳏:鰥,鳐:鰩,鳑:鰟,鳒:鰜,鳓:鰳,鳔:鰾,鳕:鱈,鳖:鱉,鳗:鰻,鳘:鰵,鳙:鱅,鳚:䲁,鳛:鰼,鳜:鱖,鳝:鱔,鳞:鱗,鳟:鱒,鳠:鱯,鳡:鱤,鳢:鱧,鳣:鱣,鳤:䲘,鸟:鳥,鸠:鳩,鸡:雞,鸢:鳶,鸣:鳴,鸤:鳲,鸥:鷗,鸦:鴉,鸧:鶬,鸨:鴇,鸩:鴆,鸪:鴣,鸫:鶇,鸬:鸕,鸭:鴨,鸮:鴞,鸯:鴦,鸰:鴒,鸱:鴟,鸲:鴝,鸳:鴛,鸴:鷽,鸵:鴕,鸶:鷥,鸷:鷙,鸸:鴯,鸹:鴰,鸺:鵂,鸻:鴴,鸼:鵃,鸽:鴿,鸾:鸞,鸿:鴻,鹀:鵐,鹁:鵓,鹂:鸝,鹃:鵑,鹄:鵠,鹅:鵝,鹆:鵒,鹇:鷳,鹇:鷴,鹈:鵜,鹉:鵡,鹊:鵲,鹋:鶓,鹌:鵪,鹍:鵾,鹎:鵯,鹏:鵬,鹐:鵮,鹑:鶉,鹒:鶊,鹓:鵷,鹔:鷫,鹕:鶘,鹖:鶡,鹗:鶚,鹘:鶻,鹙:鶖,鹚:鷀,鹛:鶥,鹜:鶩,鹝:鷊,鹞:鷂,鹟:鶲,鹠:鶹,鹡:鶺,鹢:鷁,鹣:鶼,鹤:鶴,鹥:鷖,鹦:鸚,鹧:鷓,鹨:鷚,鹩:鷯,鹪:鷦,鹫:鷲,鹬:鷸,鹭:鷺,鹮:䴉,鹯:鸇,鹰:鷹,鹱:鸌,鹲:鸏,鹳:鸛,鹴:鸘,鹾:鹺,麦:麥,麸:麩,麹:麴,麺:麪,麽:麼,黄:黃,黉:黌,黡:黶,黩:黷,黪:黲,黾:黽,鼋:黿,鼌:鼂,鼍:鼉,鼹:鼴,齐:齊,齑:齏,齿:齒,龀:齔,龁:齕,龂:齗,龃:齟,龄:齡,龅:齙,龆:齠,龇:齜,龈:齦,龉:齬,龊:齪,龋:齲,龌:齷,龙:龍,龚:龔,龛:龕,龟:龜,开:開,庐:廬,螙:蠹';
let zh_s = new Map();
let zh_t = new Map();
let s = zh_st.split(",");
for (let i = 0; i < s.length; i++) {
    let sk = s[i].split(":");
    zh_s.set(sk[0],sk[1]);
    zh_t.set(sk[1],sk[0]);
}
String.prototype.tran = function() {
    let s1;
    if (zh_choose == 't') {
        s1 = zh_s;
    }else if(zh_choose == 's') {
        s1 = zh_t;
    }else {
        return this;
    }
    let a = '';
    for(let i=0;i<this.length;i++){
        let c = this.charAt(i);
        let p = s1.get(c);
        a += p == undefined ? c : p;
    }
    return a;
}
function setCookie(name, value) {
    let argv = setCookie.arguments;
    let argc = setCookie.arguments.length;
    let expires = (argc > 2) ? argv[2] : null;
    if (expires != null) {
        let LargeExpDate = new Date ();
        LargeExpDate.setTime(LargeExpDate.getTime() + (expires*1000*3600*24));
        document.cookie = name + "=" + escape (value)+"; expires=" +LargeExpDate.toGMTString()+";path=/";
    }else{
        document.cookie = name + "=" + escape (value)+";path=/";
    }
}
function getCookie(Name) {
    let search = Name + "="
    if (document.cookie.length > 0) {
        let offset = document.cookie.indexOf(search);
        if(offset != -1) {
            offset += search.length;
            let end = document.cookie.indexOf(";", offset);
            if(end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(offset, end));
        }else {
            return '';
        }
    }
}
function delCookie(name){
    setCookie(name,'',-1);
}
function zh_tranBody(obj) {
    var o = (typeof(obj) == "object") ? obj.childNodes : document.body.childNodes;
    for (var i = 0; i < o.length; i++) {
        var c = o.item(i);
        if ('||BR|HR|TEXTAREA|SCRIPT|'.indexOf("|"+c.tagName+"|") > 0) continue;
        if (c.title != '' && c.title != null) c.title = c.title.tran();
        if (c.alt != '' && c.alt != null) c.alt = c.alt.tran();
        if (c.tagName == "INPUT" && c.value != '' && c.type != 'text' && c.type != 'hidden' && c.type != 'password') c.value = c.value.tran();
        if (c.nodeType == 3) {
            c.data = c.data.tran();
        }else{
            zh_tranBody(c);
        }
    }
}
function zh_tranCustom(obj) {
    var o = (typeof(obj) == "object") ? obj.childNodes : document.body.childNodes;
    for (var i = 0; i < o.length; i++) {
        var c = o.item(i);
        if ('||BR|HR|TEXTAREA|SCRIPT|'.indexOf("|"+c.tagName+"|") > 0) continue;
        if (c.title != '' && c.title != null) c.title = c.title.tran();
        if (c.alt != '' && c.alt != null) c.alt = c.alt.tran();
        if (c.tagName == "INPUT" && c.value != '' && c.type != 'text' && c.type != 'hidden' && c.type != 'password') c.value = c.value.tran();
        if (c.nodeType == 3) {
            c.data = c.data.tran();
        }else{
            zh_tranCustom(c);
        }
    }
}
function zh_tran_area(go,obj) {
    if (go) zh_choose = go;
    if (go == 'n') {
        window.location.reload();
    }else {
        zh_tranCustom(obj);
    }
}
function zh_tran(go) {
    if (go) zh_choose = go;
    setCookie('zh_choose', zh_choose, zh_expires);
    if (go == 'n') {
        window.location.reload();
    }else {
        zh_tranBody();
    }
}
function zh_getLang() {
    if (getCookie('zh_choose')) {
        zh_choose = getCookie('zh_choose');
        return true;
    }
    if (!zh_autoLang_t && !zh_autoLang_s) return false;
    if (navigator.language) {
        zh_browserLang = navigator.language;
    }else if (navigator.browserLanguage) {
        zh_browserLang = navigator.browserLanguage;
    }
    if (zh_autoLang_t && zh_langReg_t.test(zh_browserLang)) {
        zh_choose = 't';
    }else if (zh_autoLang_s && zh_langReg_s.test(zh_browserLang)) {
        zh_choose = 's';
    }

    setCookie('zh_choose', zh_choose, zh_expires);
    if (zh_choose == zh_default) return false;
    return true;
}
function zh_init() {
    zh_getLang();
    // c = document.getElementById(zh_class + '_' + zh_choose);
    if (zh_choose != zh_default) {
        if (window.onload) {
            window.onload_before_zh_init = window.onload;
            window.onload = function() {
                zh_tran(zh_choose);
                window.onload_before_zh_init();
            };
        }else {
            window.onload = function() {
                zh_tran(zh_choose);
            };
        }
    }
}

let simplifieds = document.querySelectorAll('.simplified');
let traditionals = document.querySelectorAll('.traditional');
let translation = null;
function obtainParentNode(obj,cls) {
    if (obj.parentNode.classList.toString().indexOf(cls)>=0){
        translation = obj.parentNode;
    }else{
        obtainParentNode(obj.parentNode,cls);
    }
}
for (let i = 0; i < simplifieds.length; i++) {
    simplifieds[i].addEventListener('click',function () {
        obtainParentNode(this,'is-relative');
        zh_tran_area('s',translation);
    })
    traditionals[i].addEventListener('click',function () {
        obtainParentNode(this,'is-relative');
        zh_tran_area('t',translation);
    })
}
let websiteSimplified = document.querySelector('.website_simplified');
let websiteTraditional = document.querySelector('.website_traditional');
if(websiteSimplified){
    websiteSimplified.addEventListener('click',function () {
        zh_tran('s');
    })
}
if(websiteTraditional){
    websiteTraditional.addEventListener('click',function () {
        zh_tran('t');
    })
}
zh_init();

/**
 * 登陆
 **/
let loginDisplay = document.querySelector('.on-login');
if(loginDisplay){
    let message_login = document.querySelectorAll('.container-text');
    let login_div = document.querySelector(".login");
    let body = document.querySelector(".body");
    if(window.location.href.indexOf("?login")>=0){
        if (getCookie("authorization") == '') {
            removeClass(login_div,'is-hidden');
            addClass(login_div,'is-flex');
        }
    }
    if(window.location.href.indexOf("?register")>=0){
        removeClass(login_div,'is-hidden');
        addClass(login_div,'is-flex');
        addClass(body,'panel-active');
    }
    loginDisplay.addEventListener('click',function () {
        removeClass(login_div,'is-hidden');
        addClass(login_div,'is-flex');
    })

    let ghost = document.querySelectorAll(".ghost");
    ghost.forEach(function (g){
        g.addEventListener('click',function (){
            if (hasClass(body, 'panel-active')) {
                removeClass(body,'panel-active');
            }else{
                addClass(body,'panel-active');
            }
        })
    })

    let login_close = document.querySelectorAll(".is-close");
    login_close.forEach(function (close){
        close.addEventListener('click',function (){
            removeClass(login_div,'is-flex');
            addClass(login_div,'is-hidden');
        })
    })

    //登陆
    let signIn = document.querySelector('.signIn');
    signIn.addEventListener('click', captchaLogin)

    function captchaLogin() {
        message_login[0].innerHTML = "&nbsp;";
        let captcha1 = new TencentCaptcha('2002020665', function(res) {
            // res（用户主动关闭验证码）= {ret: 2, ticket: null}
            // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
            if(res.ret == 0){
                let randstr = res.randstr;
                let ticket = res.ticket;
                $.ajax({
                    type:"GET",
                    url:"/captchaVerify",
                    data:{
                        "randStr":randstr,
                        "ticket":ticket
                    },
                    success:function (res) {
                        let data = JSON.parse(res);
                        if(data){
                            login(randstr,ticket);
                        }else{
                            captchaLogin();
                        }
                    }
                })
            }
        });
        captcha1.show();
    }
    function login(randStr,ticket) {
        if(randStr == null || ticket == null || randStr == "" || ticket == ""){
            captchaLogin();
        }
        addClass(signIn,'is-loading');
        let data = {
            "username":document.getElementById("in_username").value,
            "password":document.getElementById("in_password").value,
            "randStr":randStr,
            "ticket":ticket
        };
        $.ajax({
            type:"POST",
            url:"/auth/login",
            data:data,
            success:function (res,xhr) {
                let data = JSON.parse(res);
                if(data.code == 1){
                    delCookie("zls_auth");
                    setCookie("zls_auth",xhr.getResponseHeader("Cookie"),1);
                    setCookie("zls_user",JSON.stringify(data.data),1);
                    removeClass(signIn,'is-loading');
                    let url = redirect();
                    if (url == "") {
                        removeClass(login_div,'is-flex');
                        addClass(login_div,'is-hidden');
                    }else{
                        window.location = url;
                    }
                }else if(data.code == 1003){
                    removeClass(signIn,'is-loading');
                    captchaLogin();
                }else {
                    message_login[0].innerHTML = data.message;
                    removeClass(signIn,'is-loading');
                }
            }
        })
    }
    function logout(){
        delCookie("authorization");
    }
    //注册
    let signUp = document.querySelector('.signUp');
    signUp.addEventListener('click',register);
    function register() {
        let username = document.getElementById("up_username").value;
        let password = document.getElementById("up_password").value;
        let confirmPassword = document.getElementById("up_confirm_password").value;
        let nickName = document.getElementById("up_nickname").value;
        let verifyCode = document.getElementById("up_verifyCode").value;
        if (verify(nickName, username, password, confirmPassword, verifyCode)) {
            return;
        }
        addClass(signUp,'is-loading');
        let data = {
            "username":username,
            "password":password,
            "nickName":nickName,
            "verifyCode":verifyCode
        };
        $.ajax({
            type:"POST",
            url:"/auth/register",
            data:data,
            success:function (res,xhr) {
                let data = JSON.parse(res);
                if(data.code == 1){
                    removeClass(signUp,'is-loading');
                    message.show({text: data.message});
                    removeClass(body,'panel-active');
                    signUp.parentNode.parentNode.reset();
                }else {
                    message_login[1].innerHTML = data.message;
                    removeClass(signUp,'is-loading');
                }
            }
        })
    }

    let sendCode = document.querySelector('.send_code');
    sendCode.addEventListener('click',sendVerifyCode);
    function sendVerifyCode() {
        $.ajax({
            type:"GET",
            url:"/getVerifyCode",
            data:{email:document.getElementById('up_username').value},
            success:function (res) {
                let data = JSON.parse(res);
                if(data.code == 1){
                    message.show({text: data.message});
                }else {
                    message_login[1].innerHTML = data.message;
                }
            }
        })
        let that = this;
        let time = 59;
        let timer = null;
        that.disabled = true;
        that.value = time+1;
        timer = setInterval(function(){
            that.value = time;
            time--;//时间值自减
            if(time ==0){
                that.value='发送';
                that.disabled = false;
                clearInterval(timer);
            }
        },1000);
    }
    function verifyEmail(){
        $.ajax({
            type:"GET",
            url:"/verifyEmail",
            data:{username:document.getElementById("up_username").value},
            success:function (res) {
                let data = JSON.parse(res);
                if(data.code == 0){

                }
            }
        })
    }
    function verify(nickName,username,password,confirmPassword,verifyCode) {
        if (nickName == null || nickName.trim() == "") {
            message_login[1].innerHTML = "请输入昵称。";
            return true;
        }
        if (username == null || username.trim() == "") {
            message_login[1].innerHTML = "请输入邮箱。";
            return true;
        }else{
            let regx = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if (!regx.test(username)) {
                message_login[1].innerHTML = "请输入正确的邮箱。";
                return true;
            }
        }
        if (password == null || password.trim() == "") {
            message_login[1].innerHTML = "请输入密码。";
            return true;
        }else if(password.length<6){
            message_login[1].innerHTML = "请输入最少6位数密码。";
            return true;
        }
        if(password != confirmPassword){
            message_login[1].innerHTML = "两次输入密码不一致。";
            return true;
        }
        if (verifyCode == null || verifyCode.trim() == "") {
            message_login[1].innerHTML = "请输入验证码。";
            return true;
        }
        return false;
    }
}


function redirect(){
    let url = window.location.href;
    if (url.indexOf("redirect") < 0) {
        return "";
    }
    let split = url.split("&");
    for (let i = 0; i < split.length; i++) {
        if (split[i].indexOf("redirect") >= 0) {
            let u = split[i].split("=");
            if (u.length > 1) {
                return u[1];
            }
            return "";
        }
    }
    return "";
}



let reads = document.querySelectorAll('.read-more');
if(reads){
    reads.forEach(function (el){
        el.addEventListener('click',function (){
            let source = el.getAttribute("data-source");
            let id = el.getAttribute("data-id");
            $.ajax({
                type:"GET",
                url:"/loadMore",
                data:{ticket:Base64.encode(parseInt(Math.random()*(9),10)+""+new Date().getTime()+"_"+id+"_"+source)},
                success:function (res){
                    el.parentNode.parentNode.innerHTML = res;
                }
            })
        })
    })
}
