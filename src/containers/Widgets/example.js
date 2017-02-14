const ddd = [];
const viewedTime = 8000;
const showEl = document.getElementById('show');
const arrayEl = document.getElementById('array');

function showArray() {
  arrayEl.innerHTML = JSON.stringify(ddd);
}

function show(text) {
  showEl.innerHTML = text;
}

function showDataOnPage() {
  show('');
  if (ddd.length > 0) {
    const data = ddd.shift();
    show('showed data from array: ' + data);
    setTimeout(showDataOnPage, viewedTime);
  } else {
    setTimeout(showDataOnPage, 500);
  }
}

let counter = 0;

function asyncAdd() {
  counter++;
  ddd.push(counter);
}

// simulate func with ws
setInterval(asyncAdd, 5000);

setInterval(showArray, 500);

showDataOnPage();
