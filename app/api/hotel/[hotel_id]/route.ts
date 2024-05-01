import db from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (
    req: NextApiRequest, res: NextApiResponse, params: { hotel_id: string }
) {
    const prisma = db()
    try {
        if (req.method === "GET") {
            const hotel = await prisma.hotel.findFirst({
                where: {
                    id: params.hotel_id,
                }
            })
        }
        else if (req.method === "PATCH") {
            await  prisma.hotel.update({
                where: {
                    id: params.hotel_id,
                },
                data: {
                    name: req.body.name,
                    description: req.body.description,
                    location: req.body.location,
                    contact: req.body.contact,
                }
            })
        }
        else if (req.method === "DELETE") {
            await prisma.hotel.delete({
                where: {
                    id: params.hotel_id
                }
            })
        }
        else {
            return res.status(400).json({ message: "Method not allowed" })
        }
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error", error: error })
    }
}
