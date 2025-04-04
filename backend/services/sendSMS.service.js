import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

const sendSMS = async (phone) => {
  try {
    const formattedPhone = phone.replace(/^0/, '+84'); 
    const response = await client.messages.create({
      body: 'Đây là mã SMS của quý khách',
      from: twilioPhoneNumber,
      to: formattedPhone,
    });

    console.log(`SMS sent successfully! Message SID: ${response.sid}`);
    return { success: true, sid: response.sid };
  } catch (error) {
    console.error(`Error sending SMS: ${error.message}`);
    return { success: false, error: error.message };
  }
};

export default sendSMS;
