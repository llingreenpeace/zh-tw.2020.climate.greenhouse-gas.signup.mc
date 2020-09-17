//@prepros-append spriteVideo.js
//@prepros-append calsize.js


$(document).ready(function(){

  //set video size
  //calSize($('.tear__video'), $('.tear__canvas'), 16, 9);
  calSize($('.yearslater__wave'), $('.yearslater__canvas'), 16, 9);
  calSize($('.tear__video'), $('.tear__news-video'), 16, 9);
  calSize($('.earth__video'), $('.earth__video video'), 16, 9);
  var earthBody = $('.earth__video video').get(0);
  var earthStatus = {
    'forward':[0, 2, 4, 6, 8, 10],
    'backward':[20, 18, 16, 14, 12, 10]
  };
  var earthCheck = 0;
  //calSize($('.movie__video'), $('.movie__video-wrap'), 960, 540);
  //calSize($('.action__video'), $('.action__video-wrap'), 1920, 1080);

  //setSpriteVideo('./images/tear.jpg', $('#tearDrop'), 29, 2400);
  setSpriteVideo('./images/wave.png', $('#yearsLater'), 29, 1200, false, true);
  // setSpriteVideo('./images/earth-0-23.png', $('#earthSib'), 24, 1000);
  // setSpriteVideo('./images/earth-23-47.png', $('#earthPhi'), 25, 1000);
  // setSpriteVideo('./images/earth-47-71.png', $('#earthPak'), 25, 1000);
  // setSpriteVideo('./images/earth-71-95.png', $('#earthTwn'), 25, 1000);
  // setSpriteVideo('./images/earth-95-119.png', $('#earthIndex'), 25, 1000);
  //setSpriteVideo('earthall', $('#earthIndex'), 95, 1000);
  //setSpriteVideo('./images/icetaiwan.png', $('#iceTaiwan'), 11, 1000);

  var movePause = false;
  var handsTimer;
  var sec2Timer;

  /*$('#tearDrop').on('end', function(){
    $('#tearDrop, .main-title').addClass('out');
    $('.tear__news-video').show();
    $('.tear__news-video').get(0).currentTime = 0;
    $('.tear__news-video').get(0).play();
    if($('.tear .section__scroll').hasClass('hide')) $('.tear .section__scroll').removeClass('hide');
  });*/
  $('.tear__news-video').on('ended', function(){
    // if($('.tear').is('.tear.active')) $.fn.fullpage.moveSectionDown();
    $.fn.fullpage.moveSectionDown();
    // $(this).fadeOut(1300, function(){
    //   //$('#tearDrop').trigger('forward').trigger('play');
    //   //$('#tearDrop').removeClass('out');
    // });
  }).on('timeupdate', function() {
    if($(this).get(0).currentTime > 2.8) {
      $('.main-title').addClass('out');
    }
  });

  $('#fullpage').fullpage({
    afterRender: function(){
      $('.section__scroll').on('click', function(){
        $.fn.fullpage.moveSectionDown();
      });
      $('.fp-controlArrow').append('<span class="arrow__body"></span>');
      $('.pagi__item').eq(0).addClass('active');
      // $('.footer__top').on('click', function(){
      //   $.fn.fullpage.moveTo(1);
      // });
    },
    onLeave: function(index, nextIndex, direction){
      //console.log(index, nextIndex);
      $('.pagi__item').removeClass('active');
      $('.pagi__item').eq(nextIndex-1).addClass('active');
      if(nextIndex != 1){
        $('.tear .section__scroll').addClass('hide');
        //$('.tear__news-video').get(0).pause();
      }else{
        //$('#tearDrop, .main-title').removeClass('out');
        //$('#tearDrop').trigger('forward');
        $('.main-title').removeClass('out');
        $('.tear').removeClass('out');
        $('.tear__news-video').get(0).currentTime = 0;
      }

      if(nextIndex == 2 && direction == 'down'){
        $('#yearsLater').attr({
          'data-start': 0,
          'data-end': 14
        });
        $('#yearsLater').trigger('forward');
        $('#yearsLater').trigger('play');
        $('.yearslater').removeClass('out');
        $('.yearslater__title .num').text(20);
      }
      if(nextIndex == 2 && direction == 'up'){
        // if(movePause){
        //   $('#yearsLater').attr({
        //     'data-start': 14,
        //     'data-end': 28
        //   });
        //   $('#yearsLater').trigger('backward');
        //   $('#yearsLater').trigger('play');
        //   $('.yearslater').removeClass('out');
        //   $('.yearslater__title .num').text(20);
        // }
        $('.yearslater').removeClass('out');
        $('.yearslater__title .num').text(20);
        $('.yearslater').addClass('playslides');
        clearInterval(sec2Timer);
        sec2Timer = setInterval(changeYearslater, 4000);
      }
      if(index == 2 && direction == 'down'){
        // $('#yearsLater').attr({
        //   'data-start': 14,
        //   'data-end': 28
        // });
        // $('#yearsLater').trigger('forward');
        // $('#yearsLater').trigger('play');

      }
      if(nextIndex != 2){
        $('.yearslater').addClass('out');
        $('.yearslater').removeClass('enter');
      }
      if(index == 2 && direction == 'up'){
        $('#yearsLater').show().attr({
          'data-start': 0,
          'data-end': 14
        });
        $('#yearsLater').trigger('backward');
        $('#yearsLater').trigger('play');
        $('.yearslater').removeClass('playslides');
        clearInterval(sec2Timer);
      }

      if(nextIndex != 5){
        $('.students__body').removeClass('active');
        $('.students__bubble').fadeOut();
      }
      if(index == 5){
        $('.says').removeClass('enter');
        // if(!movePause){
        //   setTimeout(function(){
        //     if(!$('.says').hasClass('active')) return false;
        //     movePause = true;
        //     $.fn.fullpage.moveTo(nextIndex);
        //   }, 300);
        //   return movePause;
        // }
      }

      if(index == 3){
        $('.sink').removeClass('enter step2');
        $('.sink .active').removeClass('active');
        // if(!movePause){
        //   setTimeout(function(){
        //     if(!$('.sink').hasClass('active')) return false;
        //     movePause = true;
        //     $.fn.fullpage.moveTo(nextIndex);
        //   }, 500);
        //   return movePause;
        // }
      }
      if(nextIndex == 4){
        $('.earth__slide, .earth__bg').removeClass('active');
        $('.earth__slide').eq(0).addClass('active');

        $('.earth__canvas').removeClass('play');
        $('#earthIndex').addClass('play').trigger('backward');
        earthBody.currentTime = 0;
        earthBody.pause();
      }else{

      }
      if(index == 4){
        $('.earth__slide, .earth__bg').removeClass('active');
        // if(!movePause){
        //   setTimeout(function(){
        //     if(!$('.earth').hasClass('active')) return false;
        //     movePause = true;
        //     $.fn.fullpage.moveTo(nextIndex);
        //   }, 600);
        //   return movePause;
        // }
      }

      // if(nextIndex == 6){
      //   $('.movie__video-wrap').get(0).currentTime = 0;
      //   $('.movie__video-wrap').get(0).play();
      // }
      // if(index == 6){
      //   $('.movie__video-wrap').get(0).pause();
      //   $('.movie').removeClass('enter');
      //   // if(!movePause){
      //   //   setTimeout(function(){
      //   //     if(!$('.movie').hasClass('active')) return false;
      //   //     movePause = true;
      //   //     $.fn.fullpage.moveTo(nextIndex);
      //   //   }, 600);
      //   //   return movePause;
      //   // }
      // }

      // if(nextIndex == 7){
      //   $('#iceTaiwan').trigger('forward');
      // }else{

      // }

      // if(index == 7){
      //   $('.timeout').removeClass('flood textin enter');
      //   // if(!movePause){
      //   //     if(!$('.timeout').hasClass('active')) return false;
      //   //     setTimeout(function(){
      //   //     movePause = true;
      //   //     $.fn.fullpage.moveTo(nextIndex);
      //   //   }, 600);
      //   //   return movePause;
      //   // }


      // }
      if(nextIndex == 6){
        //$('.action__video-wrap').get(0).currentTime = 0;
        //$('.action__video-wrap').get(0).play();

      }else{

      }
      if(index == 6){
        //$('.action__video-wrap').get(0).pause();
        $('.action').removeClass('enter');
        $('.action').addClass('out');
        // if(!movePause){
        //   setTimeout(function(){
        //     if(!$('.action').hasClass('active')) return false;
        //     movePause = true;
        //     $.fn.fullpage.moveTo(nextIndex);
        //   }, 300);
        //   return movePause;
        // }
        if(direction == 'down'){
          $('.action').addClass('keep');
        }
      }


    },
    afterLoad: function(anchorLink, index){
      movePause = false;
      if(index == 1 && $('body').hasClass('pace-done')){
        //$('#tearDrop').trigger('play');
        $('.tear__news-video').show();
        $('.tear__news-video').get(0).currentTime = 0;
        $('.tear__news-video').get(0).play();
        if($('.tear .section__scroll').hasClass('hide')) $('.tear .section__scroll').removeClass('hide');
      }
      if(index != 1){
        $('.tear').addClass('out');
        //$('#tearDrop').trigger('pause');
      }
      if(index == 2){
        $('.yearslater').addClass('enter');
        $('.yearslater__title .num').text(20);
        var year = 10;
        var count = setInterval(function(){
          year = year + 1;
          if(year >= 10) $('.yearslater__title .num').text(year);
          if(year>=30) clearInterval(count);
        }, 50);

      }else{
        $('.yearslater').removeClass('playslides');
        clearInterval(sec2Timer);
      }

      if(index == 5){
        $('.says').addClass('enter');
        $('.students__hitarea').eq(3).click();
      }

      if(index == 3){
        $('.sink').addClass('enter');
        //$('.sink__second').addClass('enter');
      }else{
        $('.sink .active').removeClass('active');
      }

      if(index == 4){
        $('.earth__bg').eq(0).addClass('active');
        $('.earth .section__scroll').addClass('hide');
        $('.earth .fp-prev, .earth .fp-next').removeClass('hide');
      }else{
        if(!$('.earth .section__scroll').is('.hide')) $('.earth .section__scroll').addClass('hide');
      }
      // if(index == 7){
      //   $('.timeout').addClass('enter');
      //   $('#iceTaiwan').trigger('play');
      // }
      // if(index == 6){
      //   $('.movie').addClass('enter');
      // }

      if(index == 6){
        $('.action').addClass('enter');
        handsTimer = setInterval(function(){
          if(!$('.action').is('.action.active')){
            clearInterval(handsTimer);
            return false;
          }
          $('.action').removeClass('enter');
          setTimeout(function(){
            if($('.action').is('.action.active')){
              $('.action').addClass('enter');
            }
          }, 600);
        }, 10000);
      }else{
        clearInterval(handsTimer);
        $('.action').removeClass('out');
      }

    },
    afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
      if(index == 4 && slideIndex == 4){
        $('.earth .section__scroll').removeClass('hide');
        $('.earth .fp-prev, .earth .fp-next').addClass('hide');
      }else{
        $('.earth .section__scroll').addClass('hide');
        $('.earth .fp-prev, .earth .fp-next').removeClass('hide');
      }
    },
    onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){
      $('.section.active .earth__bg').removeClass('active');
      $('.section.active .earth__bg').eq(nextSlideIndex).addClass('active')
      var earthNo = nextSlideIndex;
      var earthFrom = slideIndex;
      var dir = direction=='right' ? 'forward':'backward';
      //if(dir=='backward') earthNo = nextSlideIndex+1;
      if(earthNo < 0) earthNo = 4;
      if(earthNo > 4) earthNo = 0;
      if(nextSlideIndex == 0 && direction == 'right'){
        earthNo = 5;

        dir = 'forward';

      }
      if(nextSlideIndex == 4 && direction == 'left'){
        //earthNo = 0;
        dir = 'backward';
      }
      earthBody.pause();
      earthBody.currentTime = earthStatus[dir][earthFrom] + 1;
      if(dir == 'backward')  earthBody.currentTime = earthStatus[dir][earthNo] - 1;

      earthCheck = earthStatus[dir][earthNo];
      console.log(earthBody.currentTime,  earthCheck)
      earthBody.play();
      $('.earth__canvas').removeClass('play');

      $('.earth__canvas').eq(earthNo).addClass('play').trigger(dir).trigger('play');

      // if(dir == 'backward' && nextSlideIndex != 0){
      //   $('.earth__canvas').eq(nextSlideIndex).trigger('gotoend');
      //   $('.earth__canvas').eq(earthNo).one('end', function(){
      //     $(this).removeClass('play');
      //     $('.earth__canvas').eq(nextSlideIndex).addClass('play');
      //   });
      // }
    }
  });
  earthBody.addEventListener('timeupdate', function(){
    checkVideoTime(earthBody, earthCheck);
  });
  function checkVideoTime(video, checkTime){
    if(video.currentTime >= checkTime){
      video.pause();
    }
  }
  $('#yearsLater').on('end', function(){
    $(this).delay(200).fadeOut();
    if($('.yearslater').is('.yearslater.active')){
      $('.yearslater').addClass('playslides');
      clearInterval(sec2Timer);
      sec2Timer = setInterval(changeYearslater, 4000);
    }
  }).on('play', function(){
    $(this).show();
  });
});



