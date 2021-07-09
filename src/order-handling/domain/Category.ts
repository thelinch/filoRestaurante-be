export interface CategoryProperties {
  readonly id: string;
  readonly name: string;
  readonly isVisible: boolean;
}

export class Category {
  private readonly id: string;
  private name: string;
  private isVisible: boolean;
  private state: string;
  constructor(properties: CategoryProperties) {
    Object.assign(this, properties);
  }

  setIsVisible(isVisible: boolean) {
    this.isVisible = isVisible;
  }
  properties() {
    return {
      id: this.id,
      name: this.name,
      isVisible: this.isVisible,
      state: this.state,
    };
  }
  get Id(): string {
    return this.id;
  }
  get Name(): string {
    return this.name;
  }
  get IsVisible(): boolean {
    return this.isVisible;
  }
}
