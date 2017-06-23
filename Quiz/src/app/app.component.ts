import { Component, OnInit } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/observable";
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Question } from "./models/question.model";
import { Answer } from "./models/answer.model";

const questionsUrl = "assets/questions.json";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  questions: Question[];
  selectedAnswers: string[] = [];
  questionIndex: number = 0;
  isCheckMode: boolean;

  constructor(private http: Http) { };

  ngOnInit() {
    this.getQuestions()
      .subscribe(questions => this.questions = questions);
  }

  getNewQuestion() {
    this.isCheckMode = false;
    const index = Number(this.questionIndex);
    this.questionIndex = index + 1;
  }

  markQuestion(answerName: string) {
    const index = this.selectedAnswers.indexOf(answerName);
    if(index === -1){
      this.selectedAnswers.push(answerName);
    }
    else{
      this.selectedAnswers.splice(index, 1);
    }    
  }

  isSelected(answerName: string) {
    const index = this.selectedAnswers.indexOf(answerName);
    if(index === -1){
      return false;
    }
    else{
      return true;
    }
  } 

  check() {
    this.isCheckMode = true;
  }

  getQuestions() {
    return <Observable<Question[]>>this.http
      .get(questionsUrl)
      .map((response: Response) => <Question[]>response.json().data)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.log(error);
    const message = "Error status code ${error.status} at ${error.url}";
    return Observable.throw(message);
  }
}
