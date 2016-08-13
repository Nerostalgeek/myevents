function authenticator($location, facebookService) {
  return new Promise(resolve => {
    if (facebookService.isAuth()) {
      resolve();
    } else {
      $location.path('auth');
    }
  });
}

function guest($location, facebookService) {
  return new Promise(resolve => {
    if (facebookService.isAuth()) {
      $location.page('home');
    } else {
      resolve();
    }
  });
}

export default {
  default: '/',
  auth: {
    name: 'auth',
    url: '/auth',
    template: '<my-events-login></my-events-login>',
    resolve: { guest },
  },
  home: {
    name: 'home',
    url: '/',
    template: '<my-events-home></my-events-home>',
    resolve: { authenticator },
  },
  profile: {
    name: 'profile',
    url: '/profile',
    template: '<my-events-profile></my-events-profile>',
    resolve: { authenticator },
  },
};
