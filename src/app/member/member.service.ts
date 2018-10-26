import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from '../app.tokens';
import { Observable } from 'rxjs';
import { Member } from './models/member';
import { map } from 'rxjs/operators';

interface MemberResponse {
  item: Member;
}

interface MembersResponse {
  items: Member[];
}

@Injectable()
export class MemberService {

  constructor(private http: HttpClient, @Inject(API_ENDPOINT) private apiEndpoint) {
  }

  getMember(id: string): Observable<Member> {
    return this.http.get<MemberResponse>(`${this.apiEndpoint}/members/${id}`)
      .pipe(map(data => data.item));
  }

  getMembers(): Observable<Array<Member>> {
    return this.http.get<MembersResponse>(`${this.apiEndpoint}/members`)
      .pipe(map(data => data.items));
  }

  updateMember(member: Member): Observable<Member> {
    return this.http.put<MemberResponse>(`${this.apiEndpoint}/members/${member.id}`, member)
      .pipe(map(data => data.item));
  }
}
