import User from "../../models/user/User";

export const registerUser = async (user: User) => {
    try {
        const repoonse = await fetch(`http://localhost:8080/user/create`, {
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