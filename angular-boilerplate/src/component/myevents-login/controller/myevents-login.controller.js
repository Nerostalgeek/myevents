import inject from 'ng-inject';

@inject('$rootScope', '$state', '$http', 'facebookService')
class MyEventsLogin {
  constructor() {
    this.$rootScope.$emit('HIDE_LOADER');
    console.log('Hello, this is constructor of myevents-login component !');
  }

  isAuth() {
    return this.facebookService.isAuth();
  }

  async login() { // Fonction asynchrone, on peux utiliser "await" pour attendre le résultat d'une promesse
    try {
      const [ // Destructuration du tableau qui contiens 2 objet, le premier objet sera destructuré lui aussi pour récupérer les valeurs en variable !
        { id: facebook_id, first_name: firstname, last_name: lastname, email, birthday },
        { data: { url: photo_url } },
      ] = await this.facebookService.login(); // on attend le résultat de la promesse

      const { data: user } = await this.facebookService.register({ // on enregistre les infos de l'user
        facebook_id,
        firstname,
        lastname,
        email,
        birthday,
        bio: '',
        photo_url,
      });
      this.facebookService.setAuth(user);
      this.$state.transitionTo('home');
    } catch (error) { // si ça passe pas
      console.log(error);
    }
  }
}

export default MyEventsLogin;
