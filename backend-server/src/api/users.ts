import { Request, Response, Router } from "express";
import { client } from "../database/client";
import { Prisma } from "@prisma/client";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.q?.toString() || "";
    const searchString = searchQuery.toLowerCase();

    const users = await client.csvfile.findMany({
      where: {
        OR: [
          { name: { contains: searchString } as Prisma.StringFilter },
          { city: { contains: searchString } as Prisma.StringFilter },
          { country: { contains: searchString } as Prisma.StringFilter },
          { favorite_sport: { contains: searchString } as Prisma.StringFilter },
        ],
      },
    });

    res.json(users);
  } catch (error) {
    console.error("Error searching for users:", error);

    if (error instanceof PrismaClientUnknownRequestError) {
      if (error?.message) {
        return res.status(400).json({ error: "Duplicate entry" });
      }
    }

    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
});

export { router };
