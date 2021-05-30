let TCaptcha_URL = "https://ssl.captcha.qq.com/TCaptcha.js";
let tf_auth_info = "tf_auth_info";
let toolbar = document.querySelector(".toolbar"), H = 0, Y = toolbar
let box = document.querySelector(".top");
let baseURL = "//api.teifan.com";
if(window.location.href.indexOf('teifan.com')<0){
    baseURL = "";
}
if(box){
    box.style.display = "none";
    window.onscroll = function(){
        let win_scrol = document.body.scrollTop || document.documentElement.scrollTop;
        box.style.display = win_scrol>130? "block":"none";
    }
    box.onclick = function(){
        scrollAnimate(0,1000);
    }
    function scrollAnimate(target,time){
        let frameNumber = 0;    //帧编号
        let start = document.body.scrollTop || document.documentElement.scrollTop;   //起点
        let distance = target - start;
        let interval = 10;
        let maxFrame = time / interval;

        clearInterval(timer);
        var timer = setInterval(function(){
            frameNumber++;
            if(frameNumber == maxFrame){
                clearInterval(timer);
            }
            document.body.scrollTop = document.documentElement.scrollTop = CubicEaseInOut(frameNumber,start,distance,maxFrame);
        },interval);

    }
    function CubicEaseInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    }
}
document.addEventListener('DOMContentLoaded', function (){
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach( function (el) {
            el.addEventListener('click', function () {
                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);
                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }
});
window.onload = function (){
    let is_logout = document.querySelector('.is-logout');
    is_logout.addEventListener('click',logout)
    html_init();
}
;( function( window ) {
    'use strict';
    function classReg( className ) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }
    var hasClass, addClass, removeClass;
    if ( 'classList' in document.documentElement ) {
        hasClass = function( elem, c ) {
            return elem.classList.contains( c );
        };
        addClass = function( elem, c ) {
            elem.classList.add( c );
        };
        removeClass = function( elem, c ) {
            elem.classList.remove( c );
        };
    }else {
        hasClass = function( elem, c ) {
            return classReg( c ).test( elem.className );
        };
        addClass = function( elem, c ) {
            if ( !hasClass( elem, c ) ) elem.className = elem.className + ' ' + c;
        };
        removeClass = function( elem, c ) {
            elem.className = elem.className.replace( classReg( c ), ' ' );
        };
    }
    function toggleClass( elem, c ) {
        var fn = hasClass( elem, c ) ? removeClass : addClass;
        fn( elem, c );
    }
    var classie = {
        // full names
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        // short names
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };
    // transport
    if ( typeof define === 'function' && define.amd ) {
        // AMD
        define( classie );
    } else {
        // browser global
        window.classie = classie;
    }
})( window );
;(function (window) {
    function setCookie(name, value) {
        let argv = setCookie.arguments;
        let argc = setCookie.arguments.length;
        let expires = (argc > 2) ? argv[2] : null;
        if(Object.prototype.toString.call(value) == '[object Object]'){
            value = JSON.stringify(value);
        }
        if(Object.prototype.toString.call(value) == '[object Array]'){
            value = JSON.stringify(value);
        }
        if (expires != null) {
            let LargeExpDate = new Date ();
            LargeExpDate.setTime(LargeExpDate.getTime() + (expires*1000*3600*24));
            document.cookie = name + "=" + encodeURIComponent(value)+";domain=.teifan.com;expires=" +LargeExpDate.toGMTString()+";path=/";
        }else{
            document.cookie = name + "=" + encodeURIComponent(value)+";domain=.teifan.com;path=/";
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
                return JSON.parse(decodeURIComponent(document.cookie.substring(offset, end)));
            }else {
                return '';
            }
        }
        return '';
    }
    function delCookie(name){
        setCookie(name,'',-1);
    }
    var cookie = {
        // full names
        getCookie: getCookie,
        setCookie: setCookie,
        delCookie: delCookie
    };

    // transport
    if ( typeof define === 'function' && define.amd ) {
        // AMD
        define( cookie );
    } else {
        // browser global
        window.cookie = cookie;
    }
})(window);

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
            xhr.withCredentials = true;
            // 处理data对象
            let query = [],queryData;
            for (let key in data) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
            queryData = query.join('&');
            if (type == 'GET')url = url + '?' + queryData;
            url = baseURL + url;
            // 默认使用GET,默认异步
            xhr.open(type || 'GET', url, isAsync || true);
            xhr.onreadystatechange = function() {
                loading.close();
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // 有传入success回调就执行
                    success && success(xhr.responseText,xhr);
                }
                if (xhr.readyState == 4 && xhr.status == 401) {
                    console.log("重新登陆");
                    return;
                }
                if (xhr.readyState == 4 && xhr.status == 403) {
                    console.log("权限不足");
                    return;
                }
            }
            xhr.onerror = function (){
                loading.close();
            }
            if (type == 'POST') {
                //给指定的HTTP请求头赋值
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                // 数组转成字符串
                xhr.send(queryData);
                loading.show();
            } else {
                xhr.send()
            }
        }
    }
})();

