(function(window, document){

    var PERMISSION_GRANTED = 'granted',
        PERMISSION_DENIED = 'denied',
        PERMISSION_UNKNOWN = 'unknown';

    var a = [], iv, i=0;

    //
    // Swap the document.title with the notification
    //
    function swaptitle(title){

        if(a.length===0){
            a = [document.title];
        }

        a.push(title);

        if(!iv){
            iv = setInterval(function(){

                // has document.title changed externally?
                if(a.indexOf(document.title) === -1 ){
                    // update the default title
                    a[0] = document.title;
                }

                document.title = a[++i%a.length];
            }, 1000);
        }
    }

    function swapTitleCancel(){

        // dont do any more if we haven't got anything open
        if(a.length===0){
            return;
        }

        // if an IE overlay is present, kill it
        if("external" in window && "msSiteModeClearIconOverlay" in window.external ){
            window.external.msSiteModeClearIconOverlay();
        }

        clearInterval(iv);

        iv = false;
        document.title = a[0];
        a = [];
    }

    //
    // Add aevent handlers
    function addEvent(el,name,func){
        if(name.match(" ")){
            var a = name.split(' ');
            for(var i=0;i<a.length;i++){
                addEvent( el, a[i], func);
            }
        }
        if(el.addEventListener){
            el.removeEventListener(name, func, false);
            el.addEventListener(name, func, false);
        }
        else {
            el.detachEvent('on'+name, func);
            el.attachEvent('on'+name, func);
        }
    }


    function check_permission(){
        // Check whether the current desktop supports notifications and if they are authorised,
        // PERMISSION_GRANTED (yes they are supported and permission is granted),
        // PERMISSION_DENIED (yes they are supported, permission has not been granted),
        // -1 (Notifications are not supported)

        // IE9
        if(("external" in window) && ("msIsSiteMode" in window.external)){
            return window.external.msIsSiteMode()? PERMISSION_GRANTED : PERMISSION_UNKNOWN;
        }
        else if("webkitNotifications" in window){
            return window.webkitNotifications.checkPermission() === 0 ? PERMISSION_GRANTED : PERMISSION_DENIED;
        }
        else if("mozNotification" in window.navigator){
            return PERMISSION_GRANTED;
        }
        else {
            return PERMISSION_UNKNOWN;
        }
    }

    function update_permission(){
        // Define the current state
        window.Notification.permission = check_permission();
        return window.Notification.permission;
    }


    if(!Object(window.Notification).permission){

        //
        // Bind event handlers to the body
        addEvent(window, "focus scroll click", swapTitleCancel);

        // Assign it.
        window.Notification = function(message, options){

            // ensure this is an instance
            if(!(this instanceof window.Notification)){
                return new window.Notification(message,options);
            }

            var n, self = this;

            //
            options = options || {};

            this.body = options.body || '';
            this.icon = options.icon || '';
            this.lang = options.lang || '';
            this.tag = options.tag || '';
            this.close = function(){

                // remove swapTitle
                swapTitleCancel();

                // Close
                if(Object(n).close){
                    n.close();
                }

                self.onclose();
            };
            this.onclick = function(){};
            this.onclose = function(){};

            //
            // Swap document.title
            //
            swaptitle(message);

            //
            // Create Desktop Notifications
            //
            if(("external" in window) && ("msIsSiteMode" in window.external)){
                if(window.external.msIsSiteMode()){
                    window.external.msSiteModeActivate();
                    if(this.icon){
                        window.external.msSiteModeSetIconOverlay(this.icon, message);
                    }
                }
            }
            else if("webkitNotifications" in window){
                if(window.webkitNotifications.checkPermission() === 0){
                    n = window.webkitNotifications.createNotification(this.icon, message, this.body );
                    n.show();
                    n.onclick = function(){

                        // Fire any user bound events to the onclick function
                        self.onclick();

                        // redirect the user back to the page
                        window.focus();
                        setTimeout( function(){ n.cancel(); }, 1000);
                    };
                }
            }
            else if( "mozNotification" in window.navigator ){
                var m = window.navigator.mozNotification.createNotification( message, this.body, this.icon );
                m.show();
            }
        };

        window.Notification.requestPermission = function(cb){
            // Setup
            // triggers the authentication to create a notification
            cb = cb || function(){};

            // IE9
            if(("external" in window) && ("msIsSiteMode" in window.external)){
                try{
                    if( !window.external.msIsSiteMode() ){
                        window.external.msAddSiteMode();
                        cb( PERMISSION_UNKNOWN );
                    }
                }
                catch(e){}
                cb( update_permission() );
            }
            else if("webkitNotifications" in window){
                window.webkitNotifications.requestPermission(function(){
                    cb( update_permission() );
                });
            }
            else {
                cb( update_permission() );
            }
        };

        // Get the current permission
        update_permission();
    }
})(window, document);


