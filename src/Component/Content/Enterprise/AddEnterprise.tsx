import {useState} from "react";
import {useDispatch} from "react-redux";

export const AddEnterprise = () => {

    const [nameEnterprise, setNameEnterprise] = useState('')
    const [priceEnterprise, setPriceEnterprise] = useState(0)
    const [dateOfCreationEnterprise, setDateOfCreationEnterprise] = useState('')

    const dispatch = useDispatch()

    const sendNewEnterprise = () => {

        /*dispatch(sendNewEnterprise())*/

        setNameEnterprise('')
        setPriceEnterprise(0)
        setDateOfCreationEnterprise('')
    }

    return <div>
        <input value={nameEnterprise}/>
        <input value={priceEnterprise}/>
        <input value={dateOfCreationEnterprise}/>

        <button onClick={sendNewEnterprise}>Submit</button>
    </div>

}