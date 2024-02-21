import { CDK_TABLE, CdkTable } from '@angular/cdk/table';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import {
  MatCellDef,
  MatColumnDef,
  MatHeaderCellDef,
  MatTableModule,
} from '@angular/material/table';

@Component({
  selector: 'app-column-def',
  standalone: true,
  templateUrl: './column.html',
  imports: [MatTableModule, MatSortHeader, NgTemplateOutlet],
})
export class Column implements OnInit, OnDestroy {
  @ViewChild(MatColumnDef, { static: true }) columnDef: MatColumnDef;
  @ViewChild(MatCellDef, { static: true }) cellDef: MatCellDef;
  @ViewChild(MatHeaderCellDef, { static: true })
  headerCellDef: MatHeaderCellDef;

  @Input() name: string;
  @Input() sort: boolean;

  table: CdkTable<any> = inject(CDK_TABLE);

  constructor() {
    if (inject(MatSort, { optional: true })) {
      this.sort = true;
    }
  }

  ngOnInit(): void {
    this.columnDef.name = this.name;
    this.columnDef.cell = this.cellDef;
    this.columnDef.headerCell = this.headerCellDef;
    this.table.addColumnDef(this.columnDef);
  }

  ngOnDestroy(): void {
    this.table.removeColumnDef(this.columnDef);
  }
}
