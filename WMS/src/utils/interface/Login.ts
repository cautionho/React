namespace Interface {
  export type Props = {

  }

  export class LoginForm {
    Email: string = ''
    Password: string = ''
  }

  export class State {
    LoginForm: LoginForm = new LoginForm()
  }
}

export default Interface