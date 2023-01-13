import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export const wrapPageElement = ({ element }) => (
  <AnimatePresence mode="wait">
    <motion.main
      key={element.props.location.pathname}
      initial={{ opacity: 0, y: 2.5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -2.5 }}
      transition={{
        type: 'spring',
        damping: 8,
        mass: 0.6,
        stiffness: 70,
      }}
    >
      {element}
    </motion.main>
  </AnimatePresence>
)
