const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dmo4j9ekj",
  api_key: "991449855188987",
  api_secret: "CjMZcnE4KcGW5Ayp-fyQYMBH6e8",
});

export async function POST(request: Request, response: Response) {
  const { img, banner } = await request.json();
  console.log("img", img, "banner", banner);

  const imgBase64 = img.toString("base64");
  const results1 = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      imgBase64,
      {
        folder: "workout-program-imgs",
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
  const bannerBase64 = banner.toString("base64");
  const results2 = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      bannerBase64,
      {
        folder: "workout-program-imgs",
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
  return Response.json({ results1, results2 });
}
