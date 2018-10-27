import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_ENDPOINT} from '../app.tokens';
import {Observable} from 'rxjs';
import {Task} from './models/task';
import {Member} from '../member/models/member';
import * as moment from 'moment';

@Injectable()
export class TaskService {

  constructor(private http: HttpClient, @Inject(API_ENDPOINT) private apiEndpoint) {
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiEndpoint}/tasks/${id}`);
  }

  getTasks(): Observable<Array<Task>> {
    return this.http.get<Task[]>(`${this.apiEndpoint}/tasks`);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiEndpoint}/tasks/${task.id}`, task);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiEndpoint}/tasks`, task);
  }

  removeTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiEndpoint}/tasks/${id}`);
  }

  distributeTasks(members: Array<Member>) {
    // get all tasks of the coming week, starting with today
    // and adding the points of the tasks
    this.getTasks().subscribe(
      (tasks) => {
        const today = moment().startOf('day');
        const lastDayOfWeek = moment();
        lastDayOfWeek.add(7, 'day').startOf('day');
        const tasksOfTheWeek = new Array<Task>();
        let pointsToDo = 0;
        for (const task of tasks) {
          const dateOfTask = moment(task.date, 'YYYY-MM-DD');
          if (dateOfTask.isSame(today) || dateOfTask.isBetween(today, lastDayOfWeek) && !task.doneBy) {
            pointsToDo = pointsToDo + task.points;
            console.log(task);
            tasksOfTheWeek.push(task);
          }
        }
        console.log('tasksOfTheWeek');
        console.log(tasksOfTheWeek);

        // divide the points by the member count and round up
        const pointsPerPerson = Math.ceil(pointsToDo / members.length);
        console.log('pointsPerPerson');
        console.log(pointsPerPerson);

        // create empty task list for every member and list with tasks to divide
        // loop again through tasks, looking if tasks is preferred by somebody and add it to his list
        const taskListPerPerson = new Map<number, Array<Task>>();
        const distributedPointsPerPerson = new Map<number, number>();
        for (const member of members) {
          taskListPerPerson.set(member.id, new Array<Task>());
          distributedPointsPerPerson.set(member.id, 0);
        }

        console.log('taskListPerPerson');
        console.log(taskListPerPerson);

        let indexToRemove = new Array<number>();
        for (const taskIndex in tasksOfTheWeek) {
          const task = tasksOfTheWeek[taskIndex];
          if (task.preferredBy) {
            for (const member of members) {
              if (member.id === task.preferredBy && distributedPointsPerPerson.get(member.id) < pointsPerPerson) {
                taskListPerPerson.get(member.id).push(task);
                distributedPointsPerPerson.set(member.id, distributedPointsPerPerson.get(member.id));
                indexToRemove.push(+taskIndex);
              }
            }
          }
        }

        // loop again though tasks and distribute the other tasks by comparing the points already assigned to member
        indexToRemove.sort((a, b) => {
          return b - a;
        });
        for (const index of indexToRemove) {
          tasksOfTheWeek.splice(index, 1);
        }
        console.log('*************After distributing preferred*******************');
        console.log('tasksOfTheWeek');
        console.log(tasksOfTheWeek);
        console.log('indexToRemove');
        console.log(indexToRemove);
        console.log('taskListPerPerson');
        console.log(taskListPerPerson);

        indexToRemove = new Array<number>();
        for (const taskIndex in tasksOfTheWeek) {
          const task = tasksOfTheWeek[taskIndex];
          let taskAlreadyDistributed = false;
          distributedPointsPerPerson.forEach((points: number, id: number) => {
            if (!taskAlreadyDistributed) {
              if (points + task.points <= pointsPerPerson) {
                taskListPerPerson.get(id).push(task);
                distributedPointsPerPerson.set(id, points + task.points);
                indexToRemove.push(+taskIndex);
                taskAlreadyDistributed = true;
              }
            }
          });
        }

        indexToRemove.sort((a, b) => {
          return b - a;
        });
        for (const index of indexToRemove) {
          tasksOfTheWeek.splice(index, 1);
        }
        console.log('*************After distributing per points*******************');
        console.log('tasksOfTheWeek');
        console.log(tasksOfTheWeek);
        console.log('indexToRemove');
        console.log(indexToRemove);
        console.log('taskListPerPerson');
        console.log(taskListPerPerson);

        indexToRemove = new Array<number>();
        for (const taskIndex in tasksOfTheWeek) {
          const task = tasksOfTheWeek[taskIndex];
          let taskAlreadyDistributed = false;
          // first distribute tasks to persons which have no tasks yet
          distributedPointsPerPerson.forEach((points: number, id: number) => {
            if (!taskAlreadyDistributed) {
              if (points === 0) {
                taskListPerPerson.get(id).push(task);
                distributedPointsPerPerson.set(id, points + task.points);
                indexToRemove.push(+taskIndex);
                taskAlreadyDistributed = true;
              }
            }
          });

          distributedPointsPerPerson.forEach((points: number, id: number) => {
            if (!taskAlreadyDistributed) {
              if (points < pointsPerPerson) {
                taskListPerPerson.get(id).push(task);
                distributedPointsPerPerson.set(id, points + task.points);
                indexToRemove.push(+taskIndex);
                taskAlreadyDistributed = true;
              }
            }
          });
        }

        console.log('*************After distributing rest*******************');
        console.log('tasksOfTheWeek');
        console.log(tasksOfTheWeek);
        console.log('indexToRemove');
        console.log(indexToRemove);
        console.log('taskListPerPerson');
        console.log(taskListPerPerson);

        // loop though each member list and assign the member to each task in the list
        taskListPerPerson.forEach((taskList: Array<Task>, id: number) => {
          let memberForTask = null;
          for (const task of taskList) {
            if (!memberForTask) {
              for (const member of members) {
                if (member.id === id) {
                  memberForTask = member;
                }
              }
            }
            task.doneBy = memberForTask;
            console.log(task);
            this.updateTask(task).subscribe();
          }
        });
      });
  }
}
