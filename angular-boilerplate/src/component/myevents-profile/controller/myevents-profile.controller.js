import inject from 'ng-inject';

@inject('$state', '$http', 'facebookService')
class MyEventsProfile {
  constructor() {
    console.log('Hello, this is constructor of myevents-profile component !');
  }
}

export default MyEventsProfile;
