export async function getConfig() {
    const response = await fetch('/config.json');
    if (!response.ok) {
        throw new Error('Failed to fetch configuration');
    }
    return await response.json();
}
