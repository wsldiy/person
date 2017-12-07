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
    });
//   // //  换一台
//     $('.change').on('click',function () {
//       $('#hd_ad_history_page_change').slideDown(100);
//       var json = {};
//       json.currentPage = 1;
//       var str = encryptByDES(JSON.stringify(json));
//       $.post('http://wawatest.daniuyx.com/wawa/api/wawajiList', {json: str}, function (res) {
//           $('.myRecord').remove();
//           var list = JSON.parse(decryptByDES(res));
//           console.log(list);//娃娃列表
//           var dataChange = list.data;
//           $.each(dataChange, function (i, obj) {
//             obj.state === 1 ? obj.state = '空闲' : obj.state = '游戏中';
//             $('<div class="myRecord dis-inline w-percent-48" style="background-color: #fff;margin-left: 0.25rem;">' +
//               '<div class="dis-inline position-r t-align-c v-align-t line-h-7 w-percent-100 h-9 imgStart">' +
//               '<div class="pad-l-half pad-t-half pad-r-half w-8 h-6-half line-h-4 v-align-t"><img src="' + obj.goodsImg + '" class="w-7 h-6"></div>' +
//               '<div class="font-14 w-6 h-1 line-h-1 v-align-t" style="width:100%;"><span class="font-21">' + obj.goodsName + '</span></div>' +
//               '<div class="h-1 line-h-1 v-align-t t-align-l pad-l-1"><span class="font-14 dis-inline w-3 h-1 line-h-1 v-align-t" style="color: #FEA194">' + obj.sellCoin + '/次</span><span class="font-14 dis-inline w-3 h-1 line-h-1 v-align-t t-align-r"><span class="dis-inline gameStatusNo" style="margin-top: 0.25rem;margin-right:0.2rem;"></span><span class="font-14">' + obj.state + '</span></span></div>' +
//               '</div>' +
//               '</div>').appendTo($('.change_list'))
//           });
// //            选择开始
//           $('.imgStart').on('click', function () {
//             $('.vcp-player').remove();
//             var token = JSON.parse(window.localStorage.getItem('token'));
//             window.localStorage.setItem('isChoose', JSON.stringify(222));
//             socket.close();
//             $('#hd_ad_history_page_change').slideUp(100);
//             var wawaIndex = $($(this).parent()).index();
//             var allWawa = JSON.parse(window.localStorage.getItem('wawajiList'));
//             $('.sellCoin').text(allWawa[wawaIndex].sellCoin);
//             $('#Detail img').attr('src', allWawa[wawaIndex].lenImg);
// //                var canvas = document.getElementById('video-canvas');
// //                var url = 'ws://192.168.31.157:8082/';
// //                var player = new JSMpeg.Player(url, {canvas: canvas});
//             var ChoosePlayerUrl = allWawa[wawaIndex].lvbList[0].playHlsUrl;
//             var player = new TcPlayer('id_test_video', {
//               "m3u8": ChoosePlayerUrl, //请替换成实际可用的播放地址
//               "autoplay" : true,      //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
// //    "coverpic" : "http://www.test.com/myimage.jpg",
//               "controls":"none",
//               "width" :  '480',//视频的显示宽度，请尽量使用视频分辨率宽度
//               "height" : '400'//视频的显示高度，请尽量使用视频分辨率高度
//             });
//             //        切换视角
//             $('#camera').click(function () {
//               if (ChoosePlayerUrl === allWawa[wawaIndex].lvbList[0].playHlsUrl) {
//                 $('.vcp-player').remove();
//                 ChoosePlayerUrl = allWawa[wawaIndex].lvbList[1].playHlsUrl;
//                 var player = new TcPlayer('id_test_video', {
//                   "m3u8":ChoosePlayerUrl, //请替换成实际可用的播放地址
//                   "autoplay" : true,      //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
// //    "coverpic" : "http://www.test.com/myimage.jpg",
//                   "systemFullscreen":true,
//                   "flash":true,
//                   "showLoading":true,
//                   "controls":"none",
//                   "width" :  '480',//视频的显示宽度，请尽量使用视频分辨率宽度
//                   "height" : '400'//视频的显示高度，请尽量使用视频分辨率高度
//                 });
//               }else if (ChoosePlayerUrl === allWawa[wawaIndex].lvbList[1].playHlsUrl) {
//                 ChoosePlayerUrl = allWawa[wawaIndex].lvbList[0].playHlsUrl;
//                 $('.vcp-player').remove();
//                 var player = new TcPlayer('id_test_video', {
//                   "m3u8":ChoosePlayerUrl, //请替换成实际可用的播放地址
//                   "autoplay" : true,      //iOS下safari浏览器，以及大部分移动端浏览器是不开放视频自动播放这个能力的
// //    "coverpic" : "http://www.test.com/myimage.jpg",
//                   "systemFullscreen":true,
//                   "flash":true,
//                   "showLoading":true,
//                   "controls":"none",
//                   "width" :  '480',//视频的显示宽度，请尽量使用视频分辨率宽度
//                   "height" : '400'//视频的显示高度，请尽量使用视频分辨率高度
//                 });
//               }
//             });
//             socket = io.connect('http://115.29.225.91:9092?customerId=' + token.customerId + '&' + 'wawajiId=' + allWawa[wawaIndex].wawajiId + '&' + 'mac=' + allWawa[wawaIndex].mac);
// //      娃娃机状态
//             socket.on('wawaji_state', function (data) {
//               console.log('娃娃机状态', data);
//             });
// //      娃娃机房间人数
//             socket.on('wawaji_customer', function (data) {
//               console.log('房间人数', data);
//             });
// //      当前游戏用户
//             socket.on('game_customer', function (data) {
//               console.log('当前游戏的用户', data);
//             });
// //      弹幕
//             socket.on('danmu', function (data) {
//               console.log('弹幕', data);
//             });
//             //娃娃详情
//             $('.productInformation').on('click', function () {
//               var json = {"goodsId": allWawa[wawaIndex].goodsId, "wawajiId": allWawa[wawaIndex].wawajiId};
//               var str = encryptByDES(JSON.stringify(json));
//               $.post('http://wawatest.daniuyx.com/wawa/api/getSucGrabRecord', {json: str}, function (res) {
//                   var list = JSON.parse(decryptByDES(res));
//                   console.log('当前直播间详情', list);//娃娃详情列表
//                   var dataProduct = list.data;
//                   $.each(dataProduct, function (i, obj) {
//                     $('<div class="hd_ad_list" style="width:100%;height:4rem;line-height: 4rem;vertical-align: top">' +
//                       '<div style="background-color: #ffffff;height:4rem;width:100%;">' +
//                       '<div class="dis-inline pad-l-1" style="height: 3rem;vertical-align: middle;line-height: 2.6rem;width:20%;"><img src="' + obj.headUrl + '" alt="" style="height:2.5rem;"></div>' +
//                       '<span class="dis-inline pad-l-half" style="margin-left:0.5rem;width:45%;line-height: 2rem;height:3rem;vertical-align: top;text-align: left">' +
//                       '<span class="dis-inline font-21 font-wei" style="height: 1.5rem;line-height: 3rem;vertical-align: top;color:#666;">' + obj.nickName + '</span>' + '<br>' + '<span class="dis-inline" style="color: #999;height: 1.5rem;line-height: 1.2rem;vertical-align: top;font-size: 0.6rem;">' + obj.createDate + '</span>' + '' +
//                       '</span>' +
//                       '<div class="dis-inline" style="text-align: right;width:25%">' +
//                       '<div style="text-align: right;height: 3rem;vertical-align: middle;line-height: 2.6rem;" class="dis-inline pad-l-1"><a href="' + obj.videoUrl + '"><img src="zpSrc/img/mov.png" alt="" style="height:1.4rem;"></a></div>' +
//                       '</div>' + '</div>').appendTo($('#latest'));
//                   });
//                 }
//               );
//             });
//             //点击开始游戏
//             $('#toStartGame').on('click', function () {
//               var token = JSON.parse(window.localStorage.getItem('token'));
//               if (JSON.parse(window.localStorage.getItem('isChoose')) === 222) {
//                 window.localStorage.removeItem('isChoose');
//                 var json = {
//                   "customerId": token.customerId,
//                   "mac": allWawa[wawaIndex].mac,
//                   "wawajiId": allWawa[wawaIndex].wawajiId
//                 };
//                 var str = encryptByDES(JSON.stringify(json));
//                 $.post('http://wawatest.daniuyx.com/wawa/api/startGame', {json: str}, function (res) {
//                     var list = JSON.parse(decryptByDES(res));
//                     console.log('开始后的信息', list);
//                     if (list.state === 'ok') {
//                       history.pushState({}, '', '?222');
//                       $('#main').addClass('dis-none');
//                       $('#operate').removeClass('dis-none');
//                       $('#glass').addClass('dis-none');
//                       $('#count').removeClass('dis-none');
//                       var num = parseInt($('#count').find('.countNum').text());
//                       function countDown() {
//                         num--;
//                         $('#count').find('.countNum').text(num);
//                         if (num == 0) {
//                           $('#count').addClass('dis-none');
//                           socket.emit('move', 5);
//                           socket.on('game_state', function (data) {
//                             console.log('游戏结果', data);
//                             if (data === 0) {
//                               alert('等待游戏结果')
//                             }
//                             if (data === 1) {
//                               $('#successPopup').slideDown(100);
//                               countSuccess();
//                             }
//                             if (data === 2) {
//                               $('#failPopup').slideDown(100);
//                               countFail();
//                             }
//                           })
//                         }
//                         setTimeout(countDown, 1000);
//                       }
//                       countDown();
//                       <!--按钮组-->
//                       $('.upBtn').on('click', function () {
//                         socket.emit('move', 3);
//                         $(this).removeClass('upNor').addClass('upPressed');
//                         setTimeout(function () {
//                           $('.upBtn').removeClass('upPressed').addClass('upNor');
//                         }, 200);
//                       });
//                       $('.leftBtn').on('click', function () {
//                         socket.emit('move', 1);
//                         $(this).removeClass('leftNor').addClass('leftPressed');
//                         setTimeout(function () {
//                           $('.leftBtn').removeClass('leftPressed').addClass('leftNor');
//                         }, 200);
//                       });
//                       $('.rightBtn').on('click', function () {
//                         socket.emit('move', 2);
//                         $(this).removeClass('rightNor').addClass('rightPressed');
//                         setTimeout(function () {
//                           $('.rightBtn').removeClass('rightPressed').addClass('rightNor');
//                         }, 200);
//                       });
//                       $('.downBtn').on('click', function () {
//                         socket.emit('move', 4);
//                         $(this).removeClass('downNor').addClass('downPressed');
//                         setTimeout(function () {
//                           $('.downBtn').removeClass('downPressed').addClass('downNor');
//                         }, 200);
//                       });
//                       $('.confirmBtn').on('click', function () {
//                         socket.emit('move', 5);
//                         $(this).removeClass('startNor').addClass('startPressed');
//                         socket.on('game_state', function (data) {
//                           console.log('游戏结果', data);
//                           if (data === 0) {
//                             alert('等待游戏结果')
//                           }
//                           if (data === 1) {
//                             $('#successPopup').slideDown(100);
//                             countSuccess();
//                           }
//                           if (data == 2) {
//                             $('#failPopup').slideDown(100);
//                             countFail();
//                           }
//                         });
//                       });
//                     } else {
//                       alert(list.msg);
//                     }
//                     if (list.msg === '金币不足') {
//                       $('#nojbPopup').slideDown(100);
//                       countNoJb();
//                     }
//                   }
//                 )
//               }
//             });
//           });
//         }
//       );
//     });
  //  设置
    $('.shezhi').on('click',function () {
      $('#hd_ad_history_page_shezhi').slideDown(100);
    });
   // 我的奖品
    // $('.myPrize').on('click',function () {
    //   $('#hd_ad_history_page_myPrize').slideDown(100);
    // })
  //  抓取记录
  //   $('.getRecord').on('click',function () {
  //     $('#hd_ad_history_page_getRecord').slideDown(100);
  //   })
  //  商品信息
    $('.productInformation').on('click',function () {
      $('#hd_ad_history_page_productInformation').slideDown(100);
    })
  }

  var getData = function(conf){
    var ads = window.localStorage.getItem(conf.localName);
    var data = !!ads? $.parseJSON(ads):[];
    renderData(data);
  }

  var renderData = function(data){
    //充值(先按固定处理)
    // var dataMoney = [
    //   {'b_icon':'zpSrc/img/close.png','money':'60金币','btnMoney':'￥6.00'},
    //   {'b_icon':'zpSrc/img/close.png','money':'200金币','btnMoney':'￥20.00'},
    //   {'b_icon':'zpSrc/img/close.png','money':'500金币','btnMoney':'￥50.00'},
    //   {'b_icon':'zpSrc/img/close.png','money':'1000金币','btnMoney':'￥100.00'},
    //   {'b_icon':'zpSrc/img/close.png','money':'5000金币','btnMoney':'￥500.00'}
    // ];
    // $.each(dataMoney,function (i,n) {
      // $('<div class="hd_ad_list" style="width:100%;height:4rem;">'+
      //   '<div style="background-color: #ffffff;height:3rem;width:100%;">' +
      //   '<div class="dis-inline pad-l-1" style="height: 3rem;vertical-align: middle;line-height: 2.6rem;"><img src="zpSrc/img/icon_coin.png" alt="" style="height:1rem;"></div>' +
      //   '<span class="dis-inline pad-l-1 font-22" style="color: #000;width:30%;">'+n.money+'</span>' +'<span></span>'+
      //   '<div class="dis-inline" style="text-align: right;width:55%"><button style="width:4.5rem;height:1.5rem;background-color: #BA7345;color:#fff;border-radius: 0.5rem;" class="">'+n.btnMoney+'</button></div>' +
      //   '</div>'+'</div>').appendTo($('.moneyList'));
    // });

    $('#hd_ad_history_page .hd_ad_back').on('click',function(){
      $('#hd_ad_history_page').slideUp(100);
    });

    //换一批
    // $.each(dataChange,function (i,obj) {
    //   obj.state === 1?obj.state = '空闲':obj.state = '游戏中';
    //   $('<div class="h-9 mar-b-half">'+
    //     '<div class="myRecord dis-inline w-percent-48" style="background-color: #fff">'+
    //     '<div class="dis-inline position-r t-align-c v-align-t line-h-7 w-percent-100 h-9">'+
    //     '<div class="pad-l-half pad-t-half pad-r-half w-8 h-6-half line-h-4 v-align-t"><img src="'+obj.goodsImg+'" class="w-7 h-6"></div>'+
    //     '<div class="font-14 pad-l-half w-6 h-1 line-h-1 v-align-t"><span class="font-21">'+obj.goodsName+'</span></div>'+
    //     '<div class="h-1 line-h-1 v-align-t t-align-l pad-l-1"><span class="font-14 dis-inline w-3 h-1 line-h-1 v-align-t" style="color: #FEA194">'+obj.sellCoin+'/次</span><span class="font-14 dis-inline" style="width:3rem;height:1rem;line-height: 1rem;vertical-align: top;"><span class="dis-inline gameStatusNo mar-r-half" style="margin-top: 0.3rem;"></span><span class="font-14">'+obj.state+'</span></span></div>'+
    //     '</div>'+
    //     '</div>'+
    //     '<div class="myRecord dis-inline w-percent-48 mat-l-half" style="background-color: #fff">'+
    //     '<div class="dis-inline position-r t-align-c v-align-t line-h-7 w-percent-100 h-9">'+
    //     '<div class="pad-l-half pad-t-half pad-r-half w-8 h-7 h-6-half line-h-4 v-align-t"><img src="'+obj.goodsImg+'" style="width:7rem;height:6rem;"></div>'+
    //     '<div class="font-14 pad-l-half w-6 h-1 line-h-1 v-align-t"><span class="font-21">'+obj.goodsName+'</span></div>'+
    //     '<div class="h-1 line-h-1 v-align-t t-align-l pad-l-1"><span class="font-14 dis-inline w-3 h-1 line-h-1 v-align-t" style="color: #FEA194">'+obj.sellCoin+'/次</span><span class="font-14 dis-inline w-3 h-1 line-h-1 v-align-t" ><span class="dis-inline gameStatus mar-r-half" style="margin-top: 0.3rem;"></span><span  class="font-14">'+obj.state+'</span></span></div>'+
    //     '</div>'+
    //     '</div>'+
    //     '</div>').appendTo($('.change_list'))
    // });


    $('#hd_ad_history_page_change .hd_ad_back .close').on('click',function(){
      $('#hd_ad_history_page_change').slideUp(100);
    });
  //  设置(先按固定处理)
  //   $('<div id="hd_ad_history_page_shezhi" style="display:none;">'+
  //     '<div class="hd_ad_hd" style="border-radius: 1rem;">'+
  //     '<div class="hd_ad_back"><img src="zpSrc/img/close.png" style="width:2rem;height:2rem;"></div>'+
  //     '<p style="color:#000;vertical-align: top;line-height: 2rem;" class="font-22 font-wei">设置</p>'+
  //     '</div>'+
  //     '<div class="hd_ad_list" style="text-align: center;">'+
  //     '<button style="background-color:#00CC47;" class="btn-set">关闭音乐</button>'+'<br>'+
  //     '<button style="background-color:#00CC47;" class="btn-set">关闭弹幕</button>'+'<br>' +
  //     '<button style="background-color:#FF735A;" class="btn-set">求助</button>'+
  //     '</div>'+
  //     '</div>').appendTo($('body'));

    $('#hd_ad_history_page_shezhi .hd_ad_back').on('click',function(){
      $('#hd_ad_history_page_shezhi').slideUp(100);
    });
  //  我的奖品
  //   var dataMyPrize = [
  //     {
  //       "videoUrl":"http://alicdn.doumob.com/cps/VID_20170911_145342.mp4",
  //       "img":"http://alicdn.doumob.com/cps/wawa_02.jpg",
  //       "createDate":"2017-10-30 17:33:38",
  //       "extractStatus":0,
  //       "goodsName":"泰迪熊",
  //       "prizeId":1
  //     },
  //     {
  //       "videoUrl":"http://alicdn.doumob.com/cps/VID_20170911_145342.mp4",
  //       "img":"http://alicdn.doumob.com/cps/wawa_02.jpg",
  //       "createDate":"2017-10-30 17:34:13",
  //       "extractStatus":0,
  //       "goodsName":"泰迪熊",
  //       "prizeId":2
  //     }
  //   ];
    // $.each(dataMyPrize,function (i,obj) {
    //   obj.extractStatus === 0?obj.extractStatus = '未提取':obj.extractStatus = '未提取';
    //   $('<div style="height:10rem;">'+
    //     '<div class="myRecord dis-inline pad-l-1" style="width:45%;margin-top: 0.5rem;">'+
    //     '<div class="dis-inline" style="position:relative;text-align:center;vertical-align: top;line-height: 7rem;width:98%;height: 7rem;border:2px solid #E1E1E1;">'+
    //     '<div style="width:1rem;height:1rem;line-height: 4rem;vertical-align: top;"><span class="font-14" style="position: absolute;bottom:4.2rem;left:0.25rem;color: #ff9292">'+obj.extractStatus+'</span></div>'+
    //    '<div style="width:6rem;height:4rem;line-height: 4rem;vertical-align: top;"><img src="'+obj.img+'" alt="" style="width:5rem;height:4rem;"></div>'+
    //     '<div style="width:6rem;height:1rem;line-height: 1rem;vertical-align: top;text-align: right;padding-right: 1rem;"><a href="'+obj.videoUrl+'"><img src="zpSrc/img/mov.png" alt="" style="width:1rem;height: 1rem;"></a></div>'+
    //     '</div>'+
    //     '<div class="pad-l-half">'+
    //     '<div><span class="font-22 font-wei" style="color: #000;">'+obj.goodsName+'</span></div>'+
    //     '<div><span class="font-20" style="color: #666;">'+obj.createDate+'</span></div>'+
    //     '</div>'+
    //     '</div>'+
    //     '<div class="myRecord dis-inline pad-l-half" style="width:50%;">'+
    //     '<div class="dis-inline" style="position:relative;text-align:center;vertical-align: top;line-height: 7rem;width:98%;height: 7rem;border:2px solid #E1E1E1;">'+
    //    '<div style="width:1rem;height:1rem;line-height: 4rem;vertical-align: top;"><span class="font-14" style="position: absolute;bottom:4.2rem;left:0.25rem;color: #ff9292">'+obj.extractStatus+'</span></div>'+
    //    '<div style="width:6rem;height:4rem;line-height: 4rem;vertical-align: top;"><img src="'+obj.img+'" alt="" style="width:5rem;height:4rem;"></div>'+
    //     '<div style="width:6rem;height:1rem;line-height: 1rem;vertical-align: top;text-align: right;"><a href="'+obj.videoUrl+'"><img src="zpSrc/img/mov.png" alt="" style="width:1rem;height: 1rem;"></a></div>'+
    //     '</div>'+
    //     '<div class="pad-l-half">'+
    //     '<div><span class="font-22 font-wei" style="color: #000;">'+obj.goodsName+'</span></div>'+
    //     '<div><span class="font-20" style="color: #666;">'+obj.createDate+'</span></div>'+
    //     '</div>'+
    //     '</div>'+
    //     '</div>').appendTo($('.myPrize_list'));
    // });

    $('#hd_ad_history_page_myPrize .hd_ad_back .close').on('click',function(){
      $('#hd_ad_history_page_myPrize').slideUp();
    });

  //  抓取记录
  //   var dataCatch = [
  //     {
  //       "goodsId":1,
  //       "statusName":"未支付",
  //       "isSuc":0,
  //       "sellCoin":150,
  //       "img":"http://alicdn.doumob.com/cps/wawa_02.jpg",
  //       "createDate":"17小时前",
  //       "extractStatus":0,
  //       "goodsName":"泰迪熊",
  //       "prizeId":47,
  //       "videoUrl":'a'
  //     },
  //   ];
  //   $.each(dataCatch,function (i,obj) {
  //     $('<div class="hd_ad_list" style="width:100%;height:3rem;">'+
  //       '<div style="background-color: #ffffff;height:3rem;width:100%;">' +
  //       '<a href="./gameDetail.html"><div class="dis-inline" style="text-align:left;width:15%;height: 3rem;vertical-align: middle;line-height: 3rem;"><img src="'+obj.img+'" alt="" style="height:2rem;"></div>' +
  //       '<span class="dis-inline pad-l-half" style="width:45%;line-height: 2rem;height:3rem;vertical-align: top;text-align: left">' +
  //       '<span class="dis-inline font-21 font-wei" style="height: 1.5rem;line-height: 2.2rem;vertical-align: top;color:#666;">'+obj.goodsName+'</span>' +'<br>'+'<span class="dis-inline" style="color: #999;height: 1.5rem;line-height: 0.8rem;vertical-align: top;font-size: 0.6rem;">'+obj.createDate+'</span>'+'' +
  //       '</span>'+
  //       '<div class="dis-inline" style="text-align: right;width:35%">' +
  //       '<div style="height: 3rem;vertical-align: middle;line-height: 2.6rem;" class="dis-inline pad-l-1"><span style="color: #999;font-size: 0.6rem;">抓取娃娃失败</span></div>' +'</a>'+
  //       '</div>' +
  //       '</div>').appendTo($('.catch_list'));
  //   });

    $('#hd_ad_history_page_getRecord .hd_ad_back').on('click',function(){
      $('#hd_ad_history_page_getRecord').slideUp(100);
    });
    //  商品信息(最近抓中的记录)
    // var dataProduct = [
    //   {
    //     "videoUrl":"a", //视频播放地址
    //     "nickName":"李四", //你重开
    //     "headUrl":"http://alicdn.doumob.com/cps/db_fuli_icon.png", //头像地址
    //     "createDate":"50分钟前" //时间
    //   },
    //   {
    //     "videoUrl":"a",
    //     "nickName":"李四",
    //     "headUrl":"http://alicdn.doumob.com/cps/db_fuli_icon.png",
    //     "createDate":"50分钟前"
    //   },
    //   {
    //     "videoUrl":"a",
    //     "nickName":"张三",
    //     "headUrl":"http://alicdn.doumob.com/cps/db_fuli_icon.png",
    //     "createDate":"51分钟前"
    //   },
    //   {
    //     "videoUrl":"a",
    //     "nickName":"张三",
    //     "headUrl":"http://alicdn.doumob.com/cps/db_fuli_icon.png",
    //     "createDate":"51分钟前"
    //   }
    // ];
    // $.each(dataProduct,function (i,obj) {
    //   $('<div class="hd_ad_list" style="width:100%;height:4rem;line-height: 4rem;vertical-align: top">'+
    //     '<div style="background-color: #ffffff;height:4rem;width:100%;">' +
    //     '<div class="dis-inline pad-l-1" style="height: 3rem;vertical-align: middle;line-height: 2.6rem;width:20%;"><img src="'+obj.headUrl+'" alt="" style="height:2.5rem;"></div>' +
    //     '<span class="dis-inline pad-l-half" style="margin-left:0.5rem;width:45%;line-height: 2rem;height:3rem;vertical-align: top;text-align: left">' +
    //     '<span class="dis-inline font-21 font-wei" style="height: 1.5rem;line-height: 3rem;vertical-align: top;color:#666;">'+obj.nickName+'</span>' +'<br>'+'<span class="dis-inline" style="color: #999;height: 1.5rem;line-height: 1.2rem;vertical-align: top;font-size: 0.6rem;">'+obj.createDate+'</span>'+'' +
    //     '</span>'+
    //     '<div class="dis-inline" style="text-align: right;width:25%">' +
    //     '<div style="text-align: right;height: 3rem;vertical-align: middle;line-height: 2.6rem;" class="dis-inline pad-l-1"><a href="'+obj.videoUrl+'"><img src="zpSrc/img/mov.png" alt="" style="height:1.4rem;"></a></div>' +
    //     '</div>'+'</div>').appendTo($('.productList'));
    // });

    $('#hd_ad_history_page_productInformation .hd_ad_back').on('click',function(){
      $('#hd_ad_history_page_productInformation').slideUp(100);
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
