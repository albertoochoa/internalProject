const WelcomeIndex = async (request, h) => {
    return h.response({ success: "Welcome!" }).code(200);
};
module.exports = {
    method: 'GET',
    handler: WelcomeIndex
  };