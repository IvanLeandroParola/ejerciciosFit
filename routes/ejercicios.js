const express = require('express');
const router = express.Router();
const data = require('../data/ejercicio');
const auth = require('../middleware/auth')

/* otra forma, esta ok? */
router.get('api/ejercicios/', async (req, res) =>{
  let ejercicios = await data.getEjercicios();
  res.json(ejercicios);
});

router.get('api/ejercicios/:id', async (req, res) =>{
  const id = req.params.id;
  res.json(ejercicios.filter(data => data.id == parseInt(id))); 
  res.end();
});
/* otra forma, esta ok? */

router.get('/', auth, async (req, res) =>{
  let ejercicios = await data.getEjercicios(req.query.tipo, req.query.dificultad);
  res.json(ejercicios);
});

router.get('/:id', auth, async (req, res) =>{
    let ejercicios = await data.getEjercicio(req.params.id);
    res.json(ejercicios);
});

router.post('/', auth, async (req, res)=>{
    const result = await data.addEjercicio(req.body);
    res.send(result);
  });

router.put('/:id', auth, async (req, res)=>{
  const result = await data.updateEjercicio(req.params.id, req.body);
  res.send(result);
});

router.delete('/:id', auth, async (req, res)=>{
  const result = await data.deleteEjercicio(req.params.id);
  res.send(result);
});

//CRUD: 

//get /:id
//get /:tipo
//get /:dificultad

//post / --> (esto es el alta)

//put /:id -->(para actualizar): router.put or router.patch

//detele /:id

module.exports = router;
