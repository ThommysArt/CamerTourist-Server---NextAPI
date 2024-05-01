import db from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (
    req: NextApiRequest, res: NextApiResponse
) {
    const prisma = db()
    try {
        if (req.method === "GET") {
            const restaurants = await prisma.restaurant.findMany()
            return res.status(200).json({ message: "Fetched all restaurants from db.", restaurants: restaurants})
        }
        else if (req.method === "POST") {
            await prisma.restaurant.create({
                data: {
                    name: req.body.name,
                    description: req.body.description,
                    location: req.body.location,
                    contact: req.body.contact,
                }
            })
            return res.status(201).json({ message: "Created"})
        }
        else {
            return res.status(400).json({ message: "Method not allowed" })
        }
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error", error: error })
    }
}
