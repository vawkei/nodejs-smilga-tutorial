let { people } = require("../data");


const getPeople = (req, res) => {
    res.status(200).json({ success: true, data: people });
    //this loads people data on the pweb page
  } ;

  const createPerson = (req, res) => {
    //so we can have access to req.body,the name input:
    const { name } = req.body;
    if (!name) {
      return res
        .status(404)
        .send({ success: false, msg: "Please provide a name" });
    } else {
      res.status(201).json({ success: true, person: name });
    }
  };

  const updatePerson =  (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    //console.log(id,name);
  
    const person = people.find((p) => {
      return p.id === Number(id);
    });
  
    if (!person) {
      return res
        .status(400)
        .json({ success: false, msg: `id number ${id} doesn't exist` });
    }
    const newPeople = people.map((p) => {
      if (p.id === Number(id)) {
        p.name = name;
      }
      return p;
    });
    res.status(200).json({ success: true, data: newPeople });
  };

  
const deletePerson =  (req, res) => {
    const person = people.find((p) => {
      return p.id === Number(req.params.id);
    });
    if (!person) {
      return res
        .status(404)
        .json({ success: false, msg: `No person with id ${req.params.id}` });
    }else{
      const newPeople = people.filter((p)=>{
        return p.id !== Number( req.params.id);
        
      })
      return res.status(200).json({success:true,data:newPeople})
    }
  };


  module.exports = {
    getPeople,
    createPerson,
    updatePerson,
    deletePerson 
  }