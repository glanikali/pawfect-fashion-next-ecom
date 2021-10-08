import React from 'react'
import styles from './DropDownItem.module.scss'
import { useDispatch } from 'react-redux'
import { checkoutSliceActions } from '../../store/checkout'


const DropDownItem = props =>{
    const dispatch = useDispatch()
    
    const handleClick = () =>{
        if (props.for === "province"){
            console.log("dispatching province")
        dispatch(checkoutSliceActions.setValidProvince(props.name))}
        
        else if (props.for === "city"){
            console.log("dispatching" + props.name);
            
            dispatch(checkoutSliceActions.setValidCity(props.name))
        }
    }
    return (
        <li onClick={handleClick} className={styles.list}>{props.name}</li>
    )
}

export default DropDownItem