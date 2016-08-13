import inject from 'ng-inject';

@inject('$rootScope', '$scope', '$state', 'facebookService', 'geolocationService', 'eventsService') // tout ce qui se trouve dans inject se retrouve dans this;
class MyEventsHome {
  message = 'Hello World ! This is NetflixHome component !';

  constructor() {
    this.getGeolocation();

    this.events = [];

    this.category = [];
  }

// en destructurant coords et en ne selectionnant que latitude et longitute, on peut accéder QUE à lattitude et longitute
  async getGeolocation() {
    const { coords: { latitude, longitude } } = await this.geolocationService.get();

    this.lat = latitude;
    this.lng = longitude;

    this.displayEvents();
    this.displayEventsCategories();
  }

  logout() {
    this.facebookService.logout();
    this.$state.transitionTo('auth');
  }

  async displayEvents() {
    this.$rootScope.$emit('SHOW_LOADER');
    const { events: { event: events } } = await this.eventsService.getEventsNearby(this.lat, this.lng);

    this.events = events;
    console.log(this.image);
    console.log(this.events);
    this.$scope.$apply(); // permet d'indiquer à angular à quel moment modifier le scope
  }

  async displayEventsCategories() {
    const { category } = await this.eventsService.getEventsCategories();

    this.category = category;
    this.$scope.$apply();
    this.$rootScope.$emit('HIDE_LOADER');
  }

  async displayFilteredEvents(category, location) {
    this.$rootScope.$emit('SHOW_LOADER');

    if (category || location == null) {
      this.displayEvents();
    }
    const { events: { event: events } } = await this.eventsService.filterEvents(category, location);

    this.events = events;
    this.$scope.$apply();
    this.$rootScope.$emit('HIDE_LOADER');
  }
}

export default MyEventsHome;
