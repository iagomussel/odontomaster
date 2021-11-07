class GCallendar {
    /**
     * do integration with the google calendar
     * set event on calendar client
     */
    constructor(){
        this.calendar = new google.calendar({version: 'v3'});
    }


    addEvent(event){
        this.calendar.events.insert({
            auth: event.auth,
            calendarId: event.calendarId,
            resource: event.resource
        }, function(err, event) {
            if (err) {
                console.log('There was an error contacting the Calendar service: ' + err);
                return;
            }
            console.log('Event created: %s', event.htmlLink);
        });

    }

    /**
     * get all events from calendar
     * @param auth
     * @param calendarId
     * @param callback
     * @returns {Promise<any>}
     * @constructor
     * @param callback
     * @param callback
     *
     *
     */
    getEvents(auth, calendarId, callback){
        return new Promise(function(resolve, reject){
            this.calendar.events.list({
                auth: auth,
                calendarId: calendarId,
                timeMin: (new Date()).toISOString(),
                maxResults: 10,
                singleEvents: true,
                orderBy: 'startTime'
            }, function(err, response) {
                if (err) {
                    console.log('The API returned an error: ' + err);
                    reject(err);
                }
                let events = response.items;
                if (events.length == 0) {
                    console.log('No upcoming events found.');
                } else {
                    console.log('Upcoming 10 events:');
                    for (let i = 0; i < events.length; i++) {
                        let event = events[i];
                        let start = event.start.dateTime || event.start.date;
                        console.log('%s - %s', start, event.summary);
                    }
                }
                resolve(response);
            });
        });
    }
    /**
     * generate url for oauth2 google calendar
     * @param clientId
     * @param redirectUrl
     *
     * @returns {string}
     *
     * */
    generateOauthUrl(clientId, redirectUrl){
        return 'https://accounts.google.com/o/oauth2/v2/auth?scope=' +
            'https://www.googleapis.com/auth/calendar' +
            '&redirect_uri=' + redirectUrl +
            '&response_type=code' +
            '&client_id=' + clientId +
            '&access_type=offline' +
            '&prompt=consent';
    }

    /**
     * get access token from google calendar
     * @param clientId
     * @param clientSecret
     * @param code
     * @param redirectUrl
     *
     **/
    getAccessToken(clientId, clientSecret, code, redirectUrl){
        return new Promise(function(resolve, reject){
            let formData = {
                code: code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUrl,
                grant_type: 'authorization_code'
            };
            request.post({url:'https://www.googleapis.com/oauth2/v4/token', formData: formData}, function(err, httpResponse, body){
                if (err) {
                    console.log('Error while sending request to get access token: ' + err);
                    reject(err);
                }
                console.log('Access token: ' + body);
                resolve(body);
            });
        });
    }

    

}