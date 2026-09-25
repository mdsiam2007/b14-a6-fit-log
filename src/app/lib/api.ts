import { Workout } from "@/app/types/all_types";

const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";


export async function getAllWorkouts(): Promise<Workout[]> {
    try {
        const res = await fetch(BASE_URL, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch workouts: ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error in getAllWorkouts:", error);
        return [];
    }
}


export async function getWorkoutById(id: string | number): Promise<Workout | null> {
    try {
        const res = await fetch(`${BASE_URL}/${id}`, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            return null;
        }

        return await res.json();
    } catch (error) {
        console.error(`Error in getWorkoutById(${id}):`, error);
        return null;
    }
}
