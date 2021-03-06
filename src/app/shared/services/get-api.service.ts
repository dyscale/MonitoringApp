import { AlertController } from '@ionic/angular';
import { AuthenticationService } from './authentication.service';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GetApiService {

  url = environment.url;
  TOKEN_NAME = environment.jwt_token;

  public headers: any;

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private storage: Storage,
    private alertController: AlertController,

  ) {

    this.storage.get(this.TOKEN_NAME).then(token => {
      if (token) {
        this.headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + token);
      }
    });

  }

  getCompany(company_id) {
    return this.http.get(`${this.url}/company/` + company_id, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  getChannel(company_id) {
    return this.http.get(`${this.url}/channel/` + company_id, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  getSelectedChannel(company_id, channel_ids) {
    const params = new HttpParams()
    .set('company_id', company_id)
    .set('channel_ids', channel_ids);
    return this.http.get(`${this.url}/channel`, { headers: this.headers, params: params }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  getRealtime(company_id) {
    return this.http.get(`${this.url}/realtime/` + company_id, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;

      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  getSelectedRealtime(company_id, channel_ids) {
    const params = new HttpParams()
    .set('company_id', company_id)
    .set('channel_ids', channel_ids);

    return this.http.get(`${this.url}/realtime`, { headers: this.headers, params: params }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  getSensor(sensor_id) {
    return this.http.get(`${this.url}/sensor/` + sensor_id, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  getAllSensor(company_id) {
    return this.http.get(`${this.url}/sensor-all/` + company_id, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  getDataList(company_id, sensor_ids, start, end) {
    const params = new HttpParams()
    .set('sensor_ids[]', sensor_ids)
    .set('start', start)
    .set('end', end);
    return this.http.get(`${this.url}/datalist/` + company_id, { headers: this.headers, params: params }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  getEventList(company_id, user_id, sensor_ids, start, end) {
    const params = new HttpParams()
    .set('sensor_ids[]', sensor_ids)
    .set('user_id', user_id)
    .set('start', start)
    .set('end', end);
    return this.http.get(`${this.url}/eventlist/` + company_id, { headers: this.headers, params: params }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  getProfile(username) {
    const params = new HttpParams().set('username', username);
    return this.http.get(`${this.url}/profile`, { headers: this.headers, params: params }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  getHomeChart(sensorId) {
    return this.http.get(`${this.url}/homechart/${sensorId}`, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }
  
  getChart(sensorId, userId, today, yesterday) {
    const params = new HttpParams()
    .set('sensor_id', sensorId)
    .set('user_id', userId)
    .set('today', today)
    .set('yesterday', yesterday);

    return this.http.get(`${this.url}/chart/`, { headers: this.headers, params: params }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  updateChart(id, start, end) {
    const params = new HttpParams()
    .set('start', start)
    .set('end', end);    
    return this.http.get(`${this.url}/chart/update/`+id, { headers: this.headers, params: params }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  
  getTimeseries(sensorId, userId, interval, start, end) {
    const params = new HttpParams()
                  .set('sensor_id', sensorId)
                  .set('user_id', userId)
                  .set('interval', interval)
                  .set('start', start)
                  .set('end', end);
    return this.http.get(`${this.url}/timeseries`, { headers: this.headers, params: params }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  getInfoBasic(sensorId, userId) {
    const params = new HttpParams()
      .set('sensor_id', sensorId)
      .set('user_id', userId);
    return this.http.get(`${this.url}/info`, { headers: this.headers, params: params }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  getAllLimits(userid) {
    return this.http.get(`${this.url}/all-limits/`+userid, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  getInfoLimits(sensorId, userId) {
    const params = new HttpParams()
    .set('sensor_id', sensorId)
    .set('user_id', userId);
    return this.http.get(`${this.url}/info/limits`, { headers: this.headers, params: params }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  getInfoSchedule(id) {
    return this.http.get(`${this.url}/info/schedule/` + id, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }
  
  getNotification(companyid, userid) {
    return this.http.get(`${this.url}/notification/${companyid}/${userid}` , { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  getNotiCount(companyid, userid) {
    return this.http.get(`${this.url}/notification/count/${companyid}/${userid}` , { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  getPushSetting(userid) {
    return this.http.get(`${this.url}/push-setting/${userid}` , { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }


  getViewText(sensorId, userId, start, end, interval) {
    const params = new HttpParams()
                  .set('user_id', userId)
                  .set('start', start)
                  .set('end', end)
                  .set('interval', interval);
    return this.http.get(`${this.url}/view-text/${sensorId}`, { headers: this.headers, params: params }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

  getViewSourceStorage(sensorId, companyId, userId, start, end) {
    const params = new HttpParams()
                  .set('company_id', companyId)
                  .set('user_id', userId)
                  .set('start', start)
                  .set('end', end);
    return this.http.get(`${this.url}/view-source/storage/${sensorId}`, { headers: this.headers, params: params }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(e => {
        throw new Error(e);
      })
    );
  }

}
