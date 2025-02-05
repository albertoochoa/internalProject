const { analytics } = require('../firebase'); 

async function logEvent(eventName, params) {
  try {
    await analytics.logEvent({
      name: eventName,
      params: params,
    });
    console.log(`Successfully logged event: ${eventName}`);
  } catch (error) {
    console.error(`Error logging event ${eventName}:`, error);
  }
}

module.exports = { logEvent };
