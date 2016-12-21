

const {desktopCapturer,ipcRenderer: ipc, screen} = electron

function appScreenshot(desktopCapturer, screen, done) {
    const options = { types: ['window', 'screen'], thumbnailSize: screen.getPrimaryDisplay().workAreaSize };
    desktopCapturer.getSources(options, (err, sources) => {
        if (err) return console.log('Cannot capture windows');

        const isMainWindow = source => source.name === document.title || source.name === 'Screen 1';
        done(sources.filter(isMainWindow)[0]);
    });

}
function onCapture(evt,targetPath) {
    appScreenshot(desktopCapturer, screen, source => {
        const png = source.thumbnail.toPng();
        var date = new Date(); //UNDONE: meter segundos pois pode tirar prints em minutos iguais
        const filePath = path.join(targetPath, 'full-' + date.toISOString().replace('T', '_').replace(':', '-').substr(0, 16) + '.png');
        writeScreenshot(png, filePath);

        console.log("here");
    });
}

function writeScreenshot(png, filePath) {
    fs.writeFile(filePath, png, err => {
        if (err) return console.log('Failed to save window: ', err);
    });
}

ipc.on('capture', onCapture);