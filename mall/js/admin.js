class Init {
    constructor(tag) {
        if (tag == "stores") {
            let stores = new Stores();
            stores.list();
        } else if (tag == "trades") {
            let trade = new Trade();
            trade.list();
        } else if (tag == "news") {
            let news = new News();
            news.list();
        } else if (tag == "article") {
            let article = new Article();
            article.init();
        } else if (tag == "articles") {
            let article = new Article();
            article.list();
        } else if (tag == "organ") {
            let organ = new Organ();
            organ._init();
        } else if (tag == "users") {
            let user = new User();
            user.list();
        } else if (tag == "banners") {
            let banners = new Banner();
            banners.initBanner();
        }
    }
}

class Stores {
    constructor() {
        this.trade;
        this.news;
        this.query = document.querySelector('.is-query');
        this.store_modal = document.querySelector('.store-modal');
        this.trade_modal = document.querySelector('.trade-modal');
        this.trade_close = document.querySelector('.trade-close');
        this.news_modal = document.querySelector('.news-modal');
        this.news_close = document.querySelector('.news-close');
        this.element = document.querySelector('tbody');
        this.pagination = document.querySelector('.pagination');
        this.store_name = document.querySelector('.store-name');
        this.status = document.querySelector('.status');
        this.pageNo = 1;
        this.organId = "";
        let trade_submit = document.querySelector('.trade-submit');
        trade_submit.addEventListener('click', () => {
            let submit = this.trade.submit();
            submit.then(res => {
                if (res != undefined && res.code == 1) {
                    this.destroy(this.trade);
                }
            })
        })
        let news_submit = document.querySelector('.news-submit');
        news_submit.addEventListener('click', async () => {
            let submit = this.news.submit();
            submit.then(res => {
                if (res != undefined && res.code == 1) {
                    this.destroy(this.news);
                }
            })
        });
        this.query.addEventListener('click', () => {
            this.list();
        })

        let vipBtn = document.querySelector('.vip-btn');
        let domainBtn = document.querySelector('.domain-btn');
        let synchronizeBtn = document.querySelector('.synchronize-btn');
        vipBtn.addEventListener('click', () => {
            if (this.organId == "") {
                notify(CONST.admin_error);
                return;
            }
            let vip = new Vip();
            vip.init(this.organId);
        })
        synchronizeBtn.addEventListener('click', async () => {
            let result = await ask('/admin/synchronize', {id: this.organId}, 'POST');
            result = JSON.parse(result);
            if (result.code == 1) {
                notify("同步成功");
            }
        })
        domainBtn.addEventListener('click', () => {
            let domain = new Domain();
            domain.init(this.organId);
        })
    }

    method() {
        this.list();
    }

    async list() {
        let res = await ask("/organ/findAllPage", {
            name: this.store_name.value,
            status: this.status.value,
            pageNo: this.pageNo,
            pageSize: 10
        }, "POST");
        res = JSON.parse(res);
        if (res.code == 1) {
            let el = "";
            let d = res.data.organs.records;
            for (let i = 0; i < d.length; i++) {
                el += "<tr>" +
                    "<td><a target='_blank' href='/store/" + d[i].id + "'>" + d[i].name + "</a></td>" +
                    "<td>" + d[i].phone + "</td>" +
                    "<td>" + d[i].gmtCreate + "</td>" +
                    "<td>" +
                    "<a class='trade' data-id='" + d[i].id + "' data-business='" + d[i].business + "'>产品</a> " +
                    "<a class='news' data-id='" + d[i].id + "' data-business='" + d[i].business + "'>资讯</a> " +
                    "<a class='detail' data-id='" + d[i].id + "'>详情</a> " +
                    "<a class='startAndStop' data-id='" + d[i].id + "' data-status='" + (d[i].status == 1 ? 0 : 1) + "'>" + (d[i].status == 1 ? '禁用' : '解封') + "</a> ";
                el += "</td></tr>";
            }
            this.element.innerHTML = el;
            new Common().initPage(res.data.organs, res.data.rainbow, this);
            this.initTable();
        }
    }


    initTable() {
        let trades = document.querySelectorAll('.trade');
        let news = document.querySelectorAll('.news');
        let details = document.querySelectorAll('.detail');
        let startAndStop = document.querySelectorAll('.startAndStop');
        trades.forEach(item => {
            item.addEventListener('click', () => {
                this.showTrade(item.getAttribute('data-id'), item.getAttribute('data-business'))
            })
        })
        news.forEach(item => {
            item.addEventListener('click', () => {
                this.showNews(item.getAttribute('data-id'), item.getAttribute('data-business'))
            })
        })
        details.forEach(item => {
            item.addEventListener('click', () => {
                this.show(item.getAttribute('data-id'))
            })
        })
        startAndStop.forEach(item => {
            item.addEventListener('click', () => {
                this.startAndStop(item.getAttribute('data-id'), item.getAttribute('data-status'))
            })
        })
        this.trade_close.addEventListener('click', () => {
            this.destroy(this.trade);
        })
        this.news_close.addEventListener('click', () => {
            this.destroy(this.news);
        })
    }

    async startAndStop(id, status) {
        let res = await ask("/admin/verifyOrgan", {"id": id, "status": status}, "POST");
        res = JSON.parse(res);
        if (res.code == 1) {
            notify((status == 0 ? "禁用" : "解封") + "成功");
            this.list();
        }
    }

    show(id) {
        this.organId = id;
        classie.addClass(this.store_modal, "is-active");
    }

    showTrade(organId, business) {
        if (organId == "") {
            notify(CONST.admin_error);
            return;
        }
        if (this.trade == undefined) {
            this.trade = new Trade();
        }
        this.trade.init(organId, "", business);
        classie.addClass(this.trade_modal, "is-active");
    }

    showNews(organId, business) {
        if (organId == "") {
            notify(CONST.admin_error);
            return;
        }
        this.news = new News();
        this.news.init(organId, "", business);
        classie.addClass(this.news_modal, "is-active");
    }

