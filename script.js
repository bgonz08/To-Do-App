console.log("Script loaded!"); 
function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();
    
    if (taskText == "") return;
    
    const li = createTaskElement(taskText, false);
    document.getElementById("taskList").appendChild(li);
    updateProgress();
    input.value = "";
}

function createTaskElement(taskText, completed) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    const span = document.createElement("span");
    span.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "❌";
    deleteBtn.onclick = () => {
        li.remove();
        updateProgress();
    };
    
    //toggling between complete and incomplete on checkbox change
    checkbox.onchange = () => {
        //removing from current list
        li.remove();

        const newLi = createTaskElement(taskText, checkbox.checked);
        const targetList = checkbox.checked ? "completedList" : "taskList";
        document.getElementById(targetList).appendChild(newLi);
        updateProgress();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    return li;
}

function updateProgress() {
    const total = document.getElementById("taskList").children.length + document.getElementById("completedList").children.length;
    const completed = document.getElementById("completedList").children.length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    document.getElementById("progressBar").value = percent;
}