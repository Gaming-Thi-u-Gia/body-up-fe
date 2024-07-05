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
// export const fetchPostRecipe = async (
//   recipe: AddNewRecipeType,
//   sessionToken: string
// ) => {
//   const { img, otherImageRecipes, ...rest } = recipe;
//   const resultFromServer = await fetch(
//     `${process.env.NEXT_PUBLIC_API}/recipe`,
//     {
//       method: "POST",
//       body: JSON.stringify({ img, otherImageRecipes }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   ).then(async (res) => {
//     const payload = await res.json();
//     const data = { status: res.status, payload };
//     if (!res.ok) {
//       throw new Error("Error while upload img to cloudinary");
//     }
//     return data;
//   });
//   const updatedOtherImage = otherImageRecipes.map((objImg, index) => {
//     objImg.img = resultFromServer.payload.results2[index].secure_url;
//     return objImg;
//   });
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/create-recipe`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${sessionToken}`,
//         },
//         body: JSON.stringify({
//           ...rest,
//           img: resultFromServer.payload.results1.secure_url,
//           otherImageRecipes: updatedOtherImage,
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     }

//     const data = await response.text();
//     return data;
//   } catch (error) {
//     throw new Error(`Error while fetching post recipe`);
//   }
// };
