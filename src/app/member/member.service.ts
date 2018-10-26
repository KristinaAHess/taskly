import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from '../app.tokens';
import { Observable } from 'rxjs';
import { Member } from './models/member';

@Injectable()
export class MemberService {

  constructor(private http: HttpClient, @Inject(API_ENDPOINT) private apiEndpoint) {
  }

  getMember(id: string): Observable<Member> {
    return this.http.get<Member>(`${this.apiEndpoint}/members/${id}`);
  }

  getMembers(): Observable<Array<Member>> {
    return this.http.get<Member[]>(`${this.apiEndpoint}/members`);
  }

  updateMember(member: Member): Observable<Member> {
    return this.http.put<Member>(`${this.apiEndpoint}/members/${member.id}`, member);
  }

  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(`${this.apiEndpoint}/members`, member);
  }

  removeMember(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiEndpoint}/members/${id}`);
  }
}
