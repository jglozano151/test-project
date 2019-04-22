# Caissa Test Project 

## Running Instructions

Within the app folder, run `npm install` to install dependencies and then `npm start`
to start the app on port 3000. 

## Design Choices 

For this project, I decided to use ReactJS for the frontend application and Redux for 
the state management. As multiple components needed access to the 'securities' that 
are initialized with dummy data when the app first loads, it made sense to use Redux. 

Dummy data was used to initialize the securities, as there was no backend as part of 
this project. Normally, http requests to get and post data would accompany the initial 
loading of securities and any modifications made to them, so that changes could be saved
in a database. 

For CSS styling, simple classes from the bootstrap 4 library were applied to the components
as well as a few global styles in the App.css file. 