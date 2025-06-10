import { ApiCall } from "@/config/apiCall";
import { Lecture } from "../entity/lecture";

const getAllLectures = async () => {
    try {
        // Extract the token from cookies
        const token = document.cookie.match(/token=([^;]+)/)?.[1];

        if (!token) {
            throw new Error("Unauthorized access. Please login first.");
        }

        const response = await ApiCall.getRequest("/lecturers", token);
        console.log("Fetched all lecture:", response);

        const lecturers = response.data;

        const data = lecturers.map(
            (lecture: any): Lecture => ({
                nidn: lecture.nidn,
                userId: lecture.user_id,
                userName: lecture.user.name,
                faculty: lecture.faculty.name,
            })
        );

        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unknown error occurred.");
        }
    }
};

export { getAllLectures };
