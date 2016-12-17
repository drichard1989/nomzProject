$(document).ready(function() {
	// intialize the global variables
	var profilePicUrl;
	var userName;
	var user;
	// Variable for the user object in Firebase that the food is pushed into.
	var users = {

	};
	var userdb;
	var userID;
	var newFood;
	var fooddb;
	var item;
	var signedIn = false;
	var userMap = false;

	// Variable to Initialize Firebase
	var config = {
		apiKey: "AIzaSyBEsEbAIqr60HleiXsvIcx-lko9l4Bnp6U",
		authDomain: "nomz-5b99c.firebaseapp.com",
		databaseURL: "https://nomz-5b99c.firebaseio.com",
		storageBucket: "nomz-5b99c.appspot.com",
		messagingSenderId: "655959060095"
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

		    // set signedIn to true
		    signedIn = true;

		    // display user info on nav
			$("#userImage").attr("src", profilePicUrl);
			$("#userThumbnailImage").show();
			$("#userName").html(userName);
			$("#signOutButton").show();
			$("#signInDropdown").hide();

			// create assign references to firebase nodes 
			database.ref().push(users);
			userdb =  database.ref('/users/' + userID);
			fooddb = database.ref('/users/' + userID + '/food/');

			// event listener that waits for an item to be added to the current user's food database
	        database.ref('/users/' + userID + '/food/').on('child_added', function(snapshot) {
	        	// create a jQuery row element with class itemRow and data-key attribute with the key for the added item 
				var itemRow = $('<tr class="itemRow" data-key="' + snapshot.key + '">');

				// create table data for the item name and append it to the row
				var itemName = $('<td class="itemName">');
				itemName.text(snapshot.val().foodItem);
				itemRow.append(itemName);

				// fat
				var itemFat = $('<td class="itemFat">');
				itemFat.text(snapshot.val().itemFat);
				itemRow.append(itemFat);

				// calories
				var itemCal = $('<td class="itemCal">');
				itemCal.text(snapshot.val().itemCal);
				itemRow.append(itemCal);

				// sugar
				var itemSugar = $('<td class="itemSugar">');
				itemSugar.text(snapshot.val().itemSugar);
				itemRow.append(itemSugar);

				// sodium
				var itemNA = $('<td class="itemNA">');
				itemNA.text(snapshot.val().itemNA);
				itemRow.append(itemNA);

				// protein
				var itemProt = $('<td class="itemProt">');
				itemProt.text(snapshot.val().itemProt);
				itemRow.append(itemProt);

				// carbs
				var itemCarbs = $('<td class="itemCarbs">');
				itemCarbs.text(snapshot.val().itemCarbs);
				itemRow.append(itemCarbs);

				// remove item
				var removeItem = $('<td>');
				var removeButton = $('<button class="btn btn-danger removeItem">');
				removeButton.text("remove");
				removeItem.append(removeButton);
				itemRow.append(removeItem);

				/*
					if the table contains at least 1 item
					the length of tbody will be 1 when the table only contains the header row
				*/
				if ($('tbody').children().length > 1) {
					// append item name and nutrients list to the table above all other items, but below the header row
					$('#headerRow').after(itemRow);
					// this displays the table and the map panels
					$('.panel').show();

					// if the user has just loaded the page
					if (!userMap) {
						// Calls the geoSuccess function and sets userMap to true
						navigator.geolocation.getCurrentPosition(geoSuccess);
						userMap = true;
					}
				}
				// if the table only contains 
				/*else {
					// append item name and nutrients list to container
					$('.table').append(itemRow);
				}*/
			});
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
	    // reset global vars
	    profilePicUrl = "";
		userName = "";
		user = "";
		userdb = "";
		userID  = "";
		newFood = "";
		fooddb = "";
		signedIn = false;
		userMap = false;
		$('tr.itemRow').each(function() {
			$(this).remove();
		});
		$('#map').empty();
		$('.panel').hide();
	});

	  // function that triggers the submit button when users hit "enter"
	$("#foodSearchBox").keyup(function(event){
		if(event.keyCode == 13){
		  $("#foodSearchButton").click();
		}
	}); // end function that triggers the submit button when pressing "enter"

	$('#foodSearchButton').on('click', function() {
		if (signedIn) {
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

						// create table data for the item name and append it to the row
						var itemName = foodItem;

						// fat
						if (responseJSON.totalNutrients.FAT) {
							var itemFat = (Math.round(responseJSON.totalNutrients.FAT.quantity * 100) / 100) + " " + responseJSON.totalNutrients.FAT.unit;
						}
						else {
							var itemFat = "0 g";
						}

						// calories
						if (responseJSON.calories) {
							var itemCal = responseJSON.calories;
						}
						else {
							var itemCal = "0";
						}

						// sugar
						if (responseJSON.totalNutrients.SUGAR) {
							var itemSugar = (Math.round(responseJSON.totalNutrients.SUGAR.quantity * 100) / 100) + " " + responseJSON.totalNutrients.SUGAR.unit;
						}
						else {
							var itemSugar = "0 g";
						}

						// sodium
						if (responseJSON.totalNutrients.NA) {
							var itemNA = (Math.round(responseJSON.totalNutrients.NA.quantity * 100) / 100) + " " + responseJSON.totalNutrients.NA.unit;
						}
						else {
							var itemNA = "0 g";
						}

						// protein
						if (responseJSON.totalNutrients.PROCNT) {
							var itemProt = (Math.round(responseJSON.totalNutrients.PROCNT.quantity * 100) / 100) + " " + responseJSON.totalNutrients.PROCNT.unit;
						}
						else {
							var itemProt = "0 g";
						}

						// carbs
						if (responseJSON.totalNutrients.CHOCDF) {
							var itemCarbs = (Math.round(responseJSON.totalNutrients.CHOCDF.quantity * 100) / 100) + " " + responseJSON.totalNutrients.CHOCDF.unit;
						}
						else {
							var itemCarbs = "0 g";
						}

						newFood = {
							foodItem: foodItem,
							itemFat: itemFat,
							itemCarbs: itemCarbs,
							itemCal: itemCal,
							itemNA: itemNA,
							itemSugar: itemSugar,
							itemProt: itemProt
						};

						fooddb.push(newFood);

			        }) // end of .done
				 	.fail(function(error){
			            console.log(error);
			        });
		        $("#foodSearchBox").val("");
		    };
	    }
	    else {
	    	console.log("Sorry, you're not signed in. Please sign in to add an item to your list");
	    }

	    return false;
	});


	$(document).on('click', '.removeItem', function() {
		var key = $(this).parent().parent().attr('data-key');
		fooddb.child(key).remove();
		$(this).parent().parent().remove();
		if ($('tbody').children().length === 1) {
			$('.panel').hide();
		}
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

}); 