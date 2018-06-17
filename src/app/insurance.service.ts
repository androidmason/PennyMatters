import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Insurance } from './insurance';
import { Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, catchError , map} from 'rxjs/operators';
import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({ 
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods' : 'Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'
})
};


@Injectable()
export class InsuranceService {

  constructor(private http:HttpClient) { }

  addInsurance (insurance: Insurance): Observable<Object> {
    return this.http.post("http://localhost:9000/insurance/add",insurance,httpOptions).pipe(
      tap(count => this.log(" Count is " + count)),
      catchError(this.handleError<any>('Fetch count'))
    )  
  }

  findInsurance () : Observable<Insurance[]> {
    return this.http
    .get<Insurance[]>("http://localhost:9000/insurance/find",httpOptions)
    .pipe(
       tap(count => this.log("fetched data" + count),
       catchError(this.handleError<any>('Fetched'))
     ))
  }

  private log(message: string) {
    console.log('InsuranceService: ' + message);
  }
  
  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
  

}
