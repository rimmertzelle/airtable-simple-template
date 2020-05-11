var http = require("http");
const Airtable = require("airtable");
// connect to a base with the right credentials
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  "apprDhF4VP0Qqmazy"
);
// within the base search for the right table
const flowers = base("Flowers");

// within the table search for the right view
const allFlowers = flowers.select({ view: "Grid view" });

const getAllFlowers = () =>
  new Promise((resolve, reject) => {
    try {
      // find the firstpage (=100 records)
      allFlowers.firstPage((error, records) => {
        let allMyFlowers = records.map(record => {
          return {
            id: record.get("id"),
            name: record.get("name"),
            waterPerMonth: record.get("water-per-month"),
            image: record.get("image"),
            supplementPerMonth: record.get("supplement-per-month")
          };
        });
        resolve(allMyFlowers);
      });
    } catch (error) {
      reject(new Error(error));
    }
  });

// asynchronous function to await the results of the data request from Airtable
async function myFunc() {
  console.log("in myfunc");
  const results = await getAllFlowers();
  console.log(results);
}
myFunc();

//getAllFlowers.then(data => console.log("mydata", data));

// const getAllFlower = new Promise((resolve, reject) => {
//   let flowers = [];
//   base("flowers")
//     .select({
//       // Selecting the first 3 records in Grid view:
//       maxRecords: 3,
//       view: "Grid view"
//     })
//     .eachPage(
//       function page(records, fetchNextPage) {
//         // This function (`page`) will get called for each page of records.
//         records.forEach(function(record) {
//           flowers.push({
//             id: record.get("id"),
//             name: record.get("name"),
//             waterPerMonth: record.get("water-per-month"),
//             image: record.get("image"),
//             supplementPerMonth: record.get("supplement-per-month")
//           });
//         });
//         // To fetch the next page of records, call `fetchNextPage`.
//         // If there are more records, `page` will get called again.
//         // If there are no more records, `done` will get called.
//         fetchNextPage();
//       },
//       function done(err) {
//         if (err) {
//           console.error(err);
//           return;
//         }
//         console.log(flowers);
//       }
//     );
// });

//create a server object:
http
  .createServer(function(req, res) {
    res.write("Hello World!!!\n"); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080
