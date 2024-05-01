import db from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (
    req: NextApiRequest, res: NextApiResponse, params: {restaurant_id: string, menu_id: number, menu_item_id: number}
) {
    const prisma = db()
    try {
        if (req.method === "PATCH") {
            await prisma.menuItem.update({
                where: {
                    id: params.menu_item_id,
                },
                data: {
                    name: req.body.name,
                    price: req.body.price,
                }
            })
            return res.status(200).json({message: "Updated A menu item."})
        }
        else if (req.method === "DELETE") {
            await prisma.menuItem.delete({
                where: {
                    id: params.menu_item_id
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
