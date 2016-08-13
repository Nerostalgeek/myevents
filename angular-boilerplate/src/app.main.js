import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import router from 'angular-ui-router';
import storage from 'angular-storage';
import material from 'angular-material';
import aria from 'angular-aria';
import animate from 'angular-animate';
import messages from 'angular-messages';


import services from './app.services';
import components from './app.components';
import directives from './app.directives';

import { default as ROUTES } from './constant/routes';

const moduleName = 'app';

angular
    .module(moduleName, [router, storage, services, directives, components, ngSanitize, material, aria, animate, messages])
    .config(($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, storeProvider) => {
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise(ROUTES.default);
      Object
          .keys(ROUTES)
          .filter(route => route !== 'default')
          .forEach(route => $stateProvider.state(ROUTES[route].name, ROUTES[route]));

      storeProvider.setStore('sessionStorage');
    })
    .run(($window, $rootScope, configService, facebookService) => {
      if (facebookService.isAuth()) {
        facebookService
            .getUser(facebookService.userId)
            .then(({ data: user }) => facebookService.setAuth(user))
            .catch(error => {
              console.log('ERROR LOGIN', error);
              facebookService.logout();
            });
      }

      $window.fbAsyncInit = () => {
        $window.FB.init({
          appId: configService.get('FACEBOOK_APP_ID'),
          status: true,
          cookie: true,
          xfbml: true,
          version: 'v2.6',
        });
      };

      const id = 'facebook-jssdk';
      const js = document.createElement('script');
      const ref = document.getElementsByTagName('script')[0];
      if (document.getElementById(id)) {
        return;
      }

      js.id = id;
      js.async = true;
      js.src = '//connect.facebook.net/en_US/all.js';

      ref.parentNode.insertBefore(js, ref);

      $rootScope.$emit('HIDE_LOADER');
    });

export default moduleName;
