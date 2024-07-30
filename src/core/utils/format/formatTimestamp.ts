
// "2024-07-29T14:18:15.982Z" => '7/29/2024, 2:18:15 PM'
export function formatTime(time: string): string {
    return new Date(time).toLocaleString();
}