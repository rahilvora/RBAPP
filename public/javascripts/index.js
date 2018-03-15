$(document).ready(() =>{
	const responseTable = $('#responseTable').hide()
	const responseBody = $('#responseBody')
	const updtateButton = "<td><Button class='btn btn-primary' id='update'> Update</Button></td>"
	const deleteButton = "<td><Button class='btn btn-danger' id='delete'> Delete</Button></td>"
	$('#submit').click((event) => {
		event.preventDefault();
		const userData = $('form').serializeArray()
		const body = {}
		$.each(userData, (i, field) => {
			body[field.name] =  field.value
		})
		console.log(JSON.stringify(body));
		postUserData(event, body);
	})

	$('#responseTable').click((event) => {
		if(event.target.id == 'update'){
			updateUser(event);
		}
		if(event.target.id == 'delete'){
			deleteUser(event);
		}
		event.preventDefault();
	})

	const updateUser = (event) => {
		debugger;
		const row = $(event.target).parents('tr')[0];
		const rowId = row.firstChild.textContent;
		const childNodes = row.childNodes;
		let body = {}

		for(let child in childNodes){
			console.log(child);
		}
	}

	const deleteUser = (event) =>{
		console.log("delete called");
		const row = $(event.target).parents('tr:first')[0];
		const rowId = row.firstChild.textContent;
		$.ajax({
				url: "/deleteUser",
				type: 'DELETE',
				data: {'id':rowId}
			}).done((response) => {
				row.remove();
			}).fail((error) => {
				alert("Unable to delete user");
			});
	}
	const generateTable = (rows) => {
		responseTable.show();
		let htmlString = "";
		for(let row in rows){
			let tempString = "<tr>"
			console.log(rows[row]);
			let isId = true;
			for( let key in rows[row]){
				console.log(key)
				if(isId){
					tempString += "<td name="+key+" value=''>" + rows[row][key] + "</td>";
					isId = false;	
				}
				else{
					tempString += "<td name="+key+" value='' contenteditable='true'>" + rows[row][key] + "</td>";
				}
				
			}
			tempString += updtateButton + deleteButton;
			tempString += "/tr>";
			htmlString += tempString;
		}
		responseBody.append(htmlString);
	}

	const getUsers = () => {
		$.get("/getUsers")
			.done((rows) =>{
				if(rows.length >0)
					generateTable(rows);
				else{

				}
			})
			.fail((error) => {
				alert("Unable to fetch users");
			})
	}
	getUsers()

	const postUserData = (event, body) =>{
		$.post("/addUser", body)
			.done((response) =>{

			})
			.fail((error) =>{
				alert(error.status + " " + error.statusText);
			})
	}
})