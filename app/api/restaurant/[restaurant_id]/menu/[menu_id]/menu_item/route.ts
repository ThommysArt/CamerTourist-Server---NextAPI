import db from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (
    req: NextApiRequest, res: NextApiResponse, params: {restaurant_id: string, menu_id: number}
) {
    const prisma = db()
    try {
        if (req.method === "GET") {
            const menu_items = await prisma.menuItem.findMany()
            return res.status(200).json({message: "Fetched all menu items", menu_items: menu_items})
        }
        else if (req.method === "POST") {
            await prisma.menuItem.create({
                data: {
                    name: req.body.name,
                    price: req.body.price,
                    menu_id: params.menu_id
                }
            })
            return res.status(201).json({message: "Added new menu item."})
        }
        else {
            return res.status(400).json({ message: "Method not allowed" })
        }
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error", error: error })
    }
}
