import React from "react";
import { Card, Icon, Alert } from "antd";
import { Col, Row } from "antd";
import "./styles.css";
const { Meta } = Card;
const API = "https://5c01f8d2d526f900134722f7.mockapi.io/api/v1/devices/";

class Device extends React.Component {
  constructor(props) {
    super(props);
    this.state = { device: null, imei: "", isLoading: false };
  }

  componentWillReceiveProps(props) {
    if (this.state.imei !== props.imei) {
      this.props.action(true);
      this.setState(
        { isLoading: true, imei: props.imei },
        this.fetchDeviceByImei
      );
    }
  }

  fetchDeviceByImei() {
    fetch(API + this.state.imei)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("An error has occured");
        }
      })
      .then(data => {
        this.setState({ device: data, isLoading: false });
        this.props.action(false);
      })
      .catch(error => {
        this.setState({ isLoading: false, device: null });
        this.props.action(false);
      });
  }

  getConditionalProps() {
    const props = {};
    if (this.state.isLoading) {
      props.loading = "loading";
    }

    return props;
  }

  render() {
    if (this.state.device !== null) {
      return (
        <div class="device-details">
          <Row gutter={16}>
            <Col span={8} />
            <Col span={8}>
              <Card
                {...this.getConditionalProps()}
                hoverable
                cover={
                  <img
                    alt=""
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[
                  <Icon type="setting" />,
                  <Icon type="edit" />,
                  <Icon type="ellipsis" />
                ]}
              >
                <Meta
                  title={this.props.imei}
                  description="This is the description"
                />
              </Card>
            </Col>
            <Col span={8} />
          </Row>
        </div>
      );
    } else {
      if (
        this.state.imei !== "" &&
        this.state.device === null &&
        this.state.isLoading === false
      ) {
        return (
          <Alert
            className="error-box"
            message="Provided IMEI doesn't match with any device in our database"
            description="Re-check if the IMEI provided is correct. To get your device's IMEI, enter *#06# on your phone's call screen"
            type="error"
            showIcon
          />
        );
      } else {
        return <div />;
      }
    }
  }
}

export default Device;
