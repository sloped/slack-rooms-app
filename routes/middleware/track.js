import tracking from '../../config/analytics.js';
module.exports = track;

function track(req, res, next) {
    tracking.track_event('GraphQL', 'Request');
    return next();
}