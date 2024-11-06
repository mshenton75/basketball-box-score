import axios from 'axios';
import { Game, PlayerStats, Team, GameStatus } from "./BoxScore"

const BASE_URL = 'http://localhost:8000';

type GameRaw = { 
    homeTeam: Team 
    awayTeam: Team
    id: string,
    status: number
}

export async function getGames(): Promise<Game[]> {
    try {
        const response = await axios.get(`${BASE_URL}/api/games`)
        return response.data.map((rawGame: GameRaw) => parseGame(rawGame));
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error;
    }
}

function parseGame(game: GameRaw): Game {
    const parseStatus = function(status: number): GameStatus { 
        switch (status) {
            case 1:
                return "scheduled";
            case 2: 
                return "in-progress";
            case 3: 
                return "final";
            case 4: 
                return "postponed";
            default:
                throw `Unsupported game status: ${status}`
        }
    }
    return { ...game, status: parseStatus(game.status) }
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