import CONSTANTS from "../../constants";
import { LoginUser, User } from "../../types";
import { TokenService } from "./TokenService";

export const registerUser = async (user: User) => {
    try {
        const repoonse = await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.USER_REGISTER}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });

        if (!repoonse.ok) {
            throw new Error('POST request failed');
        }
        const data = await repoonse.json();
        return data;
    } catch (err) {
        console.error('POST request errror',err);
        throw err;
    }
};

export const loginUser = async (loginData: LoginUser) => {
    try {
        const response = await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.USER_LOGIN}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });
  
        if (!response.ok) {
            throw new Error('Error al realizar la solicitud POST');
          }
          const data = await response.json();
          if (data.message == "invalid user email or password."){
            throw new Error('Usuario no válido');
          }
          if(data.token){
            TokenService.saveToken(data.token);
            console.log('Token almacenado en localStorage:', data.token);
          } else {
            console.error('No se encontró un token en la respuesta JSON.');
          }
          return data;
          
      } catch (error) {
        console.error('Error en la solicitud POST:', error);
        throw error;
      }
  };

export const editUser = async (editData: User) => {
  console.log({editData});
  console.log(registerUser(editData));
  try {
    const res = await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.USER_EDIT}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(editData)
    });
    if(!res.ok){
      throw new Error('PATCH request failed');
    }
  } catch(err) {
    console.error('PATCH request errror',err);
    throw err;
  }
}

export const getUser = async () => {
  const token = TokenService.getToken();
  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }

  try {
    const url = `${CONSTANTS.BASE_URL}${CONSTANTS.USER_INFO}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error("GET request failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("GET request error:", error);
    throw error;
  }
};
