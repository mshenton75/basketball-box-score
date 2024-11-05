import axios from 'axios';
import { Game } from "./GameList"

const BASE_URL = 'http://localhost:8000';

export async function getGames(): Promise<Game[]> {
    try {
        const response = await axios.get(`${BASE_URL}/api/games`)
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error;
    }
}