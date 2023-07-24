const axios = require('axios');

// Get URL destination after redirects
const destination = async (url) => {
  try {
    const response = await axios.get(url);

    if (response.request?.res?.responseUrl) {
      return response.request.res.responseUrl;
    }
  } catch(e) {
    return null;
  }

  return null;
}

// Get HTTP status of request
const available = async (url) => {
  try {
    await axios.get(url);

    return true;
  } catch(e) {
    return false;
  }
}

module.exports = {
  destination, available
};