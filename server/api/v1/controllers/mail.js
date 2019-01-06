const sgMail = require("@sendgrid/mail");

const getHtmlString = require("./../views");

exports.mails_create_mail = async (req, res, next) => {
	const { to, from, subject, name, message } = req.body;
	try {
		const htmlString = await getHtmlString({ name });
		if (htmlString instanceof Error) throw htmlString;
		// console.log(htmlString);

		const toMsg = {
				to: from,
				from: "Techsavvy <noreply@techsavvy.com>",
				subject: `Re: ${subject}`,
				html: htmlString
			},
			fromMsg = {
				to,
				from: "Techsavvy <noreply@techsavvy.com>",
				subject,
				text: `${message}\n\nSincerely,\n\n${name}\n\n<${from}>`
				// html: htmlString
			};

		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		await sgMail.send(toMsg);
		await sgMail.send(fromMsg);

		return res.status(200).json({
			message: "Mail sent",
			request: {
				type: "POST",
				url: "http://localhost:5000/api/mails/create"
			}
		});
	} catch (e) {
		console.log(e.name + ": " + e.message);
		return res.status(500).json({ error: e.message });
	}
};
