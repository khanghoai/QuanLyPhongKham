export const postData = async (url, body) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    return data;
  }
  catch (error) {
    console.error("Lỗi POST API:", error);
    throw error;
  }
};

export const getData = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
  catch (error) {
    console.error("Lỗi POST API:", error);
    throw error;
  }
};
