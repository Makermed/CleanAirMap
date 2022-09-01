import Resizer from "react-image-file-resizer";

export const resizeImageFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1080,
      1080,
      "PNG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "blob"
    );
  });
