// Require Node Dependencies.
const fs = require('fs');

const moments = {};

moments.writeMomentHtmlFile = (moment) => {

    // moment.id = moment.time.replace(':', '-') + '-' + moment.title.replaceAll(' ', '-').toLowerCase();
    moment.id = moment.time.replace(':', '-');

    let fileName = moment.id + '.html';
    let momentsPath = './.data/moments/' + moment.id + '/' + fileName;

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
            data = data.replaceAll('[DOC_TITLE]', docTitle);
            data = data.replaceAll('[META_DESCRIPTION]', moment.description);
            data = data.replaceAll('[DOC_URL]', moment.url);

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

    let momentsPath = './.data/moments/';
    let momentsData = './.data/moments.json';

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

    let momentsPath = './.data/moments/' + moment.id + '/data/';

        // Writing moment file -> data/data.json 
        fs.writeFile(momentsPath + moment.id + ".json", JSON.stringify(moment), 'utf8', (err) => {
            
            if (err) {
                
                throw err;
            }
    
            moments.writeMomentHtmlFile(moment);
        });
}

moments.createFolders = (folderName) => {

    let dir = './.data/moments/' + folderName;

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
