import React, { useState, useEffect, useContext } from 'react'

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

    const [waiting, setWaiting] = useState(true)
    const [questions, setQuestions] = useState([])
    const [correct, setCorrect] = useState(0)
    const [index, setIndex] = useState(0) 
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [quiz, setQuiz] = useState({
        amount: 10,
        category: '',
        difficulty: '',
        type: '',
    })
    const [error, setError] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    const numLimit = (value) => {
        if(value  > 50){
            return 50;
        }else if(value  < 10){
            return 10;
        }else{

            return value;
        }
    }


    const fetchQuestions = async (url) => {
        setLoading(true)
        try {
            const response = await fetch(url)
            const res = await response.json()
            if (res) {
                const { results } = res
                console.log(results);
                if (results.length > 0) {
                    setQuestions(results)
                    setLoading(false)
                    setWaiting(false)
                    setError(false)
                } else {
                    setLoading(false)
                    setError(true)
                    setWaiting(true) 
                }
            } else {
                setWaiting(true)
            }
            
            
        } catch (error) {
            console.log(error);
            setLoading(false)
            setWaiting(true)
            setError(true)
        }
    }
    
    

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setQuiz({ ...quiz, [name]: value })
        
        console.log(quiz)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const {amount, category, difficulty, type} = quiz
        const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${category}&type=${type}`

        fetchQuestions(url)
    }
    //for the setuo form, to get the categoriies

    const fetchCategories = async () => {
        setLoading(true)
        try {
            const res = await fetch('https://opentdb.com/api_category.php')
            const data = await res.json()

            const {trivia_categories} = data;
            if(trivia_categories){
                setCategories(trivia_categories) 
                setLoading(false) 
            }else{
                setError(true)
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
            setError(true)
        }
    }
    useEffect(() => {
        fetchCategories()
    }, [])

    const nextQuestion = () => {
        setIndex((oldIndex) => {
            const index = oldIndex + 1
            if (index > questions.length - 1) {
                openModal()
                return 0
            } else {
                return index
            }
        })
    }

    const checkAnswer = (value) => {
        if (value) {
            setCorrect((oldState) => oldState + 1)
        }
        nextQuestion()
    }

    const openModal = () => {
        setIsModalOpen(true)
       
    }
    const closeModal = () => {
        setWaiting(true)
        setCorrect(0)
        setIsModalOpen(false)
    }

    

    return (
        <AppContext.Provider value={{
            quiz,
            error,
            waiting,
            loading,
            questions,
            index,
            categories,
            correct,
            isModalOpen,
            setIsModalOpen,
            setLoading,
            setWaiting,
            setError,
            setQuiz,
            handleSubmit,
            handleChange,
            checkAnswer,
            nextQuestion,
            closeModal,
            numLimit,
        }}>
            {children}
        </AppContext.Provider>
    )

    

    
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider}