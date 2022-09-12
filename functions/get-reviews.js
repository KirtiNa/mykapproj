/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
 function main(params) {
  return new Promise(function (resolve, reject) {
    const { CloudantV1 } = require("@ibm-cloud/cloudant");
    const { IamAuthenticator } = require("ibm-cloud-sdk-core");
    const authenticator = new IamAuthenticator({
      apikey: "YPvEHOq9BIEL5OKQJ6wRBuMjqFeAAMY4gSYtcVGZQjGk",
    });
    const cloudant = CloudantV1.newInstance({
      authenticator: authenticator,
    });
    cloudant.setServiceUrl("https://8fd6588b-756c-46be-a2fa-8b0f395ebabf-bluemix.cloudantnosqldb.appdomain.cloud"); 
    dealership = parseInt(params.dealerId);
    // return reviews with this dealer id
    cloudant
      .postFind({
        db: "reviews",
        selector: {
          dealership: parseInt(params.dealerId),
        },
      })
      .then((result) => {
        let code = 200;
        if (result.result.docs.length == 0) {
          code = 404;
        }
        resolve({
          statusCode: code,
          headers: { "Content-Type": "application/json" },
          body: result.result.docs,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}



