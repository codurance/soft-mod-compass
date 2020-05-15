const body = (pdfLink, userData) => {
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta
      name="viewport"
      content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=no;"
    />
    <meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE" />

    <title>${subject()}</title>

    <style>
      @media (max-width: 550px) {
        .left-cell > table {
          padding-bottom: 0 !important;
        }
        .left-cell, .right-cell {
          width: 100% !important;
        }
        .right-cell {
          padding-top: 0 !important;
          padding-bottom: 20px !important
        }
        .right-cell ul {
          width: 100% !important;
          padding-left: 20px !important;
          margin-bottom: 0 !important;
        }
        .right-cell li {
          display: inline !important;
          margin-right: 20px !important;
        }
      }
    </style>
  </head>

  <body style="padding:0; margin:0; text-align: left; font-family:Arial, Helvetica, sans-serif; font-size: 16px; color: #293341; line-height: 1.5;">
    <table border="0" cellpadding="0" cellspacing="0" style="margin: 0; padding: 0" width="100%">
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 600px; margin-left: auto; margin-right: auto;">
            <tr>
              <td align="left" valign="top" style="padding: 20px;">
                <p class="preview-text" style="font-size: 0; line-height: 0;">Tu informe estará disponible para descargar durante siete días.</p>
                <p>Hola ${userData.firstname},
                  <br><br>
                  El equipo de Codurance te damos las gracias por utilizar <b>Compass</b>.
                  <br><br>
                  A continuación verás un link con el que podrás acceder al informe que hemos elaborado.
                  Esperamos que te sirva de ayuda para entender cuál es el grado actual de madurez de tu organización en cuanto a Software Modernisation.
                  Hemos incluído algunas recomendaciones para que puedas analizar las posibilidades de mejora que tienes a tu alcance.
                  <br><br>
                  Las cinco áreas que hemos analizado son:
                </p>
                <ul style="font-family: inherit;">
                  <li>Madurez Organizacional</li>
                  <li>Entrega continua</li>
                  <li>Personas y cultura</li>
                  <li>Equipos efectivos</li>
                  <li>Practicas técnicas</li>
                </ul>
                <p>Tu informe estará disponible para descargar durante siete días. Si tienes algún comentario sobre el informe, o necesitas que ampliemos o clarifiquemos algún punto en concreto no dudes en contactar con nosotros.</p>
                <p style="font-family:Arial, Helvetica, sans-serif; font-size: 16px; color: #293341; line-height: 1.5;">
                  <a href=${pdfLink} style="color: #fa7268">Aquí tienes tu informe</a>
                  <br><br>
                  Gracias!
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding-left: 20px; padding-right: 20px; padding-top: 10px;">
                <table cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="80">
                      <img alt="david-profile" width="80" height="80" src="https://compass-images.s3.eu-central-1.amazonaws.com/email-images/david-profile.png">
                    </td>
                    <td style="padding-left: 20px;">
                      <p>
                        <b>David Hall</b><br>
                        <span style="font-size: 13px;">Head of Business Development</span><br>
                        <a href="tel: +447447062036" style="font-size: 13px; color: #293341;">+44 7447 062036</a><br>
                        <a href="https://codurance.es/software-modernisation/" style="font-size: 13px; color: #293341;">Codurance.es</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr><td style="height: 100px; display: block; width: 100%; font-size: 0; line-height: 100px;">&nbsp;</td></tr>
      <tr style="background:#191919">
        <td style>
          <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 600px; margin-left: auto; margin-right: auto;">
            <tr>
              <!-- left cell -->
              <td class="left-cell" style="display: inline-block; width: 49%; padding-top: 20px;">
                <table cellpadding="0" cellspacing="0" border="0" style="padding: 20px; color: #ffffff99; width: 100%;">
                  <tr>
                    <td>
                      <img alt="codurance-logo" width="150" height="20" src="https://compass-images.s3.eu-central-1.amazonaws.com/email-images/codurance-logo.png">
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 10px;">
                      <p style="font-size: 13px;">
                        Somos Software Craftspeople. Construimos software bien elaborado para nuestros clientes, ayudamos a los/as desarrolladores/as a mejorar en su oficio a través de la formación, la orientación y la tutoría. Ayudamos a las empresas a mejorar en la distribución de software.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
              <!-- right cell -->
              <td class="right-cell" style="display: inline-block; width: 49%; padding-top: 20px;color:#ffffff99;">
                  <ul style="list-style: none; display: inline-block;">
                    <li class="footer__nav-link" style="margin-bottom: 10px;">
                      <a href="https://codurance.es/clients/" style="color:inherit; text-decoration: none;">clientes</a>
                    </li>
                    <li class="footer__nav-link" style="margin-bottom: 10px;">
                      <a href="https://codurance.es/services/" style="color:inherit; text-decoration: none;">servicios</a>
                    </li>
                    <li class="footer__nav-link" style="margin-bottom: 10px;">
                      <a href="https://codurance.es/publications/" style="color:inherit; text-decoration: none;">publicaciones</a>
                    </li>
                  </ul>
                  <ul style="list-style: none; display: inline-block;">
                    <li class="footer__nav-link" style="margin-bottom: 10px;">
                      <a href="https://codurance.es/careers/" style="color:inherit; text-decoration: none;">carreras</a>
                    </li>
                    <li class="footer__nav-link" style="margin-bottom: 10px;">
                      <a href="https://codurance.es/about-us/our-story/" style="color:inherit; text-decoration: none;">sobre nosotros</a>
                    </li>
                    <li class="footer__nav-link" style="margin-bottom: 10px;">
                      <a href="https://codurance.es/contact-us/" style="color:inherit; text-decoration: none;">contáctanos</a>
                    </li>
                  </ul>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="background: #111111; padding-top: 20px; padding-bottom: 20px; color:#ffffff99;">
          <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 600px; margin-left: auto; margin-right: auto; padding-left: 20px; padding-right: 20px;">
            <tr>
              <td>
                <span class="text-small">Síguenos en nuestros canales Social Media</span>
                <a href="https://www.facebook.com/codurance/" style="margin-left: 10px;">
                  <img alt="Facebook-f" width="auto" height="20" src="https://compass-images.s3.eu-central-1.amazonaws.com/email-images/Facebook-f.png">
                </a>
                <a href="https://www.linkedin.com/company/codurance/" style="margin-left: 10px;">
                  <img alt="linkedin-in" width="auto" height="20" src="https://compass-images.s3.eu-central-1.amazonaws.com/email-images/linkedin-in.png">
                </a>
                <a href="https://twitter.com/codurance" style="margin-left: 10px;">
                  <img alt="twitter" width="auto" height="20" src="https://compass-images.s3.eu-central-1.amazonaws.com/email-images/twitter.png">
                </a>
                <a href="https://www.instagram.com/codurance/" style="margin-left: 10px;">
                  <img alt="instagram" width="auto" height="20" src="https://compass-images.s3.eu-central-1.amazonaws.com/email-images/instagram.png">
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`};

const subject = () => 'Aquí tienes tu informe Compass';

module.exports = {subject, body};