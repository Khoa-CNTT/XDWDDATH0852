// sendMail.js
import nodemailer from 'nodemailer'

export const sendMail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,  
      pass: process.env.EMAIL_PASSWORD,           
    }
  })

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('✅ Gửi email thành công!')
  } catch (error) {
    console.error('❌ Lỗi khi gửi email:', error)
  }
}
