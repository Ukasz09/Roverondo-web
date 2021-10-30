import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ScrollService {
  private readonly scrollTopPosition: Map<string, number> = new Map<string, number>();
  private readonly scrollBottomPosition: Map<string, number> = new Map<string, number>();
  private readonly scrollTopChangeSubject$ = new Subject<{ id: string, position: number }>();
  private readonly scrollBottomChangeSubject$ = new Subject<{ id: string, position: number }>();
  public readonly scrollTopChange$ = this.scrollTopChangeSubject$.asObservable();
  public readonly scrollBottomChange$ = this.scrollBottomChangeSubject$.asObservable();

  public saveScrollTopPosition(id: string, value: number): void {
    this.scrollTopPosition.set(id, value);
    this.emitScrollTopChange(id, value);
  }

  public saveScrollBottomPosition(id: string, value: number): void {
    this.scrollBottomPosition.set(id, value);
    this.emitScrollBottomChange(id, value);
  }

  public clearScrollPosition(id: string): void {
    this.scrollTopPosition.delete(id);
    this.scrollBottomPosition.delete(id);
  }

  public getScrollTopPosition(id: string): number {
    return this.scrollTopPosition.get(id) ?? 0;
  }

  public getScrollBottomPosition(id: string): number {
    return this.scrollBottomPosition.get(id) ?? 0;
  }

  private emitScrollTopChange(id: string, position: number): void {
    this.scrollTopChangeSubject$.next({ id, position });
  }

  private emitScrollBottomChange(id: string, position: number): void {
    this.scrollBottomChangeSubject$.next({ id, position });
  }
}
