# Micro frontends: Highlights

This repository is part of a proof of concept, implementing micro frontends, see https://github.com/vuza/micro-frontends for "What the hell are micro frontends".

This Micro Frontend show three products, which can be added to a shopping cart. The shopping cart URL can be defined at `./config/`. The applications entry point is `./index.js`. The backend routes for buying a product are defined there and implemented at `./src/api/index.js`. The Micro Frontend is a React.js application, which can be found at `./src/ui/highlights/` and gets rendered at `./src/ui/index.js`.

## Usage

Type `npm run start:watch` for development. It'll hot reload your application on changes. See `travis.yml` for AWS Elastic Beanstalk deployment.
