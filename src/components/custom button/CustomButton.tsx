import { Button } from "@mui/material";
import './customButton.scss'
const CustomButton = ({ button_title, onClick }) => {
    return (  
        <Button  onClick={onClick} className="custom-button">
            <span className="button-title">
                {button_title}
            </span>
        </Button>
    );
}
 
export default CustomButton;