    destroy(i) {
        if (i == this.trade) {
            this.trade.destroy();
            classie.removeClass(this.trade_modal, 'is-active');
        }
        if (i == this.news) {
            this.news.destroy();
            classie.removeClass(this.news_modal, 'is-active');
        }
    }
}

class Trade {
    constructor() {
        this.classifyMap = new Map();
        this.tradeImg = document.querySelector('#trade-img');
        this.name = document.querySelector('#name');
        this.trade_keyword = document.querySelector('#trade-keyword');
        this.classify = document.querySelector('.classify');
        this.classifyTwo = document.querySelector('.classifyTwo');
        this.price = document.querySelector('#price');
        this.minNumber = document.querySelector('#minNumber');
        this.trade_protocol = document.querySelector('#trade-protocol');
        this.trade_resume = document.querySelector('#trade-resume');
        this.organId = "";

        this.element = document.querySelector('tbody');
        this.pagination = document.querySelector('.pagination');
        this.pageNo = 1;
    }

    method() {
        this.list();
    }

    async list() {
        let res = await ask('/trade/findAllPage', {pageNo: this.pageNo, pageSize: 10}, 'POST');
        res = JSON.parse(res);
        if (res.code == 1) {
            let el = "";
            let isAdmin = window.location.href.indexOf('admin') > 0;
            for (let i = 0; i < res.data.trades.records.length; i++) {
                let d = res.data.trades.records;
                el += "<tr>" +
                    "<td>" + d[i].name + "</td>" +
                    "<td>" + (d[i].price == 0 ? '面议' : d[i].price) + "</td>" +
                    "<td>" + d[i].releaseTime + "</td>";
                if (isAdmin) {
                    el += "<td><a class='trade'" + d[i].id + "'>编辑</a> ";
                } else {
                    el += "<td><a href='/manage/trade/" + d[i].id + "'>编辑</a> ";
                }
                // "<a href='/manage/trade/"+d[i].id+"'>上架</a></td>" +
                el += "</tr>";
            }
            this.element.innerHTML = el;
            new Common().initPage(res.data.trades, res.data.rainbow, this)
        }
    }


    async del() {
        let result = await ask('/trade/delete', {ids}, 'POST');
        result = JSON.parse(result);
        if (result.code == 1) {
            this.list();
            notify("删除成功");
        }
    }

    init(organId, tradeId, business) {
        this.organId = organId || "";
        this.trade_keyword.value = business || "";
        new Editor(organId, "trade_editor");
        this.getClassify();
        this.getDataInit(tradeId);
        this.trade_resume.addEventListener('change', () => {
            if (!limitImg(this.trade_resume) && this.trade_resume.files[0] != undefined) {
                uploadImg(this.trade_resume.files[0], this.tradeImg);
                this.trade_resume.value = "";
            }
        })
    }

    destroy() {
        this.organId = "";
        this.name.value = "";
        this.trade_keyword.value = "";
        this.classify.value = "";
        this.classifyTwo.value = "";
        this.price.value = "0";
        this.minNumber.value = "1";
        this.tradeImg.src = "";
        window.editor.setData("");
        window.editor.destroy();
    }

    async submit() {
        if (this.verify()) return;
        let result = await ask('/trade/save', {
            "organId": this.organId,
            "name": this.name.value.trim(),
            "keyword": this.trade_keyword.value.trim(),
            "classify": this.classify.value,
            "classifyTwo": this.classifyTwo.value,
            "price": this.price.value,
            "minNumber": this.minNumber.value,
            "img": this.tradeImg.src.replace(/(http|https):/ig, ''),
            "describes": window.editor.getData()
        }, 'POST');
        return JSON.parse(result);
    }

    async getDataInit(id) {
        if (id) {
            let res = await ask('/trade/findByIdDetails', {id}, 'POST');
            res = JSON.parse(res);
            if (res.code == 1) {
                this.name.value = res.data.trade.name;
                this.trade_keyword.value = res.data.trade.keyword;
                this.classify.value = res.data.trade.classify;
                this.classifyTwoInit(this.classify.value);
                this.classifyTwo.value = res.data.trade.classifyTwo;
                this.price.value = res.data.trade.price;
                this.minNumber.value = res.data.trade.minNumber;
                this.tradeImg.src = res.data.trade.img;
                window.editor.setData(res.data.describes.describes);
            }
        }
    }

    verify() {
        if (!this.trade_protocol.checked) {
            notify("请阅读并确认协议");
            return true;
        }
        if (!this.name.value) {
            notify("请填写标题");
            return true;
        }
        if (!this.trade_keyword.value) {
            notify("请填写关键词");
            return true;
        }
        if (!this.tradeImg.src) {
            notify("请上传封面图");
            return true;
        }
        if (!window.editor.getData() || window.editor.getData().replace(/<[^>]*>/ig, "").length < 200) {
            notify("详情描述需大于200文字。");
            return true;
        }
        if (!this.price.value) {
            notify("请填写价格");
            return true;
        }
        if (!this.minNumber.value) {
            notify("请填写最小采购量");
            return true;
        }
        return false;
    }

    async getClassify() {
        let tfClassify = "tf_classify";
        let classifySelect = ""
        let classifyData = storage.getItem(tfClassify);
        if (!classifyData) {
            let res = await ask('/trade/findAllClassify', {}, 'POST');
            classifyData = JSON.parse(res).data;
            storage.setItem(tfClassify, classifyData);
        }
        for (let i = 0; i < classifyData.length; i++) {
            this.classifyMap.set(classifyData[i].id, classifyData[i].children)
            classifySelect += "<option value='" + classifyData[i].id + "'>" + classifyData[i].name + "</option>";
        }
        this.classify.innerHTML = classifySelect;
        this.classifyTwoInit(this.classify.value);
        this.classify.addEventListener('change', () => {
            this.classifyTwoInit(this.classify.value);
        });
    }

    classifyTwoInit(classifyIndex) {
        let classifyTwoData = this.classifyMap.get(classifyIndex) || {};
        let classifySelectTwo = ""
        for (let i = 0; i < classifyTwoData.length; i++) {
            classifySelectTwo += "<option value='" + classifyTwoData[i].id + "'>" + classifyTwoData[i].name + "</option>";
        }
        this.classifyTwo.innerHTML = classifySelectTwo;
    }
}