;( function( window ) {
    'use strict';
    //设置缓存
    function setItem(name,value,expires){
        let obj = {
            name:name,
            value:value,
            expires:expires,
            startTime:new Date().getTime()//记录何时将值存入缓存，毫秒级
        }
        let options = {};
        //将obj和传进来的params合并
        Object.assign(options,obj);
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
    function getItem(name){
        let item = localStorage.getItem(name);
        if(item == null){
            return null;
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
    function delItem(name){
        localStorage.removeItem(name);
    }
    //移出全部缓存
    function clear(){
        localStorage.clear();
    }
    var storage = {
        // full names
        getItem: getItem,
        setItem: setItem,
        delItem: delItem,
        clear: clear
    };
    // transport
    if ( typeof define === 'function' && define.amd ) {
        // AMD
        define( storage );
    } else {
        // browser global
        window.storage = storage;
    }

})( window );
;(function () {
    let msg,login,signIn,close,loginType,verifyCode,username,password,sendCode;
    let logins = document.querySelectorAll('.login-in');
    for (let i = 0; i < logins.length; i++) {
        logins[i].addEventListener('click',function (){
            init_login();
            classie.remove(login,'is-hidden');
        })
    }
    function init_login() {
        let element = document.querySelector('.login');
        if(element)return;
        let div = document.createElement("div");
        div.className = 'login is-hidden';
        div.innerHTML = "<div class=\"login\">\n" +
            "    <div class=\"body\">\n" +
            "        <div class=\"form sign-in\">\n" +
            "            <form onsubmit=\"return false;\">\n" +
            "                <h1>登陆</h1>\n" +
            "                <div class=\"container-text\">&nbsp;</div>\n" +
            "                <div class=\"full-width\">\n" +
            "                    <input type=\"text\" maxlength=\"11\" oninput = \"value=value.replace(/[^\\d]/g,'')\" placeholder=\"请输入手机号\" id=\"username\">\n" +
            "                    <input type=\"password\"  oninput = \"value=value.replace(/[^\\w]/g,'')\"  placeholder=\"请输入密码\" id=\"password\">\n" +
            "                    <input type=\"text\" maxlength=\"4\" oninput = \"value=value.replace(/[^\\d]/g,'')\" class=\"verify_code is-hidden\" placeholder=\"验证码\">\n" +
            "                    <input type=\"button\" class=\"send_code  is-hidden\" value=\"发送\">\n" +
            "                    <div class=\"is-size-7 is-clearfix\" style=\"margin-left: .2rem\">\n" +
            "                        <span class=\"pw_login is-hidden\">\n" +
            "                            <a class=\"is-pulled-left\">密码登录</a>\n" +
            "                            <span style=\"margin-left: .5rem\">登录未注册账户，将自动注册。</span>\n" +
            "                        </span>\n" +
            "                        <a class=\"is-pulled-left ph_login\">短信登录/注册</a>\n" +
            "                    </div>\n" +
            "                    <button type=\"button\" class=\"button signIn is-fullwidth\" style=\"margin-top: 2rem\">登录</button>\n" +
            "                </div>\n" +
            "                <div class=\"is-size-7\">\n" +
            "                    <input style=\"width: auto;display:inline-block\" type=\"checkbox\" class=\"checkbox\" checked> 我已阅读并同意\n" +
            "                </div>\n" +
            "                <div class=\"is-size-7\">\n" +
            "                    <a class=\"has-text-grey\" href=\"//www.teifan.com/agreement\" target=\"_blank\">《网络服务协议》</a> 和 <a class=\"has-text-grey\" href=\"//www.teifan.com/privacy\">《用户隐私条款》</a>\n" +
            "                </div>\n" +
            "                <button class=\"is-close delete is-small is-hidden-desktop is-hidden-tablet\" title=\"关闭\"></button>\n" +
            "            </form>\n" +
            "        </div>\n" +
            "        <div class=\"overlay-container\">\n" +
            "            <div class=\"overlay\">\n" +
            "                <div class=\"overlay-panel overlay-right\">\n" +
            "                    <button class=\"is-close delete is-small is-hidden-mobile\" title=\"关闭\"></button>\n" +
            "                    <h1>忒凡网</h1>\n" +
            "                    <h3>免费、好用、高排名</h3><br><br><br>\n" +
            "                    <p>只需一步急速注册</p>\n" +
            "                    <p>快速收录接口</p>\n" +
            "                    <p>新站报道接口</p>\n" +
            "                </div>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "    </div>\n" +
            "</div>";
        document.body.appendChild(div);

        msg = document.querySelector('.container-text');
        login = document.querySelector('.login');
        verifyCode = document.querySelector('.verify_code');
        //登陆
        signIn = document.querySelector('.signIn');
        signIn.addEventListener('click', submit)
        //关闭登录框按钮
        close = document.querySelectorAll('.is-close');
        close.forEach(function (close){
            close.addEventListener('click',function (){
                classie.add(login,'is-hidden');
                clear_error();
            })
        })
        //验证码
        sendCode = document.querySelector('.send_code');
        sendCode.addEventListener('click',sendVerifyCode);
        username = document.querySelector('#username');
        password = document.querySelector('#password');
        let pw = document.querySelector('.pw_login');
        let ph = document.querySelector('.ph_login');
        loginType = 1;
        pw.addEventListener('click',function (){
            loginType = 1;
            verifyCode.value = "";
            classie.removeClass(password,'is-hidden')
            classie.addClass(verifyCode,'is-hidden');
            classie.addClass(sendCode,'is-hidden');
            classie.removeClass(ph,'is-hidden');
            classie.addClass(this,'is-hidden');
        })
        ph.addEventListener('click',function (){
            loginType = 2;
            password.value = "";
            classie.addClass(password,'is-hidden');
            classie.removeClass(verifyCode,'is-hidden');
            classie.removeClass(sendCode,'is-hidden');
            classie.removeClass(pw,'is-hidden');
            classie.addClass(this,'is-hidden');
        })
    }

    if(window.location.href.indexOf("?login")>=0){
        init_login();
        classie.remove(login,'is-hidden');
    }
    // if(window.location.href.indexOf("?register")>=0){
    //     init_login();
    //     classie.remove(login,'is-hidden');
    // }

    function clear_error() {
        msg.innerHTML = "&nbsp;";
    }

    function submit(){
        clear_error();
        if(!(/^1[3456789]\d{9}$/.test(username.value))){
            msg.innerHTML = "请输入正确的手机号";
            return;
        }
        // 多种登录方式判断
        let loginMap = new Map([
            [1,pw_login],
            [2,code_login],
            // [3,wechat_login]
        ]);
        loginMap.get(loginType)();
    }
    function code_login(){
        if(verifyCode.value == null || verifyCode.value == ""){
            msg.innerHTML = "请输入验证码";
            return;
        }
        $.ajax({
            type:"POST",
            url:"/auth/sms",
            data:{"username":username.value,"smsCode":verifyCode.value},
            success:function (res) {
                let data = JSON.parse(res);
                classie.remove(signIn,'is-loading');
                if(data.code == 1){
                    let url = redirect();
                    if (url == "") {
                        html_init();
                        classie.add(login,'is-hidden');
                    }else{
                        window.location = url;
                    }
                }else {
                    msg.innerHTML = data.msg;
                }
            }
        })
    }
    function pw_login() {
        if(password.value == null || password.value == ""){
            msg.innerHTML = "请输入密码";
            return;
        }
        captcha_init(function (res) {
            if (res.ret == 0) {
                $.ajax({
                    type:"GET",
                    url:"/captchaVerify",
                    data:{"randStr":res.randstr,"ticket":res.ticket},
                    success:function (flag) {
                        if(flag){
                            login_pw(username.value,password.value,res.randstr,res.ticket);
                        }else{
                            pw_login();
                        }
                    }
                })
            }
        })
    }

    function login_pw(username,password,randStr,ticket) {
        if(randStr == null || ticket == null || randStr.trim() == "" || ticket.trim() == "")pw_login();
        classie.add(signIn,'is-loading');
        $.ajax({
            type:"POST",
            url:"/auth/login",
            data:{"username":username,"password":password,"randStr":randStr,"ticket":ticket},
            success:function (res,xhr) {
                let data = JSON.parse(res);
                classie.remove(signIn,'is-loading');
                if(data.code == 1){
                    let url = redirect();
                    if (url == "") {
                        html_init();
                        classie.add(login,'is-hidden');
                    }else{
                        window.location = url;
                    }
                }else if(data.code == 1000){
                    pw_login();
                }else {
                    msg.innerHTML = data.msg;
                }
            }
        })
    }

    function sendVerifyCode() {
        if(!(/^1[3456789]\d{9}$/.test(username.value))){
            msg.innerHTML = "请输入正确的手机号";
            return;
        }
        captcha_init(function (res){
            if (res.ret == 0) {
                $.ajax({
                    type:"GET",
                    url:"/captchaVerify",
                    data:{"randStr":res.randstr,"ticket":res.ticket},
                    success:function (flag) {
                        if(flag){
                            sendCodeF(username.value,res.randstr,res.ticket);
                        }else{
                            pw_login();
                        }
                    }
                })
            }
        });
    }

    function sendCodeF(username,randStr,ticket){
        $.ajax({
            type:"GET",
            url:"/getVerify",
            data:{"username":username,"randStr":randStr,"ticket":ticket},
            success:function (res) {
                let data = JSON.parse(res);
                if(data.code == 1){
                    msg.innerHTML = "发送成功";
                    let time = 59,timer = null;
                    sendCode.disabled = true;
                    sendCode.value = time+1;
                    timer = setInterval(function(){
                        sendCode.value = time;
                        time--;//时间值自减
                        if(time ==0){
                            sendCode.value='发送';
                            sendCode.disabled = false;
                            clearInterval(timer);
                        }
                    },1000);
                }else {
                    msg.innerHTML = data.msg;
                }
            }
        })
    }

    function verify(username,verifyCode) {
        if (username == null || username.trim() == "") {
            msg.innerHTML = "请输入邮箱。";
            return true;
        }else{
            let regx = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if (!regx.test(username)) {
                msg.innerHTML = "请输入正确的邮箱。";
                return true;
            }
        }
        if (verifyCode == null || verifyCode.trim() == "") {
            msg.innerHTML = "请输入验证码。";
            return true;
        }
        return false;
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
})();
function captcha_init(callback) {
    let scr = document.querySelector('script[src="'+TCaptcha_URL+'"]');
    if(scr){
        let captcha1 = new TencentCaptcha('2002020665', function(res) {
            callback(res);
        })
        captcha1.show();
    }else{
        loadScript(TCaptcha_URL,function () {
            captcha_init(callback);
        });
    }
}

function html_init(){
    let no_login = document.querySelector('.no-login');
    let in_login = document.querySelector('.in-login');
    let in_login_name = document.querySelector('.in-login-name');
    let tf_auth = cookie.getCookie(tf_auth_info);
    if(tf_auth){
        classie.addClass(no_login,'is-hidden');
        classie.removeClass(in_login,'is-hidden');
        in_login_name.innerHTML = tf_auth.nickName;
    }else{
        classie.addClass(in_login,'is-hidden');
        classie.removeClass(no_login,'is-hidden');
    }
}

function noticeMsg(msg,type,ttl){
    let notice = new NotificationFx({
        message : msg,
        ttl:ttl||3000,
        type : type||'warning'
    });
    notice.show();
}

function limitImg(file){
    let f = (file.files && file.files[0])|| file;
    if (f.size / 1024 > 400) {
        noticeMsg("文件大小不能超过400k");
        return true;
    }
    return false;
}

function logout(){
    $.ajax({
        url:"/loginOut",
        type:"POST",
        success:function (res){
            res = JSON.parse(res);
            if (res.code == 1) {
                storage.clear();
                window.location = "/";
            }
        }
    })
}
function loadScript(url, callback) {
    let script = document.createElement("script");
    script.type = "text/javascript";
    if (typeof(callback) != "undefined") {
        if (script.readyState) {
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function() {callback()};
        }
    };
    script.src = url;
    document.body.appendChild(script);
}


;( function( window ) {
    'use strict';
    let container,isLoading;
    function init(){
        //检测下html中是否已经有这个loading元素
        container =document.querySelector(".loading-body");
        if (!container) {
            // 创建一个Element对象
            container = document.createElement('div');
            container.className = "loading-body";
            document.body.appendChild(container);
        }
    }
    function show(){
        init();
        // 创建一个Element对象
        isLoading = document.createElement('div');
        isLoading.className = 'loading';
        isLoading.innerHTML = "<span></span><span></span><span></span><span></span><span></span>";
        container.appendChild(isLoading);
        document.body.style.overflow='hidden';
        document.documentElement.style.overflow='hidden'
    }
    function close() {
        try {
            isLoading.remove();
            container.remove();
            document.body.removeAttribute("style")
            document.documentElement.removeAttribute("style")
        }catch (e){

        }
    }
    let loading = {
        // full names
        show: show,
        close: close
    };
    // transport
    if ( typeof define === 'function' && define.amd ) {
        // AMD
        define( loading );
    } else {
        // browser global
        window.loading = loading;
    }
})( window );