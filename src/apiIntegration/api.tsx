import { ApiUrl } from "../apiUrl/ApiUrl";
export const UserProfile = async (options = {}) => {
  const url = `${ApiUrl}/user/profile`;
  const token_value = localStorage.getItem("token");
  const headers = {
    "Content-Type": "Application/json",
    ...options.headers,
  };

  if (token_value) {
    headers["Authorization"] = `Bearer ${token_value}`;
  }

  const config = {
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

export const PasswordUpdate = async (obj: any, options = {}) => {
  const url = `${ApiUrl}/user/profile/password`;
  const token_value = localStorage.getItem("token");
  const headers = {
    "Content-Type": "Application/json",
    ...options.headers,
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
  const url = `${ApiUrl}/user/signup`;
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
  const url = `${ApiUrl}/user/login`;
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
  const url = `${ApiUrl}/user/userList`;

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

export const DeleteUser = async (userID: any, options = {}) => {
  const url = `${ApiUrl}/user/${userID}`;
  const token_value = localStorage.getItem("token");

  const headers = {
    "Content-Type": "Application/json",
    ...options.headers,
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
  const url = `${ApiUrl}/user`;
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

export const UpdateUser = async (userID: any, Obj: any, options = {}) => {
  const url = `${ApiUrl}/user/${userID}`;
  const token_value = localStorage.getItem("token");
  const headers = {
    ...options.headers,
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

export const Addcandidate = async (Obj: any, options = {}) => {
  const url = `${ApiUrl}/candidate`;
  const token_value = localStorage.getItem("token");
  const headers = {
    "Content-Type": "Application/json",
    ...options.headers,
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
  const url = `${ApiUrl}/candidate/candidateList`;

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
  const url = `${ApiUrl}/candidate/vote/count`;

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
  options = {}
) => {
  const url = `${ApiUrl}/candidate/${candidateID}`;
  const token_value = localStorage.getItem("token");
  const headers = {
    "Content-Type": "Application/json",
    ...options.headers,
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

export const DeleteCandidate = async (candidateID: any, options = {}) => {
  const url = `${ApiUrl}/candidate/${candidateID}`;
  const token_value = localStorage.getItem("token");

  const headers = {
    "Content-Type": "Application/json",
    ...options.headers,
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

export const Vote = async (candidateID: any, options = {}) => {
  const url = `${ApiUrl}/candidate/vote/${candidateID}`;
  const token_value = localStorage.getItem("token");

  const headers = {
    "Content-Type": "Application/json",
    ...options.headers,
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
  const url = `${ApiUrl}/user/forgotpassword`;
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
  token: string | undefined,
  Obj: any
) => {
  const url = `${ApiUrl}/user/reset-password/${userID}/${token}`;
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
