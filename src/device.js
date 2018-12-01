import React from "react";
import { Card, Icon, Avatar } from "antd";
import { Col, Row } from "antd";
import "./styles.css";
const { Meta } = Card;

class Device extends React.Component {
  constructor(props) {
    super(props);
    this.state = { device: [], imei: "" };
  }

  componentWillReceiveProps(props) {
    const { imei } = this.props;
    if (props.imei !== imei) {
      alert("new");
    }
  }

  render() {
    return (
      <div class="device-details">
        <Row gutter={16}>
          <Col span={8} />
          <Col span={8}>
            <Card
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
