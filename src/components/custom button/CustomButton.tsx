import { Button } from "@mui/material";
import './customButton.scss'

interface CustomButtonProps {
    button_title: string;
    onClick: () => void;
  }
const CustomButton = ({ button_title, onClick }: CustomButtonProps) => {
    return (  
        <Button  onClick={onClick} className="custom-button">
            <span className="button-title">
                {button_title}
            </span>
        </Button>
    );
}
 
export default CustomButton;