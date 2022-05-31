import templates from './templates.js';

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
}

moments.renderMoment = (moment) => {

    let momentContainer = document.querySelector('.moment-container');

    momentContainer.innerHTML = '';
    momentContainer.insertAdjacentHTML('beforeend', templates.subpageHeaderTemplate(moment));

    moment.templates.forEach((template, index) => {
 
        switch (template.template) {
    
            case '01':
 
                momentContainer.insertAdjacentHTML('beforeend', templates.template01(moment, template))

                break;

            case '02':

                momentContainer.insertAdjacentHTML('beforeend', templates.template02(moment, template))

                break;

            case '03':

                momentContainer.insertAdjacentHTML('beforeend', templates.template03(moment, template))

                break;
        }
    });

}

/* 

    Basic Data Form.

*/
momentForm.addEventListener('submit', (e) => {

    console.log('Submitting');
    e.preventDefault();

    let bodyData = e.currentTarget.elements.moment.value.trim();
    bodyData = bodyData.replace(/\r?\n|\r/g, "")
    let validJson = moments.isJsonString(bodyData);


    if(!validJson) {

        alert('Invalid Json')

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
    
            console.log('Response', response)
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
    }

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
        let report = document.querySelector('.report');
        let preview = document.querySelector('.section-preview');
        let description = document.querySelector('.section-description');
        let finalize = document.querySelector('.section-finalize');
        momentLabel.textContent = `Super! - Du har oprettet ${response.templates.length} ${response.templates.length === 1 ? 'template' : 'templates'}`

        // momentFormTmpl.classList.add('hide');
        done.classList.remove('hide');
        preview.classList.remove('hide');

        done.addEventListener('click', () => {


            let formSections = document.querySelectorAll('.form-section');
            formSections.forEach(sec => sec.classList.add('hide')) 
            preview.classList.add('hide');
           
            description.innerHTML = '';
            description.insertAdjacentHTML('beforeend', `<p class="p">Nu har du en færdig moment mappe <b>(${response.id})</b> placeret i din ".data/moments/" mappe. (<b>.data/moments/${response.id}</b>)</p>`)
            // description.insertAdjacentHTML('beforeend', `<p class="p">Denne mappe kan du teste på det lokale site. Denne mappe skal afleveres til en moderator.</p>`)
            
        })
       
        moments.renderMoment(response);
    } );

})


done.addEventListener('click', () => {


    console.log('Done')


})