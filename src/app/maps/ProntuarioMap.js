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

async function getProntuario(text) {
  const position = text.indexOf(PRONTUARIO.text);
  const prontuario = text.substring(
    position + PRONTUARIO.length,
    position + PRONTUARIO.size
  );
  return prontuario;
}

async function getCns(text) {
  const position = text.indexOf(CNS.text);
  const cns = text.substring(position + CNS.length, position + CNS.size);
  return cns;
}

async function getPaciente(text) {
  const position = text.indexOf(PACIENTE.text);
  const endPosition = text.indexOf(PACIENTE.endText);
  const dif = endPosition - position;
  const paciente = text.substring(position + PACIENTE.length, position + dif);
  return paciente;
}

export default async function getKeys(text) {
  const result = Promise.all([
    getProntuario(text),
    getCns(text),
    getPaciente(text),
  ]);

  console.log('promisse', result);

  // const prontuario = await getProntuario(text);
  // const cns = await getCns(text);
  // const paciente = await getPaciente(text);

  // return { prontuario, cns, paciente };
}
