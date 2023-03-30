import express from 'express';
import bodyParser from 'body-parser';
import { google } from 'googleapis';
import ytdl from 'ytdl-core';
import { createWriteStream, unlink } from 'fs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

const app = express();

dotenv.config()

// Configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/download', async (req, res) => {
  const { videoId, email } = req.body;

  try {
    // Authenticate with Google API
    const auth = new google.auth.GoogleAuth({
      keyFile: 'keyFile.json',
      scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
    });
    const youtube = google.youtube({
      version: 'v3',
      auth,
    });

    // Get video info
    const { data: { items } } = await youtube.videos.list({
      part: 'snippet',
      id: videoId,
    });
    const videoTitle = items[0].snippet.title;

    // Download audio
    const audioStream = ytdl(`https://www.youtube.com/watch?v=${videoId}`, { filter: 'audioonly' });
    const filePath = `${videoTitle}.mp3`;
    const file = createWriteStream(filePath);
    audioStream.pipe(file);

    file.on('finish', async () => {
      // Create a Nodemailer transporter object
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: "ytmp6675@gmail.com",
          pass: "edkizivhtozxbvgf",
        },
      });

      // Send the email
      await transporter.sendMail({
        from: "ytmp6675@gmail.com",
        to: email,
        subject: 'Your MP3 file has arrived',
        html: `Here is your MP3 <b>${videoTitle}</b> file to download<br>Enjoy!`,
        attachments: [
          {
            filename: `${videoTitle}.mp3`,
            path: filePath,
            contentType: 'audio/mpeg',
          },
        ],
      });

      console.log(`File ${filePath} sent to ${email} successfully`);

      // Delete the file
      unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Deleted ${filePath}`);
        }
      });

      // Send a response to the client
      res.status(200).send('Email sent successfully');
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
