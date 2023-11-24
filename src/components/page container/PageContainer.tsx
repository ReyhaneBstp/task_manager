import { styled } from "@mui/material/styles";
import './pageContainer.scss'
import BackIcon from "../../icons/BackIcon";
import NextIcon from "../../icons/NextIcon";
import DeleteIcon from "../../icons/DeleteIcon";

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
  

const PageContainer = ({children , title , page}) => {
    return ( 
        <GrayBox>
          <div className="title-container">
            
            <div className="backicon">
            {page==="home" &&  <BackIcon />}
            {page ==="edit" && <DeleteIcon/>}
            
            </div>
            <h1 className="page-title">{title}</h1>

            <div className="nexticon">
              {(page=== "create" || page ==="edit") && <NextIcon/>}
            </div>
            
          </div>
            {children}
        </GrayBox>
     );
}
 
export default PageContainer;