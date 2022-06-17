import morgan from 'morgan';
import chalk from 'chalk';
import util from 'util';

function datePtBr() {
  const date = new Date();

  const day =
    date.getDate().toString().length === 1
      ? `0${date.getDate()}`
      : date.getDate();

  const monthNumber =
    date.getMonth().toString().length === 1
      ? `0${date.getMonth() + 1}`
      : date.getMonth() + 1;

  const year = date.getFullYear();

  const hour =
    date.getHours().toString().length === 1
      ? `0${date.getHours()}`
      : date.getHours();

  const minute =
    date.getMinutes().toString().length === 1
      ? `0${date.getMinutes()}`
      : date.getMinutes();

  const second =
    date.getSeconds().toString().length === 1
      ? `0${date.getSeconds()}`
      : date.getSeconds();

  return `${day}/${monthNumber}/${year} ${hour}:${minute}:${second}`;
}

export default morgan((tokens, req, res) => {
  const log = {
    timestamp: chalk.hex('#34ace0').bold(datePtBr()),

    methodStatus: chalk
      .hex('#34ace0')
      .bold(`${req.method} [${res.statusCode}]`),

    fullUrl: chalk.hex('#2ed573').bold(`${req.originalUrl}`),

    contentLenght: chalk
      .hex('#fffa65')
      .bold(`${req.headers['content-length']} bytes`),

    responseTime: chalk
      .hex('#fffa65')
      .bold(`${tokens['response-time'](req, res)} ms`),

    from: chalk.hex('#ffb142').bold(
      `from ${util.inspect(req.body.from, {
        showHidden: false,
        depth: 2,
        colorize: true,
      })}`
    ),

    body: chalk.hex('#8e7ada').bold(
      `body {
  query: ${chalk.hex('#ea72d2').bold(req.body.query)}
  param: ${chalk.hex('#ea72d2').bold(
    util.inspect(req.body.params, {
      showHidden: false,
      depth: 2,
      colorize: true,
    })
  )}
}`
    ),
  };

  return `
${log.methodStatus} - ${log.timestamp}
${log.fullUrl} - ${log.responseTime} / ${log.contentLenght}
${log.body}
`;
});
