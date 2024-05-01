import db from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (
    req: NextApiRequest, res: NextApiResponse, params: {hotel_id: string, hotel_image_id: number}
) {
    const prisma = db()
    try {
        if (req.method === "GET") {
            const hotel_image = await prisma.hotelImage.findFirst({
                where: {
                    hotel_id: params.hotel_id,
                    id: params.hotel_image_id
                }
            })
        }
        else if (req.method === "DELETE") {
            await prisma.hotelImage.delete({
                where: {
                    id: params.hotel_image_id
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

