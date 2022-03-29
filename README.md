# API Server

Node.js Express API Server

![Build Status](https://github.com/oscarGtz86/express-api-server/actions/workflows/node.js.yml/badge.svg)
[![Run in Postman](https://img.shields.io/badge/docs-postman-orange)](https://documenter.getpostman.com/view/6320842/UVktqYyN)
[![node](https://img.shields.io/badge/node-%3E%3D%2012.x-green)](https://nodejs.org/en/)
[![docker](https://img.shields.io/badge/docker-%3E%3D%2020.x-blue)](https://docs.docker.com/get-docker/)
[![license](https://img.shields.io/badge/license-MIT-green)](https://github.com/oscarGtz86/express-api-server)

## Description

The present repository implements a simple Rest API server with basic operaction (CRUD) througth a MongoDB User's collection

## Installation

The project implemets ```dotenv``` npm repository. To load environment variables change the name of the file ```.env copy``` to ```.env```

```
$ mv ".env copy" .env
```

Use docker-compose to deploy server and database: 

```
$ docker-compose up --build
```

Default port is 8080, to validate service use the following URL:
```
http://localhost:8080
```

## Documentation
The API documentation is available in ```Postman```:

[![Run in Postman](https://img.shields.io/badge/docs-postman-orange)](https://documenter.getpostman.com/view/6320842/UVktqYyN)

## License

[![license](https://img.shields.io/badge/license-MIT-green)](https://github.com/oscarGtz86/express-api-server/blob/main/LICENSE)
