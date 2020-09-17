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