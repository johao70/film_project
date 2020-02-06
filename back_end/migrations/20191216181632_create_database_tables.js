;
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable( 'tipo_persona', function( table ) {
    table.increments('id');
    table.string('tipo_persona_nombre').notNullable().unique();
  })

  .createTable( 'pelicula', function( table ) {
    table.increments('id');
    table.string('titulo');
    table.string('resumen');
    table.string('categoria');
    table.integer('valorBoleto');
    table.string('estado');
    table.string('imagen');
  })

  .createTable( 'horario', function( table ) {
    table.increments('id');
    table.string('hora');
  })

  .createTable( 'persona', function( table ) {
    table.increments('id');
    table.integer('idTipoPersona').references('id').inTable('tipo_persona');
    table.string('nombre');
    table.string('correo').notNullable().unique();
    table.string('clave').notNullable();
  })

  .createTable( 'sala', function( table ) {
    table.increments('id');
    table.integer('idPelicula').references('id').inTable('pelicula');
    table.integer('idHorario').references('id').inTable('horario');
    table.string('nombre');
    table.string('descripcion');
  })

  .createTable( 'compra', function( table ) {
    table.increments('id');
    table.integer('idPersona').references('id').inTable('persona');
    table.integer('idSala').references('id').inTable('sala');
    table.string('numeroBoletos');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTableIfExists( 'compra' )
  .dropTableIfExists( 'sala' )
  .dropTableIfExists( 'persona' )
  .dropTableIfExists( 'horario' )
  .dropTableIfExists( 'pelicula' )
  .dropTableIfExists( 'tipo_persona' )
};