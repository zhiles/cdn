;(function(global){
    let __INFO__ = {
        plugins: "SMmuiscPlay",
        version: "0.0.2",
        author: "Boke",
        website: "http://boke.ink"
    };
    let defualts = {
        el: "",
        buttonImgSrc: "",
        htmls: '<audio autoplay loop></audio>'
    };
    let PlayCode = function(options) {
        let settings = Object.assign({}, defualts, options);//缺省值合并
        let audioDom = settings.el ? document.getElementById(settings.el) : document.body;//获得用户传入的节点
        if(!audioDom) audioDom = document.body;

        let audioBox = document.createElement("div");
        // audioBox.id = "musicControl";
        audioBox.classList.add("has-text-link")
        let boxDefaultStyle = "vertical-align:middle;display:inline-block;cursor:pointer;"
        audioBox.style = boxDefaultStyle;
        audioBox.innerHTML = "<i class=\"fas fa-music-alt\"></i>"+settings.htmls;
        //插入节点
        audioDom.appendChild(audioBox);

        let attempt = document.createElement("div");
        let textStyle = "display:inline-block;vertical-align:middle;margin-left:.5rem;cursor:pointer;";
        attempt.classList.add("has-text-link")
        attempt.style = textStyle;
        attempt.innerHTML = "在线试听";
        audioDom.appendChild(attempt);

        let download = document.createElement("div");
        download.classList.add("has-text-link")
        download.style = textStyle;
        download.innerHTML = "<i class=\"fas fa-cloud-download-alt\"></i>";
        audioDom.appendChild(download);

        let downloadText = document.createElement("div");
        downloadText.classList.add("has-text-link")
        downloadText.style = textStyle;
        downloadText.innerHTML = "立即下载";
        audioDom.appendChild(downloadText);

        let audioTag = audioBox.querySelectorAll("audio")[0];

        //更换播放按钮图片
        // if(!settings.buttonImgSrc) {
        //     audioBox.style.backgroundImage = `url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NPHN2ZyB2ZXJzaW9uPSIxLjEiIGJhc2VQcm9maWxlPSJmdWxsIg0geG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIg0geG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiDSB4bWxuczpldj0iaHR0cDovL3d3dy53My5vcmcvMjAwMS94bWwtZXZlbnRzIiANICBoZWlnaHQ9IjYwcHgiIA0gIHdpZHRoPSI2MHB4IiANPg08cGF0aCBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgb3BhY2l0eT0iMC41MDIiIGZpbGw9InJnYiggMCwgMCwgMCApIg0gZD0iTTMwLDEgQzQ2LjAxNiwxIDU5LDEzLjk4NCA1OSwzMCBDNTksNDYuMDE2IDQ2LjAxNiw1OSAzMCw1OSBDMTMuOTg0LDU5IDEsNDYuMDE2IDEsMzAgQzEsMTMuOTg0IDEzLjk4NCwxIDMwLDEgWiAiLz4NPHBhdGggc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIGZpbGw9InJnYiggMjU1LCAyNTUsIDI1NSApIg0gZD0iTTMwLDYwIEMxMy40MzEsNjAgMCw0Ni41NjkgMCwzMCBDMCwxMy40MzEgMTMuNDMxLDAgMzAsMCBDNDYuNTY5LDAgNjAsMTMuNDMxIDYwLDMwIEM2MCw0Ni41NjkgNDYuNTY5LDYwIDMwLDYwIFpNMzAsMyBDMTUuMDg4LDMgMywxNS4wODggMywzMCBDMyw0NC45MTIgMTUuMDg4LDU3IDMwLDU3IEM0NC45MTIsNTcgNTcsNDQuOTEyIDU3LDMwIEM1NywxNS4wODggNDQuOTEyLDMgMzAsMyBaICIvPg08cGF0aCBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgZmlsbD0icmdiKCAyNTUsIDI1NSwgMjU1ICkiDSBkPSJNMzEuMDg4LDEwIEMzMS4zNywxMi4wMDEgMzEuNDEsMTQuNTI0IDMzLjUwNiwxNy4wNDcgQzM1LjExNywxOC45NjkgMzYuOTMxLDIwLjY5IDM4LjE4LDIyLjI1MiBDMzkuODMyLDI0LjI5NCA0MSwyNi44NTcgNDEsMjkuNDYgQzQxLDMzLjYyNCAzOC45ODYsMzcuNzQ3IDM3LjYxNSw0MC4wMyBDMzcuNjE1LDQwLjAzIDM2Ljk3MSw0MC4wMyAzNi45NzEsNDAuMDMgQzM3LjkzOCwzNy44NjggMzkuODcyLDM0LjMwNCAzOS43MSwzMC41MDEgQzM5LjYzLDI4LjM3OCAzOC44MjQsMjYuMDk2IDM3LjQ1NSwyNC40MTUgQzM1LjkyMywyMi40NTIgMzMuMzQ0LDIwLjg5MSAzMS4wODgsMjAuNzMxIEMzMS4wODgsMjAuNzMxIDMxLjA4OCw0My40MzMgMzEuMDg4LDQzLjQzMyBDMzEuMDg4LDQ1LjIzNSAzMCw0Ni44NzcgMjguNDI5LDQ4LjA3OCBDMjYuODk4LDQ5LjI3OSAyNC44ODMsNTAgMjMuMTEsNTAgQzIxLjk4Miw1MCAyMC45MzQsNDkuNjQgMjAuMjA5LDQ5LjAzOSBDMTkuNDQzLDQ4LjQzOCAxOSw0Ny41NTggMTksNDYuNTE3IEMxOSw0NC44NzUgMjAuMTI4LDQzLjIzMyAyMS42NTksNDIuMDMyIEMyMy4xOTEsNDAuNzkxIDI1LjEyNCwzOS45OSAyNi43MzYsMzkuOTkgQzI4LjE0NywzOS45OSAyOS4zNTUsNDAuMTkgMzAuMDgxLDQwLjg3MSBDMzAuMDgxLDQwLjg3MSAzMC4wODEsMTAgMzAuMDgxLDEwIEMzMC4wODEsMTAgMzEuMDg4LDEwIDMxLjA4OCwxMCBaICIvPg08L3N2Zz4N')`;
        // }else{
        //     audioBox.style.backgroundImage = 'url('+settings.buttonImgSrc+')';
        // }

        let audioFn = {
            play: function(url) {
                if(url) audioTag.src = url;
                audioTag.play();
                audioBox.style.backgroundImage = audioBox.style.backgroundImage;
                audioBox.style.cssText += ";animation: "+settings.animaClass+" .8s linear infinite;";
            },
            stop: function() {
                audioTag.pause();
                audioBox.style.backgroundImage = audioBox.style.backgroundImage;
                audioBox.style.animation = "";
            }
        };

        audioBox.state = false;
        if (settings.audioUrl) {
            // audioFn.play(settings.audioUrl);
        } else {
            console.error(__INFO__.plugins + '无音乐资源启动失败，请添加音乐资源 audioUrl');
            return;
        }

        let _device = (/Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini/i.test(navigator.userAgent));
        let clickEvtName = _device ? "touchstart" : "mousedown";

        //给按钮绑定事件
        audioBox.addEventListener(clickEvtName, function(e){
            //判断播放状态
            if(this.state) {
                this.state = false;
                audioFn.stop();
            }else{
                this.state = true;
                // audioFn.play();
                audioFn.play(settings.audioUrl);
            }
        });
        //给按钮绑定事件
        attempt.addEventListener(clickEvtName, function(e){
            //判断播放状态
            if(this.state) {
                this.state = false;
                audioFn.stop();
            }else{
                this.state = true;
                // audioFn.play();
                audioFn.play(settings.audioUrl);
            }
        });

        download.addEventListener(clickEvtName,function () {
            let filename = settings.audioUrl.substring(settings.audioUrl.lastIndexOf("/")+1);
            filename = decodeURI(filename);
            if(confirm("是否确认下载《"+filename+"》")){
                let link = document.createElement('a');
                //设置下载的文件名
                link.download = filename;
                link.style.display = 'none';
                //设置下载路径
                link.href = settings.audioUrl;
                //触发点击
                document.body.appendChild(link);
                link.click();
                //移除节点
                document.body.removeChild(link);
            }
        })
        downloadText.addEventListener(clickEvtName,function () {
            let filename = settings.audioUrl.substring(settings.audioUrl.lastIndexOf("/")+1);
            filename = decodeURI(filename);
            if(confirm("是否确认下载《"+filename+"》")){
                let link = document.createElement('a');
                //设置下载的文件名
                link.download = filename;
                link.style.display = 'none';
                //设置下载路径
                link.href = settings.audioUrl;
                //触发点击
                document.body.appendChild(link);
                link.click();
                //移除节点
                document.body.removeChild(link);
            }
        })

        //判断是否是微信
        if(navigator.userAgent.toLowerCase().match(/micromessenger/i)) {
            document.addEventListener('WeixinJSBridgeReady', function onBridgeReady(){
                WeixinJSBridge.invoke("getNetworkType", {}, function(e){
                    audioFn.play();
                });
            });
        }

        // audioBox.style.cssText += ";animation: "+settings.animaClass+" .8s linear infinite;";
    };
    
    global[__INFO__.plugins] = PlayCode;
})(typeof window !== 'undefined' ? window : this);
