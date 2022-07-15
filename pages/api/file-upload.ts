import Multer from "multer";
import { google } from "googleapis";
import fs from "fs";


const multer = Multer({
  storage: Multer.diskStorage({
    destination: "image-files",
    filename: function (req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});


const authenticateGoogle = () => {
  let privateKey =  process.env.GOOGLE_AUTH_PRIVATE_KEY!.replace(/\\n/gm, '\n')
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
    parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!]
  };

  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  const driveService = google.drive({ version: "v3", auth });

  const response = await driveService.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: "id",
  });
  return response;
};


const deleteFile = (filePath: any) => {
  fs.unlink(filePath, () => {
    console.log("file deleted");
  });
};


function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
}

 export default async function handler(req: any, res: any, next: any) {
   if (req.method == "POST") {
    await runMiddleware(req, res, multer.single("upload"))
    try {
      if (!req.file) {
        res.status(400).json({message: "No file uploaded"});
        return;
      }
      const auth = authenticateGoogle();
      const response = await uploadToGoogleDrive(req.file, auth);
      deleteFile(req.file.path);
      res.status(200).json(response);
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
  }
  }
  
};