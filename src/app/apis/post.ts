import { backUrl } from '@/app/config'; //http://localhost:3065
import axios from 'axios';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export async function addPostAPI(data: any) {
  const headers = {
    Authorization: `Bearer ${data?.token}`,
  };
  const response = await axios.post('/post', data, {
    headers: data.token ? headers : { Authorization: null },
  });
  return response.data;
}

export async function getPostsAPI() {
  try {
    const response = await axios.get(`/post/getposts`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function navCountAPI() {
  try {
    const response = await axios.get(`/post/navCount`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function removePostAPI({
  token,
  id,
}: {
  token: string;
  id: string;
}) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.delete(`/post/${id}`, {
      headers: token ? headers : { Authorization: null },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function updatePostAPI(data: any) {
  const headers = {
    Authorization: `Bearer ${data?.token}`,
  };
  try {
    const response = await axios.put(`/post/${data.params}`, data, {
      headers: data.token ? headers : { Authorization: null },
    });
    return response.data;
  } catch (err) {
    console.error('updatePostAPI', err);
  }
}

// Get으로 수정할 필요가 있음
export async function getPostAPI({
  id,
  token,
}: {
  id: string;
  token: string | null;
}) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(
      `/post/${id}`,
      { token },
      { headers: token ? headers : { Authorization: null } },
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function uploadImageAPI(data: FormData) {
  try {
    const response = await axios.post('/post/upload', data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function pagenationFindAllAPI(data: any) {
  try {
    if (data.category) {
      const response = await axios.get(
        `/post/pagination?category=${data.category}&page=${data.page || 1}&limit=${Number(data.limit) || 10}`,
      );
      return response.data;
    } else {
      const response = await axios.get(
        `/post/pagination?page=${data.page || 1}&limit=${data.limit || 10}`,
      );
      return response.data;
    }
  } catch (err) {
    console.error(err);
  }
}
