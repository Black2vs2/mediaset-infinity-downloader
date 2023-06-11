import * as child from 'child_process';

import episodes from './user/episodes';
import config from './user/config';

console.log('Starting download process...');
if (config.output.customOutputName) console.log('Using custom output name');

episodes.forEach((episodeLink, index) => {
  // Default naming convention, to use a custom one provide a customOutputNameFunction and enable customOutputName
  let episodeFileName = `episode-${index}`;
  if (config.output.customOutputName) {
    // Write here your file name format, otherwise set changeOutputName to false
    episodeFileName = config.output.customOutputNameFunction(
      episodeLink,
      index,
    );
  }

  console.log(`Started processing ${episodeFileName}`);
  child.exec(
    `"${config.ytDlpPath}" -vU ${episodeLink} -o ${config.output.outputFolder}/${episodeFileName}`,
    (_, out, e) => {
      if (out) {
        console.log(`Finished ${episodeFileName}`);
      }
      if (config.showDebugInfo && e) {
        console.error(e);
      }
    },
  );
});
