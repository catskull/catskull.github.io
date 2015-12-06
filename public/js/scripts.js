var i = 1;
var baseurl = "/public/gallery/"

function cycle(direction) {
    image = document.getElementById('gallery_image');
    text = document.getElementById('gallery_pos_text');
    subtitle = document.getElementById('gallery_subtitle');
    
    if (direction) {
      if (i == 12){
        i = 1;
      }
      else {
        i = i + 1;
      }
    }
    else {
      if (i == 1){
        i = 12;
      }
      else {
        i = i - 1;
      }
    }

    switch (i) {
      case 1:
        image.src = baseurl + '1.jpg';
        image.alt = "Arduinoboy front";
        text.innerHTML = "1/12";
        break;

      case 2:
        image.src = baseurl + '2.jpg';
        image.alt = "Arduinoboy back"
        text.innerHTML = "2/12";
        break;

      case 3:
        image.src = baseurl + '3.jpg';
        image.alt = "Unassembled Arduinoboy";
        text.innerHTML = "3/12";
        break;

      case 4:
        image.src = baseurl + '4.jpg';;
        image.alt = "Arduino clone with USB cable"
        text.innerHTML = "4/12";
        break;

      case 5:
        image.src = baseurl + '5.jpg';
        image.alt = "Arduinoboy botton back";
        text.innerHTML = "5/12";
        break;

      case 6:
        image.src = baseurl + '6.jpg';
        image.alt = "Arduinoboy bottom front";
        text.innerHTML = "6/12";
        break;

      case 7:
        image.src = baseurl + '7.jpg';
        image.alt = "Arduinoboy right rear";
        text.innerHTML = "7/12";
        break;

      case 8:
        image.src = baseurl + '8.jpg';
        image.alt = "Arduinoboy left front";
        text.innerHTML = "8/12";
        break;

      case 9:
        image.src = baseurl + '9.jpg';
        image.alt = "Arduinoboy right front with screw terminals";
        text.innerHTML = "9/12";
        break;

      case 10:
        image.src = baseurl + '10.jpg';
        image.alt = "Arduinoboy left front with screw terminals";
        text.innerHTML = "10/12";
        break;

      case 11:
        image.src = baseurl + '11.jpg';
        image.alt = "Arduinoboy left back with screw terminals";
        text.innerHTML = "11/12";
        break;

      case 12:
        image.src = baseurl + '12.jpg';
        image.alt = "Arduinoboy right back with screw terminals";
        text.innerHTML = "12/12";
        break;
    }

    subtitle.innerHTML = image.alt;
}
