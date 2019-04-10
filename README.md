# site-builder

## description

This primary goal of this project is to create an open source opportunity that's junior developer friendly. This project is aimed at creating a toolset that solves problems for UX, designers, project managers, and entrepreneurs. The first set of features will be focused on creating a live mockup tool in which ux and designers can pair together.

## environment setup (mac)

The following steps will help you set up tools to not only run this project, but make your life as a developer more convenient as well! You may skip any of these steps if you've already completed them.

### Install Node and NPM

`sudo npm install npm -g`

---

### Install Homebrew

`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

---

### If Homebrew is already installed, make sure it is up-to-date

`brew update`

---

### Install MongoDB

`brew install mongodb`

You can verify that it's installed with the following command:
`which mongodb`

You should see something like:
`/usr/local/bin/mongod`

---

### Create directory for MongoDB data

`mkdir -p /data/db`

If you get a permission error such as:
`mkdir: /data/db: Permission denied`

Run it with sudo:
`sudo mkdir -p /data/db`

---

### Start up MongoDB

You may now try running MongoDB with the command:
`mongod`

If you get an error that contains the text `Permission Denied`, loosen up the permissions with this command:
`sudo chmod 777 /data/db`

Now try running `mongod`. You should get long-winded messaging with a line similar to `waiting for connections on port 27017`.

In order to break out of this (as this terminal is now listening for connections to MongoDB), hold `Ctrl` and press `C`.

---

## Congratulations! You've successfully installed MongoDB.

Ok, now the real test. Run this command to start up the server:
`npm run dev` or `npm run dev-windows`

In your browser, visit `localhost:3000`. Does it work? Let us know!

---

## IDE Linter Plugins
IDE Plugins:
- Visual Studio Code:
  - [Stylelint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- Atom
  - [Stylelint](https://atom.io/packages/linter-stylelint)
  - [ESLint](https://atom.io/packages/linter-eslint)
  - [EditorConfig](https://atom.io/packages/editorconfig)
