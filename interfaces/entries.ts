export interface Entries {
    _id: string,
    createdAt: number,
    status: EntryStatus,
    description: string,
}

export type EntryStatus = 'pending' | 'in-progress' | 'finished';