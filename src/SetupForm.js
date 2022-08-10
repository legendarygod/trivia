import { Box, Button, FormControl, MenuItem, InputLabel, Select, TextField, CircularProgress } from '@mui/material'
import React from 'react'
import { useGlobalContext } from './context'
import Error from './Error'
import Loading from './Loading'
import SelectField from './SelectField'


const SetupForm = () => {
    const {quiz, error, loading, handleSubmit, categories, handleChange, numLimit} = useGlobalContext()

    const difficultyOptions = [
        { id: "easy", name: "Easy" },
        { id: "medium", name: "Medium" },
        { id: "hard", name: "Hard" },
    ]

    const typeOptions = [
        { id: "multiple", name: "Multiple Choice" },
        { id: "boolean", name: "True/False" }
    ]

  const catElements = categories.map((option) => {
    const { id, name } = option
    return <MenuItem value={id} key={id}>{name}</MenuItem>
  })
  const typeElements = typeOptions.map((option) => {
    const { id, name } = option
    return <MenuItem value={id} key={id}>{name}</MenuItem>
  })
  const diffElements = difficultyOptions.map((option) => {
    const { id, name } = option
    return <MenuItem value={id} key={id}>{name}</MenuItem>
  })

  if(loading){
    return <Loading />
  }

  return (
    <form onSubmit={handleSubmit}>
      
      <Box mt={3} width='100%'>
        <FormControl size='small' fullWidth>
          <InputLabel>Category</InputLabel>
          <Select name='category' value={quiz.category} onChange={handleChange}>
            {catElements}
          </Select>
        </FormControl>
      </Box>
      <Box mt={3} width='100%'>
        <FormControl size='small' fullWidth>
          <InputLabel>Difficulty</InputLabel>
          <Select name='difficulty' value={quiz.difficulty} onChange={handleChange}>
            {diffElements}
          </Select>
        </FormControl>
      </Box>
      <Box mt={3} width='100%'>
        <FormControl size='small' fullWidth>
          <InputLabel>Type</InputLabel>
          <Select name='type' value={quiz.type} onChange={handleChange}>
            {typeElements}
          </Select>
        </FormControl>
      </Box>
      <Box mt={3} width='100%'>
        <FormControl fullWidth size='small'>
          <TextField
            onChange={handleChange}
            variant='outlined'
            label='Amount of Questions'
            type='number'
            size='small'
            value={numLimit(quiz.amount)}
            name='amount'
          />
          
        </FormControl>
      </Box>
      <Box mt={3} width='100%'>
        <Button fullWidth variant='contained' type='submit'>
          Generate Questions
        </Button>
      </Box>

    </form>
    
  )
}

export default SetupForm