# Bacterifind

This project was created with the goal of increasing the efficiency of characterizing and identifying Enterobacteriaceae and other gram negative, oxidase negative bacteria.

The Enteropluri-Test is a 12 sector system, each of which contains a specific medium that changes in visual appearance after inoculation due to the specficic biochemical properties of the bacteria of interest.

For more information see https://www.liofilchem.com/featured-products/enteropluri-test.html.

## Technology

The back end of this project is built with Node and Express for the server, and Mongoose/MongoDB for the database. Because this project is hosted online for free, the port "goes to sleep" if nobody accesses this site for 30 minutes and then needs around 30 seconds to a few minutes to "wake up" again. To make this process smoother, I implemented server side rendering so that only one wake up period is necessary to access both the front and back end.
