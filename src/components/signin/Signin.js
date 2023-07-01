import React, {Component} from 'react';



class Signin extends Component {
	constructor(props){
		super();
		this.state = {
			signinEmail: '',
			signinPassword: ''
		}

	}

	onEmailChange=(event)=>{
		this.setState({signinEmail: event.target.value});
	}
	onPasswordChange=(event)=>{
		this.setState({signinPassword: event.target.value});
	}

	onSigninSubmit=()=>{
		const {signinEmail, signinPassword} = this.state;
		
		if( signinEmail && signinPassword){

			fetch(`${API_URL}/signin`,
			{
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					email: signinEmail,
					password: signinPassword
				})
			})
			.then(response=> response.json())
			.then(res=>{
				 if(res.id){
	          		this.props.loadUser(res);
					this.props.changeRoute('home');
				}
			});

		}

	}

	render(){
			const {changeRoute} = this.props;

			return (
				<div>
					<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
						<main className="pa4 black-80">
						  <div className="measure "  >
						    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
						      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
						      <div className="mt3">
						        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
						        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        	type="email" name="email-address"  
						        	id="email-address"
						        	onChange={this.onEmailChange} 
						        	/>
						      </div>
						      <div className="mv3">
						        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
						        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
						        type="password" 
						        name="password"  
						        id="password"
						        onChange={this.onPasswordChange}
						        />
						      </div>
						    </fieldset>
						    <div className="">
						      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
						      type="submit" 
						      value="Sign in"
						       onClick={this.onSigninSubmit}
						      />
						    </div>
						    <div className="lh-copy mt3">
						      <p onClick={()=>changeRoute('register')} className="f6 link dim black db pointer">Register</p>
						    </div>
						  </div>
						</main>
					</article>





				</div>
		 


				)
	}

			
}


export default Signin;