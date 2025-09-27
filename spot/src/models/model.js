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

};



export default Spot;
