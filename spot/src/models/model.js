import pool from '../config/db.js';


const Spot = {
  async find(sport, value, date) {
  const queryConfig = {
  text: `
    SELECT *
      FROM spot.cupos
      WHERE ($1::text IS NULL OR deporte = $1::text)
          AND ($2::numeric IS NULL OR valor <= $2::numeric)
          AND ($3::date IS NULL OR fecha = $3::date)`,
  values: [sport, value, date]
};

console.log(queryConfig);

const result = await pool.query(queryConfig);

    return result.rows;
  },

  async getHistorialByUser(usuarioId) {
    const queryConfig = {
      text: `
      SELECT 
        p.id as participacion_id,
        p.rol,
        c.id as cupo_id,
        c.deporte,
        c.lugar,
        c.fecha,
        c.hora,
        c.duracion,
        c.valor,
        c.estado as cupo_estado,
        c.creador_id,
        c.lat,
        c.lon,
        c.roles as cupo_roles,
        c.creado_en as cupo_creado_en
      FROM spot.participaciones p
      INNER JOIN spot.cupos c ON p.cupo_id = c.id
      WHERE p.usuario_id=$1::integer`,
      values: [usuarioId]
    };
      


    console.log('Query historial:', queryConfig);
    console.log('Values:', usuarioId);

    const result = await pool.query(queryConfig);
    return result.rows;
  },

  async crearCupo(datos) {
    const client = await pool.connect();
    try {
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
      } = datos;

      const insertQuery = `
        INSERT INTO spot.cupos (
          creador_id, deporte, valor, duracion, lugar, 
          fecha, hora, lat, lon, roles, estado
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pendiente')
        RETURNING *
      `;

      const result = await client.query(insertQuery, [
        creador_id,
        deporte,
        valor,
        duracion,
        lugar,
        fecha,
        hora,
        lat,
        lon,
        roles ? JSON.stringify(roles) : null
      ]);

      return result.rows[0];

    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  },

    async obtenerCupoPorId(id) {
    try {
      const query = `
        SELECT id, creador_id, deporte, valor, duracion, lugar, 
               fecha, hora, lat, lon, roles, creado_en, estado
        FROM spot.cupos 
        WHERE id = $1
      `;
      
      const result = await pool.query(query, [id]);
      return result.rows[0] || null;

    } catch (error) {
      throw error;
    }
  },

async obtenerParticipacionesCupo(cupoId) {
    try {
      const query = `
        SELECT id, usuario_id, rol
        FROM spot.participaciones 
        WHERE cupo_id = $1
        ORDER BY id
      `;
      
      const result = await pool.query(query, [cupoId]);
      return result.rows;

    } catch (error) {
      throw error;
    }
  },

  async buscarCupos(filtros, limite = 50, offset = 0) {
    try {
      const {
        deporte,
        valor_min,
        valor_max,
        fecha_desde,
        fecha_hasta,
        lat,
        lon,
        radio_km,
        estado = 'pendiente'
      } = filtros;
      console.log('Buscar cupos con filtros:', filtros);

      let query = `
        SELECT id, creador_id, deporte, valor, duracion, lugar, 
               fecha, hora, lat, lon, roles, creado_en, estado
        FROM spot.cupos 
        WHERE estado = $1
      `;
      
      const valores = [estado];
      let paramIndex = 2;

      // Filtrar por deporte
      if (deporte) {
        query += ` AND LOWER(deporte) = LOWER($${paramIndex++})`;
        valores.push(deporte);
      }

      // Filtrar por rango de valor
      if (valor_min !== undefined) {
        query += ` AND valor >= $${paramIndex++}`;
        valores.push(valor_min);
      }

      if (valor_max !== undefined) {
        query += ` AND valor <= $${paramIndex++}`;
        valores.push(valor_max);
      }

      // Filtrar por rango de fechas
      if (fecha_desde) {
        query += ` AND fecha >= $${paramIndex++}`;
        valores.push(fecha_desde);
      }

      if (fecha_hasta) {
        query += ` AND fecha <= $${paramIndex++}`;
        valores.push(fecha_hasta);
      }

      // Filtrar por ubicación (radio)
      if (lat !== undefined && lon !== undefined && radio_km) {
        query += ` 
          AND lat IS NOT NULL 
          AND lon IS NOT NULL
          AND (
            6371 * acos(
              cos(radians($${paramIndex++})) * 
              cos(radians(lat)) * 
              cos(radians(lon) - radians($${paramIndex++})) + 
              sin(radians($${paramIndex++})) * 
              sin(radians(lat))
            )
          ) <= $${paramIndex++}
        `;
        valores.push(lat, lon, lat, radio_km);
      }

      query += ` ORDER BY fecha ASC, hora ASC LIMIT $${paramIndex++} OFFSET $${paramIndex}`;
      valores.push(limite, offset);
      console.log('Final Query:', query);
      console.log('With values:', valores);

      const result = await pool.query(query, valores);
      return result.rows;

    } catch (error) {
      throw error;
    }
  },



  async participarEnCupo(cupoId, usuarioId, rol = 'jugador') {
    const client = await pool.connect();
    try {
      // Verificar que el cupo existe y está activo/pendiente
      const cupoQuery = 'SELECT creador_id, estado, roles FROM spot.cupos WHERE id = $1';
      const cupoResult = await client.query(cupoQuery, [cupoId]);


      return cupoResult;

    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  },
/*      if (cupoResult.rows.length === 0) {
        throw new Error('Cupo no encontrado');
      }

      const cupo = cupoResult.rows[0];
//revisar estado
      if (cupo.estado !== 'pendiente') {
        throw new Error('No se puede participar en este cupo');
      }

      if (cupo.creador_id === usuarioId) {
        throw new Error('No puedes participar en tu propio cupo');
      }
*/
      // Verificar si ya está participando
      //const yaParticipaQuery = 'SELECT id FROM spot.participaciones WHERE cupo_id = $1 AND usuario_id = $2';
      //const yaParticipaResult = await client.query(yaParticipaQuery, [cupoId, usuarioId]);

      //if (yaParticipaResult.rows.length > 0) {
      //  throw new Error('Ya estás participando en este cupo');
      //}

      // Verificar disponibilidad de roles si se especifica
      /*if (cupo.roles && rol !== 'jugador') {
        const rolesDisponibles = JSON.parse(cupo.roles);
        
        if (rolesDisponibles[rol] !== undefined) {
          // Contar participaciones actuales en este rol
          const countRolQuery = 'SELECT COUNT(*) as count FROM spot.participaciones WHERE cupo_id = $1 AND rol = $2';
          const countResult = await client.query(countRolQuery, [cupoId, rol]);
          const participantesEnRol = parseInt(countResult.rows[0].count);
          
          if (participantesEnRol >= rolesDisponibles[rol]) {
            throw new Error(`No hay cupos disponibles para el rol: ${rol}`);
          }
        }
      }*/

      // Insertar participación

  async actualizarEstadoCupo(cupoId) { 
    const client = await pool.connect();
    try {
      const updateQuery = `
        UPDATE spot.cupos SET estado = 'activo' WHERE id = $1 
        RETURNING *
      `;


      const result = await client.query(updateQuery, [cupoId]);
      return result.rows[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  },

  async crearParticipacion(cupoId, usuarioId, rol) { 
    const client = await pool.connect();
    try {
      const updateQuery = `
      INSERT INTO spot.participaciones (cupo_id, usuario_id, rol)
        VALUES ($1, $2, $3)
        RETURNING *
      `;


      const result = await client.query(updateQuery, [cupoId,usuarioId, rol]);
      return result.rows[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  },



};



export default Spot;
