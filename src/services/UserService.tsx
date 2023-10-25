import CONSTANTS from "../constants";
import { LoginUser, User } from "../types";

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
    } catch (err) {
        console.error('POST request errror',err);
        throw err;
    }
}

export const loginUser = async (loginData: LoginUser) => {
    console.log('log', loginData);
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
          console.log(data);
          return data;
      } catch (error) {
        console.error('Error en la solicitud POST:', error);
        throw error;
      }
  };