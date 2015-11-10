var i = 1;
var baseurl = "/public/gallery/"

function cycle(direction) {
    image = document.getElementById('gallery_image');
    text = document.getElementById('gallery_pos_text');
    if (direction) {
      if (i == 4){
        i = 1;
      }
      else {
        i = i + 1;
      }
    }
    else {
      if (i == 1){
        i = 4;
      }
      else {
        i = i - 1;
      }
    }

    switch (i) {
      case 1:
        image.src = baseurl + '1.png'
        text.innerHTML = "1/4";
        console.log("case 1");
        break;

      case 2:
        image.src = baseurl + '2.png'
        text.innerHTML = "2/4";
        console.log("case 2");
        break;

      case 3:
        image.src = baseurl + '3.png'
        text.innerHTML = "3/4";
        console.log("case 3");
        break;

      case 4:
        image.src = baseurl + '4.png'
        text.innerHTML = "4/4";
        console.log("case 4");
        break;
    }
    console.log("clicked");
}
