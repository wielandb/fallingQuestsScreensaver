# fallingQuestsScreensaver
A website that shows solved StreetComplete-quests bouncing around as little balls, that can be used as a screensaver for example, or even as an eye-catcher at a conference etc.

## How to use it

### Using it in the browser

If you want to use it as an eye-catcher at a conference or just want to check it out, you can simply go to [this GitHub Pages Website](https://wielandb.github.io/fallingQuestsScreensaver/export/html5/) and press F11. If you want to use it as a screensaver, you can use the Steam app [Wallpaper Engine](https://store.steampowered.com/app/431960/Wallpaper_Engine/).

### How to set up the website as a screen saver using Wallpaper Engine

1: Make sure you are changing your screen saver. Go to "Installed" and select "Set screen saver" if the text above does not say "screen saver"

![we-1](readme-assets/we-1.png)

2: Make sure your screen saver is set to "configured seperately".

![we-2](readme-assets/we-2.png)

3: Go to "Open background" and then "Open from URL"

![](readme-assets/we-3.png)

4: Paste the URL https://wielandb.github.io/fallingQuestsScreensaver/export/html5/ into the URL field, and give it a name you will remember it by later.

![we-4](readme-assets/we-4.png)

5: Hit "OK"

## How to contribute

### Contributing without Construct 3

This application is made with Construct 3, a proprietary and paid game engine. So to edit and contribute to the project files, you'll need Construct 3. However, the main logic is written in JavaScript and is view- and editable at this location. So if you want to contribute changes to the main logic without needing C3, you could do it by PRing the respective JS in the projectfiles-folder. Then someone with C3 could implement the changes in the project files. 

### Contributing using Construct 3

If you contribute using Construct 3, please use the following workflow:

- Open the .c3p-File to work on the project
- Make your changes
- Bump the version number, at least by one at the last digit
- Use Menu > Save Project As > Single Project File and select the file in `projectfiles/single/`
- Use Menu > Save Project As > Project Folder and select the folder `projectfiles/folder/`
- Use Menu > Export > HTML5 to export the HTML5-Version of the project to `export/html5`

Use these settings on the export:

![c3-1](readme-assets\c3-1.png)

## License

Made with Construct 3. Licensed under MIT. The SVGs for the quests found in (among other places) /projectfiles/folder/files/quests are taken from [StreetComplete](https://github.com/streetcomplete/StreetComplete/) and are licensed under CC-BY-SA.
