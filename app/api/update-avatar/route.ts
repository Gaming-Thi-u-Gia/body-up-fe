const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "dmo4j9ekj",
    api_key: "991449855188987",
    api_secret: "CjMZcnE4KcGW5Ayp-fyQYMBH6e8",
});

export async function POST(request: Request, response: Response) {
    const { base64Img } = await request.json();
    const results = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            base64Img,
            { overwrite: true, invalidate: true, width: 100, height: 100 },
            function (error: any, result: any) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }
        );
    });
    return Response.json({ results });
}
