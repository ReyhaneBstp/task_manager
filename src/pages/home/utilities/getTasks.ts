import axios from "axios";
export  async function getTasks(userId) {
    try {
        const response = await axios.get(`http://localhost:3000/tasks?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error updating task status:', error);
    }

}