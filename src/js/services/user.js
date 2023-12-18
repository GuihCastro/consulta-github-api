import { baseUrl } from "../variables.js";

export async function getUser(userName) {
    const response = await fetch(`${baseUrl}/${userName}`);
    return await response.json()
};