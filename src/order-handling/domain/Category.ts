export interface CategoryProperties {
  readonly id: string;
  readonly name: string;
  readonly isVisible: boolean;
}

export class Category {
  private readonly id: string;
  private name: string;
  private isVisible: boolean;
  constructor(properties: CategoryProperties) {
    Object.assign(this, properties);
  }

  setIsVisible(isVisible: boolean) {
    this.isVisible = isVisible;
  }
}
