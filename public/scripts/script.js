const headerQueryTemp = 
`   <div id="{%elementVal%}">
    <span class="header__qualifications-type role-frontEnd visible">{%elementVal%}</span>
    <button name="{%element%}" value="{%elementVal%}" type="submit" class="header__qualifications-type-btn"><i class="fas fa-times"></i></button>
    </div>`

const doc = {
    headerQuery : document.querySelector('.header__qualifications'),
    jobListings : document.querySelector('.jobListings'),
    jobCards: document.querySelectorAll('.jobListings__listing'),
    clearBtn : document.querySelector('.header__qualifications-clear')
}

let selected = {
    role : [], 
    level : [], 
    languages : [], 
    tools : [],
    all() {
        return this.role.concat(this.level).concat(this.languages).concat(this.tools); 
    } 
}

doc.jobListings.addEventListener('click', event => {

    
    if (event.target.className ==='jobListings__listing--qualifications-type') {

        //put clear button on screen
        doc.clearBtn.classList.remove('invisible')

        //check if it's already selected
        if (!(selected[event.target.name].find(el => el===event.target.value))) {
            //ADD TO SELECTED LIST
            selected[event.target.name].push(event.target.value)
            //ADD TO HEADER QUALIFICATIONS BAR
            let markup = headerQueryTemp.replace(/{%elementVal%}/g, event.target.value).replace(/{%element%}/g, event.target.name);
            doc.headerQuery.insertAdjacentHTML('afterbegin', markup);
        }

        //iterate jobcards and remove cards not matching clicked value
        doc.jobCards.forEach(el => {
            let qual = el.dataset.qualifications.split(' ');
            let found = qual.some(j => j === event.target.value); 
            if (!found) {
                el.classList.add('invisible')
            } 
        });
        doc.jobCards = document.querySelectorAll('.jobListings__listing');     
    }; 
});


//remove buttons from header selection
doc.headerQuery.addEventListener('click', event => {
    let type = event.target.name;
    let val = event.target.value; 

    //remove filter
    doc.jobCards.forEach(el => {
        let qual = el.dataset.qualifications.split(' ');
        let found = qual.some(j => j === val); 

        if (!found) {
            el.classList.remove('invisible')
        } 
    });
    doc.jobCards = document.querySelectorAll('.jobListings__listing');

    //remove from selected object
    
    selected[type].splice(selected[type].findIndex(el=> el === val), 1); 
   
    //remove button from qualification bar
    let node = document.querySelector(`#${val}`);
    node.parentNode.removeChild(node);
    
    if (selected.all().length <1 ) doc.clearBtn.classList.add('invisible'); 
    
}); 
