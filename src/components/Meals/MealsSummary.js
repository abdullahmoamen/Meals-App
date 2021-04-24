import classes from './MealsSummary.module.css';
import { motion } from 'framer-motion';

const summaryVariants = {
  hidden: { 
    opacity: 0, 
    x: '100vw' 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: 'spring', delay: 0.5 }
  },
  exit: {
    x: "-100vh",
    transition: { ease: 'easeInOut' }
  }
};

const MealsSummary = () => {
return (
    <motion.section className={classes.summary}
      variants={summaryVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
    <h2>Delicious Food, Delivered To You</h2>
    <p>
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </p>
      <p>
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p>
    </motion.section>
  );
};

export default MealsSummary;