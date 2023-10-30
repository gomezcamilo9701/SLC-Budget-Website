import CONSTANTS from "../../constants";
import { LoginUser, ProfileForEdit, UserToRegister } from "../../types";
import { TokenService } from "./TokenService";

export const registerUser = async (user: UserToRegister, profileImage: File) => {
    try {
        // Cree un objeto FormData para enviar los datos del usuario y la imagen
        const formData = new FormData();
        formData.append('createUserDTO', new Blob([JSON.stringify(user)], { type: 'application/json' }));
        formData.append('profileImage', profileImage);

        const repoonse = await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.USER_REGISTER}`, {
            method: 'POST',
            body: formData,
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
            localStorage.setItem('email', data.Username);
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

export const editUser = async (editData: ProfileForEdit, id: string) => {
  console.log('data', editData);
  const token = TokenService.getToken();
  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }

  console.log('id', id);
  console.log('id', typeof id);
  try {
    const res = await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.USER_EDIT}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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

export const getUser = async (email: string) => {
  const token = TokenService.getToken();
  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }

  try {
    const url = `${CONSTANTS.BASE_URL}${CONSTANTS.USER_INFO}/${email}`;
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

export const getProfilePicture = async (pictureName: string) => {
  const token = TokenService.getToken();
  if (!token) {
    console.error("No se encontró un token de autenticación");
    return null;
  }

  try {
    const url = `${CONSTANTS.BASE_URL}${CONSTANTS.PROFILE_PICTURE}/${pictureName}`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const requestOptions = {
      method: "GET",
      headers: headers,
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error("GET request failed");
    }

    const blobData = await response.blob(); // Receive the image as a Blob

    if (blobData instanceof Blob) {
      const imageUrl = URL.createObjectURL(blobData); // Convert Blob to a URL
      return imageUrl;
    } else {
      console.error("Invalid response format");
      return null;
    }
  } catch (error) {
    console.error("GET request error:", error);
    throw error;
  }
};
