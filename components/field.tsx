import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface InputProps 
    extends React.InputHTMLAttributes<HTMLInputElement>{
        label?: string
    }
export function InputField(props: InputProps){
    const { label, ...prop } = props;
    return(
        <div className="grid gap-3 w-full">
            <Label>{label}</Label>
            <Input {...prop}/>
        </div>
    );
}

interface TextareaProps 
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{
        label?: string
    }
export function TextareaField(props: TextareaProps){
    const { label, ...prop } = props;
    return(
        <div className="grid gap-3">
            <Label>{label}</Label>
            <Textarea {...prop}/>
        </div>
    );
}