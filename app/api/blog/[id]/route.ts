import { NextResponse } from "next/server";
import { main } from "../route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
//あああああああああああああ
//ブログの詳細記事取得API
export const GET = async (req: Request , res: NextResponse) => {
    try {
        const id: number = parseInt(req.url.split("/blog/")[1]);
        await main();
        const posts = await prisma.post.findFirst({where:{id}}); //http://localhost:3000/api/blog/1
        return NextResponse.json({message: "Success", posts}, {status: 200});

    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
};

//ブログの記事編集用API
export const PUT = async (req: Request , res: NextResponse) => {
    try {
        const id: number = parseInt(req.url.split("/blog/")[1]);
        const {title, description} = await req.json();

        await main();
        const posts = await prisma.post.update({
            where: {id},
            data: {title, description}
        });
        return NextResponse.json({message: "Success", posts}, {status: 200});

    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
};

//削除用API
export const DELETE = async (req: Request , res: NextResponse) => {
    try {
        const id: number = parseInt(req.url.split("/blog/")[1]);

        await main();
        const posts = await prisma.post.delete({where: {id}});
        return NextResponse.json({message: "Success", posts}, {status: 200});

    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
};
