// These are the real estate listings that will be shown to the user.
var locations = [{
		title: '432 Park Avenue',
		location: {
			lat: 40.7713024,
			lng: -73.9632393
		},
		id: 0
	},
	{
		title: 'Chelsea Loft',
		location: {
			lat: 40.7444883,
			lng: -73.9949465
		},
		id: 1
	},
	{
		title: 'Union Square Open Floor Plan',
		location: {
			lat: 40.7347062,
			lng: -73.9895759
		},
		id: 2
	},
	{
		title: 'East Village Hip Studio',
		location: {
			lat: 40.7281777,
			lng: -73.984377
		},
		id: 3
	},
	{
		title: 'TriBeCa Artsy Bachelor Pad',
		location: {
			lat: 40.7195264,
			lng: -74.0089934
		},
		id: 4
	},
	{
		title: 'Chinatown Homey Space',
		location: {
			lat: 40.7180628,
			lng: -73.9961237
		},
		id: 5
	}
];


// put the model here	
var myModel = function (data, ind) {
	this.title = ko.observable(data.title);
	this.location = ko.observable(data.location);
	this.index = ind;
};


var ViewModel = function () {
	//  making pointer, self represents the viewmodel. 
	var self = this;

	this.location_List = ko.observableArray([]);

	locations.forEach(function (Item, index) {
		self.location_List.push(new myModel(Item, index));
	});

	this.current_location = ko.observable(this.location_List()[0]);

	this.set_location = function (place) {
		//console.log(place);
		populateInfoWindow(markers[place.id]);

		// 	this.visiblemarker = ko.computed(function() {
		// 	if(this.current_location) {
		// 				console.log('hi');
		// 		// To add the marker to the map, call setMap();
		// 		this.marker.setMap(map);
		// 	} else {
		// 		// To remove the marker from the map.
		// 		this.marker.setMap(null);
		// 	}
		// 	return current_location;
		// }, this);
	};


	//filters locations.
	this.filter = ko.observable("");
	this.visiblePlaces = ko.computed(function () {
		var filter = self.filter().toLowerCase();
		if (!filter) {
			ko.utils.arrayForEach(locations, function (item) {});
			return locations;
		} else {
			return ko.utils.arrayFilter(locations, function (item) {
				var result = item.title.toLowerCase().indexOf(filter) > -1;
				return result;
			});
		}
	});
};

// This makes Knockout get to work
ko.applyBindings(new ViewModel());