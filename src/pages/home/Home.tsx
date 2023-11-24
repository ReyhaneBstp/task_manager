import { jwtDecode } from 'jwt-decode';
import PageContainer from "../../components/page container/PageContainer";
import EmptyIcon from '../../icons/EmptyIcon';
import './home.scss'
import CustomButton from '../../components/custom button/CustomButton';
import BackIcon from '../../icons/BackIcon';
const Home = () => {

    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const handleAdd =()=>{
        console.log("add"); 
    }

    
    return (  
        <PageContainer title={decodedToken.username+"'s Tasks" } page={"home"} >
            <div className="home-container">
                <div className='empty'>
                    <EmptyIcon/>
                    <span>Start with create a task</span>
                </div>

                <div className='button-box'>
                    <CustomButton button_title={"+ Task"} onClick={handleAdd}/>
                </div>

            </div>


        </PageContainer>
    );
}
 
export default Home;