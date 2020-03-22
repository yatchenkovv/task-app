import { Injectable } from '@angular/core';
import { IOptionFilter } from '../interfaces/IOptionFilter';
import { Observable, of } from 'rxjs';
import { IReport } from '../interfaces/IReport';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class FiltersService {
  private optionsFilter: IOptionFilter[];

  public applyFilterReports(reports: Observable<IReport[]>): Observable<IReport[]> {
    return reports.pipe(
      map((reports) => {

        let textFilter = this.optionsFilter.filter((optionFilter) => {
          return optionFilter.Type === 'text';
        });

        if (textFilter.length === 0) {
          textFilter = [{
            Value: '',
            Type: 'text'
          }];
        }

        return reports.filter((report) => {
          for (let i = 0; i < this.optionsFilter.length; i++) {
            if (!report.tags.includes(this.optionsFilter[i].Tag) && this.optionsFilter[i].Type !== 'text') {
              return false;
            }
          }
          if (textFilter[0].Value !== '') {
              if (report.Description.toLowerCase().indexOf(textFilter[0].Value.toLowerCase()) >= 0 ||
                  report.Author.toLowerCase().indexOf(textFilter[0].Value.toLowerCase()) >= 0) {
                return true;
              } else {
                return false;
              }
          }
          return true;
        });
      })
    );
  }

  public getFilters(): IOptionFilter[] {
    return [
      {
        Tag: 'RU',
        State: false,
        Type: 'checkbox',
      },
      {
        Tag: 'EN',
        State: false,
        Type: 'checkbox',
      },
      {
        Tag: 'HARDCORE',
        State: false,
        Type: 'checkbox',
      },
      {
        Tag: 'HOT',
        State: false,
        Type: 'checkbox',
      },
      {
        Tag: 'INTERMEDIATE',
        State: false,
        Type: 'checkbox',
      },
      {
        Tag: 'ACADEMIC',
        State: false,
        Type: 'checkbox',
      },
      {
        Tag: 'ADVANCED',
        State: false,
        Type: 'checkbox',
      },
      {
        Type: 'text',
        Value: '',
      }
    ];
  }
}
