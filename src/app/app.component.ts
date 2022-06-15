import { Component, OnInit } from '@angular/core';
import data from './model/questions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Questionnaire';
  readonly questions: any[] = data;
  doneQuestions: number[] = [];
  currentIndex = 0;
  currentQuestion: any;
  showCorrect = false;
  answeredQuestionsLen = 0;
  allQuestionsLen = 0;
  answeredIndex = -1;

  ngOnInit(): void {
    let done = localStorage.getItem("doneQuestions");
    if (done) this.doneQuestions = JSON.parse(done) as unknown as number[];
    console.log(this.doneQuestions)
    this.allQuestionsLen = this.questions.length;
    this.selectQuestion();
  }

  selectQuestion() {
    let next;
    do {
      next = this.getRandomInt();
      console.log("next", next);
    } while (this.doneQuestions.includes(next))
    this.answeredQuestionsLen = this.doneQuestions.length;
    this.currentQuestion = this.questions[next];
  }

  getRandomInt() {
    return Math.floor(Math.random() * this.questions.length);
  }

  answerQuestion(index: number) {
    this.doneQuestions.push(this.currentIndex);
    localStorage.setItem("doneQuestions", JSON.stringify(this.doneQuestions))
    this.showCorrect = true;
    this.answeredIndex = index
  }

  nextQuestion() {
    this.selectQuestion();
    this.showCorrect = false;
    this.answeredIndex = -1
  }

  clearQuestions() {
    localStorage.removeItem("doneQuestions")
    this.doneQuestions = [];
    this.answeredQuestionsLen = 0
  }
}
