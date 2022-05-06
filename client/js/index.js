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

    Form EventListners

*/

/* 

    Basic Data Form.

*/
momentForm.addEventListener('submit', (e) => {

    e.preventDefault();

    let bodyData = e.currentTarget.elements.moment.value;
    let validJson = moments.isJsonString(bodyData);
    console.log(moments.isJsonString(bodyData));

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

        // console.log('Response', response);

        let momentLabel = document.querySelector('.momentLabel');
        let report = document.querySelector('.report');
        let preview = document.querySelector('.section-preview');
        momentLabel.textContent = `Super! - Du har oprettet ${response.templates.length} ${response.templates.length === 1 ? 'template' : 'templates'}`

        // momentFormTmpl.classList.add('hide');
        done.classList.remove('hide');
        preview.classList.remove('hide');

       
        moments.renderMoment(response);
    } );

})


done.addEventListener('click', () => {


    console.log('Done')


})