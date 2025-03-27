const coap = require("coap"); // Import CoAP library

// // Function to send a GET request
// function sendGetRequest() {
//     const req = coap.request("coap://localhost:5683/data");

//     req.on("response", (res) => {
//         console.log("GET Response Code:", res.code);
//         console.log("GET Response:", res.payload.toString());
//         // res.close();
//         res.pipe(process.stdout);
//     });

//     req.end(); // Send the request
// }
const sampleData = {
    type: "data",
    // source: "bf9dd9d5",
    // local_time: new Date() * 1e6,
    latitude: `14°39'9.08"N`,
    longitude: `121°4'6.69"E`,
    SI7020_TMP: 34.5,
    SI7020_RH: 29,
};
// Function to send a POST request
function sendPostRequest() {
    const payload = JSON.stringify(sampleData);

    const req = coap.request({
        hostname: "localhost",
        port: 5683,
        method: "POST",
        pathname: "/api/sensor-data",
    });

    req.setOption("Content-Format", "application/json"); // Set content type
    req.write(payload); // Write payload to request

    req.on("response", (res) => {
        console.log("POST Response Code:", res.code);
        console.log("POST Response:", res.payload.toString());
    });

    req.end(); // Send the request
}

// Main function to execute client requests
function main() {
    // console.log("Sending GET request...");
    // sendGetRequest();

    console.log("Sending POST request with payload...");
    console.log("Payload:", sampleData);

    sendPostRequest();
    // observe();

    // setTimeout(() => {}, 2000); // Delay to separate GET and POST requests
}

main(); // Run the main function
