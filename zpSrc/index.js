// /**
//  * Created by Administrator on 2017/11/1.
//  */
// 接口数据加密解密
function encryptByDES(message) {
  var key = "V29n8rqY38b7HMXBcYfu09K0";
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

function decryptByDES(ciphertext) {
  var key = "V29n8rqY38b7HMXBcYfu09K0";
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
//      ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
  }, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}
//获取配置信息（充值的金币活动等）
var json = {"customerId": ''};
var str = encryptByDES(JSON.stringify(json));
    $.post('http://wawatest.daniuyx.com/wawa/api/getConfigData',{json: str},function (res) {
    var list = JSON.parse(decryptByDES(res));
    console.log('配置信息',list);
    window.localStorage.setItem('config',JSON.stringify(list));
  });
//获取用户金币
$(document).ready(function () {
  var loginParams = window.location.href.split('?')[0];
  //传下载路径
  var getUrlParam = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
  };
  var loginJson = getUrlParam('s') || loginParams;
  var loginDetail = JSON.parse(decryptByDES(loginJson));
  window.localStorage.setItem('token',JSON.stringify(loginDetail));
  $('.balance').text(loginDetail.curCoin);
  $('.nickName').text(loginDetail.nickName);
});
//充值
$('.chongzhi').click(function () {
  $('#hd_ad_history_page_shezhi').slideUp(100);
  var config = JSON.parse(window.localStorage.getItem('config'));
  $.each(config.rechargeCoinList,function (i,obj) {
    $('<div class="moneyList pad-l-half pad-r-half w-percent-100">'+
      '<div class="hd_ad_list w-percent-100 h-4">'+
      '<div style="background-color: #ffffff;" class="h-3 w-percent-100">'+
      '<div class="dis-inline pad-l-1 h-3 v-align-t" style="width:12%;line-height: 2.6rem;">'+
      '<img src="zpSrc/img/icon_coin.png" class="h-1"></div>'+
      '<span class="dis-inline w-percent-50">'+
      '<span class="dis-inline pad-l-1 font-22 h-1-half line-h-2 v-align-t" style="color: #000;width: 70%;">'+obj.goodsTitle+'</span>'+
    '<span class="dis-inline pad-l-1 font-20 w-percent-100 h-1-half line-h-1 v-align-t" style="color: #999;">'+obj.goodsMessage+'</span>'+
     '</span>'+
      '<div class="dis-inline w-percent-30 h-3 v-align-t line-h-3">'+
      '<button class="btnMoney" onclick="" data-id='+obj.goodsId+'>￥'+obj.price+'</button>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>').appendTo('#moneyChongZhi');
  });
});
//设置
$('.closeMusic').click(function () {
  // $('#id_test_video').css('height','1px');
  $(this).toggleClass('btn-music-pressed');
  if($(this).hasClass('btn-music-pressed')){
    document.getElementById('music').pause();
    $(this).text('打开音乐');
  } else{
    document.getElementById('music').play();
    $(this).text('关闭音乐');
  }
});
$('.pleaseHelp').click(function () {
  // $(this).toggleClass('btn-help-pressed');
  window.location.href = 'http://m.doumob.com/wawadoc/help';
});
//我的奖品
$('.myPrize').on('click',function () {
  $('#hd_ad_history_page_shezhi').slideUp(100);
  $('#hd_ad_history_page_myPrize').slideDown(100);
  var token = JSON.parse(window.localStorage.getItem('token'));
  var json = {"customerId":token.customerId,"currentPage":1};
  var str = encryptByDES(JSON.stringify(json));
  $.post('http://wawatest.daniuyx.com/wawa/api/getPrizeExtractList',{json: str},function (res) {
      $('.myRecord').remove();
      var list = JSON.parse(decryptByDES(res));
      var dataMyPrize = list.data;
      if(dataMyPrize.length === 0){$('.myPrize_list').addClass('list_none')}else{$('.myPrize_list').removeClass('list_none')}
      for(var i=0,flag = 0;i<dataMyPrize.length;i++) {
        if (dataMyPrize[i].extractStatus === '未提取' || dataMyPrize[i].extractStatus === 0) {
          flag+=1;
        }
      }
      //去提取
      $('#toGetww').click(function (e) {
      e.preventDefault();
      if(flag === 0){alert('您还没有奖品哦~快去抓吧')}
      else{window.location.href = './getPrize.html'}
    });
      $.each(dataMyPrize,function (i,obj) {
        obj.extractStatus === 0?obj.extractStatus = '未提取':obj.extractStatus = '已提取';
        $('<div class="myRecord dis-inline pad-l-1" style="width:48%;margin-top: 0.5rem;">'+
          '<div class="dis-inline" style="position:relative;text-align:center;vertical-align: top;line-height: 7rem;width:98%;height: 7rem;border:2px solid #E1E1E1;">'+
          '<div style="width:1rem;height:1rem;line-height: 4rem;vertical-align: top;"><span class="font-14" style="position: absolute;bottom:4.2rem;left:0.25rem;color: #ff9292">'+obj.extractStatus+'</span></div>'+
          '<div style="width:6rem;height:4rem;line-height: 4rem;vertical-align: top;"><img src="'+obj.img+'" alt="" style="width:5rem;height:4rem;"></div>'+
          '<div style="width:6.5rem;height:1rem;line-height: 1rem;vertical-align: top;text-align: right;padding-right: 1rem;"><a href="'+obj.videoUrl+'"><img src="zpSrc/img/mov.png" alt="" style="width:1rem;height: 1rem;"></a></div>'+
          '</div>'+
          '<div class="pad-l-half">'+
          '<div class="t-ellipsis"><span class="font-20 font-wei dis-inline" style="color: #000;">'+obj.goodsName+'</span></div>'+
          '<div><span class="font-20 dis-inline" style="color: #666;width: 108%;">'+obj.createDate+'</span></div>'+
          '</div>'+
          '</div>').appendTo($('.myPrize_list'));
      });
    });
});
//提取
$('.getwawa').on('click',function () {
  var allPrize = JSON.parse(window.localStorage.getItem('allCanCatch'));
  //提取的奖品（存起来）
  var catchPrize = [];var prizeIdsArr = [];
  for (var i = 0; i < allPrize.length; i++) {
    if ($($('#canGetList .circle')[i]).hasClass('img2')){
      catchPrize.push(allPrize[i]);
    }
  }
  window.localStorage.setItem('haveCatch',JSON.stringify(catchPrize));//先存起来
  for(var i=0;i<catchPrize.length;i++){
    prizeIdsArr.push(catchPrize[i].prizeId);
  }
  var json = {"prizeIds":prizeIdsArr};
  var str = encryptByDES(JSON.stringify(json));
  $.post('http://wawatest.daniuyx.com/wawa/api/getPrizeOrderPrice',{json: str},function (res) {
      var list = JSON.parse(decryptByDES(res));
      console.log(list);//提取后返回金额
      if(list.state === 'ok'){
        window.location.href = './confirmFirst.html';
      }
    })
});
//抓取记录
$('.getRecord').on('click',function () {
  $('#hd_ad_history_page_shezhi').slideUp(100);
  $('#hd_ad_history_page_getRecord').slideDown(100);
  var token = JSON.parse(window.localStorage.getItem('token'));
  var json = {"customerId":token.customerId,"currentPage":1};
  var str = encryptByDES(JSON.stringify(json));
  $.post('http://wawatest.daniuyx.com/wawa/api/getGrabRecordList',{json: str},function (res) {
      $('.hd_ad_list').remove();
      var list = JSON.parse(decryptByDES(res));
      console.log(list);//抓取记录列表
      var dataCatch = list.data;
    if(dataCatch.length === 0){$('.catch_list').addClass('list_none')}else{$('.catch_list').removeClass('list_none')}
      window.localStorage.setItem('allRecord',JSON.stringify(dataCatch));
      $.each(dataCatch,function (i,obj) {
        $('<div class="hd_ad_list w-percent-100 h-3">'+
          '<div class="theRecord" style="background-color: #ffffff;height:3rem;width:100%;">' +
          '<div class="dis-inline" style="text-align:left;width:15%;height: 3rem;vertical-align: middle;line-height: 3rem;"><img src="'+obj.img+'" alt="" style="height:2rem;"></div>' +
          '<span class="dis-inline pad-l-half" style="width:60%;line-height: 2rem;height:3rem;vertical-align: top;text-align: left">' +
          '<span class="dis-inline font-21 font-wei t-ellipsis" style="height: 1.5rem;line-height: 2.2rem;vertical-align: top;color:#666;">'+obj.goodsName+'</span>' +'<br>'+'<span class="dis-inline" style="color: #999;height: 1.5rem;line-height: 0.8rem;vertical-align: top;font-size: 0.6rem;">'+obj.createDate+'</span>'+'' +
          '</span>'+
          '<div class="dis-inline" style="width:25%">' +
          '<div style="text-align: left;height: 3rem;vertical-align: middle;line-height: 2.6rem;" class="dis-inline"><span style="color: #999;font-size: 0.6rem;">抓取娃娃失败</span></div>'+
          '</div>' +
          '</div>').appendTo($('.catch_list'));
      });
      //查看某一条记录（去申诉页面）
      $('.theRecord').on('click',function () {
        var index = $('.catch_list .theRecord').index(this);
        var records = JSON.parse(window.localStorage.getItem('allRecord'));
        console.log(records[index]);
        window.localStorage.setItem('oneRecord',JSON.stringify(records[index]));
        window.location.href = './gameDetail.html';
      });
    });
});
//各种类型的弹窗
$('.close-popup-btn').click(function () {
  $('#nojbPopup').slideUp(100);
  $('#failPopup').slideUp(100);
  $('#successPopup').slideUp(100);
});