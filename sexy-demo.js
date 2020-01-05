// https://bpweb.bikimex.com/player/query/queryBalanceV3
function addScript(src, async) {
    return new Promise((resolve) => {
        var s = document.createElement('script');
        s.setAttribute('src', src);
        if (async) s.setAttribute('async', '');
        s.setAttribute('type', 'text/javascript');
        s.onload = resolve;
        document.body.appendChild(s);
    });
}
/*
var s = document.createElement('script');
s.setAttribute('src', 'http://139.99.80.47:8003/global/sexy-demo.js');
document.body.appendChild(s);
 */


(async () => {
    let $ = $j;
    let demoSite =  'http://139.99.80.47:8003';

    if (!PageConfig.userID) return alert('No Username');
    PageConfig.playerIndexPage = '#';
    let username = PageConfig.userID;

    let loginRes = await $.ajax({
        url: demoSite + '/api/sexy-demo/login',
        xhrFields: {
            withCredentials: false
        },
        method: 'POST',
        data: {username}
    });
    console.log('loginRes', loginRes);

    jQuery(document).ajaxSend((e, xhr, setting) => {
        switch (setting.url) {
            case '/player/query/queryBalanceV2':
                xhr.setRequestHeader('withCredentials', 'true');
                setting.url = demoSite+'/api/sexy-demo/balanceV2';
                //setting.data = 'dm=10';
                setting.data += '&username='+username;

                //console.log('wwww', setting);
                break;
            case '/player/query/queryBalanceV3':
                setting.url = demoSite+'/api/sexy-demo/balanceV3';
                setting.data += '&username='+username;

                //console.log('wwww2', setting);
                break;
            case '/player/update/addMyTransaction':
                setting.url = demoSite+'/api/sexy-demo/addMyTransaction';
                setting.data += '&username='+username;
                break;
            case '/player/query/queryTransactions':
                setting.url = demoSite+'/api/sexy-demo/queryTransactions';
            case '/player/query/queryAllTransactions':
                break;
        }

    });

    var oldFade = $.fn.fadeIn;
    $.fn.fadeIn = function() {
        if ($(this).attr('id') === 'gameInfoWin') gameInfoWin($(this).find('p').html());
        // call the original toggle
        oldFade.apply(this, arguments);
        return this;
    };

    function gameInfoWin(balance) {
        console.log('win', balance);
        $.ajax({
            url: demoSite + '/api/sexy-demo/addBalance',
            xhrFields: {
                withCredentials: false
            },
            method: 'POST',
            data: {username, balance}
        });
    }

    jQuery(document).ajaxSuccess(function (event, request, settings) {
        // Handle not login
        // console.log('call',request);
        request.then(function (res) {
            //console.log('ajax req', res);
        });
    });
    jQuery(document).ajaxError(function (event, xhr, setting) {
        // if (xhr.status === 404) return modal.error('ไม่สามารถเชื่อมต่อปลายทางได้', '404');
        // if (xhr.status === 0) return modal.error('กรุณาเชื่อมต่ออินเตอร์เน็ตเพื่อใช้งาน', 'ไม่สามารถเชื่อมต่อเซิฟเวอร์').then(()=>location.replace(sys.home_hash));
        console.log('ajax err', xhr);

    });
})();

/*
jQuery(document).ajaxSend((e, xhr, setting)=>{

if (setting.url == '/player/query/queryBalanceV2') {
//xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
//xhr.setRequestHeader('withCredentials', 'true');
setting.url = 'http://139.99.80.47:8003/api/sexy-demo/balanceV2';
//setting.data = 'dm=10';
console.log('wwww', setting);
}
if (setting.url == '/player/query/queryBalanceV3') {
//xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
//xhr.setRequestHeader('withCredentials', 'true');
setting.url = 'http://139.99.80.47:8003/api/sexy-demo/balanceV3';
//setting.data = 'dm=10';
console.log('wwww2', setting);
}

});

 */