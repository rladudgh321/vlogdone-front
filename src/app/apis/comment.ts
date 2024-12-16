import { backUrl } from '@/app/config'; //http://localhost:3065
import axios from 'axios';
import { likeProps, pageProps } from '../interafce';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export async function addCommentAPI(data: any) {
  const headers = {
    Authorization: `Bearer ${data.token}`,
  };
  try {
    const response = await axios.post(`/comment/${data.postId}`, data, {
      headers: data.token ? headers : { Authorization: null },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function addCommentaAPI(data: any) {
  const headers = {
    Authorization: `Bearer ${data.token}`,
  };
  try {
    const response = await axios.post(
      `/comment/${data.param}/${data.parentId}`,
      data,
      { headers: data.token ? headers : { Authorization: null } },
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

// 댓글 페이지네이션 불러오기
export async function getCommentPaginationAPI(data: pageProps) {
  try {
    const headers = {
      Authorization: `Bearer ${data.token}`,
    };
    const response = await axios.get(
      `/comment/pagination/${data.param}?page=${data.page || 1}&limit=${data.limit || 10}`,
      { headers: data.token ? headers : { Authorization: null } },
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

//좋아요 불러오기
export async function getLikeCommentAPI(data: any) {
  const headers = {
    Authorization: `Bearer ${data.token}`,
  };
  try {
    const response = await axios.get(
      `/comment/like/${data.param}/${data.commentId}`,
      { headers: data.token ? headers : { Authorization: null } },
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

//좋아요 추가
export async function addLikeCommentAPI(data: likeProps) {
  const headers = {
    Authorization: `Bearer ${data.token}`,
  };
  try {
    const response = await axios.patch(
      `/comment/${data.param}/${data.commentId}`,
      null,
      { headers: data.token ? headers : { Authorization: null } },
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function removeLikeCommentAPI(data: any) {
  const headers = {
    Authorization: `Bearer ${data.token}`,
  };
  try {
    const response = await axios.delete(
      `/comment/like/${data.param}/${data.commentId}`,
      { headers: data.token ? headers : { Authorization: null } },
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function removeDaetguelLikesAPI(data: any) {
  const headers = {
    Authorization: `Bearer ${data.token}`,
  };
  try {
    const response = await axios.delete(
      `/comment/daetguel/likes/${data.param}/${data.commentId}`,
      { headers: data.token ? headers : { Authorization: null } },
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function ifDeletePost_deleteManyLikeAPI(data: any) {
  const headers = {
    Authorization: `Bearer ${data.token}`,
  };
  try {
    const response = await axios.delete(`/comment/post/like/${data.param}`, {
      headers: data.token ? headers : { Authorization: null },
    });
    return response.data;
  } catch (err) {
    console.error('ifDeletePost_deleteManyLike Error', err);
  }
}

export async function ifOriginremoveComment_removeWithItsParentIdAPI(
  data: any,
) {
  const headers = {
    Authorization: `Bearer ${data.token}`,
  };
  try {
    const response = await axios.delete(
      `/comment/origin/like/${data.param}/${data.commentId}`,
      { headers: data.token ? headers : { Authorization: null } },
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

//token, postId
export async function getCommentAPI(data: any) {
  try {
    const headers = {
      Authorization: `Bearer ${data.token}`,
    };
    const response = await axios.get(`/comment/${data.param}`, {
      headers: data.token ? headers : { Authorization: null },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

//token, postId
export async function getCommentaAPI(data: any) {
  const headers = {
    Authorization: `Bearer ${data.token}`,
  };
  try {
    const response = await axios.get(
      `/comment/commentDaetgeul/${data.param}/${data.parentId}`,
      { headers: data.token ? headers : { Authorization: null } },
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

//token, postId
export async function removeCommentAPI(data: any) {
  const headers = {
    Authorization: `Bearer ${data.token}`,
  };
  try {
    const response = await axios.delete(
      `/comment/deleteOne/${data.postId}/${data.commentId}`,
      { headers: data.token ? headers : { Authorization: null } },
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

//token, postId
export async function removeCommentsAPI(data: any) {
  const headers = {
    Authorization: `Bearer ${data.token}`,
  };
  try {
    const response = await axios.delete(
      `/comment/${data.postId}/deleteComments`,
      { headers: data.token ? headers : { Authorization: null } },
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
