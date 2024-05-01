import db from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (
    req: NextApiRequest, res: NextApiResponse, params: {restaurant_id: string, restaurant_image_id: number}
) {
    const prisma = db()
    try {
        if (req.method === "GET") {
            const restaurant_image = await prisma.restaurantImage.findFirst({
                where: {
                    restaurant_id: params.restaurant_id,
                    id: params.restaurant_image_id
                }
            })
        }
        else if (req.method === "DELETE") {
            await prisma.restaurantImage.delete({
                where: {
                    id: params.restaurant_image_id
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