function changeYearslater(){
  var nowBG = $('.yearslater__bg.active') || $('.yearslater__bg:last-child');
  nowBG.removeClass('active');
  if(nowBG.next().length >0){
    nowBG.next().addClass('active');
  }else{
    $('.yearslater__bg').eq(0).addClass('active');
  }
}


$('.students__hitarea').on('click', function(){
  var id = $(this).attr('data-id');
  changeStudent(id);
});
$('.students__body .arrow').on('click', function(){
  var id = Number($(this).siblings('.students__hitarea').attr('data-id')) + ($(this).is('.arrow--left') ? -1 : 1);
  console.log(id)
  if(id < 1) id = 7;
  if(id > 7) id = 1;
  changeStudent(id);
});
function changeStudent(id){
  $('.students__body').removeClass('active');
  $('#student' + id).addClass('active');
  var studentX = $('#student' + id).offset().left + ($('#student' + id).width()/2);
  $('.students__bubble').fadeOut(function(){
    $(this).removeClass('left right');
    if(id<=2){
      $(this).addClass('left').css({
        'left': studentX + 'px',
        'right': 'auto'
      });
    }else if(id >=6){
      studentX = $('.students').width() - studentX;
      $(this).addClass('right').css({
        'left': 'auto',
        'right': studentX + 'px',
      });
    }else{
      $(this).css({
        'left': studentX + 'px',
        'right':'auto',
      });
    }
    $('.students__talk').hide();
    $('#talk'+id).show();
    $(this).fadeIn();
  });

}
// section 4


