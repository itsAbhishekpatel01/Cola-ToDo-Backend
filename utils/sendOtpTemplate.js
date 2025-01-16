
const sendOtpTemplate = ({ otp }) => {
    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f7f6;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 30px auto;
        background-color: #ffffff;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      h1 {
        text-align: center;
        font-size: 32px;
        color: #333;
        margin-bottom: 20px;
      }

      h3 {
        font-size: 28px;
        color: #4CAF50;
        text-align: center;
        margin-top: 20px;
        font-weight: bold;
      }

      p {
        font-size: 16px;
        color: #555;
        line-height: 1.6;
      }

      .otp-container {
        background-color: #f8f8f8;
        border: 1px solid #ddd;
        padding: 20px;
        margin-top: 20px;
        text-align: center;
        border-radius: 6px;
      }

      .footer {
        text-align: center;
        margin-top: 30px;
        font-size: 14px;
        color: #777;
      }

      .footer a {
        color: #4CAF50;
        text-decoration: none;
      }

      .button {
        display: inline-block;
        background-color: #4CAF50;
        color: white;
        padding: 12px 20px;
        text-decoration: none;
        border-radius: 4px;
        text-align: center;
        font-size: 16px;
        margin-top: 20px;
        display: block;
        width: 100%;
      }

      .button:hover {
        background-color: #45a049;
      }
    </style>
    <title>Your OTP Code from Cola Todo</title>
  </head>
  <body>
    <div class="container">
      <h1>Welcome to Cola Todo!</h1>
      <p>Hello,</p>
      <p>We received a request to verify your identity. Here is your one-time password (OTP) to complete the process:</p>
      
      <div class="otp-container">
        <h3>${otp}</h3>
      </div>

      <p>This OTP will expire in 5 minutes. Please enter it promptly to continue.</p>
      <p>If you did not request this, please ignore this message.</p>
      

      <div class="footer">
        <p>Best regards,<br> The Cola Todo Team</p>
      </div>
    </div>
  </body>
</html>

`
}

module.exports = sendOtpTemplate;