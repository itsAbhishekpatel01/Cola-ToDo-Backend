const registrationTemplate = ({ username }) => {
    return `<!DOCTYPE html>
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

    p {
      font-size: 16px;
      color: #555;
      line-height: 1.6;
    }

    .highlight {
      font-weight: bold;
      color: #4CAF50;
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
  </style>
  <title>Welcome to Cola Todo!</title>
</head>
<body>
  <div class="container">
    <h1>Welcome to Cola Todo!</h1>
    <p>Hi <span class="highlight">${username}</span>,</p>
    <p>We are thrilled to have you join our platform! Cola Todo is designed to make your life easier with collaborative to-do lists, seamless task sharing, and much more.</p>
    <p>Here’s what you can do next:</p>
    <ul>
      <li>Create and organize your to-do lists.</li>
      <li>Share tasks with your friends, family, or teammates.</li>
      <li>Set permissions for editing or read-only access.</li>
    </ul>

    <a target="blank" href="https://cola-todo-frontend.onrender.com/" class="button">Go to Your Dashboard</a>

    <p>If you have any questions or need assistance, don’t hesitate to reach out to our support team at <a href="mailto:team.colatodo@gmail.com">team.colatodo@gmail.com</a>.</p>
    <div class="footer">
      <p>Thank you for choosing Cola Todo!<br> The Cola Todo Team</p>
      <p>
        <a href="#">Privacy Policy</a> | 
        <a href="#">Terms of Service</a>
      </p>
    </div>
  </div>
</body>
</html>
`
};
module.exports = registrationTemplate;
