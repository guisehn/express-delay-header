# express-delay-header

## Use case

> You want to test your fancy ajax loaders, spinners and stuff, but your dev machine is too damn fast for that shit!
>
> -- [boo1ean](https://github.com/boo1ean) - creator of [express-delay](https://github.com/boo1ean/express-delay)

I couldn't come with a better description than this. This library has the same goal with a few improvements:

- It allows you to control whether or not the delay should be present from the client by passing a `Delay` header with the desired latency.
- It'll only kick in when `NODE_ENV` is `development`, so you can safely commit the code to production and have the delay code running only on your local environment.

## Installation

`npm install express-delay-header --save`

## Usage

```
const app = require('express')()
const delay = require('express-delay-header')

app.use(delay())

// ...
```

**Important:** make sure the `NODE_ENV` environment variable is `development` for it to work.

On your client, pass a `Delay` header in the request with the desired delay in miliseconds (e.g. `3000` for 3 seconds).

```
curl --request GET \
  --url http://localhost:3000/ \
  --header 'delay: 3000'
```
