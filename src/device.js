import React from "react";
import { Card, Icon, Avatar } from "antd";
import { Col, Row } from "antd";
import "./styles.css";
const { Meta } = Card;
const API = "https://5c01f8d2d526f900134722f7.mockapi.io/api/v1/devices/";

class Device extends React.Component {
  constructor(props) {
    super(props);
    this.state = { devices: [], imei: "", isLoading: false };
  }

  componentWillReceiveProps(props) {
    const { imei } = this.props;
    if (props.imei !== imei) {
      this.setState({ isLoading: true });
      fetch(API + imei)
        .then(response => {
          alert(response);
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("An error has occured");
          }
        })
        .then(data => this.setState({ devices: data, isLoading: false }))
        .catch(error => this.setState({ isLoading: false }));
    }
  }

  getConditionalProps() {
    const props = {};
    if (this.state.isLoading) {
      props.loading = "loading";
    }

    return props;
  }

  render() {
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
  }
}

export default Device;
