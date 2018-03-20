  var config = {
    apiKey: "AIzaSyCaqMrl9SlUhGYaE-1phMCLKYYasLpCy3o",
    authDomain: "train-tracker-28f00.firebaseapp.com",
    databaseURL: "https://train-tracker-28f00.firebaseio.com",
    projectId: "train-tracker-28f00",
    storageBucket: "",
    messagingSenderId: "229494831172"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#firstTrain").val().trim(), "hh:mm").format("X");
    var frequency = $("#frequency").val().trim();
  
    var newTrain = {
      trainName: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
      
    };
  
    database.ref().push(newTrain);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;

     console.log(trainName);
     console.log(destination);
     console.log(firstTrain);
     console.log(frequency);

    
     var diffTime = moment().diff(moment(firstTrain), "minutes");
     var remainder = diffTime % frequency;
     var minutesAway = frequency - remainder;
     var nextTrain = moment().add(minutesAway, "minutes");
     var nextArrival = moment(nextTrain).format("hh:mm a");
  

    $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
  });
  