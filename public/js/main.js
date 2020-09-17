const serverRoute = 'https://change.greenpeace.org.tw/2020/petition/zh-TW.2020-greenhouse-gas.signup/'

$(document).ready(function () {

  calSize($('.earth__video'), $('.earth__video video'), 16, 9);
  var earthBody;
  // console.log($(window).width())
  if ($(window).width() <= 991) {
    // console.log('get 1')
    earthBody = $('.earth__video video').get(0);
  } else {
    // console.log('get 2')
    earthBody = $('.earth__video video').get(1);
  }
  // console.log(earthBody)

  var earthStatus = {
    'forward': [0, 2, 4, 6, 8, 10],
    'backward': [20, 18, 16, 14, 12, 10]
  };
  var earthCheck = 0;
  var movePause = false;
  var handsTimer;
  var sec2Timer;


  //console.log('fullpage init')

  $('#fullpage').fullpage({
    anchors: ['section1', 'section2', 'section3', 'section4'],
    loopHorizontal: true,
    autoScrolling: true,
    fitToSectionDelay: 1000,
    scrollingSpeed: 1200,
    normalScrollElements: ".normal-scroll",
    // scrollOverflow: true,
    afterRender: function () {
      $('.fp-controlArrow').hide();
      $('.section__scroll').on('click', function () {
        $.fn.fullpage.moveSectionDown();
      });
      $('.fp-controlArrow').append('<span class="arrow__body"></span>');
      $('.pagi__item').eq(0).addClass('active');
      $('.floating-btn').hide();


    },
    onLeave: function (index, nextIndex, direction) {
      // console.log(index, nextIndex, direction);
      $('.pagi__item').removeClass('active');
      $('.pagi__item').eq(nextIndex - 1).addClass('active');
      if (nextIndex === 1 || nextIndex === 4) {
        $('.floating-btn').hide();
      } else {
        $('.floating-btn').fadeIn();
      }
      if (nextIndex != 1) {
        $('.tear .section__scroll').addClass('hide');
        $.fn.fullpage.reBuild()
      } else {
        $('.main-title').removeClass('out');
        $('.tear').removeClass('out');
      }

      if (nextIndex == 2 && direction == 'down') {
        $('#yearsLater').attr({
          'data-start': 0,
          'data-end': 14
        });
        $('#yearsLater').trigger('forward');
        $('#yearsLater').trigger('play');
        $('.yearslater').removeClass('out');
        $('.yearslater__title .num').text(20);
      }
      if (nextIndex == 3) {
        $('.earth__slide, .earth__bg').removeClass('active');
        $('.earth__slide').eq(0).addClass('active');
        $('.earth__canvas').removeClass('play');
        $('#earthIndex').addClass('play').trigger('backward');
        $('.fp-controlArrow').show();
        $('.section--earth').css("opacity", "1");
        earthBody.currentTime = 0.1;
        earthBody.pause();
        earthBody.play();
        $('.earth__canvas').removeClass('play');
        // $('.earth__canvas').eq(0).addClass('play').trigger(dir).trigger('play');
      } else {
        $('.section--earth').css("opacity", "0");
      }

    },
    afterLoad: function (anchorLink, index) {
      movePause = false;

      if (index === 1) {
        $('.floating-btn').hide();
      }
      if (index == 2) {
        $('.sink').addClass('enter');
      }
      if (index === 3) {
        $('.section--earth').css("opacity", "1");
      }

      if (index === 4) {
        $('.fourth--container').removeClass('invisible');
        // console.log('setAutoScrolling false')
        let c = $('.fourth--container').height();
        let w = $(window).height()

        console.log(c)
        console.log(w)

        if (c - w > 0) {
          $.fn.fullpage.setAutoScrolling(false);
        } else {
          $.fn.fullpage.setAutoScrolling(true);
          $.fn.fullpage.reBuild();
        }
      } else {
        $.fn.fullpage.setAutoScrolling(true);
        // console.log('page rebuilt')
        $.fn.fullpage.reBuild();
      }

      // console.log(index)
      // console.log($('#fullpage section').length)

      // console.log($('.fourth--container').height())
      // console.log($(window).width())

      if ($(window).width() < 992) {
        $(".fourth--container").scroll(function () {
          // console.log('scrolling')
          let lastSection = $('#fullpage').find("section").last();
          let offset = lastSection.offset();
          let w = $('.fourth--container');
          console.log(w.scrollTop())
          console.log(offset.top)
          if (offset.top - w.scrollTop() >= 0) {
            $.fn.fullpage.moveSectionUp();
            $.fn.fullpage.setAutoScrolling(true);
          }
        })
      }

      $(".section--footer").scroll(function () {
        // console.log('scrolling')
        let lastSection = $('#fullpage').find("section").last();
        let offset = lastSection.offset();
        let w = $('.section--footer');
        console.log(w.scrollTop())
        console.log(offset.top)
        if (offset.top - w.scrollTop() >= 0) {
          $.fn.fullpage.moveSectionUp();
          $.fn.fullpage.setAutoScrolling(true);
        }
      })

      let status = "FRESH";
      // console.log(window);
      if (window.pageJson.pageNumber === 2) {
        status = "SUCC"; // succ page
      } else {
        status = "FRESH"; // start page
      }

      if (status === "FRESH") {
        $('.page-2').hide()
        $('.page-1').fadeIn()
      } else if (status === "SUCC") {
        $('.page-1, .section__scroll').hide()
        $('.page-2').fadeIn()
        $('.page-2').css('max-height', "unset")
        $('.page-2').css('height', "auto")
      }

    },
    afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {

    },
    onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) {
      $('.section.active .earth__bg').removeClass('active');
      $('.section.active .earth__bg').eq(nextSlideIndex).addClass('active')
      var earthNo = nextSlideIndex;
      var earthFrom = slideIndex;
      var dir = direction == 'right' ? 'forward' : 'backward';
      //if(dir=='backward') earthNo = nextSlideIndex+1;
      if (earthNo < 0) earthNo = 4;
      if (earthNo > 4) earthNo = 0;
      if (nextSlideIndex == 0 && direction == 'right') {
        earthNo = 5;

        dir = 'forward';

      }
      if (nextSlideIndex == 4 && direction == 'left') {
        //earthNo = 0;
        dir = 'backward';
      }
      earthBody.pause();
      earthBody.currentTime = earthStatus[dir][earthFrom] + 1;
      if (dir == 'backward') earthBody.currentTime = earthStatus[dir][earthNo] - 1;

      earthCheck = earthStatus[dir][earthNo];
      console.log(earthBody.currentTime, earthCheck)
      earthBody.play();
      $('.earth__canvas').removeClass('play');

      $('.earth__canvas').eq(earthNo).addClass('play').trigger(dir).trigger('play');

      console.log(index, slideIndex)
      if (index === 3, nextSlideIndex === 4) {
        $('.fp-controlArrow').fadeOut();
      } else {
        $('.fp-controlArrow').fadeIn();
      }

    }
  });


  earthBody.addEventListener('timeupdate', function () {
    checkVideoTime(earthBody, earthCheck);
  });

  function checkVideoTime(video, checkTime) {
    if (video.currentTime >= checkTime) {
      video.pause();
    }
  }
  $('#yearsLater').on('end', function () {
    $(this).delay(200).fadeOut();
    if ($('.yearslater').is('.yearslater.active')) {
      $('.yearslater').addClass('playslides');
      clearInterval(sec2Timer);
      sec2Timer = setInterval(changeYearslater, 4000);
    }
  }).on('play', function () {
    $(this).show();
  });
});



