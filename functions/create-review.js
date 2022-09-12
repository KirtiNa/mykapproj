function main(params) {
  return new Promise(function (resolve, reject) {
    const { CloudantV1 } = require("@ibm-cloud/cloudant");
    const { IamAuthenticator } = require("ibm-cloud-sdk-core");
    const authenticator = new IamAuthenticator({
      apikey: "YPvEHOq9BIEL5OKQJ6wRBuMjqFeAAMY4gSYtcVGZQjGk", // TODO: Replace with your API key
    });
    const cloudant = CloudantV1.newInstance({
      authenticator: authenticator,
    });
    cloudant.setServiceUrl("https://8fd6588b-756c-46be-a2fa-8b0f395ebabf-bluemix.cloudantnosqldb.appdomain.cloud"); // TODO: Replace with your Cloudant service URL
    // add id to review
    doc = params.review;
    doc.id = Math.floor(Math.random() * (80 - 15) + 15);
    cloudant
      .postDocument({
        db: "reviews",
        document: doc,
      })
      .then((result) => {
        let code = 201;
        resolve({
          statusCode: code,
          headers: { "Content-Type": "application/json" },
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}
