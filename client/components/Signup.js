import React from "react";
import axios from "axios";

export default class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      // id: '',
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  async handleSubmit(event) {
    event.preventDefault();
    console.log('signup state before',this.state)
    const data = await axios.post("/api/users/signup", this.state);
    // this.props.history.push('/')
    this.setState({
      // id: '',
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  }

  render() {
    return (
      // <div>
      <form onSubmit={this.handleSubmit}>
        <p>
          <label>User Name</label>
          <input
            name="userName"
            type="text"
            required
            onChange={this.handleChange}
            value={this.state.userName}
          />
        </p>
        <label>First Name</label>

        <input
          name="firstName"
          type="text"
          placeholder="First Name"
          required
          onChange={this.handleChange}
          value={this.state.firstName}
        />
        <label>Last Name</label>
        <input
          name="lastName"
          type="text"
          placeholder="Last Name"
          required
          onChange={this.handleChange}
          value={this.state.lastName}
        />
        <label>Email</label>
        <input
          name="email"
          type="text"
          required
          onChange={this.handleChange}
          value={this.state.email}
        />
        <p>
          <label>Password</label>
          <input
            name="password"
            type="text"
            required
            onChange={this.handleChange}
            value={this.state.password}
          />
        </p>
        <button type="submit">Sign up</button>
      </form>
    );
  }
}

// import React, { Component } from 'react';
// // import FormErrors from "../FormErrors";
// // import Validate from "../utility/FormValidation";
// import Auth from '@aws-amplify/auth';

// export default class Signup extends Component {
//     constructor() {
//         super()
//         this.state = {
//           username: "",
//           email: "",
//           password: "",
//           confirmpassword: "",
//           errors: {
//             cognito: null,
//             blankfield: false,
//             passwordmatch: false
//           }
//     }
//     this.clearErrorState = this.clearErrorState.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//     this.onInputChange = this.onInputChange.bind(this)
//   }

//   clearErrorState() {
//     this.setState({
//       errors: {
//         cognito: null,
//         blankfield: false,
//         passwordmatch: false
//       }
//     });
//   }

//   async handleSubmit (event) {
//     event.preventDefault();

//     // Form validation
//     this.clearErrorState();
//     // const error = Validate(event, this.state);
//     // if (error) {
//     //   this.setState({
//     //     errors: { ...this.state.errors, ...error }
//     //   });
//     // }

//     // AWS Cognito integration here
//     const {username, email, password} = this.state
//     try {
//         const signUpResponse = await Auth.signUp({
//             username,
//             password,
//             attributes: {
//                 email: email
//             }
//         }) //optional fields in attribute

//         // this.props.history.push('/welcome') redirect
//     } catch (error) {
//         let err = null;
//         !error.message ? err = { "message": error} : err = error
//         console.log(error)
//         this.setState({
//             errors: {
//                 ...this.state.errors,
//                 cognito: err
//             }
//         })
//     }
//   };

//   onInputChange(event) {
//     this.setState({
//       [event.target.id]: event.target.value
//     });
//     // document.getElementById(event.target.id).classList.remove("is-danger");
//   }

//   render() {
//     return (
//       <section>
//         <div>
//           <h1>Signup</h1>
//           {/* <FormErrors formerrors={this.state.errors} /> */}

//           <form onSubmit={this.handleSubmit}>
//             <div>
//               <p>
//                 <input
//                   type="text"
//                   id="username"
//                   aria-describedby="userNameHelp"
//                   placeholder="Enter username"
//                   value={this.state.username}
//                   onChange={this.onInputChange}
//                 />
//               </p>
//             </div>
//             <div>
//               <p>
//                 <input
//                   type="email"
//                   id="email"
//                   aria-describedby="emailHelp"
//                   placeholder="Enter email"
//                   value={this.state.email}
//                   onChange={this.onInputChange}
//                 />
//                 <span>
//                   <i></i>
//                 </span>
//               </p>
//             </div>
//             <div>
//               <p>
//                 <input
//                   type="password"
//                   id="password"
//                   placeholder="Password"
//                   value={this.state.password}
//                   onChange={this.onInputChange}
//                 />
//                 <span>
//                   <i></i>
//                 </span>
//               </p>
//             </div>
//             <div>
//               <p>
//               <input
//                   className="input"
//                   type="password"
//                   id="confirmpassword"
//                   placeholder="Confirm password"
//                   value={this.state.confirmpassword}
//                   onChange={this.onInputChange}
//                 />
//                 <span>
//                   <i></i>
//                 </span>
//               </p>
//             </div>
//             <div>
//               <p>
//                 <a href="/forgotpassword">Forgot password?</a>
//               </p>
//             </div>
//             <div>
//               <p>
//                 <button>
//                   Signup
//                 </button>
//               </p>
//             </div>
//           </form>
//         </div>
//       </section>
//     );
//   }
