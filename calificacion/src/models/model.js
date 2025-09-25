import pool from '../config/db.js';
import { ultimaCalificacion } from '../controllers/controller.js';

const Calificacion = {
  async verHistorial(evaluadoId) {
  const queryConfig = {

  text: `SELECT 
          part.id as participacion_id,
          part.rol,
          part.estado as participacion_estado,
          
          -- Información del cupo
          c.id as cupo_id,
          c.deporte,
          c.valor,
          c.duracion,
          c.lugar,
          c.fecha,
          c.hora,
          c.lat,
          c.lon,
          c.roles,
          c.creado_en,
          
          -- Información del organizador/creador
          u_org.id as organizador_id,
          u_org.nombre as organizador_nombre,
          u_org.foto_perfil as organizador_foto,
          
          -- Estadísticas del cupo
          (
            SELECT COUNT(*) 
            FROM spot.participaciones 
            WHERE cupo_id = c.id 
            AND estado IN ('pendiente', 'confirmado')
          ) as total_participantes,
          
          (
            SELECT COUNT(*) 
            FROM spot.participaciones 
            WHERE cupo_id = c.id 
            AND estado = 'confirmado'
          ) as participantes_confirmados,
          
          -- Calificación promedio recibida en este cupo específico
          (
            SELECT ROUND(AVG(cal.puntaje), 2)
            FROM calificacion.calificaciones cal
            JOIN spot.participaciones p2 ON cal.evaluador_id = p2.usuario_id
            WHERE cal.evaluado_id = $1 
            AND p2.cupo_id = c.id
            AND p2.estado = 'confirmado'
            AND cal.evaluador_id != $1
          ) as calificacion_recibida_cupo

        FROM spot.participaciones part
        JOIN spot.cupos c ON part.cupo_id = c.id
        JOIN auth.usuarios u_org ON c.creador_id = u_org.id
        WHERE part.usuario_id = $1
        ORDER BY c.fecha DESC, c.hora DESC`,
  values: [evaluadoId]
};

console.log(queryConfig);

const result = await pool.query(queryConfig);

    return result.rows;
  },

async ultimaCalificacion(evaluadoId) {
  const queryConfig = {

  text: `SELECT *
            FROM calificacion.calificaciones
            WHERE evaluado_id = $1::numeric
            ORDER BY fecha DESC
            LIMIT 1;
`,
  values: [evaluadoId]
};

console.log(queryConfig);

const result = await pool.query(queryConfig);

    return result.rows;
  },

};

export default Calificacion;


/*
            SELECT 
          cal.id,
          cal.puntaje,
          cal.comentario,
          cal.fecha,
          
          -- Información del evaluador
          eval.id as evaluador_id,
          eval.nombre as evaluador_nombre,
          eval.foto_perfil as evaluador_foto,
          
          -- Información del cupo donde participaron juntos
          c.id as cupo_id,
          c.deporte,
          c.lugar,
          c.fecha as fecha_cupo,
          c.hora as hora_cupo,
          c.valor,
          
          -- Determinar si el evaluador fue organizador o participante
          CASE 
            WHEN c.creador_id = eval.id THEN 'organizador'
            ELSE 'participante'
          END as tipo_evaluador
          
        FROM calificacion.calificaciones cal
        JOIN auth.usuarios eval ON cal.evaluador_id = eval.id
        JOIN spot.participaciones part_eval ON part_eval.usuario_id = eval.id
        JOIN spot.cupos c ON part_eval.cupo_id = c.id
        JOIN spot.participaciones part_yo ON part_yo.cupo_id = c.id
        WHERE cal.evaluado_id = $1
          AND part_yo.usuario_id = $1
          AND part_eval.estado = 'confirmado'
          AND part_yo.estado = 'confirmado'
        ORDER BY cal.fecha DESC
        LIMIT 1
*/