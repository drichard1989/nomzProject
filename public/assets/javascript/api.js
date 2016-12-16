$(document).ready(function() {
	var profilePicUrl;
	var userName;
	var user;
	var userdb;
	var userID ;
	var newFood;
	var fooddb;
	var archive;
	var item;

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
				fooddb = database.ref('/users/' + userID + '/food/');
				archive = database.ref('/users/' + userID + '/archive/');
	        };
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
	    profilePicUrl = "";
		userName = "";
		user = "";
		userdb = "";
		userID  = "";
		newFood = "";
		fooddb = "";
		archive = "";
	});

	  // function that triggers the submit button when users hit "enter"
	$("#foodSearchBox").keyup(function(event){
		if(event.keyCode == 13){
		  $("#foodSearchButton").click();
		}
	}); // end function that triggers the submit button when pressing "enter"

	$('#foodSearchButton').on('click', function() {
		// the button was clicked while the box was clicked
		if ($('#foodSearchBox').val().trim() === ""){
			$('#addFoodItemModal').modal();
		}
	    else {
			var foodItem = $('#foodSearchBox').val().trim();
			if ($('tbody').children().length === 1) {
				$('.panel').show();
			}
			 $.ajax({url:"/api/nutrition/" + foodItem, method:"get"})
			 	.done(function(response){
		            var responseJSON = $.parseJSON(response);
		            
		            // create a row for the item
					var itemRow = $('<tr class="itemRow">');

					// create table data for the item name and append it to the row
					var itemName = $('<td class="itemName">');
					itemName.text(foodItem);
					itemRow.append(itemName);

					// fat
					var itemFat = $('<td class="itemFat">');
					if (responseJSON.totalNutrients.FAT) {
						itemFat.text((Math.round(responseJSON.totalNutrients.FAT.quantity * 100) / 100) + " " + responseJSON.totalNutrients.FAT.unit);
					}
					else {
						itemFat.text("0 g");
					}
					itemRow.append(itemFat);

					// calories
					var itemCal = $('<td class="itemCal">');
					if (responseJSON.calories) {
						itemCal.text(responseJSON.calories);
					}
					else {
						itemCal.text("0");
					}
					itemRow.append(itemCal);

					// sugar
					var itemSugar = $('<td class="itemSugar">');
					if (responseJSON.totalNutrients.SUGAR) {
						itemSugar.text((Math.round(responseJSON.totalNutrients.SUGAR.quantity * 100) / 100) + " " + responseJSON.totalNutrients.SUGAR.unit);
					}
					else {
						itemSugar.text("0 g");
					}
					itemRow.append(itemSugar);

					// sodium
					var itemNA = $('<td class="itemNA">');
					if (responseJSON.totalNutrients.NA) {
						itemNA.text((Math.round(responseJSON.totalNutrients.NA.quantity * 100) / 100) + " " + responseJSON.totalNutrients.NA.unit);
					}
					else {
						itemNA.text("0 g");
					}
					itemRow.append(itemNA);

					// protein
					var itemProt = $('<td class="itemProt">');
					if (responseJSON.totalNutrients.PROCNT) {
						itemProt.text((Math.round(responseJSON.totalNutrients.PROCNT.quantity * 100) / 100) + " " + responseJSON.totalNutrients.PROCNT.unit);
					}
					else {
						itemProt.text("0 g");
					}
					itemRow.append(itemProt);

					// carbs
					var itemCarbs = $('<td class="itemCarbs">');
					if (responseJSON.totalNutrients.CHOCDF) {
						itemCarbs.text((Math.round(responseJSON.totalNutrients.CHOCDF.quantity * 100) / 100) + " " + responseJSON.totalNutrients.CHOCDF.unit);
					}
					else {
						itemCarbs.text("0 g");
					}
					itemRow.append(itemCarbs);

					// remove item
					var removeItem = $('<td>');
					var removeButton = $('<button class="btn btn-danger removeItem">');
					removeButton.text("remove");
					removeItem.append(removeButton);
					itemRow.append(removeItem);

					// append item name and nutrients list to container
					$('.table').append(itemRow);

					newFood = {
						foodItem: foodItem,
						itemFat: itemFat.text(),
						itemCarbs: itemCarbs.text(),
						itemCal: itemCal.text(),
						itemNA: itemNA.text(),
						itemSugar: itemSugar.text(),
						itemProt: itemProt.text()
					};
					// fooddb = database.ref('/users/' + userID + '/food/');
					fooddb.push(newFood);
		        }) // end of .done
			 	.fail(function(error){
		            console.log(error);
		        });
	        $("#foodSearchBox").val("");
	    };

	    // Calls the geoSuccess function
		navigator.geolocation.getCurrentPosition(geoSuccess);
		console.log("run");
	    return false;
	});

	if (user) {
		database.ref('/users/' + userID + '/food/').on('child_added', function(snapshot) {
			// item = snapshot.val().name();
			console.log(snapshot.val());
		});
	}

	$(document).on('click', '.removeItem', function() {
		if ($('tbody').children().length === 1) {
			$('.panel').hide();
		}
		// archive = database.ref('/users/' + userID + '/archive/');
		$(this).parent().parent().remove();
	});
});

// This is the BEGINNING of the GOOGLE MAPS API

var startPos;
   
    // This function get's the user's location
var geoSuccess = function(position) {
 		startPos = position;

 		// Upon success this runes the initMap function
 		initMap();
	}; // closes geoSuccess function

var map;
    // This function initiates the map
function initMap() {
	// This takes the user's location and separates the lat and long
	var uLat = startPos.coords.latitude;
	var uLng = startPos.coords.longitude;
	var uluru = {lat: uLat, lng: uLng}
	// Adds the map to the to the html
    map = new google.maps.Map(document.getElementById('map'), {
      center: uluru,
      zoom: 12
    }); // Closes new google.maps function

    // This object creates a marker on the map at the user's location
    // This calls google's library
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

    var marker = new google.maps.Marker({
    	draggable: false,
      	animation: google.maps.Animation.DROP,
    	position: uluru,
    	icon: 'assets/images/greenDot.png',
    	// icon: iconBase + 'parking_lot_maps.png',
    	map: map
    }); // Closes the marker object
   // Calls the in google function to give markers info windows
    infowindow = new google.maps.InfoWindow();

    // This creates the auto search for nearby grocers
    var service = new google.maps.places.PlacesService(map);
    service.textSearch({
      location: uluru,
      radius: 500,
      query: "grocery+store",
      // type: ["grocery_or_supermarket"],
      // keyword: ["grocery"],
      rankBy: google.maps.places.RankBy.PROMINENCE
    }, callback);
}; // closes initMap

    // runs the createMarker function for each serach reult term
function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
    	for (var i = 0; i < 11; i++) {
      		createMarker(results[i]);
    	}; // closes the for statement
    }; // closes the if statement
}; // CLoses the callback function

// This creates a marker for search terms
function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      icon: "assets/images/nomzMapIcon.png",
      animation: google.maps.Animation.DROP,
      position: place.geometry.location
    }); // closes the marker function

    // This is a listener for user clicks to on markers, when clicked it will display marker info
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    }); // closes the event listener
  } // closes the createMarker function