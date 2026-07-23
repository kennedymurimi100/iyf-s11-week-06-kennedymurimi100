async function fetchUser(id) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    if (!response.ok) {
      return {
        id: 0,
        name: "Default User",
        email: "default@example.com",
      };
    }

    return await response.json();
  } catch (error) {
    console.log("Something went wrong:", error.message);

    return {
      id: 0,
      name: "Default User",
      email: "default@example.com",
    };
  }
}

async function run() {
  const user = await fetchUser(1);

  console.log(user);
}

run();