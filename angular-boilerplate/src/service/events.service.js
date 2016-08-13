const SERVICES = new Map();

class EventsService {
  constructor($window, configService) {
    SERVICES // Le constructeur enregistre les services dans la map, on pourra utiliser get() sur la map plus tard pour récupérer le service
        .set('$window', $window)
        .set('configService', configService);

    this.apiKey = SERVICES.get('configService').get('EVENT_API_KEY');
  }

  get(url, args = '') {
    return new Promise(resolve => {
      const params = {
        app_key: this.apiKey,
        ...args,
      };

      window.EVDB.API.call(url, params, data => resolve(data));
    });
  }

  getEventsNearby(lat, lng) {
    return this.get('/events/search', { where: `${lat},${lng}`, within: 50 });
  }

  getEventsCategories() {
    return this.get('/categories/list');
  }

  filterEvents(category, place) {
    return this.get('/events/search/', { categories: category, where: place });
  }

  static factory($window, configService) {
    return new EventsService($window, configService);
  }
}

EventsService.factory.$inject = ['$window', 'configService'];

export default EventsService;
