import React, {useEffect, useState} from 'react'
import { Box, Typography, Button } from '@mui/material';
import { useGlobalContext } from './context';
import SetupForm from './SetupForm'
import Loading from './Loading'
import Error from './Error'
import { decode } from 'html-entities'


const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
}

const Home = () => {
    const {
        waiting, 
        loading,
        questions,
        index,
        correct,
        checkAnswer,
        error,
    } = useGlobalContext()


    const [options, setOptions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState('')
    const [correctAnswer, setCorrectAnswer] = useState('')
    

        

        useEffect(()=>{
            if(questions.length){
                const { question, incorrect_answers, correct_answer } = questions[index]
                setCorrectAnswer(correct_answer)
                setCurrentQuestion(question)
    
                let answers = [...incorrect_answers]
                answers.splice(
                    getRandomInt(incorrect_answers.length),
                    0,
                    correct_answer
                )
                setOptions(answers)
            }
        }, [index, questions])


        const opElements = options.map((option, index)=>{
            return <Box mt={5} key={index}>
                <Button variant="contained" onClick={() => {checkAnswer(correctAnswer === option)}}>
                    {decode(option)}
                </Button>
                </Box>
        })





    if (waiting) {
        return <SetupForm />
    }

    if (loading) {
        return <Loading />
    }
    if(error){
        return <Error />
    }
  return (
    <>
      <Box>
          <Typography variant='h4'>Question {index + 1}</Typography>
          <Typography variant='h4' mt={4}>{decode(currentQuestion)}</Typography>
            {opElements}
          <Box mt={5}>
              Score: {correct} / {index}
          </Box>

      </Box>
    </>
  )

    
}

export default Home