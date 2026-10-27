INSERT INTO hitos (
  codigo_linea_tiempo,
  descripcion,
  texto,
  foto,
  video,
  voz,
  orden
) VALUES
  (
    'junio-1932',
    'Incidente de Laguna Pitiantuta',
    'En junio de 1932, fuerzas bolivianas ocuparon el fortín paraguayo Carlos Antonio López, ubicado junto a la laguna Pitiantuta. Paraguay respondió recuperando la posición. Este enfrentamiento agravó rápidamente la tensión fronteriza y fue uno de los hechos inmediatos que condujeron al inicio de la Guerra del Chaco.',
    '/imgs/laguna-pitiantuta.jpg',
    '/videos/laguna-pitiantuta.mp4',
    '/voz/laguna-pitiantuta.mp3',
    1
  ),
  (
    'septiembre-1932',
    'Batalla de Boquerón',
    'Entre el 9 y el 29 de septiembre de 1932, tropas paraguayas cercaron el fortín Boquerón, defendido por fuerzas bolivianas. Después de semanas de combate, aislamiento y escasez de agua, alimentos y municiones, la guarnición boliviana se rindió. La batalla se convirtió en uno de los primeros episodios decisivos de la guerra.',
    '/imgs/batalla-boqueron.jpg',
    '/videos/batalla-boqueron.mp4',
    '/voz/batalla-boqueron.mp3',
    2
  ),
  (
    'kundt-1932-1933',
    'Llegada del general Hans Kundt',
    'Hans Kundt regresó a Bolivia a finales de 1932 y asumió el mando del ejército durante una etapa crítica del conflicto. Dirigió operaciones ofensivas durante 1933, entre ellas los ataques contra Nanawa. Permaneció al mando hasta las consecuencias de la derrota boliviana en Campo Vía, en diciembre de 1933.',
    '/imgs/hans-kundt.jpg',
    '/videos/hans-kundt.mp4',
    '/voz/hans-kundt.mp3',
    3
  ),
  (
    'julio-1933',
    'Batalla de Nanawa',
    'En julio de 1933, el ejército boliviano lanzó una gran ofensiva contra las posiciones paraguayas de Nanawa. Los defensores resistieron el ataque mediante fortificaciones, artillería y contraataques. El fracaso de la ofensiva causó numerosas bajas y debilitó la capacidad boliviana para mantener la iniciativa.',
    '/imgs/batalla-nanawa.jpg',
    '/videos/batalla-nanawa.mp4',
    '/voz/batalla-nanawa.mp3',
    4
  ),
  (
    'campo-via-1933',
    'Maniobra de Campo Vía',
    'Entre octubre y diciembre de 1933, el ejército paraguayo desarrolló una maniobra de envolvimiento sobre las fuerzas bolivianas concentradas en el sector de Campo Vía. El cerco culminó con la rendición de miles de soldados bolivianos y produjo un cambio decisivo en el desarrollo militar de la guerra.',
    '/imgs/campo-via.jpg',
    '/videos/campo-via.mp4',
    '/voz/campo-via.mp3',
    5
  ),
  (
    'noviembre-1934',
    'Batalla de El Carmen',
    'En noviembre de 1934, fuerzas paraguayas ejecutaron una operación de cerco en la zona de El Carmen. Varias unidades bolivianas quedaron aisladas y sufrieron importantes pérdidas de hombres y material. El resultado facilitó el avance paraguayo hacia nuevas posiciones del Chaco.',
    '/imgs/batalla-el-carmen.jpg',
    '/videos/batalla-el-carmen.mp4',
    '/voz/batalla-el-carmen.mp3',
    6
  ),
  (
    'mayo-junio-1935',
    'Batalla de Pozo del Tigre-Ingavi',
    'Entre mayo y junio de 1935 se desarrollaron combates en el sector de Pozo del Tigre e Ingavi durante la etapa final de la Guerra del Chaco. Estas operaciones ocurrieron poco antes del acuerdo de cese de hostilidades del 14 de junio de 1935, que puso fin a los enfrentamientos armados entre Bolivia y Paraguay.',
    '/imgs/pozo-del-tigre-ingavi.jpg',
    '/videos/pozo-del-tigre-ingavi.mp4',
    '/voz/pozo-del-tigre-ingavi.mp3',
    7
  )
ON CONFLICT (codigo_linea_tiempo) DO UPDATE SET
  descripcion = EXCLUDED.descripcion,
  texto = EXCLUDED.texto,
  foto = EXCLUDED.foto,
  video = EXCLUDED.video,
  voz = EXCLUDED.voz,
  orden = EXCLUDED.orden;
