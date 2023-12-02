import PageContainer from "../../components/page container/PageContainer";
import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import CustomButton from '../../components/custom button/CustomButton';
import './craete.scss'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from '../../provider/AppContext';
import { validateTaskTitle , validateTaskPriority } from "../../utilities/validateInputs";


interface User {
    username: string;
    password : string;
    email: string;
    phone: string;
    id:string;
}
const Create = () => {
    const {user } = useAppContext() as { user: User };
    const [title, setTaskName] = useState <string>('');
    const [priority, setPriority] = useState <string>('');
    const [titleError, setTitleError]  = useState <boolean>(false);
    const [titleErrorMsg, setTitleErrorMsg] = useState <string>('');
    const [priorityError, setPriorityError] = useState <boolean>(false);
    const [priorityErrorMsg, setPriorityErrorMsg] = useState <string>('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.target.value);   
    };
    const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPriority(e.target.value); 
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

    const handleCreate : () => void = async () => {

        const data = {
            title: title,
            priority: priority,
            status: false,
            id: uuidv4(),
            userId: user?.id
        };

        if (!validateInput()) {
            return;
        }
        try {
            await axios.post(`http://localhost:3000/tasks`, data);
            console.log('created');
            
        } catch (error) {
            console.error('Error updating task status:', error);
        } 
    }
    return (  
        <PageContainer title={'create Tasks'} page={'create'}>
            <div className="create-container">
                <form className='create-form'>
                    <div className='inputs-container'>
                        <TextField
                        className='inputs'
                        label="name"
                        placeholder='name'
                        variant="filled"
                        error={titleError}
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
                    <CustomButton button_title={"create"} onClick={handleCreate}></CustomButton>
                </div>
            </div>
        </PageContainer>
        
    );
}
 
export default Create;