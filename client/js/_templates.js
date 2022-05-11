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
}

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
}

templates.template03 = (moment, template) => {
    return `
    <section class="onexone">
        <div class="container-75">
        <img src="/moments/${moment.id}/assets/${moment.id}/${template.media[0].image}" /> 
            <p class="pic-text"><span class="square"></span>${template.media[0].text}</p>
        </div>
    </section>
    `
}

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
    `
export default templates