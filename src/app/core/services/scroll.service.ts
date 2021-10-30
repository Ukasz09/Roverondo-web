import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ScrollService {
  private readonly scrollTopPosition: Map<string, number> = new Map<string, number>();

  public saveScrollTopPosition(id: string, value: number): void {
    this.scrollTopPosition.set(id, value);
  }

  public clearScrollTopPosition(id: string): void {
    this.scrollTopPosition.delete(id);
  }

  public getScrollTopPosition(id: string): number {
    return this.scrollTopPosition.get(id) ?? 0;
  }
}
