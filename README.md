# **IdeasMap**

![Screenshots of IdeasMap 's homepage](/screenshots/responsive-preview.png)

Link to demo : [IdeasMap](https://sg-ideasmap.netlify.app/)

## Summary

IdeasMap is a web application with an interactive map feature that allows users to explore the various location around Singapore.

---

## Target Audience

The target audience are residents of Singapore who may not have the idea of what to do and where to go.

---

## Organisational Goals

The main goal for this web application is to help local residents to notice and discover that there are many various places and activities awaiting them in Singapore .

The web application also aims to drive the economy growth in singapore by attracting local residents to spend more on their beloved nation.

---

## Structure

![Screenshots of wireframe](/screenshots/wireframe.png)

---

## Color Scheme

![Screenshots of color scheme](/screenshots/color-scheme.png)

### bluebell has silvers and pinks and yellows all within its delicate textures, and the blue is something we see simply at first glance

---

## Feature

| Features                                     | Description                                                                                                                                                                                                                               |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Search location by name                      | This search feature allows users to search for location. A simple algorithm is used to match the search query with the existing names in the dataset                                                                                      |
| Categorization of places to be explore       | This feature allows user to interact with the map to explore the various location dotted around Singapore. Picking on any of the description will trigger the expansion of the map console to display more information about the location |
| Display weather information                  | This feature allows users to check the current weather and prepare for necessity before going out                                                                                                                                         |
| Display nature park track and park connector | This feature allows users to check for the path of the nature park and plan their journey ahead "Solely for park" . Users can also connect with another park with park connector path provided                                            |
| Display user's current location              | This feature allows users to locate themselves on the map.                                                                                                                                                                                |
| Feedback form                                    | This feature allows users to submit suggestions or requests for assistance relating to the website. The form is designed with validation rules to prevent invalid inputs from being submitted.                                            |

---

## Limitations and Future Implementations

| Limitations                                                  | Future Implementations                                                                                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Current result display only shows location names and address | Provide more information regarding the location eg. Operating hours , pricing                                                        |
| Currently only display user's location                       | Implement navigation system that can navigate around the from user's location . Provide type of transportation for user to choose on |
| No database to store on user's feedback                      | Create a database to store on feedback data                                                                                          |
| Visual design is not attractive and friendly enough          | Implement more graphic impact like animation to catch user's eye                                                                     |

---

## Test Case

The test cases can be found [here](test-case/test-case.pdf).

---

## Technologies Used

1. HTML
    - Used to create a webpage
2. CSS
    - Used to styling the webpage

3. [Bootstrap 5.2](https://getbootstrap.com/docs/5.2/getting-started/introduction/)

   - Used for buttons, tabs and offcanvas of website

4. JavaScript
    -  Used to make webpage to be responsive

5. [Axios](https://github.com/axios/axios)

   - Used to fetch data from APIs used by website

6. [LeafletJS](https://leafletjs.com/)

   - Used to render interactive map used by website

7. [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)

   - Used to cluster map markers on map

8. [Leaflet Geolocation plug-in](https://github.com/domoritz/leaflet-locatecontrol)
   - Used to locate user's location

---

## Dataset

1. [Foursquare](https://developer.foursquare.com/reference/place-search)
   - Data to retrieve details for each location
2. [Domoritz Github leaflet-locate control](https://github.com/domoritz/leaflet-locatecontrol)
   - Plugin used to locate user's location
3. [OpenWeather API](https://openweathermap.org/)
   - Used to display current weather, weather forecast and icons on website
4. [Data.gov.sg](https://data.gov.sg/)
   - Geojson file is used to display the path

---

## Credits and Acknowledgement

### Fonts :

1. [Google Fonts](https://fonts.google.com/) - Used for fonts displayed in website

### Icons :

1. [Font Awesome](https://fontawesome.com/) - Used in tabs and buttons of website

2. [Flaticon](https://www.flaticon.com/) - Used in map marker icons of website

---

## Deployment

The web application is hosted by [Netlify](https://www.netlify.com/)

---

## Screenshot
[CreateMockup.com](https://www.createmockup.com/generate/) - Used to generate responsive website mockup for README file

