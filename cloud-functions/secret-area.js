exports.handler = (event, context, callback) => {
  /* To test the cloud function locally - CORS solution */
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  if (event.httpMethod !== "POST") {
    return callback(null, {
      statusCode: 200,
      headers,
      body: "This was not a POST request"
    });
  }

  const secretContent = `
        <h3>Welcome to the secret area!</h3>
        <p>Here, we can tell you that your <i>password</i> was correct!</p>
    `;

  let body;

  if (event.body) {
    body = JSON.parse(event.body);
  } else {
    body = {};
  }

  if (body.password == "javascript") {
    callback(null, {
      statusCode: 200,
      headers,
      body: secretContent
    });
  } else {
    callback(null, {
      statusCode: 401,
      headers
    });
  }
};
