// 获取秒杀数据
import axios from "axios";
import api from "../../static/js/api"
import Moment from "moment";


// 获取轮播(营销)图片
export const loadCarouselItems = ({ commit }) => {
  return new Promise((resolve, reject) => {
    const data = {
      carouselItems: [
        'static/img/nav/2.png',
        'static/img/nav/3.jpg',
        'static/img/nav/4.jpg',
      ],
    };
    commit('SET_CAROUSELITEMS_INFO', data);
  });
};



//获取所有求购列表
export const loadAllWants=({commit})=>{
  commit('SET_LOAD_STATUS',true)
  return new Promise((resolve ,reject)=>{
    setTimeout(async () => {
      let data
      await axios.get(api.path+'wantingInfoManage/lookUpAllBuyInfo').then(function (response){
        data=response.data.data
        commit('SET_WANTS_LIST', data);
        commit('SET_LOAD_STATUS', false);
      })
    },300)
  })
}

export const loadAddress = ({ commit }) => {
  return new Promise(async (resolve, reject) => {
    await axios.get(api.path + 'userAddrManage/lookUpUserAddrByUserId/' + Cookies.get('userid'))
      .then(function (response) {
        let address = response.data.data;
        console.log(response.data.data)
        console.log(address)
        // const address1=JSON.stringify(address)
        commit('SET_USER_ADDRESS', address);
      })

  });
};

export const loadWantProduct = ({ commit }) => {
  return new Promise(async (resolve, reject) => {
    await axios.get(api.path + 'wantingInfoManage/lookUpBuyInfoByUserId/' + Cookies.get('userid'))
      .then(function (response) {
        let wantProduct = response.data.data;
        console.log(response.data.data)
        console.log(wantProduct)
        // const address1=JSON.stringify(address)
        commit('SET_USER_WANT', wantProduct);
      })
  });
};

export const loadStore = ({ commit }) => {
  return new Promise(async (resolve, reject) => {
    await axios.get(api.path + 'userStoreManage/lookUpStoreByUserId/' + Cookies.get('userid'))
      .then(function (response) {
        let store = response.data.data;
        console.log(response.data.data)
        console.log(store)
        // const address1=JSON.stringify(address)
        commit('SET_USER_STORE', store);
      })
  });
};

export const loadShoppingCart = ({ commit }) => {
  return new Promise(async (resolve, reject) => {
    await axios.get(api.path + 'userShoppingManage/lookUpShoppingCarByUserId/' + Cookies.get('userid'))
      .then(function (response) {
        let data = response.data.data;
        for(let i=0;i<data.length;i++){
          data[i].spAddTime=Moment(data[i].spAddTime).format('YYYY-MM-DD HH:MM:SS')
        }
        console.log(response.data.data)
        console.log(data)
        // const address1=JSON.stringify(address)
        commit('SET_SHOPPING_CART', data);
      })
  });
};

export const loadmyGood = ({ commit }) => {
  return new Promise(async (resolve, reject) => {


    await axios.get(api.path + 'releaseProductManage/lookUpReleasedProductByUid/' + Cookies.get('userid'))
      .then(function (response) {
        let goods = response.data.data;
        console.log(response.data.data)
        console.log(goods)
        // const address1=JSON.stringify(address)
        commit('SET_USER_GOODS', goods);
      })

  });
};
// 添加注册用户
export const addSignUpUser = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    // const userArr = localStorage.getItem('users');
    // let users = [];
    // if (userArr) {
    //   users = JSON.parse(userArr);
    // }
    // users.push(data);
    // localStorage.setItem('users', JSON.stringify(users));
    axios.post(api.path+'userLogin/register',data)
      .then(function (resp){})
  });
};

// 用户登录
export const login = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    axios.get(api.path+"userLogin/login/"+data.username+"/"+data.password).then(
      function (resp){
        if(resp.data.code=="200"){
          Cookies.set('token',resp.data.msg);
          Cookies.set('username',resp.data.data[0].uname);
          Cookies.set('userid',resp.data.data[0].uid);
          Cookies.set('userimg',resp.data.data[0].uhead);
          // setCook
          commit('SET_USER_LOGIN_INFO', data); // 数据上传
          resolve(true);
          return true
        }
        else {
          resolve(false);
        }
        // else resolve(false);
      }
    )
  });
};

// 退出登陆
export const signOut = ({ commit }) => {
  // localStorage.removeItem('loginInfo');
  // clearAllCookie();
  Cookies.remove('token')
  Cookies.remove('username');
  Cookies.remove('userid')
  commit('SET_USER_LOGIN_INFO', {});
};

// 判断是否登陆
export const isLogin = ({ commit }) => {
  // const user = localStorage.getItem('loginInfo');
  // if (user) {
  //   commit('SET_USER_LOGIN_INFO', JSON.parse(user));
  // }
  // const token = getCookieValue("token")
  const token=Cookies.get('token');
  var userInfo={
    "username": Cookies.get('username'),
    "userid": Cookies.get('userid')
  }
  // var userInfo={
  //   "username":getCookieValue("username")
  // }
  // console.log(userInfo)
  if (token!=''&&token!=null) {
    commit('SET_USER_LOGIN_INFO',userInfo );
    // console.log(state.userInfo)
  }
  else{
    commit('SET_USER_LOGIN_INFO',null );
  }

  console.log(Cookies)
};
