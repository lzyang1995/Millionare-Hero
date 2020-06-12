import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd-mobile';
import { 
    fetchQuestionsIfNeeded, 
    updateSelectedOption,
    addScore,
    resetOptionClassNames,
    addOptionClassNames,
    setSelectable
} 
from '../utils/actions.js';
import loading from '../assets/img/loading.gif';
import '../assets/css/question.css';

const questionApiUrl = 'http://localhost:8080/baiwandati/api/getQuestions';

class Question extends React.Component {
    constructor(props) {
        super(props);

        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleConfirmClick = this.handleConfirmClick.bind(this);
    }

    componentDidMount() {
        // console.log('test')
        // note that it is easy to miss out this.props here, which will
        // lead to a bug.
        this.props.fetchQuestionsIfNeeded(questionApiUrl);
        // console.log(a);
        // console.log(this.props);
    }

    handleRadioChange(event) {
        if (!this.props.selectable) return;

        this.props.updateSelectedOption(+event.target.value);
    }

    handleConfirmClick() {
        if (!this.props.selectable) return;

        let id = +this.props.id;
        let currentQuestion = this.props.questionData[id - 1];
        let selectedOption = this.props.selectedOption;
        let correctOption = currentQuestion.answer - 1;

        this.props.setSelectable(false);
        if (selectedOption === correctOption) {
            this.props.addScore();
            this.props.addOptionClassNames("bgLightGreen", selectedOption);
        } else {
            this.props.addOptionClassNames("bgOrangeRed", selectedOption);
            this.props.addOptionClassNames("bgLightGreen", correctOption);
        }

        setTimeout(() => {
            if (id === 10) {
                this.props.history.replace('/result');
            } else {
                this.props.updateSelectedOption(null);
                this.props.resetOptionClassNames();
                this.props.setSelectable(true);
                this.props.history.replace('/question/' + (id + 1));
            }
        }, 1500);
    }

    render() {
        if (this.props.isFetching || this.props.questionData === null) {
            return (
                <div className="loading">
                    <img alt="loading" src={loading} />
                </div>
            );
        } else {
            let id = +this.props.id;
            let currentQuestion = this.props.questionData[id - 1];
            let selectedOption = this.props.selectedOption;
            let optionClassNames = this.props.optionClassNames;
            return (
                <div className="questionContainer">
                    <h2>{id}: {currentQuestion.quiz}</h2>
                    <div className="choices">
                        {
                            currentQuestion.options.map((item, index) => {
                                return (
                                    <label key={index} className={optionClassNames[index]}>
                                        <input 
                                            type="radio" 
                                            name="choice" 
                                            value={index} 
                                            checked={selectedOption === index}
                                            onChange={this.handleRadioChange}
                                        />
                                        <div>
                                            {item}
                                        </div>
                                    </label>
                                );
                            })
                        }
                    </div>
                    <Button type="primary" onClick={this.handleConfirmClick}>确定</Button>
                </div>
            );
        }
    }
}

function mapStateToProps(state, ownProps) {
    let id = ownProps.match.params.id;
    let history = ownProps.history;
    return {
        id,
        history,
        isFetching: state.questions.isFetching,
        questionData: state.questions.data,
        selectedOption: state.selectedOption,
        optionClassNames: state.optionClassNames,
        selectable: state.selectable,
    };
}

let mapDispatchToProps = { 
    fetchQuestionsIfNeeded, 
    updateSelectedOption,
    addScore,
    resetOptionClassNames,
    addOptionClassNames,
    setSelectable
};

let QuestionWrapper = connect(mapStateToProps, mapDispatchToProps)(Question);

export default QuestionWrapper;