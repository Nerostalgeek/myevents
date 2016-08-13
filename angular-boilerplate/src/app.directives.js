import angular from 'angular';

import MyEventsLoader from './directives/myevents-loader/myevents-loader.directive';

const moduleName = 'app.directives';

angular
  .module(moduleName, [])
  .directive('myEventsLoader', MyEventsLoader.factory);

export default moduleName;
