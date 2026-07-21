async function createPost(title, body, userId) {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            body,
            userId
        })
    });

    if (!response.ok) {
        throw new Error("Failed to create post");
    }

    return response.json();
}

async function main() {
    try {
        const newPost = await createPost(
            "My First Post",
            "This is the content of my post.",
            1
        );

        console.log("Created:", newPost);

    } catch (error) {
        console.error(error);
    }
}

main();

async function loadUsers() {
    try {
        showLoading();

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        allUsers = await response.json();

        displayUsers(allUsers);

    } catch (error) {
        showError(error.message);

    } finally {
        hideLoading();
    }
}

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", (e) => {

    const query = e.target.value.toLowerCase();

    const filtered = allUsers.filter(user =>

        user.name.toLowerCase().includes(query) ||

        user.email.toLowerCase().includes(query)

    );

    displayUsers(filtered);

});