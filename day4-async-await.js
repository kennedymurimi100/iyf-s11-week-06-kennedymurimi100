function boilWater() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Water boiled");
      resolve();
    }, 2000);
  });
}

async function makeTea() {
  await boilWater();

  console.log("Tea is ready!");
}

makeTea();