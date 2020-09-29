export interface FlatGift {
    g_id: string;
    title: string;
    description: string;
    path: string;
    smallPath: string;
    votes: string;
    movie?: boolean;
    published?: string;
}

export interface UiFlatGift extends FlatGift {
    selected?: boolean;
}

export interface GroupedGifts {
    g_id: string;
    gifts: FlatGift[];
}
