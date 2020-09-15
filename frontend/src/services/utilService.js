export default {
  makeRndChannel,
  setSortBy,
  setAlertMessage,
  _toggleAlertMsg
}

//Tel aviv location default
export const DEFAULT_LAT = 32.073582;
export const DEFAULT_LNG = 34.788052;

function makeRndChannel(length = 9) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt;
}

async function setAlertMessage(msg, updateUserAlertMsg) {
  if (!document.querySelector('.alert-box').classList.contains('open')) {
    await updateUserAlertMsg(msg);
    _toggleAlertMsg();
    await setTimeout(_toggleAlertMsg, 3000, true);
  }
}



function setSortBy(postsToShow, sortBy) {
  switch (sortBy) {
    case ('random'):
      return _shuffle(postsToShow);
    case ('popular'):
      return _sortByPopular(postsToShow)

    default:
      return postsToShow;
  }
}


function _sortByPopular(posts) {
  return posts.sort((a, b) => {
    if (a.likes > b.likes) return -1;
    if (a.likes < b.likes) return 1;
    if (a.likes === b.likes) return 0;
  })
}


function _shuffle(arr) {
  let temp;
  let shuffleArr = arr.slice();
  for (let i = 0; i < shuffleArr.length; i++) {
    const rndNum = _getRndInt(0, arr.length);
    temp = shuffleArr[i];
    shuffleArr[i] = shuffleArr[rndNum];
    shuffleArr[rndNum] = temp;
  }
  return shuffleArr;
}

//Without the Max Value
function _getRndInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function _toggleAlertMsg(isCallFromTimeout = false) {
  const elAlertBox = document.querySelector('.alert-box');
  if (isCallFromTimeout && !elAlertBox.classList.contains('open')) return;
  elAlertBox.classList.toggle('open');
}
