const express = require('express'); // import express
const Joi = require('joi'); //used for validation
const app = express(); // create express application and store in  app variable
app.use(express.json());  // use the jason file     
 

// give data to the server
const customers = [
{title: 'Harry', id: 1},
{title: 'john', id: 2},     
{title: 'mark', id: 3},
{title: 'jimmy', id: 4}

]
 
//READ Request Handlers
app.get('/', (req, res) => {

    res.send('Welcome to Akshadas REST API with Node.js');
});
 // Display the list of customers when url consist of pi customers
app.get('/api/customers', (req,res)=> {
    res.send(customers);
});

// Display the info of specific customer when you mention id
app.get('/api/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
// if there is no valid customer id,then display error
    if (!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
    res.send(customer);
});
 
//CREATE Request Handler
// Create new customer info
app.post('/api/customers', (req, res)=> {
 
    const { error } = validateCustomer(req.body);
    if (error){
        res.status(400).send(error.details[0].message)
        return;
}
// increament the customer id
    const customer = {
        id: customers.length + 1,
        title: req.body.title
    };
    customers.push(customer);
    res.send(customers);
});
 
//UPDATE Request Handler
// update existing cutomer info

app.put('/api/customers/:id', (req, res) => {
    const customer = customers.find(c=> c.id === parseInt(req.params.id));
    if (!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');
 
    const { error } = validateCustomer(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
    return;
    }
 
    customer.title = req.body.title;
    res.send(customer);
});
 
//DELETE Request Handler
// Delete customer info by id
app.delete('/api/customers/:id', (req, res) => {
 
    const customer = customers.find( c=> c.id === parseInt(req.params.id));
    if(!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');
 
    const index = customers.indexOf(customer);
    customers.splice(index,1);
 
    res.send(customer);
});
// validate info

function validateCustomer(customer) {
    const schema = {
    title: Joi.string().min(3).required()
};
return Joi.validate(customer, schema);
 
}
 
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));