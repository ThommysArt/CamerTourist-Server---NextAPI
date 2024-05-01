import db from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (
    req: NextApiRequest, res: NextApiResponse, params: {restaurant_id: string}
) {
    const prisma = db()
    try {
        if (req.method === "GET") {
            const menu = await prisma.restaurantMenu.findFirst({
                where: {
                    restaurant_id: params.restaurant_id
                }
            })
            return res.status(200).json({message: "Fetched the restaurant's menu", menu: menu})
        }
        else if (req.method === "POST") {
            await prisma.restaurantMenu.create({
                data: {
                    restaurant_id: params.restaurant_id
                }
            })
            return res.status(201).json({message: 'Restaurant Menu created successfully.'})
        }
        else {
            return res.status(400).json({ message: "Method not allowed" })
        }
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error", error: error })
    }
}
