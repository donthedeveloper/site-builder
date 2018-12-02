# Site-builder

## Description

This primary goal of this project is to create an open source opportunity that's junior developer friendly. This project is aimed at creating a toolset that solves problems for UX, designers, project managers, and entrepreneurs. The first set of features will be focused on creating a live mockup tool in which ux and designers can pair together.

## Install Docker For Mac

https://docs.docker.com/docker-for-mac/install/

## Install Docker For Windows

https://docs.docker.com/docker-for-windows/install/

## Download project

Once Docker is installed and you are logged in, it's time to download the project. We will talk about this more in the `CONTRIBUTING.md` file, but a common practice to contributing to open source is to fork a project and then clone your forked version. This is the first step in getting the project up and running on your computer.

Once you've cloned the forked version and it's on your computer, make sure you are in the folder of the project, and then type: `docker-compose up`

This will create Node and Mongo containers with Docker. It's basically a self-contained environment that sets everything up for you because of the provided configuration we have set in the project. Give it up to 5 minutes to build everything. Once you see that the server is listening on port 3000, visit `localhost:3000` in the browser and you should see a basic header and text on the page. If not, let us know!

## Congratulations!

At this point, you should be able to view the website and make changes. All changes you will make should be on the `app` folder. We use Nodemon which will automatically re-start (faster than the initial setup) the server when you make any changes except what's in `browser/src`. Any changes made to files in the `browser/src` folder will require you to refresh your browser.

## Alternative setup

If you're comfortable setting up Node and MongoDB, feel free to set those up manually. Instead of running `docker-compose` in the root directory of the project, you will need to:
1) move up into the app directory with `cd app`
2) run the development setup command `npm run dev`
3) create an `.env` file in the `app` directory and enter in your Mongo URI (ex: `MONGO_URI=mongodb://user:password@localhost:3000/dbname`)