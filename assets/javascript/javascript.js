$(document).ready(function(){

	var profilePicUrl;
	var userName;
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


// This all pertains to logging in to Google with Authentication

  var provider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;

	  profilePicUrl = user.photoURL; 
      userName = user.displayName;

      console.log(profilePicUrl);
      console.log(userName);   

     
	  // ...
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});



		


  $("#foodSearchButton").on("click", function(){

    if ($('#foodSearchBox').val().trim() === ""){
      $('#addFoodItemModal').modal();
        } else {
          console.log("food button working")
        // the food from the searchox is trimmed and added 

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
  }); // closes the foodSearchButton function

  // function that triggers the submit button when users hit "enter"
  $("#foodSearchBox").keyup(function(event){
    if(event.keyCode == 13){
      $("#foodSearchButton").click();
    }
  }); // end function that triggers the submit button when pressing "enter"
  

});