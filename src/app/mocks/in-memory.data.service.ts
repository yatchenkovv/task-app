import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IReport } from '../interfaces/IReport';
import { Injectable } from '@angular/core';
import { Reports } from './mock.reports';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {Reports};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(reports: IReport[]): number {
    return reports.length > 0 ? Math.max(...reports.map(report => report.Id)) + 1 : 1;
  }
}
