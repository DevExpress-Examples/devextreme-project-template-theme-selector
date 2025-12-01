import { Component } from '@angular/core';
import 'devextreme/data/odata/store';
import { DataService, Priority, Task } from 'src/app/shared/services/data.service';

@Component({
  templateUrl: 'tasks.component.html',
  providers: [DataService],
})

export class TasksComponent {
  tasks: Task[];

  priorities: Priority[];

  constructor(private readonly dataService: DataService) {
    this.tasks = this.dataService.getTasks();
    this.priorities = this.dataService.getPriorities();
  }
}
