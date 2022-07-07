import mongoose from '../../database/mongo/mongoConnection';

const ProntuarioSchema = new mongoose.Schema({
  id: Number,
  text: String,
  file: mongoose.Schema.Types.Mixed,
  prontuario: Number,
  paciente: String,
  cns: Number,
  obs: String,
});

const ProntuarioModel = mongoose.model('prontuario', ProntuarioSchema);

export default ProntuarioModel;
