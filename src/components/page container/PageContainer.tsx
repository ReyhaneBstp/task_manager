import { styled } from "@mui/material/styles";
import './pageContainer.scss'

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
  

const PageContainer = ({children , title}) => {
    return ( 
        <GrayBox>
          <div className="title-container">
            <h1 className="page-title">{title}</h1>
          </div>
            {children}
        </GrayBox>
     );
}
 
export default PageContainer;