
const closeReportBlock = () => {
document.getElementById('reportBlock').style.display = 'none';
};


const drowReportBlock = (e) => {
document.getElementById('reportBlock').style.display = 'block';

var html = `
<div class='col-12 row justify-content-center mb-5 p-0 m-0'>

	<div class='col-12 col-md-6 mt-5'>

		<form action='#' class="p-5 bg-white rounded">
			<h2 class='text-center'>Жалоба</h2>

			<div class='p-0 m-0 col-12 row justify-content-center text-center my-3'>
				<div class='block_photo_report'>
					<img src='${window.photosLists[e].photo}' class="" alt="...">
				</div>
			</div>

			<div class="form-group">
				<label for="exampleFormControlTextarea1">Причина</label>
				<textarea placeholder='Описание причины' class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
			</div>
			<div class="form-check">
				<input type="checkbox" class="form-check-input" id="exampleCheck1">
				<label class="form-check-label" for="exampleCheck1">Нарушение авторских прав</label>
			</div>

			<div class="form-check">
				<input type="checkbox" class="form-check-input" id="exampleCheck1">
				<label class="form-check-label" for="exampleCheck1">Неправильный год</label>
			</div>

			<div class="form-check">
				<input type="checkbox" class="form-check-input" id="exampleCheck1">
				<label class="form-check-label" for="exampleCheck1">Враждебное или оскорбительное фото</label>
			</div>

			<div class='row justify-content-around mt-5'>
				<button onClick='closeReportBlock()' type="submit" class="btn btn-outline-danger">Отмена</button>
				<button type="submit" class="btn btn-outline-success">Отправить</button>
			</div>
		</form>

	</div>

</div>
`;



$('#reportBlock').html(html);
}
