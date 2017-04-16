import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { URL_LOCALHOST, DRIVERS_URLS, SEASONS_URLS, CIRCUITS_URLS } from './../constants/urls';

@Injectable()
export class SharedService {
    urlLocalhost: string = URL_LOCALHOST;

    allf1SeasonsURL: string = this.urlLocalhost + SEASONS_URLS.ALL_SEASONS_URL;
    driverSelectYearUrl: string = this.urlLocalhost;
    constructor(private _http: Http) { }

    //World championship drivers http://ergast.com/api/f1
    //Check select driver world champion: http://ergast.com/api/f1/driverStandings/1/drivers/<driverId>
    findF1SeasonsList() //GET
    {
      return this.getRequest(this.allf1SeasonsURL);
    }

    findSelectYearDrivers(year)
    {
      console.log(this.urlLocalhost + year + DRIVERS_URLS.ALL_DRIVERS_SELECT);
      return this.getRequest(this.urlLocalhost + year + DRIVERS_URLS.ALL_DRIVERS_SELECT);
    }

    /**
     * /drivers/<driverId>.json
     * @param driverId Show select driver info details
     */
    findSelectDriverWithId(driverId)
    {
      return this.getRequest(this.urlLocalhost + DRIVERS_URLS.SELECT_DRIVER_BEFORE_ID + driverId + ".json");
    }

    /**
     * /drivers.json?limit=50&offset=1
     * @param limit Items per page (max 100)
     * @param page show page number
     */
    findAddlDriversByPageAndResultsPerPage(limit, page)
    {

    }

    /**
     *  /driverStandings/1/drivers.json?limit=100
     */
    findMinOneTimeWorldChampion()
    {
      return this.getRequest(this.urlLocalhost + DRIVERS_URLS.ONE_TIME_WORLD_CHAMPION_F1);
    }
   
    /**
     * /2012/circuits.json
     * @param year Number to filt select year circuits
     */
    findSelectYearCircuits(year)
    {
      return this.getRequest(this.urlLocalhost + year + "/circuits.json");
    }

    /**
     * /circuits.json?limit=100
     * Show all circuits
     */
    findAllCircuits()
    {
      return this.getRequest(this.urlLocalhost + "circuits.json?limit=100");
    }

    //Function to make GET Requests
    getRequest(url)
    {
      console.log(url);
      return this._http.get(url)
          .map(response => {
              { return response.json() };
          })
          .catch(error => Observable.throw(error.json()));
    }

    //Function to make POST Requests

}
