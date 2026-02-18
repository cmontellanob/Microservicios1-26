const { Entity, PrimaryGeneratedColumn, Column } = require("typeorm");

@Entity("usuarios")
class Usuario {
  @PrimaryGeneratedColumn()
  id;

  @Column({ length: 100 })
  nombre;

  @Column({ length: 150, unique: true })
  email;

  @Column({ default: true })
  activo;
}

module.exports = Usuario;
