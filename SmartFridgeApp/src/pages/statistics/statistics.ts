import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { AngularFireAuth } from 'angularfire2/auth';
import { SignUpLogInPage } from '../signuplogin/signuplogin';
import { AngularFirestore } from 'angularfire2/firestore';
import { DailyNutrientServiceProvider } from '../../providers/daily-nutrient-service/daily-nutrient-service';
​
/**
 * Generated class for the StatisticsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
​
@IonicPage()
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
​
export class StatisticsPage implements OnInit {
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  
  goals: any=["To have a healthier diet", "To lose weight", "To lose significant weight","To gain weight", "No goals"]​
  genderArray: any=['Female','Male'];

  title: any;
  barChart: any;
  doughnutChart: any;

  goal: any;
  height: any;
  weight: any;
  gender: any;

  user: any;
​
  constructor(public navCtrl: NavController, public navParams: NavParams, public angularFireAuth: AngularFireAuth, public firestore: AngularFirestore,
    public dailyNutrientService: DailyNutrientServiceProvider) {
    this.title = "Statistics"
  }

  ionViewDidLoad(){
    this.dailyNutrientService.getDailyNutrients();
    this.angularFireAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.user=this.firestore.firestore.doc('/users/'+res.uid).get().then(docSnapshot => {
          let data=docSnapshot.data();
          this.goal=this.goals[data.goal];
          this.weight=data.weight;
          this.height=data.height;
          this.gender=this.genderArray[data.gender];
        });
      } else {
        this.navCtrl.push(SignUpLogInPage, {}).then(()=>{
          const index = this.navCtrl.getActive().index;
          this.navCtrl.remove(0, index);
        });
      }
    });


  }
​
  ngOnInit() {
    this.barChartMethod();
    this.doughnutChartMethod();
    }
  
  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Protein', 'Rec Proteins','Carbs', 'Rec Carbs','Fats', 'Rec Fats','Zinc', 'Rec Zinc','Iron', 'Rec Iron','Magnesium', 'Rec Magnesium'],
        //will update with what user eats
​
        datasets: [{
          label: 'Amount Consumed',
          data: [200, 50, 30, 15, 20, 34],
          //will update with what user eats, just example
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
        
  
  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Recommended Calories Today','Calories Today'],
        datasets: [{
          label: '# of Votes',
          data: [2425, 1000],
          //will update with what user eats
​
          backgroundColor: [
            '#FFCE56',
            '#FF6384',
            
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            
          ]
        }]
      }
    });
  }
}