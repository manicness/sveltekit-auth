import nodemailer from 'nodemailer';
import * as aws from '@aws-sdk/client-ses';
import {
	FROM_EMAIL,
	MY_SWA_ACCESS_KEY_ID,
	MY_SWA_SECRET_ACCESS_KEY,
	MY_SWA_REGION,
	MY_SWA_API_VERSION
} from '$env/static/private';
//import { z } from "zod";
export default async function sendEmail(
	email: string,
	subject: string,
	bodyHtml?: string,
	bodyText?: string
) {
	const hasAccessKeys = MY_SWA_ACCESS_KEY_ID && MY_SWA_SECRET_ACCESS_KEY;

	const ses = new aws.SES({
		apiVersion: MY_SWA_API_VERSION,
		region: MY_SWA_REGION,
		...(hasAccessKeys
			? {
					credentials: {
						accessKeyId: MY_SWA_ACCESS_KEY_ID || '',
						secretAccessKey: MY_SWA_SECRET_ACCESS_KEY || ''
					}
				}
			: {})
	});

	// create Nodemailer SES transporter
	const transporter = nodemailer.createTransport({
		SES: { ses, aws }
	});

	try {
		if (!bodyText) {
			transporter.sendMail(
				{
					from: FROM_EMAIL,
					to: email,
					subject: subject,
					html: bodyHtml
				},
				(err) => {
					if (err) {
						throw new Error(`Error sending email: ${JSON.stringify(err)}`);
					}
				}
			);
		} else if (!bodyHtml) {
			transporter.sendMail(
				{
					from: FROM_EMAIL,
					to: email,
					subject: subject,
					text: bodyText
				},
				(err) => {
					if (err) {
						throw new Error(`Error sending email: ${JSON.stringify(err)}`);
					}
				}
			);
		} else {
			transporter.sendMail(
				{
					from: FROM_EMAIL,
					to: email,
					subject: subject,
					html: bodyHtml,
					text: bodyText
				},
				(err) => {
					if (err) {
						throw new Error(`Error sending email: ${JSON.stringify(err)}`);
					}
				}
			);
		}
		console.log('E-mail sent successfully!');
		return {
			statusCode: 200,
			message: 'E-mail sent successfully.'
		};
	} catch (error) {
		throw new Error(`Error sending email: ${JSON.stringify(error)}`);
	}
}