function fadeOut (element, cb) {
    if (element.style.opacity && element.style.opacity > 0.05) {
        element.style.opacity = element.style.opacity - 0.05
    } else if (element.style.opacity && element.style.opacity <= 0.1) {
        if (element.parentNode) {
            element.parentNode.removeChild(element)
            if (cb) cb()
        }
    } else {
        element.style.opacity = 0.9
    }
    setTimeout(() => fadeOut.apply(this, [element, cb]), 1000 / 30)
}

const LIB_NAME = 'toastr'

const ERROR = 'error'
const WARN = 'warn'
const SUCCESS = 'success'
const INFO = 'info'
const CONTAINER_CLASS = LIB_NAME
const NOTIFICATION_CLASS = `${LIB_NAME}-notification`
const TITLE_CLASS = `${LIB_NAME}-notification-title`
const ICON_CLASS = `${LIB_NAME}-notification-icon`
const MESSAGE_CLASS = `${LIB_NAME}-notification-message`
const ERROR_CLASS = `${LIB_NAME}-${ERROR}`
const WARN_CLASS = `${LIB_NAME}-${WARN}`
const SUCCESS_CLASS = `${LIB_NAME}-${SUCCESS}`
const INFO_CLASS = `${LIB_NAME}-${INFO}`
const DEFAULT_TIMEOUT = 3000

const EMPTY_STRING = ''

function flatten (obj, into, prefix) {
    into = into || {}
    prefix = prefix || EMPTY_STRING

    for (const k in obj) {
        if (obj.hasOwnProperty(k)) {
            const prop = obj[k]
            if (prop && typeof prop === 'object' && !(prop instanceof Date || prop instanceof RegExp)) {
                flatten(prop, into, prefix + k + ' ')
            } else {
                if (into[prefix] && typeof into[prefix] === 'object') {
                    into[prefix][k] = prop
                } else {
                    into[prefix] = {}
                    into[prefix][k] = prop
                }
            }
        }
    }

    return into
}

