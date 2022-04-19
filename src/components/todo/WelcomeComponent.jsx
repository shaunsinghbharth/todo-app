import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService';

class WelcomeComponent extends Component {
    constructor(props){
        super(props)

        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.state = {
            welcomeMessage : '',
        }
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
        this.handleErrorResponse = this.handleErrorResponse.bind(this);
    }

    render() {

        return (
        	<>
                <h1>Welcome!</h1>
                <div className="container">
                Welcome {this.props.params.name}. You can manage your todos <Link to="/todos">here</Link>.
                </div>

                <div className="container">
                    Click here to get a welcome message
                    <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome Message</button>    
                </div>
                <div className='container'>
                    {this.state.welcomeMessage}
                </div>
            </>
        )        
    }

    retrieveWelcomeMessage(){
        //HelloWorldService.executeHelloWorldBeanService().then(response => this.handleSuccessfulResponse(response))

        HelloWorldService.executeHelloWorldPathVariableService(this.props.params.name).then(response => this.handleSuccessfulResponse(response)).catch(error => this.handleErrorResponse(error));
    }

    handleSuccessfulResponse(response){
        this.setState({welcomeMessage: response.data.message});
    }

    handleErrorResponse(error){
        console.log(error.response);
        this.setState({welcomeMessage: error.response.data.message});
    }
}

export default WelcomeComponent