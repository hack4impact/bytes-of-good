<h1 align="center">The Bytes of Good landing site 📣</h1>
<p>
  <a href="https://app.netlify.com/sites/bytesofgood/deploys" target="_blank" rel="noreferrer">
    <img src="https://api.netlify.com/api/v1/badges/612768b0-7a88-4d1b-a32a-7c7cf5b8f7da/deploy-status" alt="Netlify Status" />
  </a>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank" rel="noreferrer">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> The bare-bones, [Pug-driven](https://pugjs.org) landing page for the incredible Bytes of Good org ✨

🚀 [**Visit the live site**](impactpodcast.hack4impact.org)

## Tech stack

This project uses [**Eleventy**](https://11ty.dev) for development and production builds. If you've ever used [Jekyll](https://jekyllrb.com) (maybe for building sites on GitHub pages), this is super similar! The only _real_ difference is using JavaScript packages for all our plugins instead of Ruby. This makes setup a lot simpler across devices from our experience.

For the pages themselves, we use a combination of [Pug / Jade templates](https://pugjs.org/api/getting-started.html) and [Scss](https://sass-lang.com) for our styles. No, we don't use bootstrap or any other CSS library! We write our CSS with our bare hands 💪

## Project structure

```
src/ -> all our assets, templates, scripts, and styles
| 🗄 _assets -> images, fonts, etc copied directly to build/
| 📶 _data -> global data pulled in from the Contentful CMS
| 📦 _includes -> templates and SVG assets imported into pages
| 💅 _sass -> global styles, with styles.scss as the main source of truth
| 🚏 [route files] -> templates outside _includes = *routes* on our site
build/ -> generated from src/ when running build commands
```

## Install Dependencies

Make sure you have [NodeJS](https://nodejs.org/en/) installed first. Then, run this terminal command inside the project directory:

```sh
npm install
```

## Spin up the dev server

```sh
npm start
```

This will spin up a local development server (using [Browsersync](https://browsersync.io)) with live reloading on file changes.

## Build for production

```sh
npm run build
```

This should create a `build/` directory that we'll serve using the [Netlify](https://www.netlify.com) deploy service. Just **don't edit any of these files directly!** These files are generated from `src/`, so make all your edits in there.

## Contributors

👤 **Ben Holmes**

* Website: https://bholmes.dev
* Twitter: [@bholmesdev](https://twitter.com/bholmesdev)
* Github: [@Holben888](https://github.com/Holben888)
* LinkedIn: [@bholmesdev](https://linkedin.com/in/bholmesdev)

👤 **James Wang**

* Website: https://thejameswang.me
* Github: [@thejameswang](https://github.com/thejameswang)
* LinkedIn: [@thejameswang](https://www.linkedin.com/in/thejameswang/)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_