class News {
    constructor() {
        this.title = document.querySelector('#title');
        this.news_keyword = document.querySelector('#news-keyword');
        this.guide = document.querySelector('#guide');
        this.cover = document.querySelector('#cover');
        this.new_resume = document.querySelector('#new-resume');
        this.new_protocol = document.querySelector('#new-protocol');
        this.organId = "";

        this.element = document.querySelector('tbody');
        this.pagination = document.querySelector('.pagination');
        this.pageNo = 1;
    }

    method() {
        this.list();
    }

    async list() {
        let res = await ask('/new/findAllPage', {pageNo: this.pageNo, pageSize: 10}, 'POST');
        res = JSON.parse(res);
        if (res.code == 1) {
            let el = "";
            let isAdmin = window.location.href.indexOf('admin') > 0;
            for (let i = 0; i < res.data.news.records.length; i++) {
                let d = res.data.news.records;
                el += "<tr>" +
                    "<td>" + d[i].title + "</td>" +
                    "<td>" + d[i].releaseTime + "</td>" +
                    "<td>" + d[i].gmtCreate + "</td>";
                if (isAdmin) {
                    el += "<td><a class='news'>编辑</a> ";
                } else {
                    el += "<td><a href='/manage/new/" + d[i].id + "'>编辑</a> ";
                }
                // "<a href='/manage/new/"+d[i].id+"'>上架</a></td>" +
                el += "</tr>";
            }
            this.element.innerHTML = el;
            new Common().initPage(res.data.news, res.data.rainbow, this);
        }
    }

    async del() {
        let result = await ask('/new/delete', {ids}, 'POST');
        result = JSON.parse(result);
        if (result.code == 1) {
            dataInit(pageNo);
            notify("删除成功");
        }
    }

    init(organId, newId, business) {
        this.organId = organId;
        this.news_keyword.value = business;
        this.getDataInit(newId);
        new Editor(organId, "news_editor");
        this.new_resume.addEventListener('change', () => {
            if (!limitImg(this.new_resume) && this.new_resume.files[0] != undefined) {
                uploadImg(this.new_resume.files[0], this.cover);
                this.new_resume.value = "";
            }
        })
    }

    async submit() {
        if (this.verify()) return;
        let result = await ask('/new/save', {
            "organId": this.organId,
            "title": this.title.value.trim(),
            "keyword": this.news_keyword.value.trim().replace("，", ",").replace(" ", ","),
            "guide": this.guide.value.trim(),
            "cover": this.cover.src.replace(/(http|https):/ig, ''),
            "describes": window.editor.getData()
        }, 'POST');
        return JSON.parse(result);
    }

    async getDataInit(id) {
        if (id) {
            let res = await ask('/new/findByIdDetails', {id}, 'POST');
            res = JSON.parse(res);
            if (res.code == 1) {
                this.title.value = res.data.aNew.title;
                this.news_keyword.value = res.data.aNew.keyword;
                this.guide.value = res.data.aNew.guide || '';
                this.cover.src = res.data.aNew.cover;
                window.editor.setData(res.data.describes.describes);
            }
        }
    }

    verify() {
        if (!this.title.value) {
            notify("请完善标题信息");
            return true;
        }
        if (!this.news_keyword.value) {
            notify("请完善关键词信息");
            return true;
        }
        if (!this.guide.value) {
            notify("请完善导读信息");
            return true;
        }
        if (!this.cover.src) {
            notify("请上传封面图片");
            return true;
        }
        if (!window.editor.getData() || window.editor.getData().replace(/<[^>]*>/ig, "").length < 200) {
            notify("详情描述需大于200文字。");
            return true;
        }
        if (!this.new_protocol.checked) {
            notify("请阅读并确认协议");
            return true;
        }
        return false;
    }

    destroy() {
        this.organId = "";
        this.title.value = "";
        this.news_keyword.value = "";
        this.guide.value = "";
        this.cover.src = "";
        window.editor.setData("");
        window.editor.destroy();
    }
}

class Article {

    constructor() {
        this.article_submit = document.querySelector('.article-submit');
        this.article_resume = document.querySelector('#article-resume');
        this.title = document.querySelector('#title');
        this.article_keyword = document.querySelector('#article-keyword');
        this.guide = document.querySelector('#guide');
        this.cover = document.querySelector('#cover');
        this.author = document.querySelector('#author');
        this.url = document.querySelector('#url');

        this.query = document.querySelector('.query');
        this.article_name = document.querySelector('.article-name');
        this.status = document.querySelector('.status');
        this.query && this.query.addEventListener('click', () => {
            this.list();
        })

        this.element = document.querySelector('tbody');
        this.pagination = document.querySelector('.pagination');
        this.pageNo = 1;
    }

    method() {
        this.list();
    }

    async list() {
        let res = await ask('/article/findAllPage', {
            title: this.article_name.value,
            status: this.status.value,
            pageNo: this.pageNo,
            pageSize: 10
        }, 'POST');
        res = JSON.parse(res);
        if (res.code == 1) {
            let el = "";
            for (let i = 0; i < res.data.articles.records.length; i++) {
                let d = res.data.articles.records;
                el += "<tr>" +
                    "<td>" + d[i].title + "</td>" +
                    "<td>" + d[i].keyword + "</td>" +
                    "<td>" + d[i].releaseTime + "</td>" +
                    "<td><a href='/admin/article/" + d[i].id + "'>编辑</a> " +
                    "<a href='javaScript:\"del(`" + d[i].id + "`)\"'>删除</a></td>" +
                    "</tr>";
            }
            this.element.innerHTML = el;
            new Common().initPage(res.data.articles, res.data.rainbow, this);
        }
    }

    async del(id) {
        let ids = new Array();
        ids.push(id);
        console.log(ids);
        // let result = await ask('/trade/delete', {ids}, 'POST');
        // result = JSON.parse(result);
        // if (result.code == 1) {
        //     dataInit(pageNo);
        //     noticeMsg("删除成功");
        // }
    }


