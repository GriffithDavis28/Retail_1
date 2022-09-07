const express = require('express');
const router = express.Router();

const Customers = [
    {id: 1, name:"Customer 1" },
    {id: 2, name:"Customer 2" },
    {id: 3, name:"Customer 3" }
];

router.get('/', (req,res) => {
    res.send(Customers);
  });
  
  router.get('/:id', (req, res) => {
      const customer = Customers.find(c=> c.id == parseInt(req.params.id));
      if(!customer) res.status(404).send("The customer with the id does not exist");
      res.send(customer);
  });
  
  router.post('/', (req, res) => {
      const schema = Joi.object({
          id: Joi.string().min(1).required(),
          name: Joi.string().min(3).required()
      });
      const validation = schema.validate(req.body);
      res.send(validation);
  
      if(!req.body.name || req.body.name.length < 3) {
          res.status(400).send("Name should be at least 3 characters");
          return;
      }
      const customer = {
          id: Customers.length + 1,
          name: req.body.name
      };
      Customers.push|(customer);
      res.send(customer);
  });

module.exports = router;