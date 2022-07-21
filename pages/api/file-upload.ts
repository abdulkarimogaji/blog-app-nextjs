import Multer from "multer";
import { google } from "googleapis";
import { Readable } from "stream";
import Cors from "cors";

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
});

const authenticateGoogle = () => {
  let privateKey = process.env.GOOGLE_AUTH_PRIVATE_KEY!.replace(/\\n/gm, "\n");
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_AUTH_CLIENT_EMAIL,
    key: privateKey,
    keyId: process.env.GOOGLE_AUTH_KEY_ID,
    scopes: "https://www.googleapis.com/auth/drive",
  });
  return auth;
};

const uploadToGoogleDrive = async (file: any, auth: any) => {
  const fileMetadata = {
    name: file.originalname,
    parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
  };

  var stream = Readable.from(file.buffer);

  const media = {
    mimeType: file.mimetype,
    body: stream,
  };

  const driveService = google.drive({ version: "v3", auth });

  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: "id",
  });
  return response;
};

function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};

export default async function handler(req: any, res: any, next: any) {
  if (req.method == "POST") {
    await runMiddleware(req, res, cors);
    await runMiddleware(req, res, multer.single("upload"));
    try {
      if (!req.file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
      }
      const auth = authenticateGoogle();
      const response = await uploadToGoogleDrive(req.file, auth);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}
