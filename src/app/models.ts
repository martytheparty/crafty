export interface FlatGift {
    g_id: string;
    title: string;
    description: string;
    path: string;
    votes: string;
    movie?: boolean;
}

export interface UiFlatGift extends FlatGift {
    selected?: boolean;
}

export interface GroupedGifts {
    g_id: string;
    gifts: FlatGift[];
}
