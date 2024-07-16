const resizer = document.getElementById('resizer');
const leftPane = document.getElementById('left-pane');
const rightPane = document.getElementById('right-pane');
const volume = document.getElementById('volume');
const musicSection = document.querySelector('.music-player');
const maxPlayer = document.getElementById('maxi');
const minPlayer = document.getElementById('mini');

const filterObject = {
  "buttonAll": "all",
  "buttonMusic": "music",
  "buttonPodcast": "podcast"
}

resizer.addEventListener('mousedown', function (e) {
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  function onMouseMove(e) {
    const containerWidth = leftPane.parentElement.getBoundingClientRect().width;
    const newLeftWidth = e.clientX;

    if (newLeftWidth >= 250 && newLeftWidth <= 500) {
      leftPane.style.width = `${newLeftWidth}px`;
      rightPane.style.width = `${containerWidth - newLeftWidth - resizer.offsetWidth}px`;
    }
    if(newLeftWidth < 300){
      leftPane.style.fontSize = 'small';
      document.querySelector('.icons')[0].style.gap = '50%';
    }
    else if (newLeftWidth < 350) {
      leftPane.style.fontSize = 'smaller';
      document.querySelector('.icons')[0].style.gap = '50%';
    }else {
      leftPane.style.fontSize = ''; 
      document.querySelector('.icons')[0].style.gap = '100%';
    }
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
});

function toggleVolume(){
  const volume = document.querySelector('#volume');
  const mute = document.querySelector('.fa-volume-xmark');
  const unmute = document.querySelector('.fa-volume-high');
  if(volume.value==0){
    volume.value = 100;
    mute.style.display = "block";
    unmute.style.display = "none";
  }else{
    volume.value = 0;
    mute.style.display = "none";
    unmute.style.display = "block";
  }
}

function showDiv(id){
  if(id==='all'){
    document.getElementById('all1').style.display = "block";
    document.getElementById('all2').style.display = "block";
  }else{
    document.getElementById(id).classList.remove('hidden');
    document.getElementById(id).classList.add(id);
  }
}

function hideDiv(id){
  if(id==='all'){
    document.getElementById('all1').style.display = "none";
    document.getElementById('all2').style.display = "none";
  }else{
    document.getElementById(id).classList.remove(id);
    document.getElementById(id).classList.add('hidden');
  }
}

function showMusicPlayer(){
  maxPlayer.style.display = 'none';
  minPlayer.style.display = 'block';
  musicSection.classList.add('maximize-music-player');
}

function hideMusicPlayer(){
  maxPlayer.style.display = 'block';
  minPlayer.style.display = 'none';
  musicSection.classList.remove('maximize-music-player');
}

function toggleButtonMode(details){
  const buttonList = details.parentElement.getElementsByTagName('button');
  var currMode = details.classList[0];
  var otherMode; var currId = details.id;
  if(currMode==='light-button'){
    otherMode = 'dark-button';
    return;
  }else{
    otherMode = 'light-button';
  }
  for(var i=0;i<buttonList.length;i++){
    var otherId = buttonList[i].id;
    if(otherId != currId){
      document.getElementById(otherId).classList.remove(otherMode);
      document.getElementById(otherId).classList.add(currMode);
      hideDiv(filterObject[otherId]);
    }else{
      details.classList.remove(currMode);
      details.classList.add(otherMode);
      showDiv(filterObject[currId]);
    }
  }
}


document.addEventListener('DOMContentLoaded', (event) => {
  const notificationIcon = document.querySelector('#noticeIcon');
  const notificationPopup = document.getElementById('notificationPopup');
  const closeBtn = document.getElementById('closeBtn');
  const profileIcon = document.getElementById('profileIcon');
  const profilePanel = document.getElementById('profilePanel');
  const cancelBtn = document.getElementById('cancelBtn');

  profileIcon.addEventListener('click', () => {
    profilePanel.classList.add('visible');
  });
  cancelBtn.addEventListener('click', () => {
    profilePanel.classList.remove('visible');
  });
  
  notificationIcon.addEventListener('click', () => {
    notificationPopup.classList.add('visible');
  });
  closeBtn.addEventListener('click', () => {
    notificationPopup.classList.remove('visible');
  });
  
  document.addEventListener('click', (event) => {
    if (!profilePanel.contains(event.target) && !profileIcon.contains(event.target)) {
      profilePanel.classList.remove('visible');
    }
    if (!notificationPopup.contains(event.target) && !notificationIcon.contains(event.target)) {
      notificationPopup.classList.remove('visible');
    }
  });
});
