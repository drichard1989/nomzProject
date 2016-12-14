
$('#foodSearchButton').on('click', function() {
	var foodItem = $('#foodSearchBox').val();

	 $.ajax({url:"/api/nutrition/" + foodItem, method:"get"}).done(function(response){
            var responseJSON = $.parseJSON(response);
            console.log(responseJSON);
            
            // create the div for the item
			// var item = $('<div class="item" style="width: 100%; clear: both; text-align: center; margin-bottom: 15px;">');
			var itemRow = $('<tr class="itemRow">');

			// create div for the item name
			// var itemName = $('<div class="itemName" style="float: left; width: 40%;">');
			var itemName = $('<td class="itemName">');
			// itemName.append($("<p>"+ foodItem + "</p>"));
			itemName.text(foodItem);
			itemRow.append(itemName);

			// create list for nutrients
			// var itemNutrients = $('<ul class="itemNutrients" style="float: left; width: 25%;">');

			// fat
			// var itemFat = $('<li class="itemFat">');
			var itemFat = $('<td class="itemFat">');
			itemFat.text((Math.round(responseJSON.totalNutrients.FAT.quantity * 100) / 100) + " " + responseJSON.totalNutrients.FAT.unit);
			// itemNutrients.append(itemFat);
			itemRow.append(itemFat);

			// calories
			// var itemCal = $('<li class="itemCal">');
			// itemCal.text("Calories: " + responseJSON.calories);
			var itemCal = $('<td class="itemCal">');
			itemCal.text(responseJSON.calories);
			itemRow.append(itemCal);

			// sugar
			var itemSugar = $('<td class="itemSugar">');
			itemSugar.text((Math.round(responseJSON.totalNutrients.SUGAR.quantity * 100) / 100) + " " + responseJSON.totalNutrients.SUGAR.unit);
			itemRow.append(itemSugar);

			// sodium
			// var itemNA = $('<li class="itemNA">');
			// itemNA.text(responseJSON.totalNutrients.NA.label + ": " + (Math.round(responseJSON.totalNutrients.NA.quantity * 100) / 100) + " " + responseJSON.totalNutrients.NA.unit);
			// itemNutrients.append(itemNA);
			var itemNA = $('<td class="itemNA">');
			itemNA.text((Math.round(responseJSON.totalNutrients.NA.quantity * 100) / 100) + " " + responseJSON.totalNutrients.NA.unit);
			itemRow.append(itemNA);

			// protein
			// var itemProt = $('<li class="itemProt">');
			// itemProt.text(responseJSON.totalNutrients.PROCNT.label + ": " + (Math.round(responseJSON.totalNutrients.PROCNT.quantity * 100) / 100) + " " + responseJSON.totalNutrients.PROCNT.unit);
			// itemNutrients.append(itemProt);
			var itemProt = $('<td class="itemProt">');
			itemProt.text((Math.round(responseJSON.totalNutrients.PROCNT.quantity * 100) / 100) + " " + responseJSON.totalNutrients.PROCNT.unit);
			itemRow.append(itemProt);

			// carbs
			var itemCarbs = $('<td class="itemCarbs">');
			itemCarbs.text((Math.round(responseJSON.totalNutrients.CHOCDF.quantity * 100) / 100) + " " + responseJSON.totalNutrients.CHOCDF.unit);
			itemRow.append(itemCarbs);

			// remove item
			var removeItem = $('<td>');
			var removeButton = $('<button class="btn btn-danger removeItem">');
			removeButton.text("Remove");
			removeItem.append(removeButton);
			itemRow.append(removeItem);

			// append item name and nutrients list to container
			// item.append(itemName).append(itemNutrients);
			$('.table').append(itemRow);

			// prepend 
			// $('#list-container').prepend(item);

			// console.log(response);
			/*console.log(response.totalNutrients.FAT.label + ": " + (Math.round(response.totalNutrients.FAT.quantity * 100) / 100) + " " + response.totalNutrients.FAT.unit);
			console.log("Calories: " + response.calories);
			console.log(response.totalNutrients.NA.label + ": " + (Math.round(response.totalNutrients.NA.quantity * 100) / 100) + " " + response.totalNutrients.NA.unit);
			console.log(response.totalNutrients.PROCNT.label + ": " + (Math.round(response.totalNutrients.PROCNT.quantity * 100) / 100) + " " + response.totalNutrients.PROCNT.unit);
			console.log(response.totalNutrients.CHOCDF.label + ": " + (Math.round(response.totalNutrients.CHOCDF.quantity * 100) / 100) + " " + response.totalNutrients.CHOCDF.unit);*/
        }).fail(function(error){
            console.log(error);
        });
});

$(document).on('click', '.removeItem', function() {
	$(this).parent().parent().remove();
});