function changeYearslater() {
  var nowBG = $('.yearslater__bg.active') || $('.yearslater__bg:last-child');
  nowBG.removeClass('active');
  if (nowBG.next().length > 0) {
    nowBG.next().addClass('active');
  } else {
    $('.yearslater__bg').eq(0).addClass('active');
  }
}

// section 4


var numbers = {
  'ila': '22,913',
  'chw': '49,015',
  'yun': '36,669',
  'pif': '57,724',
  'ttt': '0',
  'hun': '21',
  'kel': '20,052',
  'hsz': '42,310',
  'hsz2': '12,283',
  'tpe': '209,032',
  'ntpc': '282,124',
  'txg': '44,192',
  'tnn': '172,849',
  'tyn': '8,128',
  'zmi': '20,668',
  'cyi': '30,262',
  'khh': '197,401'
};
var area = {
  'ila': 55.0800018,
  'chw': 225.7059937,
  'yun': 249.9660034,
  'pif': 69.7086029,
  'ttt': 11.5263004,
  'hun': 6.9254999,
  'kel': 4.7628002,
  'hsz': 27.2970009,
  'hsz2': 8.2538996,
  'tpe': 16.5725994,
  'ntpc': 43.8452988,
  'txg': 64.3220978,
  'tnn': 310.9830017,
  'tyn': 17.4636002,
  'zmi': 34.2305984,
  'cyi': 155.7870026,
  'khh': 95.6610031
};

