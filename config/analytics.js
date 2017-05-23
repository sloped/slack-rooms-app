import ua from 'universal-analytics';
module.exports = new Tracking();
function Tracking() {
    let session = null;
    if( process.env.GOOGLE_UA ) {
        session = ua(process.env.GOOGLE_UA);
    }

    this.track_page_view = function(url, domain, text) {
        if( session == null) {
            return;
        }
        session.pageview(url, domain, text).send();
    };
    this.track_event = function(category, action, label, value) {
        if( session == null) {
            return;
        }
        session.event(category, action, label, value).send();
    };
}
