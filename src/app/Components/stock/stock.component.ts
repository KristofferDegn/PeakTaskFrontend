import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StockService} from "../../Services/stock/stock.service";
import {join} from "@angular/compiler-cli";
import {forkJoin, map, Observable} from "rxjs";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {StockItem} from "../../Models/StockItem";
import {NgIf} from "@angular/common";

export enum PageMode{
  edit= 'edit',
  create = 'create',
  view = 'view'
}

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent implements OnInit {
  pageMode: PageMode = PageMode.view;
  inputFormGroup!: FormGroup;


  currentStockItem$!: Observable<StockItem>;
  currentStockItemId: number = -1;


  constructor(private route: ActivatedRoute, private stockService: StockService, private router: Router) {
  }

  ngOnInit(): void {
    this.inputFormGroup = new FormGroup({
      itemNumber: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      amount: new FormControl('0', Validators.required),
    })

    this.route.url.subscribe(routeSegments => {
      let modeSegment = routeSegments[1].path;
      if(modeSegment){
        switch (modeSegment as PageMode) {
          case PageMode.view:
            this.pageMode = PageMode.view;
            break;
          case PageMode.create:
            this.pageMode = PageMode.create;
            break;
          case PageMode.edit:
            this.pageMode = PageMode.edit;
            break;
          default:
            break;
        }
      }
    });

    this.currentStockItem$ = this.route.data.pipe(map(data => data['stockItem']))
    this.currentStockItem$.subscribe(stockItem => {
      if(stockItem){
        this.currentStockItemId = stockItem.id;
        this.inputFormGroup.get('itemNumber')?.setValue(stockItem.itemNumber);
        this.inputFormGroup.get('description')?.setValue(stockItem.description);
        this.inputFormGroup.get('location')?.setValue(stockItem.location);
        this.inputFormGroup.get('amount')?.setValue(stockItem.amount);
      }
    });
  }

  onSubmit(){
    if(this.pageMode === PageMode.create){
      if(this.inputFormGroup.valid){
        let newStockItem: StockItem = {
          id: -1,
          itemNumber: this.inputFormGroup.get('itemNumber')?.value,
          description: this.inputFormGroup.get('description')?.value,
          location: this.inputFormGroup.get('location')?.value,
          amount: this.inputFormGroup.get('amount')?.value
        }
        this.stockService.createStockItem(newStockItem).subscribe(createdStock => {
          console.log("Created stock: " + createdStock);
          this.router.navigate([`/stock-overview/`]);
        });

      } else {
        console.log("Please fill the form!")
      }
    } else if(this.pageMode === PageMode.edit){
      if(this.inputFormGroup.valid){
        let correctedStockItem: StockItem = {
          id: this.currentStockItemId,
          itemNumber: this.inputFormGroup.get('itemNumber')?.value,
          description: this.inputFormGroup.get('description')?.value,
          location: this.inputFormGroup.get('location')?.value,
          amount: this.inputFormGroup.get('amount')?.value
        }
        this.stockService.updateStockItem(this.currentStockItemId, correctedStockItem).subscribe(updatedStock => {
          console.log("Updated stock: " + updatedStock);
          this.router.navigate([`/stock-overview/`]);
        });
      }
    }
  }

  onDeleteClick(){
    console.log("Deleted stock: " + this.currentStockItemId);
    this.stockService.deleteStockItem(this.currentStockItemId);
    this.router.navigate([`/stock-overview/`]);
  }


  protected readonly PageMode = PageMode;
}
