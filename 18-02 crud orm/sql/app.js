const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // Parsear datos de formularios
app.use(express.static('public')); // Servir archivos estáticos
app.set('view engine', 'ejs'); // Configurar EJS como motor de plantillas
app.set('views', './views');

app.get('/', (req, res) => {
  const query = 'SELECT * FROM productos';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.render('index', { productos: results });
  });
});

// Mostrar formulario para agregar producto
app.get('/create', (req, res) => {
  res.render('create');
});

// Procesar formulario para agregar producto
app.post('/create', (req, res) => {
  const { nombre, precio, stock } = req.body;
  const query = 'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)';
  db.query(query, [nombre, precio, stock], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.redirect('/');
  });
});

// Mostrar formulario para editar producto
app.get('/edit/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM productos WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.render('edit', { producto: results[0] });
  });
});

// Procesar formulario para editar producto
app.post('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock } = req.body;
  const query = 'UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?';
  db.query(query, [nombre, precio, stock, id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.redirect('/');
  });
});
// Eliminar producto
app.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM productos WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.redirect('/');
  });
});
// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
