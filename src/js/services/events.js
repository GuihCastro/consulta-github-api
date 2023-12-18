import { baseUrl, eventsQuantity } from "../variables.js";

export async function getEvents(userName) {
    const response = await fetch(`${baseUrl}/${userName}/events?per_page=${eventsQuantity}`);
    return await response.json()
};