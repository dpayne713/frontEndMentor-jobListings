module.exports = (temp, qTemp, d) => {
    let output;
    if (d.company) output = temp.replace(/{%company%}/g, d.company); 
    if (d.logo) output = output.replace(/{%logo%}/g, d.logo);
    (d.new) ? output = output.replace(/{%new%}/g, `<span class="jobListings__listing--details-company-NEW">NEW!</span>`) : output = output.replace(/{%new%}/g, ``);
    (d.featured) ? output = output.replace(/{%featured%}/g, `<span class="jobListings__listing--details-company-FEATURED">FEATURED</span>`) : output = output.replace(/{%featured%}/g, ``);
    if (d.position) output = output.replace(/{%position%}/g, d.position); 
    if (d.postedAt) output = output.replace(/{%postedAt%}/g, d.postedAt); 
    if (d.contract) output = output.replace(/{%contract%}/g, d.contract); 
    if (d.location) output = output.replace(/{%location%}/g, d.location);
    let qualOutput;
    if (d.role) {
        qualOutput = qTemp.replace(/{%elementVal%}/g, d.role).replace(/{%element%}/g, 'role');
        output = output.replace(/{%role%}/g, d.role);
    }
    if (d.level) {
        qualOutput = qualOutput+ qTemp.replace(/{%elementVal%}/g, d.level).replace(/{%element%}/g, 'level');
        output = output.replace(/{%level%}/g, d.level);
    }
    if (d.languages) {
        d.languages.forEach(el => qualOutput = qualOutput + qTemp.replace(/{%elementVal%}/g, el).replace(/{%element%}/g, 'languages'))
        output = output.replace(/{%languages%}/g, d.languages.join(' ')); 
    };
    if (d.tools) {
        d.tools.forEach(el=> qualOutput = qualOutput + qTemp.replace(/{%elementVal%}/g, el).replace(/{%element%}/g, 'tools'));
        output = output.replace(/{%tools%}/g, d.tools.join(' ')); 
    };
    output = output.replace(/{%qualifications%}/g, qualOutput)
    return output
}