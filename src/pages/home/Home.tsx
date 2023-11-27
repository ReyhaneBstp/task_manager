import PageContainer from "../../components/page container/PageContainer";
import EmptyIcon from '../../icons/EmptyIcon';
import './home.scss'
import CustomButton from '../../components/custom button/CustomButton';
import { useAppContext } from '../../provider/AppContext';
import  Checkbox  from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {

    const {user , allTasks , setAllTasks } = useAppContext();
    const [startIndex, setstartIndex] = useState(0);
    const eachPage = 3;
    const handleAdd =()=>{
        console.log("add"); 
    }
    const handleChange =(e , page) =>{
        setstartIndex((page-1)*eachPage );
    }

    const handleCheckboxChange = async (title, priority, status , id, userId) => {
        try {
            console.log(id);
            await axios.put(`http://localhost:3000/tasks/${id}`, {title,priority,status,id,userId });
            const response = await axios.get(`http://localhost:3000/tasks?userId=${userId}`);
            setAllTasks(response.data);
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    useEffect(() => {
        const fetchTasks = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/tasks?userId=${user.id}`);
            setAllTasks(response.data);
            
          } catch (error) {
            console.error('Error fetching tasks:', error);
          }
        };
        fetchTasks();
      }, []);
    
    
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
                <>
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
                            onChange={(e) => handleCheckboxChange(task.title,task.priority,e.target.checked,task.id, task.userId)}
                            checked={task.status}
                            />
                            </div>
                            
                            }
                            
                            {(index===startIndex || index == startIndex+1) && <div className="space-line"></div>}

                            </>
                        ))}
                        
                    </div>

                    <div className='pagination-box'>
                    <Pagination count={Math.ceil((allTasks?.length)/3)}  siblingCount={0} onChange={handleChange}  sx={{
                            '& .Mui-selected': {
                                backgroundColor: '#D0BCFF !important', 
                                color: '#2B2930 !important' , 
                            },
                        }}/>
                    </div>

                </>
                }




                <div className='button-box'>
                    <CustomButton button_title={"+  Task"} onClick={handleAdd}/>
                </div>

            </div>


        </PageContainer>
    );
}
 
export default Home;