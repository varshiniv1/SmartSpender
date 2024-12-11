// email.test.js
import nodemailer from 'nodemailer';
import sendEmail from '../utils/email';

// Mock nodemailer
jest.mock('nodemailer');

describe('sendEmail', () => {
    let mockSendMail;

    beforeAll(() => {
        // Mock the transporter's sendMail method
        mockSendMail = jest.fn().mockResolvedValue('Email sent');

        nodemailer.createTransport.mockReturnValue({
            sendMail: mockSendMail,
        });
    });

    it('should send an email with the correct options', async () => {
        const emailDetails = {
            to: 'test@example.com',
            subject: 'Test Email',
            text: 'This is a test email.',
            html: '<p>This is a test email.</p>',
        };

        await sendEmail(emailDetails);

        expect(mockSendMail).toHaveBeenCalledWith({
            from: process.env.EMAIL_USER,
            to: emailDetails.to,
            subject: emailDetails.subject,
            text: emailDetails.text,
            html: emailDetails.html,
        });
        expect(mockSendMail).toHaveBeenCalledTimes(1);
    });

    it('should handle errors during email sending', async () => {
        mockSendMail.mockRejectedValueOnce(new Error('Failed to send email'));

        const emailDetails = {
            to: 'test@example.com',
            subject: 'Test Email',
            text: 'This is a test email.',
            html: '<p>This is a test email.</p>',
        };

        await expect(sendEmail(emailDetails)).resolves.not.toThrow();

        expect(console.error).toHaveBeenCalledWith(
            'Error sending email:',
            expect.any(Error)
        );
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });
});