    async init() {
        let indexOf = location.href.indexOf("article/");
        let article_id = indexOf >= 0 ? location.href.substring(indexOf + 8, location.href.length) : '';
        new Editor("", "article_editor")
        await this.getDataInit(article_id);
        this.article_submit.addEventListener('click', async () => {
            if (this.verify()) {
                return;
            }
            let result = await ask('/article/save', {
                id: article_id,
                title: this.title.value.trim(),
                keyword: this.article_keyword.value.trim().replace("，", ",").replace(" ", ","),
                guide: this.guide.value.trim(),
                cover: this.cover.src.replace(/(http|https):/ig, ''),
                describes: window.editor.getData(),
                author: this.author.value,
                url: this.url.value
            }, 'POST');
            result = JSON.parse(result);
            if (result.code == 1) {
                notify("发布成功")
            }
        })
        this.article_resume.addEventListener('change', () => {
            if (!limitImg(this.article_resume) && this.article_resume.files[0] != undefined) {
                uploadImg(this.article_resume.files[0], this.cover);
                this.article_resume.value = "";
            }
        })
    }

    async getDataInit(article_id) {
        if (article_id) {
            let result = await ask('/article/findByIdDetails', {id: article_id}, 'POST');
            result = JSON.parse(result);
            if (result.code == 1) {
                let article = result.data.article;
                this.title.value = article.title;
                this.article_keyword.value = article.keyword;
                this.guide.value = article.guide;
                this.cover.src = article.cover;
                this.author.value = article.author;
                this.url.value = article.url;
                window.editor.setData(result.data.describes);
            }
        }
    }

    verify() {
        if (this.title.value.trim() == "") {
            notify("标题不能为空");
            return true;
        }
        if (this.article_keyword.value.trim() == "") {
            notify("关键词不能为空");
            return true;
        }
        if (this.guide.value.trim() == "") {
            notify("导读不能为空");
            return true;
        }
        if (this.cover.src.trim() == "") {
            notify("图片不能为空");
            return true;
        }
        if (window.editor.getData() == "") {
            notify("文章内容不能为空");
            return true;
        }
        if (this.author.value.trim() == "") {
            notify("作者不能为空");
            return true;
        }
        return false;
    }
}

class Banner {
    constructor() {
        this.bannerId = '';
        this.modal_banner = document.querySelector('.modal_banner');
        this.banner_resume = document.querySelector('#banner-resume');
        this.startTime = document.querySelector('#startTime');
        this.endTime = document.querySelector('#endTime');
        this.link = document.querySelector('#link');
        this.sort = document.querySelector('#sort');
        this.alt = document.querySelector('#alt');
        this.img = document.querySelector('#img');
        let id = cookie.getCookie(CONST.tf_auth_info).organId || '';
        this.element = document.querySelector('tbody');
        this.add = document.querySelector('.is-add');
        this.organ = storage.getItem(id);

        let submitBannerBtn = document.querySelector('.submit_banner');
        let banner_close = document.querySelector('.is_banner_close');
        this.banner_resume.addEventListener('change', () => {
            uploadImg(this.banner_resume.files[0], this.img);
        })
        this.add.addEventListener('click', () => {
            if (this.organ.vipLog && this.organ.vipLog.vipId == 1) {
                notify("该功能为VIP功能,请先开通VIP。");
                return;
            }
            this.show();
        });
        banner_close.addEventListener('click', () => {
            this.destroy();
        });
        submitBannerBtn.addEventListener('click', () => {
            this.submit().then(result => {
                if(result){
                    result = JSON.parse(result);
                    if (result.code == 1) {
                        notify("保存成功");
                        this.destroy();
                        this.list();
                    }
                }
            });

        });
    }

    destroy() {
        classie.removeClass(this.modal_banner, 'is-active');
        this.link.value = "";
        this.sort.value = "";
        this.alt.value = "";
        this.img.src = "";
        this.startTime.value = "";
        this.endTime.value = "";
    }

    initBanner() {
        this.list();
    }

    async list() {
        let res = await ask('/ad/findAllByOrganId', {}, 'POST');
        res = JSON.parse(res);
        if (res.code == 1) {
            let el = "";
            for (let i = 0; i < res.data.length; i++) {
                let d = res.data;
                el += "<tr>" +
                    "<td>" + d[i].sort + "</td>" +
                    "<td>" + (d[i].link || '') + "</td>" +
                    "<td>" + (d[i].alt || '') + "</td>" +
                    "<td>" + d[i].startTime + "</td>" +
                    "<td>" + d[i].endTime + "</td>" +
                    "<td><a class='edit' data-id='" + d[i].id + "'>编辑</a> " +
                    "<a class='onAnOf' data-id='" + d[i].id + "' data-status='" + (d[i].status == 1 ? 0 : 1) + "'>" + (d[i].status == 1 ? '下架' : '上架') + "</a></td>" +
                    "</tr>";
            }
            this.element.innerHTML = el;
            let edits = document.querySelectorAll('.edit');
            let onAnOfs = document.querySelectorAll('.onAnOf');
            edits.forEach(item => {
                item.addEventListener('click', () => {
                    this.show(item.getAttribute('data-id'));
                })
            })
            onAnOfs.forEach(item => {
                item.addEventListener('click', () => {
                    this.onAndOf(item.getAttribute('data-id'),item.getAttribute('data-status'))
                })
            })
        }
    }

    async onAndOf(id, status) {
        let result = await ask('/ad/onAndOf', {id, status}, 'POST');
        result = JSON.parse(result);
        if (result.code == 1) {
            notify((status == 1 ? "上架" : "下架") + "成功");
            this.list();
        } else {
            notify(result.msg);
        }
    }
    show(id){
        this.bannerId = id;
        console.log(this.bannerId)
        if (id) {
            this.getBannerById(id);
        }
        classie.addClass(this.modal_banner, 'is-active');
    }

