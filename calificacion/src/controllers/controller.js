import Calificacion from '../models/model.js';


export async function ultimaCalificacion(req, res) {
    const evaluadoId = req.body.evaluadoId || null;
    console.log("Evaluado:" + evaluadoId);;
  try {

    const calificacion = await Calificacion.ultimaCalificacion(evaluadoId);
    res.status(201).json(calificacion);
  } catch (err) {
    console.log("ERROR:: " + err)
    res.status(500).json({ error: 'Error finding scores for user' });
  }
}


export async function verHistorial(req, res) {
    const evaluadoId = req.body.evaluadoId || null;
    console.log("Evaluado:" + evaluadoId);
  try {

    const calificacion = await Calificacion.verHistorial(evaluadoId);
    res.status(201).json(calificacion);
  } catch (err) {
    console.log("ERROR:: " + err)
    res.status(500).json({ error: 'Error finding scores for user' });
  }
}