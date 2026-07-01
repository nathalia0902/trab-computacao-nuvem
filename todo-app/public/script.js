const api = "/tasks";

async function loadTasks() {

    const response = await fetch(api);

    const tasks = await response.json();

    const list = document.getElementById("taskList");

    list.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        const span = document.createElement("span");

        span.textContent = task.title;

        if (task.done)
            span.classList.add("done");

        const actions = document.createElement("div");

        actions.className = "actions";

        const doneButton = document.createElement("button");

        doneButton.textContent = "✓";

        doneButton.onclick = () => toggleTask(task.id);

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "🗑";

        deleteButton.onclick = () => deleteTask(task.id);

        actions.appendChild(doneButton);
        actions.appendChild(deleteButton);

        li.appendChild(span);
        li.appendChild(actions);

        list.appendChild(li);

    });

}

async function addTask() {

    const input = document.getElementById("taskInput");

    if (input.value.trim() === "")
        return;

    await fetch(api, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            title: input.value

        })

    });

    input.value = "";

    loadTasks();

}

async function toggleTask(id) {

    await fetch(api + "/" + id, {

        method: "PUT"

    });

    loadTasks();

}

async function deleteTask(id) {

    await fetch(api + "/" + id, {

        method: "DELETE"

    });

    loadTasks();

}

loadTasks();
