import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { User } from 'app/shared/models/user';
import { UserService } from './user.service';

describe('UserServiceComponent', () => {

  let service: UserService;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpClientTestingModule]
    });
  });

  beforeEach(() => {
    service = TestBed.get(UserService);
    backend = TestBed.get(HttpTestingController);
  });

  it('getAllUsers should call usersUrl by GET method', () => {
    service.getAllUsers().subscribe();
    const call: TestRequest = backend.expectOne({ url: service.usersUrl, method: 'GET' });
    expect(call.request.url).toEqual(service.usersUrl);
    expect(call.request.method).toEqual('GET');
    expect(call.request.body).toEqual(null);
    backend.verify();
  });

  it('getUser should call usersUrl with the "id" by GET method', () => {
    service.getUser(1).subscribe();
    const call: TestRequest = backend.expectOne({ url: `${service.usersUrl}/1`, method: 'GET' });
    expect(call.request.url).toEqual(`${service.usersUrl}/1`);
    expect(call.request.method).toEqual('GET');
    expect(call.request.body).toEqual(null);
    backend.verify();
  });

  it('createUser should call usersUrl by POST method with a user in the body', () => {
    const userJSON = { _id: null, userName: 'Test', email: 'test@test.com', password: '123qweQWE', token: null, role: 'client' };
    service.createUser(new User().fromJSON(userJSON)).subscribe();
    const call: TestRequest = backend.expectOne({ url: `${service.usersUrl}`, method: 'POST' });
    expect(call.request.url).toEqual(`${service.usersUrl}`);
    expect(call.request.method).toEqual('POST');
    expect(call.request.body).toBeDefined();
    backend.verify();
  });

  it('removeUser should call usersUrl with "id" by DELETE method', () => {
    service.removeUser('1').subscribe();
    const call: TestRequest = backend.expectOne({ url: `${service.usersUrl}/1`, method: 'DELETE' });
    expect(call.request.url).toEqual(`${service.usersUrl}/1`);
    expect(call.request.method).toEqual('DELETE');
    expect(call.request.body).toEqual(null);
    backend.verify();
  });

  it('updateUser should call usersUrl with "id" by PUT method', () => {
    const userJSON = { _id: 'test', userName: 'Test', email: 'test@test.com', password: null, token: null, role: 'client' };
    service.updateUser(new User().fromJSON(userJSON)).subscribe();
    const call: TestRequest = backend.expectOne({ url: `${service.usersUrl}/${userJSON._id}`, method: 'PUT' });
    expect(call.request.url).toEqual(`${service.usersUrl}/${userJSON._id}`);
    expect(call.request.method).toEqual('PUT');
    expect(call.request.body).toBeTruthy();
    backend.verify();
  });

});
