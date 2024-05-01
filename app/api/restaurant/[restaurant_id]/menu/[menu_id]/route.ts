import db from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (
    req: NextApiRequest, res: NextApiResponse, params: {restaurant_id: string, menu_id: number}
) {
    const prisma = db()
    try {
        if (req.method === "DELETE") {
            await prisma.restaurantMenu.delete({
                where: {
                    id: params.menu_id
                }
            })
            return res.status(200).json({message: "Deleted menu"})
        }
        else {
            return res.status(400).json({ message: "Method not allowed" })
        }
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error", error: error })
    }
}
