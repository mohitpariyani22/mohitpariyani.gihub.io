import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { ToastrService } from "../../../node_modules/ngx-toastr";


@Injectable()
export class HttpcallService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService) { }

  //Local JSON
  getLocal() {
    return this.http.get("./assets/dummy.json")
      .pipe(catchError(this.handleError));
  }
  //EO Local JSON

  public handleError(errorData: HttpErrorResponse) {
    if (errorData.error.status === 403) {
      this.toastr.warning("You dont have permission");
    }
    else if (errorData.error.status >= 500 && errorData.error.status <= 505) {
      this.toastr.error("Internal server error occured");
    } else if (errorData.error.status <= 0) {
      if (navigator.onLine) {
        this.toastr.error("Something wrong happend! please try again");
      } else {
        this.toastr.info("Check your internet connection");
      }
    }
    else if (errorData.error.status == 401) {
      console.log('errorData', errorData);
      this.toastr.error(errorData.error.message);
    }
    else if (errorData.status == 409) {
      console.log('errorData', errorData);
      this.toastr.error(errorData.error.message);
    }
    else {
      console.log(errorData.error.data.message)
      this.toastr.error(errorData.error.data.message);
    }
    return throwError("Something bad happened; please try again later.");
  }
}
