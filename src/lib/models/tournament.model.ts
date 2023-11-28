export interface Tournament {
	tournamentName: string;
	sport: string;
	type: string;
	startDate: string;
	endDate: string;
	lastRegisterDate: string;
	categories: string;
	address: string;
	noOfCourts: number;
}

export interface TournamentPlayers {
	category: Category;
	players: Player[];
}

export interface Category {
	category_id: string;
	category_name: string;
	tournament_id: string;
	type: string;
}

export interface Player {
	id: string;
	first_name: string;
	last_name: string;
	seed: number;
} 