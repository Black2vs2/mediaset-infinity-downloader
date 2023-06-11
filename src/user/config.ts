export default {
  showDebugInfo: false,
  ytDlpPath: 'src/executables/yt-dlp.exe',
  output: {
    customOutputName: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    customOutputNameFunction: (link: string, index: number): string =>
      link.split('/terraamara/')[1].split('_')[0],

    outputFolder: 'output',
  },
};
