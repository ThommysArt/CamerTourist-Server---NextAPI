import db from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (
    req: NextApiRequest, res: NextApiResponse, params: {site_id: string, site_image_id: number}
) {
    const prisma = db()
    try {
        if (req.method === "GET") {
            const site_image = await prisma.siteImage.findFirst({
                where: {
                    site_id: params.site_id,
                    id: params.site_image_id
                }
            })
        }
        else if (req.method === "DELETE") {
            await prisma.siteImage.delete({
                where: {
                    id: params.site_image_id
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

