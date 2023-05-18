//Lounch
const LAUNCHES_API_URL = "https://api.spacexdata.com/v4/launches";
const ROCKETS_API_URL = "https://api.spacexdata.com/v4/rockets";
const PAYLOADS_API_URL = "https://api.spacexdata.com/v4/payloads";

async function LaunchesRockets() {
  try {
    const response = await fetch(LAUNCHES_API_URL);
    let jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
}

let Launches = LaunchesRockets();
// console.log(Launches, "Launches");

//  rocketes

async function rockets() {
  try {
    const response = await fetch(ROCKETS_API_URL);
    let jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
}

let Rocketes = rockets();
// console.log(Rocketes, "rockets");

// payloads
async function payloads() {
  try {
    const response = await fetch(PAYLOADS_API_URL);
    let jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.log(error);
  }
}

// question 2
async function LaunchesCount() {
  try {
    let payloadsData = await LaunchesRockets();
    let n = payloadsData.length;

    let successFullCount = 0;
    let FailureCount = 0;
    let nullCount = 0;
    for (let i = 0; i < payloadsData.length; i++) {
      if (payloadsData[i].success === true) {
        successFullCount = successFullCount + 1;
      }

      if (payloadsData[i].success === false) {
        FailureCount = FailureCount + 1;
      }
      if (payloadsData[i].success === null) {
        nullCount = nullCount + 1;
      }
    }

    console.log("SucessFull", successFullCount);
    console.log("Failure", FailureCount);
    console.log("nullCount", nullCount);
    console.log("length", payloadsData.length);

    // console.log(payloadsData);
  } catch (error) {
    console.log(error);
  }
}

LaunchesCount();

async function findCommanRocketId() {
  let louchData = await LaunchesRockets();
  let rocketdata = await rockets();

  let uniqerocketID = {};
  for (let i = 0; i < louchData.length; i++) {
    const element = louchData[i].rocket;
    if (uniqerocketID[element]) {
      uniqerocketID[element] = (uniqerocketID[element] || 0) + 1;
    } else {
      uniqerocketID[element] = 1;
    }
  }

  let output = [];
  for (const key in uniqerocketID) {
    for (let rkt = 0; rkt < rocketdata.length; rkt++) {
      if (rocketdata[rkt].id === key) {
        let obj = {
          rocket: rocketdata[rkt].id,
          name: rocketdata[rkt].name,
          launches: uniqerocketID[key],
        };

        output.push(obj);
      }
    }
  }
  console.log(
    "--------------- Commna Rocket ID And Count ------------------------------------------------------------------"
  );
  console.log(output, "output");
}

findCommanRocketId();

// Calutate total louch in year and total payload size

async function totallouchCountAndPayloads() {

  let launchData = await LaunchesRockets();


  const launchCountsPerYear = {};
  const payloadCountsPerYear = {};


  for (const launch of launchData) {
    // Extract the launch year from the 'date_utc' property
    const launchYear = new Date(launch.date_utc).getFullYear();

    // Count the launches per year
    if (launchCountsPerYear[launchYear]) {
      launchCountsPerYear[launchYear]++;
    } else {
      launchCountsPerYear[launchYear] = 1;
    }

    // Count the payloads per year
    for (const payload of launch.payloads) {
      if (payloadCountsPerYear[launchYear]) {
        payloadCountsPerYear[launchYear]++;
      } else {
        payloadCountsPerYear[launchYear] = 1;
      }
    }
  }

  // Create an array with the desired format
  const resultArray = [];
  for (const year in launchCountsPerYear) {
    resultArray.push({
      year: year.toString(),
      launches: launchCountsPerYear[year],
      payloads: payloadCountsPerYear[year],
    });
  }


  // Display the result array
console.log("--------------------------Launches & payloads Data year wise ------------------------")
  console.log(resultArray);
}

totallouchCountAndPayloads();
