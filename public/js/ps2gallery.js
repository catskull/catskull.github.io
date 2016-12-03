var i = 1;
var baseurl = "/public/images/ps2/"

function cycle(direction) {
    image = document.getElementById('gallery_image');
    text = document.getElementById('gallery_pos_text');
    subtitle = document.getElementById('gallery_subtitle');
    video = document.getElementById('video');

    if (direction) {
      if (i == 7){
        i = 1;
      }
      else {
        i = i + 1;
      }
    }
    else {
      if (i == 1){
        i = 7;
      }
      else {
        i = i - 1;
      }
    }

    switch (i) {
      case 1:
        hideVideo();
        image.src = baseurl + '1.jpg';
        image.alt = "DMG PS/2 Keyboard Adapter";
        text.innerHTML = "1/7";
        break;

      case 2:
        image.src = baseurl + '2.jpg';
        image.alt = "DMG PS/2 Keyboard Adapter Back"
        text.innerHTML = "2/7";
        break;

      case 3:
        image.src = baseurl + '3.jpg';
        image.alt = "DMG PS/2 Keyboard Adapter Bottom";
        text.innerHTML = "3/7";
        break;

      case 4:
        image.src = baseurl + '4.jpg';
        image.alt = "Inserted into DMG"
        text.innerHTML = "4/7";
        break;
        
      case 5:
        image.src = baseurl + '5.jpg';
        image.alt = "Inserted into DMG"
        text.innerHTML = "5/7";
        break;
        
        
      case 6:
        hideVideo();
        image.src = baseurl + '6.jpg';
        image.alt = "Inserted into DMG"
        text.innerHTML = "6/7";
        break;
      
      case 7:
        showVideo();
        image.alt = "Demonstration Video"
        text.innerHTML = "7/7";
        break;
    }

    subtitle.innerHTML = image.alt;
}

function hideVideo() {
  if (video.style.display != "none") {
    image.style.display = "initial";
    video.style.display = "none";
    video.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
  }
}

function showVideo() {
  if (video.style.display == "none") {
    image.style.display = "none";
    video.style.display = "initial";
  }
}

function toggleVideo(state) {
    // if state == 'hide', hide. Else: show video
    // var div = document.getElementById("popupVid");
    var iframe = video.contentWindow;
    console.log(iframe);
    // div.style.display = state == 'hide' ? 'none' : '';
    func = state == 'hide' ? 'pauseVideo' : 'playVideo';
    iframe.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
}
