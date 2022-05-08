// Require Node Dependencies.
const express = require('express');
const fs = require('fs');
const path = require('path');
const moments = require('./moments');
const cors = require("cors");

// Constants.
const expressServer = express();
const server = {};

// Express Metoder. De fungere som hjælpere til at håndtere http requests osv.
expressServer.use(express.json());
expressServer.use(cors());
expressServer.use(express.static(path.join(__dirname, '../.data')));
expressServer.use(express.static(path.join(__dirname, '../client')));
expressServer.use(express.urlencoded({

  extended: true

}));

expressServer.get('/', (req, res) => {

    res.sendFile(path.resolve(__dirname, '../client/index.html'));

});

expressServer.post('/templates', (req, res) => {
   
    let response = req.body;

    let momentId = response.id;
    let template = response.payload;

    let momentsPath = './.data/moments/' + momentId + '/data/' + momentId +'.json';

    fs.readFile(momentsPath, 'utf8', (err, data) => {

        if (err) {

            throw err

        }
    
        data = JSON.parse(data);

        if(!data.templates) {
            data.templates = [];
        }
        
        data.templates.push(JSON.parse(template))

        fs.writeFile(momentsPath, JSON.stringify(data), 'utf8', (err) => {
        
            if (err) {
                
                throw err;
            }
            console.log('\x1b[31m%s\x1b[0m', 'Tilføjer Template')
            res.setHeader('content-type', 'application/json');
            res.status(201).send(data);

        });
        
    });
});


// Moment Create.
expressServer.post('/moment/create', (req, res) => {

    let moment = req.body;
    // moment.id = moment.time.replace(':', '-') + '-' + moment.title.replaceAll(' ', '-').toLowerCase();
    moment.id = moment.time.replace(':', '-');

    let folderName = moment.id;
    moment.url = '/moments/' + folderName + '.html';

    moments.createFolders(moment.id);
    moments.createFiles(moment);

    let returnResult = {
        id: moment.id
    }

    res.setHeader('content-type', 'application/json');
    res.status(201).send(returnResult);


});

 // Init metode til at starte serveren.
server.run = () => {

    // Port som vi lytter på.
    let port = 1337;

    // Starter HTTP server.
    expressServer.listen(port, () => {

        console.log('\x1b[31m%s\x1b[0m','\n-------\nVores Moment Create Server køre på http://localhost:' + port);

    });

};

// Exporting
module.exports = server;