import template from './template/myevents-loader.html';
import './style/myevents-loader.styl';

class MyEventsLoader {
  constructor() {
    this.template = template;
    this.bindings = {};
    this.restrict = 'E';
  }

  link(scope, elem) {
    const show = () => elem.children().removeClass('hidden');
    const hide = () => elem.children().addClass('hidden');
    const init = () => {
      scope.$on('SHOW_LOADER', () => show());
      scope.$on('HIDE_LOADER', () => hide());
    };

    init();
  }

  static factory() { // Static = interdit d'utilisé this, c'est static, pas de "new" donc pas d'instance !
    MyEventsLoader.instance = new MyEventsLoader();

    return MyEventsLoader.instance;
  }
}

MyEventsLoader.factory.$inject = [];

export default MyEventsLoader;
