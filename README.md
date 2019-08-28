# Verkstad

_The mass spectrometry maintenance app_

Make your mass spec maintenance team happy by providing them with a coffee, a tablet and
this app!

![Home page](https://raw.githubusercontent.com/higsch/verkstad_client/master/screenshots/screenshot_01.png)
Tasks to be done.

## What does this piece of software do?

This is a Vue.js-based todo app, which serves and is intended to organize tasks for the maintenance of
[modern proteomics mass spectrometers](https://en.wikipedia.org/wiki/Mass_spectrometry).

Each day one has to check the injection needles, run quality control
samples, or exchange liquid chromatography components. In order to keep
an overview of all these tasks, the **Verkstad** app for mass spec
maintenance was developed and is now applied in the [Lehtiö laboratory](http://lehtiolab.se).

The frontend (which you see here) is able to communicate with a
[server-based node.js app](https://github.com/higsch/verkstad_server), which
maintains a sqlite database.

![Add a new task](https://raw.githubusercontent.com/higsch/verkstad_client/master/screenshots/screenshot_02.png)
Add a new task.

![Check a task](https://raw.githubusercontent.com/higsch/verkstad_client/master/screenshots/screenshot_03.png)
Check a task.

## Can I use Verkstad, too?

Yes, of course. Just clone this repo, adjust the API address in `src/services/Api.js`
and run `npm run build`. The resulting
`dist` folder is ready to be served by your machines. Also clone the
[server repo](https://github.com/higsch/verkstad_server) and adjust
URLs and ports. Alternatively, you can directly pull and run the docker image
`matthiasstahl/verkstad_server`. Please refer to the descriptions
[here](https://github.com/higsch/verkstad_server).

## Sidenote
This project was built during some very long nights in Stockholm's winter 2019.
