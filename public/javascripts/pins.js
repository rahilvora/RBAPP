$(document).ready(() =>{
	$('#submit').click((event) => {
		$.get('/getPins')
			.done((rows) =>{
				generatePinCards(rows[0].data)
			})
			.fail((error) => {
				alert("Unable to fetch users");
			})
		event.preventDefault();
	})



	const generatePinCards = (data) => {
		let pins = data.pins;
		let pinBoard = $("#pinboard")
		let htmlString = "";
		for(let index in pins){
   			let tempString = "<div class='card' style='width: 18rem;'><img class='card-img-top' src='"+pins[index]['images']['237x']['url']+"'"+
   							"alt='Card image cap'><div class='card-body'><h5 class='card-title'>"+pins[index].domain+"</h5>"+
   							"<p class='card-text'>"+pins[index].description+"</p>"+
   							"<a href="+pins[index].link+" class='btn btn-primary'>Go</a></div></div>"
			htmlString += tempString;
		}
		pinBoard.append(htmlString);
	}
})