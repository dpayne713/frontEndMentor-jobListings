const fs =              require('fs'); 
const url =             require('url');
const express =         require('express'); 
const replace =         require('./modules/replace');

const mainTemp = fs.readFileSync(`${__dirname}/templates/mainTemplate.html`, 'utf-8');
const jobTemplate = fs.readFileSync(`${__dirname}/templates/jobTemplate.html`, 'utf-8');
const qualTemplate = fs.readFileSync(`${__dirname}/templates/qualTemplate.html`, 'utf-8');

const app = express(); 
app.use(express.static('public'));

const data = JSON.parse(fs.readFileSync('./data/data.json', 'utf-8')); 

app.get('/', (req,res)=> {
    const {query, pathname}= url.parse(req.url, true); 

    let jobCards = data.map(el => replace(jobTemplate,qualTemplate, el)).join(''); 
    let mainHTML = mainTemp.replace(/{%jobListings%}/g, jobCards);
    res.status(200).send(mainHTML)
});

app.get('/clear', (req,res)=> {

    let jobCards = data.map(el => replace(jobTemplate,qualTemplate, el)).join(''); 
    let mainHTML = mainTemp.replace(/{%jobListings%}/g, jobCards);
    res.status(200).send(mainHTML)
}); 

app.get('*', (req,res)=> {
    res.status(404).send(`<h1>404 PAGE NOT FOUND</h1><a href="/">Go back</a>`);
})

app.listen(process.env.PORT || 3000, ()=> console.log('Server Running - port 3000'));
