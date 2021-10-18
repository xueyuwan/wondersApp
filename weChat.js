(function (window) {
  function WeChats() {}
  WeChats.prototype.initUrlStorage = function () {
    //微信小程序里需要取url中的参数，再存储

    let weiXinDATA = this.getQueryVariable('weiXinDATA');
    let wxData = null;
    if (weiXinDATA) {
      weiXinDATA = decodeURIComponent(weiXinDATA);
      if (typeof weiXinDATA === 'string') {
        weiXinDATA = JSON.parse(weiXinDATA);
      }
      if (weiXinDATA && weiXinDATA.length) {
        weiXinDATA.forEach((element) => {
          wxData = {
            key: element['key'],
            value: element['value'],
            method: element['method'] ? element['method'] : 'set',
          };
          this.setNativeStorage(wxData);
        });
      }
    }
  };
  WeChats.prototype.setNativeStorage = function (data) {
    let key = data.key;
    if (data.method == 'set') {
      localStorage[key] = data.value;
    } else if (data.method == 'delete') {
      localStorage.removeItem(key);
    }
  };
  WeChats.prototype.getQueryVariable = function (variable) {
    var query = window.location.href.split('?');
    var vars = query[1] && query[1].split('&');
    if (vars && vars.length) {
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (pair[0] == variable) {
          return pair[1];
        }
      }
    }

    return false;
  };

  var WeChat = new WeChats();
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = WeChat;
  } else {
    window.WeChat = WeChat;
  }
})(window);
