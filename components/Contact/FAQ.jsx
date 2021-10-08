import React from 'react'
import Card from '../UI/Card'
import styles from './FAQ.module.scss'


const FAQ = props =>{


    return (
        <>
        <h2 className={styles['title']}>Frequently Asked Questions</h2>
        <div className={styles['faq-card-container']}>
        <Card className={styles['faq-card']}>
            <h3>How long is processing?</h3>
            <p>We hand make each and every bandana so we require 5-10 days to ensure a high-quality product.</p>
        </Card>
        <Card className={styles['faq-card']}>
            <h3>How long is shipping?</h3>
            <p>Depending on where you live shipping takes from 5-15 days.</p>
        </Card>
        <Card className={styles['faq-card']}>
            <h3>Do you have a sizing chart?</h3>
            <p><strong>Small:</strong> 22"W x 13"H</p>
            <p><strong>Medium:</strong> 27"W x 17"H</p>
            <p><strong>Large:</strong> 30"W x 19"H</p>
        </Card>
        </div>
        </>
    )
}


export default FAQ;