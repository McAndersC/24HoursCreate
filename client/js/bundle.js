
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
    'use strict';

    const templates = {};

    templates.template01 = (moment, template) => { 

        return `
        <section class="threexfour fadeInUp">
            <div class="container-75">
                <div class="row">
                    <div class="col1">
                        <img src="/moments/${moment.id}/assets/${moment.id}/${template.media[0].image}" /> <!-- Variabler som skal tages ud fra Jason -->
                        <p class="pic-text"><span class="square"></span>${template.media[0].text}</p>
                    </div>
                    <div class="col2" style="width: 1.6vw;">
                    </div>
                    ${template.media.length === 1 ? '' : `
                        <div class="col3">
                        <img src="/moments/${moment.id}/assets/${moment.id}/${template.media[1].image}" />
                        <p class="pic-text"><span class="square"></span>${template.media[1].text}</p>
                    </div>`}
                    
                </div>
            </div>
        </section>
    `
    };

    templates.template02 = (moment, template) => {
        // console.log(moment)
        return `
    <section class="fourxthree">
        <div class="container-75" style="margin: auto;">
            <img src="/moments/${moment.id}/assets/${moment.id}/${template.media[0].image}" />
            <p class="pic-text"><span class="square"></span>${template.media[0].text}</p>
        </div>
    </section>
    `
    };

    templates.template03 = (moment, template) => {
        return `
    <section class="onexone">
        <div class="container-75">
        <img src="/moments/${moment.id}/assets/${moment.id}/${template.media[0].image}" /> 
            <p class="pic-text"><span class="square"></span>${template.media[0].text}</p>
        </div>
    </section>
    `
    };

    templates.subpageHeaderTemplate = (moment) => 
        `
        <section class="hero">
            <div class="container-75">
                <div class="row">
                    <div class="col1">
                        <img src="/moments/${moment.id}/assets/${moment.id}/${moment.square}" alt="${moment.description}">
                    </div>
                    <div class="col2" style="width: 3vw;">

                    </div>
                    <div class="col3">
                        <p class="time">${moment.time}</p>
                        <h1 class="display-text">${moment.title}</h1>
                        <div class="spacer"></div>
                        <p class="body-text">${moment.description}</p>
                        <div class="spacer"></div>
                        <p class="byline">© Foto: ${moment.author}</p>
                    </div>
                </div>
            </div>
        </section>
    `;

    const done = document.querySelector('.done');
    const momentForm = document.querySelector('#form-moment');
    const momentFormTmpl = document.querySelector('#form-moment-templates');

    /* 

        Preview Moments

    */
    const moments = {};

    moments.isJsonString = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    };

    moments.renderMoment = (moment) => {

        let momentContainer = document.querySelector('.moment-container');

        momentContainer.innerHTML = '';
        momentContainer.insertAdjacentHTML('beforeend', templates.subpageHeaderTemplate(moment));

        moment.templates.forEach((template, index) => {
     
            switch (template.template) {
        
                case '01':
     
                    momentContainer.insertAdjacentHTML('beforeend', templates.template01(moment, template));

                    break;

                case '02':

                    momentContainer.insertAdjacentHTML('beforeend', templates.template02(moment, template));

                    break;

                case '03':

                    momentContainer.insertAdjacentHTML('beforeend', templates.template03(moment, template));

                    break;
            }
        });

    };

    /* 

        Basic Data Form.

    */
    momentForm.addEventListener('submit', (e) => {

        e.preventDefault();

        let bodyData = e.currentTarget.elements.moment.value;
        let validJson = moments.isJsonString(bodyData);
        console.log(moments.isJsonString(bodyData));

        if(!validJson) {

            alert('Invalid Json');

        }

        if(validJson) {
            fetch('/moment/create',  
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: bodyData
        
            })
            .then((response) => response.json()).then( (response) => {
        
                momentForm.classList.add('hide');
                momentFormTmpl.classList.remove('hide');
        
                momentFormTmpl.dataset.moment = response.id;
        
            });
        }


    });

    /* 

        Template Data Form.

    */
    momentFormTmpl.addEventListener('submit', (e) => {

        e.preventDefault();
        
        let bodyData = e.currentTarget.elements.momentTmpl.value;
        let id = e.currentTarget.dataset.moment;

        let response = {
            "id" : id,
            "payload": bodyData
        };

        fetch('/templates',  
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(response)

        })
        .then((response) => response.json()).then( (response) => {

            console.log('Response', response);

            let momentLabel = document.querySelector('.momentLabel');
            document.querySelector('.report');
            let preview = document.querySelector('.section-preview');
            let description = document.querySelector('.section-description');
            document.querySelector('.section-finalize');
            momentLabel.textContent = `Super! - Du har oprettet ${response.templates.length} ${response.templates.length === 1 ? 'template' : 'templates'}`;

            // momentFormTmpl.classList.add('hide');
            done.classList.remove('hide');
            preview.classList.remove('hide');

            done.addEventListener('click', () => {


                let formSections = document.querySelectorAll('.form-section');
                formSections.forEach(sec => sec.classList.add('hide')); 
                preview.classList.add('hide');
               
                description.innerHTML = '';
                description.insertAdjacentHTML('beforeend', `<p class="p">Nu har du en færdig moment mappe <b>(${response.id})</b> placeret i din ".data/moments/" mappe. (<b>.data/moments/${response.id}</b>)</p>`);
                // description.insertAdjacentHTML('beforeend', `<p class="p">Denne mappe kan du teste på det lokale site. Denne mappe skal afleveres til en moderator.</p>`)
                
            });
           
            moments.renderMoment(response);
        } );

    });


    done.addEventListener('click', () => {


        console.log('Done');


    });

})();
