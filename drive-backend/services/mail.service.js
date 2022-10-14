const nodemailer = require("nodemailer");

const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;

async function main(to, subject, data) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: MAIL_USER, // generated ethereal user
      pass: MAIL_PASS, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: MAIL_USER, // sender address
    to, // list of receivers
    subject, // Subject line
    text: data, // plain text body
    html: data, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

const sendMail = () => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "Sender Email ID",
      pass: "Sender Email Password",
    },
  });
  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extName: ".handlebars",
        // partialsDir: viewPath,
        layoutsDir: viewPath,
        defaultLayout: false,
        partialsDir: partialsPath,
        express,
      },
      viewPath: viewPath,
      extName: ".handlebars",
    })
  );

  var mailOptions = {
    from,
    to,
    subject,
    template: "index",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { main };
