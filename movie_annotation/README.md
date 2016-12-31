I have implemented all parts of the project correctly, to my knowlege
Of note however is the method I used for updating the annotations. I considered, briefly, using the listeners to start and stop a timer, getting a new time whenever it is resumed and starting a timer, but this method seemed simpler to implement and, most importantly, more robust, as it continously updates the time from the video and thus maintains a single point of truth. However, it is likely not the most efficient, as the function could update unnecessisarily at a time when the subtitles don't need to change.

I talked with Nikolas Shashok briefly about the peculiarities of Javascript

This lab took me between two and two and a half hours

