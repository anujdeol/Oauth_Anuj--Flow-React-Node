const axios = require("axios");

const tokenEndpoint = "https://dev-anuj-projects.us.auth0.com/oauth/token";

const oAuth = (req, res, next) => {
  const code = req.query.code;
  console.log("code is here " + code);
  
  if (!code) {
    return res.status(401).send("Missing authorization code");
  }

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", "vrnxflfEbJrKrFPdAGSiUTPQ7hq8EbXq");
  params.append("client_secret", "Fp_yDRjmRTDpj6T7xJldgtM_p-Q4D5KTMPLVqHxndY9HlgUTE70xov1dWPmrEhwE");
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:3000/mydemo");

  axios.post(tokenEndpoint, params)
    .then(response => {
      req.access_token = response.data.access_token;
      console.log("hitting the token endpoint");
      console.log("Access token:", response.data.access_token);
      const access_token = response.data.access_token

      // Fetch the API using the access token
      const apiToFetch = "http://localhost:8080/mydemo";
      axios.get(apiToFetch, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      .then(apiResponse => {
        // Send API response as JSON to the browser screen
        res.json(apiResponse.data);
        console.error("fetching API Data:", apiResponse.data);
      })
      .catch(apiError => {
        console.error("Error fetching API:", apiError);
        res.status(500).json({ error: "Error fetching API" });
      });
    })
    .catch(err => {
      console.log("error at middleware");
      console.error(err);
      res.status(403).json(`Reason: ${err.message}`);
    });
};

module.exports = oAuth;