var numbers = {'ila':'22,913',
'chw':'49,015',
'yun':'36,669',
'pif':'57,724',
'ttt':'0',
'hun':'21',
'kel':'20,052',
'hsz':'42,310',
'hsz2':'12,283',
'tpe':'209,032',
'ntpc':'282,124',
'txg':'44,192',
'tnn':'172,849',
'tyn':'8,128',
'zmi':'20,668',
'cyi':'30,262',
'khh':'197,401'};
var area = {'ila':55.0800018,
'chw':225.7059937,
'yun':249.9660034,
'pif':69.7086029,
'ttt':11.5263004,
'hun':6.9254999,
'kel':4.7628002,
'hsz':27.2970009,
'hsz2':8.2538996,
'tpe':16.5725994,
'ntpc':43.8452988,
'txg':64.3220978,
'tnn':310.9830017,
'tyn':17.4636002,
'zmi':34.2305984,
'cyi':155.7870026,
'khh':95.6610031};

var cityNames = {'ila':'宜蘭縣',
'chw':'彰化縣',
'yun':'雲林縣',
'pif':'屏東縣',
'ttt':'臺東縣',
'hun':'花蓮縣',
'kel':'基隆市',
'hsz':'新竹市',
'hsz2':'新竹縣',
'tpe':'臺北市',
'ntpc':'新北市',
'txg':'臺中市',
'tnn':'臺南市',
'tyn':'桃園市',
'zmi':'苗栗縣',
'cyi':'嘉義縣',
'khh':'高雄市'};
var sinkChanging = false;
$('.sink__spot').on('click', function(){
  if(sinkChanging) return false;
  sinkChanging = true;
  var nowSpot = $(this).attr('data-spot');
  $('.sink__spot').removeClass('active');
  var areaNum = Math.round(area[nowSpot]);

  if(!$('.sink__countries').hasClass('active')){
    $('.sink__country').css({
      'background-image': 'url(images/countries/' + nowSpot + '.png)'
    });
    $('.sink__data .country').text(cityNames[nowSpot]);
    $('.sink__data .people').text(numbers[nowSpot]);
    $('.sink__data .area').text(areaNum.toString());
    $('.sink__countries').addClass('active');
    sinkChanging = false;
    $('.sink__spot[data-spot="' + nowSpot + '"]').addClass('active');
    return false;
  }
  $('.sink__countries').removeClass('active');

  $('.sink__countries').one('transitionend', function(){
    $('.sink__country').css({
      'background-image': 'url(images/countries/' + nowSpot + '.png)'
    });
    $('.sink__data .country').text(cityNames[nowSpot]);
    $('.sink__data .people').text(numbers[nowSpot]);
    $('.sink__data .area').text(areaNum.toString());
    $('.sink__countries').addClass('active');
    $('.sink__spot[data-spot="' + nowSpot + '"]').addClass('active');
    sinkChanging = false;
  });
});

