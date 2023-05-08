export async function getClients(){
    const answer = await fetch(import.meta.env.VITE_API_URL);
    const result = await answer.json();
    return result;
}

export async function addClient(data){
    try{
        const answer = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        await answer.json();
    } catch (e){
        console.log(e);
    }
}