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


// This all pertains to logging in to Google with Authentication

  var provider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;
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


// Triggers when the auth state change for instance when the user signs-in or signs-out.
FriendlyChat.prototype.onAuthStateChanged = function(user) {
  if (user) { // User is signed in!
    // Get profile pic and user's name from the Firebase user object.
    var profilePicUrl = user.photoURL; // Only change these two lines!
    var userName = user.displayName;   // Only change these two lines!

};




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
  }); // closes the foodSearchButton function

  // function that triggers the submit button when users hit "enter"
  $("#foodSearchBox").keyup(function(event){
    if(event.keyCode == 13){
      $("#foodSearchButton").click();
    }
  }); // end function that triggers the submit button when pressing "enter"
  

});