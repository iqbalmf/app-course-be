const apiAdapter = require("./apiAdapter");
const api = apiAdapter(process.env.URL_SERVICE_USER);
const logger = require("../logger/logger");
const fetchUserData = async (userId) => {
  try {
    const userData = await api.get(`/users/${userId}`);
    logger.info("Fetched user data from service-user: ", userData.data.data);
    return userData.data.data;
  } catch (error) {
    logger.error("Failed to fetch user from service-user: ", error.message);
    if (error.code === 'ECONNREFUSED') {
      throw {
        status: 500,
        message: 'service-user unavailable',
      };
    }
    throw {
      status: error.response.status,
      data: error.response.data,
    };
  }
};

const fetchAllUser = async (req) => {
  try {
    const userIds = req.user_id || [];
    const userData = await api.get(`/users`, {params: {user_id: userIds}});
    logger.info("Fetched user data from service-user: ", userData.data.data);
    return userData.data.data;
  } catch (error) {
    logger.error("Failed to fetch user from service-user: ", error.message);
    if (error.code === 'ECONNREFUSED') {
      throw {
        status: 500,
        message: 'service-user unavailable',
      };
    }
    throw {
      status: error.response.status,
      data: error.response.data,
    };
  }
}
module.exports = {fetchUserData, fetchAllUser};