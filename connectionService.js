module.exports = async (connectionDetails, axios, method, params) => {
  let postRequest;
  try {
    const connection = `http://${connectionDetails.host}:${connectionDetails.port}`;
    postRequest = await axios({
      method: 'post',
      url: `${connection}/${method}`,
      headers: {
        Authorization: `Basic ${Buffer.from(`${connectionDetails.apiUsername}:${connectionDetails.apiPassword}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      data: params,
    });
  } catch (e) {
    throw Error(JSON.stringify(e.response.data.error));
  }
  return postRequest.data;
};
