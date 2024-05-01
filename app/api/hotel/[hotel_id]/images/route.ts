import db from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (
    req: NextApiRequest, res: NextApiResponse, params: { hotel_id: string }
) {
    const prisma = db()
    try {
        if (req.method === "GET") {
            const sites = await prisma.siteImage.findMany()
            return res.status(200).json({message: "Success!", sites: sites})
        }
        else if (req.method === "POST") {
            await prisma.hotelImage.create({
                data: {
                    url: req.body.url,
                    hotel_id: params.hotel_id
                }
            })
        }
        else {
            return res.status(400).json({message: "Method Not Allowed!"})
        }
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error", error: error })
    }
}
