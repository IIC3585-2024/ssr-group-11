import mongoose from 'mongoose';

const SeriesSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  temporadas: { type: Object, required: true },
  servicio: { type: String, required: true },
  categoria: { type: String, required: true },
  estrellas: { type: Number, required: false },
  calificaciones: { type: Number, required: false },
  userId: { type: String, required: true },
});

export default mongoose.models.Series || mongoose.model('Series', SeriesSchema);
