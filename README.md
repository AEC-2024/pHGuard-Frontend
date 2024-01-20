# <p align="center">AEC 2024 — Atlantic Engineering Competition — Fredericton, NB</p>

<p align="center"><img src="public/pHGuard_Logo.png" style="width: 300px;"/></p>

# pHGuard Front End 
This is the front end repository for the pHGuard app that uses the backend to read, write, and store data with the backend of pHGuard. The features of the front end include a clean user-friendly UI that displays insight to the soil in a  farmers crop delivering personalized crop management. 

## Getting Started 
To build the project from source, clone this repository and run it as shown below:

```sh
git clone https://github.com/AEC-2024/pHGuard-Frontend.git
cd pHGuard-Frontend
npm i
npm start
```

This will start a development server running on localhost:3000. As long as you have the [backend project](https://github.com/AEC-2024/pHGuard-Backend) running as well, you will be able to access the pHGuard application by navigating to http://localhost:3000 in your web-browser.

NOTE: Due to Cross-Origin Resource Sharing rules, some browsers may have issues running both the frontend and backend. To work around this, start your browser in an insecure mode to access the app. Example:

```sh
 brave --disable-web-security --ignore-certificate-errors --user-data-dir="<dir>"
```

