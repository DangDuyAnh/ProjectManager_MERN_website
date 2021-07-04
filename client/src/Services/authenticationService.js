import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(
    JSON.parse(localStorage.getItem('currentUser'))
);

export const authenticationService = {
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value;
    },
};

export function useLogin() {
    const login = (user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        currentUserSubject.next(user);
        return user;
    };

    return login;
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
