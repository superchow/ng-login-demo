import { Component } from '@angular/core';

@Component({
  selector: 'exe-child',
  template: `
    <p>exe-child</p>
  `,
})
export class ChildComponent {
  name: string = 'child-compent';

  public get test(): string {
    return this.name;
  }

}
