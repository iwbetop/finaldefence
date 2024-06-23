import {
    RadioGroupItem
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RadioControlProps extends React.ComponentPropsWithoutRef<typeof RadioGroupItem>{
    label: string
}

export function RadioControl(props: RadioControlProps){
    const { label } = props;
    return(
        <div className="flex items-center space-x-2">
            <RadioGroupItem {...props}/>
            <Label htmlFor={label}>{label}</Label>
        </div>
    );
}