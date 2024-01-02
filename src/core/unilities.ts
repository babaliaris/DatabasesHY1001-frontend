export function getRandomID(): number
{
    const uuid:string = crypto.randomUUID();

    let id: number = 0;

    for (var i = 0; i < uuid.length; i++)
    {
        id += uuid.charCodeAt(i);
        id += Math.random() * 10000;
    }

    return Math.floor(id);
}