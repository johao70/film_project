const { Router } = require('express');

const persona = require('../controllers/personaCRUD');
const router = Router();

router.get('/', (req, res) => res.send('Bienvenido'))

router.get('/persona', persona.getData);
router.post('/persona', persona.postData);
router.put('/persona', persona.putData);
router.delete('/persona', persona.deleteData);

module.exports = router;



// //metodos compras
// router.get("/compra", (req, res) => {
//     const { query } = req;
//     compras.findAll({ where: query })
//         .then(compra => {
//             res.json(compra);
//         })
//         .catch(err => {
//             res.send("error: " + err);
//         });
// });
// router.post("/compra", (req, res, next) => {
//     const datos = {
//         numero_boletos: req.body.numero_boletos,
//         idpersona: req.body.idpersona,
//         idsala: req.body.idsala,
//     };

//     if (!datos) {
//         res.status(400);
//         res,
//             json({
//                 error: "Datos incorrectos"
//             });
//     } else {
//         compras.create(datos)
//             .then(data => {
//                 res.send(data);
//             })
//             .catch(err => {
//                 res.json("error: " + err);
//             });
//     }
// });
// router.put("/compra", async (req, res) => {
//     const { id } = req.query;
//     const { numero_boletos, idpersona, idsala } = req.body;
//     const data = await compras.findAll({
//         atributes: ["numero_boletos", "idpersona", "idsala"],
//         where: {
//             id
//         }
//     });

//     if (data.length > 0) {
//         data.forEach(async element => {
//             await element.update({
//                 id,
//                 numero_boletos,
//                 idpersona,
//                 idsala
//             });
//         });
//     }
//     return res.json({
//         message: "actualizado",
//         data: data
//     })
// });
// router.delete("/compra", async (req, res) => {
//     const { id } = req.query;
//     const eliminar = await compras.destroy({
//         where: { id }
//     });
//     res.json({
//         message: "eliminado",
//         data: eliminar
//     })
// });

// //metodos horarios
// router.get("/horario", (req, res) => {
//     const { query } = req;
//     horarios.findAll({ where: query })
//         .then(horario => {
//             res.json(horario);
//         })
//         .catch(err => {
//             res.send("error: " + err);
//         });
// });
// router.post("/horario", (req, res, next) => {
//     const datos = {
//         hora: req.body.hora,
//     };

//     if (!datos) {
//         res.status(400);
//         res,
//             json({
//                 error: "Datos incorrectos"
//             });
//     } else {
//         horarios.create(datos)
//             .then(data => {
//                 res.send(data);
//             })
//             .catch(err => {
//                 res.json("error: " + err);
//             });
//     }
// });
// router.put("/horario", async (req, res) => {
//     const { id } = req.query;
//     const { hora } = req.body;
//     const data = await horarios.findAll({
//         atributes: ["hora"],
//         where: {
//             id
//         }
//     });

//     if (data.length > 0) {
//         data.forEach(async element => {
//             await element.update({
//                 id,
//                 hora,
//             });
//         });
//     }
//     return res.json({
//         message: "actualizado",
//         data: data
//     })
// });
// router.delete("/horario", async (req, res) => {
//     const { id } = req.query;
//     const eliminar = await horarios.destroy({
//         where: { id }
//     });
//     res.json({
//         message: "eliminado",
//         data: eliminar
//     })
// });

// //metodos pelicilas
// router.get("/pelicula", (req, res) => {
//     const { query } = req;
//     peliculas.findAll({ where: query })
//         .then(peli => {
//             res.json(peli);
//         })
//         .catch(err => {
//             res.send("error: " + err);
//         });
// });
// router.post("/pelicula", (req, res, next) => {
//     const datos = {
//         resummen: req.body.resummen,
//         categoria: req.body.categoria,
//         valorBoleto: req.body.valorBoleto,
//         imagen: req.body.imagen,
//         estado: req.body.estado,
//     };

//     if (!datos) {
//         res.status(400);
//         res,
//             json({
//                 error: "Datos incorrectos"
//             });
//     } else {
//         peliculas.create(datos)
//             .then(data => {
//                 res.send(data);
//             })
//             .catch(err => {
//                 res.json("error: " + err);
//             });
//     }
// });
// router.put("/pelicula", async (req, res) => {
//     const { id } = req.query;
//     const { resummen, categoria,valorBoleto,imagen,estado} = req.body;
//     const data = await peliculas.findAll({
//         atributes: ["resummen","categoria","valorBoleto","imagen","estado"],
//         where: {
//             id
//         }
//     });

//     if (data.length > 0) {
//         data.forEach(async element => {
//             await element.update({
//                 id,
//                 resummen,
//                 categoria,
//                 valorBoleto,
//                 imagen,
//                 estado,
//             });
//         });
//     }
//     return res.json({
//         message: "actualizado",
//         data: data
//     })
// });
// router.delete("/pelicula", async (req, res) => {
//     const { id } = req.query;
//     const eliminar = await peliculas.destroy({
//         where: { id }
//     });
//     res.json({
//         message: "eliminado",
//         data: eliminar
//     })
// });

// //metodos salas
// router.get("/sala", (req, res) => {
//     const { query } = req;
//     salas.findAll({ where: query })
//         .then(sala => {
//             res.json(sala);
//         })
//         .catch(err => {
//             res.send("error: " + err);
//         });
// });
// router.post("/sala", (req, res, next) => {
//     const datos = {
//         nombre: req.body.nombre,
//         descripcion: req.body.descripcion,
//         idpelicula: req.body.idpelicula,
//         idhorario: req.body.idhorario,
//     };

//     if (!datos) {
//         res.status(400);
//         res,
//             json({
//                 error: "Datos incorrectos"
//             });
//     } else {
//         salas.create(datos)
//             .then(data => {
//                 res.send(data);
//             })
//             .catch(err => {
//                 res.json("error: " + err);
//             });
//     }
// });
// router.put("/sala", async (req, res) => {
//     const { id } = req.query;
//     const { nombre, descripcion,idpelicula,idhorario} = req.body;
//     const data = await salas.findAll({
//         atributes: ["nombre","descripcion","idpelicula","idhorario"],
//         where: {
//             id
//         }
//     });

//     if (data.length > 0) {
//         data.forEach(async element => {
//             await element.update({
//                 id,
//                 nombre,
//                 descripcion,
//                 idpelicula,
//                 idhorario,
//             });
//         });
//     }
//     return res.json({
//         message: "actualizado",
//         data: data
//     })
// });
// router.delete("/sala", async (req, res) => {
//     const { id } = req.query;
//     const eliminar = await salas.destroy({
//         where: { id }
//     });
//     res.json({
//         message: "eliminado",
//         data: eliminar
//     })
// });

// router.post("/login", (req, res, next) => {
//     const correo = req.body.correo
//     const clave = req.body.clave

//     persons.findAll()
//     .then(resultado => {
//         resultado.forEach(element => {
//             if(element.correo== correo && element.clave == clave){
//                 res.status(200).json({
//                 ok: true,
//                 mensaje: "found"
//                 })
//             }
//             return res.status(500).json({
//                 ok: false,
//                 mensaje: 'no-found'
//             })
//         })
//     })
// });
// module.exports = router;