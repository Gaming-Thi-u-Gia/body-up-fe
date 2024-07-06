const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dmo4j9ekj",
  api_key: "991449855188987",
  api_secret: "CjMZcnE4KcGW5Ayp-fyQYMBH6e8",
});

export async function POST(request: Request, response: Response) {
  const { img, otherImageRecipes } = await request.json();
  const imgBase64 = img.toString("base64");
  const results1 = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      imgBase64,
      {
        folder: "recipe-imgs",
        overwrite: true,
        invalidate: true,
      },
      function (error: any, result: any) {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      }
    );
  });
  let results2 = [];
  for (const img of otherImageRecipes) {
    const imgArrayBase64 = img.img.toString("base64");
    const data = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        imgArrayBase64,
        {
          folder: "recipe-imgs",
          overwrite: true,
          invalidate: true,
        },
        function (error: any, result: any) {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        }
      );
    });
    results2.push(data);
  }
  return Response.json({ results1, results2 });
}
