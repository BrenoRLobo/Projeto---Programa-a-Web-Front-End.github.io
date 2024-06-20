document.addEventListener("DOMContentLoaded", () => {
    const userForm = document.getElementById("userForm");
    const userList = document.getElementById("userList");
    const clearFormBtn = document.getElementById("clearForm");
    const clearListBtn = document.getElementById("clearList");
    const searchInput = document.getElementById("search");

    userForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const date = new Date().toLocaleString();

        const userData = { username, email, date };
        saveUser(userData);
        renderUserList();
        userForm.reset();
    });

    clearFormBtn.addEventListener("click", () => {
        userForm.reset();
    });

    clearListBtn.addEventListener("click", () => {
        localStorage.removeItem("users");
        renderUserList();
    });

    searchInput.addEventListener("input", () => {
        renderUserList(searchInput.value);
    });

    userList.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete")) {
            const index = event.target.dataset.index;
            deleteUser(index);
            renderUserList();
        }
    });

    function saveUser(userData) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(userData);
        localStorage.setItem("users", JSON.stringify(users));
    }

    function deleteUser(index) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(users));
    }

    function renderUserList(search = "") {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        userList.innerHTML = "";

        users = users.filter(user => 
            user.username.toLowerCase().includes(search.toLowerCase()) || 
            user.email.toLowerCase().includes(search.toLowerCase())
        );

        users.forEach((user, index) => {
            const li = document.createElement("li");
            li.textContent = `${user.date} - ${user.username} - ${user.email}`;
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Excluir";
            deleteBtn.classList.add("delete");
            deleteBtn.dataset.index = index;
            li.appendChild(deleteBtn);
            userList.appendChild(li);
        });
    }

    renderUserList();
});