    async getBannerById(id) {
        let res = await ask('/ad/findById', {id}, 'POST');
        res = JSON.parse(res);
        if (res.code == 1) {
            this.link.value = res.data.link || '';
            this.sort.value = res.data.sort;
            this.alt.value = res.data.alt || '';
            this.img.src = res.data.imgUrl;
            this.startTime.value = res.data.startTime.substring(0, 10);
            this.endTime.value = res.data.endTime.substring(0, 10);
        }
    }

    async submit() {
        if (this.verify()) return;
        return await ask('/ad/save', {
            "id": this.bannerId || '',
            "link": this.link.value.trim(),
            "sort": this.sort.value,
            "alt": this.alt.value.trim(),
            "imgUrl": this.img.src.replace(/(http|https):/ig, ''),
            "startTime": this.startTime.value + " 00:00:00",
            "endTime": this.endTime.value + " 00:00:00",
            "type": 2
        }, 'POST');
    }

    verify() {
        if (this.img.src == "") {
            notify("图片不能为空");
            return true;
        }
        if (this.startTime.value == "") {
            notify("开始时间不能为空");
            return true;
        }
        if (this.endTime.value == "") {
            notify("结束时间不能为空");
            return true;
        }
        return false;
    }
}

class Vip {
    constructor() {
        this.modal = document.querySelector('.vip-model');
        this.vip = document.querySelector('#vip');
        this.overdue = document.querySelector('#overdue');
        this.remark = document.querySelector('#remark');
        this.submit = document.querySelector('.vip-success');
        this.close = document.querySelector('.vip-close');
    }

    async init(id) {
        this.close.addEventListener('click', function () {
            classie.removeClass(this.modal, 'is-active');
        });
        this.submit.addEventListener('click', async () => {
            let result = await ask('/vip/openVip', {
                "id": id,
                "vipId": this.vip.value,
                "overdue": this.overdue.value + " 00:00:00",
                "remark": this.remark.value
            }, 'POST');
            result = JSON.parse(result);
            if (result.code == 1) {
                notify("开通成功");
            }
            classie.removeClass(this.modal, 'is-active');
            this.vip.value = "";
            this.overdue.value = "";
            this.remark.value = "";
        })
        classie.addClass(this.modal, 'is-active');
        let res = await ask('/vip/findAllByStatus', {}, 'POST');
        res = JSON.parse(res);
        let sel = "";
        for (let i = 0; i < res.data.length; i++) {
            sel += '<option value="' + res.data[i].id + '">' + res.data[i].name + '</option>';
        }
        this.vip.innerHTML = sel;
    }
}

class Domain {
    constructor() {
        this.domain_modal = document.querySelector('.domain-modal');
        this.submit = document.querySelector('.domain-success');
        this.close = document.querySelector('.domain-close');
        this.domain = document.querySelector('#domain');
    }

    init(id) {
        classie.addClass(this.domain_modal, 'is-active');
        this.close.addEventListener('click', () => {
            classie.removeClass(this.domain_modal, 'is-active');
        });
        this.submit.addEventListener('click', async () => {
            if (!this.domain.value.trim()) {
                notify("域名不能为空")
                return;
            }
            if (this.domain.value.length <= 3) {
                notify("域名长度应大于3位")
                return;
            }

            let res = await ask('/admin/setDomain', {id, domain: this.domain.value.trim()}, 'POST');
            res = JSON.parse(res);
            if (res.code == 1) {
                notify("开通成功");
                classie.removeClass(this.domain_modal, 'is-active');
            } else {
                notify(res.msg);
            }
        })
    }

}

class User {
    constructor() {
        this.element = document.querySelector('tbody');
        this.pagination = document.querySelector('.pagination');
        this.pageNo = 1;
    }

    method() {
        this.list();
    }

    async list() {
        let res = await ask('/auth/findAllPage', {pageNo: this.pageNo, pageSize: 10}, 'POST');
        res = JSON.parse(res);
        if (res.code == 1) {
            let el = "";
            for (let i = 0; i < res.data.users.records.length; i++) {
                let d = res.data.users.records;
                el += "<tr>" +
                    "<td>" + d[i].nickName + "</td>" +
                    "<td>" + d[i].username + "</td>" +
                    "<td>";
                if (d[i].source == 0) {
                    el += "自主";
                } else if (d[i].source == 1) {
                    el += "代为";
                } else {
                    el += "导入";
                }
                el += "</td><td>";
                if (d[i].organId != undefined) {
                    el += "<a target='_blank' href='/store/" + d[i].organId + "'>跳转</a>";
                } else {
                    el += "未创建";
                }
                el += "</td><td>" + d[i].gmtCreate + "</td>";
                el += "<td><a class='news'>禁用</a> ";
                el += "</tr>";
            }
            this.element.innerHTML = el;
            new Common().initPage(res.data.users, res.data.rainbow, this);
        }
    }

}

class Organ {
    constructor() {
        this.modal = document.querySelector('.modal');
        let tf_auth = cookie.getCookie(CONST.tf_auth_info);
        if (tf_auth == "" || tf_auth.organId == "" || tf_auth.organId == "null") {
            this.check();
        }

        this.id = cookie.getCookie(CONST.tf_auth_info).organId || '';
        this.resume = document.querySelector('#resume');

        this.name = "";
        this.addressStr = "";
        this.industry = "";
        this.describes = "";
        this.pattern = "";
        this.logo = "";
        this.person = "";
        this.phone = "";
        this.telephone = "";
        this.email = "";
        this.qq = "";
        this.wechat = "";
        this.business = "";
        this.lng = "";
        this.lat = "";
        this.address = "";
        this.adCode = "";
        this.cityCode = "";
    }

    create() {
        let aMap = document.querySelector('.aMap');
        aMap.innerHTML = '当前位置：<h4 class="is-inline" id=\'address\'>努力定位中……</h4>\n' +
            '                        <input type="text" id="adcode" class="is-hidden">\n' +
            '                        <input type="text" id="citycode" class="is-hidden">\n' +
            '                        <input type="text" id="lng" class="is-hidden">\n' +
            '                        <input type="text" id="lat" class="is-hidden">\n' +
            '                        <div id="container" style="width: 100%;height: 20rem;">\n' +
            '                            <input id="tipinput" placeholder="请输入查询地点" class="input is-small map-search"\n' +
            '                                   style="display: none"/>\n' +
            '                        </div>';
    }

