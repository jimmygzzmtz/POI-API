# POI-Api & POIApp

## Objective
Have a simple way to get Points of Interest by sending a location and the type of Point of Interest wanted, and receiving a list of matching Points of Interest in a database, while also allowing the use of crowdsourcing to populate the data.

## Description
POI-Api is an API, hosted in Heroku and using Node.js express, that by inputting a location, type, or both, shows matching Points of Interest that are stored in Heroku, with its name, location, type, image URL, maps URL, and description. The API also supports signing up and logging in, using hashing in the password area, so that users can add POIs of their own to the database, thus fulfilling a crowdsourcing of the data in the database, allowing it to scale to any location worldwide. It is important to note that while users can edit or delete their own POIs, they cannot do so with POIs created by other people, while the administrator can do so to any POI.

## General Characteristics
- The user can sign up for an account.<br />
- The user can login to his account.<br />
- The user can see all the POIs and their data.<br />
- The user can filter (search) the POIs by location, type, or both.<br />
- The user can tap on the Maps Link on the POI to be taken to the corresponding information in Google Maps.<br />
- The user can submit their own POIs with their corresponding information.<br />
- The user can delete or change their own POIs by their ID (or any POI if it is the administrator).<br />

## Link to application
### Front end
https://poiapp.herokuapp.com
### Back end
https://poiapi.herokuapp.com/

## Developers
- Jaime Alberto González Martínez A01193591<br />
- Ariel Méndez Santillán A01020690<br />

## Routes
### Sign up
- POST to https://poiapi.herokuapp.com/accounts
- Send username and password
- Receive account details
### Login
- POST to https://poiapi.herokuapp.com/accounts/login
- Send username and password
- Receive token
### Logout
- POST to https://poiapi.herokuapp.com/accounts/logout
- Send token as header
### Get All POIs
- GET to https://poiapi.herokuapp.com/pois
- Receive list of POIS
### Get POIs that match Location
- GET to https://poiapi.herokuapp.com/pois/location/:location
- Use location name in URL
- Receive list of matching POIS
### Get POIs that match Type
- GET to https://poiapi.herokuapp.com/pois/type/:type
- Use type name in URL
- Receive list of matching POIS
### Get POIs that match Location and Type
- GET to https://poiapi.herokuapp.com/pois/location/:location/type/:type
- Use location name and type name in URL
- Receive list of matching POIS
### Create POI
- POST to https://poiapi.herokuapp.com/pois
- Send POI JSON
- Send token as header
### Update POI
- PATCH to https://poiapi.herokuapp.com/pois/:id
- Use POI ID in URL
- Send POI change JSON
- Send token as header
### Delete POI
- DELETE to https://poiapi.herokuapp.com/pois/:id
- Use POI ID in URL
- Send token as header