$('.sink__para-3').on('transitionend', function(){
  if(!$('.sink').hasClass('enter')) return false;
  $('.sink').addClass('step2');
});
$('.sink__desc').on('transitionend', function(e){
  e.stopPropagation();
  if($(this).css('opacity') != 0 || $('.sink__spot.active').length > 0) return false;
  console.log('sink spots enter')
  $('.sink__spot[data-spot="kel"]').click();
});


// ice

$('#iceTaiwan').on('pause', function(){
  $('.timeout').addClass('flood');
});
$('.timeout__title').on('transitionend', function(){
  if(!$('.timeout').is('.timeout.active.flood')) return false;
  $('.timeout').addClass('textin');
});


//action
$('.action__share .text').on('transitionend', function(){
  if(!$('.action').hasClass('enter') && $('.action').hasClass('active')) $('.action').addClass('enter');
});

$(window).on('resize', function(){
  calSize($('.tear__video'), $('.tear__news-video'), 16, 9);
  calSize($('.earth__video'), $('.earth__video video'), 16, 9);
  //calSize($('.movie__video'), $('.movie__video-wrap'), 960, 540);
  //calSize($('.action__video'), $('.action__video-wrap'), 1920, 1080);
});
var campaignUrl = 'https://change.greenpeace.org.tw/2019/ClimateStrike/?utm_campaign=2019-climate&utm_source=facebook&utm_medium=social&utm_content=cta_btn';
var shareurl = 'https://www.facebook.com/share.php?u=' + campaignUrl + '&hashtag=%23%E6%99%82%E9%96%93%E4%B8%8D%E5%A4%9A%E4%BA%86';
$(".share-btn").attr('href', shareurl);
function setSpriteVideo(path, canvas, frames, duration, loop, direction){
    var direction = direction || true;

    var start = canvas.attr('data-start') ? Number(canvas.attr('data-start')):0;
    var end = canvas.attr('data-end') ? Number(canvas.attr('data-end')):frames-1;
    console.log(canvas.attr('id'), start, end)
    var _this = canvas;
    var timePerFrame = duration / frames;
    var timeWhenLastUpdate;
    var timeFromLastUpdate;
    var frameNumber = 0;
    var delay = canvas.attr('data-delay') ? Number(canvas.attr('data-delay')):0;

    var ctx = _this.get(0).getContext('2d');
    var canvasW = _this.width();
    var canvasH = _this.height();
    _this.get(0).width = canvasW;
    _this.get(0).height = canvasH;
    var spriteW, spriteH, drawW, drawH, frameW, frameH;
    var sprite = new Image();
    var merged = 0;
    if(path == 'earthall'){
     
      var sprite2 = new Image();
      var sprite3 = new Image();
      var sprite4 = new Image();
      spriteH = 0;
      var urls = ['./images/earth-1-24.png', './images/earth-25-48.png', './images/earth-49-72.png','./images/earth-73-95.png']
      var sprites = [sprite, sprite2, sprite3, sprite4];
      sprites.forEach(function(item, key){
        item.src = urls[key];
        item.onload = function(){
          spriteW = this.width;
          spriteH = this.height;
          frameW = this.width;
          frameH = 1080;
          drawW = canvasW;
          drawH = spriteH * (drawW / spriteW);
          
          merged+=1;
          init();
          
        }
      });
      
      
    }else{
      sprite.src = path;
      sprite.onload = function(){
        spriteW = this.width;
        spriteH = this.height;
        frameW = this.width;
        frameH = spriteH / frames;
        drawW = canvasW;
        drawH = spriteH * (drawW / spriteW);
        init();
      }
    }
    
    


    function init(){
      if(path == 'earthall'){
        if(merged>=4){
          
          ctx.drawImage(sprites[0], 0, 0, frameW, frameH, 0, 0, canvasW, canvasH);
        }
        
      }else{
        ctx.drawImage(sprite, 0, 0, frameW, frameH, 0, 0, canvasW, canvasH);
      }
      _this.playing = false;
      _this.trigger('init');

    }

    function drawFrame(frame){
      _this.attr('data-now', frame);
      ctx.clearRect(0, 0, canvasW, canvasH);
      if(path == 'earthall'){
        var nowSprite = sprites[Math.floor(frame/24)];
        frame = frame%24;
        ctx.drawImage(nowSprite, 0, (frame * frameH), frameW, frameH, 0, 0, canvasW, canvasH);
      }else{
        ctx.drawImage(sprite, 0, (frame * frameH), frameW, frameH, 0, 0, canvasW, canvasH);
      }
      
      //console.log((frame * frameH))

    }

    function update(){
      canvasW = _this.width();
      canvasH = _this.height();
      _this.get(0).width = canvasW;
      _this.get(0).height = canvasH;
      drawW = canvasW;
      drawH = spriteH * (drawW / spriteW);
      drawFrame(frameNumber);
    }
    $(window).on('resize', function(){
      update()
    }).resize();
    _this.on('play', function(){
      timeWhenLastUpdate = undefined;
      start = canvas.attr('data-start') ? Number(canvas.attr('data-start')):0;
      end = canvas.attr('data-end') ? Number(canvas.attr('data-end')):frames-1;
      if(!_this.playing) requestAnimationFrame(step);
      _this.playing = true;
      if(direction){
        console.log(_this.attr('id'), start, end);
      }else{
        console.log(_this.attr('id'), end, start);
      }
    });
    _this.on('gotoend', function(e,frame){
      frameNumber = canvas.attr('data-end') ? Number(canvas.attr('data-end')):frames-1;
      drawFrame(frameNumber);
    });
    _this.on('stop', function(){
      _this.playing = false;
      frameNumber = start;
    });
    _this.on('pause', function(){
      _this.playing = false;
    });
    _this.on('backward', function(){
      frameNumber = canvas.attr('data-end') ? Number(canvas.attr('data-end')):frames-1;
      drawFrame(frameNumber);
      direction = false;
    });
    _this.on('forward', function(){
      frameNumber = canvas.attr('data-start') ? Number(canvas.attr('data-start')):0;
      drawFrame(frameNumber);
      direction = true;
    });



    function step(startTime) {
      if(!_this.playing) return false;
      if (!timeWhenLastUpdate) timeWhenLastUpdate = startTime;

      timeFromLastUpdate = startTime - timeWhenLastUpdate;
      
      
      drawFrame(frameNumber);

      if (timeFromLastUpdate > timePerFrame) {
        delay -= timeFromLastUpdate;
        timeWhenLastUpdate = startTime;
        //console.log(delay)
        if(delay<=0) {
          //console.log(frameNumber, end)
          var playEnd = frameNumber >= end
          if(!direction){
            playEnd = frameNumber <= start
          }
          if (playEnd) {
            if(loop){
              frameNumber = direction ? start : end;
            }else{
              _this.trigger('pause');
              _this.trigger('end');
              delay = canvas.attr('data-delay') ? Number(canvas.attr('data-delay')):0;
            }

          } else {
            frameNumber = frameNumber + (direction ? 1:-1);
          }
        }
      }

      requestAnimationFrame(step);
    }

}

function calSize(container, canvas, w, h){
  var boxW = container.width();
  var boxH = container.height();
  var newW = boxW;
  var newH = boxW * (h/w);


  console.log(boxW, boxH, newW, newH);
  if(newH < boxH){
    newH = boxH;
    newW = boxH * (w/h);
  }
  canvas.css({
    'width': newW + 'px',
    'height': newH + 'px',
    'top': '50%',
    'left': '50%',
    'position': 'absolute',
    'transform': 'translate(-50%, -50%)'
  });
}