function makeCss (obj) {
    const flat = flatten(obj)
    let str = JSON.stringify(flat, null, 2)
    str = str.replace(/"([^"]*)": {/g, '$1 {')
        .replace(/"([^"]*)"/g, '$1')
        .replace(/(\w*-?\w*): ([\w\d- .#]*),?/g, '$1: $2;')
        .replace(/},/g, '}\n')
        .replace(/ &([.:])/g, '$1')

    str = str.substr(1, str.lastIndexOf('}') - 1)

    return str
}

function appendStyles (css) {
    let head = document.head || document.getElementsByTagName('head')[0]
    let styleElem = makeNode('style')
    styleElem.id = `${LIB_NAME}-styles`
    styleElem.type = 'text/css'

    if (styleElem.styleSheet) {
        styleElem.styleSheet.cssText = css
    } else {
        styleElem.appendChild(document.createTextNode(css))
    }

    head.appendChild(styleElem)
}

const config = {
    types: {ERROR, WARN, SUCCESS, INFO},
    animation: fadeOut,
    timeout: DEFAULT_TIMEOUT,
    icons: {},
    appendTarget: document.body,
    node: makeNode(),
    allowHtml: false,
    style: {
        [`.${CONTAINER_CLASS}`]: {
            position: 'fixed',
            'z-index': 99999,
            right: '.2rem',
            top: '1.7rem'
        },
        [`.${NOTIFICATION_CLASS}`]: {
            cursor: 'pointer',
            padding: '12px 18px',
            margin: '0 0 6px 0',
            'background-color': '#000',
            opacity: 0.9,
            color: '#fff',
            'border-radius': '.2rem',
            'box-shadow': '#3c3b3b 0 0 10px',
            width: '20.8rem',
            [`&.${ERROR_CLASS}`]: {
                'background-color': '#bd362f'
            },
            [`&.${WARN_CLASS}`]: {
                'background-color': '#f89406'
            },
            [`&.${SUCCESS_CLASS}`]: {
                'background-color': '#51a351'
            },
            [`&.${INFO_CLASS}`]: {
                'background-color': '#2f96b4'
            },
            '&:hover': {
                opacity: 1,
                'box-shadow': '#000 0 0 10px'
            }
        },
        [`.${ICON_CLASS}`]: {
			height:'1.3rem',
			float:'left',
            display: 'inline-block',
            padding:'.2rem .2rem 0 0'
        },
        [`.${TITLE_CLASS}`]: {
            display: 'inline-block',
            'font-weight': '500',
        },
        [`.${MESSAGE_CLASS}`]: {
            'vertical-align': 'middle',
			'word-wrap':'break-word'
        }
    }
}

function makeNode (type = 'div') {
    return document.createElement(type)
}

function createIcon (node, type, config) {
    const iconNode = makeNode(config.icons[type].nodeType)
    const attrs = config.icons[type].attrs
    for (const k in attrs) {
        if (attrs.hasOwnProperty(k)) {
            iconNode.setAttribute(k, attrs[k])
        }
    }

    node.appendChild(iconNode)
}

function addElem (node, text, className, config) {
    const elem = makeNode()
    elem.className = className
    if (config.allowHtml) {
        elem.innerHTML = text
    } else {
        elem.appendChild(document.createTextNode(text))
    }
    node.appendChild(elem)
}

function getTypeClass (type) {
    if (type === SUCCESS) return SUCCESS_CLASS
    if (type === WARN) return WARN_CLASS
    if (type === ERROR) return ERROR_CLASS
    if (type === INFO) return INFO_CLASS

    return EMPTY_STRING
}

const miniToastr = {
    config,
    isInitialised: false,
    showMessage (message, title, type, timeout, cb, overrideConf) {
        const config = {}
        Object.assign(config, this.config)
        Object.assign(config, overrideConf)

        const notificationElem = makeNode()
        notificationElem.className = `${NOTIFICATION_CLASS} ${getTypeClass(type)}`

        notificationElem.onclick = function () {
            config.animation(notificationElem, null)
        }

        if (config.icons[type]) createIcon(notificationElem, type, config)
        if (title) addElem(notificationElem, title, TITLE_CLASS, config)
        if (message) addElem(notificationElem, message, MESSAGE_CLASS, config)

        config.node.insertBefore(notificationElem, config.node.firstChild)
        setTimeout(() => config.animation(notificationElem, cb), timeout || config.timeout)
        if (cb) cb()
        return this
    },
    init (aConfig) {
        const newConfig = {}
        Object.assign(newConfig, config)
        Object.assign(newConfig, aConfig)
        this.config = newConfig

        const cssStr = makeCss(newConfig.style)
        appendStyles(cssStr)

        newConfig.node.id = CONTAINER_CLASS
        newConfig.node.className = CONTAINER_CLASS
        newConfig.appendTarget.appendChild(newConfig.node)

        Object.keys(newConfig.types).forEach(v => {
                this[newConfig.types[v]] = function (message, title, timeout, cb, config) {
                    this.showMessage(message, title, newConfig.types[v], timeout, cb, config)
                    return this
                }.bind(this)
            }
        )

        this.isInitialised = true

        return this
    },
    setIcon (type, nodeType = 'i', attrs = []) {
        attrs.class = attrs.class ? attrs.class + ' ' + ICON_CLASS : ICON_CLASS
        this.config.icons[type] = {nodeType, attrs}
    }
}
window.toastr = miniToastr.init();
miniToastr.setIcon('success','img',{src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADsSURBVEhLY2AYBfQMgf///3P8+/evAIgvA/FsIF+BavYDDWMBGroaSMMBiE8VC7AZDrIFaMFnii3AZTjUgsUUWUDA8OdAH6iQbQEhw4HyGsPEcKBXBIC4ARhex4G4BsjmweU1soIFaGg/WtoFZRIZdEvIMhxkCCjXIVsATV6gFGACs4Rsw0EGgIIH3QJYJgHSARQZDrWAB+jawzgs+Q2UO49D7jnRSRGoEFRILcdmEMWGI0cm0JJ2QpYA1RDvcmzJEWhABhD/pqrL0S0CWuABKgnRki9lLseS7g2AlqwHWQSKH4oKLrILpRGhEQCw2LiRUIa4lwAAAABJRU5ErkJggg=='});
miniToastr.setIcon('info','img',{src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGwSURBVEhLtZa9SgNBEMc9sUxxRcoUKSzSWIhXpFMhhYWFhaBg4yPYiWCXZxBLERsLRS3EQkEfwCKdjWJAwSKCgoKCcudv4O5YLrt7EzgXhiU3/4+b2ckmwVjJSpKkQ6wAi4gwhT+z3wRBcEz0yjSseUTrcRyfsHsXmD0AmbHOC9Ii8VImnuXBPglHpQ5wwSVM7sNnTG7Za4JwDdCjxyAiH3nyA2mtaTJufiDZ5dCaqlItILh1NHatfN5skvjx9Z38m69CgzuXmZgVrPIGE763Jx9qKsRozWYw6xOHdER+nn2KkO+Bb+UV5CBN6WC6QtBgbRVozrahAbmm6HtUsgtPC19tFdxXZYBOfkbmFJ1VaHA1VAHjd0pp70oTZzvR+EVrx2Ygfdsq6eu55BHYR8hlcki+n+kERUFG8BrA0BwjeAv2M8WLQBtcy+SD6fNsmnB3AlBLrgTtVW1c2QN4bVWLATaIS60J2Du5y1TiJgjSBvFVZgTmwCU+dAZFoPxGEEs8nyHC9Bwe2GvEJv2WXZb0vjdyFT4Cxk3e/kIqlOGoVLwwPevpYHT+00T+hWwXDf4AJAOUqWcDhbwAAAAASUVORK5CYII='});
miniToastr.setIcon('warn','img',{src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGYSURBVEhL5ZSvTsNQFMbXZGICMYGYmJhAQIJAICYQPAACiSDB8AiICQQJT4CqQEwgJvYASAQCiZiYmJhAIBATCARJy+9rTsldd8sKu1M0+dLb057v6/lbq/2rK0mS/TRNj9cWNAKPYIJII7gIxCcQ51cvqID+GIEX8ASG4B1bK5gIZFeQfoJdEXOfgX4QAQg7kH2A65yQ87lyxb27sggkAzAuFhbbg1K2kgCkB1bVwyIR9m2L7PRPIhDUIXgGtyKw575yz3lTNs6X4JXnjV+LKM/m3MydnTbtOKIjtz6VhCBq4vSm3ncdrD2lk0VgUXSVKjVDJXJzijW1RQdsU7F77He8u68koNZTz8Oz5yGa6J3H3lZ0xYgXBK2QymlWWA+RWnYhskLBv2vmE+hBMCtbA7KX5drWyRT/2JsqZ2IvfB9Y4bWDNMFbJRFmC9E74SoS0CqulwjkC0+5bpcV1CZ8NMej4pjy0U+doDQsGyo1hzVJttIjhQ7GnBtRFN1UarUlH8F3xict+HY07rEzoUGPlWcjRFRr4/gChZgc3ZL2d8oAAAAASUVORK5CYII='});
miniToastr.setIcon('error','img',{src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHOSURBVEhLrZa/SgNBEMZzh0WKCClSCKaIYOED+AAKeQQLG8HWztLCImBrYadgIdY+gIKNYkBFSwu7CAoqCgkkoGBI/E28PdbLZmeDLgzZzcx83/zZ2SSXC1j9fr+I1Hq93g2yxH4iwM1vkoBWAdxCmpzTxfkN2RcyZNaHFIkSo10+8kgxkXIURV5HGxTmFuc75B2RfQkpxHG8aAgaAFa0tAHqYFfQ7Iwe2yhODk8+J4C7yAoRTWI3w/4klGRgR4lO7Rpn9+gvMyWp+uxFh8+H+ARlgN1nJuJuQAYvNkEnwGFck18Er4q3egEc/oO+mhLdKgRyhdNFiacC0rlOCbhNVz4H9FnAYgDBvU3QIioZlJFLJtsoHYRDfiZoUyIxqCtRpVlANq0EU4dApjrtgezPFad5S19Wgjkc0hNVnuF4HjVA6C7QrSIbylB+oZe3aHgBsqlNqKYH48jXyJKMuAbiyVJ8KzaB3eRc0pg9VwQ4niFryI68qiOi3AbjwdsfnAtk0bCjTLJKr6mrD9g8iq/S/B81hguOMlQTnVyG40wAcjnmgsCNESDrjme7wfftP4P7SP4N3CJZdvzoNyGq2c/HWOXJGsvVg+RA/k2MC/wN6I2YA2Pt8GkAAAAASUVORK5CYII='});

let chck = Notification.permission;
if( chck === 'denied' || chck === 'default' ){
    Notification.requestPermission();
}