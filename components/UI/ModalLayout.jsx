import React from 'react'
import styles from './ModalLayout.module.scss'
import Card from './Card'
const ModalLayout = props =>{
    return (
        <div className={styles.overlay}>
            <Card className={styles.modalCard}>
                {props.children}
            </Card>
        </div>
    )
}
export default ModalLayout;