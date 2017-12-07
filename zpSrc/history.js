$(function(){
  historyPage.init({
    styleBaseUrl: './zpSrc/',
    btnCss: {
      left: 'auto',
      right: '.1rem',
      top: '.2rem',
      padding: '.05rem .1rem',
    },
    localName: 'adsHistory'
  });
})

var utils = (function(){
  var getCss = function(href,callback){
    if ($("link[href='"+href+"']").length > 0) {
      callback();
      return;
    }
    var c = document.createElement("link");
    c.setAttribute("rel", "stylesheet");
    c.setAttribute("type", "text/css");
    c.setAttribute("href", href);
    document.getElementsByTagName("head")[0].appendChild(c);
    if (callback&&typeof callback == 'function'){
      callback();
    }
  }

  return {
    getCss: getCss
  }
})()


var historyPage = (function($){
  var opt = function(opt){
    return Object.assign({

    },opt)
  }

  var createBtn = function(conf){
    //充值
    $('.chongzhi').on('click',function(){
      $('#hd_ad_history_page').slideDown(100);
      if(isAndroid) {
        $('.vcp-player').css('height', '100px');
        $('.vcp-player').find('video').css('height', '100%');
      }
    });
  //  设置
    $('.shezhi').on('click',function () {
      $('#hd_ad_history_page_shezhi').slideDown(100);
      if(isAndroid) {
        $('.vcp-player').css('height', '100px');
        $('.vcp-player').find('video').css('height', '100%');
      }
    });
  //  商品信息
    $('.productInformation').on('click',function () {
      $('#hd_ad_history_page_productInformation').slideDown(100);
      if(isAndroid) {
        $('.vcp-player').css('height', '100px');
        $('.vcp-player').find('video').css('height', '100%');
      }
    })
  }

  var getData = function(conf){
    var ads = window.localStorage.getItem(conf.localName);
    var data = !!ads? $.parseJSON(ads):[];
    renderData(data);
  }

  var renderData = function(data){
    //充值
    $('#hd_ad_history_page .hd_ad_back').on('click',function(){
      $('#hd_ad_history_page').slideUp(100);
      if(isAndroid) {
        $('.vcp-player').css('height', '400px');
        $('.vcp-player').find('video').css('height', '100%');
      }
    });

    //换一批
    $('#hd_ad_history_page_change .hd_ad_back .close').on('click',function(){
      $('#hd_ad_history_page_change').slideUp(100);
      if(isAndroid) {
        $('.vcp-player').css('height', '400px');
        $('.vcp-player').find('video').css('height', '100%');
      }
    });
  //  设置(先按固定处理)
    $('#hd_ad_history_page_shezhi .hd_ad_back').on('click',function(){
      $('#hd_ad_history_page_shezhi').slideUp(100);
      if(isAndroid) {
        $('.vcp-player').css('height', '400px');
        $('.vcp-player').find('video').css('height', '100%');
      }
    });
  //  我的奖品
    $('#hd_ad_history_page_myPrize .hd_ad_back .close').on('click',function(){
      $('#hd_ad_history_page_myPrize').slideUp();
      if(isAndroid) {
        $('.vcp-player').css('height', '400px');
        $('.vcp-player').find('video').css('height', '100%');
      }
    });

  //  抓取记录
    $('#hd_ad_history_page_getRecord .hd_ad_back').on('click',function(){
      $('#hd_ad_history_page_getRecord').slideUp(100);
      if(isAndroid) {
        $('.vcp-player').css('height', '400px');
        $('.vcp-player').find('video').css('height', '100%');
      }
    });
    //  商品信息(最近抓中的记录)
    $('#hd_ad_history_page_productInformation .hd_ad_back').on('click',function(){
      $('#hd_ad_history_page_productInformation').slideUp(100);
      if(isAndroid) {
        $('.vcp-player').css('height', '400px');
        $('.vcp-player').find('video').css('height', '100%');
      }
    });
  }

  var init = function(options){
    var config = opt(options);
    utils.getCss(config.styleBaseUrl+'history.css');

    createBtn(config);
    getData(config);
  }
  return {
    init: init
  }
})(jQuery || Zepto)
