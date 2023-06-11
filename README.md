# Mediaset Infinity Downloader

Mediaset Infinity Downloader is a typescript library to download [Mediaset Infinity](mediasetinfinity.mediaset.it) movies or tv-series.
It uses [yt-dlp](https://github.com/yt-dlp/yt-dlp) to download the actual episodes.

## Installation

To use mediaset-infinity-downloader, clone this repo and cd into the cloned folder.
Then you have to install needed packages

```bash
# Install typescript runner
npm install --global ts-node

# Install project packages
npm install
```

## Setup
1. Make ```yt-dlp``` accessible to the script:
    1. Download the executable (for your machine)
    2. Put the executable into the folder ```src/executables```
2. Tweak your ```src/user/config.ts``` file making sure the ```ytDlpPath``` is correct and the ```outputFolder``` exists.
3. Fill in your ```src/user/episodes.ts``` with an array of strings containing the episode or movie page. Example below
    ```typescript
    export default [
      'https://mediasetinfinity.mediaset.it/video/terraamara/episodio-243_F311851102010702',
      'https://mediasetinfinity.mediaset.it/video/terraamara/episodio-242_F311851102010602',
    ];
    ```
## How to use
```typescript
# cd into the project folder
cd mediaset-infinitry-downloader
# run the script
npm run start
```
## Tips And Tricks
### Customizing files output name
By default yt-dlp uses the name that the .mp4 you are about to download as the output file name
I've added in the config a way to programmatically change the output of the file name. Follow steps below to use it
1. Enable ```customOutputName``` in the src/user/config.ts
2. Adjust ```customOutputNameFunction``` to output a string that will be automatically be used as the file name for the corresponding element in the array.
### To gather the list of links there are three ways
* **Simplest, safest but most time-consuming**
    1. Open each episode page and copy the link manually.
    2. Add it to ```episodes.ts``` array surrounded by ticks.
* **Most prone to fail (if mediasetinfinity changes the page structure) but fastest**
    1. Scroll to the bottom in the episodes list page
    2. Open browser console and paste this js ```copy($$('a[href*="/video/"]').map((x)=>x.href))```
    3. You will find in your clipboard the array of all episodes links
    4. Paste the episodes array into the ```episodes.ts``` file
* **Most reliable (requires some expertise)**
    1. Open an episodes list page (example: https://mediasetinfinity.mediaset.it/fiction/bitterlands/episodi_SE000000001766,ST000000003181,sb100018308)
    2. Open devtools and go to Network Tab
    3. Scroll to the bottom of the page
    4. You will see a new ```type:'fetch'``` request appearing named ```mediaset-prod-all-programs-v2```
    5. Right click then ```Copy > Copy as fetch```
    6. Go to Console Tab of the devtools
    7. Paste the copied fetch (example below)
        ```javascript
        fetch("https://feed.entertainment.tv.theplatform.eu/f/PR1GhC/mediaset-prod-all-programs-v2?byCustomValue={subBrandId} 
        {100018308}&sort=:publishInfo_lastPublished|desc,tvSeasonEpisodeNumber|desc&range=1-1000", {
        "headers": {
            "accept": "*/*",
            "accept-language": "it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7",
            "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site"
        },
        "referrer": "https://mediasetinfinity.mediaset.it/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
        });
        ```
    8. Modify the ```range``` queryParam to any number you want (in the example above i modified it to 1 to 1000)
    9. Run the ```fetch``` by pressing enter
    10. Go back to Network Tab
    11. Select the request we just did and in the preview tab right click ```entries``` and press ```Copy value```.
    12. Paste the episodes array into the ```episodes.ts``` file