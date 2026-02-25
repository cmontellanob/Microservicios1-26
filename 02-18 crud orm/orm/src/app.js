import { createConnection } from 'typeorm';
import { User } from './entity/User';
import * as express from 'express';

createConnection()
  .then(async connection => {
    

    const app = express();

    
    app.get('/users', async (req, res) => {
      const users = await connection.manager.find(User);
      res.send(users);
    });

    app.post('/users', async (req, res) => {
      const user = new User();
      user.name = req.body.name;
      user.email = req.body.email;
      await connection.manager.save(user);
      res.send('Usuario creado');
    });
    router.put('/:id', async (req, res) => {
    try {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        await userRepository.save(user);

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
});

