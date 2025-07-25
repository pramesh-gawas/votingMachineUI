const API_BASE_URL = import.meta.env.VITE_API_URL;
// import { API_BASE_URL } from "../ApiUrl_";

interface UserProfileOptions extends RequestInit {
  headers?: {
    [key: string]: string;
  };
}

export const UserProfile = async (options: UserProfileOptions = {}) => {
  const url = `${API_BASE_URL}/user/profile`;
  const token_value = localStorage.getItem("token");

  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token_value) {
    headers["Authorization"] = `Bearer ${token_value}`;
  }

  const config: RequestInit = {
    method: "GET",
    ...options,
    headers,
  };
  try {
    const result = await fetch(url, config);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const PasswordUpdate = async (
  obj: any,
  options: UserProfileOptions = {}
) => {
  const url = `${API_BASE_URL}/user/profile/password`;
  const token_value = localStorage.getItem("token");

  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token_value) {
    headers["Authorization"] = `Bearer ${token_value}`;
  }

  const config = {
    method: "PUT",
    ...options,
    headers,
    body: JSON.stringify(obj),
  };
  try {
    const result = await fetch(url, config);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const SignUpApi = async (Obj: any) => {
  const url = `${API_BASE_URL}/user/signup`;
  const options = {
    method: "POST",
    body: Obj,
  };
  try {
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const SignInApi = async (Obj: any) => {
  const url = `${API_BASE_URL}/user/login`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(Obj),
  };
  try {
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const UserList = async () => {
  const url = `${API_BASE_URL}/user/userList`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
    },
  };
  try {
    const result = await fetch(url, options);
    const data = await result.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const DeleteUser = async (
  userID: any,
  options: UserProfileOptions = {}
) => {
  const url = `${API_BASE_URL}/user/${userID}`;
  const token_value = localStorage.getItem("token");

  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token_value) {
    headers["Authorization"] = `Bearer ${token_value}`;
  }

  const config = {
    method: "DELETE",
    ...options,
    headers,
  };
  try {
    const result = await fetch(url, config);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const AddUser = async (Obj: any) => {
  const url = `${API_BASE_URL}/user`;
  const options = {
    method: "POST",
    body: Obj,
  };
  try {
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const UpdateUser = async (
  userID: any,
  Obj: any,
  options: UserProfileOptions = {}
) => {
  const url = `${API_BASE_URL}/user/${userID}`;
  const token_value = localStorage.getItem("token");

  const headers: { [key: string]: string } = {
    ...(options.headers || {}),
  };

  if (token_value) {
    headers["Authorization"] = `Bearer ${token_value}`;
  }

  const config = {
    method: "PUT",
    headers,
    ...options,
    body: Obj,
  };
  try {
    const result = await fetch(url, config);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const Addcandidate = async (
  Obj: any,
  options: UserProfileOptions = {}
) => {
  const url = `${API_BASE_URL}/candidate`;
  const token_value = localStorage.getItem("token");

  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token_value) {
    headers["Authorization"] = `Bearer ${token_value}`;
  }

  const config = {
    method: "POST",
    ...options,
    headers,
    body: JSON.stringify(Obj),
  };
  try {
    const result = await fetch(url, config);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const CandidateList = async () => {
  const url = `${API_BASE_URL}/candidate/candidateList`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
    },
  };
  try {
    const result = await fetch(url, options);
    const data = await result.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const CandidateCount = async () => {
  const url = `${API_BASE_URL}/candidate/vote/count`;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
    },
  };
  try {
    const result = await fetch(url, options);
    const data = await result.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const UpdateCandidate = async (
  candidateID: any,
  Obj: any,
  options: UserProfileOptions = {}
) => {
  const url = `${API_BASE_URL}/candidate/${candidateID}`;
  const token_value = localStorage.getItem("token");

  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token_value) {
    headers["Authorization"] = `Bearer ${token_value}`;
  }

  const config = {
    method: "PUT",
    ...options,
    headers,
    body: JSON.stringify(Obj),
  };
  try {
    const result = await fetch(url, config);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const DeleteCandidate = async (
  candidateID: any,
  options: UserProfileOptions = {}
) => {
  const url = `${API_BASE_URL}/candidate/${candidateID}`;
  const token_value = localStorage.getItem("token");

  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token_value) {
    headers["Authorization"] = `Bearer ${token_value}`;
  }

  const config = {
    method: "DELETE",
    ...options,
    headers,
  };
  try {
    const result = await fetch(url, config);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const Vote = async (
  candidateID: any,
  options: UserProfileOptions = {}
) => {
  const url = `${API_BASE_URL}/candidate/vote/${candidateID}`;
  const token_value = localStorage.getItem("token");

  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token_value) {
    headers["Authorization"] = `Bearer ${token_value}`;
  }

  const config = {
    method: "POST",
    ...options,
    headers,
  };
  try {
    const result = await fetch(url, config);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const ForgotPasswordApi = async (Obj: any) => {
  const url = `${API_BASE_URL}/user/forgotpassword`;
  const options = {
    method: "POST",
    body: Obj,
  };
  try {
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const ResetPasswordApi = async (
  userID: string | undefined,
  token: any | undefined,
  Obj: any
) => {
  const url = `${API_BASE_URL}/user/reset-password/${userID}/${token}`;
  const options = {
    "Content-Type": "application/json",
    method: "PUT",
    body: Obj,
  };
  try {
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (error) {
    return error;
  }
};
