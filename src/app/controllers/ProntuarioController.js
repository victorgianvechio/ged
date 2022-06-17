/* eslint-disable class-methods-use-this */

import { PrismaClient } from '@prisma/client';
import pdf2html from 'pdf2html';

import ProntuarioModel from '../schemas/ProntuarioSchema';

const prisma = new PrismaClient();

class ProntuarioController {
  async index(req, res) {
    if (Object.keys(req.query).length === 0) {
      res.status(401).json({ error: 'Nenhum parâmetro informado' });
    }

    const { cns, paciente } = req.query;
    if (cns) {
      const result = await prisma.prontuario.findMany({
        where: {
          cns: parseInt(cns, 10),
        },
      });
      res.json(result);
    }
    if (paciente) {
      const result = await prisma.prontuario.findMany({
        where: {
          paciente: {
            contains: paciente,
            mode: 'insensitive',
          },
        },
      });
      res.json(result);
    }
    // return res.json({ result: 'ok' });
  }

  async store(req, res) {
    // File da request
    const { file } = req;
    const { obs } = req.body;

    // Mapping
    const PRONTUARIO = {
      text: 'PRONTUÁRIO: ',
      length: 'PRONTUÁRIO: '.length,
      size: 'PRONTUÁRIO: '.length + 6,
    };

    const CNS = {
      text: 'CNS: ',
      length: 'CNS: '.length,
      size: 'CNS: '.length + 15,
    };

    const PACIENTE = {
      text: 'PACIENTE: ',
      length: 'PACIENTE: '.length,
      endText: 'NOME SOCIAL: ',
    };

    // Parse pdf to text
    pdf2html.text(file.path, async (err, t) => {
      if (err) {
        console.error(`Conversion error: ${err}`);
        return res.json({ err });
      }

      const text = t.replace(/\n/g, ' ');

      const posProntuario = text.indexOf(PRONTUARIO.text);
      const prontuario = text.substring(
        posProntuario + PRONTUARIO.length,
        posProntuario + PRONTUARIO.size
      );

      const posCns = text.indexOf(CNS.text);
      const cns = text.substring(posCns + CNS.length, posCns + CNS.size);

      const posPaciente = text.indexOf(PACIENTE.text);
      const endPosPaciente = text.indexOf(PACIENTE.endText);
      const dif = endPosPaciente - posPaciente;
      const paciente = text.substring(
        posPaciente + PACIENTE.length,
        posPaciente + dif - 1
      );

      // Salva no postgres
      const post = await prisma.prontuario.create({
        data: {
          prontuario: parseInt(prontuario, 10),
          paciente,
          cns: parseInt(cns, 10),
          cpf: '',
          obs,
          filename: file.filename,
        },
      });

      // Salva no mongodb
      const pront = new ProntuarioModel({
        id: post.id,
        text,
        file,
      });

      try {
        await pront.save();
      } catch (error) {
        console.log(error);
      }

      return res.json({ Postgres: post, MongoDB: pront });
    });
  }

  async storeTest(req, res) {
    const { prontuario, paciente, cns, cpf } = req.body;
    const post = await prisma.prontuario.create({
      data: {
        prontuario,
        paciente,
        cns,
        cpf,
      },
    });
    res.json(post);
  }

  async getByProntuario(req, res) {
    const { prontuario } = req.params;
    const result = await prisma.prontuario.findMany({
      where: {
        prontuario: parseInt(prontuario, 10),
      },
    });

    if (!result) {
      res.status(401).json({ error: 'Prontuario não encontrado' });
    }

    res.json(result);
  }

  async advancedSearch(req, res) {
    if (Object.keys(req.query).length === 0) {
      res.status(401).json({ error: 'Nenhum parâmetro informado' });
    }

    const { terms } = req.query;

    if (!terms) {
      res.status(401).json({ error: 'Nenhum termo informado' });
    }

    //   ProntuarioModel.find({ occupation: /host/ })
    //     .where('name.last')
    //     .equals('Ghost')
    //     .where('age')
    //     .gt(17)
    //     .lt(66)
    //     .where('likes')
    //     .in(['vaporizing', 'talking'])
    //     .limit(10)
    //     .sort('-occupation')
    //     .select('name occupation')
    //     .exec(callback);
    // }

    const result = await ProntuarioModel.find({
      text: { $regex: new RegExp(terms, 'i') },
    });
    console.log(result);

    res.json(result);
  }
}

export default new ProntuarioController();