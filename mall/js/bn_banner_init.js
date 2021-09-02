let modal_banner = document.querySelector('.modal_banner');
let submitBannerBtn = document.querySelector('.submit_banner');
let banner_close = document.querySelector('.is_banner_close');
let banner_resume = document.querySelector('#banner-resume');
let startTime = document.querySelector('#startTime');
let endTime = document.querySelector('#endTime');
let link = document.querySelector('#link');
let sort = document.querySelector('#sort');
let alt = document.querySelector('#alt');
let img = document.querySelector('#img');

function dataInitBanner(id, func) {
    if (id) {
        getBannerById(id);
    }
    banner_resume.addEventListener('change', function () {
        uploadImg(this.files[0], img);
    })
    banner_close.addEventListener('click', function () {
        classie.removeClass(modal_banner, 'is-active');
    });
    submitBannerBtn.addEventListener('click', function () {
        submitBanner(id, func);
    });
    classie.addClass(modal_banner, 'is-active');
}

async function getBannerById(id) {
    let res = await ask('/ad/findById', {id}, 'POST');
    res = JSON.parse(res);
    if (res.code == 1) {
        link.value = res.data.link || '';
        sort.value = res.data.sort;
        alt.value = res.data.alt || '';
        img.src = res.data.imgUrl;
        startTime.value = res.data.startTime.substring(0, 10);
        endTime.value = res.data.endTime.substring(0, 10);
    }
}

async function submitBanner(id, func) {
    if (verify()) return;
    let result = await ask('/ad/save', {
        "id": id || '',
        "link": link.value.trim(),
        "sort": sort.value,
        "alt": alt.value.trim(),
        "imgUrl": img.src.replace(/(http|https):/ig, ''),
        "startTime": startTime.value + " 00:00:00",
        "endTime": endTime.value + " 00:00:00",
        "type": 2
    }, 'POST');
    result = JSON.parse(result);
    if (result.code == 1) {
        notify("保存成功");
        classie.removeClass(modal_banner, 'is-active');
        link.value = "";
        sort.value = "";
        alt.value = "";
        img.src = "";
        startTime.value = "";
        endTime.value = "";
        func();
    }
}

function verify() {
    if (img.src == "") {
        notify("图片不能为空");
        return true;
    }
    if (startTime.value == "") {
        notify("开始时间不能为空");
        return true;
    }
    if (endTime.value == "") {
        notify("结束时间不能为空");
        return true;
    }
    return false;
}