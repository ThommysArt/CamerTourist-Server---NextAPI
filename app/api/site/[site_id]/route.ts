import db from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (
    req: NextApiRequest, res: NextApiResponse, params: {site_id: string}
) {
    const prisma = db()
    try {
        if (req.method === "PATCH") {
            await prisma.site.update({
                where: {
                    id: params.site_id
                },
                data: {
                    name: req.body.name,
                    description: req.body.description,
                    location: req.body.location,
                }
            })
            .then(() => {
                return res.status(200).json({message: "Success!"})
            })
        }
        else if (req.method === "DELETE") {
            await prisma.site.delete({
                where: {
                    id: params.site_id
                }
            })
            .then(() => {
                return res.status(200).json({message: "Success!"})
            })
        }
        else if (req.method === "GET") {
            const site = await prisma.site.findFirst({
                where: {
                    id: params.site_id
                }
            })
            return res.status(200).json({message: "Success!", site: site})
        }
        else {
            res.status(400).json({message: "Method not allowed!"})
        }
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error", error: error })
    }
}
