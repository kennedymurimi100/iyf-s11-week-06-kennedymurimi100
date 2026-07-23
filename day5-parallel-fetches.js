const urls = [
  "https://jsonplaceholder.typicode.com/users/1",
  "https://jsonplaceholder.typicode.com/posts/999999",
  "https://jsonplaceholder.typicode.com/todos/1",
];

async function fetchData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

async function fetchAllData() {
  const promises = urls.map((url) => fetchData(url));

  const results = await Promise.allSettled(promises);

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`Request ${index + 1} succeeded:`);
      console.log(result.value);
    } else {
      console.log(`Request ${index + 1} failed:`);
      console.log(result.reason.message);
    }

    console.log("--------------------");
  });
}

fetchAllData();