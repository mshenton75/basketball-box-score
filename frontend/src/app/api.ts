import axios from 'axios';
import { Game, PlayerStats } from "./BoxScore"

const BASE_URL = 'http://localhost:8000';

export async function getGames(): Promise<Game[]> {
    try {
        const response = await axios.get(`${BASE_URL}/api/games`)
        return response.data;
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error;
    }
}

export async function getGame(id: string): Promise<{ homeTeam: PlayerStats[], awayTeam: PlayerStats[] }> {
    try {
        const response = await axios.get(`${BASE_URL}/api/game/${id}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error;
    }
}