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
  MatTable,
  MatTableModule,
} from '@angular/material/table';

export function matColumnDefFactory(c: Column) {
  return c.columnDef
}

@Component({
  selector: 'app-column-def',
  standalone: true,
  templateUrl: './column.html',
  imports: [MatTableModule, MatSortHeader, NgTemplateOutlet],
  providers: [
    { provide: MatColumnDef, useFactory: matColumnDefFactory, deps: [Column] }
  ]
})
export class Column implements OnInit, OnDestroy {
  @ViewChild(MatColumnDef, { static: true }) columnDef: MatColumnDef;
  @ViewChild(MatCellDef, { static: true }) cellDef: MatCellDef;
  @ViewChild(MatHeaderCellDef, { static: true }) headerCellDef: MatHeaderCellDef;

  @Input() name: string;
  @Input() sort: boolean;

  table: MatTable<any> = inject(MatTable);

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
