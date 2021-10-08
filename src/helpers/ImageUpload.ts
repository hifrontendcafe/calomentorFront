export const fileUpload = async (file: Blob) => {
  const image64 = await getBase64(file);

  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/uploadImage`,
      {
        method: "POST",
        body: image64 as BodyInit,
      }
    );
    const parsedResp = await resp.json();
    if (parsedResp.message === "ok") {
      return parsedResp.url;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

const getBase64 = (file: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
