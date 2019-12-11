// 首页 轮播

import * as React from "react";
import "./index.scss";
import { Carousel, WingBlank } from "antd-mobile";
import { http } from "../../../../api/http";
import { $APIbanner } from "../../../../api/apiList";

enum BgColor {
  red = "#e95f4d",
  blue = "#5ea3ea"
}

export default class Slide extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    // 请求 banner
    this.getBanner();
  }

  getBanner() {
    http($APIbanner, { data: { type: 2 } }).then((res: any) => {
      const { banners } = res;
      this.setState({
        data: banners
      });
    });
  }

  render() {
    return (
      <div className="home-banner">
        <WingBlank>
          <Carousel
            autoplay={true}
            infinite
            dotActiveStyle={{
              backgroundColor: "#eb4d44"
            }}
          >
            {this.state.data.map((item: any) => {
              const { pic, bannerId, url, typeTitle, titleColor } = item;
              return (
                <a
                  key={bannerId}
                  href={url}
                  style={{
                    display: "inline-block",
                    width: "100%"
                  }}
                >
                  <img
                    src={pic}
                    alt=""
                    style={{
                      width: "100%",
                      verticalAlign: "top"
                    }}
                  />
                  <div
                    className="tag"
                    style={{
                      backgroundColor:
                        titleColor === "red" ? BgColor.red : BgColor.blue
                    }}
                  >
                    {typeTitle}
                  </div>
                </a>
              );
            })}
          </Carousel>
        </WingBlank>
      </div>
    );
  }
}