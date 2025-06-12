import { ApiCall } from "@/config/apiCall";
import { Grade } from "../entity/gradeEntity";

const getAllGrades = async () => {
    try{
        // Extract the token from cookies
        const token = document.cookie.match(/token=([^;]+)/)?.[1];
        const response = await ApiCall.getRequest("/grade", token);

        const grades = response.data;

        const data = grades.map(
            (grade: any): Grade => ({
                id: grade.id,
                courseRegistrationId: grade.courseRegistrationId,
                assignmentScore: grade.assignmentScore,
                midtermScore: grade.midtermScore,
                finalScore: grade.finalScore,
                finalGrade: grade.finalGrade,
                createdBy: grade.createdBy.name,
                updatedBy: grade.updatedBy.name,
                createdAt: grade.createdAt,
                updatedAt: grade.updatedAt,
            })
        )
        return data;
    } catch (error){
        throw error;
    }
};
export {getAllGrades}