    _init() {
        this.create();

        this.name = document.querySelector("#name");
        this.addressStr = document.querySelector("#addressStr");
        this.industry = document.querySelector("#industry");
        this.describes = document.querySelector('#describes');
        this.pattern = document.querySelector('#pattern');
        this.logo = document.querySelector('#logo');
        this.person = document.querySelector('#person');
        this.phone = document.querySelector('#phone');
        this.telephone = document.querySelector('#telephone');
        this.email = document.querySelector('#email');
        this.qq = document.querySelector('#qq');
        this.wechat = document.querySelector('#wechat');
        this.business = document.querySelector('#business');
        this.lng = document.querySelector("#lng");
        this.lat = document.querySelector("#lat");
        this.address = document.querySelector('#address');
        this.adCode = document.querySelector('#adcode');
        this.cityCode = document.querySelector('#citycode');
        //下拉框
        this.industry.innerHTML = this.select();
        this.getDataInit();
        let element = document.querySelectorAll("[name='theme']");
        let tfId = storage.getItem("tf_id");
        let tf_organ = storage.getItem(tfId);
        if (tf_organ && tf_organ.vipLog.vipId == 1) {
            element.forEach(item => {
                item.setAttribute("disabled", "true");
            })
        }
        this.resume.addEventListener('change', () => {
            if (!limitImg(this.resume) && this.resume.files[0] != undefined) {
                uploadImg(this.resume.files[0], this.logo);
            }
        })
        let initMap = document.querySelector('.init_map');
        initMap.addEventListener('click', () => {
            this.initMap(initMap);
        })
    }

    initMap(e) {
        classie.add(e, 'is-hidden');
        let AMap_URL = 'https://webapi.amap.com/maps?v=2.0&key=dbb1de8ce7266d3e92741c93000dca59&plugin=AMap.Adaptor&callback=_AMap_init';
        let jsapi = document.createElement('script');
        jsapi.src = AMap_URL;
        document.head.appendChild(jsapi);
    }

    async getDataInit() {
        let res = await ask('/organ/findOrganById', {}, 'POST');
        res = JSON.parse(res);
        if (res.code == 1) {
            this.name.innerHTML = res.data.name;
            this.addressStr.innerHTML = res.data.address;
            this.industry.value = res.data.industry;
            this.describes.value = res.data.describes;
            this.pattern.value = res.data.pattern;
            this.business.value = res.data.business;
            this.person.value = res.data.person;
            this.phone.value = res.data.phone;
            this.telephone.value = res.data.telephone || "";
            this.email.value = res.data.email || "";
            this.logo.src = res.data.logo;
            this.qq.value = res.data.qq || "";
            this.wechat.value = res.data.wechat || "";
            this.lng.value = res.data.lng;
            this.lat.value = res.data.lat;
            this.address.innerHTML = res.data.address;
            this.adCode.value = res.data.adCode;
            this.cityCode.value = res.data.cityCode;
            let element = document.querySelector("input[value='" + res.data.theme + "']");
            if (element) element.setAttribute("checked", "checked");
        }
    }

    verify() {
        if (this.logo.src == "") {
            notify("请上传LOGO");
            return true;
        }
        if (this.industry.value == "") {
            notify("请选择所属行业");
            return true;
        }
        if (this.pattern.value == "") {
            notify("请选择经营模式");
            return true;
        }
        if (this.business.value == "") {
            notify("请输入主营业务");
            return true;
        }
        if (this.describes.value == "") {
            notify("请输入企业简介");
            return true;
        }
        if (this.person.value == "") {
            notify("请输入联系人");
            return true;
        }
        if (this.phone.value == "") {
            notify("请输入手机号");
            return true;
        }

        return false;
    }

    async submit() {
        this.name = document.querySelector("#name");
        this.addressStr = document.querySelector("#addressStr");
        this.industry = document.querySelector("#industry");
        this.describes = document.querySelector('#describes');
        this.pattern = document.querySelector('#pattern');
        this.logo = document.querySelector('#logo');
        this.person = document.querySelector('#person');
        this.phone = document.querySelector('#phone');
        this.telephone = document.querySelector('#telephone');
        this.email = document.querySelector('#email');
        this.qq = document.querySelector('#qq');
        this.wechat = document.querySelector('#wechat');
        this.business = document.querySelector('#business');
        this.lng = document.querySelector("#lng");
        this.lat = document.querySelector("#lat");
        this.address = document.querySelector('#address');
        this.adCode = document.querySelector('#adcode');
        this.cityCode = document.querySelector('#citycode');
        if (this.verify()) return;
        let theme = document.querySelector("[name='theme']:checked").value;
        let result = await ask('/organ/save', {
            "industry": this.industry.value,
            "describes": this.describes.value,
            "business": this.business.value,
            "pattern": this.pattern.value,
            "person": this.person.value,
            "phone": this.phone.value,
            "telephone": this.telephone.value,
            "email": this.email.value,
            "logo": this.logo.src.replace(/(http|https):/ig, ''),
            "qq": this.qq.value,
            "wechat": this.wechat.value,
            "lng": this.lng.value,
            "lat": this.lat.value,
            "address": this.address.innerHTML,
            "adCode": this.adCode.value,
            "cityCode": this.cityCode.value,
            "theme": theme
        }, 'POST');
        result = JSON.parse(result);
        if (result.code == 1) {
            storage.delItem(this.id)
            notify("保存成功", "success")
        } else {
            notify(result.msg);
        }
        return result;
    }

