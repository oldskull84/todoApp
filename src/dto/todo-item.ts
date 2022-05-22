export default class ToDoItem {
  public createdAt: Date;
  public isDone: boolean;

  constructor(public title: string, public description?: string | null) {
    this.createdAt = new Date();
    this.isDone = false;
  }
}
