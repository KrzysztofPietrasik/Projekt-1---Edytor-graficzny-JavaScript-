var canvas = document.querySelector('canvas');
    canvas.width = this.canvas.scrollWidth;
    canvas.height = this.canvas.scrollHeight;
var context = canvas.getContext('2d');

var mouseIsDown = false;

var imgFile = document.getElementById('img-file');
canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mouseup', mouseUp);
canvas.addEventListener('mousemove', mouseMove);
imgFile.addEventListener('change', uploadImage);

var sliderBrightness = document.getElementById('slider');
var brightness = 100;
sliderBrightness.addEventListener('mousemove', ()=>{
  brightness = sliderBrightness.value;
  context.filter = "brightness(" + brightness + "%)";
  uploadImage();
})

var sliderContrast = document.getElementById('slider2');
var contrast = 100;
sliderContrast.addEventListener('mousemove', ()=>{
  contrast = sliderContrast.value;
  context.filter = "contrast(" + contrast + "%)";
  uploadImage();
})

var sliderSaturate = document.getElementById('slider3');
var saturate = 0;
sliderSaturate.addEventListener('mousemove', ()=>{
  saturate = sliderSaturate.value;
  context.filter = "saturate(" + saturate + "%)";
  uploadImage();
})

var imgName;

  function uploadImage(e){
    try {
      imgName = imgFile.files[0].name;
    } catch (e) {
      return 0;
    }
    const image = new Image;
    image.src = imgName;
    image.onload = () =>{
      context.drawImage(image, canvas.width/4, canvas.height/4);
    }
  }
  function mouseDown(){
    mouseIsDown = true;
  }
  function  mouseUp(){
    mouseIsDown = false;
  }

  function draw(canvasX, canvasY){

    if (mouseIsDown) {
      context.lineTo(canvasX, canvasY);
      context.stroke();
    }
    context.moveTo(canvasX,canvasY);
  }
  function mouseMove(e){
     var rect = this.getBoundingClientRect();
     var canvasX = (e.clientX - rect.left);
     var canvasY = (e.clientY - rect.top);
     draw(canvasX, canvasY);
  }

  function clearCanvasF() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
  var clearCanvas = document.getElementById('clearCanvas');
  clearCanvas.addEventListener('click', clearCanvasF);