    select() {
        let industryStr = JSON.parse("[{\"id\":\"1\",\"name\":\"IT|通信|电子|互联网\"},{\"id\":\"2\",\"name\":\"金融|保险\"},{\"id\":\"3\",\"name\":\"房地产|建筑业|建材\"},{\"id\":\"4\",\"name\":\"贸易|批发|零售|租赁\"},{\"id\":\"5\",\"name\":\"文体教育|工艺美术\"},{\"id\":\"6\",\"name\":\"生产|加工|制造\"},{\"id\":\"7\",\"name\":\"交通|运输|物流|仓储\"},{\"id\":\"8\",\"name\":\"传媒|娱乐\"},{\"id\":\"9\",\"name\":\"能源|矿产|环保\"},{\"id\":\"10\",\"name\":\"政府|非盈利机构\"},{\"id\":\"11\",\"name\":\"农|林|牧|渔\"},{\"id\":\"12\",\"name\":\"科学研究|环境水利|公共管理\"}]");
        let sel = "";
        for (let i = 0; i < industryStr.length; i++) {
            sel += '<option value="' + industryStr[i].id + '">' + industryStr[i].name + '</option>';
        }
        return sel;
    }

    init() {
        this.create();
        //下拉框
        let industry = document.querySelector("#industryInit");
        industry.innerHTML = this.select();
        let submit = document.querySelector('.is-success');
        let close = document.querySelector('.is-close');
        close.addEventListener('click', () => {
            window.location.href = "/";
        })
        submit.addEventListener('click', async () => {
            let name = document.querySelector('#nameInit');
            let describes = document.querySelector('#describesInit');
            let business = document.querySelector('#businessInit');
            let lng = document.querySelector("#lng");
            let lat = document.querySelector("#lat");
            let address = document.querySelector('#address');
            let adcode = document.querySelector('#adcode');
            let citycode = document.querySelector('#citycode');
            let result = await ask('/organ/init', {
                "name": name.value,
                "industry": industry.value,
                "describes": describes.value,
                "business": business.value,
                "lng": lng.value,
                "lat": lat.value,
                "address": address.innerHTML,
                "adCode": adcode.value,
                "cityCode": citycode.value
            }, 'POST');
            result = JSON.parse(result);
            if (result.code == 1) {
                notify("创建成功", "success")
                classie.removeClass(modal, 'is-active')
            } else {
                notify(result.msg)
            }
        })
    }

    check() {
        this.init();
        classie.addClass(this.modal, 'is-active');
        let AMap_URL = 'https://webapi.amap.com/maps?v=2.0&key=dbb1de8ce7266d3e92741c93000dca59&plugin=AMap.Adaptor&callback=AMap_init';
        let jsapi = document.createElement('script');
        jsapi.src = AMap_URL;
        document.head.appendChild(jsapi);
    }
}

function AMap_init() {
    let geocoder, marker;
    let map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 15
    });
    let tipinput = document.querySelector("#tipinput");
    map.on('complete', function () {
        tipinput.style.display = "block";
    });
    //输入提示
    let autoOptions = {input: "tipinput"};
    AMap.plugin(['AMap.Geolocation', 'AMap.ToolBar', 'AMap.Scale',
        'AMap.AutoComplete', 'AMap.PlaceSearch', 'AMap.Geocoder'], function () {
        let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：5s
            buttonPosition: 'RB',    //定位按钮的停靠位置
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition(function (status, result) {
            if (status == 'complete') {
                document.getElementById('address').innerHTML = '定位成功……网络较慢请稍后……'
                getAddress(result.position.lng, result.position.lat);
            } else {
                document.getElementById('address').innerHTML = '定位失败……请开启定位权限或更换设备……';
            }
        });
        let toolBar = new AMap.ToolBar({
            visible: true,
            position: {
                top: '20px',
                left: '20px'
            }
        });
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        map.addControl(toolBar);
        // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
        map.addControl(new AMap.Scale());

        let auto = new AMap.AutoComplete(autoOptions);
        let placeSearch = new AMap.PlaceSearch({
            map: map
        });  //构造地点查询类
        auto.on('select', function (e) {
            placeSearch.setCity(e.poi.adcode);
            placeSearch.search(e.poi.name);  //关键字查询查询
        });
        geocoder = new AMap.Geocoder();
        placeSearch.on('markerClick', function (e) {
            if (marker) {
                map.remove(marker);
            }
            getAddress(e.data.location.lng, e.data.location.lat);
        })
    });
    map.on('click', function (ev) {
        let lnglat = ev.lnglat;
        addMarker(map, lnglat.lng, lnglat.lat);
    });
    // 创建 AMap.Icon 实例：
    var icon = new AMap.Icon({
        size: new AMap.Size(20, 25),    // 图标尺寸
        image: '//a.amap.com/jsapi/static/image/plugin/marker_red.png',  // Icon的图像
        // imageOffset: new AMap.Pixel(0, 0),  // 图像相对展示区域的偏移量，适于雪碧图等
        imageSize: new AMap.Size(20, 25)  // 根据所设置的大小拉伸或压缩图片
    });

    function addMarker(map, lng, lat) {
        if (marker) {
            map.remove(marker);
        }
        marker = new AMap.Marker({
            position: new AMap.LngLat(lng, lat),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            draggable: true,
            offset: new AMap.Pixel(-10, -20),
            icon: icon,
            cursor: 'move'
        });
        map.add(marker);
        getAddress(lng, lat);
    }

    function getAddress(lng, lat) {
        document.querySelector("#lng").value = lng;
        document.querySelector("#lat").value = lat;
        let lnglat = [lng, lat];
        geocoder.getAddress(lnglat, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
                document.getElementById('address').innerHTML = result.regeocode.formattedAddress;
                document.querySelector('#adcode').value = result.regeocode.addressComponent.adcode;
                document.querySelector('#citycode').value = result.regeocode.addressComponent.citycode;
            } else {
                document.getElementById('address').innerHTML = "定位失败，请手动选择";
            }
        })
    }
}

function _AMap_init() {
    let element1 = document.querySelector('.aMap');
    classie.removeClass(element1, 'is-hidden');
    AMap_init();
}

class Common {
    jump(that, index) {
        that.pageNo = index;
        that.method();
    }

