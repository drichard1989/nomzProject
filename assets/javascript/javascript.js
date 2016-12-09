$(document).ready(function(){


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBEsEbAIqr60HleiXsvIcx-lko9l4Bnp6U",
    authDomain: "nomz-5b99c.firebaseapp.com",
    databaseURL: "https://nomz-5b99c.firebaseio.com",
    storageBucket: "nomz-5b99c.appspot.com",
    messagingSenderId: "655959060095"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#foodSearchButton").on("click", function(){


  	console.log("Button Working");

  	var foodItem = $("#foodSearchBox").val().trim();


  	// Create local "temporary" object for holding food information

  	var newFood = {
  		foodItem: foodItem
  	};



  	// Uploads new food item to the database
  	database.ref().push(newFood);

  	// Logs the information to the console
  	console.log(newFood.foodItem);

  	alert("Your food has been added. Now Ian drinks more wine.");

  	// Clear the search boxes

  	$("#foodSearchButton").val("");

  	return false;
  });



});