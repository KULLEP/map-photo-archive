

window.photosLists = [];



 const closeModal = (e) => {
 	document.getElementById('photoModal').style.display = 'none';
 };

 const getModal = (e) => {
 	document.getElementById('photoModal').style.display = 'block';
 	// let json = JSON.stringify(window.photosLists);
 	// console.log(json);
 	console.log(e);
 	let obj_photo = window.photosLists[e];
 	let html_modal = modal(obj_photo);
 	console.log(obj_photo);
 	$('#photoModal').html(html_modal);
 	// $.ajax({
 	// 	type: 'GET',
 	// 	url: 'php/modal.php',
 	// 	data: {id: '123123123123123123132'},
 	// 	success: function(data){
 	// 		$('#photoModal').html(data);
 	// 	}
 	// });


 };



 function getFullPhotos() {
 	$.ajax({
 		dataType: "json",
 		url: 'json_info/list_photos_coords.json',
 		success: function (e) {
 			window.photosLists = e;
 			ymaps.ready(init);
 		}
 	});
 }
 getFullPhotos();



 function init () {
 	var myMap = new ymaps.Map('map', {
 		center: [54.710454, 20.512733],
 		zoom: 11,
 		controls: ['zoomControl']
 	}),
    // Создаем коллекцию.
    myCollection = new ymaps.GeoObjectCollection(),
    // Создаем массив с данными.
    myPoints = window.photosLists;

    // Заполняем коллекцию данными.
    for (var i = 0, l = myPoints.length; i < l; i++) {
    	var point = myPoints[i];
    	myCollection.add(new ymaps.Placemark(
    		point.coords, {
    			balloonContentBody: `
    			<b>${point.name}</b><br/>
    			<hr class="m-1" />
    			<p class="m-1">${point.years} .г</p>
    			<p class="m-1">${point.description}</p>
    			<a onClick='getModal(${point.id})' class="m-1" data-toggle="modal" data-target="#exampleModal" href="javascript:void(0);">Подробнее</a>
    			`
    		},
    		{
    			iconLayout: 'default#image',
    //  iconImageClipRect: [[69,0], [97, 46]],
    iconImageHref: `${point.photo}`,
    //  iconImageSize: [35, 63],
    //  iconImageOffset: [-35, -63]
}
));
    }

    // Добавляем коллекцию меток на карту.
    myMap.geoObjects.add(myCollection);

    // Создаем экземпляр класса ymaps.control.SearchControl
    var mySearchControl = new ymaps.control.SearchControl({
    	options: {
            // Заменяем стандартный провайдер данных (геокодер) нашим собственным.
            provider: new CustomSearchProvider(myPoints),
            // Не будем показывать еще одну метку при выборе результата поиска,
            // т.к. метки коллекции myCollection уже добавлены на карту.
            noPlacemark: true,
            resultsPerPage: 5
        }});

    // Добавляем контрол в верхний правый угол,
    myMap.controls
    .add(mySearchControl, { float: 'right' });
}


// Провайдер данных для элемента управления ymaps.control.SearchControl.
// Осуществляет поиск геообъектов в по массиву points.
// Реализует интерфейс IGeocodeProvider.
function CustomSearchProvider(points) {
	this.points = points;
}

// Провайдер ищет по полю text стандартным методом String.ptototype.indexOf.
CustomSearchProvider.prototype.geocode = function (request, options) {
	var deferred = new ymaps.vow.defer(),
	geoObjects = new ymaps.GeoObjectCollection(),
    // Сколько результатов нужно пропустить.
    offset = options.skip || 0,
    // Количество возвращаемых результатов.
    limit = options.results || 20;

    var points = [];
    // Ищем в свойстве text каждого элемента массива.
    for (var i = 0, l = this.points.length; i < l; i++) {
    	var point = this.points[i];
    	if (point.name.toLowerCase().indexOf(request.toLowerCase()) != -1) {
    		points.push(point);
    	}
    }
    // При формировании ответа можно учитывать offset и limit.
    points = points.splice(offset, limit);
    // Добавляем точки в результирующую коллекцию.
    for (var i = 0, l = points.length; i < l; i++) {
    	var point = points[i],
    	coords = point.coords,
    	name = point.name;
    	years = point.years;
    	description = point.description;

    	geoObjects.add(new ymaps.Placemark(coords, {
    		name: name,
    		description: description,
    		balloonContentBody: '<p>' + description + '</p>',
    		boundedBy: [coords, coords]
    	}));
    }

    deferred.resolve({
        // Геообъекты поисковой выдачи.
        geoObjects: geoObjects,
        // Метаинформация ответа.
        metaData: {
        	geocoder: {
                // Строка обработанного запроса.
                request: request,
                // Количество найденных результатов.
                found: geoObjects.getLength(),
                // Количество возвращенных результатов.
                results: limit,
                // Количество пропущенных результатов.
                skip: offset
            }
        }
    });

    // Возвращаем объект-обещание.
    return deferred.promise();
};

