var cityNames = {
  'ila': '宜蘭縣',
  'chw': '彰化縣',
  'yun': '雲林縣',
  'pif': '屏東縣',
  'ttt': '臺東縣',
  'hun': '花蓮縣',
  'kel': '基隆市',
  'hsz': '新竹市',
  'hsz2': '新竹縣',
  'tpe': '臺北市',
  'ntpc': '新北市',
  'txg': '臺中市',
  'tnn': '臺南市',
  'tyn': '桃園市',
  'zmi': '苗栗縣',
  'cyi': '嘉義縣',
  'khh': '高雄市'
};
var sinkChanging = false;
$('.sink__spot').on('click', function () {

  if (sinkChanging) return false;
  sinkChanging = true;
  var nowSpot = $(this).attr('data-spot');
  $('.sink__spot').removeClass('active');

  var areaNum = Math.round(area[nowSpot]);

  if (!$('.sink__countries').hasClass('active')) {
    $('.sink__country').css({
      'background-image': 'url(' + serverRoute + 'images/countries/' + nowSpot + '.png)'
    });
    $('.sink__data .country').text(cityNames[nowSpot]);
    $('.sink__data .people').text(numbers[nowSpot]);
    $('.sink__data .area').text(areaNum.toString());
    $('.sink__countries').addClass('active');
    $('.sink__countries').css('z-index', 6)
    sinkChanging = false;
    $('.sink__spot[data-spot="' + nowSpot + '"]').addClass('active');


    if ($('.sink__countries').hasClass('active')) {
      $('.sink__taiwan').css('z-index', 2)
    } else {
      $('.sink__taiwan').css('z-index', 4)
    }


    return false;
  }

  $('.sink__countries').removeClass('active');

  $('.sink__countries').one('transitionend', function () {
    $('.sink__country').css({
      'background-image': 'url(' + serverRoute + 'images/countries/' + nowSpot + '.png)'
    });
    $('.sink__data .country').text(cityNames[nowSpot]);
    $('.sink__data .people').text(numbers[nowSpot]);
    $('.sink__data .area').text(areaNum.toString());
    $('.sink__countries').addClass('active');
    $('.sink__spot[data-spot="' + nowSpot + '"]').addClass('active');
    sinkChanging = false;
  });
});

$('.sink__para-3').on('transitionend', function () {
  if (!$('.sink').hasClass('enter')) return false;
  $('.sink').addClass('step2');
});
$('.sink__desc').on('transitionend', function (e) {
  e.stopPropagation();
  if ($(this).css('opacity') != 0 || $('.sink__spot.active').length > 0) return false;
  console.log('sink spots enter')
  $('.sink__spot[data-spot="kel"]').click();
});


// ice

$('#iceTaiwan').on('pause', function () {
  $('.timeout').addClass('flood');
});
$('.timeout__title').on('transitionend', function () {
  if (!$('.timeout').is('.timeout.active.flood')) return false;
  $('.timeout').addClass('textin');
});


//action
$('.action__share .text').on('transitionend', function () {
  if (!$('.action').hasClass('enter') && $('.action').hasClass('active')) $('.action').addClass('enter');
});

$(window).on('resize', function () {
  if ($(window).width() < 992) {
    calSize($('.earth__video'), $('.earth__video video'), 16, 9);
  } else {
    calSize($('.earth__video'), $('.earth__video video'), 9, 16);
  }

});
var campaignUrl = 'https://change.greenpeace.org.tw/2019/ClimateStrike/?utm_campaign=2019-climate&utm_source=facebook&utm_medium=social&utm_content=cta_btn';
var shareurl = 'https://www.facebook.com/share.php?u=' + campaignUrl + '&hashtag=%23%E6%99%82%E9%96%93%E4%B8%8D%E5%A4%9A%E4%BA%86';
$(".share-btn").attr('href', shareurl);


function calSize(container, canvas, w, h) {
  var boxW = container.width();
  var boxH = container.height();
  var newW = boxW;
  var newH = boxW * (h / w);


  console.log(boxW, boxH, newW, newH);
  if (newH < boxH) {
    newH = boxH;
    newW = boxH * (w / h);
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