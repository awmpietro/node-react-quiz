import React from 'react';
import { CardBody, CardTitle,  CardText, Button } from 'reactstrap';


const Summary = ({restartQuiz, correctAnswers, wrongAnswers, percentage, nonAnswered}) => {
    return(
        <CardBody>
            <CardTitle style={{marginBottom: 20}}><h5>Summary</h5></CardTitle>
            <CardText>Correct: <strong>{correctAnswers}</strong></CardText>
            <CardText>Wrong: <strong>{wrongAnswers}</strong></CardText>
            <CardText>Questions answered: <strong>{nonAnswered}</strong></CardText>
            <CardText>Final Score: <strong>{percentage}%</strong></CardText>
            <hr/>
            <Button color="primary" onClick={ () => restartQuiz() }>Restart Quiz</Button>
        </CardBody>
    )
}

export default Summary;