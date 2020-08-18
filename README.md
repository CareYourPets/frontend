## Frontend

### Install

- Install node

```
curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt install nodejs
```

- Install yarn

```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install yarn
```

- Copy .default.env to .env and fill in the environment varibles

### Run

- Run app

```
yarn start
```

- Go to http://localhost:3000

### Test

- Run tests

```
yarn test
```

### Heroku setup

- Install Heroku
```
https://devcenter.heroku.com/articles/heroku-cli#download-and-install
```

- Login using cli
```
heroku login
(Make sure that you have access to the deployed heroku app)
```

### Deployment

- Open app locally during development
```
heroku local
```

- Manual Deployment 
```
heroku container:push web --app <app_name>
heroku container:release web --app <app_name>
```

- Check Logs
```
heroku logs --tail --app <app_name>
```

- View
```
heroku open --app <app_name>
```
