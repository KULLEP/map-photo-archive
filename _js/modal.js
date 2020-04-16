// $("#sel_years").change(() => {
// 		//jQuery(".advance").show();
// 		console.log(12312312312);
// 	});


const getPhotoByID = (e) => {
getModal(e.value);
}


const modal = (get_info_photo) => {
var obj_photo = get_info_photo;
var left_photo_list = '';
for (let i = 0; i < 9; i++) {
let rand = Math.random().toFixed(0);
left_photo_list += `
<div class='block_photo' onClick='getModal(${window.photosLists[rand].id})'>
	<img src="${window.photosLists[rand].photo}" alt="...">
</div>
`;
}
var photosYears = '';
for (let i = 0; i < window.photosLists.length; i++) {
if(get_info_photo.metka === window.photosLists[i].metka && get_info_photo.name !== window.photosLists[i].name) {
photosYears += `<option value='${window.photosLists[i].id}'>${window.photosLists[i].years}</option>`;
}
}


var html = `
<div class='col-12 mt-4 m-0 row justify-content-center'>
	<div class="col-12 col-md-3 mb-4">
		<button onClick='closeModal()' style="background-color: #fff; height: 50px; width: 50px;opacity: 1; color: #000;" type="button" class=" ml-3 rounded close float-left" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
	</div>

	<div class="col-12 col-md-6">
		<p class="h2 m-1 text-center text-white">${obj_photo.name}</p>
	</div>

	<div class="col-12 col-md-3 mt-4 mt-md-0 p-0">
		<div class="col-12 col-md-10 card">
			<div class="p-0 card-body">
				<h5 class="card-title">${window.infoAuthor.first_name} ${window.infoAuthor.last_name}</h5>
				<div class='col-12 row justify-content-center m-0 p-0'>
					<div class='h-70-px col-4 text-center'>
						<a href="#" class='h3' title='Нравится'><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></a>
						<p>${obj_photo.like}</p>
					</div>
					<div class='h-70-px col-4 text-center'>
						<a href="#" class='h2' title='Не нравится'><i class="fa fa-thumbs-o-down" aria-hidden="true"></i></a>
						<p>${obj_photo.dislike}</p>
					</div>
					<div class='h-70-px col-4 text-center'>
						<a href="#" class='h2' title='Другие работы автора'><i class="fa fa-list-ul" aria-hidden="true"></i></a>
						<p>${window.infoAuthor.photos}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>


<div class="pt-5 p-0 m-0 col-12 row justify-content-center">

	<div class="col-12 col-md-2 text-center p-0">		
		${left_photo_list}
		<input class="mt-5 btn btn-outline-light" type="submit" value="Полный список">
	</div>

	<div class="col-12 col-md-7 px-md-3 px-0 mt-3 mt-md-0">
		<div class='overflow-hidden h-360-px'>
			<img src='${obj_photo.photo}' class="img-cover rounded float-sm-left" alt="...">
		</div>	
	</div>

	<div class="col-12 col-md-2 mb-5 mb-md-0 text-center">
		<div class="mb-2 h-75 overflow-auto-my  bg-white rounded">
			<span>
				${obj_photo.description}
			</span>
		</div>
		<div>
			<select onChange='getPhotoByID(this)' id='sel_years' class="form-control form-control-sm">
				<option value='${obj_photo.id}'>${obj_photo.years}</option>
				<option>${photosYears}</option>
			</select>
		</div>
	</div>
</div>

<div class='col-12 text-center'>
	<input class="float-unset btn btn-outline-light" type="submit" value="Комментарии">
	<a onClick='drowReportBlock(${obj_photo.id})' href="javascript:void(0);" class="float-right btn btn-outline-danger">Жалоба</a>
</div>


`;

return html;
}
