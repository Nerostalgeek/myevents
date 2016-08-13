import angular from 'angular';

import MyEventsLogin from './component/myevents-login/myevents-login.component';
import MyEventsHome from './component/myevents-home/myevents-home.component';
import MyEventsProfile from './component/myevents-profile/myevents-profile.component';

const moduleName = 'app.components';

angular
  .module(moduleName, [])
  .component('myEventsLogin', MyEventsLogin)
  .component('myEventsHome', MyEventsHome)
  .component('myEventsProfile', MyEventsProfile);

export default moduleName;
