import { AfterViewInit, ChangeDetectorRef, Component, DestroyRef, Directive, Input, QueryList, ViewChildren, inject } from '@angular/core';
import { MatColumnDef, MatTableModule } from '@angular/material/table';
import { Column } from './column';
import { MatSort } from '@angular/material/sort';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { startWith, tap } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Directive()
export abstract class TableBase implements AfterViewInit {
  private _displayedColumns: string[] = [];
  private _customDisplayedColumns: string[];
  private _changeDetectorRef = inject(ChangeDetectorRef);
  private _destroyRef = inject(DestroyRef);

  get displayedColumns(): string[] { return this._customDisplayedColumns ?? this._displayedColumns; }
  set displayedColumns(value: string[]) { this._customDisplayedColumns = value; }

  @ViewChildren(MatColumnDef) columns: QueryList<MatColumnDef>;

  ngAfterViewInit(): void {
    this.columns.changes.pipe(
      takeUntilDestroyed(this._destroyRef),
      startWith(this.columns),
      tap((columns: QueryList<MatColumnDef>) => {
        this._displayedColumns = columns.toArray().map(c => c.name);
      })
    ).subscribe();

    this._changeDetectorRef.detectChanges();
  }
}

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'table-basic-example',
  styleUrls: ['table-basic-example.css'],
  templateUrl: 'table-basic-example.html',
  standalone: true,
  imports: [MatTableModule, MatSort, Column],
})
export class TableBasicExample extends TableBase {
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
  }
}

/**  Copyright 2024 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
