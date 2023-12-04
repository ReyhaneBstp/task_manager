import PageContainer from "../../components/page container/PageContainer";
import { useAppContext } from "../../provider/AppContext";
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { validateTaskTitle , validateTaskPriority } from "../../utilities/validateInputs";
import axios from "axios";
import { TextField, Button } from '@mui/material';
import CustomButton from "../../components/custom button/CustomButton";
import './edit.scss'

interface Task {
    title: string;
    priority:string;
    status:boolean;
    id:string;
    userId:string;
  }

const Edit = () => {

    const [title, setTaskName] = useState <string>('');
    const [priority, setPriority] = useState <string>('');
    const [taskId, setTaskId] = useState <string>('');
    const [status, setStatus] = useState <boolean>(false);
    const [userId, setUserId] = useState <string>('');
    const [titleError, setTitleError]  = useState <boolean>(false);
    const [titleErrorMsg, setTitleErrorMsg] = useState <string>('');
    const [priorityError, setPriorityError] = useState <boolean>(false);
    const [priorityErrorMsg, setPriorityErrorMsg] = useState <string>('');
    const history = useHistory();
    const {currentTask} = useAppContext() as {currentTask:Task};
    
    useEffect(() => {
        setTaskId(currentTask?.id);
        setTaskName(currentTask?.title);
        setTaskId(currentTask?.id);
        setUserId(currentTask?.userId);
        setPriority(currentTask?.priority);
        setStatus(currentTask?.status);
       }, []);
       
 
    

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.target.value);   
    };
    const handlePriorityChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setPriority(e.target.value as string);
    };

    const validateInput = () => {

        const titleValidation = validateTaskTitle(title);
        const priorityValidation = validateTaskPriority(priority);
    
        setTitleError(!titleValidation.isValid);
        setTitleErrorMsg(titleValidation.errorMessage);
        setPriorityError(!priorityValidation.isValid);
        setPriorityErrorMsg(priorityValidation.errorMessage);
    
        return (
          titleValidation.isValid && priorityValidation.isValid
        );
    };

    const handleEdit : () => void = async () => {
        console.log(taskId);
        

        if (!validateInput()) {
            return;
        }
        try {
            await axios.put(`http://localhost:3000/tasks/${taskId}`, {title,priority,status,taskId,userId });
            history.push('/todos');
            console.log("edited");
            
            
        } catch (error) {
            console.error('Error updating task status:', error);
        } 
    }
    

    return (  
        <PageContainer title="edit task" page="edit">
             <div className="create-container">
                <form className='create-form'>
                    <div className='inputs-container'>
                        <TextField
                        className='inputs'
                        label="name"
                        placeholder='name'
                        variant="filled"
                        error={titleError}
                        value={title}
                        helperText={titleErrorMsg}
                        onChange={handleNameChange}
                        InputLabelProps={{
                            style: { color: 'var(--m-3-sys-dark-primary, #D0BCFF)'},
                            shrink: true,
                        }} 
                        />   
                    </div>

                    <div className='inputs-container'>
                    <TextField
                        className='inputs'
                        label="priority"
                        placeholder='priority'
                        variant="filled"
                        value={priority}
                        error={priorityError}
                        helperText={priorityErrorMsg}
                        onChange={handlePriorityChange}
                        InputLabelProps={{
                            style: { color: 'var(--m-3-sys-dark-primary, #D0BCFF)'},
                            shrink: true,
                        }} 
                        /> 
                    </div>

                    
                </form>
                
                <div className='button-box'>
                    <CustomButton button_title={"edit"}  onClick={handleEdit}></CustomButton>
                </div>
                </div>
                
        </PageContainer>
    );
}
 
export default Edit;