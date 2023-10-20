export const LoginService = async (userCredentials: { email: string, password: string }): Promise<{ success: boolean, message: string, token?: string }> => {
  try {
    const response = await fetch(`http://localhost:8080/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    });

    if (!response.ok) {
      throw new Error("POST request failed");
    }

    const data = await response.json();

    if (data.success) {
      return {
        success: true,
        message: "Inicio de sesión exitoso",
        token: data.token, 
      };
    } else {
      return {
        success: false,
        message: "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
      };
    }
  } catch (err) {
    console.error("POST request error", err);
    throw err;
  }
};
