const SERVICES = new Map();

class GeolocationService {
  constructor($window, configService) {
    SERVICES // Le constructeur enregistre les services dans la map, on pourra utiliser get() sur la map plus tard pour récupérer le service
        .set('$window', $window)
        .set('configService', configService);
  }

  // getCurrentPosition prend en parametre une fonction anonyme qui s'execute quand la fonction recupère le resulat
  get() {
    return new Promise((resolve) => {
      SERVICES
          .get('$window')
          .navigator
          .geolocation
          .getCurrentPosition(result => resolve(result));
    });
  }

  static factory($window, configService) {
    return new GeolocationService($window, configService);
  }
}

GeolocationService.factory.$inject = ['$window', 'configService'];

export default GeolocationService;
