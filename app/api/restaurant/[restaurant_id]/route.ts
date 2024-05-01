import db from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (
    req: NextApiRequest, res: NextApiResponse, params: { restaurant_id: string }
) {
    const prisma = db()
    try {
        if (req.method === "GET") {
            const restaurant = await prisma.restaurant.findFirst({
                where: {
                    id: params.restaurant_id,
                }
            })
        }
        else if (req.method === "PATCH") {
            await  prisma.restaurant.update({
                where: {
                    id: params.restaurant_id,
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
            await prisma.restaurant.delete({
                where: {
                    id: params.restaurant_id
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
