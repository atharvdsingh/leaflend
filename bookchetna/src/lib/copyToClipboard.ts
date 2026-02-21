import { toast } from "sonner"

interface props {
    text:string,
    message:string
}

export default  function copyToclipboad(props:props){
    const {text,message} = props
     navigator.clipboard.writeText(text)
       return toast.success(message || "copied")
}