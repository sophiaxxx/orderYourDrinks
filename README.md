# order_your_drinks

> A Vue.js project

## Build Setup


``` bash

# create vue project by webpack
vue init webpack your_project

# 直接安裝最新版本的axios會跟webpack相衝而有問題，需安裝0.25.0
npm install axios@0.25.0 --save

# create Express project
cd your_project
express server --view=ejs --css=compass
cd server
npm start

# 更改 server 端的程式碼後，不用關閉伺服器再打開
npm install --save-dev nodemon 

# 安裝 Cross-env 跨平台設定環境
npm install --save-dev cross-env 

#跨域問題
npm install --save-dev cors

# 啟動 nodemon (localhost:3000)
npx nodemon app.js

# 啟動 Vue site (localhost:8080)
npm run dev



# if you clone this project, you can follow these step to start it 
# install dependencies
npm install

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

參考資料: [muki website](https://muki.tw/vue-express-project/)
