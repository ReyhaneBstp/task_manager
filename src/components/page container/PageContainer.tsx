import { styled } from "@mui/material/styles";
import './pageContainer.scss'
import BackIcon from "../../icons/BackIcon";
import NextIcon from "../../icons/NextIcon";
import DeleteIcon from "../../icons/DeleteIcon";
import { logout } from "../../auth/AuthService";
import { useHistory } from "react-router-dom";

  const GrayBox= styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "543px",
    position:"relative",
    width:"312px",
    display: "flex",
    alignItems: "center",
    background:"var(--m-3-sys-dark-surface-container-high, #2B2930)",
    justifyContent: "center",
    borderRadius:"25px",
  }));

 
  interface PageContainerProps {
    children: React.ReactNode;
    title: string;
    page: string;
  }
  

  const PageContainer: React.FC<PageContainerProps> = ({children , title , page}) => {

   const history = useHistory();
   const handleLogout: () => void = () => {
    logout();
    localStorage.removeItem('isAuthenticated');
    history.push('/login');
  }

  const handlebackToHome : () => void = () => {
    history.push('/todos');
  }

    return ( 
        <GrayBox>
          <div className="title-container">
           

            {page ==="home" &&
            <div className="backicon" onClick={handleLogout}>
            <BackIcon /> 
            </div> }

            {page ==="edit" &&
            <div className="backicon">
            <DeleteIcon/> 
            </div> }
            
            <h1 className="page-title">{title}</h1>


            { (page ==="create"  || page ==="edit") &&
              <div className="nexticon" onClick={handlebackToHome}>
               <NextIcon/>
             </div>
            }

            
          </div>
            {children}
        </GrayBox>
     );
}
 
export default PageContainer;