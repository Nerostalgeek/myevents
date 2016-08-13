import angular from 'angular';

import ConfigService from './service/config.service';
import FacebookService from './service/facebook.service';
import GeolocationService from './service/geolocation.service';
import EventsService from './service/events.service.js';

const moduleName = 'app.services';

angular
    .module(moduleName, [])
    .factory('configService', ConfigService.factory)
    .factory('facebookService', FacebookService.factory)
    .factory('geolocationService', GeolocationService.factory)
    .factory('eventsService', EventsService.factory);

export default moduleName;
