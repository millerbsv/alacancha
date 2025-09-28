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
      duracion : duracion ? parseInt(duracion) + "minutes" : null,
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


export async function obtenerCupo(req, res) {
    try {
      const id = req.body.id || null;

      if (!id || isNaN(id)) {
        return res.status(400).json({
          error: 'ID de cupo inválido'
        });
      }

      const cupo = await Spot.obtenerCupoPorId(parseInt(id));
      console.log(cupo);
      if (!cupo) {
        return res.status(404).json({
          error: 'Cupo no encontrado'
        });
      }

      // Obtener participaciones
      const participaciones = await Spot.obtenerParticipacionesCupo(parseInt(id));

      res.json({
        success: true,
        cupo: {
          ...cupo,
          participantes: participaciones,
          total_participantes: participaciones.length
        }
      });

    } catch (error) {
      console.error('Error al obtener cupo:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        detalle: error.message
      });
    }
  }

export async function buscarCupos(req, res) {
    try {
      const {
        deporte,
        valor_min,
        valor_max,
        fecha_desde,
        fecha_hasta,
        lat,
        lon,
        radio = 10,
        limite = 50,
        offset = 0
      } = req.body;

      const filtros = {};

      if (deporte) filtros.deporte = deporte;
      if (valor_min) filtros.valor_min = parseFloat(valor_min);
      if (valor_max) filtros.valor_max = parseFloat(valor_max);
      if (fecha_desde) filtros.fecha_desde = fecha_desde;
      if (fecha_hasta) filtros.fecha_hasta = fecha_hasta;
      
      if (lat && lon) {
        filtros.lat = parseFloat(lat);
        filtros.lon = parseFloat(lon);
        filtros.radio_km = parseFloat(radio);
      }

      const cupos = await Spot.buscarCupos(
        filtros, 
        parseInt(limite), 
        parseInt(offset)
      );

      res.json({
        success: true,
        cupos,
        total: cupos.length,
        filtros
      });

    } catch (error) {
      console.error('Error al buscar cupos:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        detalle: error.message
      });
    }
  }

export async function participarEnCupo(req, res) {
    try {
      const { cupoId,
              usuarioId
       } = req.body;
//validar que cupo exista

//registrar participacion
      const rol = 'jugador';

      if (!cupoId || isNaN(cupoId)) {
        return res.status(400).json({
          error: 'ID de cupo inválido'
        });
      }

      
      
      const participacion = await Spot.participarEnCupo(
        parseInt(cupoId), 
        usuarioId, 
        rol
      );
      console.log(participacion);
      
      if (participacion.rows.length === 0) {
        throw new Error('Cupo no encontrado');
      }

      const cupo = participacion.rows[0];
//revisar estado
      if (cupo.estado !== 'pendiente') {
        throw new Error('No se puede participar en este cupo');
      }

      if (cupo.creador_id === usuarioId) {
        throw new Error('No puedes participar en tu propio cupo');
      }

      const actualiza = Spot.actualizarEstadoCupo(parseInt(cupoId));

      const crear = Spot.crearParticipacion(cupoId, usuarioId, rol);

      res.status(201).json({
        success: true,
        mensaje: 'Te has unido al cupo exitosamente',
        estado: "OK"
      });

    } catch (error) {
      console.error('Error al participar en cupo:', error);
      
      if (error.message.includes('no encontrado') ||
          error.message.includes('No se puede participar') ||
          error.message.includes('No puedes participar') ||
          error.message.includes('Ya estás participando') ||
          error.message.includes('No hay cupos disponibles')) {
        return res.status(400).json({
          error: error.message
        });
      }

      res.status(500).json({
        error: 'Error interno del servidor',
        detalle: error.message
      });
    }
  }