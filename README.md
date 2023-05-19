### Project setup

In the project directory, you can run:

```
npm install
# or
yarn install
```
yarn
or

### Compiles and hot-reloads for development

```
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

### deploy with github
1. add homepage field to package.json:

```
"homepage": "https://myusername.github.io/my-app"
```

myusername is your GitHub username and my-app is your repository’s name.

2. install gh-pages in your project.

```
npm install --save gh-pages
```

3. In your package.json, add the following scripts.

```
"scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
}
```

4. run command to deploy:

```
npm run deploy
```

5. Access to homepage link to check app