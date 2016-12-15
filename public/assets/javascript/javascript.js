/*$(document).ready(function(){

  // ** copied this section to api.js
  // All Global Variables
  var profilePicUrl;
  var userName;
  var user;
  var userdb;
  var userID ;
  // Variable to Initialize Firebase
  var config = {
    apiKey: "AIzaSyBEsEbAIqr60HleiXsvIcx-lko9l4Bnp6U",
    authDomain: "nomz-5b99c.firebaseapp.com",
    databaseURL: "https://nomz-5b99c.firebaseio.com",
    storageBucket: "nomz-5b99c.appspot.com",
    messagingSenderId: "655959060095"
  };
  // Variable for the user object in Firebase that the food is pushed into. 
  var users = {
    
  };


  // This initializes Firebase
  firebase.initializeApp(config);
  // Creates a variable named firebase for easy reference
  var database = firebase.database();
  // **

// This all pertains to logging in to Google with Authentication
  var provider = new firebase.auth.GoogleAuthProvider();

// This signs in the user when they click on the google sign in button. It also does other things, like shows the sign out button, hides the sign in drop down button, it shows the users image, and display name as well, and also updates a global variable with the current user id so that the food items can be added to their database under their userID
$("#signInDropdown").on("click", "#googleSignInButton", function(){

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      user = result.user;
      profilePicUrl = user.photoURL; 
        userName = user.displayName;
        userID = user.uid;

        console.log("Profile picture URL: " + profilePicUrl);
        console.log("User Name: " + userName);   
        console.log("Consoling 'user': " + user);
        console.log("Consoling 'userID': " + userID);

        if (user) {
          $("#userImage").attr("src", profilePicUrl);
          $("#userThumbnailImage").show();
          $("#userName").html(userName);
          $("#signOutButton").show();
          $("#signInDropdown").hide();

          database.ref().push(users);
          userdb =  database.ref('/users/' + userID);
        };

        console.log("Consoling 'firebaseUser': " + firebaseUser);
        console.log("Consoling 'userObject': " + userObject);
  });
});

$("#navbarParent").on("click", "#signOutButton", function(){

  firebase.auth().signOut().then(function() {
  console.log('Signed Out');
  }, function(error) {
  console.error('Sign Out Error', error);
  });


    $("#userImage").attr("src", "");
    $("#userThumbnailImage").hide();
    $("#userName").html("");
    $("#signOutButton").hide();
    $("#signInDropdown").show();

  

});

//commented this out b/c I copied it to api.js
  // This currently adds the food that is searched for into the database, not in the user section.
  $("#foodSearchButton").on("click", function(){
    // This asks them to enter something if the section is blank when they submit.
    if ($('#foodSearchBox').val().trim() === ""){
      $('#addFoodItemModal').modal();
        }
        // This enters the data into firebase after trimming it.
        else {
          console.log("food button working")
        // the food from the searchox is trimmed and added 
        var foodItem = $("#foodSearchBox").val().trim();
        // Create local "temporary" object for holding food information
        var newFood = {
          foodItem: foodItem
        };

        var fooddb = database.ref('/users/' + userID + '/food/')
        // Uploads new food item to the userID's object (not working)
        fooddb.push(newFood);
        // Logs the information to the console
        console.log("Consoling 'users': " + users);

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
  


}); // closes document.ready*/