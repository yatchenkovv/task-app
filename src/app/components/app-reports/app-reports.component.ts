import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { IReport } from 'src/app/interfaces/IReport';
import { Observable, of } from 'rxjs';
import { FiltersService } from 'src/app/services/filters.service';
import { IOptionFilter } from 'src/app/interfaces/IOptionFilter';

@Component({
  selector: 'app-reports',
  templateUrl: './app-reports.component.html',
  styleUrls: ['./app-reports.component.scss']
})

export class ReportsComponent implements OnInit {
  public reports: Observable<IReport[]>;
  public allFilters: IOptionFilter[];
  public optionsFilter: IOptionFilter[];
  public filteredResult: IReport[];

  constructor(private reportsService: ReportsService,
              private filterService: FiltersService) {}

  ngOnInit() {
    this.reports = this.reportsService.getReports();
    this.allFilters = this.filterService.getFilters();
    this.filteredResult = [];
  }

  public applyFilter() {
    this.optionsFilter = this.getActiveFilters();
    this.reports = this.filterService.applyFilterReports.call(this, this.reports);
  }

  public getActiveFilters() {
    return this.allFilters.filter((option) => {
      if (option.Type === 'text' && option.Value !== '') {
        return true;
      }
      return option.State;
    });
  }

  public resetFilters() {
    this.optionsFilter.forEach((optionFilter) => {
      if (optionFilter.Type === 'text') {
        optionFilter.Value = '';
      } else {
        optionFilter.State = false;
      }
      this.reports = this.reportsService.getReports();
    });
  }
}
