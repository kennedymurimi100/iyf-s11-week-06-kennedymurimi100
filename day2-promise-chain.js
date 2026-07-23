function randomDelay() {
  return Math.floor(Math.random() * 3000) + 1000;
}

function task1() {
  const delay = randomDelay();

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Task 1 finished after ${delay} ms`);
      resolve();
    }, delay);
  });
}

function task2() {
  const delay = randomDelay();

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Task 2 finished after ${delay} ms`);
      resolve();
    }, delay);
  });
}

function task3() {
  const delay = randomDelay();

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Task 3 finished after ${delay} ms`);
      resolve();
    }, delay);
  });
}

console.time("Total Time");

task1()
  .then(() => task2())
  .then(() => task3())
  .then(() => {
    console.log("All tasks completed!");
    console.timeEnd("Total Time");
  });