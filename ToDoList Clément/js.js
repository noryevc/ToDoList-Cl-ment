window.alert("Hello Géna");

console.log("Afficher du texte dans la console Js du navigateur");
console.log("...");
console.log("lol");


var taskInput=document.getElementById("nouvelle-tache");
var addButton=document.getElementsByTagName("button")[0];
var incompleteTaskHolder=document.getElementById("tache-en-cours");
var completedTasksHolder=document.getElementById("tache-finis");

var createNewTaskElement=function(taskString){

	var listItem=document.createElement("li");

	var checkBox=document.createElement("input");
	var label=document.createElement("label");
	var EditerInput=document.createElement("input");
	var EditerButton=document.createElement("button");
	var SupprimerButton=document.createElement("button");

	label.innerText=taskString;

	checkBox.type="checkbox";
	EditerInput.type="text";

	EditerButton.innerText="Editer";
	EditerButton.className="Editer";
	SupprimerButton.innerText="Supprimer";
	SupprimerButton.className="Supprimer";

	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(EditerInput);
	listItem.appendChild(EditerButton);
	listItem.appendChild(SupprimerButton);
	return listItem;
}



var addTask=function(){
	console.log("Ajouter une Tâche...");
	var listItem=createNewTaskElement(taskInput.value);
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
	taskInput.value="";
}

var EditerTask=function(){
console.log("Tâche Modifiée...");
console.log("Change 'Editer' to 'save'");

var listItem=this.parentNode;
var EditerInput=listItem.querySelector('input[type=text]');
var label=listItem.querySelector("label");
var containsClass=listItem.classList.contains("Mode-Edition");

		if(containsClass){
			label.innerText=EditerInput.value;
		}

		else{
			EditerInput.value=label.innerText;
		}
		listItem.classList.toggle("Mode-Edition");
}

var SupprimerTask=function(){
		console.log("Tâche terminée...");

		var listItem=this.parentNode;
		var ul=listItem.parentNode;
		ul.removeChild(listItem);
}

var taskCompleted=function(){
		console.log("Tâche terminée...");

	var listItem=this.parentNode;
	completedTasksHolder.appendChild(listItem);
				bindTaskEvents(listItem, taskIncomplete);

}

var taskIncomplete=function(){
		console.log("Tâche en cours...");

		var listItem=this.parentNode;
	incompleteTaskHolder.appendChild(listItem);
			bindTaskEvents(listItem,taskCompleted);
}

var ajaxRequest=function(){
	console.log("AJAX Request");
}

addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
	console.log("lier les événements d'éléments de la liste");

	var checkBox=taskListItem.querySelector("input[type=checkbox]");
	var EditerButton=taskListItem.querySelector("button.Editer");
	var SupprimerButton=taskListItem.querySelector("button.Supprimer");

			EditerButton.onclick=EditerTask;
			SupprimerButton.onclick=SupprimerTask;
			checkBox.onchange=checkBoxEventHandler;
}

	for (var i=0; i<incompleteTaskHolder.children.length;i++){
		bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
	}

	for (var i=0; i<completedTasksHolder.children.length;i++){
		bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
	}