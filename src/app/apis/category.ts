import { backUrl } from '@/app/config'; //http://localhost:3065
import axios from 'axios';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export async function addCategoryAPI(data: any) {
  const headers = {
    Authorization: `Bearer ${data.token}`,
  };
  try {
    const response = await axios.post(`/category`, data, {
      headers: data.token ? headers : { Authorization: null },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getCategoriesAPI() {
  try {
    const response = await axios.get(`/category`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getCategoryAPI(data: any) {
  try {
    const response = await axios.get(`/category/nav/${data}`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function removeCategoryAPI(data: any) {
  const headers = {
    Authorization: `Bearer ${data.token}`,
  };
  try {
    const response = await axios.delete(`/category/${data.id}`, {
      headers: data.token ? headers : { Authorization: null },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

// 태그 수정
export const updateCategoryAPI = async ({
  id,
  name,
  token,
}: {
  id: string;
  name: string;
  token: string;
}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.patch(
      `/category/${id}`,
      { name },
      { headers },
    );
    return response.data; // 수정된 태그 반환
  } catch (err) {
    console.error(err);
  }
};
