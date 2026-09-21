let todos = [
    {
        id: 1,
        title: "Belajar HTML & CSS",
        description: "Belajar membuat website sederhana menggunakan HTML dan CSS.",
        completed: false
    }
];

const todo_form = document.querySelector(".input-panel form");
const title_input = document.getElementById("title");
const description_input = document.getElementById("description");
const detail_panel = document.querySelector(".detail-panel");
const theme_button = document.getElementById("theme_button");
theme_button.style.cursor = "pointer";
theme_button.style.fontWeight = "bold";
theme_button.title = "Klik untuk mengganti Light Mode / Dark Mode";

function tampilkan_todo() {
    const todo_lama = detail_panel.querySelectorAll(".todo-detail");

    todo_lama.forEach(function(todo) {
        todo.remove();
    });

    todos.forEach(function(todo) {
        const todo_detail = document.createElement("article");
        todo_detail.classList.add("todo-detail");

        const todo_header = document.createElement("div");
        todo_header.style.display = "flex";
        todo_header.style.alignItems = "center";
        todo_header.style.gap = "10px";
        todo_header.style.marginBottom = "15px";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        const todo_title = document.createElement("h3");
        todo_title.textContent = todo.title;

        const todo_description = document.createElement("p");
        todo_description.textContent = todo.description;

        const edit_button = document.createElement("button");
        edit_button.type = "button";
        edit_button.textContent = "Edit";
        edit_button.style.marginTop = "15px";
        edit_button.style.marginRight = "10px";

        const delete_button = document.createElement("button");
        delete_button.type = "button";
        delete_button.textContent = "Delete";
        delete_button.style.marginTop = "15px";

        todo_header.appendChild(checkbox);
        todo_header.appendChild(todo_title);

        todo_detail.appendChild(todo_header);
        todo_detail.appendChild(todo_description);
        todo_detail.appendChild(edit_button);
        todo_detail.appendChild(delete_button);

        if (todo.completed) {
            todo_title.classList.add("completed");
            todo_description.classList.add("completed");
        }

        checkbox.addEventListener("change", function() {
            todo.completed = checkbox.checked;
            tampilkan_todo();
        });

        edit_button.addEventListener("click", function() {
            const new_title = prompt("Masukkan judul baru:", todo.title);
            const new_description = prompt(
                "Masukkan keterangan baru:",
                todo.description
            );

            if (new_title !== null && new_description !== null) {
                if (new_title.trim() !== "" && new_description.trim() !== "") {
                    todo.title = new_title;
                    todo.description = new_description;

                    tampilkan_todo();
                }
            }
        });

        delete_button.addEventListener("click", function() {
            todos = todos.filter(function(item) {
                return item.id !== todo.id;
            });

            tampilkan_todo();
        });

        detail_panel.appendChild(todo_detail);
    });
}

todo_form.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = title_input.value.trim();
    const description = description_input.value.trim();

    if (title === "" || description === "") {
        alert("Judul dan keterangan harus diisi!");
        return;
    }

    const new_todo = {
        id: Date.now(),
        title: title,
        description: description,
        completed: false
    };

    todos.push(new_todo);

    tampilkan_todo();

    title_input.value = "";
    description_input.value = "";
});

theme_button.addEventListener("click", function() {
    document.body.classList.toggle("dark_mode");

    if (document.body.classList.contains("dark_mode")) {
        theme_button.textContent = "☀️ Light Mode";
    } else {
        theme_button.textContent = "🌙 Dark Mode";
    }
});

const dark_style = document.createElement("style");

dark_style.textContent = `
    .dark_mode {
        background-color: #1e1e1e;
        color: #f5f5f5;
    }

    .dark_mode .input-panel,
    .dark_mode .detail-panel {
        background-color: #2d2d2d;
        color: #f5f5f5;
    }

    .dark_mode .todo-detail {
        border-color: #555;
    }

    .dark_mode input,
    .dark_mode textarea {
        background-color: #444;
        color: white;
    }

    .dark_mode input::placeholder,
    .dark_mode textarea::placeholder {
        color: #bbb;
    }

    .completed {
        text-decoration: line-through;
        opacity: 0.6;
    }
`;

document.head.appendChild(dark_style);

tampilkan_todo();