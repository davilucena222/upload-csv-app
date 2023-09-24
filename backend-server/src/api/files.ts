import { Request, Response, Router } from "express";
import multer from "multer";
import { Readable } from "stream";
import readline from "readline";
import { client } from "../database/client";

const router = Router();

const multerConfig = multer();

interface CsvfileData {
  name: string;
  city: string;
  country: string;
  favorite_sport: string;
}

router.post("/", multerConfig.single("file"), async (request: Request, response: Response) => {
  const { file } = request as Request & { file: Express.Multer.File };
  const { buffer } = file;

  const readableFile = new Readable();
  readableFile.push(buffer);
  readableFile.push(null);

  const csvfileLine = readline.createInterface({
    input: readableFile
  });

  const csvfileInformations: CsvfileData[] = [];

  for await (let line of csvfileLine) {
    const csvfileLineSplit = line.split(",");
    
    csvfileInformations.push({
      name: csvfileLineSplit[0],
      city: csvfileLineSplit[1],
      country: csvfileLineSplit[2],
      favorite_sport: csvfileLineSplit[3],
    });
  }

  csvfileInformations.shift();

  const insertedRecords: CsvfileData[] = [];

  for await (let { name, city, country, favorite_sport } of csvfileInformations) {
    const existingFirst = await client.csvfile.findFirst({
      where: {
        name,
        city,
        country,
        favorite_sport
      },
    });

    if (!existingFirst) {
      const newRecord = await client.csvfile.create({
        data: {
          name,
          city,
          country,
          favorite_sport
        }
      });

      insertedRecords.push(newRecord);
    }
  }

  return response.json(insertedRecords);
});

export { router }