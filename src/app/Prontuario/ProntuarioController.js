import ProntuarioModel from './ProntuarioSchema';

class ProntuarioController {
  async getAll(req, res) {
    const pront = new ProntuarioModel({
      id: 12,
      text: 'teste',
      file: 'test',
      prontuario: 10,
      paciente: 'test',
      cns: 1245,
      obs: 'dashduihasdsaud',
    });

    await pront.save();
    return res.status(200).json({ pront });
  }

  getById(req, res) {
    return res.status(200).json({ message: 'getById()' });
  }

  create(req, res) {
    return res.status(200).json({ message: 'create()' });
  }

  update(req, res) {
    return res.status(200).json({ message: 'update()' });
  }

  delete(req, res) {
    return res.status(200).json({ message: 'delete()' });
  }
}

export default new ProntuarioController();
