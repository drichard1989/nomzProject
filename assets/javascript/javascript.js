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

    if ($('#foodSearchBox').val().trim() === ""){
      $('#addFoodItemModal').modal();
        } else {
          console.log("food button working")
        // the animal from the textbox is then added to our array

        var foodItem = $("#foodSearchBox").val().trim();


        // Create local "temporary" object for holding food information

        var newFood = {
          foodItem: foodItem
        };

        // Uploads new food item to the database
        database.ref().push(newFood);

        // Logs the information to the console
        console.log(newFood.foodItem);
        } 

  	     // Clear the search boxes

  	   $("#foodSearchBox").val("");

  	return false;
  });

  // // function that triggers the submit button when users hit "enter"
  $("#foodSearchBox").keyup(function(event){
    if(event.keyCode == 13){
      $("#foodSearchButton").click();
    }
  });
  // end function that triggers the submit button when pressing "enter"

});