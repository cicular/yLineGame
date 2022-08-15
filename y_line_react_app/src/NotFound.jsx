import React from "react";

// コンポーネントインポート
import Header from "./header";

const NotFoundPage = () => {
  return (
    <div className="App">
      <Header type="5"/>
      <h1>404</h1>
      <h3>お探しのページは見つかりませんでした。</h3>
    </div>
  );
}
// https://zenn.dev/longbridge/articles/65355d3fdb7939

export default NotFoundPage;
