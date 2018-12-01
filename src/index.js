import React from "react";
import ReactDOM from "react-dom";
import { Form, Button, Input } from "antd";
import "antd/dist/antd.css";
import "./styles.css";
import Device from "./device";

const FormItem = Form.Item;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imei: "", input: "" };

    this.handleChange = this.handleChange.bind(this);
  }

  doLookup = () => {
    this.setState(state => ({ imei: this.state.input }));
  };

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <h1>Check IMEI</h1>
        <p>
          International Mobile Equipment Identity - a unique 15 digit code every
          phone or Mobile Broadband device has
        </p>
        <div class="search-box">
          <Form className="login-form">
            <FormItem>
              <Input size="large" onChange={this.handleChange} />
            </FormItem>
            <FormItem>
              <Button
                onClick={this.doLookup}
                icon="search"
                type="primary"
                size="large"
              >
                Lookup
              </Button>
            </FormItem>
          </Form>
        </div>
        <div>
          <Device imei={this.state.imei} />
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
