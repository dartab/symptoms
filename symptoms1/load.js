var database;

var config = {
  apiKey: "AIzaSyAiTnVJ8-WOMf3RXemEAW7eS_zjpwCYWmM",
  authDomain: "my-project-2d7e4.firebaseapp.com",
  databaseURL: "https://my-project-2d7e4.firebaseio.com",
  projectId: "my-project-2d7e4",
  storageBucket: "my-project-2d7e4.appspot.com",
  messagingSenderId: "339604456383"
};
firebase.initializeApp(config);
database = firebase.database();


// this variable contains the empty canvas in which all drawings will populate

var t = function(p) {
  var drawing = [];

  p.setup = function() {
    canvas = p.createCanvas(500,500);
    // canvas.parent('canvascontainer');
  }

  p.draw = function() {
    p.background(0);
    p.stroke(255);
    p.strokeWeight(4);
    p.noFill();
    for (var i = 0; i < drawing.length; i++) {
      var path = drawing[i];
      p.beginShape();
      for (var j = 0; j < path.length; j++) {
        p.vertex(path[j].x, path[j].y)
      }
      p.endShape();
    }
  }

  p.setDrawing = function(newDrawing) {
    drawing = newDrawing;
  }
};

// var myp5 = new p5(s, 'canvascontainer');
// new p5(t, 'canvascontainer');


var numDrawings =

//refers to database to get drawings
var ref = database.ref('drawings');

// Loads all sketches in a crude way, refreshing all
// ref.on('value', gotData, errData);
// Loads all sketches a bit more elegantly, one by one
// snapshot contains a single item
ref.on('child_added', function(snapshot) {
  console.log(snapshot, snapshot.key, snapshot.val());
  showDrawing(snapshot.key);
}, errData);

// function gotData(data) {
  // clear the listing
  // var elts = document.querySelectorAll('.p5sketch');
  // for (var i = 0; i < elts.length; i++) {
  //   elts[i].remove();
  // }
  //
  // var drawings = data.val();
  // var keys = Object.keys(drawings);
  // var drawings = data.val().orderByChild();
  // data.forEach(function(childsnapshot){childsnapshot.val()})
  // for (var i = 0; i < keys.length; i++) {
  //   var key = keys[i];
    //console.log(key);

    // var li = p.createElement('li', '');
    // li.class('listing');
    // var ahref = p.createA('#', key);
    // ahref.mousePressed(showDrawing);
    // ahref.parent(li);

    // var perma = p.createA('?id=' + key, 'permalink');
    // perma.parent(li);
    // perma.style('padding', '4px');

    // li.parent('drawinglist');
    // showDrawing(key);
  }
}

function showDrawing(key) {
  //console.log(arguments);

  // getting drawings from the database
  var ref = database.ref('drawings/' + key);
  ref.once('value', oneDrawing, errData);

  function oneDrawing(data) {
    var dbdrawing = data.val();
    // drawing = dbdrawing.drawing;

    var canvasContainer = document.getElementById('canvascontainer');

    // create a container that is attached to the id canvascontainer
    var newDiv = document.createElement('div'); // makes a <div>
    newDiv.classList.add('p5sketch'); // gives it a class
    newDiv.style.display = 'inline-block';

    // canvas element is prepended to the container variable
    canvasContainer.prepend(newDiv); // insert div at the beginning

    // sketch newp5 is created in the container
    var newp5 = new p5(t, newDiv); // insert new p5 in that div

    //class name is p5sketch
    // newp5.canvas.classList.add('p5sketch');

    newp5.setDrawing(dbdrawing.drawing);
    //console.log(drawing);
  }
}



function errData(err) {
  console.log(err);
}


/** Scroll to top button implementation in vanilla JavaScript (ES6 - ECMAScript 6) **/

let intervalId = 0; // Needed to cancel the scrolling when we're at the top of the page
const $scrollButton = document.querySelector('.scroll'); // Reference to our scroll button

function scrollStep() {
    // Check if we're at the top already. If so, stop scrolling by clearing the interval
    if (window.pageYOffset === 0) {
        clearInterval(intervalId);
    }
    window.scroll(0, window.pageYOffset - 200);
}

function scrollToTop() {
    // Call the function scrollStep() every 16.66 millisecons
    intervalId = setInterval(scrollStep, 16.66);
}

// When the DOM is loaded, this click handler is added to our scroll button
$scrollButton.addEventListener('click', scrollToTop);
