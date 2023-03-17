
const todoList = [];

document.addEventListener("click", function(){
	console.log(todoList); 
	document.getElementById("list").innerHTML = "";
	todoList.forEach(li => createElements(li));
});

window.addEventListener('beforeunload', function () {
	localStorage.setItem('todoList', JSON.stringify(todoList));
});

document.addEventListener('DOMContentLoaded', function() {
	if (JSON.parse(localStorage.getItem('todoList'))) {
		const oldTodo = JSON.parse(localStorage.getItem('todoList'));
		oldTodo.forEach(function (value, index, arr) {
			todoList.push(value);
		});
	}

	todoList.forEach(li => createElements(li));
	if (Array.isArray(todoList[0])) {
		if (todoList[0][0] != "color") {
			todoList.push(["color", '']);
		}
	} else {
		todoList.push(["color", '']);
	}
}, false);

function createElements(element) {
	if (element != false && element != true && element[0] != "color") {

		var ul = document.getElementById("list");
		var li = document.createElement("li");
		var checkbox = document.createElement('input');
			checkbox.type = "checkbox";
			checkbox.id = ul.childElementCount;
			checkbox.onclick = function () {
				console.log(parseInt(this.id));
				if (this.checked) {
					todoList[parseInt(this.id)+1][1] = true;
				} else {
					todoList[parseInt(this.id)+1][1] = false;
				}
			};
			if (element[1] == true) {
				checkbox.checked = true;
			} else {
				checkbox.checked = false;
			}
		var label = document.createElement('label');
			label.setAttribute("for", ul.childElementCount);
			if (element[0] != "color") {
				label.innerText = element[0];
			}
		var sterge = document.createElement('a');
			sterge.innerText = "Delete";
			sterge.id = ul.childElementCount;
			sterge.onclick = function () {
				todoList.splice(parseInt(this.id) + 1, 1);
			};

		li.appendChild(checkbox);
		li.appendChild(label);
		li.appendChild(sterge);
		ul.appendChild(li);
	}
	if (element[0] == "color") {
		document.body.style.backgroundColor = element[1];
	}
}

function changeColor() {
	var bgColor = document.getElementById("bg-color");
	document.body.style.backgroundColor = bgColor.value;

	todoList.forEach(function (value, index, arr) {
		if (value.includes("color") == true) {
			todoList[index][1] = bgColor.value;
		}
	});
}

function createNewElement(todo) {
	var Inputfield = document.getElementById("add-todo");
	var ul = document.getElementById("list");
	var li = document.createElement("li");
	var checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.id = ul.childElementCount;
		checkbox.onclick = function () {
			if (this.checked) {
				todoList[parseInt(this.id)+1][1] = true;
			} else {
				todoList[parseInt(this.id)+1][1] = false;
			}
		};
	var label = document.createElement('label');
		label.setAttribute("for", ul.childElementCount);
		label.innerText = todo;
	var sterge = document.createElement('a');
		sterge.id = ul.childElementCount;
		sterge.onclick = function () {
			todoList.splice(this.id, 0);
		};
		sterge.innerText = "Delete";

	li.appendChild(checkbox);
	li.appendChild(label);
	li.appendChild(sterge);
	ul.appendChild(li);
	Inputfield.value = "";
}

function addNewTodo() {
	var i = 1;
	var todo = document.getElementById("add-todo").value;

	if (todo.length != 0) {
		createNewElement(todo);
		todoList.push([todo, false]);
	}
}
