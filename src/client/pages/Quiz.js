import React, {useState, useEffect, useCallback} from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader, CardTitle, Button, Form } from 'reactstrap';
import axios from 'axios';

import TextAnswer from '../components/TextAnswer';
import MultipleAnswer from '../components/MultipleAnswer';
import Summary from "../components/Summary";
import Spin from "../components/Spin/Spin";
import {escapeHtml, getRandom, shuffleArray, API} from '../utils'

export default function Quiz(){
    const [questions, setQuestions] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [done, setDone] = useState([]);
    const [loading, setLoading] = useState(true);
    const [finished, setFinished] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [nonAnswered, setNonAnswered] = useState(0);

    let currentAnswer = "";
    
    //Init quiz fetching data from API and putting in a state variable. 
    useEffect( () => {
      axios.get(API).then( source => {
        setQuestions(source.data.results);
      })  
    }, []);

    //This will handle a question and it's answers to present to user
    const generateQuestion = useCallback(() => {
      setLoading(true);
      const size = questions.length
      let rand = getRandom(size);
      while(done.includes(rand)){
        rand = getRandom(size);
      }
      const question = questions[rand];
      setCurrentQuestion(question);
      done.push(rand);
      setLoading(false) 
    }, [done, questions]);

    //Soon questions is fetched and stored in state, we call this to generate the question
    useEffect( () => {
      if(questions){
        generateQuestion() 
      }
    }, [generateQuestion, questions]);

    //This will handle the data, store the value in a global variable inside func Comp.
    const handleChange = (e) => {
      currentAnswer = e.target.value;
    }

    //When user clicks next, we process the answer and move to the next question or finish the quiz if all questions are done
    const processQuestion = () => {
      if(escapeHtml(currentQuestion.correct_answer) === currentAnswer.trim()) {
        setCorrectAnswers(correctAnswers + 1);
      } else if (escapeHtml(currentQuestion.correct_answer) !== currentAnswer.trim()){
        currentAnswer === "" ? setNonAnswered(nonAnswered + 1) : setWrongAnswers(wrongAnswers + 1);
      }
      currentAnswer = "";
      return done.length === questions.length ? finishQuiz() : generateQuestion()
    }
    
    //Quiz reached the end. Calc the percentage of correct answers for the the number of questions
    const finishQuiz = () => { 
      setPercentage( ( (correctAnswers * 100) / questions.length  ).toFixed(2) );
      setFinished(true);
    }

    //Here we gonna render the question based on it's type: bool, multiple or text
    const renderQuestion = () => {
      let comp;
      switch (currentQuestion.type) {
        case "multiple":
          const answers = [currentQuestion.correct_answer];
          for(let incorrect_answer of currentQuestion.incorrect_answers){
            answers.push(incorrect_answer);
          }
          shuffleArray(answers);
          comp = <MultipleAnswer answers={answers} handleChange={handleChange}/>
        break;
        case "boolean":
          comp = <MultipleAnswer answers={["True", "False"]} handleChange={handleChange}/> 
        break;
        case "text":
          comp = <TextAnswer handleChange={handleChange}/>
        break;
        default:
          comp = null;
        break
      }
      return comp;
    }

    // If user wants to restart quiz, we reinitialize everything for a new one.
    const restartQuiz = () => {
      setFinished(false);
      setDone([]);
      setCorrectAnswers(0);
      setWrongAnswers(0);
      setPercentage(0);
      setNonAnswered(0);
      currentAnswer = "";
    }

    if(!loading) {
      return (
        <Container style={{paddingTop: 50}}>
          <Row>
            <Col>
              <Card>
                {!finished ?
                  <>
                  <CardHeader>Category: {escapeHtml(currentQuestion.category)}</CardHeader>
                  <CardBody>
                    <Form key={done}>
                      <CardTitle style={{marginBottom: 20}}><h5>{escapeHtml(currentQuestion.question)}</h5></CardTitle>
                      {renderQuestion()}
                      <hr/>
                    </Form>
                    <Button color="primary" onClick={ () => ( processQuestion() ) }>{done.length === questions.length ? "Finish Quiz" : "Next"}</Button>
                  </CardBody>
                  </>
                  :
                  <Summary restartQuiz={restartQuiz} correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} percentage={percentage} nonAnswered={questions.length - nonAnswered} />
                }
              </Card>
            </Col>
          </Row>
        </Container>
      )
    }
    return <Spin/>
}