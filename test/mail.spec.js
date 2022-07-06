import '../src/lib/dotenv';
import Mail from '../src/app/modules/Mail/index';

async function send() {
  try {
    await Mail.sendMail({
      to: `User <${process.env.MAIL_SUBJECT}>`,
      subject: `Sistema GeD - "E-mail teste"`,
      // attachments: [
      //   {
      //     filename: 'qrcode.png',
      //     path: path.resolve(tempDir, `${fileName}.png`),
      //     cid: 'qrcode',
      //   },
      //   {
      //     filename: 'protocolo.pdf',
      //     path: path.resolve(staticDir, 'drivein', 'protocolo.pdf'),
      //   },
      // ],
      template: 'simple-mail',
      context: {
        subject_mail: 'E-mail Teste',
      },
    });
    console.log('E-mail enviado.');
  } catch (err) {
    console.log(err);
  }
}

send();
