/**
 * Sur les services, il faut utiliser $inject sur la fonction factory de la classe
 * Plutôt que le @inject() comme on utilise sur les controllers
 * Car ce n'est pas compatible avec les services !
 */

const SERVICES = new Map();

class FacebookService {
  constructor($window, $http, store, configService) {
    SERVICES // Le constructeur enregistre les services dans la map, on pourra utiliser get() sur la map plus tard pour récupérer le service
        .set('$window', $window)
        .set('$http', $http)
        .set('store', store)
        .set('configService', configService);

    this.apiUrl = SERVICES.get('configService').get('API_URL');
    this.user = {};
    this.userId = SERVICES.get('store').get('AUTHENTICATE');
  }

  logout() {
    this.user = {};
    this.userId = false;

    SERVICES.get('store').remove('AUTHENTICATE');
  }

  isAuth() {
    return !!this.userId;
  }

  setAuth(user) {
    this.user = user;
    this.userId = user.id;

    console.log(user, user.id);

    SERVICES.get('store').set('AUTHENTICATE', user.id);
  }

  getUser(id) {
    return SERVICES.get('$http').get(`${this.apiUrl}/users/${id}`);
  }

  login() {
    return new Promise((resolve, reject) => {
      this.fb().login(auth => {
        if (auth.authResponse) {
          return resolve(Promise.all([
            this.api('/me?fields=id,first_name,last_name,email,birthday,bio'),
            this.api('/me/picture?fields=url'),
          ]));
        }

        return reject('Vous avez refusé la connexion !');
      }, { scope: SERVICES.get('configService').get('FB_PERM') });
    });
  }

  register(data) {
    return SERVICES.get('$http').post(`${this.apiUrl}/users`, data);
  }

  fb() {
    return SERVICES.get('$window').FB;
  }

  api(request) {
    return new Promise((resolve, reject) => {
      this.fb().api(request, res => {
        if (!res || res.error) {
          return reject(res);
        }

        return resolve(res);
      });
    });
  }

  static factory($window, $http, store, configService) {
    return new FacebookService($window, $http, store, configService);
  }
}

FacebookService.factory.$inject = ['$window', '$http', 'store', 'configService'];

export default FacebookService;
