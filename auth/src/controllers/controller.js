import User from '../models/model.js';

export async function registerUser(req, res) {
  const { username, password } = req.body;
  try {
    const newUser = await User.create(username, password);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Error creating user' });
  }
}

export async function loginUser(req, res) {
  const { username, password } = req.body;
  const user = await User.findByUsername(username);
  if (user && user.password === password) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}

export async function crearPerfil(req, res) {
  try {
    const { nombre, 
            correo,
            contrasena,
            deportes_preferidos,
            horario_disponible,
            lat,
            lon,
            transporte} = req.body;

    // Validaciones básicas
    if (!nombre || !correo || !contrasena) {
      return res.status(400).json({
        error: 'Faltan campos obligatorios: nombre, correo, contraseña'
      });
    }

    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return res.status(400).json({
        error: 'Formato de correo inválido'
      });
    }

    // Validar contraseña
    if (contrasena.length < 8) {
      return res.status(400).json({
        error: 'La contraseña debe tener al menos 8 caracteres'
      });
    }

    const usuario = await User.crearPerfil({
      nombre: nombre.trim(),
      correo: correo.trim().toLowerCase(),
      contrasena,
      deportes_preferidos: deportes_preferidos || [],
      horario_disponible: horario_disponible || [],
      lat: lat ? parseFloat(lat) : null,
      lon: lon ? parseFloat(lon) : null,
      transporte: transporte || "false"
    });
  res.status(201).json({
      success: true,
      mensaje: 'perfil creado exitosamente',
      usuario
    });
  } catch (error) {
    console.error('Error en registro:', error);
    
    if (error.message.includes('ya está registrado')) {
      return res.status(409).json({ error: error.message });
    }

    res.status(500).json({
      error: 'Error interno del servidor',
      detalle: error.message
    });
  }
}

export async function obtenerPerfil(req, res) {
  console.log('ingreso a obterner perdil:');
    try {
      const usuarioId = req.body.id;
      const usuario = await User.obtenerUsuarioPorId(usuarioId);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      res.json({
        success: true,
        usuario
      });

    } catch (error) {
      console.error('Error al obtener perfil:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        detalle: error.message
      });
    }
  }

