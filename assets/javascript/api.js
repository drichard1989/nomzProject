$('#foodSearchButton').on('click', function() {
	var item = $('#foodSearchBox').val();
	consol.log(item);

	var queryURL = "https://api.edamam.com/api/nutrition-data?app_id=dfbc2e6f&app_key=6cdbf16c1252f300621dd8a447663f69&ingr=" + item;

	$.ajax({
		url: queryURL,
		method: 'GET'})
	.done(function(response) {
		console.log(response);
	});
});