import { jwtDecode } from 'jwt-decode';
import PageContainer from "../../components/page container/PageContainer";
import EmptyIcon from '../../icons/EmptyIcon';
import './home.scss'
import CustomButton from '../../components/custom button/CustomButton';
import { useAppContext } from '../../provider/AppContext';
import  Checkbox  from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import CheckIcon from '../../icons/CheckIcon';
import { pink, purple } from '@material-ui/core/colors';
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';
import axios from 'axios';
const Home = () => {

    const {user , allTasks} = useAppContext();
    const [startIndex, setstartIndex] = useState(0);
    const eachPage = 3;
    const handleAdd =()=>{
        console.log("add"); 
    }
    const handleChange =(e , page) =>{
        setstartIndex((page-1)*eachPage );
    }

    const handleCheckboxChange = async (taskId, userId , title, prority, status) => {
        try {
            await axios.put(`http://localhost:3000/tasks/${taskId}`, {title,prority,status,taskId,userId });
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };
    

    
    return (  
        <PageContainer title={user.username+"'s Tasks" } page={"home"} >

            <div className="home-container">
                {(allTasks?.length==0) && 
                    <div className='empty'>
                        <EmptyIcon/>
                        <span>Start with create a task</span>
                    </div>
                }
                {(allTasks?.length >0) &&
                    <div className="tasks-container">
                        {allTasks?.map((task , index) => (
                            <>
                            
                            
                            {index>=startIndex && index<startIndex+eachPage &&
                            <div className="task-box">
                                <div className='task-info'>
                                    <div className='task-icon'>A</div>
                                    <div className='task-title' key={task.id}>{task.title}</div>
                                </div>
                                <Checkbox sx={{color:'#D0BCFF', '&.Mui-checked': {
                                    color: '#D0BCFF',
                                    },
                                    
                            }}
                            onChange={(e) => handleCheckboxChange(task.id,task.userId,task.title,task.priority, e.target.checked)}
                            checked={task.status}
                            />
                            </div>
                            
                            }
                            
                            {(index===startIndex || index == startIndex+1) && <div className="space-line"></div>}

                            </>
                        ))}
                        
                    </div>
                }


                <div className='pagination-box'>
                    <Pagination count={(allTasks?.length)/3}  siblingCount={0} onChange={handleChange}  sx={{
                            '& .Mui-selected': {
                                backgroundColor: '#D0BCFF !important', 
                                color: '#2B2930 !important' , 
                            },
                        }}/>
                </div>

                <div className='button-box'>
                    <CustomButton button_title={"+  Task"} onClick={handleAdd}/>
                </div>

            </div>


        </PageContainer>
    );
}
 
export default Home;