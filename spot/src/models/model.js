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


};

export default Spot;
