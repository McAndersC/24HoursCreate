// Require Node Dependencies.
const fs = require('fs');

const moments = {};

moments.writeMomentHtmlFile = (moment, momentFolderPath) => {

    // moment.id = moment.time.replace(':', '-') + '-' + moment.title.replaceAll(' ', '-').toLowerCase();
    

    let fileName = moment.id + '.html';
    let momentsPath = momentFolderPath + '/' + fileName;

    fs.copyFile('./lib/templates/moment.html', momentsPath, (err) => {
            
        if (err) {

            throw err

        }

        // Reading -> index.html
        fs.readFile(momentsPath, 'utf8', (err, data) => {
    
            if (err) {

                throw err
    
            }

            // Parsing Meta & Doc title in -> index.html
            let docTitle = moment.time + ' ' + moment.title

            console.log('DATA', data)

            data = data.replace(/\[META_TITLE\]/g, docTitle);
            data = data.replace(/\[META_DESCRIPTION\]/g, moment.description);
            data = data.replace(/\[META_URL\]/g, moment.url);

            // Writing parsed index.html
            fs.writeFile(momentsPath, data, 'utf8', (err) => {
                
                if (err) {
                    
                    throw err;
                }
        
            });
    
        });
    
    });

}

moments.writeMomentsJsonFile = (moment, callback) => {

    let momentsPath = './data/moments/';
    let momentsData = './data/moments.json';

        // Writing moment file -> data/data.json 
        fs.writeFile(momentsPath + moment.id + "/data/" + moment.id + ".json", JSON.stringify(moment), 'utf8', (err) => {
            
            if (err) {
                
                throw err;
            }
    
            // Reading moments file -> moments.json 
            fs.readFile(momentsData, 'utf8', (err, data) => {

            
                data = JSON.parse(data);

        
                data.push(moment);
                
                // Writing moments file -> moments.json
                fs.writeFile(momentsData, JSON.stringify(data), 'utf8', () => {

                    callback(200, data)

                });

            });

        });
}

moments.writeMomentJsonFile = (moment) => {

    let momentsPath = './data/moments/' + moment.id + '/data/';

        // Writing moment file -> data/data.json 
        fs.writeFile(momentsPath + moment.id + ".json", JSON.stringify(moment), 'utf8', (err) => {
            
            if (err) {
                
                throw err;
            }
    
            moments.writeMomentHtmlFile(moment, './data/moments/'  + moment.id + '/');
        });
}

moments.createPagesFromReleaseData = () => {

    let momentsPath = './data/release/moments/';
    let momentsData = './data/release/data/moments.json';
    
    fs.readFile(momentsData, 'utf8', (err, data) => {

        data = JSON.parse(data);
        data.forEach((moment) => moments.writeMomentHtmlFile(moment, momentsPath))

    });

}

moments.createFolders = (folderName) => {

    console.log('folderName', folderName)
    let dir = './data/moments/' + folderName;

    if(!fs.existsSync(dir))
    {
        fs.mkdirSync(dir);
        fs.mkdirSync(dir + '/data');
        fs.mkdirSync(dir + '/assets');
        fs.mkdirSync(dir + '/assets/' + folderName);

        console.log('Opretter mappe:' + folderName)

    } else {

        console.log('\x1b[31m%s\x1b[0m', 'Opretter Moment')
        console.log('\x1b[31m%s\x1b[0m', folderName + ' :: Mappen er allerede oprettet og vi overskriver data ')

    }

};

moments.createFiles = (moment) => {

    moments.writeMomentJsonFile(moment);

}

module.exports = moments;
