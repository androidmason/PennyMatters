import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BankDeposits } from '../app/bank-deposits';
import { catchError, map, tap, count } from 'rxjs/operators';
import { of }         from 'rxjs/observable/of';


const httpOptions = {
  headers: new HttpHeaders({ 
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods' : 'Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'
})
};


@Injectable()
export class BankDepositsService {

  constructor(
    private http: HttpClient
  ) { }

  /** PUT: update the hero on the server */
updateBankDeposits (bankDeposits: BankDeposits): Observable<Object> {
  return this.http.post("http://localhost:9000/bankdeposits/add",bankDeposits,httpOptions).pipe(
    tap(count => this.log(" Count is " + count)),
    catchError(this.handleError<any>('Fetch count'))
  )  
}

private log(message: string) {
  console.log('HeroService: ' + message);
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
