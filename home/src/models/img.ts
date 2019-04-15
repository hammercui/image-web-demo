
import {setAuthority} from "@/utils/authority";
import { getPageQuery } from '@/utils/utils';
// import { routerRedux } from 'dva/router';
import router from 'umi/router';
import { getImg } from '@/services/github';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

export interface Icatalog{
  id: string;
  name: string;
}


export interface IimgResponse {
  catalog: Icatalog[];
  content: Map<string,string[]>
}

export interface Iimg {
  catalog: Icatalog[];
  content: Map<string,string[]>
  isShow: string;
  currPage:number;
  pageSize:number;
  selectCatId:number;
}


const initValue: Iimg = {
  catalog:[],
  content:null,
  isShow:"初始化",
  currPage:1,
  pageSize:14,
  selectCatId:0
};

export default {
	namespace: 'imgd',
	state: initValue,
	effects: {
    //请求
    *fetchImg({ payload }, { call, put }) {
      let response:IimgResponse = yield call(getImg);
      //登出成功
      yield put({
        type:'setImg',
        payload:response
      });
      //router.replace('/login/index');
    }
	},
	reducers: {
		setImg(state:Iimg, { payload }:{payload:IimgResponse}):Iimg {
      return {...state,catalog:payload.catalog,content:payload.content, isShow:"加载成功！"};
    },

    setChangePage(state,{payload}:{payload:{currPage:number,pageSize:number}}){
      return {...state,currPage:payload.currPage,pageSize:payload.pageSize}
    },
    setSelect(state,{payload}:{payload:number}){
      return {...state,selectCatId:payload}
    }
	}
};
