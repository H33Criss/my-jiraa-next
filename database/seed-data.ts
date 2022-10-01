
interface ISeed{
    entries: SeedEntry[]
}

interface SeedEntry {
    description: String,
    status: String,
    createdAt: Number,
}

export const seedData: ISeed = {
    entries:[
        {
            description: '2Consequat nostrud consequat deserunt nulla enim.',
            status: 'pending',
            createdAt: Date.now() - 1000000,
        },
        {
            description: '1Consequat nostrud consequat deserunt nulla enim.',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
        {
            description: '3Consequat nostrud consequat deserunt nulla enim.',
            status: 'in-progress',
            createdAt: Date.now(),
        },
        
    ],
};