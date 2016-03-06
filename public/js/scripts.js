var i = 1;
var baseurl = "/public/gallery/"

function cycle(direction) {
    image = document.getElementById('gallery_image');
    text = document.getElementById('gallery_pos_text');
    subtitle = document.getElementById('gallery_subtitle');

    if (direction) {
      if (i == 8){
        i = 1;
      }
      else {
        i = i + 1;
      }
    }
    else {
      if (i == 1){
        i = 8;
      }
      else {
        i = i - 1;
      }
    }

    switch (i) {
      case 1:
        image.src = baseurl + '1.jpg';
        image.alt = "Arduinoboy front";
        text.innerHTML = "1/8";
        break;

      case 2:
        image.src = baseurl + '2.jpg';
        image.alt = "Arduinoboy back"
        text.innerHTML = "2/8";
        break;

      case 3:
        image.src = baseurl + '3.jpg';
        image.alt = "Unassembled Arduinoboy";
        text.innerHTML = "3/8";
        break;

      case 4:
        image.src = baseurl + '4.jpg';;
        image.alt = "Arduino clone with USB cable"
        text.innerHTML = "4/8";
        break;

      case 5:
        image.src = baseurl + '5.jpg';
        image.alt = "Arduinoboy botton back";
        text.innerHTML = "5/8";
        break;

      case 6:
        image.src = baseurl + '6.jpg';
        image.alt = "Arduinoboy bottom front";
        text.innerHTML = "6/8";
        break;

      case 7:
        image.src = baseurl + '7.jpg';
        image.alt = "Arduinoboy right rear";
        text.innerHTML = "7/8";
        break;

      case 8:
        image.src = baseurl + '8.jpg';
        image.alt = "Arduinoboy left front";
        text.innerHTML = "8/8";
        break;
    }

    subtitle.innerHTML = image.alt;
}
