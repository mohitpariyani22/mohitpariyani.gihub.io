import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpcallService } from "./services/httpcall.service";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { PagerService } from './services/pager.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  
  editing = {};
  rows = [];
  headers = [];
  copyData = [];
  editItem: any;
  searchText: any;
  editData = {
    user: '',
    purchase: '',
    commission: '',
    earnings: '',
    status: '',
    date: '',
    actions: { "edit": "true", "delete": "true" }
  }

  noresult: boolean = false;
  // Reverse
  reverse: boolean = false;
  reverse0: boolean = false;
  reverse1: boolean = false;
  reverse2: boolean = false;
  reverse3: boolean = false;
  reverse4: boolean = false;
  reverse5: boolean = false;
  reverse6: boolean = false;

  starBool: boolean = true;
  userAvailable: boolean = false;
  modalRef: BsModalRef;

  pageSize: number = 5;
  totalCount: number = 0;
  currentCount: number = 0;
  id: number;

  // array of all items to be paged
  private data: any[];

  private allItems: any[];
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  constructor(
    private http: HttpcallService,
    private modalService: BsModalService,
    private pagerService: PagerService
  ) {
  }

  ngOnInit() {
    this.getData();
  }


  getData = () => {
    this.http.getLocal().subscribe((data: any) => {
      this.copyData = data;
      this.allItems = data;
      this.totalCount = this.allItems.length;
      // initialize to page 1
      this.setPage(1);
      console.log('this.data', this.data);
    });
  }

  pageSizeChange = () => {
    this.setPage(1);
  }

  setPage(page: number) {
    this.currentCount = this.pageSize;
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page, this.pageSize);

    // get current page of items
    // this.pagedItems = this.data.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.data = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  setPage1(page: number, data) {
    // get pager object from service
    this.pager = this.pagerService.getPager(data.length, page, this.pageSize);

    // get current page of items
    // this.pagedItems = this.data.slice(this.pager.startIndex, this.pager.endIndex + 1);
    this.data = data.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  editFormSubmit = (form) => {
    if (form.valid) {
      console.log('editData', this.editData);
      // this.data.push(this.editData);
      this.data.map((key: any, index) => {
        if (key.user == this.editItem.user) {
          delete this.data[key];
          this.data.splice(index, 1, this.editData)
        }
      });
      console.log('data', this.data);
      this.modalRef.hide();
    }
  }

  addFormSubmit = (form) => {
    if (form.valid) {
      this.data.push(this.editData);
      this.copyData.push(this.editData);
      this.modalRef.hide();
      this.totalCount += 1;
      console.log('this.data', this.data);
      this.setPage1(1, this.copyData);
    }
  }

  userOnChange = (user) => {
    console.log(user);
    this.userAvailable = false;
    this.copyData.map((key: any) => {
      if (user.toLowerCase() == key.user.toLowerCase()) {
        this.userAvailable = true;
      }
    })
  }

  // SORTING Function
  sortnull = (arrSort, starBool, activeNum) => {
    this.id = activeNum;
    console.log('starBool', starBool);
    console.log('arrSort', arrSort);
    if (arrSort == "user") {
      this.reverse = !this.reverse;
    } else if (arrSort == "purchase") {
      this.reverse0 = !this.reverse0;
    }
    else if (arrSort == "commission") {
      this.reverse1 = !this.reverse1;
    }
    else if (arrSort == "earnings") {
      this.reverse2 = !this.reverse2;
    }
    else if (arrSort == "status") {
      this.reverse3 = !this.reverse3;
    }
    else if (arrSort == "date") {
      this.reverse4 = !this.reverse4;
    }

    var sorter = function (a: any, b: any) {
      let dateA:any;
      let dateB:any;
      if (a[arrSort] === b[arrSort]) {     // identical? return 0
        return 0;
      }
      else if (starBool && arrSort == "date") {
        dateA = new Date(a[arrSort]);
        dateB = new Date(b[arrSort]);
        return (dateA - dateB) > 0 ? 1 : -1;//For Dates
      }
      else if (!starBool && arrSort == "date") {
        dateA = new Date(a[arrSort]);
        dateB = new Date(b[arrSort]);
        return (dateA - dateB) > 0 ? -1 : 1;//For Dates
      }
      else if (starBool && (arrSort == "user" || arrSort == "status"))
        return a[arrSort] < b[arrSort] ? -1 : 1; //For Strings 
      else if (!starBool && (arrSort == "user" || arrSort == "status"))
        return a[arrSort] < b[arrSort] ? 1 : -1;  //For String
      else if (starBool && (arrSort == "purchase" || arrSort == "earnings" || arrSort == "commission"))
        return a[arrSort] - b[arrSort]; //For Numericals 
      else if (!starBool && (arrSort == "purchase" || arrSort == "earnings" || arrSort == "commission"))
        return b[arrSort] - a[arrSort];  //For Numericals
    }
    this.starBool = !this.starBool;
    return this.data.sort(sorter);
  }

  add = (template: TemplateRef<any>) => {
    this.editData = {
      user: '',
      purchase: '',
      commission: '',
      earnings: '',
      status: 'Unverified',
      date: '',
      actions: { "edit": "true", "delete": "true" }
    }
    this.modalRef = this.modalService.show(template);
  }

  delete = (item) => {
    this.data.map((key: any, index) => {
      if (item.user == key.user) {
        this.data.splice(index, 1)
      }
    });
    this.copyData.map((key: any, index) => {
      if (item.user == key.user) {
        this.copyData.splice(index, 1)
      }
    });
    this.setPage1(1, this.copyData);
    this.totalCount -= 1;
    if (this.totalCount < 5) {
      this.currentCount -= 1;
    }
  }

  edit = (template: TemplateRef<any>, item) => {
    this.editItem = '';
    this.editItem = item;
    this.editData = {
      user: item.user,
      purchase: item.purchase,
      commission: item.commission,
      earnings: item.earnings,
      status: item.status,
      date: item.date,
      actions: { "edit": "true", "delete": "true" }
    }
    this.modalRef = this.modalService.show(template);
    console.log(item);
  }

  searchFilter = () => {
    console.log(this.searchText);
    if (this.searchText == "") {
      this.data = this.copyData;
      this.pageSize = 5;
      this.setPage(1);
    } else {
      this.data = [];
      this.copyData.map((key: any) => {
        if (key.user.toLowerCase().includes(this.searchText.toLowerCase())) {
          this.data.push(key);
        }
      });
      this.pageSize = this.data.length;
      this.currentCount = this.data.length;
      console.log(this.currentCount);
      if (this.data.length) {
        this.setPage1(1, this.data);
      }
    }
  }


}
