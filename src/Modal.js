import { Button, Typography } from '@mui/material'
import React from 'react'
import {useGlobalContext} from './context'

function Modal() {
  const {
    isModalOpen, closeModal, correct, questions
  } = useGlobalContext()
  return (
    <div
      className={`${isModalOpen ? 'modal-container isOpen' : 'modal-container'
        }`}
    >
      <div className='modal-content'>
        <Typography variant='h3'>
          Quiz Over!
        </Typography>
        <Typography variant='h4'>
          You answered {((correct / questions.length) * 100).toFixed(0)}% of
          questions correctly
        </Typography>
        <Typography variant='h4'>
          scores: {correct} / {questions.length}
        </Typography>
        <Button variant='contained' onClick={closeModal} >Play Again</Button>
      </div>
    </div>
  )
}

export default Modal