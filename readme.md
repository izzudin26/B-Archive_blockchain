# B-Archive Blockchain
part of [Middle Serve](https://github.com/izzudin26/B-Archive_MiddleServer) build simple private blockchain database using Fastify and Mongodb to save user data and secure it

## Development
to starting development we need dependency and using `npm install` or `yarn` for install dependency
```
# install dependency
$ npm install

# watch typescript compile
$ npm run start:watch

# start serve development
$ npm run start:serve

# integration testing
$ npm run test

# build
$ npm run build
```

## Deployment with docker
Before deploy to production serve we need change expose port in docker-compose.yml 
```
# from
ports:
    - expose_port:port_application

# to
ports:
    - 127.0.0.1:expose_port:port_application
```

and run docker-compose.yml
```
$ docker-compose up
```