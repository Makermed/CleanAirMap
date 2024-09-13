import Resizer from "react-image-file-resizer";

export const resizeImageFile = (file, flag) =>
  new Promise(async (resolve) => {
    if (flag) {
      const promise1 = new Promise((innerResolve) => {
        Resizer.imageFileResizer(
          file,
          150,
          150,
          "PNG",
          72,
          0,
          (uri) => {
            innerResolve(uri);
          },
          "blob"
        );
      });

      const promise2 = new Promise((innerResolve) => {
        Resizer.imageFileResizer(
          file,
          720,
          720,
          "PNG",
          72,
          0,
          (uri) => {
            innerResolve(uri);
          },
          "blob"
        );
      });

      const [resizedImage1, resizedImage2] = await Promise.all([
        promise1,
        promise2,
      ]);
      resolve([resizedImage1, resizedImage2]);
    } else {
      Resizer.imageFileResizer(
        file,
        720,
        720,
        "PNG",
        72,
        0,
        (uri) => {
          resolve(uri);
        },
        "blob"
      );
    }
  });
