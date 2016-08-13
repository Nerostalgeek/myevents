# Angular-boilerplate

Angular 1 (latest version) in component way with best practices.

- Best practices (controllerAs, component, injection, factory only, ...).
- EsLint with AirBnB JavaScript standard, for better code in team.
- Full minified build with WebPack for production.
- Hot-Reload, nice server with WebPack for development.
- Architecture make for rapid and fire project.
- You can use Stylus or CSS, as you want.
- Autoprefixer, you don't need CSS vendor like -webkit.
- ES6 + ES7 with Babel stage-0 : no limit (async/await, destructuration, generator, ...).

If you understand it, you can easily move to Angular 2.

# Start dev server :

```sh
npm run dev
```

# Start build process for production :

```sh
npm run build
```

# Installation

```sh
git clone https://github.com/kMeillet/angular-boilerplate
cd angular-boilerplate/
npm i
```

Now, copy configuration :

```sh
cp src/constant/config.example.js src/constant/config.js
```

Make your own "config.js" file and edit some constant.

You can add constant and use them with "configService" in your app.

# Resolving

Angular isn't god, and can't resolve component, service, directive, ... alone.

You will find 3 resolving files on "src" directory :

- app.component.js
- app.services.js
- app.main.js

The first file import all components and register them into "app.components" Angular module.

The second file import all services and register them into "app.services" Angular module.

The third file import the first and second file, and register all dependency (router, ...) into "app" module.

And then, you will find "app.js", who import "app" module and bootstrap it in document.

You can make your own resolving files (for filters or directives).

# Components

If you open "src/component", you will see 2 starter component :

- netflix-home : the prefix "netflix" is a fake, you can use any prefix (name of your app is better) to avoid colision
- netflix-login : a second component

Component are directive with some forced parameters.

It's very easy to understand component for a developer, so imagine your application homepage.

A component is a part of this homepage, they can be navbar or button, they have state (hover, clicked, focus, ...).

And then, a component can be a entiere page, and depends of some sub-components.

netflix-home and netflix-login are "page" component, they need some sub-components to be great like :

- Navbar
- Header, and Header need a sub-component like Slider
- Searchbar
- Articles, with button sub-components
- And footer

Component is re-usable, encourage good practice : component have style, HTML and controller.

So, when you say "Hey, i need some UI or new page", you need a new component.

In Angular, component are HTML tag.

 ```html
 <netflix-home></netflix-home>
```

Represent the netflix-home component.

All components are register on "app.components.js" on "src" directory.

```js
// ...
.component('netflixHome', NetflixHome);
````

Angular parse camelCase to HTML representation : netflix-home

So, how we can say "Hello, when you are in /auth, show netflix-login component !" ?

# Routing

Open "src/constant/routes.js" : this object represent all routes of your application.

Template are ***always*** calling a component !

"Component routing pattern" is used in Angular 2.

# How i can use $scope

You don't use $scope to bind data to view.

Use "this" in controller and "vm" in View, check Netflix examples component.

# Why Netflix ?

For fun !

# How i can pass data to a sub-component

Use property "bindings" in your entry component file :

```js
bindings: { netflixFilms: '=' },
```

Remember :

- \> : one-way data-binding (sub-component alteration never affect parent component)
- = : two-way data-binding (sub-component alteration affect parent component)
- & : reference data-binding (you can pass function to call-it in sub-component)
- @ : plain (sub-component get plain text of parameter, no binding)

Now, you can call your sub-component in your parent component like :

```html
<netflix-autocomplete netflix-films="vm.films"></netflix-autocomplete>
```

# TODO

Next release will be push soon with :

- Full SASS/SCSS support
- Jade support
- Unit test + E2E with Protractor
