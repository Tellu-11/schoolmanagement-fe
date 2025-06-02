import { appConstant } from "./appConstant";

const headers = (token?: string) => {
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

const getRequest = async (urlPath: string, token?: string, params?: any) => {
  try {
    const response = await fetch(appConstant.BASE_URL + urlPath, {
      method: "GET",
      headers: headers(token),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    return response.json();
  } catch (error) {
    console.debug("Error in GET request:", error);
    throw error;
  }
};

const postRequest = async (urlPath: string, body: any, token?: string) => {
  try {
    const response = await fetch(appConstant.BASE_URL + urlPath, {
      method: "POST",
      headers: headers(token),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    return response.json();
  } catch (error) {
    console.debug("Error in POST request:", error);
    throw error;
  }
};

const putRequest = async (urlPath: string, body: any, token?: string) => {
  try {
    const response = await fetch(appConstant.BASE_URL + urlPath, {
      method: "PUT",
      headers: headers(token),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    return response.json();
  } catch (error) {
    console.debug("Error in PUT request:", error);
    throw error;
  }
};

const deleteRequest = async (urlPath: string, token?: string) => {
  try {
    const response = await fetch(appConstant.BASE_URL + urlPath, {
      method: "DELETE",
      headers: headers(token),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }

    return response.json();
  } catch (error) {
    console.debug("Error in DELETE request:", error);
    throw error;
  }
};

export const apiCall = {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
};
