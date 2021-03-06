// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '223934007308-ldle11sd1bl1udh6gaq14d604q5lu4jf.apps.googleusercontent.com';
var SCOPES = ["https://www.googleapis.com/auth/calendar"];

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  console.log('Authorizing.');
  gapi.auth.authorize({
    'client_id': CLIENT_ID,
    'scope': SCOPES.join(' '),
    'immediate': true
  }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    authController.div.hide();
    loadCalendarApi();
  } else {
    $('#authorize_button').button({ icon: 'ui-icon-calendar' });
    containerController.div.show();
    authController.div.show();
  }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize({
      client_id: CLIENT_ID,
      scope: SCOPES,
      immediate: false
    },
    handleAuthResult);
  return false;
}

/**
 * Load Google Calendar client library.  If successful, get started by listing the calendars.
 */
function loadCalendarApi() {
  gapi.client.load('calendar', 'v3', list_calendars);
}