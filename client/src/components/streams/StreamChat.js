import React from 'react';
import io from 'socket.io-client';
import { Field, reduxForm } from 'redux-form';

let socket;

class StreamChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            messages: []
        };
        socket = io.connect('http://localhost:4000');
        // Listen for events
        socket.on('chat', ({message: {message}}) => {
            this.state.messages = this.state.messages.concat(message);
            this.renderMessages();
        });
    };
    renderMessages() {
        return this.state.messages.map((message, index) => {
            return (
                <div className="item" key={index}>
                    <i className="ui large middle aligned user icon" />
                    <div className="content">
                        <div className="message">{message}</div>
                    </div>
                </div>
            );
        });
    }

    sendMessage = (formValues) => {
        socket.emit('chat', {
            message: formValues
        });
        const { reset } = this.props;
        reset();
    };

    render() {
        return (
            <div className="ui centered container" style={{ width: '100%'}}>
                <div className="ui raised segment" style={{minHeight: 300}}>
                    <div className="ui celled list"> {this.renderMessages()}</div>
                </div>
                <form onSubmit={this.props.handleSubmit(this.sendMessage.bind(this))} className="ui right aligned container">
                    <div className="ui action input">
                        <Field name="message" component='input' type='text' placeholder="Chat"/>
                        <button type="submit" className="ui button primary">Send</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'chatForm'
})(StreamChat);
