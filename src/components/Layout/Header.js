import React from 'react';
import coverImg from '../../assests/cover.jpg';
import HeadeCartBtn from '../Layout/HeaderCartButton'
import classes from './Headers.module.css'
import { motion } from 'framer-motion';

const headerVariants = {
    hidden: { 
        opacity: 0, 
        y: '50vh' 
    },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: 'spring', delay: 0.5 }
    },
    exit: {
        y: "-50vw",
        transition: { ease: 'easeInOut' }
    }
    };

const Headers = (props) => {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <motion.h1
                variants={headerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                >Delicious Meals</motion.h1>
                <HeadeCartBtn onClick={props.showCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={coverImg} alt=""/>
            </div>
        </React.Fragment>
    );
}

export default Headers;