    initPage(data, rainbow, that) {
        let pageNo = that.pageNo;
        let first = data.current <= 1;
        let last = pageNo > data.pages;
        let el = "";
        el += '<a class="pagination-previous">上一页</a>' +
            '<a class="pagination-next">下一页</a>' +
            '<ul class="pagination-list">';
        for (let i = 0; i < rainbow.length; i++) {
            el += '<li><a class="pagination-link ' + (pageNo == rainbow[i] ? "is-current" : "") + '">' + rainbow[i] + '</a></li>';
        }
        el += '</ul>';
        that.pagination.innerHTML = el;
        //上一页
        if (!first && (pageNo - 1 > 0)) {
            let element = document.querySelector('.pagination-previous');
            element.addEventListener('click', () => {
                this.jump(that, pageNo - 1)
            })
        }
        //下一页
        if (!last && (pageNo + 1 <= rainbow[rainbow.length - 1])) {
            let element = document.querySelector('.pagination-next');
            element.addEventListener('click', () => {
                this.jump(that, pageNo + 1)
            })
        }
        //页码跳转
        let elements = document.querySelectorAll('.pagination-link');
        elements.forEach(item => {
            item.addEventListener('click', () => {
                this.jump(that, item.innerHTML)
            })
        })
    }
}

class Editor {
    constructor(organId, className) {
        class ImageUploadAdapter {
            constructor(loader) {
                this.loader = loader;
            }

            upload() {
                return this.loader.file
                    .then(file => new Promise((resolve, reject) => {
                        this._initRequest();
                        this._initListeners(resolve, reject, file);
                        this._getUploadToken(file);
                    }));
            }

            abort() {
                if (this.xhr) {
                    this.xhr.abort();
                }
            }

            _initRequest() {
                const xhr = this.xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://upload-z2.qiniup.com/', true);
                xhr.responseType = 'json';
            }

            _initListeners(resolve, reject, file) {
                loading.show();
                const xhr = this.xhr;
                const loader = this.loader;
                const genericErrorText = `Couldn't upload file: ${file.name}.`;

                xhr.addEventListener('error', () => {
                    reject(genericErrorText);
                    loading.close();
                });
                xhr.addEventListener('abort', () => reject());
                xhr.addEventListener('load', () => {
                    const response = xhr.response;
                    if (!response || response.error) {
                        return reject(response && response.error ? response.error.message : genericErrorText);
                    }
                    resolve({
                        default: response.path
                    });
                });
                if (xhr.upload) {
                    xhr.upload.addEventListener('progress', evt => {
                        if (evt.lengthComputable) {
                            loader.uploadTotal = evt.total;
                            loader.uploaded = evt.loaded;
                        }
                    });
                }
            }

            async _getUploadToken(file) {
                let that = this;
                let result = await ask('/getUpToken');
                result = JSON.parse(result);
                if (result.code == 1) {
                    that._sendRequest(file, result.data)
                }
            }

            _sendRequest(file, token) {
                // Prepare the form data.
                const data = new FormData();
                data.append('file', file);
                data.append('token', token);
                this.xhr.send(data);
            }
        }

        function ImageUploadAdapterPlugin(editor) {
            editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
                return new ImageUploadAdapter(loader);
            };
        }

        ClassicEditor.create(document.querySelector('.' + className), {
            extraPlugins: [ImageUploadAdapterPlugin],
            toolbar: {
                items: [
                    'heading',
                    '|',
                    'fontColor',
                    'fontSize',
                    '|',
                    'bold',
                    'italic',
                    'link',
                    'bulletedList',
                    'numberedList',
                    'todoList',
                    '|',
                    // 'imageUpload',
                    'imageInsert',
                    'blockQuote',
                    'insertTable',
                    'mediaEmbed',
                    'undo',
                    'redo',
                    '|'
                ]
            },
            language: 'zh-cn',
            image: {
                toolbar: [
                    'imageTextAlternative',
                    'imageStyle:full',
                    'imageStyle:side',
                    'linkImage'
                ]
            },
            table: {
                contentToolbar: [
                    'tableColumn',
                    'tableRow',
                    'mergeTableCells',
                    'tableCellProperties',
                    'tableProperties'
                ]
            },
            licenseKey: ''
        })
            .then(editor => {
                window.editor = editor;
                this.wyc5188(this.wyc5188Init, organId);
                // typesetting();
            })
            .catch(error => {
                console.error('Oops, something went wrong!');
                console.error(error);
            });
    }

    typesetting() {
        let of = document.querySelectorAll('.ck-toolbar__separator');
        let btn = document.createElement('button');
        btn.className = "ck ck-button ck-disabled ck-off";
        btn.type = "button";
        btn.tabIndex = "-1";
        // btn.style = "";
        btn.innerHTML = "排版";
        of[of.length - 1].parentNode.insertBefore(btn, of[of.length - 1].nextSibling);
        btn.addEventListener('click', () => {
            let str = window.editor.getData();
            window.editor.setData(str);
        })
    }


    wyc5188(callback, organId) {
        if (organId != undefined && organId != "") {
            let URL5188 = "https://aiplugin.5118.com/static/OnlineJs/Inner_5118_Wyc.js"
            let scr = document.querySelector('script[src="' + URL5188 + '"]');
            if (scr) {
                callback();
            } else {
                loadScript(URL5188, () => this.wyc5188(callback, organId));
            }
        }
    }

    wyc5188Init() {
        let of = document.querySelectorAll('.ck-toolbar__separator');
        let btn = document.createElement('button');
        btn.className = "ck ck-button ck-disabled ck-off";
        btn.type = "button";
        btn.tabIndex = "-1";
        btn.style = "width:5.5rem";
        of[of.length - 1].parentNode.insertBefore(btn, of[of.length - 1].nextSibling);
        let editcontent = document.querySelector('.ck-content');
        let token = "449090EF85EEFACD4982B3628AAD1F975B6DAB5DFCFF79C736B30F77F16A06D808136B5419A56D2F";
        _5118_Add_Wyc_Loading(btn, '-2', '-3', editcontent, 'html', token, '', '&hb=0&ab=0&sih=1');
        let _5118_messenger = new Messenger('parent', 'MessengerProject');
        _5118_messenger.listen("_5118_Wyc_Get_NewMessage", (getmsg) => {
            let getContent = String(getmsg.txt);
            editor.setData(getContent);
        });
    }
}