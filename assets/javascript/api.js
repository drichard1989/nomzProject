
$('#foodSearchButton').on('click', function() {
	// var item = $('#foodSearchBox').val();
	// console.log(item);

	/*var queryURL = "https://api.edamam.com/api/nutrition-data?app_id=dfbc2e6f&app_key=6cdbf16c1252f300621dd8a447663f69&ingr=" + item;

	$.ajax({
		url: queryURL,
		method: 'GET',
		headers: {
			'Access-Control-Allow-Headers': 'x-requested-with, x-requested-by',
			'Access-Control-Allow-Origin': true
		}})
	.done(function(response) {
		console.log(response);
	});*/

	var wafflesAPI = {
		"uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_e5b7941659a8ca7a042fb3cd379ea532",
		"calories": 218,
		"totalWeight": 75,
		"dietLabels": [],
		"healthLabels": [],
		"cautions": [],
		"totalNutrients": {
		"ENERC_KCAL": {
		  "label": "Energy",
		  "quantity": 218.25,
		  "unit": "kcal"
		},
		"FAT": {
		  "label": "Fat",
		  "quantity": 10.575,
		  "unit": "g"
		},
		"FASAT": {
		  "label": "Saturated",
		  "quantity": 2.1495,
		  "unit": "g"
		},
		"FAMS": {
		  "label": "Monounsaturated",
		  "quantity": 2.6407499999999997,
		  "unit": "g"
		},
		"FAPU": {
		  "label": "Polyunsaturated",
		  "quantity": 5.08875,
		  "unit": "g"
		},
		"CHOCDF": {
		  "label": "Carbs",
		  "quantity": 24.674999999999997,
		  "unit": "g"
		},
		"PROCNT": {
		  "label": "Protein",
		  "quantity": 5.925000000000001,
		  "unit": "g"
		},
		"CHOLE": {
		  "label": "Cholesterol",
		  "quantity": 51.75,
		  "unit": "mg"
		},
		"NA": {
		  "label": "Sodium",
		  "quantity": 383.25,
		  "unit": "mg"
		},
		"CA": {
		  "label": "Calcium",
		  "quantity": 191.25,
		  "unit": "mg"
		},
		"MG": {
		  "label": "Magnesium",
		  "quantity": 14.25,
		  "unit": "mg"
		},
		"K": {
		  "label": "Potassium",
		  "quantity": 119.25,
		  "unit": "mg"
		},
		"FE": {
		  "label": "Iron",
		  "quantity": 1.7325,
		  "unit": "mg"
		},
		"ZN": {
		  "label": "Zinc",
		  "quantity": 0.51,
		  "unit": "mg"
		},
		"P": {
		  "label": "Phosphorus",
		  "quantity": 142.5,
		  "unit": "mg"
		},
		"VITA_RAE": {
		  "label": "Vitamin A",
		  "quantity": 48.75,
		  "unit": "µg"
		},
		"VITC": {
		  "label": "Vitamin C",
		  "quantity": 0.30000000000000004,
		  "unit": "mg"
		},
		"THIA": {
		  "label": "Thiamin (B1)",
		  "quantity": 0.19725,
		  "unit": "mg"
		},
		"RIBF": {
		  "label": "Riboflavin (B2)",
		  "quantity": 0.26025,
		  "unit": "mg"
		},
		"NIA": {
		  "label": "Niacin (B3)",
		  "quantity": 1.5547499999999999,
		  "unit": "mg"
		},
		"VITB6A": {
		  "label": "Vitamin B6",
		  "quantity": 0.042,
		  "unit": "mg"
		},
		"FOLDFE": {
		  "label": "Folate (Equivalent)",
		  "quantity": 51,
		  "unit": "µg"
		},
		"VITB12": {
		  "label": "Vitamin B12",
		  "quantity": 0.1875,
		  "unit": "µg"
		}
		},
		"totalDaily": {
		"ENERC_KCAL": {
		  "label": "Energy",
		  "quantity": 10.9125,
		  "unit": "%"
		},
		"FAT": {
		  "label": "Fat",
		  "quantity": 16.26923076923077,
		  "unit": "%"
		},
		"FASAT": {
		  "label": "Saturated",
		  "quantity": 10.7475,
		  "unit": "%"
		},
		"CHOCDF": {
		  "label": "Carbs",
		  "quantity": 8.224999999999998,
		  "unit": "%"
		},
		"PROCNT": {
		  "label": "Protein",
		  "quantity": 11.850000000000001,
		  "unit": "%"
		},
		"CHOLE": {
		  "label": "Cholesterol",
		  "quantity": 17.25,
		  "unit": "%"
		},
		"NA": {
		  "label": "Sodium",
		  "quantity": 15.96875,
		  "unit": "%"
		},
		"CA": {
		  "label": "Calcium",
		  "quantity": 19.125,
		  "unit": "%"
		},
		"MG": {
		  "label": "Magnesium",
		  "quantity": 3.5625,
		  "unit": "%"
		},
		"K": {
		  "label": "Potassium",
		  "quantity": 3.407142857142857,
		  "unit": "%"
		},
		"FE": {
		  "label": "Iron",
		  "quantity": 9.625,
		  "unit": "%"
		},
		"ZN": {
		  "label": "Zinc",
		  "quantity": 3.4,
		  "unit": "%"
		},
		"P": {
		  "label": "Phosphorus",
		  "quantity": 20.357142857142858,
		  "unit": "%"
		},
		"VITA_RAE": {
		  "label": "Vitamin A",
		  "quantity": 5.416666666666667,
		  "unit": "%"
		},
		"VITC": {
		  "label": "Vitamin C",
		  "quantity": 0.5000000000000001,
		  "unit": "%"
		},
		"THIA": {
		  "label": "Thiamin (B1)",
		  "quantity": 13.15,
		  "unit": "%"
		},
		"RIBF": {
		  "label": "Riboflavin (B2)",
		  "quantity": 15.308823529411764,
		  "unit": "%"
		},
		"NIA": {
		  "label": "Niacin (B3)",
		  "quantity": 7.77375,
		  "unit": "%"
		},
		"VITB6A": {
		  "label": "Vitamin B6",
		  "quantity": 2.1,
		  "unit": "%"
		},
		"FOLDFE": {
		  "label": "Folate (Equivalent)",
		  "quantity": 12.75,
		  "unit": "%"
		},
		"VITB12": {
		  "label": "Vitamin B12",
		  "quantity": 3.125,
		  "unit": "%"
		}
		},
		"ingredients": [
		{
		  "text": "waffles",
		  "parsed": [
		    {
		      "quantity": 1,
		      "foodMatch": "waffles",
		      "food": "Waffles, plain, prepared from recipe",
		      "foodId": "Food_18367",
		      "foodURI": "http://www.edamam.com/ontologies/edamam.owl#Food_18367",
		      "weight": 75,
		      "retainedWeight": 75,
		      "nutrients": {
		        "PROCNT": {
		          "label": "Protein",
		          "quantity": 5.925,
		          "unit": "g"
		        },
		        "FAT": {
		          "label": "Total lipid (fat)",
		          "quantity": 10.575,
		          "unit": "g"
		        },
		        "CHOCDF": {
		          "label": "Carbohydrate, by difference",
		          "quantity": 24.675,
		          "unit": "g"
		        },
		        "ENERC_KCAL": {
		          "label": "Energy",
		          "quantity": 218.25,
		          "unit": "kcal"
		        },
		        "CA": {
		          "label": "Calcium, Ca",
		          "quantity": 191.25,
		          "unit": "mg"
		        },
		        "FE": {
		          "label": "Iron, Fe",
		          "quantity": 1.7325,
		          "unit": "mg"
		        },
		        "MG": {
		          "label": "Magnesium, Mg",
		          "quantity": 14.25,
		          "unit": "mg"
		        },
		        "P": {
		          "label": "Phosphorus, P",
		          "quantity": 142.5,
		          "unit": "mg"
		        },
		        "K": {
		          "label": "Potassium, K",
		          "quantity": 119.25,
		          "unit": "mg"
		        },
		        "NA": {
		          "label": "Sodium, Na",
		          "quantity": 383.25,
		          "unit": "mg"
		        },
		        "ZN": {
		          "label": "Zinc, Zn",
		          "quantity": 0.5100000000000001,
		          "unit": "mg"
		        },
		        "VITA_RAE": {
		          "label": "Vitamin A, RAE",
		          "quantity": 48.75,
		          "unit": "µg"
		        },
		        "VITC": {
		          "label": "Vitamin C, total ascorbic acid",
		          "quantity": 0.3,
		          "unit": "mg"
		        },
		        "THIA": {
		          "label": "Thiamin",
		          "quantity": 0.19725,
		          "unit": "mg"
		        },
		        "RIBF": {
		          "label": "Riboflavin",
		          "quantity": 0.26025,
		          "unit": "mg"
		        },
		        "NIA": {
		          "label": "Niacin",
		          "quantity": 1.5547499999999999,
		          "unit": "mg"
		        },
		        "VITB6A": {
		          "label": "Vitamin B-6",
		          "quantity": 0.042,
		          "unit": "mg"
		        },
		        "VITB12": {
		          "label": "Vitamin B-12",
		          "quantity": 0.1875,
		          "unit": "µg"
		        },
		        "FOLDFE": {
		          "label": "Folate, DFE",
		          "quantity": 51,
		          "unit": "µg"
		        },
		        "CHOLE": {
		          "label": "Cholesterol",
		          "quantity": 51.75,
		          "unit": "mg"
		        },
		        "FASAT": {
		          "label": "Fatty acids, total saturated",
		          "quantity": 2.1495,
		          "unit": "g"
		        },
		        "FAMS": {
		          "label": "Fatty acids, total monounsaturated",
		          "quantity": 2.6407499999999997,
		          "unit": "g"
		        },
		        "FAPU": {
		          "label": "Fatty acids, total polyunsaturated",
		          "quantity": 5.08875,
		          "unit": "g"
		        }
		      },
		      "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_unit"
		    }
		  ]
		}
		]
	};
	console.log(wafflesAPI);
	console.log(wafflesAPI.totalNutrients.FAT.label + ": " + (Math.round(wafflesAPI.totalNutrients.FAT.quantity * 100) / 100) + " " + wafflesAPI.totalNutrients.FAT.unit);
	console.log("Calories: " + wafflesAPI.calories);
	console.log("Sodium: " + wafflesAPI.totalNutrients.NA.label + ": " + (Math.round(wafflesAPI.totalNutrients.NA.quantity * 100) / 100) + " " + wafflesAPI.totalNutrients.NA.unit);
	console.log("Protein: " + wafflesAPI.totalNutrients.PROCNT.label + ": " + (Math.round(wafflesAPI.totalNutrients.PROCNT.quantity * 100) / 100) + " " + wafflesAPI.totalNutrients.PROCNT.unit);
	console.log("Carbs: " + wafflesAPI.totalNutrients.CHOCDF.label + ": " + (Math.round(wafflesAPI.totalNutrients.CHOCDF.quantity * 100) / 100) + " " + wafflesAPI.totalNutrients.CHOCDF.unit);

});