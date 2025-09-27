import Spot from '../models/model.js';


export async function findSpot(req, res) {
  const sport = req.body.sport || null;
    const value = req.body.value || null;
    const date  = req.body.date  || null;
    console.log(sport);
    console.log(value);
    console.log(date);
  try {

    const spots = await Spot.find(sport, value, date);
    res.status(201).json(spots);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Error finding spots' });
  }
};

export async function getHistorialParticipacion(req, res) {
  const usuarioId = req.body.usuarioId || null;

    console.log(usuarioId);

  try {

    const historial = await  Spot.getHistorialByUser(parseInt(usuarioId));
    res.status(201).json(historial);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Error finding user participation history' });
  }
}

export async function crearCupo(req, res) {
  try {
    //const creador_id = req.usuario.id;
    const {
      creador_id,
      deporte,
      valor,
      duracion,
      lugar,
      fecha,
      hora,
      lat,
      lon,
      roles
    } = req.body;

    // Validaciones
    if (!deporte || !lugar || !fecha || !hora) {
      return res.status(400).json({
        error: 'Faltan campos obligatorios: deporte, lugar, fecha, hora'
      });
    }

    // Validar fecha no sea en el pasado
    const fechaCupo = new Date(`${fecha}T${hora}`);
    const ahora = new Date();
    
    if (fechaCupo <= ahora) {
      return res.status(400).json({
        error: 'La fecha y hora del cupo debe ser en el futuro'
      });
    }

    // Validar coordenadas si se envían
    if ((lat && !lon) || (!lat && lon)) {
      return res.status(400).json({
        error: 'lat y lon deben proporcionarse juntos'
      });
    }

    const cupo = await Spot.crearCupo({
      creador_id,
      deporte: deporte.trim(),
      valor: valor ? parseFloat(valor) : null,
      duracion,
      lugar: lugar.trim(),
      fecha,
      hora,
      lat: lat ? parseFloat(lat) : null,
      lon: lon ? parseFloat(lon) : null,
      roles
    });

    res.status(201).json({
      success: true,
      mensaje: 'Cupo creado exitosamente',
      cupo
    });

  } catch (error) {
    console.error('Error al crear cupo:', error);
    res.status(500).json({
      error: 'Error interno del servidor',
      detalle: error.message
    });
  }
}