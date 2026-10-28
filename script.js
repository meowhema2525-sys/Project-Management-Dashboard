
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = [];
let nextId = 1;

function updateDashboard() {
    document.getElementById("totalTasks").textContent = tasks.length;

    document.getElementById("pendingTasks").textContent =
        tasks.filter(task => task.status === "Pending").length;

    document.getElementById("progressTasks").textContent =
        tasks.filter(task => task.status === "In Progress").length;

    document.getElementById("completedTasks").textContent =
        tasks.filter(task => task.status === "Completed").length;
}

function renderTasks() {
    taskList.replaceChildren();
    emptyMessage.style.display = tasks.length ? "none" : "block";

    tasks.forEach(task => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = task.name;

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = task.description;

        const statusCell = document.createElement("td");
        const statusSelect = document.createElement("select");

        ["Pending", "In Progress", "Completed"].forEach(status => {
            const option = document.createElement("option");
            option.value = status;
            option.textContent = status;
            option.selected = task.status === status;
            statusSelect.appendChild(option);
        });

        statusSelect.className =
            "status-" + task.status.toLowerCase().replace(" ", "-");

        statusSelect.addEventListener("change", function() {
            task.status = this.value;
            renderTasks();
            updateDashboard();
        });

        statusCell.appendChild(statusSelect);

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(item => item.id !== task.id);
            renderTasks();
            updateDashboard();
        });

        actionCell.appendChild(deleteButton);

        row.append(nameCell, descriptionCell, statusCell, actionCell);
        taskList.appendChild(row);
    });
}

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("taskName").value.trim();
    const description =
        document.getElementById("taskDescription").value.trim();

    if (!name || !description) return;

    tasks.push({
        id: nextId++,
        name: name,
        description: description,
        status: "Pending"
    });

    taskForm.reset();
    renderTasks();
    updateDashboard();
});

updateDashboard();
renderTasks();
