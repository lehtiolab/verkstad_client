# Verkstad

_The mass spectrometry maintenance app_

Make your mass spec maintenance team happy by providing them with a coffee, a tablet and
this app!

![Home page](https://raw.githubusercontent.com/mtstahl/verkstad_client/master/screenshots/screenshot_01.png)
Tasks to be done.

## What does this piece of software do?

This is vue.js-based todo app, which serves and is intended to organize tasks for the maintenance of
[modern proteomics mass spectrometers](https://en.wikipedia.org/wiki/Mass_spectrometry).

Each day one has to check the injection needles, run quality control
samples, or exchange liquid chromatography components. In order to keep
an overview of all these tasks, the **Verkstad** app for mass spec
maintenance was developed and is now applied in the [Lehtiö laboratory](http://lehtiolab.se).

The frontend (which you see here) is able to commuicate with a
[server-based node.js app](https://github.com/mtstahl/verkstad_server), which
maintaines a sqlite database.

![Add a new task](https://raw.githubusercontent.com/mtstahl/verkstad_client/master/screenshots/screenshot_02.png)
Add a new task.

![Check a task](https://raw.githubusercontent.com/mtstahl/verkstad_client/master/screenshots/screenshot_03.png)
Check a task.

## Can I use Verkstad, too?

Yes, of course. Just clone this repo and run `npm run build`. The resulting
`dist` folder is ready to be served by your machines. Also clone the
[server repo](https://github.com/mtstahl/verkstad_server) and adjust
URLs and ports. Also you can directly pull and run the docker image
`matthiasstahl/verkstad_server`. Please refer to the descriptions
[here](https://github.com/mtstahl/verkstad_server)
