var foreground = null;
var background = null;
var fcanvas;
var bcanvas;

function foreupload(){
  var fileinput = document.getElementById("fore");
  foreground = new SimpleImage(fileinput);
  fcanvas = document.getElementById("can1");
  //fcanvas.style.backgroundColor="limegreen";
  foreground.drawTo(fcanvas);
  alert("Uploaded foreground image successfully!");
}

function backupload(){
  var fileinput = document.getElementById("back");
  background = new SimpleImage(fileinput);
  bcanvas = document.getElementById("can2");
  //bcanvas.style.backgroundColor="white";
  background.drawTo(bcanvas);
  alert("Uploaded background image successfully!");
}

function clearCanvas() {
  doClear(fcanvas);
  doClear(bcanvas);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}

function composite(){
  if(foreground === null || ! foreground.complete()) {
    alert("foreground not loaded!");
    return;
  }
  
  if(background === null || ! background.complete()) {
    alert("background not loaded!");
    return;
  }
  
  clearCanvas();
  
  var output = new SimpleImage(foreground.getWidth(), foreground.getHeight());
  for(var pixel of foreground.values()){
    var x = pixel.getX();
    var y = pixel.getY();
    if(pixel.getGreen() > pixel.getRed() + pixel.getBlue()) {
      var bgPixel = background.getPixel(x, y);
      output.setPixel(x, y, bgPixel);
    }
    else {
      output.setPixel(x, y, pixel);
    }
  }
 
  //fcanvas.style.backgroundColor="limegreen";
  output.drawTo(fcanvas);
}