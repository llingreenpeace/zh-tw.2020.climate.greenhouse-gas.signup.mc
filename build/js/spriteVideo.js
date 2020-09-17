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
